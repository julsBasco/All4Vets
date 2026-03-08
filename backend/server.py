from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Application Model
class ApplicationSubmission(BaseModel):
    programType: str
    program_type: str
    applicant_name: str
    applicant_email: str
    applicant_phone: str
    applicant_address: str
    military_branch: Optional[str] = "N/A"
    service_dates: Optional[str] = "N/A"
    rank: Optional[str] = "N/A"
    va_claim_status: Optional[str] = "N/A"
    va_claim_details: Optional[str] = "N/A"
    assistance_type: Optional[str] = "N/A"
    additional_info: Optional[str] = "None provided"
    submission_date: Optional[str] = None

class ApplicationResponse(BaseModel):
    id: str
    status: str
    message: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks


# Application submission endpoint
@api_router.post("/applications", response_model=ApplicationResponse)
async def submit_application(application: ApplicationSubmission):
    """
    Handle application submissions from the website.
    Stores in database and sends email notification.
    """
    try:
        # Generate application ID
        app_id = str(uuid.uuid4())
        
        # Prepare document for MongoDB
        app_doc = {
            "id": app_id,
            "program_type": application.program_type,
            "applicant_name": application.applicant_name,
            "applicant_email": application.applicant_email,
            "applicant_phone": application.applicant_phone,
            "applicant_address": application.applicant_address,
            "military_branch": application.military_branch,
            "service_dates": application.service_dates,
            "rank": application.rank,
            "va_claim_status": application.va_claim_status,
            "va_claim_details": application.va_claim_details,
            "assistance_type": application.assistance_type,
            "additional_info": application.additional_info,
            "submission_date": application.submission_date or datetime.now(timezone.utc).isoformat(),
            "status": "pending"
        }
        
        # Store in MongoDB
        await db.applications.insert_one(app_doc)
        
        # Send email notification
        try:
            await send_application_email(app_doc)
        except Exception as email_error:
            logger.error(f"Failed to send email notification: {email_error}")
            # Continue even if email fails - application is saved
        
        return ApplicationResponse(
            id=app_id,
            status="success",
            message="Application submitted successfully. We will contact you within 10-14 business days."
        )
        
    except Exception as e:
        logger.error(f"Error submitting application: {e}")
        raise HTTPException(status_code=500, detail="Failed to submit application")


async def send_application_email(app_doc: dict):
    """
    Send email notification for new application.
    Uses SMTP configuration from environment variables.
    """
    recipient_email = "bascojulian31@gmail.com" # change to the desired email address
    
    # Check if SMTP is configured
    smtp_host = os.environ.get('SMTP_HOST')
    smtp_port = os.environ.get('SMTP_PORT', 587)
    smtp_user = os.environ.get('SMTP_USER')
    smtp_pass = os.environ.get('SMTP_PASS')
    
    if not all([smtp_host, smtp_user, smtp_pass]):
        logger.warning("SMTP not configured. Skipping email notification.")
        logger.info(f"Application received: {app_doc}")
        return
    
    # Create email content
    subject = f"New {app_doc['program_type']} Application - {app_doc['applicant_name']}"
    
    body = f"""
New Application Received

Program Type: {app_doc['program_type']}
Submission Date: {app_doc['submission_date']}

APPLICANT INFORMATION
---------------------
Name: {app_doc['applicant_name']}
Email: {app_doc['applicant_email']}
Phone: {app_doc['applicant_phone']}
Address: {app_doc['applicant_address']}

MILITARY SERVICE DETAILS
------------------------
Branch: {app_doc['military_branch']}
Service Dates: {app_doc['service_dates']}
Rank: {app_doc['rank']}

VA CLAIM STATUS
---------------
Status: {app_doc['va_claim_status']}
Details: {app_doc['va_claim_details']}

ASSISTANCE REQUESTED
--------------------
Type: {app_doc['assistance_type']}

ADDITIONAL INFORMATION
----------------------
{app_doc['additional_info']}

---
Application ID: {app_doc['id']}
This application has been saved to the database.
"""
    
    try:
        msg = MIMEMultipart()
        msg['From'] = smtp_user
        msg['To'] = recipient_email
        msg['Subject'] = subject
        msg.attach(MIMEText(body, 'plain'))
        
        with smtplib.SMTP(smtp_host, int(smtp_port)) as server:
            server.starttls()
            server.login(smtp_user, smtp_pass)
            server.send_message(msg)
        
        logger.info(f"Email notification sent for application {app_doc['id']}")
    except Exception as e:
        logger.error(f"SMTP error: {e}")
        raise


@api_router.get("/applications", response_model=List[dict])
async def get_applications():
    """Get all applications (for admin purposes)"""
    applications = await db.applications.find({}, {"_id": 0}).to_list(1000)
    return applications

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
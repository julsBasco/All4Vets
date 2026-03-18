import os
import json
import uuid
import aiosmtplib
from datetime import datetime
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
from typing import Optional, List
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="All4Vets API", version="1.0.0")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Email configuration
SMTP_SERVER = os.getenv("SMTP_SERVER", "smtp.office365.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USERNAME = os.getenv("SMTP_USERNAME")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")
EMAIL_FROM = os.getenv("EMAIL_FROM")
EMAIL_TO = os.getenv("EMAIL_TO")


@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.utcnow().isoformat()}


async def send_email_with_attachments(
    subject: str,
    html_content: str,
    attachments: List[tuple] = None  # List of (filename, content, content_type)
):
    """Send email using Microsoft 365 SMTP with optional attachments"""
    
    # Create message
    msg = MIMEMultipart()
    msg["From"] = EMAIL_FROM
    msg["To"] = EMAIL_TO
    msg["Subject"] = subject
    
    # Attach HTML content
    msg.attach(MIMEText(html_content, "html"))
    
    # Attach files if any
    if attachments:
        for filename, content, content_type in attachments:
            part = MIMEBase("application", "octet-stream")
            part.set_payload(content)
            encoders.encode_base64(part)
            part.add_header(
                "Content-Disposition",
                f"attachment; filename={filename}"
            )
            msg.attach(part)
    
    # Send email
    try:
        await aiosmtplib.send(
            msg,
            hostname=SMTP_SERVER,
            port=SMTP_PORT,
            start_tls=True,
            username=SMTP_USERNAME,
            password=SMTP_PASSWORD,
        )
        return True
    except Exception as e:
        print(f"Email sending failed: {str(e)}")
        raise e


def create_vmeaf_email_html(form_data: dict, file_names: dict) -> str:
    """Create HTML email content for V-MEAF application"""
    
    html = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
            .container {{ max-width: 800px; margin: 0 auto; padding: 20px; }}
            .header {{ background: #0B1D39; color: white; padding: 20px; text-align: center; }}
            .section {{ margin: 20px 0; padding: 15px; background: #f9f9f9; border-left: 4px solid #E64A38; }}
            .section-title {{ color: #0B1D39; font-size: 18px; font-weight: bold; margin-bottom: 10px; }}
            .field {{ margin: 10px 0; }}
            .field-label {{ font-weight: bold; color: #0B1D39; }}
            .field-value {{ margin-left: 10px; }}
            .footer {{ margin-top: 30px; padding: 20px; background: #0B1D39; color: white; text-align: center; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>V-MEAF Application Received</h1>
                <p>Veterans Medical Evidence Assistance Fund</p>
            </div>
            
            <div class="section">
                <div class="section-title">1. Personal Information</div>
                <div class="field"><span class="field-label">Name:</span> <span class="field-value">{form_data.get('firstName', '')} {form_data.get('lastName', '')}</span></div>
                <div class="field"><span class="field-label">Email:</span> <span class="field-value">{form_data.get('email', '')}</span></div>
                <div class="field"><span class="field-label">Phone:</span> <span class="field-value">{form_data.get('phone', '')}</span></div>
                <div class="field"><span class="field-label">Address:</span> <span class="field-value">{form_data.get('address', '')}, {form_data.get('city', '')}, {form_data.get('state', '')} {form_data.get('zipCode', '')}</span></div>
            </div>
            
            <div class="section">
                <div class="section-title">2. Military Service Verification</div>
                <div class="field"><span class="field-label">Branch of Service:</span> <span class="field-value">{form_data.get('branch', 'N/A')}</span></div>
                <div class="field"><span class="field-label">Service Number:</span> <span class="field-value">{form_data.get('serviceNumber', 'N/A')}</span></div>
                <div class="field"><span class="field-label">Service Dates:</span> <span class="field-value">{form_data.get('serviceStart', 'N/A')} to {form_data.get('serviceEnd', 'N/A')}</span></div>
                <div class="field"><span class="field-label">Type of Discharge:</span> <span class="field-value">{form_data.get('dischargeType', 'N/A')}</span></div>
                <div class="field"><span class="field-label">DD214 Uploaded:</span> <span class="field-value">{file_names.get('dd214', 'No')}</span></div>
                <div class="field"><span class="field-label">Service Treatment Records:</span> <span class="field-value">{file_names.get('serviceTreatmentRecords', 'No')}</span></div>
                <div class="field"><span class="field-label">VA Blue Button Report:</span> <span class="field-value">{file_names.get('vaBlueButtonReport', 'No')}</span></div>
                <div class="field"><span class="field-label">Private Medical Records:</span> <span class="field-value">{file_names.get('privateMedicalRecords', 'No')}</span></div>
                <div class="field"><span class="field-label">Prior DBQ/Nexus Letter:</span> <span class="field-value">{file_names.get('priorDbqNexusLetter', 'No')}</span></div>
            </div>
            
            <div class="section">
                <div class="section-title">3. VA Disability Information</div>
                <div class="field"><span class="field-label">Claim Status:</span> <span class="field-value">{form_data.get('claimStatus', 'N/A')}</span></div>
                <div class="field"><span class="field-label">VA File Number:</span> <span class="field-value">{form_data.get('vaFileNumber', 'N/A')}</span></div>
                <div class="field"><span class="field-label">Disability Rating:</span> <span class="field-value">{form_data.get('disabilityRating', 'N/A')}</span></div>
                <div class="field"><span class="field-label">Type of Evaluation Needed:</span> <span class="field-value">{form_data.get('evaluationType', 'N/A')}</span></div>
                <div class="field"><span class="field-label">Conditions Being Claimed:</span> <span class="field-value">{form_data.get('conditionsClaimed', 'N/A')}</span></div>
                <div class="field"><span class="field-label">Existing Diagnosis:</span> <span class="field-value">{form_data.get('existingDiagnosis', 'N/A')}</span></div>
                <div class="field"><span class="field-label">Service Connected Medical Conditions:</span><br><span class="field-value">{form_data.get('medicalConditions', 'N/A')}</span></div>
                <div class="field"><span class="field-label">Current Symptoms:</span><br><span class="field-value">{form_data.get('currentSymptoms', 'N/A')}</span></div>
                <div class="field"><span class="field-label">Current Medications:</span><br><span class="field-value">{form_data.get('currentMedications', 'N/A')}</span></div>
                <div class="field"><span class="field-label">Prior Treatment History:</span><br><span class="field-value">{form_data.get('priorTreatmentHistory', 'N/A')}</span></div>
            </div>
            
            <div class="section">
                <div class="section-title">4. Financial Hardship Statement</div>
                <div class="field"><span class="field-value">{form_data.get('hardshipStatement', 'N/A')}</span></div>
            </div>
            
            <div class="section">
                <div class="section-title">5. Certification & Consent</div>
                <div class="field"><span class="field-label">Digital Signature:</span> <span class="field-value">{form_data.get('signature', 'N/A')}</span></div>
                <div class="field"><span class="field-label">Date:</span> <span class="field-value">{form_data.get('signatureDate', 'N/A')}</span></div>
                <div class="field"><span class="field-label">Certifications Agreed:</span> <span class="field-value">All 6 certifications accepted</span></div>
            </div>
            
            <div class="footer">
                <p>Submitted on: {datetime.now().strftime('%B %d, %Y at %I:%M %p')}</p>
                <p>All4Vets - Empowering Veterans Through Medical Advocacy</p>
            </div>
        </div>
    </body>
    </html>
    """
    return html


@app.post("/api/applications/vmeaf")
async def submit_vmeaf_application(
    # Personal Information
    firstName: str = Form(...),
    lastName: str = Form(...),
    email: str = Form(...),
    phone: str = Form(...),
    address: str = Form(...),
    city: str = Form(...),
    state: str = Form(...),
    zipCode: str = Form(...),
    # Military Service Verification
    branch: str = Form(...),
    serviceNumber: str = Form(""),
    serviceStart: str = Form(...),
    serviceEnd: str = Form(...),
    dischargeType: str = Form(...),
    # VA Disability Information
    claimStatus: str = Form(...),
    vaFileNumber: str = Form(""),
    disabilityRating: str = Form(""),
    evaluationType: str = Form(...),
    conditionsClaimed: str = Form(...),
    existingDiagnosis: str = Form(...),
    medicalConditions: str = Form(...),
    currentSymptoms: str = Form(...),
    currentMedications: str = Form(...),
    priorTreatmentHistory: str = Form(...),
    # Financial Hardship
    hardshipStatement: str = Form(...),
    # Certification
    signature: str = Form(...),
    signatureDate: str = Form(...),
    # File uploads
    dd214File: UploadFile = File(None),
    serviceTreatmentRecords: UploadFile = File(None),
    vaBlueButtonReport: UploadFile = File(None),
    privateMedicalRecords: UploadFile = File(None),
    priorDbqNexusLetter: UploadFile = File(None),
):
    """Submit V-MEAF application with file attachments"""
    
    try:
        # Collect form data
        form_data = {
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "phone": phone,
            "address": address,
            "city": city,
            "state": state,
            "zipCode": zipCode,
            "branch": branch,
            "serviceNumber": serviceNumber or "N/A",
            "serviceStart": serviceStart,
            "serviceEnd": serviceEnd,
            "dischargeType": dischargeType,
            "claimStatus": claimStatus,
            "vaFileNumber": vaFileNumber or "N/A",
            "disabilityRating": disabilityRating or "N/A",
            "evaluationType": evaluationType,
            "conditionsClaimed": conditionsClaimed,
            "existingDiagnosis": existingDiagnosis,
            "medicalConditions": medicalConditions,
            "currentSymptoms": currentSymptoms,
            "currentMedications": currentMedications,
            "priorTreatmentHistory": priorTreatmentHistory,
            "hardshipStatement": hardshipStatement,
            "signature": signature,
            "signatureDate": signatureDate,
        }
        
        # Process file attachments
        attachments = []
        file_names = {}
        
        file_fields = [
            ("dd214", dd214File),
            ("serviceTreatmentRecords", serviceTreatmentRecords),
            ("vaBlueButtonReport", vaBlueButtonReport),
            ("privateMedicalRecords", privateMedicalRecords),
            ("priorDbqNexusLetter", priorDbqNexusLetter),
        ]
        
        for field_name, file in file_fields:
            if file and file.filename:
                content = await file.read()
                attachments.append((file.filename, content, file.content_type))
                file_names[field_name] = f"Yes - {file.filename}"
            else:
                file_names[field_name] = "No"
        
        # Create email content
        subject = f"V-MEAF Application: {firstName} {lastName}"
        html_content = create_vmeaf_email_html(form_data, file_names)
        
        # Send email
        await send_email_with_attachments(subject, html_content, attachments)
        
        return {
            "success": True,
            "message": "Application submitted successfully",
            "applicationId": str(uuid.uuid4())
        }
        
    except Exception as e:
        print(f"Error submitting application: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to submit application: {str(e)}"
        )


# Simple application endpoint for non-V-MEAF forms (scholarship, emergency)
@app.post("/api/applications")
async def submit_application(
    programType: str = Form(...),
    firstName: str = Form(...),
    lastName: str = Form(...),
    email: str = Form(...),
    phone: str = Form(...),
    address: str = Form(""),
    city: str = Form(""),
    state: str = Form(""),
    zipCode: str = Form(""),
    additionalInfo: str = Form(""),
):
    """Submit non-V-MEAF application"""
    
    try:
        program_titles = {
            "scholarship": "Scholarship & Education Grant",
            "emergency": "Emergency Aid",
        }
        
        program_name = program_titles.get(programType, programType)
        
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                .header {{ background: #0B1D39; color: white; padding: 20px; text-align: center; }}
                .content {{ padding: 20px; background: #f9f9f9; }}
                .field {{ margin: 10px 0; }}
                .label {{ font-weight: bold; color: #0B1D39; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>{program_name} Application</h1>
                </div>
                <div class="content">
                    <div class="field"><span class="label">Name:</span> {firstName} {lastName}</div>
                    <div class="field"><span class="label">Email:</span> {email}</div>
                    <div class="field"><span class="label">Phone:</span> {phone}</div>
                    <div class="field"><span class="label">Address:</span> {address}, {city}, {state} {zipCode}</div>
                    <div class="field"><span class="label">Additional Info:</span><br>{additionalInfo or 'None provided'}</div>
                    <div class="field"><span class="label">Submitted:</span> {datetime.now().strftime('%B %d, %Y at %I:%M %p')}</div>
                </div>
            </div>
        </body>
        </html>
        """
        
        await send_email_with_attachments(
            subject=f"{program_name} Application: {firstName} {lastName}",
            html_content=html_content
        )
        
        return {
            "success": True,
            "message": "Application submitted successfully"
        }
        
    except Exception as e:
        print(f"Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)

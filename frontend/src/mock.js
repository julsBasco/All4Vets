// Mock data for All4Vets nonprofit website

export const siteConfig = {
  siteName: "All4Vets",
  tagline: "Honoring Service Through Support",
  nonprofit: "501(c)(3) Nonprofit Organization",
  ein: "41-3664122",
  contact: {
    email: "joe@all4vets.us",
    partnershipsEmail: "joe@all4vets.us",
    phone: "(386) 837-8131",
    address: "All4Vets, 113 Synandra Lane, Holly Springs, NC 27540",
    city: "[City, State ZIP]",
  },
  social: [
    { name: "Facebook", url: "https://facebook.com/all4vets" },
    { name: "Twitter", url: "https://twitter.com/all4vets" },
    { name: "LinkedIn", url: "https://linkedin.com/company/all4vets" },
    { name: "Instagram", url: "https://instagram.com/all4vets" },
  ],
};

export const images = {
  hero: "https://images.unsplash.com/photo-1620056187066-763a6889a359?w=1200&q=80",
  programs:
    "https://images.unsplash.com/photo-1580893246395-52aead8960dc?w=1200&q=80",
  community:
    "https://images.unsplash.com/photo-1495653797063-114787b77b23?w=1200&q=80",
  military:
    "https://images.unsplash.com/photo-1423492759094-e98da7756991?w=1200&q=80",
  flag: "https://images.unsplash.com/photo-1499200493734-6ba25a83f77c?w=1200&q=80",
  aviation:
    "https://images.unsplash.com/photo-1573220785540-c19c0d57905d?w=1200&q=80",
};

export const hero = {
  headline: "Standing Behind Those Who Stood for Us.",
  subtext:
    "Empowering veterans through financial aid, scholarships, and grants that restore stability, opportunity, and hope.",
  primaryCTA: "Donate Now",
  secondaryCTA: "Apply for Aid",
  tertiaryCTA: "Partner With Us",
};

export const aboutSection = {
  headline: "Serving Those Who've Served Our Nation.",
  content:
    "All4Vets is a nonprofit organization devoted to helping U.S. veterans overcome financial hardships through donor-funded support. Whether it's assistance with VA disability claims, educational scholarships, or emergency relief, our mission is simple but profound—to ensure that no veteran is left behind due to financial struggle. Every contribution directly strengthens the lives of those who once defended ours.",
  cta: "Learn More About Our Mission",
};

export const missionPillars = [
  {
    id: 1,
    icon: "fileText",
    title: "VA Disability Claims Aid",
    description:
      "Helping veterans cover living and administrative costs during the VA disability process.",
  },
  {
    id: 2,
    icon: "graduationCap",
    title: "Scholarships & Education Grants",
    description:
      "Funding continued education and career advancement opportunities.",
  },
  {
    id: 3,
    icon: "heart",
    title: "Emergency Relief Assistance",
    description:
      "Providing immediate financial support during personal crises.",
  },
];

export const programs = [
  {
    id: 1,
    slug: "va-disability-claims",
    title: "Veterans Medical Evidence Assistance Fund (V-MEAF)",
    shortTitle: "VA Disability Claims Aid",
    icon: "fileText",
    description:
      "This fund provides direct financial aid to cover the costs of professional medical documentation needed to strengthen VA disability claims.",
    fullDescription:
      "Many veterans are denied the benefits they've earned simply because they cannot afford the professional medical documentation required to support their VA disability claims. The V-MEAF was created to ensure that no veteran is left without proper representation in their fight for the benefits they deserve.",
    whatItCovers: [
      "Independent Medical Opinions (IMOs)",
      "Disability Benefits Questionnaires (DBQs)",
      "Specialist evaluations and diagnostic testing",
      "Medical nexus letters",
    ],
    howItWorks:
      "Eligible veterans apply for quick-turnaround grants. Funds are paid directly to certified medical professionals or partner providers.",
    impactGoals: [
      "Help veterans secure favorable VA claim outcomes",
      "Deliver aid within 10–14 business days of approval",
    ],
    testimonial: {
      quote:
        "All4Vets helped me keep my home while waiting on my VA claim to process. I'll never forget their kindness.",
      author: "James",
      branch: "US Army Veteran",
    },
    primaryCTA: "Apply for Assistance",
    secondaryCTA: "Donate to V-MEAF",
    disableCTA: false,
  },
  {
    id: 2,
    slug: "scholarships-education",
    title: "Scholarships & Education Grants",
    shortTitle: "Education & Scholarships",
    icon: "graduationCap",
    description:
      "Building pathways to civilian success through educational support.",
    fullDescription:
      "We provide funding for scholarships, tuition support, and training grants to help veteran dependents earn degrees, licenses, or vocational certifications that open doors to meaningful civilian careers.",
    whatItSupports: [
      "College and trade school tuition",
      "Certification and licensing programs",
      "Continuing education or career transition programs",
    ],
    primaryCTA: "Apply for a Scholarship",
    secondaryCTA: "Sponsor a Dependents' Education",
    disableCTA: true,
  },
  {
    id: 3,
    slug: "emergency-relief",
    title: "Emergency Financial Relief Fund",
    shortTitle: "Emergency Relief",
    icon: "alertCircle",
    description: "Immediate help when life doesn't wait for pay cycles.",
    fullDescription:
      "We offer immediate, short-term financial assistance to veterans and their families facing urgent hardships. Life's emergencies don't wait for pay cycles, and neither should veterans.",
    emergencyAidCovers: [
      "Rent and utility payments",
      "Medical or prescription needs",
      "Travel and family support",
      "Urgent living expenses",
    ],
    primaryCTA: "Request Emergency Aid",
    secondaryCTA: "Give to the Relief Fund",
    disableCTA: true,
  },
];

export const impactStats = [
  {
    id: 1,
    value: "$10,000+",
    label: "Aid Distributed",
    description: "Total financial support provided to veterans",
  },
  {
    id: 2,
    value: "600+",
    label: "Veterans Supported",
    description: "Lives changed through our programs",
  },
  {
    id: 3,
    value: "12",
    label: "Scholarships Awarded",
    description: "Educational opportunities funded",
  },
];

export const guidingPrinciples = [
  {
    id: 1,
    title: "Speed Matters",
    description:
      "We process applications quickly because veterans shouldn't have to wait for the help they need.",
  },
  {
    id: 2,
    title: "Transparency Always",
    description:
      "Every dollar is tracked and accounted for. Donors know exactly where their contributions go.",
  },
  {
    id: 3,
    title: "Honor in Action",
    description:
      "We treat every veteran with the dignity and respect they've earned through their service.",
  },
];

export const getInvolved = {
  headline: "Your Support Changes Lives.",
  subtext:
    "Whether you're an individual donor, a corporate partner, or a volunteer, you can make a direct difference in the lives of those who served.",
  options: [
    {
      title: "Donate Now",
      description: "Make a one-time or recurring gift",
      icon: "heart",
      url: "/donate",
    },
    {
      title: "Volunteer",
      description: "Give your time and skills",
      icon: "users",
      url: "/get-involved",
    },
    {
      title: "Corporate Partnerships",
      description: "Partner with us for greater impact",
      icon: "building",
      url: "/get-involved",
    },
  ],
};

export const ctaBanner = {
  headline: "Together, We Serve Those Who Served.",
  subtext:
    "Your contribution fuels hope, dignity, and stability for veterans across America.",
  cta: "Become a Supporter Today",
};

export const donationTiers = [
  {
    value: 25,
    label: "$25",
    impact: "Covers essential expenses",
    description:
      "Helps a veteran afford transportation, food, or document fees during the VA claim process.",
  },
  {
    value: 50,
    label: "$50",
    impact: "Provides immediate relief",
    description:
      "Supports emergency needs such as utilities, prescriptions, or short-term living costs.",
  },
  {
    value: 100,
    label: "$100",
    impact: "Funds growth opportunities",
    description:
      "Contributes to education grants and certification scholarships.",
  },
  {
    value: 250,
    label: "$250",
    impact: "Sustains long-term stability",
    description:
      "Offers assistance for rental payments, family emergencies, or extended financial hardships.",
  },
];

export const whyGive = [
  {
    id: 1,
    title: "Direct Impact",
    description:
      "90% of all contributions go straight to veteran aid programs.",
  },
  {
    id: 2,
    title: "Transparency",
    description:
      "Every dollar and grant is tracked and audited for full accountability.",
  },
  {
    id: 3,
    title: "Human Connection",
    description:
      "Your donation supports real veterans with real needs—not general funds.",
  },
  {
    id: 4,
    title: "Legacy of Service",
    description:
      "Honoring those who served by helping them rebuild and thrive.",
  },
];

export const testimonials = [
  {
    id: 1,
    quote:
      "All4Vets helped me keep my home while waiting on my VA claim to process. I'll never forget their kindness.",
    author: "James",
    branch: "US Army Veteran",
  },
  {
    id: 2,
    quote:
      "The scholarship I received changed my life. I'm now certified and working in a career I love. Thank you All4Vets!",
    author: "Maria S.",
    branch: "Navy Veteran",
  },
  {
    id: 3,
    quote:
      "When I faced an emergency, All4Vets was there within days. Professional, compassionate, and effective.",
    author: "Robert K.",
    branch: "Marine Corps Veteran",
  },
];

export const processSteps = [
  {
    id: 1,
    number: "01",
    title: "Apply for Aid",
    description:
      "Submit your request through our simple, confidential application process.",
  },
  {
    id: 2,
    number: "02",
    title: "Quick Review",
    description: "Our team reviews applications within 10-14 business days.",
  },
  {
    id: 3,
    number: "03",
    title: "Receive Support",
    description:
      "Approved funds are sent directly to service providers or to you.",
  },
];

export const navLinks = [
  { title: "Home", url: "/" },
  { title: "About Us", url: "/about" },
  { title: "Programs", url: "/programs" },
  { title: "Donate", url: "/donate" },
  { title: "Get Involved", url: "/get-involved" },
  { title: "Contact", url: "/contact" },
];

export const quickLinks = [
  { title: "Apply for Aid", url: "/programs" },
  { title: "Donate", url: "/donate" },
  { title: "Volunteer", url: "/get-involved" },
  { title: "Partner With Us", url: "/get-involved" },
];

export const footerLinks = {
  programs: [
    { title: "VA Claims Assistance", url: "/programs" },
    { title: "Education Grants", url: "/programs" },
    { title: "Emergency Relief", url: "/programs" },
    { title: "Apply for Aid", url: "/programs" },
  ],
  about: [
    { title: "Our Mission", url: "/about" },
    { title: "Our Impact", url: "/about" },
    { title: "Transparency", url: "/about" },
    { title: "Contact Us", url: "/contact" },
  ],
  support: [
    { title: "Donate", url: "/donate" },
    { title: "Volunteer", url: "/get-involved" },
    { title: "Corporate Partners", url: "/get-involved" },
    { title: "Fundraise", url: "/get-involved" },
  ],
};

// Keep existing blog posts and reviews for those pages
export const blogPosts = [
  {
    id: 1,
    title: "Understanding VA Healthcare Benefits: A Complete Guide",
    excerpt:
      "Navigate the complex VA healthcare system with our comprehensive guide covering eligibility, enrollment, and available services for veterans.",
    author: "Dr. Sarah Mitchell",
    date: "January 15, 2026",
    category: "Healthcare",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    content: "Full article content here...",
  },
  {
    id: 2,
    title: "5 Steps to Successfully Appeal a VA Claim Denial",
    excerpt:
      "Has your VA claim been denied? Learn the essential steps to file a successful appeal and get the benefits you deserve.",
    author: "John Richardson",
    date: "January 10, 2026",
    category: "Benefits",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
    content: "Full article content here...",
  },
  {
    id: 3,
    title: "Mental Health Resources Every Veteran Should Know",
    excerpt:
      "Discover essential mental health resources, crisis hotlines, and support networks available to veterans and their families.",
    author: "Dr. Michael Torres",
    date: "January 5, 2026",
    category: "Mental Health",
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80",
    content: "Full article content here...",
  },
  {
    id: 4,
    title: "Transitioning to Civilian Life: Career Opportunities for Veterans",
    excerpt:
      "Explore career paths, training programs, and resources to help veterans successfully transition into civilian workforce.",
    author: "Lisa Anderson",
    date: "December 28, 2025",
    category: "Career",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80",
    content: "Full article content here...",
  },
  {
    id: 5,
    title: "Housing Assistance Programs for Veterans in 2026",
    excerpt:
      "Learn about VA home loans, housing grants, and assistance programs available to veterans facing housing challenges.",
    author: "Robert Chen",
    date: "December 20, 2025",
    category: "Housing",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
    content: "Full article content here...",
  },
  {
    id: 6,
    title: "New Legislative Changes Affecting Veteran Benefits",
    excerpt:
      "Stay informed about recent legislative updates and how they impact veteran benefits, healthcare, and support services.",
    author: "Jennifer Walsh",
    date: "December 15, 2025",
    category: "News",
    image:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
    content: "Full article content here...",
  },
];

export const reviews = [
  {
    id: 1,
    name: "James Patterson",
    branch: "Army Veteran",
    rating: 5,
    date: "January 2026",
    title: "Life-Changing Support",
    review:
      "All4Vets helped me navigate the complex VA system when I was completely lost. Their advocacy team fought alongside me to secure the disability benefits I deserved after years of denials. The support was professional, compassionate, and incredibly effective.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
  },
  {
    id: 2,
    name: "Maria Santiago",
    branch: "Navy Veteran",
    rating: 5,
    date: "December 2025",
    title: "Finally Got the Help I Needed",
    review:
      "After struggling for months to understand my healthcare options, All4Vets connected me with experts who explained everything clearly. They helped me access mental health services that truly saved my life. I'm forever grateful.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
  },
  {
    id: 3,
    name: "Robert Williams",
    branch: "Marine Corps Veteran",
    rating: 5,
    date: "December 2025",
    title: "Exceptional Advocacy",
    review:
      "The team at All4Vets went above and beyond to help me with my housing situation. They connected me with resources I didn't even know existed and walked me through every step of the process. True professionals who care.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
  },
  {
    id: 4,
    name: "Linda Thompson",
    branch: "Air Force Veteran",
    rating: 5,
    date: "November 2025",
    title: "Highly Recommend",
    review:
      "All4Vets helped me transition from military to civilian life with confidence. Their career counseling and resume support landed me a great job. They truly understand the unique challenges veterans face.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
  },
  {
    id: 5,
    name: "David Martinez",
    branch: "Army Veteran",
    rating: 5,
    date: "November 2025",
    title: "Outstanding Service",
    review:
      "I was skeptical at first, but All4Vets proved to be exactly what I needed. They helped me appeal a denied claim and won. Their knowledge of VA regulations is impressive, and they never gave up on my case.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
  },
  {
    id: 6,
    name: "Sarah Johnson",
    branch: "Navy Veteran",
    rating: 5,
    date: "October 2025",
    title: "Compassionate and Effective",
    review:
      "As a female veteran, I sometimes felt overlooked by other organizations. All4Vets treated me with respect and dignity. They helped me access specialized healthcare and connected me with other female veterans for support.",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&q=80",
  },
];

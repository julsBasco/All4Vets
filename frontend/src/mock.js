// Mock data for All4Vets nonprofit website

export const siteConfig = {
  siteName: "All4Vets",
  tagline: "Empowering Veterans Through Medical Advocacy",
  nonprofit: "501(c)(3) Nonprofit Organization",
  contact: {
    email: "info@all4vets.org",
    phone: "(555) 123-4567"
  },
  social: [
    { name: "Facebook", url: "https://facebook.com" },
    { name: "Twitter", url: "https://twitter.com" },
    { name: "LinkedIn", url: "https://linkedin.com" },
    { name: "Instagram", url: "https://instagram.com" }
  ]
};

export const hero = {
  headline: "Because No Veteran Should Fight Alone",
  subtext: "We provide independent guidance, direct aid, and expert connections—so every veteran can access the support they deserve.",
  primaryCTA: "Donate Now",
  secondaryCTA: "Apply for Aid"
};

export const missionPillars = [
  {
    id: 1,
    icon: "users",
    title: "Empower",
    description: "Tools and guidance to navigate benefits and opportunities."
  },
  {
    id: 2,
    icon: "heart",
    title: "Support",
    description: "Direct assistance tailored to individual needs."
  },
  {
    id: 3,
    icon: "link",
    title: "Connect",
    description: "Access to trusted experts and peer communities."
  }
];

export const processSteps = [
  {
    id: 1,
    number: "01",
    title: "Apply for Aid",
    description: "Submit your request through our simple application process."
  },
  {
    id: 2,
    number: "02",
    title: "Connect with Experts",
    description: "Get matched with experienced advocates who understand your needs."
  },
  {
    id: 3,
    number: "03",
    title: "Receive Decision Support",
    description: "Access personalized guidance and direct assistance."
  }
];

export const testimonials = [
  {
    id: 1,
    quote: "This organization helped me secure the independent support I needed. They truly fight for us.",
    author: "John B.",
    branch: "Army Veteran"
  },
  {
    id: 2,
    quote: "The guidance I received was life-changing. I finally got the benefits I deserved after years of struggling.",
    author: "Maria S.",
    branch: "Navy Veteran"
  },
  {
    id: 3,
    quote: "Professional, compassionate, and effective. All4Vets made a real difference in my family's life.",
    author: "Robert K.",
    branch: "Marine Corps Veteran"
  }
];

export const donationAmounts = [
  { value: 50, label: "$50" },
  { value: 100, label: "$100" },
  { value: 250, label: "$250" },
  { value: 500, label: "$500" }
];

export const quickLinks = [
  { title: "Find Resources", url: "/resources" },
  { title: "Volunteer", url: "/volunteer" },
  { title: "Partner With Us", url: "/partner" },
  { title: "Events", url: "/events" }
];

export const navLinks = [
  { title: "Home", url: "/" },
  { title: "About Us", url: "/about" },
  { title: "Services", url: "/services" },
  { title: "Blog", url: "/blog" },
  { title: "FAQ", url: "/faq" }
];

export const footerLinks = {
  about: [
    { title: "Our Mission", url: "/mission" },
    { title: "Leadership", url: "/leadership" },
    { title: "Annual Reports", url: "/reports" },
    { title: "Contact", url: "/contact" }
  ],
  services: [
    { title: "Benefits Navigation", url: "/benefits" },
    { title: "Career Support", url: "/careers" },
    { title: "Housing Assistance", url: "/housing" },
    { title: "Mental Health", url: "/mental-health" }
  ],
  resources: [
    { title: "Blog", url: "/blog" },
    { title: "FAQ", url: "/faq" },
    { title: "Download Forms", url: "/forms" },
    { title: "Partner Organizations", url: "/partners" }
  ]
};

export const blogPosts = [
  {
    id: 1,
    title: "Understanding VA Healthcare Benefits: A Complete Guide",
    excerpt: "Navigate the complex VA healthcare system with our comprehensive guide covering eligibility, enrollment, and available services for veterans.",
    author: "Dr. Sarah Mitchell",
    date: "January 15, 2026",
    category: "Healthcare",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    content: "Full article content here..."
  },
  {
    id: 2,
    title: "5 Steps to Successfully Appeal a VA Claim Denial",
    excerpt: "Has your VA claim been denied? Learn the essential steps to file a successful appeal and get the benefits you deserve.",
    author: "John Richardson",
    date: "January 10, 2026",
    category: "Benefits",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
    content: "Full article content here..."
  },
  {
    id: 3,
    title: "Mental Health Resources Every Veteran Should Know",
    excerpt: "Discover essential mental health resources, crisis hotlines, and support networks available to veterans and their families.",
    author: "Dr. Michael Torres",
    date: "January 5, 2026",
    category: "Mental Health",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80",
    content: "Full article content here..."
  },
  {
    id: 4,
    title: "Transitioning to Civilian Life: Career Opportunities for Veterans",
    excerpt: "Explore career paths, training programs, and resources to help veterans successfully transition into civilian workforce.",
    author: "Lisa Anderson",
    date: "December 28, 2025",
    category: "Career",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80",
    content: "Full article content here..."
  },
  {
    id: 5,
    title: "Housing Assistance Programs for Veterans in 2026",
    excerpt: "Learn about VA home loans, housing grants, and assistance programs available to veterans facing housing challenges.",
    author: "Robert Chen",
    date: "December 20, 2025",
    category: "Housing",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
    content: "Full article content here..."
  },
  {
    id: 6,
    title: "New Legislative Changes Affecting Veteran Benefits",
    excerpt: "Stay informed about recent legislative updates and how they impact veteran benefits, healthcare, and support services.",
    author: "Jennifer Walsh",
    date: "December 15, 2025",
    category: "News",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
    content: "Full article content here..."
  }
];

export const reviews = [
  {
    id: 1,
    name: "James Patterson",
    branch: "Army Veteran",
    rating: 5,
    date: "January 2026",
    title: "Life-Changing Support",
    review: "All4Vets helped me navigate the complex VA system when I was completely lost. Their advocacy team fought alongside me to secure the disability benefits I deserved after years of denials. The support was professional, compassionate, and incredibly effective.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80"
  },
  {
    id: 2,
    name: "Maria Santiago",
    branch: "Navy Veteran",
    rating: 5,
    date: "December 2025",
    title: "Finally Got the Help I Needed",
    review: "After struggling for months to understand my healthcare options, All4Vets connected me with experts who explained everything clearly. They helped me access mental health services that truly saved my life. I'm forever grateful.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80"
  },
  {
    id: 3,
    name: "Robert Williams",
    branch: "Marine Corps Veteran",
    rating: 5,
    date: "December 2025",
    title: "Exceptional Advocacy",
    review: "The team at All4Vets went above and beyond to help me with my housing situation. They connected me with resources I didn't even know existed and walked me through every step of the process. True professionals who care.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80"
  },
  {
    id: 4,
    name: "Linda Thompson",
    branch: "Air Force Veteran",
    rating: 5,
    date: "November 2025",
    title: "Highly Recommend",
    review: "All4Vets helped me transition from military to civilian life with confidence. Their career counseling and resume support landed me a great job. They truly understand the unique challenges veterans face.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80"
  },
  {
    id: 5,
    name: "David Martinez",
    branch: "Army Veteran",
    rating: 5,
    date: "November 2025",
    title: "Outstanding Service",
    review: "I was skeptical at first, but All4Vets proved to be exactly what I needed. They helped me appeal a denied claim and won. Their knowledge of VA regulations is impressive, and they never gave up on my case.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80"
  },
  {
    id: 6,
    name: "Sarah Johnson",
    branch: "Navy Veteran",
    rating: 5,
    date: "October 2025",
    title: "Compassionate and Effective",
    review: "As a female veteran, I sometimes felt overlooked by other organizations. All4Vets treated me with respect and dignity. They helped me access specialized healthcare and connected me with other female veterans for support.",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&q=80"
  }
];
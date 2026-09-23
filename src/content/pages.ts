/**
 * Page copy — VivahLook content. Edit text here instead of in JSX.
 */

export const homeContent = {
  hero: {
    brand: "VivahLook",
    headline: "See Yourself in Your Perfect Wedding Look",
    supporting:
      "Upload your photo and preview stunning Indian wedding outfits before you buy. Try sherwanis, lehengas, sarees, and more.",
    primaryCta: { label: "Try VivahLook Free", href: "/studio" },
    secondaryCta: { label: "See How It Works", href: "/#how-it-works" },
  },
  features: {
    title: "How It Works",
    supporting:
      "Three simple steps to see yourself in your dream wedding outfit.",
    items: [
      {
        title: "01 — Upload Your Photo",
        description:
          "Upload a clear, well-lit photo. We preserve your face, skin tone, and natural features.",
      },
      {
        title: "02 — Choose Your Look",
        description:
          "Pick your wedding occasion, outfit type, and style. From royal sherwanis to pastel lehengas.",
      },
      {
        title: "03 — See Your Transformation",
        description:
          "Get a photorealistic visualization of yourself in your chosen wedding outfit. Download and share.",
      },
    ],
  },
  cta: {
    title: "Your wedding. Your style. See it before you wear it.",
    supporting:
      "Join thousands discovering their perfect wedding look with VivahLook.",
    button: { label: "Try Free Now", href: "/studio" },
  },
} as const;

export const aboutContent = {
  title: "About VivahLook",
  description: "The story behind VivahLook and our mission.",
  intro:
    "VivahLook helps you visualize your perfect Indian wedding outfit before you buy or get it tailored. Upload your photo, pick an occasion and outfit, and see a realistic preview of yourself.",
  sections: [
    {
      title: "Why VivahLook?",
      body: "Shopping for wedding outfits is exciting but overwhelming. Should you go with a royal sherwani or a modern bandhgala? A traditional red lehenga or a pastel saree? VivahLook lets you see yourself in different looks so you can make confident choices — without visiting dozens of stores.",
    },
    {
      title: "How it works",
      body: "Our AI-powered visualization technology creates photorealistic images of you wearing different wedding outfits. We preserve your face, skin tone, and natural features while showing you in beautifully styled wedding attire appropriate for each ceremony — from Haldi to Reception.",
    },
    {
      title: "Your privacy matters",
      body: "We take your privacy seriously. Uploaded photos are used only for generating your wedding looks and are not used for AI training. You can request deletion of your data at any time through our contact page.",
    },
  ],
} as const;

export const contactContent = {
  title: "Contact Us",
  description: "Get in touch with the VivahLook team.",
  intro:
    "Have a question, feedback, or need help? We would love to hear from you.",
  fields: {
    name: { label: "Name", placeholder: "Your name" },
    email: { label: "Email", placeholder: "you@example.com" },
    message: { label: "Message", placeholder: "How can we help?" },
  },
  submitLabel: "Send Message",
  successTitle: "Message Sent",
  successBody:
    "Thank you for reaching out. We will get back to you as soon as possible.",
} as const;

export const faqContent = {
  title: "Frequently Asked Questions",
  description: "Common questions about VivahLook.",
  items: [
    {
      question: "Is VivahLook free?",
      answer:
        "Yes! You get 2 free wedding look generations. After that, you can purchase affordable look packs starting at ₹99 for 10 looks.",
    },
    {
      question: "Do I need to create an account?",
      answer:
        "No, you can generate your first wedding looks without creating an account. Sign up only when you want to save your looks, view history, or purchase additional generations.",
    },
    {
      question: "Can I download my generated images?",
      answer:
        "Yes. Every generated look can be downloaded. Free looks include a subtle VivahLook watermark. Paid packs include unwatermarked HD downloads.",
    },
    {
      question: "What happens to my uploaded photos?",
      answer:
        "Your photos are processed securely on our servers and used only for generating your wedding looks. We do not sell your photos or use them for AI model training. Photos are retained temporarily for your session and you can request deletion at any time.",
    },
    {
      question: "What occasions and outfits are supported?",
      answer:
        "We support Haldi, Mehendi, Sangeet, Wedding, Reception, and Guest occasions. Outfits include Sherwani, Kurta Pajama, Bandhgala, Indo-Western, and Dhoti Kurta for men, and Lehenga, Saree, Anarkali, Sharara, and Indo-Western for women.",
    },
    {
      question: "How realistic are the generated images?",
      answer:
        "Our AI technology creates photorealistic visualizations that preserve your facial features, skin tone, and body proportions while showing you in beautifully styled wedding attire. Results vary based on photo quality — we recommend clear, well-lit photos with your face visible.",
    },
    {
      question: "Can I share my generated looks?",
      answer:
        "Absolutely! Every generated look has share and download buttons. Share directly to WhatsApp, Instagram, or any other platform.",
    },
  ],
} as const;

export const privacyContent = {
  title: "Privacy Policy",
  description: "How VivahLook handles your information and photos.",
  lastUpdated: "September 23, 2026",
  sections: [
    {
      title: "Overview",
      body: "VivahLook is committed to protecting your privacy. This policy explains what information we collect, how we use it, and your rights regarding your data — especially your uploaded photographs.",
    },
    {
      title: "Photos you upload",
      body: "When you upload a photo to generate a wedding look, it is processed securely on our servers. Your photos are used exclusively for generating your requested wedding visualizations. We do not sell, share, or use your photos for AI model training. Uploaded photos are retained temporarily for your active session and are automatically deleted thereafter.",
    },
    {
      title: "Information we collect",
      body: "We collect information you voluntarily provide (such as email if you create an account, and contact form submissions), basic usage analytics (page views, generation counts), and technical data necessary for the service (browser type, device type). We use Razorpay for payment processing — payment card details are handled directly by Razorpay and never stored on our servers.",
    },
    {
      title: "How we use information",
      body: "Information is used to provide the VivahLook service, process payments, improve the product experience, and respond to support requests. We do not sell personal information to third parties.",
    },
    {
      title: "Data deletion",
      body: "You can request deletion of your account and all associated data at any time by contacting us through our Contact page. We will process deletion requests promptly.",
    },
    {
      title: "Contact",
      body: "For privacy questions or data deletion requests, please use our Contact page or email us at the address listed in our site footer.",
    },
  ],
} as const;

export const termsContent = {
  title: "Terms & Conditions",
  description: "Terms of use for VivahLook.",
  lastUpdated: "September 23, 2026",
  sections: [
    {
      title: "Agreement",
      body: "By using VivahLook, you agree to these Terms & Conditions. If you do not agree, please do not use the service.",
    },
    {
      title: "The service",
      body: "VivahLook provides AI-powered wedding outfit visualization. You upload a photo, select wedding occasion and outfit preferences, and receive a generated image showing you in that outfit. Results are AI-generated visualizations and may not perfectly represent actual clothing or accessories.",
    },
    {
      title: "Acceptable use",
      body: "You may use VivahLook only for lawful, personal purposes. You must not upload images of other people without their consent, upload inappropriate or offensive content, attempt to reverse-engineer the service, or use the service for any purpose other than personal wedding outfit visualization.",
    },
    {
      title: "Payments and refunds",
      body: "Paid look packs are processed through Razorpay. All prices are in Indian Rupees (INR). Credits are added to your account upon successful payment verification. Due to the nature of digital content generation, refunds are evaluated on a case-by-case basis.",
    },
    {
      title: "Intellectual property",
      body: "Generated images are created for your personal use. The VivahLook brand, logo, website design, and underlying technology are owned by VivahLook. You retain rights to your uploaded photos.",
    },
    {
      title: "Limitation of liability",
      body: "VivahLook is provided as-is. We do not guarantee that generated images will match actual clothing. We are not liable for purchasing decisions made based on generated visualizations.",
    },
    {
      title: "Changes",
      body: "These terms may be updated. Continued use after changes constitutes acceptance of updated terms.",
    },
  ],
} as const;

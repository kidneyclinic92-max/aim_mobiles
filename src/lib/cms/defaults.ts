import type { SiteContent } from "./types";
import { brands, categories, products } from "@/lib/products-data";

export function getDefaultContent(): SiteContent {
  return {
    site: {
      name: "AimMobiles",
      logoLetter: "A",
      tagline: "Next-Gen Tech, Timeless Style",
      description:
        "Premium smartphones, accessories, and cutting-edge mobile technology.",
      metaTitle: "Aim Mobiles | Next-Gen Tech, Timeless Style",
      metaDescription:
        "Premium smartphones, earbuds, smartwatches, and accessories. Shop the latest mobile tech with free shipping, warranty, and expert support.",
      phone: "+1 (800) 246-6635",
      email: "hello@aimmobiles.com",
      address: "123 Tech Boulevard, San Francisco, CA 94105",
      location: "San Francisco, CA",
      hours: "Mon–Sat: 10am–8pm · Sun: 11am–6pm",
      copyright: "Aim Mobiles. All rights reserved.",
    },
    commerce: {
      freeShippingThreshold: 100,
      shippingCost: 9.99,
      taxRate: 0.08,
      deliveryEstimate: "3–5 business days",
    },
    navigation: {
      main: [
        { href: "/shop?sort=newest", label: "New Arrivals" },
        { href: "/shop?category=smartphones", label: "Smartphones" },
        { href: "/shop?category=earbuds", label: "Earbuds" },
        { href: "/shop?category=smartwatches", label: "Smartwatches" },
        { href: "/shop?category=accessories", label: "Accessories" },
        { href: "/shop?sort=bestseller", label: "Deals" },
        { href: "/about", label: "About" },
        { href: "/contact", label: "Contact" },
      ],
      mobileMain: [
        { href: "/", label: "Home" },
        { href: "/shop", label: "Shop" },
        { href: "/wishlist", label: "Wishlist" },
        { href: "/about", label: "About Us" },
        { href: "/contact", label: "Contact" },
      ],
      mobileSecondary: [
        { href: "/warranty", label: "Warranty" },
        { href: "/track-order", label: "Track Order" },
      ],
      footerShop: [
        { href: "/shop", label: "All Products" },
        { href: "/shop?category=smartphones", label: "Smartphones" },
        { href: "/shop?category=earbuds", label: "Earbuds" },
        { href: "/shop?category=smartwatches", label: "Smartwatches" },
        { href: "/shop?category=accessories", label: "Accessories" },
      ],
      footerSupport: [
        { href: "/contact", label: "Contact Us" },
        { href: "/warranty", label: "Warranty" },
        { href: "/track-order", label: "Track Order" },
        { href: "/about", label: "About Us" },
      ],
      social: [
        { href: "#", label: "Twitter" },
        { href: "#", label: "Instagram" },
        { href: "#", label: "Facebook" },
        { href: "#", label: "YouTube" },
      ],
      legal: [
        { href: "#", label: "Privacy" },
        { href: "#", label: "Terms" },
        { href: "#", label: "Cookies" },
      ],
    },
    home: {
      hero: {
        videoUrl: "/assets/herovideo.mp4",
        eyebrow: "New Arrivals 2026",
        headline: "Next-Gen Tech,",
        headlineHighlight: "Timeless Style",
        secondaryCta: "Browse Collection",
        secondaryCtaHref: "/shop",
        slides: [
          {
            image:
              "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=1600&q=80&auto=format&fit=crop",
            title: "iPhone 16 Pro",
            subtitle: "Forged in titanium. Powered by A18 Pro.",
            cta: "Shop Now",
            href: "/product/iphone-16-pro",
            accent: "from-cyan-500/20 to-blue-600/10",
          },
          {
            image:
              "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=1600&q=80&auto=format&fit=crop",
            title: "Galaxy S25 Ultra",
            subtitle: "Galaxy AI meets 200MP photography.",
            cta: "Discover",
            href: "/product/samsung-s25-ultra",
            accent: "from-purple-500/20 to-violet-600/10",
          },
          {
            image:
              "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=1600&q=80&auto=format&fit=crop",
            title: "Nothing Phone (3)",
            subtitle: "Transparent design. Unmistakable style.",
            cta: "Explore",
            href: "/product/nothing-phone-3",
            accent: "from-teal-500/20 to-cyan-600/10",
          },
        ],
        brandMarquee: ["Apple", "Samsung", "Google", "Nothing", "Sony", "Anker"],
      },
      featured: {
        eyebrow: "Curated",
        title: "Featured",
        highlight: "Products",
        description: "Hand-picked flagships and accessories our team loves.",
      },
      categories: {
        eyebrow: "Categories",
        title: "Find Your Perfect",
        highlight: "Match",
        description:
          "Curated collections for every part of your mobile lifestyle.",
      },
      bestSellers: {
        eyebrow: "Top Picks",
        title: "Best",
        highlight: "Sellers",
        viewAllHref: "/shop?sort=bestseller",
      },
      newArrivals: {
        eyebrow: "Just Landed",
        title: "New",
        highlight: "Arrivals",
        viewAllHref: "/shop?sort=newest",
      },
      trustSignals: [
        {
          icon: "truck",
          title: "Free Shipping",
          description: "On orders over $100 nationwide.",
          stat: "2–3 days",
        },
        {
          icon: "shield",
          title: "2-Year Warranty",
          description: "Full coverage on every device.",
          stat: "100%",
        },
        {
          icon: "refresh",
          title: "30-Day Returns",
          description: "Hassle-free, no questions asked.",
          stat: "Easy",
        },
        {
          icon: "headphones",
          title: "24/7 Support",
          description: "Expert help whenever you need it.",
          stat: "Always",
        },
      ],
      testimonials: {
        eyebrow: "Reviews",
        title: "Loved by",
        highlight: "Thousands",
        items: [
          {
            name: "Alexandra Chen",
            role: "Tech Enthusiast",
            avatar: "AC",
            rating: 5,
            text: "Aim Mobiles delivered my iPhone 16 Pro the next day. The packaging was premium, and the customer service was exceptional.",
          },
          {
            name: "Marcus Williams",
            role: "Photography Pro",
            avatar: "MW",
            rating: 5,
            text: "Best deal on the Galaxy S25 Ultra with a genuine warranty. The buying experience felt as premium as the phone itself.",
          },
          {
            name: "Priya Sharma",
            role: "Software Engineer",
            avatar: "PS",
            rating: 5,
            text: "The curated accessory selection saved me hours of research. Everything was authentic and perfectly compatible.",
          },
          {
            name: "David Okonkwo",
            role: "Content Creator",
            avatar: "DO",
            rating: 5,
            text: "From browsing to checkout, the experience was seamless. The quick view and specs helped me choose perfectly.",
          },
        ],
      },
      newsletter: {
        eyebrow: "Exclusive Access",
        title: "Stay Ahead of the",
        highlight: "Curve",
        description:
          "Early access to drops, member-only deals, and expert picks. Join 50,000+ tech enthusiasts.",
        placeholder: "you@email.com",
        buttonText: "Subscribe",
        disclaimer: "No spam. Unsubscribe anytime.",
        successMessage:
          "Thanks for subscribing! Check your inbox for a welcome offer.",
      },
    },
    shop: {
      eyebrow: "Collection",
      title: "Shop Everything",
      subtitle:
        "Flagships, wearables, and accessories — curated for quality.",
      searchPlaceholder: "Search phones, earbuds, accessories…",
    },
    about: {
      metaTitle: "About Us",
      metaDescription:
        "Learn about Aim Mobiles — our mission to deliver premium mobile technology with exceptional service.",
      eyebrow: "Our Story",
      title: "Redefining Mobile",
      titleHighlight: "Retail",
      intro:
        "Founded in 2020, Aim Mobiles was born from a simple belief: buying a phone should be as premium as the device itself. We've grown from a small startup to a trusted destination for tech enthusiasts worldwide.",
      stats: [
        { value: "50K+", label: "Happy Customers" },
        { value: "200+", label: "Products" },
        { value: "4.9", label: "Average Rating" },
        { value: "24/7", label: "Support" },
      ],
      storyImage:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80&auto=format&fit=crop",
      storyTitle: "Built for People Who Love Tech",
      storyParagraphs: [
        "We're not just another electronics store. Aim Mobiles is a curated experience designed for people who appreciate craftsmanship, innovation, and design. Every product page, every unboxing, every interaction is crafted to match the premium quality of the devices we sell.",
        "Our team of certified technicians and product specialists ensures you get expert advice — whether you're choosing your first smartphone or upgrading to the latest flagship.",
      ],
      valuesTitle: "What We",
      valuesHighlight: "Stand For",
      values: [
        {
          icon: "target",
          title: "Our Mission",
          description:
            "To make premium mobile technology accessible to everyone, with transparency, authenticity, and exceptional customer care.",
        },
        {
          icon: "award",
          title: "Quality First",
          description:
            "Every product in our catalog is hand-picked and verified authentic. We partner only with authorized distributors.",
        },
        {
          icon: "users",
          title: "Customer Obsessed",
          description:
            "From pre-sale advice to post-purchase support, our team of tech experts is here to help you find the perfect device.",
        },
        {
          icon: "globe",
          title: "Sustainability",
          description:
            "We're committed to reducing e-waste through trade-in programs, eco-friendly packaging, and responsible recycling.",
        },
      ],
    },
    contact: {
      metaTitle: "Contact",
      metaDescription: "Get in touch with Aim Mobiles support team.",
      eyebrow: "Get in Touch",
      title: "Contact",
      titleHighlight: "Us",
      intro:
        "Have a question about a product, order, or warranty? We're here to help.",
      formTitle: "Send a Message",
      successMessage: "Message sent! We'll get back to you within 24 hours.",
      info: [
        {
          icon: "phone",
          title: "Phone",
          value: "+1 (800) 246-6635",
          description: "Mon–Fri, 9am–6pm PST",
        },
        {
          icon: "mail",
          title: "Email",
          value: "hello@aimmobiles.com",
          description: "We reply within 24 hours",
        },
        {
          icon: "map-pin",
          title: "Address",
          value: "123 Tech Boulevard",
          description: "San Francisco, CA 94105",
        },
        {
          icon: "clock",
          title: "Hours",
          value: "Mon–Sat: 10am–8pm",
          description: "Sun: 11am–6pm",
        },
      ],
    },
    warranty: {
      metaTitle: "Warranty",
      metaDescription:
        "Aim Mobiles warranty coverage — 2-year protection on all devices with hassle-free claims.",
      title: "Warranty",
      titleHighlight: "Protection",
      intro:
        "Every device purchased from Aim Mobiles comes with a comprehensive 2-year warranty. Shop with confidence knowing you're protected.",
      coverageTitle: "What's Covered",
      coverage: [
        "Manufacturing defects and hardware failures",
        "Battery degradation below 80% capacity",
        "Display and touch screen issues",
        "Charging port and connectivity problems",
        "Speaker and microphone malfunctions",
        "Camera and sensor defects",
      ],
      processTitle: "Claim Process",
      steps: [
        {
          step: "01",
          title: "Submit a Claim",
          description:
            "Contact our support team with your order number and a description of the issue.",
        },
        {
          step: "02",
          title: "Diagnosis",
          description:
            "Our technicians will assess the issue remotely or schedule an in-store evaluation.",
        },
        {
          step: "03",
          title: "Resolution",
          description:
            "We'll repair, replace, or refund based on the warranty terms — usually within 5 business days.",
        },
      ],
      notCoveredTitle: "Not Covered",
      notCovered: [
        "Accidental damage (drops, liquid spills, cracks)",
        "Unauthorized repairs or modifications",
        "Normal wear and tear (scratches, dents)",
        "Software issues not caused by hardware defects",
        "Loss or theft",
      ],
      notCoveredNote:
        "Need accidental damage protection? Ask about our Aim Care+ extended warranty plan at checkout.",
      ctaTitle: "Need to file a claim?",
      ctaDescription: "Our support team is ready to help you through the process.",
      ctaButton: "Contact Support",
      ctaHref: "/contact",
    },
    footer: {
      newsletterTitle: "Newsletter",
      newsletterDescription: "Exclusive deals and early access.",
      newsletterPlaceholder: "Your email",
      newsletterButton: "Subscribe",
    },
    categories: [...categories],
    brands: [...brands],
    products: JSON.parse(JSON.stringify(products)),
  };
}

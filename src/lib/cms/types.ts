import type { Category, Product } from "@/lib/types";

export type NavLink = { href: string; label: string };

export type SectionCopy = {
  eyebrow?: string;
  title: string;
  highlight?: string;
  description?: string;
};

export type HeroSlide = {
  image: string;
  title: string;
  subtitle: string;
  cta: string;
  href: string;
  accent: string;
};

export type TrustSignal = {
  icon: string;
  title: string;
  description: string;
  stat: string;
};

export type Testimonial = {
  name: string;
  role: string;
  avatar: string;
  rating: number;
  text: string;
};

export type CategoryItem = {
  id: Category;
  name: string;
  description: string;
  icon: string;
  image: string;
};

export type AboutValue = {
  icon: string;
  title: string;
  description: string;
};

export type AboutStat = {
  value: string;
  label: string;
};

export type ContactInfoItem = {
  icon: string;
  title: string;
  value: string;
  description: string;
};

export type ContactFormCopy = {
  nameLabel: string;
  emailLabel: string;
  subjectLabel: string;
  messageLabel: string;
  messagePlaceholder: string;
  submitLabel: string;
};

export type WarrantyStep = {
  step: string;
  title: string;
  description: string;
};

export type ShopSortTab = {
  value: string;
  label: string;
};

export type ShopBrowseCopy = {
  tabLabel: string;
  categoriesHeading: string;
  brandsHeading: string;
  allProductsLabel: string;
  filtersHeading: string;
  clearAllLabel: string;
};

export type SiteContent = {
  site: {
    name: string;
    logoLetter: string;
    logoUrl: string;
    headerTagline: string;
    tagline: string;
    description: string;
    metaTitle: string;
    metaDescription: string;
    phone: string;
    email: string;
    address: string;
    location: string;
    hours: string;
    copyright: string;
  };
  announcement: {
    message: string;
  };
  commerce: {
    freeShippingThreshold: number;
    shippingCost: number;
    taxRate: number;
    deliveryEstimate: string;
  };
  navigation: {
    main: NavLink[];
    mobileMain: NavLink[];
    mobileSecondary: NavLink[];
    footerShop: NavLink[];
    footerSupport: NavLink[];
    social: NavLink[];
    legal: NavLink[];
  };
  home: {
    hero: {
      videoUrl: string;
      headline: string;
      headlineHighlight: string;
      primaryCta: string;
      primaryCtaHref: string;
      secondaryCta: string;
      secondaryCtaHref: string;
      slides: HeroSlide[];
    };
    featured: SectionCopy & { viewAllHref?: string; viewAllLabel?: string };
    categories: SectionCopy;
    bestSellers: SectionCopy & { viewAllHref: string; viewAllLabel?: string };
    newArrivals: SectionCopy & { viewAllHref: string; viewAllLabel?: string };
    trustSignals: TrustSignal[];
    testimonials: SectionCopy & { items: Testimonial[] };
  };
  shop: {
    title: string;
    metaTitle: string;
    metaDescription: string;
    searchPlaceholder: string;
    breadcrumbHome: string;
    newArrivalsTitle: string;
    dealsTitle: string;
    productsLabel: string;
    emptyTitle: string;
    emptyDescription: string;
    sortTabs: ShopSortTab[];
    browse: ShopBrowseCopy;
  };
  about: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    title: string;
    titleHighlight: string;
    intro: string;
    stats: AboutStat[];
    storyImage: string;
    storyTitle: string;
    storyParagraphs: string[];
    valuesTitle: string;
    valuesHighlight: string;
    values: AboutValue[];
  };
  contact: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    title: string;
    titleHighlight: string;
    intro: string;
    formTitle: string;
    successMessage: string;
    form: ContactFormCopy;
    info: ContactInfoItem[];
  };
  warranty: {
    metaTitle: string;
    metaDescription: string;
    title: string;
    titleHighlight: string;
    intro: string;
    coverageTitle: string;
    coverage: string[];
    processTitle: string;
    steps: WarrantyStep[];
    notCoveredTitle: string;
    notCovered: string[];
    notCoveredNote: string;
    ctaTitle: string;
    ctaDescription: string;
    ctaButton: string;
    ctaHref: string;
  };
  footer: {
    shopColumnTitle: string;
    supportColumnTitle: string;
    newsletterTitle: string;
    newsletterDescription: string;
    newsletterPlaceholder: string;
    newsletterButton: string;
  };
  categories: CategoryItem[];
  brands: string[];
  products: Product[];
};

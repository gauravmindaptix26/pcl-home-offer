// Cache shared DOM nodes once so repeated interactions stay efficient and easy to read.
const body = document.body;
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
const navDropdownItems = document.querySelectorAll(".nav__item--has-submenu");
const hero = document.querySelector(".hero");
const prevButton = document.querySelector(".hero__arrow--prev");
const nextButton = document.querySelector(".hero__arrow--next");
const backToTopButton = document.querySelector(".floating-tools__top");
const leadForms = document.querySelectorAll("[data-lead-form]");
const leadEmailRecipient = "Jdinvestment901@gmail.com";
const leadFormEndpoint = `https://formsubmit.co/ajax/${encodeURIComponent(leadEmailRecipient)}`;
const leadModal = document.querySelector("[data-lead-modal]");
const openLeadModalButtons = document.querySelectorAll("[data-open-lead-modal]");
const closeLeadModalButtons = document.querySelectorAll("[data-close-lead-modal]");
const leadModalPhoneInput = leadModal?.querySelector("input[name='phone']");
const locationPage = document.querySelector("[data-location-page]");
const faqCards = document.querySelectorAll(".location-faq-card");
let lastFocusedElement = null;

// Slide content stays centralized here, which keeps rendering logic clean.
const heroScenes = [
  {
    badge: "GET A CASH OFFER",
    title: "Sell your home directly and avoid the hassle of listings, showings, and commissions.",
    subtitle: "We are a trusted direct cash home buyer in the Midsouth, purchasing properties in any condition - completely as-is."
  }
];

const locationAreas = [
  {
    slug: "horn-lake-ms",
    path: "sell-your-house-in-horn-lake",
    name: "Horn Lake, MS",
    badge: "HORN LAKE CASH OFFER",
    title: "We Buy Houses in Horn Lake, MS",
    summary: "Sell your home fast in Horn Lake, MS and receive a fair cash offer within 24 hours.",
    overviewTitle: "A Faster Way to Sell Your Horn Lake Property",
    overviewText: "If you need to sell your house fast in Horn Lake MS, whether it needs repairs, is inherited, sitting vacant, or you simply need to move quickly, PCL Home Offer is here to help. We buy homes directly from homeowners and make the entire process simple and stress free from your first contact all the way to closing day.",
    formCopy: "Tell us about your Horn Lake property and our team will contact you with the next steps.",
    steps: [
      {
        step: "Step 1",
        iconKey: "form",
        title: "Tell Us About Your Property",
        text: "Fill out our short form or call (901) 264-0122. Share your address and a few basic details about your home. No inspection required upfront and no lengthy paperwork."
      },
      {
        step: "Step 2",
        iconKey: "offer",
        title: "Receive Your Cash Offer",
        text: "Our local team reviews your property details and gets back to you quickly, often within 24 hours, with a fair, no-obligation cash offer. No pressure and no commitment until you are ready."
      },
      {
        step: "Step 3",
        iconKey: "schedule",
        title: "Pick Your Closing Date And Get Paid",
        text: "Once you accept, we work around your schedule. Need to close in a week or need a few extra weeks first? You choose the closing date, and we handle the rest."
      }
    ],
    terms: [
      {
        title: "Facing Foreclosure",
        iconKey: "foreclosure",
        text: "If you are behind on payments and need to sell before the bank steps in, we can move quickly to help you protect your equity and credit."
      },
      {
        title: "Inherited Property",
        iconKey: "probate",
        text: "Inherited a home you do not plan to keep? We make it easier to sell, even if the estate is still going through probate."
      },
      {
        title: "Divorce",
        iconKey: "divorce",
        text: "When a shared property needs to be sold quickly and cleanly, we offer a simple path forward without the delays of a traditional listing."
      },
      {
        title: "Relocation",
        iconKey: "relocation",
        text: "Moving for work or family and cannot afford to wait months for a buyer? We close on your timeline."
      },
      {
        title: "Tired Landlords",
        iconKey: "tenant",
        text: "Done dealing with difficult tenants or a rental property that costs more than it earns? We will make you an offer regardless of occupancy."
      },
      {
        title: "Financial Hardship",
        iconKey: "income",
        text: "Medical bills, job loss, or mounting debt, whatever the reason, we are here to help you move forward without judgment."
      }
    ],
    compareHeadings: {
      benefit: "Benefits",
      positive: "PCL Home Offer",
      negative: "Traditional Listing"
    },
    compareRows: [
      {
        benefit: "Time to Offer",
        positive: "Within 24 hours",
        negative: "Weeks to months"
      },
      {
        benefit: "Repairs Needed",
        positive: "None",
        negative: "Usually required"
      },
      {
        benefit: "Agent Commissions",
        positive: "None",
        negative: "Typically 5 - 6%"
      },
      {
        benefit: "Closing Timeline",
        positive: "You choose",
        negative: "Buyer-dependent"
      },
      {
        benefit: "Financing Fall-Through Risk",
        positive: "None",
        negative: "Common"
      },
      {
        benefit: "Open Houses / Showings",
        positive: "None",
        negative: "Multiple"
      }
    ],
    metaDescription: "Request a direct cash offer for your Horn Lake, MS property. PCL Home Offer buys houses as-is with flexible closing dates.",
    marketPoints: [
      "Cash offer review within 24 hours",
      "No repairs, showings, or agent commissions",
      "Flexible closing timeline for Horn Lake sellers"
    ],
    benefits: [
      {
        title: "Sell As-Is",
        text: "We buy Horn Lake homes in their current condition, so you do not need to fix, paint, or clean before selling."
      },
      {
        title: "Avoid Listing Delays",
        text: "Skip the uncertainty of traditional buyers, financing fall-throughs, and repeated showings."
      },
      {
        title: "Move On Your Timeline",
        text: "Whether you need a quick close or extra time, we work around the schedule that fits your situation."
      }
    ]
  },
  {
    slug: "southaven-ms",
    path: "sell-your-house-in-southaven",
    name: "Southaven, MS",
    badge: "SOUTHAVEN CASH OFFER",
    title: "We Buy Houses in Southaven, MS",
    summary: "Need to sell a Southaven property fast? We buy houses directly for cash and keep the sale straightforward.",
    overviewTitle: "Sell in Southaven without the usual hassle",
    overviewText: "From outdated homes to rental properties and inherited houses, we help Southaven homeowners sell without repairs or agent fees. Our team reviews the property quickly and gives you a simple path forward.",
    formCopy: "Share your Southaven property details and we will reach out with your local offer options.",
    metaDescription: "Get a cash offer for your Southaven, MS house. We buy homes as-is and close on your timeline.",
    marketPoints: [
      "Direct local cash-buyer process",
      "No cleaning or renovation work needed",
      "Simple closings for Southaven homeowners"
    ],
    benefits: [
      {
        title: "No Agent Fees",
        text: "You can sell your Southaven property directly to us without listing commissions eating into your proceeds."
      },
      {
        title: "Straightforward Communication",
        text: "You deal with one team focused on your property instead of juggling buyers, agents, and lenders."
      },
      {
        title: "Cash Buyer Certainty",
        text: "Because we buy directly, you avoid the common delays that happen when a buyer depends on financing."
      }
    ]
  },
  {
    slug: "olive-branch-ms",
    path: "sell-your-house-in-olive-branch",
    name: "Olive Branch, MS",
    badge: "OLIVE BRANCH CASH OFFER",
    title: "We Buy Houses in Olive Branch, MS",
    summary: "Sell your Olive Branch house directly for cash and avoid the stress of preparing it for the market.",
    overviewTitle: "A direct home-selling option for Olive Branch owners",
    overviewText: "If you are relocating, handling a distressed property, or simply want a cleaner sale, we can help. PCL Home Offer buys Olive Branch homes as-is and keeps the process focused on speed, clarity, and convenience.",
    formCopy: "Enter your Olive Branch property details and our team will follow up quickly.",
    metaDescription: "Sell your Olive Branch, MS house as-is for cash. PCL Home Offer provides flexible, direct home-buying solutions.",
    marketPoints: [
      "Fast review for Olive Branch properties",
      "No staging, repairs, or open houses",
      "Flexible closing plans that fit your move"
    ],
    benefits: [
      {
        title: "Less Stress",
        text: "We remove the pressure of getting your Olive Branch property market-ready before you can sell."
      },
      {
        title: "Sell Problem Properties",
        text: "Homes with deferred maintenance, tenant issues, or major updates needed can still qualify for a direct offer."
      },
      {
        title: "Keep It Private",
        text: "Your sale stays off the open market, which means fewer disruptions and a more controlled process."
      }
    ]
  }
];

const locationAreaLookup = Object.fromEntries(
  locationAreas.map((location) => [location.slug, location])
);

const locationPathLookup = Object.fromEntries(
  locationAreas.map((location) => [location.path, location])
);

const locationContentIcons = {
  form: `
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <rect x="7" y="5.5" width="18" height="21" rx="3.5" fill="none" stroke="currentColor" stroke-width="2.2"/>
      <path d="M11 11h10M11 16h7M16.5 22.5l2 2 4-4.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,
  offer: `
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <rect x="5.5" y="9" width="21" height="14" rx="4" fill="none" stroke="currentColor" stroke-width="2.2"/>
      <circle cx="16" cy="16" r="3.5" fill="none" stroke="currentColor" stroke-width="2.2"/>
      <path d="M16 11.7v8.6M13.8 13.8c.5-.8 1.3-1.3 2.3-1.3 1.3 0 2.3.8 2.3 1.9 0 1.1-.7 1.7-2.3 2-1.5.3-2.3.9-2.3 2 0 1.1 1 2 2.5 2 1 0 1.8-.3 2.4-1" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `,
  schedule: `
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <rect x="5.5" y="7.5" width="21" height="18" rx="4" fill="none" stroke="currentColor" stroke-width="2.2"/>
      <path d="M10 4.8v5M22 4.8v5M5.5 13h21M12.5 18.3l2.2 2.2 5-5.2" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,
  commission: `
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="9" fill="none" stroke="currentColor" stroke-width="2.2"/>
      <path d="M12 12.5c.6-1.2 1.8-1.9 3.4-1.9 1.8 0 3.2 1 3.2 2.5 0 1.5-1 2.3-3.1 2.7-2 .3-3.1 1.1-3.1 2.6 0 1.5 1.4 2.6 3.4 2.6 1.4 0 2.6-.5 3.3-1.4M16 9.4v13.2M8.4 8.4l15.2 15.2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `,
  closing: `
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M8 14.5 16 8l8 6.5v9.5H8z" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/>
      <path d="M13.2 24V17.5h5.6V24M6.5 14.5 16 6.8l9.5 7.7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="m22.8 11.2 2 2 3.2-3.4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,
  cash: `
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M10 10.5h12a4 4 0 0 1 4 4v7a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4v-7a4 4 0 0 1 4-4Z" fill="none" stroke="currentColor" stroke-width="2.2"/>
      <path d="M12.5 16h7M16 12.5v7M22.8 8.2l2 2" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
    </svg>
  `,
  repairs: `
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M8 15.5 16 9l8 6.5V24H8z" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/>
      <path d="m10.5 24 5.2-5.2M18.6 12l2.8 2.8M13.6 21.1l-2-2 5.6-5.6a2 2 0 1 1 2.8 2.8Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,
  showings: `
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M4.8 16s4-6.2 11.2-6.2S27.2 16 27.2 16s-4 6.2-11.2 6.2S4.8 16 4.8 16Z" fill="none" stroke="currentColor" stroke-width="2.2"/>
      <circle cx="16" cy="16" r="3.2" fill="none" stroke="currentColor" stroke-width="2.2"/>
      <path d="M7.2 24.8 24.8 7.2" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
    </svg>
  `,
  cleaning: `
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M9 25h14M12.2 24.8V13.2l7.6 0v11.6M14 13.2V9.8h4v3.4M8.6 21.5l3.6-3.6M10.8 17.9l-2.2-2.2" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="m21.8 11.2 1.2 1.2 2.2-2.4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,
  foreclosure: `
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M8 15.2 16 8.6l8 6.6V24H8z" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/>
      <path d="M12.5 24v-4.8h7V24M10.2 13.2l11.6 11.6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
    </svg>
  `,
  bankruptcy: `
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M8 10.5h8.5l-2 3.6 4 3-3.6 6H8z" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/>
      <path d="M20.5 10.8h5.5M20.5 15.5h4.2M20.5 20.2h3.2" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
    </svg>
  `,
  probate: `
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M8 14.8 16 8l8 6.8V24H8z" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/>
      <circle cx="11.5" cy="19" r="1.7" fill="currentColor"/>
      <circle cx="16" cy="17.5" r="1.7" fill="currentColor"/>
      <circle cx="20.5" cy="19" r="1.7" fill="currentColor"/>
      <path d="M11.5 22v2M16 20.5V24M20.5 22v2" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
    </svg>
  `,
  hoarder: `
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M8 15 16 8.5l8 6.5V24H8z" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/>
      <path d="M10.8 19.8h4.2l1.5-2.3 2.2 3.4h2.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,
  relocation: `
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M6.8 14.5 12 10l5.2 4.5V24H6.8zM14.8 11.5 20 7l5.2 4.5V24h-10.4z" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/>
      <path d="M12.5 18h7M17 15l3 3-3 3" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,
  damaged: `
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M8 15 16 8.5l8 6.5V24H8z" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/>
      <path d="m14.4 13.5-2.2 4h2.3l-1.2 4 4-5.4h-2l1.8-2.6" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
    </svg>
  `,
  divorce: `
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="11.2" cy="10.8" r="2.5" fill="none" stroke="currentColor" stroke-width="2.2"/>
      <circle cx="20.8" cy="10.8" r="2.5" fill="none" stroke="currentColor" stroke-width="2.2"/>
      <path d="M8.8 23v-7l2.4-2.2 2.3 2.2V23M18.5 23v-7l2.3-2.2 2.4 2.2V23M14 14.4l4 4.2M18 14.4l-4 4.2" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,
  downsizing: `
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M7.5 18.5h8V24h-8zM16.5 11h8v13h-8z" fill="none" stroke="currentColor" stroke-width="2.2"/>
      <path d="M10.8 15.5 16 11l5.2 4.5M11.5 24v-3.5h2.8V24M19 24v-5.2h3V24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/>
    </svg>
  `,
  payment: `
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M8 15.2 16 8.6l8 6.6V24H8z" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/>
      <path d="M16 14.2v6.4M14 16.1c.5-.8 1.2-1.2 2.1-1.2 1.1 0 2 .6 2 1.6 0 .9-.6 1.4-2 1.7-1.3.3-2 .8-2 1.7 0 1 1 1.7 2.2 1.7.9 0 1.6-.3 2.1-.8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `,
  taxes: `
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M8 15 16 8.5l8 6.5V24H8z" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/>
      <rect x="12" y="15.5" width="8" height="6.5" rx="1.4" fill="none" stroke="currentColor" stroke-width="2"/>
      <path d="M12.8 17.6h6.4M14.5 20h3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `,
  agent: `
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="9.8" r="3.2" fill="none" stroke="currentColor" stroke-width="2.2"/>
      <path d="M10.2 24v-4.8c0-2.4 2.6-4.2 5.8-4.2s5.8 1.8 5.8 4.2V24M22.5 10.5l4.2 4.2M26.7 10.5l-4.2 4.2" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
    </svg>
  `,
  tenant: `
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M8 15 16 8.5l8 6.5V24H8z" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/>
      <circle cx="16" cy="17" r="2.3" fill="none" stroke="currentColor" stroke-width="2"/>
      <path d="M12.5 24v-2c0-1.9 1.6-3.3 3.5-3.3s3.5 1.4 3.5 3.3v2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `,
  fire: `
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M8 15.2 16 8.5l8 6.7V24H8z" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/>
      <path d="M16 22.5c-1.4 0-2.4-.9-2.4-2.2 0-1.7 1.7-2.6 1.7-4.3 1.8 1 3.1 2.3 3.1 4.1 0 1.4-1 2.4-2.4 2.4Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
    </svg>
  `,
  listing: `
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M8 16 16 9l8 7v8H8z" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/>
      <path d="M11 12.5V8.8l4-2.8M23.2 12.8a5.8 5.8 0 1 1-3.3 10.5M23.2 12.8v3.2h-3.1" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,
  income: `
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M8 24V11M14 24v-7M20 24v-10M26 24V8" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
      <path d="M8 10.5 13 15l5-4.3 3.8 2.8L26 8.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="26" cy="8" r="2.2" fill="none" stroke="currentColor" stroke-width="2"/>
    </svg>
  `
};

function getLocationShortName(locationName) {
  return locationName.replace(/,\s*MS$/i, "").trim();
}

function buildLocationPageContent(location) {
  const shortName = getLocationShortName(location.name);
  const defaultSteps = [
    {
      step: "Step 1",
      title: "Fill Out The Form Or Call Us",
      text: `Tell us a little about your ${shortName} property and your timeline. We only need the basics to get started.`,
      icon: locationContentIcons.form
    },
    {
      step: "Step 2",
      title: "Get Your Fair Cash Offer",
      text: `After we review the house and confirm the situation, our team will put together a direct cash offer for your property.`,
      icon: locationContentIcons.offer
    },
    {
      step: "Step 3",
      title: "Close On Your Schedule",
      text: `Choose the closing timeline that fits your move. Whether you need speed or flexibility, we work around your plans.`,
      icon: locationContentIcons.schedule
    }
  ];
  const steps = (location.steps || defaultSteps).map((item, index) => ({
    step: item.step || defaultSteps[index]?.step || `Step ${index + 1}`,
    title: item.title || defaultSteps[index]?.title || "",
    text: item.text || defaultSteps[index]?.text || "",
    icon:
      item.icon ||
      (item.iconKey ? locationContentIcons[item.iconKey] : "") ||
      defaultSteps[index]?.icon ||
      locationContentIcons.form
  }));
  const defaultTerms = [
    {
      title: "No real estate commissions",
      text: "We buy directly, so there are no agent fees or commission costs reducing your bottom line.",
      icon: locationContentIcons.commission
    },
    {
      title: "We close on your schedule",
      text: `If you want to sell quickly or need a little extra time in ${shortName}, we can work around your timeline.`,
      icon: locationContentIcons.closing
    },
    {
      title: "Competitive cash offer",
      text: "You receive a direct cash offer based on the property and situation instead of waiting on buyer financing.",
      icon: locationContentIcons.cash
    },
    {
      title: "No upgrades or repairs",
      text: `We buy houses in ${shortName} as-is, which means you do not need to repair, update, or renovate first.`,
      icon: locationContentIcons.repairs
    },
    {
      title: "Skip the showings",
      text: "Avoid open houses, repeated walkthroughs, and the stress of keeping the property market-ready.",
      icon: locationContentIcons.showings
    },
    {
      title: "No cleaning necessary",
      text: "You do not need to haul away junk or deep-clean the property before moving forward with a sale.",
      icon: locationContentIcons.cleaning
    }
  ];
  const terms = (location.terms || defaultTerms).map((item, index) => ({
    title: item.title || defaultTerms[index]?.title || "",
    text: item.text || defaultTerms[index]?.text || "",
    icon:
      item.icon ||
      (item.iconKey ? locationContentIcons[item.iconKey] : "") ||
      defaultTerms[index]?.icon ||
      locationContentIcons.cash
  }));
  const defaultCompareHeadings = {
    benefit: "Benefits",
    positive: "Selling to PCL Home Offer",
    negative: "Traditional home sale"
  };
  const compareHeadings = {
    benefit: location.compareHeadings?.benefit || defaultCompareHeadings.benefit,
    positive: location.compareHeadings?.positive || defaultCompareHeadings.positive,
    negative: location.compareHeadings?.negative || defaultCompareHeadings.negative
  };
  const defaultCompareRows = [
    {
      benefit: "Commissions",
      positive: "0%",
      negative: "5% - 6%"
    },
    {
      benefit: "Average days to close",
      positive: "7 - 21 days",
      negative: "45 - 90+ days"
    },
    {
      benefit: "Number of showings",
      positive: "None required",
      negative: "Often multiple"
    },
    {
      benefit: "Closing costs",
      positive: "We can cover them",
      negative: "Often seller paid"
    },
    {
      benefit: "Repairs before selling",
      positive: "No repairs needed",
      negative: "Often expected"
    },
    {
      benefit: "Buyer financing risk",
      positive: "Cash buyer certainty",
      negative: "Can fall through"
    }
  ];
  const compareRows = location.compareRows || defaultCompareRows;

  return {
    compareSummary: `See how a direct cash sale with PCL Home Offer compares with the traditional home-selling route in ${shortName}.`,
    steps,
    compareHeadings,
    compareRows,
    terms,
    storyLead: `We know that deciding to sell your house is a big deal.`,
    storyCopyPrimary: `Whether you have been in your home for two years or twenty, the process can feel overwhelming, especially when you are under pressure. That is why we do things differently at PCL Home Offer.`,
    storyCopySecondary: `When you reach out to sell your house fast in ${shortName}, you talk to a real local team that listens, explains every step clearly, and never rushes you or makes promises it cannot keep.`,
    storyQuote: `No confusing paperwork. No surprise fees. No waiting around. Just a fair cash offer, a smooth process, and a closing date you choose.`,
    situationsSummary: `House-selling in ${shortName} can get difficult when repairs, timing, probate, financial pressure, or tenant issues are involved. We work directly with owners and tailor the process around real situations.`,
    situations: [
      {
        title: "Foreclosure",
        text: "Stop foreclosure pressure and explore a fast direct-sale option.",
        icon: locationContentIcons.foreclosure
      },
      {
        title: "Bankruptcy",
        text: "Reduce property stress and move toward a cleaner sale.",
        icon: locationContentIcons.bankruptcy
      },
      {
        title: "Inheritance / Probate",
        text: "Sell inherited property without taking on repair work first.",
        icon: locationContentIcons.probate
      },
      {
        title: "Hoarder House",
        text: "No full cleanup required before you contact our team.",
        icon: locationContentIcons.hoarder
      },
      {
        title: "Relocation",
        text: "Move faster and line up a sale with your next step.",
        icon: locationContentIcons.relocation
      },
      {
        title: "Damaged House",
        text: "Sell as-is even if the property needs major work.",
        icon: locationContentIcons.damaged
      },
      {
        title: "Divorce",
        text: "Create a simpler path when the property needs to be sold.",
        icon: locationContentIcons.divorce
      },
      {
        title: "Downsizing",
        text: "Sell directly and move on without listing headaches.",
        icon: locationContentIcons.downsizing
      }
    ],
    checklist: [
      {
        title: "Behind On Payments",
        text: "Avoid more pressure and explore a faster exit path.",
        icon: locationContentIcons.payment
      },
      {
        title: "Back Property Taxes",
        text: "Turn a difficult property situation into a direct cash solution.",
        icon: locationContentIcons.taxes
      },
      {
        title: "Selling Without Making Repairs",
        text: "No repairs, no upgrades, and no prep list required.",
        icon: locationContentIcons.repairs
      },
      {
        title: "Selling Without An Agent",
        text: "Work directly with a buyer instead of listing the home.",
        icon: locationContentIcons.agent
      },
      {
        title: "Tired Landlord Or Tenants",
        text: "Sell the property even if it has become difficult to manage.",
        icon: locationContentIcons.tenant
      },
      {
        title: "Fire, Water, And Mold Damage",
        text: "We buy houses in rough condition and help simplify the next step.",
        icon: locationContentIcons.fire
      },
      {
        title: "Your House Isn&apos;t Selling",
        text: "Skip the listing cycle and request a direct cash offer instead.",
        icon: locationContentIcons.listing
      },
      {
        title: "Loss Of Income",
        text: "Create a cleaner path forward when the property feels like a burden.",
        icon: locationContentIcons.income
      }
    ],
    showcaseSummary: `Sell directly, skip the stress, and move forward with a simple cash sale in ${shortName}.`,
    showcaseCopy: `If you're ready to skip the stress and sell your house in ${shortName}, Mississippi the simple way, PCL Home Offer is ready to help.`
  };
}

// Cache text targets once instead of querying the DOM on every render.
const heroContent = {
  badge: document.querySelector(".hero__badge"),
  title: document.querySelector(".hero__title"),
  subtitle: document.querySelector(".hero__subtitle")
};

let currentScene = 0;

// Render the active scene and guard against missing nodes for safer production behavior.
function renderScene(index) {
  if (!hero || !heroContent.badge || !heroContent.title || !heroContent.subtitle) {
    return;
  }

  const scene = heroScenes[index];

  if (!scene) {
    return;
  }

  hero.dataset.sceneIndex = String(index);
  heroContent.badge.textContent = scene.badge;
  heroContent.title.innerHTML = scene.title;
  heroContent.subtitle.innerHTML = scene.subtitle;
}

// Rotate through scenes safely so additional slides can be added later without rewrites.
function changeScene(direction) {
  currentScene = (currentScene + direction + heroScenes.length) % heroScenes.length;
  renderScene(currentScene);
}

// Toggle the mobile menu while keeping accessibility state synchronized.
function toggleMenu() {
  if (!menuToggle) {
    return;
  }

  const isOpen = body.classList.toggle("menu-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
}

// Close the menu after navigation selection so mobile interaction feels complete.
function closeMenu() {
  body.classList.remove("menu-open");
  menuToggle?.setAttribute("aria-expanded", "false");
}

function syncMenuForViewport() {
  if (window.innerWidth > 900) {
    closeMenu();
  }
}

function closeDropdowns(exceptItem) {
  navDropdownItems.forEach((item) => {
    if (item === exceptItem) {
      return;
    }

    item.classList.remove("nav__item--open");
    item.querySelector(".nav__dropdown-toggle")?.setAttribute("aria-expanded", "false");
  });
}

function toggleDropdown(event) {
  event.preventDefault();

  const toggle = event.currentTarget;
  const item = toggle?.closest(".nav__item--has-submenu");

  if (!item || !toggle) {
    return;
  }

  const shouldOpen = !item.classList.contains("nav__item--open");
  closeDropdowns(item);
  item.classList.toggle("nav__item--open", shouldOpen);
  toggle.setAttribute("aria-expanded", String(shouldOpen));
}

function createLocationUrl(areaSlug) {
  const location = locationAreaLookup[areaSlug];

  if (!location) {
    return "location.html";
  }

  const pathSegments = window.location.pathname
    .split("/")
    .filter(Boolean)
    .map((segment) => segment.replace(/\.html$/i, "").toLowerCase());
  const isPrettyLocationPage = pathSegments.some((segment) => locationPathLookup[segment]);
  const routePrefix = isPrettyLocationPage ? "../" : "";

  return `${routePrefix}${location.path}/`;
}

function getRequestedLocationSlug() {
  const pathSegments = window.location.pathname
    .split("/")
    .filter(Boolean)
    .map((segment) => segment.replace(/\.html$/i, "").toLowerCase());

  for (let index = pathSegments.length - 1; index >= 0; index -= 1) {
    const location = locationPathLookup[pathSegments[index]];

    if (location) {
      return location.slug;
    }
  }

  const params = new URLSearchParams(window.location.search);

  return params.get("area") || "";
}

function renderLocationPage() {
  if (!locationPage) {
    return;
  }

  const marketPointFallbackDetails = [
    "We review the property details quickly and share the next step without a long back-and-forth process.",
    "You can sell directly without spending extra money on cleanup, prep work, or listing updates first.",
    "We work around your schedule so the sale can match your timing, move, and property situation."
  ];

  const requestedArea = getRequestedLocationSlug() || locationPage.dataset.defaultArea || locationAreas[0].slug;
  const activeLocation = locationAreaLookup[requestedArea] || locationAreas[0];
  const shortName = getLocationShortName(activeLocation.name);
  const locationContent = buildLocationPageContent(activeLocation);
  const pageDescription = document.querySelector("#page-description");
  const badge = locationPage.querySelector("[data-location-badge]");
  const title = locationPage.querySelector("[data-location-title]");
  const summary = locationPage.querySelector("[data-location-summary]");
  const overviewTitle = locationPage.querySelector("[data-location-overview-title]");
  const overviewText = locationPage.querySelector("[data-location-overview-text]");
  const formCopy = locationPage.querySelector("[data-location-form-copy]");
  const stats = locationPage.querySelector("[data-location-stats]");
  const benefits = locationPage.querySelector("[data-location-benefits]");
  const steps = locationPage.querySelector("[data-location-steps]");
  const compareSummary = locationPage.querySelector("[data-location-compare-summary]");
  const compare = locationPage.querySelector("[data-location-compare]");
  const terms = locationPage.querySelector("[data-location-terms]");
  const storyLead = locationPage.querySelector("[data-location-story-lead]");
  const storyPrimary = locationPage.querySelector("[data-location-story-copy-primary]");
  const storySecondary = locationPage.querySelector("[data-location-story-copy-secondary]");
  const storyQuote = locationPage.querySelector("[data-location-story-quote]");
  const situationsSummary = locationPage.querySelector("[data-location-situations-summary]");
  const situations = locationPage.querySelector("[data-location-situations]");
  const checklist = locationPage.querySelector("[data-location-checklist]");
  const showcaseSummary = locationPage.querySelector("[data-location-showcase-summary]");
  const showcaseCopy = locationPage.querySelector("[data-location-showcase-copy]");
  const nearby = locationPage.querySelector("[data-location-nearby-links]");

  locationPage.dataset.activeArea = activeLocation.slug;
  document.title = `${activeLocation.title} | PCL Home Offer`;
  pageDescription?.setAttribute("content", activeLocation.metaDescription);
  locationPage.querySelectorAll("[data-location-name]").forEach((element) => {
    element.textContent = activeLocation.name;
  });
  locationPage.querySelectorAll("[data-location-short-name]").forEach((element) => {
    element.textContent = shortName;
  });

  if (badge) {
    badge.textContent = activeLocation.badge;
  }

  if (title) {
    title.textContent = activeLocation.title;
  }

  if (summary) {
    summary.textContent = activeLocation.summary;
  }

  if (overviewTitle) {
    overviewTitle.textContent = activeLocation.overviewTitle;
  }

  if (overviewText) {
    overviewText.textContent = activeLocation.overviewText;
  }

  if (formCopy) {
    formCopy.textContent = activeLocation.formCopy;
  }

  if (stats) {
    stats.innerHTML = activeLocation.marketPoints
      .map(
        (point, index) => {
          const title = typeof point === "string" ? point : point.title;
          const text =
            typeof point === "string"
              ? marketPointFallbackDetails[index] || marketPointFallbackDetails[marketPointFallbackDetails.length - 1]
              : point.text;

          return `
          <article class="location-overview__stat">
            <span class="location-overview__stat-icon" aria-hidden="true"></span>
            <div class="location-overview__stat-copy">
              <h3>${title}</h3>
              <p>${text}</p>
            </div>
          </article>
        `;
        }
      )
      .join("");
  }

  if (benefits) {
    benefits.innerHTML = activeLocation.benefits
      .map(
        (benefit) => `
          <article class="location-benefits__card">
            <h3>${benefit.title}</h3>
            <p>${benefit.text}</p>
          </article>
        `
      )
      .join("");
  }

  if (steps) {
    steps.innerHTML = locationContent.steps
      .map(
        (item) => `
          <article class="location-step-card">
            <div class="location-step-card__icon">${item.icon}</div>
            <span class="location-step-card__number">${item.step}</span>
            <h3>${item.title}</h3>
            <p>${item.text}</p>
          </article>
        `
      )
      .join("");
  }

  if (compareSummary) {
    compareSummary.textContent = locationContent.compareSummary;
  }

  if (compare) {
    compare.innerHTML = `
      <div class="location-compare__row location-compare__row--head">
        <div class="location-compare__heading">${locationContent.compareHeadings.benefit}</div>
        <div class="location-compare__heading location-compare__heading--accent">${locationContent.compareHeadings.positive}</div>
        <div class="location-compare__heading">${locationContent.compareHeadings.negative}</div>
      </div>
      ${locationContent.compareRows
        .map(
          (row) => `
            <div class="location-compare__row">
              <div class="location-compare__label">${row.benefit}</div>
              <div class="location-compare__cell location-compare__cell--positive">
                <span>${row.positive}</span>
              </div>
              <div class="location-compare__cell location-compare__cell--negative">
                <span>${row.negative}</span>
              </div>
            </div>
          `
        )
        .join("")}
    `;
  }

  if (terms) {
    terms.innerHTML = locationContent.terms
      .map(
        (term) => `
          <article class="location-term-card">
            <div class="location-term-card__icon">${term.icon}</div>
            <h3>${term.title}</h3>
            <p>${term.text}</p>
          </article>
        `
      )
      .join("");
  }

  if (storyLead) {
    storyLead.textContent = locationContent.storyLead;
  }

  if (storyPrimary) {
    storyPrimary.textContent = locationContent.storyCopyPrimary;
  }

  if (storySecondary) {
    storySecondary.textContent = locationContent.storyCopySecondary;
  }

  if (storyQuote) {
    storyQuote.textContent = locationContent.storyQuote;
  }

  if (situationsSummary) {
    situationsSummary.textContent = locationContent.situationsSummary;
  }

  if (situations) {
    situations.innerHTML = locationContent.situations
      .map(
        (item, index) => `
          <article class="location-situation-card">
            <span class="location-situation-card__count">${String(index + 1).padStart(2, "0")}.</span>
            <div class="location-situation-card__icon">${item.icon}</div>
            <h3>${item.title}</h3>
            <p>${item.text}</p>
          </article>
        `
      )
      .join("");
  }

  if (checklist) {
    checklist.innerHTML = locationContent.checklist
      .map(
        (item) => `
          <article class="location-checklist__item">
            <div class="location-checklist__icon">${item.icon}</div>
            <div>
              <h3>${item.title}</h3>
              <p>${item.text}</p>
            </div>
          </article>
        `
      )
      .join("");
  }

  if (showcaseSummary) {
    showcaseSummary.textContent = locationContent.showcaseSummary;
  }

  if (showcaseCopy) {
    showcaseCopy.textContent = locationContent.showcaseCopy;
  }

  if (nearby) {
    nearby.innerHTML = locationAreas
      .filter((location) => location.slug !== activeLocation.slug)
      .map(
        (location) => `
          <a class="location-nearby__card" href="${createLocationUrl(location.slug)}">
            <span class="location-nearby__eyebrow">Mississippi</span>
            <h3>${location.name}</h3>
            <p>${location.summary}</p>
          </a>
        `
      )
      .join("");
  }

  locationPage.querySelectorAll("[data-location-lead-form]").forEach((form) => {
    form.dataset.formName = `${activeLocation.name} Cash Offer Request`;

    const subjectField = form.querySelector("input[name='_subject']");
    const areaField = form.querySelector("input[name='service_area']");

    if (subjectField) {
      subjectField.value = `New ${activeLocation.name} Cash Offer Request`;
    }

    if (areaField) {
      areaField.value = activeLocation.name;
    }
  });
}

function openLeadModal(event) {
  event?.preventDefault();

  if (!leadModal) {
    return;
  }

  lastFocusedElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  closeDropdowns();
  closeMenu();
  body.classList.add("lead-modal-open");
  leadModal.classList.add("lead-modal--open");
  leadModal.setAttribute("aria-hidden", "false");

  window.setTimeout(() => {
    leadModalPhoneInput?.focus();
  }, 60);
}

function closeLeadModal() {
  if (!leadModal) {
    return;
  }

  body.classList.remove("lead-modal-open");
  leadModal.classList.remove("lead-modal--open");
  leadModal.setAttribute("aria-hidden", "true");
  lastFocusedElement?.focus();
}

function setLeadFormStatus(form, type, message) {
  const status = form.querySelector("[data-form-status]");

  if (!status) {
    return;
  }

  status.textContent = message;
  status.classList.remove(
    "hero__form-status--success",
    "hero__form-status--error",
    "hero__form-status--visible"
  );

  if (!message) {
    return;
  }

  status.classList.add("hero__form-status--visible", `hero__form-status--${type}`);
}

function setLeadFormPending(form, isPending) {
  const submitButton = form.querySelector("button[type='submit']");

  if (!submitButton) {
    return;
  }

  if (!submitButton.dataset.defaultLabel) {
    submitButton.dataset.defaultLabel = submitButton.dataset.submitLabel || submitButton.textContent || "Submit";
  }

  submitButton.disabled = isPending;
  submitButton.setAttribute("aria-busy", String(isPending));
  submitButton.textContent = isPending ? "Sending..." : submitButton.dataset.defaultLabel;
}

async function handleLeadFormSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;

  if (!(form instanceof HTMLFormElement)) {
    return;
  }

  if (!form.reportValidity()) {
    return;
  }

  setLeadFormStatus(form, "", "");
  setLeadFormPending(form, true);

  const formData = new FormData(form);
  const firstName = String(formData.get("first_name") || "").trim();
  const lastName = String(formData.get("last_name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const countryCode = String(formData.get("country_code") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const message = String(formData.get("message") || "").trim();
  const address = String(formData.get("address") || formData.get("home_address") || "").trim();
  const fullName = `${firstName} ${lastName}`.trim();

  if (countryCode || phone) {
    formData.set("phone", `${countryCode} ${phone}`.trim());
  } else {
    formData.delete("phone");
  }

  formData.set("address", address);
  formData.set("recipient_email", leadEmailRecipient);
  formData.set("form_name", String(form.dataset.formName || "Website Lead"));
  formData.set("page_url", window.location.href);

  if (fullName) {
    formData.set("name", fullName);
  } else {
    formData.delete("name");
  }

  if (email) {
    formData.set("_replyto", email);
    formData.set("email", email);
  } else {
    formData.delete("_replyto");
    formData.delete("email");
  }

  if (message) {
    formData.set("message", message);
  }

  try {
    const response = await fetch(leadFormEndpoint, {
      method: "POST",
      headers: {
        Accept: "application/json"
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error("Request failed");
    }

    setLeadFormStatus(
      form,
      "success",
      "Thank you. Your request has been sent successfully. Our team will contact you soon."
    );
    form.reset();
  } catch (error) {
    setLeadFormStatus(
      form,
      "error",
      `We could not send your request right now. Please call (901) 264-0122 or email ${leadEmailRecipient}.`
    );
  } finally {
    setLeadFormPending(form, false);
  }
}

function setupFaqAccordion() {
  if (!faqCards.length) {
    return;
  }

  faqCards.forEach((card) => {
    card.addEventListener("toggle", () => {
      if (!card.open) {
        return;
      }

      faqCards.forEach((otherCard) => {
        if (otherCard !== card) {
          otherCard.removeAttribute("open");
        }
      });
    });
  });
}

function setupSectionLanding() {
  const sectionTarget = body?.dataset.scrollTarget;

  if (!sectionTarget || window.location.hash) {
    return;
  }

  const target = document.getElementById(sectionTarget);

  if (!target) {
    return;
  }

  window.requestAnimationFrame(() => {
    target.scrollIntoView({ behavior: "auto", block: "start" });
  });
}

menuToggle?.addEventListener("click", toggleMenu);
navDropdownItems.forEach((item) => {
  item.querySelector(".nav__dropdown-toggle")?.addEventListener("click", toggleDropdown);
});
leadForms.forEach((form) => {
  form.addEventListener("submit", handleLeadFormSubmit);
});
openLeadModalButtons.forEach((button) => {
  button.addEventListener("click", openLeadModal);
});
closeLeadModalButtons.forEach((button) => {
  button.addEventListener("click", closeLeadModal);
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    closeDropdowns();
    closeMenu();
  });
});

document.addEventListener("click", (event) => {
  const clickedInsideDropdown = Array.from(navDropdownItems).some((item) => item.contains(event.target));

  if (!clickedInsideDropdown) {
    closeDropdowns();
  }

  if (event.target === leadModal) {
    closeLeadModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeDropdowns();
    closeMenu();
    closeLeadModal();
  }
});

window.addEventListener("resize", syncMenuForViewport);

prevButton?.addEventListener("click", () => changeScene(-1));
nextButton?.addEventListener("click", () => changeScene(1));
backToTopButton?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// Initialize the hero content after all listeners are connected.
syncMenuForViewport();
renderScene(currentScene);
renderLocationPage();
setupFaqAccordion();
setupSectionLanding();

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
const leadFormEndpoint = "https://formsubmit.co/ajax/Jdinvestment901@gmail.com";
const leadModal = document.querySelector("[data-lead-modal]");
const openLeadModalButtons = document.querySelectorAll("[data-open-lead-modal]");
const closeLeadModalButtons = document.querySelectorAll("[data-close-lead-modal]");
const leadModalPhoneInput = leadModal?.querySelector("input[name='phone']");
const locationPage = document.querySelector("[data-location-page]");
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
    name: "Horn Lake, MS",
    badge: "HORN LAKE CASH OFFER",
    title: "We Buy Houses in Horn Lake, MS",
    summary: "Sell your Horn Lake house as-is with a direct cash offer and skip the repairs, listings, and long wait times.",
    overviewTitle: "A faster way to sell your Horn Lake property",
    overviewText: "If your Horn Lake home needs repairs, has been inherited, is sitting vacant, or you just need to move quickly, PCL Home Offer can help. We buy houses directly from homeowners and keep the process simple from first contact to closing day.",
    formCopy: "Tell us about your Horn Lake property and our team will contact you with the next steps.",
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
  },
  {
    slug: "hernando-ms",
    name: "Hernando, MS",
    badge: "HERNANDO CASH OFFER",
    title: "We Buy Houses in Hernando, MS",
    summary: "Get a direct cash offer for your Hernando home and avoid the delays of a traditional sale.",
    overviewTitle: "Simple selling options for Hernando homeowners",
    overviewText: "We work with Hernando property owners who need a quicker route to closing. Whether the house needs work, is inherited, or has become difficult to manage, we buy as-is and keep the next steps clear.",
    formCopy: "Send us your Hernando property details and we will review them with our local buying team.",
    metaDescription: "Request a cash offer for your Hernando, MS home. We buy houses directly in any condition.",
    marketPoints: [
      "Local Hernando property review",
      "No repair list or inspection prep required",
      "Choose a closing date that fits your plans"
    ],
    benefits: [
      {
        title: "Skip Repairs",
        text: "You do not need to invest more time or money into your Hernando property before selling."
      },
      {
        title: "Sell with More Control",
        text: "We keep the offer process simple so you can understand your options and move forward with confidence."
      },
      {
        title: "As-Is Means As-Is",
        text: "From cosmetic updates to bigger structural concerns, we buy homes in their current condition."
      }
    ]
  },
  {
    slug: "walls-ms",
    name: "Walls, MS",
    badge: "WALLS CASH OFFER",
    title: "We Buy Houses in Walls, MS",
    summary: "Sell your Walls property directly for cash without waiting on the market or taking on extra repair work.",
    overviewTitle: "A practical option for selling in Walls",
    overviewText: "When you need speed and certainty, a direct buyer can make a major difference. We help Walls homeowners sell houses, rentals, and problem properties without commissions, cleanup demands, or drawn-out negotiations.",
    formCopy: "Fill in your Walls property information and we will contact you with the next steps.",
    metaDescription: "Sell your Walls, MS property directly for cash. We buy homes as-is and work on your schedule.",
    marketPoints: [
      "Direct cash offer path in Walls",
      "No cleaning, staging, or listing prep",
      "Flexible options for distressed properties"
    ],
    benefits: [
      {
        title: "Quick Property Review",
        text: "We evaluate Walls properties quickly so you are not left waiting on a long open-market process."
      },
      {
        title: "No Commission Costs",
        text: "Because this is a direct sale, you avoid the usual agent commission structure."
      },
      {
        title: "Helpful for Tough Situations",
        text: "If the property is vacant, inherited, or becoming difficult to maintain, we can provide a direct solution."
      }
    ]
  },
  {
    slug: "desoto-county-ms",
    name: "DeSoto County, MS",
    badge: "DESOTO COUNTY CASH OFFER",
    title: "We Buy Houses in DeSoto County, MS",
    summary: "Across DeSoto County, we help homeowners sell properties quickly with direct cash offers and flexible closings.",
    overviewTitle: "Direct cash offers for DeSoto County homeowners",
    overviewText: "If you own property anywhere in DeSoto County and want to sell without repairs, open houses, or uncertain buyers, we can help. Our team works across the county and keeps the process fast, transparent, and local.",
    formCopy: "Tell us where your DeSoto County property is located and we will get back to you quickly.",
    metaDescription: "Get a cash offer for your DeSoto County, MS property. PCL Home Offer buys houses directly in any condition.",
    marketPoints: [
      "Service across major DeSoto County markets",
      "No repairs or listing preparation needed",
      "Clear cash-offer process with flexible closings"
    ],
    benefits: [
      {
        title: "County-Wide Coverage",
        text: "We work with homeowners across DeSoto County, including nearby neighborhoods and surrounding communities."
      },
      {
        title: "Sell Any Condition",
        text: "You can request an offer whether the property is updated, outdated, tenant-occupied, or vacant."
      },
      {
        title: "Designed for Speed",
        text: "Our process is built to help you move faster than a traditional listing whenever timing matters."
      }
    ]
  }
];

const locationAreaLookup = Object.fromEntries(
  locationAreas.map((location) => [location.slug, location])
);

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
  return `location.html?area=${encodeURIComponent(areaSlug)}`;
}

function renderLocationPage() {
  if (!locationPage) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const requestedArea = params.get("area") || locationPage.dataset.defaultArea || locationAreas[0].slug;
  const activeLocation = locationAreaLookup[requestedArea] || locationAreas[0];
  const pageDescription = document.querySelector("#page-description");
  const badge = locationPage.querySelector("[data-location-badge]");
  const title = locationPage.querySelector("[data-location-title]");
  const summary = locationPage.querySelector("[data-location-summary]");
  const overviewTitle = locationPage.querySelector("[data-location-overview-title]");
  const overviewText = locationPage.querySelector("[data-location-overview-text]");
  const formCopy = locationPage.querySelector("[data-location-form-copy]");
  const stats = locationPage.querySelector("[data-location-stats]");
  const benefits = locationPage.querySelector("[data-location-benefits]");
  const nearby = locationPage.querySelector("[data-location-nearby-links]");

  locationPage.dataset.activeArea = activeLocation.slug;
  document.title = `${activeLocation.title} | PCL Home Offer`;
  pageDescription?.setAttribute("content", activeLocation.metaDescription);

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
        (point) => `
          <article class="location-overview__stat">
            <span class="location-overview__stat-icon" aria-hidden="true"></span>
            <p>${point}</p>
          </article>
        `
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
  const countryCode = String(formData.get("country_code") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const address = String(formData.get("address") || formData.get("home_address") || "").trim();

  if (countryCode || phone) {
    formData.set("phone", `${countryCode} ${phone}`.trim());
  } else {
    formData.delete("phone");
  }

  formData.set("address", address);
  formData.set("form_name", String(form.dataset.formName || "Website Lead"));
  formData.set("page_url", window.location.href);

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
      "We could not send your request right now. Please call (901) 264-0122 or email Jdinvestment901@gmail.com."
    );
  } finally {
    setLeadFormPending(form, false);
  }
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

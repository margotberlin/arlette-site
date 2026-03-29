const PROJECT_REEL_INTERVAL = 3200;
const SOCIAL_PLATFORMS = [
  { key: "instagram", label: "Instagram" },
  { key: "linkedin", label: "LinkedIn" },
  { key: "facebook", label: "Facebook" },
  { key: "pinterest", label: "Pinterest" },
];

const state = {
  site: null,
  projects: null,
};

async function fetchJson(path) {
  const res = await fetch(path);
  if (!res.ok) {
    throw new Error(`Failed to load ${path}: ${res.status}`);
  }

  return res.json();
}

async function getSiteData() {
  if (!state.site) {
    state.site = await fetchJson("data/site.json");
  }

  return state.site;
}

function normalizeProjects(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.projects)) {
    return payload.projects;
  }

  return [];
}

async function getProjectsData() {
  if (!state.projects) {
    const payload = await fetchJson("data/projects.json");
    state.projects = normalizeProjects(payload);
  }

  return state.projects;
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) {
    el.innerText = text || "";
  }
}

function setDataText(selector, text) {
  document.querySelectorAll(selector).forEach((el) => {
    el.innerText = text || "";
  });
}

function updateHero(site) {
  if (!site.hero_image) {
    return;
  }

  const heroSection = document.querySelector(".hero");
  if (heroSection) {
    heroSection.style.backgroundImage = `linear-gradient(rgba(40, 32, 23, 0.28), rgba(40, 32, 23, 0.28)), url('${site.hero_image}')`;
  }
}

function updateEmail(site) {
  document.querySelectorAll("[data-email-link]").forEach((link) => {
    link.href = `mailto:${site.email}`;
    link.textContent = site.email;
  });

  document.querySelectorAll("[data-email-text]").forEach((el) => {
    el.textContent = site.email;
  });
}

function updateSocialLinks(site) {
  SOCIAL_PLATFORMS.forEach(({ key, label }) => {
    const href = site[key] || "#";
    document.querySelectorAll(`[data-social-link="${key}"]`).forEach((link) => {
      link.href = href;
      link.setAttribute("aria-label", label);

      if (link.dataset.socialText === "true") {
        link.textContent = label;
      }

      if (link.dataset.socialHandle === "true") {
        link.textContent = href.replace(/^https?:\/\//, "").replace(/\/$/, "");
      }
    });
  });
}

async function loadSite() {
  const site = await getSiteData();

  setText("site-title", site.title);
  setText("tagline", site.tagline);
  setText("about-section-label", site.about_page?.section_label);
  setText("about-section-title", site.about_page?.section_title);
  setText("about", site.about_page?.body);
  setText("footer-title", site.title);
  setText("home-section-label", site.home_page?.section_label);
  setText("home-section-title", site.home_page?.section_title);
  setText("home-section-intro", site.home_page?.section_intro);
  setText("projects-section-label", site.projects_page?.section_label);
  setText("projects-section-title", site.projects_page?.section_title);
  setText("projects-section-intro", site.projects_page?.section_intro);
  setText("contact-section-label", site.contact_page?.section_label);
  setText("contact-section-title", site.contact_page?.section_title);
  setText("contact-section-intro", site.contact_page?.section_intro);
  setDataText('[data-contact-label="email"]', site.contact_page?.email_label);
  setDataText('[data-contact-label="instagram"]', site.contact_page?.instagram_label);
  setDataText('[data-contact-label="linkedin"]', site.contact_page?.linkedin_label);
  setDataText('[data-contact-label="facebook"]', site.contact_page?.facebook_label);
  setDataText('[data-contact-label="pinterest"]', site.contact_page?.pinterest_label);

  updateHero(site);
  updateEmail(site);
  updateSocialLinks(site);
}

function sortFeaturedProjects(projects) {
  return projects
    .filter((project) => project.featured)
    .sort((a, b) => (a.featured_order ?? Number.MAX_SAFE_INTEGER) - (b.featured_order ?? Number.MAX_SAFE_INTEGER));
}

function getProjectImages(project) {
  return (project.images || [])
    .map((entry) => (typeof entry === "string" ? entry : entry?.image))
    .filter(Boolean);
}

function createFeaturedProjectCard(project, index) {
  const article = document.createElement("article");
  const images = getProjectImages(project);
  article.className = "grid gap-8 border-t border-stone-300 pt-10 md:grid-cols-2 md:items-start md:gap-12";

  if (index % 2 === 1) {
    article.style.direction = "rtl";
  }

  article.innerHTML = `
    <a href="project.html?slug=${project.slug}" class="group block overflow-hidden rounded-3xl bg-stone-200 shadow-lg">
      <img src="${images[0]}" alt="${project.title}" class="h-80 w-full object-cover transition duration-700 group-hover:scale-[1.02] md:h-96" />
    </a>
    <div class="flex h-full flex-col justify-center md:px-4" style="${index % 2 === 1 ? "direction:ltr;" : ""}">
      <h3 class="font-display text-4xl leading-none text-stone-900 md:text-5xl">${project.title}</h3>
      <p class="mt-5 max-w-md text-base leading-8 text-stone-700 md:text-lg">${project.description}</p>
      <a href="project.html?slug=${project.slug}" class="mt-8 inline-flex w-fit items-center gap-3 border-b border-stone-900 pb-1 text-sm font-medium uppercase text-stone-900 transition hover:border-stone-600 hover:text-stone-600" style="letter-spacing:0.22em;">View Project <span aria-hidden="true">→</span></a>
    </div>
  `;

  return article;
}

function createProjectImageSlide(src, title, isActive) {
  return `
    <img
      src="${src}"
      alt="${title}"
      class="project-reel-image absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${isActive ? "opacity-100" : "opacity-0"}"
    />
  `;
}

function createPortfolioProjectCard(project) {
  const article = document.createElement("article");
  const images = getProjectImages(project);
  article.className = "group";

  const slides = images
    .map((img, index) => createProjectImageSlide(img, project.title, index === 0))
    .join("");

  article.innerHTML = `
    <a href="project.html?slug=${project.slug}" class="project-reel group/reel relative block overflow-hidden rounded-3xl bg-stone-200 shadow-lg" data-project-reel>
      <div class="relative w-full overflow-hidden" style="aspect-ratio: 4 / 5;">${slides}</div>
    </a>
    <h2 class="mt-5">
      <a href="project.html?slug=${project.slug}" class="font-display text-3xl text-stone-900 transition hover:text-stone-700 md:text-4xl">${project.title}</a>
    </h2>
    <p class="mt-3 max-w-xl text-base leading-8 text-stone-600">${project.description}</p>
    <a href="project.html?slug=${project.slug}" class="mt-6 inline-flex w-fit items-center gap-3 border-b border-stone-900 pb-1 text-sm font-medium uppercase text-stone-900 transition hover:border-stone-600 hover:text-stone-600" style="letter-spacing:0.22em;">View Project <span aria-hidden="true">→</span></a>
  `;

  article.dataset.imageCount = String(images.length);
  return article;
}

async function loadFeaturedProjects() {
  const featuredGrid = document.getElementById("featured-projects");
  if (!featuredGrid) {
    return;
  }

  await getSiteData();
  const projects = await getProjectsData();
  const featuredProjects = sortFeaturedProjects(projects);

  featuredGrid.innerHTML = "";
  featuredProjects.forEach((project, index) => {
    featuredGrid.appendChild(createFeaturedProjectCard(project, index));
  });
}

async function loadProjects() {
  const grid = document.getElementById("projects-grid");
  if (!grid) {
    return;
  }

  const projects = await getProjectsData();
  grid.innerHTML = "";

  projects.forEach((project) => {
    grid.appendChild(createPortfolioProjectCard(project));
  });

  initProjectReels();
}

function initProjectReels() {
  document.querySelectorAll("[data-project-reel]").forEach((reel) => {
    const slides = Array.from(reel.querySelectorAll(".project-reel-image"));
    if (slides.length <= 1) {
      return;
    }

    let activeIndex = 0;
    window.setInterval(() => {
      slides[activeIndex].classList.remove("opacity-100");
      slides[activeIndex].classList.add("opacity-0");
      activeIndex = (activeIndex + 1) % slides.length;
      slides[activeIndex].classList.remove("opacity-0");
      slides[activeIndex].classList.add("opacity-100");
    }, PROJECT_REEL_INTERVAL);
  });
}

async function loadProjectPage() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");

  if (!slug) {
    return;
  }

  const projects = await getProjectsData();
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return;
  }

  const projectTitle = document.getElementById("project-title");
  const projectDescription = document.getElementById("project-desc");
  const gallery = document.getElementById("gallery");

  if (projectTitle) {
    projectTitle.innerText = project.title;
  }

  if (projectDescription) {
    projectDescription.innerText = project.description;
  }

  if (!gallery) {
    return;
  }

  gallery.innerHTML = "";
  getProjectImages(project).forEach((img) => {
    const figure = document.createElement("figure");
    figure.className = "overflow-hidden rounded-3xl bg-stone-200 p-3 shadow-lg";

    const image = document.createElement("img");
    image.src = img;
    image.alt = project.title;
    image.className = "h-full w-full rounded-2xl object-cover";

    figure.appendChild(image);
    gallery.appendChild(figure);
  });
}

function initNavigation() {
  const navToggle = document.querySelector("[data-nav-toggle]");
  const mobileNav = document.getElementById("mobile-nav");

  if (!navToggle || !mobileNav) {
    return;
  }

  const closeMenu = () => {
    mobileNav.classList.add("hidden");
    navToggle.setAttribute("aria-expanded", "false");
  };

  navToggle.addEventListener("click", () => {
    const willOpen = mobileNav.classList.contains("hidden");
    mobileNav.classList.toggle("hidden");
    navToggle.setAttribute("aria-expanded", willOpen ? "true" : "false");
  });

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      closeMenu();
    }
  });
}

initNavigation();
loadSite();
loadFeaturedProjects();
loadProjects();
loadProjectPage();

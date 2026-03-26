async function loadSite() {
  const res = await fetch("data/site.json");
  const data = await res.json();

  const setText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.innerText = text;
  };

  setText("site-title", data.title);
  setText("tagline", data.tagline);
  setText("about", data.about);
  setText("email", data.email);

  if (data.hero_image) {
    const heroSection = document.querySelector(".hero");
    if (heroSection) {
      heroSection.style.backgroundImage = `linear-gradient(rgba(28, 25, 23, 0.45), rgba(28, 25, 23, 0.45)), url('${data.hero_image}')`;
    }
  }
}

function createProjectCard(p) {
  const card = document.createElement("article");
  card.className = "group cursor-pointer overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg";

  card.innerHTML = `
    <img src="${p.images[0]}" alt="${p.title}" class="h-60 w-full object-cover" />
    <div class="p-6">
      <h3 class="text-xl font-semibold text-stone-900">${p.title}</h3>
    </div>
  `;

  card.addEventListener("click", () => {
    window.location = `project.html?slug=${p.slug}`;
  });

  return card;
}

async function loadProjects() {
  const res = await fetch("data/projects.json");
  const projects = await res.json();

  const grid = document.getElementById("projects-grid") || document.getElementById("featured-projects");
  if (!grid) return;

  projects.forEach((project) => {
    grid.appendChild(createProjectCard(project));
  });
}

async function loadProjectPage() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");

  if (!slug) return;

  const res = await fetch("data/projects.json");
  const projects = await res.json();
  const project = projects.find((item) => item.slug === slug);

  if (!project) return;

  const projectTitle = document.getElementById("project-title");
  const projectDescription = document.getElementById("project-desc");
  const gallery = document.getElementById("gallery");

  if (projectTitle) projectTitle.innerText = project.title;
  if (projectDescription) projectDescription.innerText = project.description;
  if (!gallery) return;

  project.images.forEach((img) => {
    const figure = document.createElement("figure");
    figure.className = "overflow-hidden rounded-2xl border border-stone-200 bg-white p-2 shadow-sm";

    const image = document.createElement("img");
    image.src = img;
    image.alt = project.title;
    image.className = "h-full w-full rounded-xl object-cover";

    figure.appendChild(image);
    gallery.appendChild(figure);
  });
}

function initNavigation() {
  const navToggle = document.querySelector("[data-nav-toggle]");
  const mobileNav = document.getElementById("mobile-nav");

  if (!navToggle || !mobileNav) return;

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
loadProjects();
loadProjectPage();

async function loadSite() {
  // Use a leading slash so it always looks at the root data folder
  const res = await fetch("/data/site.json");
  const data = await res.json();

  // Helper function to safely set text if the ID exists on the page
  const setText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.innerText = text;
  };

  setText("site-title", data.title);
  setText("tagline", data.tagline);
  setText("about", data.about);
  setText("email", data.email); // This is the one for your contact page!
}

// CRITICAL: This ensures the script waits for the HTML to load
window.addEventListener('DOMContentLoaded', () => {
  loadSite();
  // If you have other functions like loadProjects, call them here too
});

function createProjectCard(p) {
  const div = document.createElement("div");

  div.innerHTML = `
    <img src="${p.images[0]}" style="width:100%; margin-bottom:15px;" />
    <h3>${p.title}</h3>
  `;

  div.onclick = () => {
    window.location = `project.html?slug=${p.slug}`;
  };

  return div;
}

async function loadProjects() {
  const res = await fetch("data/projects.json");
  const projects = await res.json();

  const grid = document.getElementById("projects-grid") || document.getElementById("featured-projects");
  if (!grid) return;

  projects.forEach(p => {
    grid.appendChild(createProjectCard(p));
  });
}

async function loadProjectPage() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");

  if (!slug) return;

  const res = await fetch("data/projects.json");
  const projects = await res.json();
  const project = projects.find(p => p.slug === slug);

  if (!project) return;

  document.getElementById("project-title").innerText = project.title;
  document.getElementById("project-desc").innerText = project.description;

  const gallery = document.getElementById("gallery");
  project.images.forEach(img => {
    const el = document.createElement("img");
    el.src = img;
    el.style.width = "100%";
    gallery.appendChild(el);
  });
}

loadSite();
loadProjects();
loadProjectPage();

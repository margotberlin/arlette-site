async function loadSite() {
  const res = await fetch("data/site.json");
  const data = await res.json();

  document.getElementById("site-title")?.innerText = data.title;
  document.getElementById("tagline")?.innerText = data.tagline;
  document.getElementById("about")?.innerText = data.about;
  document.getElementById("email")?.innerText = data.email;
}

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
const places = [
  {
    name: "Admissions Office",
    tag: "Office",
    location: "Main administration block",
    description: "For applications, registration, fees, and student inquiries.",
  },
  {
    name: "Main Library",
    tag: "Study",
    location: "Central campus",
    description: "A quiet place for reading, borrowing books, and research.",
  },
  {
    name: "Lecture Halls",
    tag: "Classes",
    location: "Academic blocks",
    description: "Where most lectures and tutorials take place.",
  },
  {
    name: "Computer Lab",
    tag: "Tech",
    location: "School of Computing area",
    description: "Use this for practicals, printing, and online coursework.",
  },
  {
    name: "Student Services",
    tag: "Support",
    location: "Near administration",
    description: "For welfare, counseling, and general student support.",
  },
  {
    name: "Hostels",
    tag: "Housing",
    location: "Campus housing zone",
    description: "Student accommodation and residence information.",
  },
];

const results = document.getElementById("results");
const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("searchBtn");

if (!results || !searchInput || !searchBtn) {
  throw new Error("Missing required DOM elements");
}

// Basic HTML escaping for safety
function escapeHTML(str = "") {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderCards(items) {
  if (!items.length) {
    results.innerHTML =
      '<p class="empty-state">No matching place found. Try library, admissions, or lab.</p>';
    return;
  }

  results.innerHTML = items
    .map(
      (place) => `
        <article class="card">
          <span class="tag">${escapeHTML(place.tag)}</span>
          <h3>${escapeHTML(place.name)}</h3>
          <p><strong>Location:</strong> ${escapeHTML(place.location)}</p>
          <p>${escapeHTML(place.description)}</p>
        </article>
      `
    )
    .join("");
}

function runSearch() {
  const term = searchInput.value.trim().toLowerCase();

  if (!term) {
    renderCards(places);
    return;
  }

  const filtered = places.filter((p) => {
    const haystack = `${p.name} ${p.tag} ${p.location} ${p.description}`.toLowerCase();
    return haystack.includes(term);
  });

  renderCards(filtered);
}

// Events
searchBtn.addEventListener("click", runSearch);

// Live search (better UX)
searchInput.addEventListener("input", runSearch);

// Enter key support (optional but useful)
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") runSearch();
});

// Initial render
renderCards(places);
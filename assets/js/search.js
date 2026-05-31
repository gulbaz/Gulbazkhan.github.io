/**
 * Global Site Search Logic
 */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Define the Site Map & Keywords
  const siteIndex = [
    { title: "Home / Overview", url: "index.html#hero", keywords: "home, shahab khan, overview, introduction" },
    { title: "About Me", url: "me.html", keywords: "about, biography, background, education, bba honors" },
    { title: "Core Skills", url: "skills.html", keywords: "skills, vba, python, trade finance, data analytics, crm, aml, compliance" },
    { title: "Professional Experience", url: "exp.html", keywords: "jobs, career, snb, ziraat, thamer, dafer, alma, law, travel, operations manager, credit control, business development" },
    { title: "Professional Projects", url: "projects.html", keywords: "projects, automation, loan generator, network, cisco, makkah, royal palace, intercontinental, dms" },
    { title: "Certifications", url: "cert.html", keywords: "certificates, diploma, linkedin, six sigma, seo, design, safety, ucp 600" },
    { title: "Contact Information", url: "index.html#contact", keywords: "contact, email, phone, whatsapp, github, linkedin, telegram, hire" }
  ];

  const searchInput = document.getElementById('globalSearchInput');
  const searchResults = document.getElementById('globalSearchResults');

  if (!searchInput || !searchResults) return;

  // 2. Search Function
  searchInput.addEventListener('input', function() {
    const query = this.value.toLowerCase().trim();
    searchResults.innerHTML = ''; // Clear old results

    if (query.length < 2) {
      searchResults.innerHTML = '<p class="text-muted small text-center mt-3">Type at least 2 characters to search...</p>';
      return;
    }

    // Filter the index based on the query
    const results = siteIndex.filter(page => {
      return page.title.toLowerCase().includes(query) || page.keywords.toLowerCase().includes(query);
    });

    // 3. Display Results
    if (results.length === 0) {
      searchResults.innerHTML = `<p class="text-warning small text-center mt-3"><i class="bi bi-exclamation-circle"></i> No results found for "${query}"</p>`;
    } else {
      results.forEach(result => {
        const resultHTML = `
          <a href="${result.url}" class="list-group-item list-group-item-action bg-dark text-white border-secondary mb-2 rounded" style="transition: all 0.3s ease;">
            <div class="d-flex w-100 justify-content-between align-items-center">
              <h6 class="mb-1 text-info"><i class="bi bi-search me-2"></i>${result.title}</h6>
              <i class="bi bi-chevron-right text-muted small"></i>
            </div>
            <small class="text-white-50">Go to page</small>
          </a>
        `;
        searchResults.insertAdjacentHTML('beforeend', resultHTML);
      });
    }
  });

  // Focus input automatically when modal opens
  const searchModal = document.getElementById('globalSearchModal');
  if (searchModal) {
    searchModal.addEventListener('shown.bs.modal', () => {
      searchInput.focus();
    });
  }
});
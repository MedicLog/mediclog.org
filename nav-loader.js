// nav-loader.js — shared navigation for mediclog.org
// Inlines nav HTML directly — no fetch(), works on file:// and https://.
// Usage: <nav class="nav" data-page="pagename"></nav> + <script src="nav-loader.js"></script>
// data-page values: home, docs, transfer, tutorial, shortcuts, agency, faq, privacy, terms

(function () {
    const nav = document.querySelector('nav.nav[data-page]');
    if (!nav) return;
    const currentPage = nav.getAttribute('data-page');

    nav.innerHTML = `
        <div class="nav-inner">
            <a href="index.html" class="nav-brand">
                <img src="icon.png" alt="MedicLog"> MedicLog
            </a>
            <button class="nav-toggle" id="nav-toggle-btn">&#9776;</button>
            <div class="nav-links" id="nav-links-list">
                <a href="docs.html"     data-nav="docs">Docs</a>
                <a href="transfer.html" data-nav="transfer">Transfer</a>
                <a href="tutorial.html" data-nav="tutorial">Tutorial</a>
                <a href="shortcuts.html" data-nav="shortcuts">Shortcuts</a>
                <a href="agency.html"   data-nav="agency">Agency</a>
                <a href="faq.html"      data-nav="faq">FAQ</a>
                <a href="privacy.html"  data-nav="privacy">Privacy</a>
                <a href="terms.html"    data-nav="terms">Terms</a>
            </div>
        </div>`;

    // Set active link
    const active = nav.querySelector('[data-nav="' + currentPage + '"]');
    if (active) active.classList.add('active');

    // Mobile toggle
    document.getElementById('nav-toggle-btn').addEventListener('click', function () {
        document.getElementById('nav-links-list').classList.toggle('open');
    });
})();

// nav-loader.js — shared navigation for mediclog.org
// Inlines nav HTML directly — no fetch(), works on file:// and https://.
// Usage: <nav class="nav" data-page="pagename"></nav> + <script src="nav-loader.js"></script>
// data-page values: home, docs, tutorial, shortcuts, watch, transfer, agency, settings-creator, pricing, faq, sponsor, about, privacy, terms

(function () {
    const nav = document.querySelector('nav.nav[data-page]');
    if (!nav) return;
    const currentPage = nav.getAttribute('data-page');

    const docsPages = ['docs', 'tutorial', 'shortcuts'];
    const agencyPages = ['agency', 'settings-creator'];
    const morePages = ['about', 'privacy', 'terms'];

    nav.innerHTML = `
        <div class="nav-inner">
            <a href="index.html" class="nav-brand">
                <img src="icon.png" alt="MedicLog"> MedicLog
            </a>
            <button class="nav-toggle" id="nav-toggle-btn">&#9776;</button>
            <div class="nav-links" id="nav-links-list">

                <div class="nav-dropdown" id="nav-dropdown-docs">
                    <button class="nav-dropdown-trigger" id="nav-docs-trigger">
                        Docs <span class="nav-dropdown-chevron">▼</span>
                    </button>
                    <div class="nav-dropdown-menu">
                        <a href="docs.html"      data-nav="docs">Documentation</a>
                        <a href="tutorial.html"  data-nav="tutorial">Tutorial</a>
                        <a href="shortcuts.html" data-nav="shortcuts">Shortcuts</a>
                    </div>
                </div>

                <a href="watch.html"    data-nav="watch">Watch</a>
                <a href="transfer.html" data-nav="transfer">Handoff</a>

                <div class="nav-dropdown" id="nav-dropdown-agency">
                    <button class="nav-dropdown-trigger" id="nav-agency-trigger">
                        Agency <span class="nav-dropdown-chevron">▼</span>
                    </button>
                    <div class="nav-dropdown-menu">
                        <a href="agency.html"            data-nav="agency">Agency Tools</a>
                        <a href="settings-creator.html"  data-nav="settings-creator">Settings Creator</a>
                    </div>
                </div>

                <a href="pricing.html"  data-nav="pricing">Pricing</a>
                <a href="faq.html"      data-nav="faq">FAQ</a>
                <a href="sponsor.html"  data-nav="sponsor">Sponsor</a>

                <div class="nav-dropdown" id="nav-dropdown-more">
                    <button class="nav-dropdown-trigger" id="nav-more-trigger">
                        More <span class="nav-dropdown-chevron">▼</span>
                    </button>
                    <div class="nav-dropdown-menu">
                        <a href="about.html"   data-nav="about">About</a>
                        <a href="privacy.html" data-nav="privacy">Privacy</a>
                        <a href="terms.html"   data-nav="terms">Terms</a>
                    </div>
                </div>

            </div>
        </div>`;

    // Active state on flat links
    const active = nav.querySelector('[data-nav="' + currentPage + '"]');
    if (active) active.classList.add('active');

    // Active state on Docs trigger when on a docs sub-page
    if (docsPages.includes(currentPage)) {
        nav.querySelector('#nav-docs-trigger').classList.add('active');
    }

    // Active state on Agency trigger when on an agency sub-page
    if (agencyPages.includes(currentPage)) {
        nav.querySelector('#nav-agency-trigger').classList.add('active');
    }

    // Active state on More trigger when on a more sub-page
    if (morePages.includes(currentPage)) {
        nav.querySelector('#nav-more-trigger').classList.add('active');
    }

    // Mobile burger toggle
    document.getElementById('nav-toggle-btn').addEventListener('click', function () {
        document.getElementById('nav-links-list').classList.toggle('open');
    });

    // Dropdown click toggle — mobile only (desktop uses CSS :hover)
    ['nav-dropdown-docs', 'nav-dropdown-agency', 'nav-dropdown-more'].forEach(function (id) {
        const dropdown = document.getElementById(id);
        if (!dropdown) return;
        dropdown.querySelector('.nav-dropdown-trigger').addEventListener('click', function (e) {
            e.stopPropagation();
            if (window.innerWidth <= 640) {
                dropdown.classList.toggle('open');
            }
        });
    });

    // Close dropdowns on outside click
    document.addEventListener('click', function () {
        nav.querySelectorAll('.nav-dropdown.open').forEach(function (d) {
            d.classList.remove('open');
        });
    });
})();

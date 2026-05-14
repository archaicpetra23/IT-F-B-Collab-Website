// ===== SHARED DEFAULT DATA =====
const APP_DATA = {
  revenue: 100000,
  cogs: 40000,
  expenses: 20000,
  tax: 5000,
  fixedCost: 50000,
  variableCostPerUnit: 20,
  sellingPrice: 50,
  bepTarget: 2000,
  initialInvestment: 100000,
  annualCashInflow: 25000,
  // Cash flow
  cashSales: 100000,
  cashInvestment: 20000,
  cashSalary: 30000,
  cashOperational: 15000,
  // Balance sheet
  cash: 35000,
  inventory: 25000,
  equipment: 40000,
  debt: 30000,
  payables: 10000,
  capital: 60000,
  // Growth rate for forecast
  growthRate: 10
};

// ===== CENTRALIZED STATE MANAGEMENT =====
// Semua halaman berbagi satu state di localStorage dengan key ini.
const STATE_KEY = 'ff_app_state';

/**
 * Ambil state saat ini. Mengembalikan default APP_DATA jika belum ada data tersimpan.
 */
function getState() {
  try {
    const saved = localStorage.getItem(STATE_KEY);
    if (!saved) return { ...APP_DATA };
    return { ...APP_DATA, ...JSON.parse(saved) };
  } catch (e) {
    localStorage.removeItem(STATE_KEY);
    return { ...APP_DATA };
  }
}

/**
 * Update sebagian state. Menggabungkan partial object ke state yang ada.
 * @param {Object} partial - Key-value pasangan yang ingin diupdate
 */
function setState(partial) {
  const next = { ...getState(), ...partial };
  localStorage.setItem(STATE_KEY, JSON.stringify(next));
  return next;
}

/**
 * Reset seluruh state ke nilai default APP_DATA.
 */
function resetState() {
  localStorage.removeItem(STATE_KEY);
  return { ...APP_DATA };
}

// ===== AUTH GUARD =====
function authGuard() {
  const auth = localStorage.getItem('ff_auth');
  if (!auth) { window.location.href = 'index.html'; return null; }
  return JSON.parse(auth);
}

// ===== FORMAT CURRENCY =====
function formatRp(n) {
  return 'Rp ' + Math.round(n).toLocaleString('id-ID');
}
function formatNum(n, dec = 0) {
  return Number(n).toLocaleString('id-ID', { minimumFractionDigits: dec, maximumFractionDigits: dec });
}

// ===== RENDER SIDEBAR =====
function renderSidebar(active) {
  const auth = JSON.parse(localStorage.getItem('ff_auth') || '{}');
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', href: 'dashboard.html', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>` },
    { id: 'income', label: 'Income Statement', href: 'income.html', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>` },
    { id: 'cashflow', label: 'Cash Flow', href: 'cashflow.html', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"/><polyline points="23 20 23 14 17 14"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/></svg>` },
    { id: 'balance', label: 'Balance Sheet', href: 'balance.html', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22V12m0 0L5 7m7 5l7-5"/><path d="M3 18l4-3m10 3l-4-3"/></svg>` },
    { id: 'analysis', label: 'Financial Analysis', href: 'analysis.html', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>` },
  ];

  return `
  <aside class="sidebar" id="sidebar">
    <div class="sidebar-logo">
      <div class="logo-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
      </div>
      <div class="logo-text">
        <h2>FinForecast</h2>
        <span>Financial App</span>
      </div>
    </div>
    <nav class="sidebar-nav">
      <div class="nav-section-label">Menu Utama</div>
      ${navItems.map(item => `
        <a href="${item.href}" class="nav-item ${active === item.id ? 'active' : ''}" id="nav-${item.id}">
          ${item.icon}
          <span>${item.label}</span>
        </a>
      `).join('')}
    </nav>
    <div class="sidebar-footer">
      <div class="user-card">
        <div class="user-avatar">A</div>
        <div class="user-info">
          <strong>Admin</strong>
          <span>${auth.email || 'admin@test.com'}</span>
        </div>
        <button class="logout-btn" onclick="logout()" title="Logout">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
        </button>
      </div>
    </div>
  </aside>`;
}

// ===== RENDER TOPBAR =====
function renderTopbar(title, subtitle) {
  const now = new Date();
  const opts = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const dateStr = now.toLocaleDateString('id-ID', opts);
  return `
  <div class="topbar">
    <div class="topbar-left">
      <h1>${title}</h1>
      ${subtitle ? `<p>${subtitle}</p>` : ''}
    </div>
    <div class="topbar-right">
      <div class="topbar-badge">
        <span class="dot"></span>
        Prototype Mode
      </div>
      <div class="topbar-date" style="font-size:12px;color:var(--gray-400);">${dateStr}</div>
    </div>
  </div>`;
}

function logout() {
  localStorage.removeItem('ff_auth');
  window.location.href = 'index.html';
}

// ===== ANIMATE NUMBER COUNT UP =====
function animateCount(el, target, prefix = '', suffix = '', duration = 1200) {
  const start = 0;
  const startTime = performance.now();
  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(start + (target - start) * ease);
    el.textContent = prefix + current.toLocaleString('id-ID') + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// ===== INTERSECTION OBSERVER for animations =====
function observeAnimations() {
  const els = document.querySelectorAll('.animate-on-scroll');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('animate-fade-up'); io.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  els.forEach(el => io.observe(el));
}

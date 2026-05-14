// ===== LOGIN JS =====
const CREDENTIALS = { email: 'iffattjel@test.com', password: 'tjel123' };

const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');
const loginBtnText = document.getElementById('loginBtnText');
const loginArrow = document.getElementById('loginArrow');
const loginSpinner = document.getElementById('loginSpinner');
const loginAlert = document.getElementById('login-alert');
const loginAlertText = document.getElementById('login-alert-text');
const togglePwd = document.getElementById('togglePwd');

// Toggle password visibility
togglePwd.addEventListener('click', () => {
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    togglePwd.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`;
  } else {
    passwordInput.type = 'password';
    togglePwd.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
  }
});

function showAlert(msg) {
  loginAlertText.textContent = msg;
  loginAlert.style.display = 'flex';
  loginAlert.classList.add('animate-fade-up');
}
function hideAlert() { loginAlert.style.display = 'none'; }

function setLoading(on) {
  if (on) {
    loginBtnText.textContent = 'Memproses...';
    loginArrow.style.display = 'none';
    loginSpinner.style.display = 'inline-block';
    loginBtn.disabled = true;
  } else {
    loginBtnText.textContent = 'Masuk Sekarang';
    loginArrow.style.display = '';
    loginSpinner.style.display = 'none';
    loginBtn.disabled = false;
  }
}

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  hideAlert();
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  setLoading(true);

  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const result = await response.json();

    if (result.success) {
      localStorage.setItem('ff_auth', JSON.stringify({ email, loggedAt: new Date().toISOString() }));
      loginBtnText.textContent = 'Berhasil! Mengalihkan...';
      setTimeout(() => { window.location.href = 'dashboard.html'; }, 600);
    } else {
      setLoading(false);
      showAlert(result.message || 'Email atau password salah.');
    }
  } catch (error) {
    setLoading(false);
    showAlert('Gagal terhubung ke server. Pastikan backend berjalan.');
    console.error('Login error:', error);
  }
});

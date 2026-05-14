# 📊 FinForecast — Dokumentasi Web App

> Financial Forecasting Website (Prototype Version)  
> Tema: **Light Mode** · Aksen: **Hijau (Primary)** & **Oranye (Secondary)**

---

## 📑 Daftar Isi

1. [Overview Proyek](#1-overview-proyek)
2. [Tech Stack](#2-tech-stack)
3. [Struktur Folder](#3-struktur-folder)
4. [Cara Menjalankan](#4-cara-menjalankan)
5. [Halaman & Fitur](#5-halaman--fitur)
6. [Sistem Desain](#6-sistem-desain)
7. [API Endpoints](#7-api-endpoints)
8. [Logika Kalkulasi](#8-logika-kalkulasi)
9. [Autentikasi](#9-autentikasi)
10. [Data Statis](#10-data-statis)

---

## 1. Overview Proyek

**FinForecast** adalah aplikasi website prototype untuk simulasi dan testing laporan forecast keuangan perusahaan.

### Tujuan
- Simulasi aplikasi forecasting keuangan
- Menampilkan laporan forecast secara interaktif
- Demo/presentation project

---

## 2. Tech Stack

| Layer | Teknologi |
|-------|-----------|
| Frontend | HTML5, Vanilla CSS, Vanilla JavaScript |
| Backend | Node.js + Express.js |
| Charts | Chart.js (CDN) |
| Storage | LocalStorage + Static JSON |
| Fonts | Google Fonts (Inter, Outfit) |

---

## 3. Struktur Folder

```
IT F&B Collab Website/
├── frontend/
│   ├── index.html          # Login page
│   ├── dashboard.html      # Dashboard utama
│   ├── income.html         # Income Statement Forecast
│   ├── cashflow.html       # Cash Flow Forecast
│   ├── balance.html        # Balance Sheet Forecast
│   ├── analysis.html       # BEP & Payback Period
│   ├── css/
│   │   ├── style.css       # Global design system
│   │   └── login.css       # Login page styles
│   └── js/
│       ├── shared.js       # Shared utilities, auth, sidebar
│       └── login.js        # Login logic
├── backend/
│   ├── server.js           # Express server
│   └── data/
│       └── financial-data.json
├── package.json
└── DOKUMENTASI.md
```

---

## 4. Cara Menjalankan

### Opsi A — Langsung Buka File (Tanpa Backend)
```bash
# Buka di browser langsung
open frontend/index.html
```
Semua kalkulasi berjalan di browser.

### Opsi B — Dengan Backend Express
```bash
npm install
npm start
# Buka: http://localhost:3000
```

### Login Credentials
```
Email    : admin@test.com
Password : admin123
```

---

## 5. Halaman & Fitur

### Login Page (`index.html`)
- Form login dengan validasi & loading state
- Show/hide password toggle
- Alert error animasi
- Demo credentials box
- Split layout: hero panel kiri, form kanan

### Dashboard (`dashboard.html`)
| Komponen | Keterangan |
|----------|------------|
| Stat Cards (4) | Revenue, Net Profit, Net Cash Flow, BEP Revenue + count-up animation |
| Revenue Chart | Bar+Line 12 bulan |
| Expense Doughnut | Distribusi biaya |
| Forecast Chart | Proyeksi 5 tahun |
| Module Navigation | Akses cepat 4 modul |

### Income Statement (`income.html`)
**Input:** Revenue, COGS, Operating Expense, Tax, Growth Rate %  
**Output:** Gross Profit, Net Profit, Profit Margin, Forecast  
**Chart:** Bar komparasi aktual vs forecast

### Cash Flow (`cashflow.html`)
**Cash In:** Sales + Investment | **Cash Out:** Salary + Operational  
**Output:** Net Cash Flow, Status (Surplus/Defisit), Progress bars  
**Chart:** Bar 6 bulan simulasi

### Balance Sheet (`balance.html`)
**Assets:** Cash + Inventory + Equipment  
**Liabilities:** Debt + Payables | **Equity:** Capital  
**Output:** Balance Check (Assets = Liab + Equity)  
**Chart:** Doughnut distribusi

### Financial Analysis (`analysis.html`)
**BEP:** Fixed Cost, Selling Price, Variable Cost → BEP Unit + Revenue + Margin of Safety  
**Payback:** Initial Investment, Annual Inflow → Waktu balik modal + ROI 5 tahun

---

## 6. Sistem Desain

### Palet Warna

| Nama | Hex | Penggunaan |
|------|-----|------------|
| Primary Green | `#16a34a` | CTA, active nav, hasil positif |
| Primary Light | `#22c55e` | Hover, gradient |
| Secondary Orange | `#f97316` | Aksen, badge, forecast |
| Secondary Dark | `#ea580c` | Text oranye |
| Gray 50 | `#f9fafb` | Page background |
| White | `#ffffff` | Card background |

### Typography
- **Headings:** Outfit (700–800)
- **Body:** Inter (400–600)

### Animasi
- `fadeInUp` — Card entrance
- `slideInLeft` — Login hero panel
- `pulse-dot` — Live status indicator
- `countUp` — Angka statistik (JS)
- Hover: card lift + button glow shadow

---

## 7. API Endpoints

| Method | Endpoint | Keterangan |
|--------|----------|------------|
| POST | `/login` | Autentikasi |
| GET | `/income-statement` | Income + forecast |
| GET | `/cash-flow` | Arus kas |
| GET | `/balance-sheet` | Neraca |
| GET | `/financial-analysis` | BEP + Payback |

### Contoh: `GET /income-statement`
```json
{
  "revenue": 100000,
  "grossProfit": 60000,
  "netProfit": 35000,
  "profitMargin": "35.00%",
  "forecast": { "revenue": 110000, "netProfit": 38500, "growthRate": "10%" }
}
```

### Contoh: `GET /financial-analysis`
```json
{
  "bep": { "bepUnit": 1667, "bepRevenue": 83350, "contributionMargin": 30 },
  "paybackPeriod": { "years": "4.00", "roi5yr": "25.00%", "status": "Layak" }
}
```

---

## 8. Logika Kalkulasi

### Income Statement
```js
grossProfit = revenue - cogs
netProfit   = grossProfit - expenses - tax
margin      = (netProfit / revenue) * 100
forecast    = value * (1 + growthRate / 100)
```

### Cash Flow
```js
totalCashIn  = cashSales + cashInvestment
totalCashOut = cashSalary + cashOperational
netCashFlow  = totalCashIn - totalCashOut
```

### Balance Sheet
```js
totalAssets      = cash + inventory + equipment
totalLiabilities = debt + payables
balanced         = totalAssets === (totalLiabilities + capital)
```

### BEP
```js
contributionMargin = sellingPrice - variableCostPerUnit
bepUnit            = Math.ceil(fixedCost / contributionMargin)
bepRevenue         = bepUnit * sellingPrice
marginOfSafety     = ((target - bepUnit) / target) * 100
```

### Payback Period
```js
paybackPeriod = initialInvestment / annualCashInflow
roi5yr        = ((annualCashInflow * 5 - initialInvestment) / initialInvestment) * 100
```

---

## 9. Autentikasi

```js
// Credentials hardcoded
{ email: 'admin@test.com', password: 'admin123' }

// Login berhasil → simpan di localStorage
localStorage.setItem('ff_auth', JSON.stringify({ email, loggedAt }))

// Auth Guard (setiap protected page)
if (!localStorage.getItem('ff_auth')) window.location.href = 'index.html'

// Logout
localStorage.removeItem('ff_auth')
```

> ⚠️ Hanya untuk prototype. Jangan digunakan di production.

---

## 10. Data Statis (`financial-data.json`)

```json
{
  "revenue": 100000, "cogs": 40000, "expenses": 20000, "tax": 5000,
  "fixedCost": 50000, "variableCost": 20, "sellingPrice": 50,
  "initialInvestment": 100000, "annualCashInflow": 25000,
  "cash": 35000, "inventory": 25000, "equipment": 40000,
  "debt": 30000, "payables": 10000, "capital": 60000,
  "growthRate": 10
}
```

---

## Future Improvements

- [ ] Real database (PostgreSQL/MySQL)
- [ ] JWT Authentication
- [ ] AI Forecasting
- [ ] Export PDF/Excel
- [ ] Multi-company support
- [ ] Dark mode toggle

---

*FinForecast © 2026 — Prototype Version*

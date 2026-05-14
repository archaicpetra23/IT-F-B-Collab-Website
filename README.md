# 📊 FinForecast — Financial Forecasting Web App

> **FinForecast** adalah aplikasi website prototype berbasis **HTML5, CSS3, JavaScript, dan Node.js** untuk simulasi dan testing laporan forecast keuangan perusahaan. Didesain dengan tema **Light Mode** yang elegan dengan aksen **Hijau (Primary)** dan **Oranye (Secondary)** serta dilengkapi animasi interaktif.

---

## ✨ Fitur Utama

- 🔐 **Halaman Login Interaktif**: Dilengkapi demo kredensial, toggle show/hide password, dan animasi alert/loading.
- 📊 **Dashboard Utama**: Menampilkan ringkasan metrik keuangan utama (Revenue, Profit, Cash Flow, BEP) beserta grafik interaktif.
- 📈 **Income Statement Forecast**: Kalkulasi dan proyeksi laba rugi otomatis berdasarkan persentase pertumbuhan (*growth rate*).
- 💸 **Cash Flow Analysis**: Analisis arus kas masuk dan keluar secara *real-time* dengan visualisasi pemanfaatan anggaran.
- 📋 **Balance Sheet Forecast**: Neraca keuangan mencakup Aset, Liabilitas, dan Ekuitas dengan pengecekan keseimbangan (*balance check*) otomatis.
- 🔍 **Financial Analysis**: Simulasi **Break Even Point (BEP)** dan **Payback Period** interaktif untuk pengambil keputusan investasi.

---

## 🛠️ Tech Stack

- **Frontend**: HTML5, Vanilla CSS (Sistem Desain Khusus), Vanilla JavaScript
- **Backend**: Node.js, Express.js
- **Visualisasi Grafik**: Chart.js (CDN)
- **Penyimpanan**: LocalStorage & Static JSON Data
- **Tipografi**: Google Fonts (Outfit & Inter)

---

## 🚀 Cara Menjalankan Aplikasi

Aplikasi ini dapat dijalankan melalui 2 cara yang fleksibel:

### Opsi 1: Menjalankan Langsung (Tanpa Node.js)
Karena semua logika utama dan kalkulasi berjalan langsung di *browser*, Anda cukup membuka file HTML:
1. Buka folder `frontend/` di *file manager*.
2. Klik ganda pada file `index.html` (atau buka di *browser* pilihan Anda).

### Opsi 2: Menjalankan dengan Backend Server (Express.js)
Untuk menjalankan sebagai aplikasi web utuh dengan REST API simulasi:
1. Pastikan Anda telah menginstal Node.js.
2. Buka terminal di folder root proyek dan jalankan perintah:
   ```bash
   npm install
   npm start
   ```
3. Buka browser dan akses alamat:
   ```url
   http://localhost:3000
   ```

---

## 🔑 Demo Kredensial Login

Gunakan data berikut untuk masuk ke aplikasi:

```yaml
Email    : admin@test.com
Password : admin123
```

---

## 📁 Struktur Folder Proyek

```text
IT F&B Collab Website/
├── frontend/             # File frontend aplikasi
│   ├── index.html        # Halaman Login
│   ├── dashboard.html    # Halaman Dashboard
│   ├── income.html       # Modul Laba Rugi
│   ├── cashflow.html     # Modul Arus Kas
│   ├── balance.html      # Modul Neraca Keuangan
│   ├── analysis.html     # Modul Analisis (BEP & Payback)
│   ├── css/              # Sistem gaya (style.css & login.css)
│   └── js/               # Skrip logika (shared.js & login.js)
├── backend/              # Server API Express.js
│   ├── server.js         # Endpoint API utama
│   └── data/             # File data statis JSON
├── package.json          # Konfigurasi dependensi Node.js
├── README.md             # File pengantar (dokumen ini)
└── DOKUMENTASI.md        # Dokumentasi teknis & detail perhitungan
```

---

## 📖 Dokumentasi Lengkap

Untuk penjelasan mendalam mengenai struktur API, formula kalkulasi finansial (seperti rumus BEP, ROI, Net Profit Margin), serta panduan pengembangan lanjutan, silakan baca file **[DOKUMENTASI.md](DOKUMENTASI.md)** di repositori ini.

---

<div align="center">
  <b>FinForecast © 2026 · Prototype Version</b><br>
  <i>Dibuat untuk kebutuhan presentasi, simulasi, dan demonstrasi bisnis.</i>
</div>

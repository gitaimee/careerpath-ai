# CareerPath.ai - Frontend Application

Aplikasi web untuk **Sistem Rekomendasi Karir Berbasis Asesmen** menggunakan teknologi Machine Learning untuk menganalisis profil minat, kemampuan, dan komitmen waktu belajar pengguna guna memberikan rekomendasi 3 profesi digital teratas lengkap dengan persentase kesiapan dan analisis *skill gap*.

---

## 🔗 Hubungan Repositori

Untuk dapat menjalankan aplikasi ini secara fungsional secara *end-to-end*, Anda memerlukan repositori Backend yang menangani pemrosesan model AI dan database.
* **Repositori Backend**: [careerpath-backend](https://github.com/harrymx1/careerpath-backend)

---

## 🛠️ Teknologi & Tools

Aplikasi frontend ini dibangun dengan memanfaatkan teknologi modern berikut:
* **Core**: React.js (Javascript)
* **Build Tool**: Vite (Module Bundler)
* **Styling**: Vanilla CSS (Custom CSS)
* **Networking**: Axios (untuk integrasi RESTful API)
* **Routing**: React Router DOM

---

## 🚀 Fitur Utama (Frontend)

1. **Dashboard / Landing Page**: Halaman utama interaktif yang menampilkan tata cara kerja sistem rekomendasi dan riwayat pengujian sebelumnya.
2. **Form Asesmen**: Kuesioner berisi 10 pertanyaan komprehensif (Q1 - Q10) dengan skala 1-5 untuk menilai minat dan kemampuan di berbagai bidang teknologi.
3. **Analisis Rekomendasi & Skill Gap**: Menampilkan 3 hasil rekomendasi teratas yang bersumber dari prediksi model Machine Learning backend beserta visualisasi persentase kecocokan.
4. **Profil Pengguna**: Menampilkan ringkasan keahlian teknis (*hard skill*), kemampuan komunikasi (*soft skill*), serta jurnal pengalaman kerja/organisasi.

---

## 💻 Cara Menjalankan Project Secara Lokal

Ikuti langkah-langkah berikut untuk menjalankan aplikasi frontend di komputer Anda:

### Prasyarat
* Pastikan Anda sudah menginstal [Node.js](https://nodejs.org/) versi 18+.

### Langkah-langkah
1. **Clone Repositori**:
   ```bash
   git clone https://github.com/gitaimee/careerpath-ai.git
   cd careerpath-ai
   ```

2. **Instal Dependensi**:
   ```bash
   npm install
   ```

3. **Konfigurasi Environment Variables (.env)**:
   Aplikasi ini memerlukan koneksi ke layanan Supabase untuk fitur Autentikasi dan Database. Buat file baru bernama `.env` di dalam folder `careerpath-ai` (sejajar dengan `package.json`), lalu masukkan kode berikut:
   ```env
   VITE_SUPABASE_URL=https://sctingdjcgoxykvwfrgc.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjdGluZ2RqY2dveHlrdndmcmdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1MjAxNDYsImV4cCI6MjA5NjA5NjE0Nn0.g0cKOur7MbtNYzTaNFPNM5mUIBDVwcCNecQN73YlrcA
   ```

4. **Pastikan Backend Menyala**:
   * Aplikasi frontend ini terhubung ke backend Express lokal yang berjalan di port `3000` (`http://localhost:3000`). 
   * Pastikan Anda sudah menjalankan backend dari repositori [careerpath-backend](https://github.com/harrymx1/careerpath-backend) sebelum memulai tes.

5. **Jalankan Mode Pengembangan**:
   ```bash
   npm run dev
   ```
   * Buka browser Anda dan akses halaman di alamat `http://localhost:5173`.

---

## 📁 Struktur Folder Utama

```text
frontend/
├── src/
│   ├── assets/       # Gambar, ikon, dan aset statis lainnya
│   ├── components/   # Komponen UI global (seperti Navbar)
│   ├── data/         # Data dummy lokalisasi (soal kuis, daftar profesi)
│   ├── pages/        # Halaman-halaman utama (Landing, Tes, Hasil, Profil, Detail)
│   ├── App.jsx       # Konfigurasi routing
│   ├── index.css     # Entry CSS & konfigurasi Tailwind
│   └── main.jsx      # Entrypoint React
├── index.html        # File HTML utama & integrasi Google Fonts
└── package.json      # List dependencies & scripts
```

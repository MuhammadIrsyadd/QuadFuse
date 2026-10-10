# 🕹️ QuadFuse — Cyber Synth Arcade 2048

> **QuadFuse** adalah game puzzle angka satu halaman (*single-page web application*) berbasis kisi 4x4 yang terinspirasi dari 2048 dengan estetika retro-futuristik **Cyber Synth Arcade** (`#0F131D` obsidian base, `#00F5FF` electric cyan, `#D0BCFF` vivid violet).

---

## ⚡ Fitur Utama

- 🎮 **Logika 2048 Presisi & Buttery Smooth**: Geser dan fusi ubin dengan animasi hardware-accelerated 60fps (125ms transisi).
- 🎓 **Tutorial Popup Otomatis**: Muncul di kunjungan pertama pemain, menjelaskan cara bermain dalam 4 langkah visual. Selalu bisa dibuka kembali lewat tombol **"Panduan"**.
- 🏆 **Modal Kemenangan 2048 & Keep Going**: Perayaan visual saat mencapai angka 2048 dengan rincian metrik (skor akhir, efisiensi langkah, waktu tempuh). Pemain dapat memilih **"Lanjut Main"** untuk target 4096+ atau **"Bagikan Skor"** ke clipboard.
- 💀 **Overlay Game Over**: Muncul saat petak penuh dan tidak ada gerakan yang tersisa.
- ⏪ **Undo (Batal Langkah)**: Mengembalikan papan dan skor ke gerakan sebelumnya (tombol Undo atau shortcut `U`).
- 🔊 **Web Audio API Synthesizer**: Suara sintetis dinamis tanpa file audio eksternal (move whoosh, harmonic merge chord, victory fanfare, game over chime).
- 📊 **Skor Terbaik & Leaderboard Lokal**: Disimpan secara persisten di `localStorage` peramban pemain.
- 📱 **Multi-Platform Responsif**: Mendukung keyboard (Desktop), gestur swipe sentuh layar (Mobile), dan tombol panah di layar.
- 🚀 **Zero-Config Vercel Ready**: Siap dideploy langsung ke Vercel, Netlify, atau GitHub Pages dalam hitungan detik.

---

## 🕹️ Cara Bermain

1. **Geser Ubin**: Gunakan tombol panah keyboard (`↑`, `↓`, `←`, `→`), tombol `W, A, S, D`, tombol arah di layar, atau usap layar sentuh (mobile).
2. **Gabungkan Angka**: Dua ubin dengan angka yang sama akan menyatu saat bertabrakan ($2+2=4$, $4+4=8$, dst.).
3. **Muncul Ubin Baru**: Setiap gerakan yang valid memunculkan satu ubin baru bernilai 2 atau 4 di petak kosong.
4. **Capai 2048**: Rancang strategi hingga ubin legendaris **2048** terbuka!

---

## ⌨️ Kontrol Keyboard

| Tombol | Fungsi |
| :--- | :--- |
| `↑` / `W` | Geser ke Atas |
| `↓` / `S` | Geser ke Bawah |
| `←` / `A` | Geser ke Kiri |
| `→` / `D` | Geser ke Kanan |
| `U` | Undo (Batal 1 langkah terakhir) |
| `N` | Game Baru |
| `Esc` | Menutup Modal / Popup |

---

## 🚀 Deployment ke Vercel

Game ini berbasis web statis murni sehingga sangat cepat dan ringan saat di-host di Vercel:

### Opsi 1: Hubungkan Repository GitHub ke Vercel
1. Buka [vercel.com](https://vercel.com) dan login.
2. Klik **"Add New..."** ➔ **"Project"**.
3. Import repository **`MuhammadIrsyadd/QuadFuse`**.
4. Framework Preset pilih **"Other"**, lalu klik **"Deploy"**.

### Opsi 2: Menggunakan Vercel CLI
```bash
npx vercel
```

---

## 🛠️ Lisensi & Hak Cipta
Dibuat untuk **QuadFuse 2048**. Dirilis di bawah lisensi MIT.

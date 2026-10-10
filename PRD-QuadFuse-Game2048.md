# PRD: QuadFuse — Game 2048

*Product Requirements Document*

## 1. Ringkasan Produk

QuadFuse adalah game puzzle satu halaman (single-page) berbasis grid 4x4 yang terinspirasi dari 2048, di mana pemain menggabungkan angka-angka bernilai sama untuk mencapai angka target (2048) atau mencetak skor setinggi mungkin. Game ini fokus sepenuhnya pada pengalaman bermain: ringan, cepat dimainkan, dan dilengkapi tutorial singkat berupa popup agar pemain baru langsung paham cara mainnya.

## 2. Latar Belakang & Tujuan

**Latar Belakang:** Game puzzle berbasis angka seperti 2048 populer karena mekanismenya sederhana untuk dipelajari tapi cukup menantang untuk dikuasai. Game jenis ini cocok dibuat sebagai satu halaman ringan yang bisa langsung dimainkan tanpa instalasi atau proses onboarding yang rumit.

**Tujuan Proyek:**
- Menghadirkan pengalaman bermain 2048 yang responsif dan menyenangkan dalam satu halaman.
- Memastikan mekanisme game (geser, gabung, menang, kalah) berjalan tanpa bug.
- Menyediakan tutorial singkat berupa popup agar pemain baru langsung paham cara main tanpa instruksi tambahan.

## 3. Target Pengguna

- Pemain kasual yang ingin mengisi waktu luang dengan game ringan dan cepat dimainkan langsung di browser.
- Pemain baru yang belum pernah main 2048 dan butuh panduan cepat lewat tutorial popup di awal.

## 4. Cara Bermain (How to Play)

*Konten di bawah ini akan ditampilkan sebagai popup tutorial saat pemain pertama kali membuka game, dan bisa diakses ulang lewat tombol "How to Play".*

1. Game dimulai dengan grid 4x4 berisi 2 ubin (tile) bernilai 2 atau 4 yang muncul secara acak.
2. Pemain menggeser seluruh tile ke salah satu dari 4 arah (atas, bawah, kiri, kanan) menggunakan tombol panah keyboard, swipe (mobile), atau tombol on-screen.
3. Semua tile akan bergeser ke arah yang dipilih hingga mentok ke tepi grid atau tile lain.
4. Jika dua tile dengan nilai yang sama bertabrakan saat bergeser, keduanya akan bergabung menjadi satu tile dengan nilai gabungan (misal: 2 + 2 = 4).
5. Setiap kali pemain melakukan gerakan yang valid (menyebabkan minimal satu tile bergeser/bergabung), satu tile baru (nilai 2 atau 4) akan muncul secara acak di posisi kosong.
6. Skor bertambah sesuai nilai tile hasil penggabungan.
7. **Menang:** Pemain mencapai tile bernilai 2048 (pemain tetap bisa melanjutkan bermain untuk skor lebih tinggi).
8. **Kalah:** Grid penuh (tidak ada sel kosong) dan tidak ada lagi gerakan valid yang bisa dilakukan (tidak ada tile bersebelahan dengan nilai sama).

## 5. Fitur & Mekanisme Game (Core Features)

### 5.1 Fitur Wajib (MVP)
- Grid 4x4 dengan mekanisme geser & gabung sesuai aturan di atas.
- Kontrol via keyboard (desktop) dan swipe gesture (mobile).
- Popup tutorial singkat (cara bermain) yang otomatis muncul saat pertama kali membuka game, dengan tombol "How to Play" untuk membukanya lagi kapan saja.
- Skor real-time, ditampilkan di bagian atas layar.
- Best score tersimpan di local storage (bertahan walau browser ditutup).
- Animasi transisi saat tile bergeser dan bergabung.
- Modal/overlay saat menang (reach 2048) dan saat game over.
- Tombol "New Game" untuk restart.
- Responsive design (bisa dimainkan di desktop maupun mobile).

### 5.2 Fitur Opsional (Nice to Have)
- Undo satu langkah terakhir.
- Pilihan ukuran grid (3x3, 4x4, 5x5) untuk variasi tingkat kesulitan.
- Dark mode / light mode toggle.
- Animasi "pop" saat tile baru muncul atau saat tile bergabung dengan efek scale.
- Sound effect sederhana saat tile bergabung.
- Leaderboard lokal (menyimpan beberapa skor tertinggi, bukan hanya satu best score).

## 6. User Interface & Experience

- **Tampilan utama:** Grid game di tengah layar, skor & best score di bagian atas, tombol New Game mudah dijangkau.
- **Popup tutorial:** Muncul otomatis di kunjungan pertama, berisi ringkasan cara main (geser untuk menggabungkan angka), dengan tombol "Mengerti" untuk menutup dan tombol "How to Play" yang selalu bisa diakses untuk membuka ulang.
- **Palet warna:** Mengikuti konvensi 2048 original (warna tile berbeda sesuai nilai, dari warna muda ke warna lebih gelap/mencolok seiring nilai membesar).
- **Animasi:** Transisi pergerakan tile harus smooth (sekitar 100–150ms) agar terasa responsif, bukan patah-patah.
- **Aksesibilitas:** Kontras warna teks-vs-tile harus cukup jelas dibaca; kontrol keyboard harus berfungsi penuh tanpa mouse.

## 7. Spesifikasi Teknis

- **Platform:** Web (satu halaman, bisa dimainkan langsung di browser tanpa instalasi).
- **Rekomendasi stack:** HTML/CSS/JavaScript vanilla, atau React/Vue. State management cukup menggunakan useState/useReducer (React) karena kompleksitas state tidak terlalu besar.
- **Penyimpanan data:** localStorage untuk menyimpan best score (tidak perlu backend/database).
- **Struktur data inti:** Grid direpresentasikan sebagai array 2 dimensi (4x4), dengan fungsi terpisah untuk: generate tile baru, geser baris/kolom, gabungkan tile sejenis, cek status game over.
- **Deployment:** Statis, bisa di-host di Vercel/Netlify/GitHub Pages sebagai link yang bisa langsung dimainkan.

## 8. Metrik Keberhasilan

- Game dapat dimainkan penuh dari awal sampai kondisi menang/kalah tanpa bug pada logika penggabungan.
- Waktu load halaman di bawah 2 detik.
- Bisa dimainkan lancar di perangkat mobile (swipe responsif) dan desktop (keyboard responsif).
- Pemain baru bisa langsung paham cara main hanya dari popup tutorial, tanpa butuh penjelasan tambahan.

## 9. Batasan (Out of Scope)

- Tidak ada sistem akun pengguna atau login.
- Tidak ada leaderboard global/online (cukup lokal per perangkat).
- Tidak ada mode multiplayer.
- Tidak ada backend/server di versi awal (semua logic di client-side).

## 10. Pengembangan Lanjutan (Future Enhancements)

- Integrasi backend untuk leaderboard global antar pemain.
- Mode tantangan harian (daily challenge) dengan seed grid yang sama untuk semua pemain.
- Tema visual tambahan (misal tema custom sesuai musim/event).
- Versi PWA agar bisa di-install sebagai app di mobile.

/* ==========================================
   FILE INI SATU-SATUNYA YANG PERLU KAMU EDIT
   ========================================== */

// Nama situs/portofolio — tampil di navbar & hero
const SITE_NAME = "Nadya's Portfolio";

const ME = {
  name: "Nadya Ananda Putri",
  title: "Ilustrator & Pecinta Cerita Fantasi",
  avatar: "profile.jpeg",

  // Kutipan singkat yang tampil besar di hero (boleh dikosongkan: "")
quote: "Star-gazing Aster,\nwould I were the skies,\nTo gaze upon thee with a thousand eyes.",

  bio: [
    "Halo! Aku seorang ilustrator yang suka menggambar karakter fiksi.",
    "Sejak SMP aku mulai iseng menggambar, dan sekarang bisa membuat karakter buatanku sendiri — walau banyak yang masih WIP, hehe."
  ],

  skills: ["Digital painting", "Character design", "Sketsa tradisional", "Fan art"],

  // level = persen bar (0-100), logo = alamat gambar logo app
  // contoh: logo: "gambar/ibis.png"
  tools: [
    { name: "Ibis Paint",        level: 80, logo: "IbisPaint.jpg" },
    { name: "MediBang",          level: 40, logo: "Medibang.jpg" },
    { name: "Clip Studio Paint", level: 20, logo: "CSP.jpg" }
  ],

  contact: [
    ["Instagram", "https://instagram.com/xzach_404"],
    ["Email", "mailto:nadyaanandaaputrii@email.com"]
  ]
};
const ARTWORKS = [
  { title: "Fallen Angel", desc: "Dapet inspo karena abis lihat rekomendasi Pinterest.", thumb: "Angel thumbnail.png", src: "Angel.png", hue: 220 },
  { title: "Short Comic", desc: "Aku buat short comic ini karena lagi sering main SKY COTL, inspirasinya dari OC aku dan temenku.", thumb: "Comic thumbnail.png", src: "Comic.png", hue: 260 },
  { title: "Mikhail", desc: "Dia Mikhail, suka aku panggil Miki, OC baruku yang asalnya dari Russia. Aku gambar dia karena waktu itu lagi trend lagu 'Базовый минимум' hehe.", thumb: "Mikhail thumbnail.png", src: "Mikhail.png", hue: 200 },
  { title: "Hyunwoo", desc: "Kalo ini OC ku yang paling aku suka. Hyunwoo lahir bareng Miki, tapi aku buat dia pas lagi seneng denger lagu 'Catch Catch'", thumb: "Hyunwoo thumbnail.png", src: "Hyunwoo.png", hue: 45  },
  { title: "Halloween 1", desc: "Aku buat art ini karena lagi bulan halloween, ini art halloween pertamaku. Insponya dari karakter 'Genshin Impact' terus temanya aku ambil sedikit dari game 'Silent Hill 2'", thumb: "Halloween_1 thumbnail.png", src: "Halloween_1.png", hue: 300 },
  { title: "Halloween 2", desc: "Kalau yang ini adalah art hallowen kedua aku. Insponya dari OC ku dan temanku, kita sering main minecraft bareng, jadi aku ngide buat gambar OC kita untuk halloween", thumb: "Halloween_2 thumbnail.png", src: "Halloween_2.png", hue: 210 }
];

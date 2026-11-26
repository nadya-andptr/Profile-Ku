/* halaman dari data di data.js, salju dan bunga */

// Cegah karakter khusus merusak HTML
function esc(text) {
  const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" };
  return String(text).replace(/[&<>"]/g, c => map[c]);
}

// Warna placeholder kalau ga ada gambar
function gradientOf(art) {
  return `linear-gradient(140deg, hsl(${art.hue} 70% 82%), hsl(${(art.hue + 40) % 360} 55% 55%))`;
}

function thumbBg(art){
  const url = art.thumb || art.src;
  return url ? `url("${url}")` : gradientOf(art);
}
function fullBg(art){
  return art.src ? `url("${art.src}")` : gradientOf(art);
}

// Bunga 
function flowerSVG() {
  return `
    <svg viewBox="0 0 40 40" width="100%" height="100%" fill="none">
      <g fill="currentColor" opacity=".92">
        <ellipse cx="20" cy="10" rx="6.2" ry="8.6"/>
        <ellipse cx="20" cy="10" rx="6.2" ry="8.6" transform="rotate(72 20 20)"/>
        <ellipse cx="20" cy="10" rx="6.2" ry="8.6" transform="rotate(144 20 20)"/>
        <ellipse cx="20" cy="10" rx="6.2" ry="8.6" transform="rotate(216 20 20)"/>
        <ellipse cx="20" cy="10" rx="6.2" ry="8.6" transform="rotate(288 20 20)"/>
      </g>
      <circle cx="20" cy="20" r="4.4" fill="#f2dd6b"/>
    </svg>`;
}


/* ---------- Isi teks & konten dari data.js ---------- */

function fillContent() {
  document.getElementById("navName").textContent = SITE_NAME;
  document.getElementById("footName").textContent = `${SITE_NAME} — dibuat dengan HTML, CSS, & JavaScript ❄`;

  // Hero
  document.getElementById("avatarBox").innerHTML = ME.avatar
    ? `<img src="${esc(ME.avatar)}" alt="Foto ${esc(ME.name)}">`
    : "Foto profil";
  document.getElementById("heroName").textContent = ME.name;
  document.getElementById("heroTitle").textContent = ME.title;

  const quoteEl = document.getElementById("heroQuote");
  if (ME.quote) { quoteEl.textContent = `"${ME.quote}"`; } else { quoteEl.remove(); }

  // Tentang
  document.getElementById("bioBody").innerHTML = ME.bio.map(t => `<p>${esc(t)}</p>`).join("");

  // Keahlian
  document.getElementById("skillTags").innerHTML =
    ME.skills.map(s => `<li>${esc(s)}</li>`).join("");

  document.getElementById("toolList").innerHTML = ME.tools.map(t => {
    const logo = t.logo ? `<img src="${esc(t.logo)}" alt="Logo ${esc(t.name)}">` : "Logo";
    return `
      <div class="tool d-flex align-items-center gap-3 mb-3">
        <div class="tool-logo">${logo}</div>
        <div class="flex-grow-1">
          <div class="d-flex justify-content-between mb-1"><span>${esc(t.name)}</span><span>${t.level}%</span></div>
          <div class="progress" role="progressbar" aria-label="${esc(t.name)}"
               aria-valuenow="${t.level}" aria-valuemin="0" aria-valuemax="100">
            <div class="progress-bar" style="width:${t.level}%"></div>
          </div>
        </div>
      </div>`;
  }).join("");

  
  // Galeri
  document.getElementById("galleryGrid").innerHTML = ARTWORKS.map((a, i) => `
    <div class="col-6 col-md-4">
      <div class="card h-100">
        <button class="art" data-i="${i}" aria-label="Lihat ${esc(a.title)}">
          <div class="pic" style="background-image:${esc(thumbBg(a))}"></div>
        </button>
        <h3>${esc(a.title)}</h3>
        ${a.desc ? `<p>${esc(a.desc)}</p>` : ""}
      </div>
    </div>`).join("");
 
  // Kontak
  document.getElementById("contactList").innerHTML = ME.contact.map(([label, url]) =>
    `<a href="${esc(url)}" target="_blank" rel="noopener">${esc(label)}</a>`).join("");

  // Bunga kecil di logo dan tiap judul
  document.querySelectorAll(".logo-flower, .h-flower").forEach(el => el.innerHTML = flowerSVG());
}



/* Salju yang jatuh pelan */

function makeSnow() {
  const layer = document.getElementById("snow");
  const glyphs = ["❅", "❆", "❄"];
  const bits = [];

  // Membagi posisi menjadi beberapa area agar merata
  function balancedPosition(index, total) {
    const area = 100 / total;
    const left = (index * area) + (Math.random() * area);

    return left.toFixed(1);
  }

  // Bintik salju putih
  for (let i = 0; i < 36; i++) {
    const left = balancedPosition(i, 36);
    const size = (Math.random() * 3 + 2).toFixed(1);
    const duration = (Math.random() * 10 + 12).toFixed(1);
    const delay = (Math.random() * -20).toFixed(1);
    const drift = (Math.random() * 60 - 30).toFixed(0);
    const opacity = (Math.random() * 0.4 + 0.4).toFixed(2);

    bits.push(`<span class="flake dot" style="
      left:${left}%; width:${size}px; height:${size}px;
      animation-duration:${duration}s; animation-delay:${delay}s;
      opacity:${opacity}; --drift:${drift}px;"></span>`);
  }

  // Kepingan bunga salju
  for (let i = 0; i < 14; i++) {
    const left = balancedPosition(i, 14);
    const size = (Math.random() * 14 + 18).toFixed(0);
    const duration = (Math.random() * 12 + 16).toFixed(1);
    const delay = (Math.random() * -24).toFixed(1);
    const drift = (Math.random() * 80 - 40).toFixed(0);
    const glyph = glyphs[i % glyphs.length];

    bits.push(`<span class="flake glyph" style="
      left:${left}%; font-size:${size}px;
      animation-duration:${duration}s; animation-delay:${delay}s;
      --drift:${drift}px;">${glyph}</span>`);
  }

  layer.innerHTML = bits.join("");
}





/* ---------- Bunga forget-me-not dekoratif yang melayang pelan ---------- */

function makeFlowers() {
  const layer = document.getElementById("flowers");
  const tones = ["t1", "t2", "t3"];
  const bits = [];

  // Jumlah bunga menyesuaikan ukuran layar
  const totalFlowers = window.innerWidth < 600 ? 5 : 8;

  for (let i = 0; i < totalFlowers; i++) {
    // Posisi bunga dibuat merata dari kiri ke kanan
    const area = 100 / totalFlowers;
    const left = (i * area) + (Math.random() * area * 0.5) + (area * 0.25);
    const top = (Math.random() * 96).toFixed(1);
    const size = (Math.random() * 36 + 48).toFixed(0);
    const duration = (Math.random() * 5 + 10).toFixed(1);
    const delay = (Math.random() * -10).toFixed(1);
    const tone = tones[i % tones.length];

    bits.push(`<span class="deco-flower ${tone}" style="
      left:${left.toFixed(1)}%; top:${top}%; width:${size}px; height:${size}px;
      animation-duration:${duration}s; animation-delay:${delay}s;">${flowerSVG()}</span>`);
  }

  layer.innerHTML = bits.join("");
}




/* ---------- Gambar besar (lightbox) ---------- */

function setupLightbox() {
  // true  = semua gambar asli diunduh diam-diam setelah halaman selesai dimuat (klik langsung tampil)
  // false = gambar asli baru diunduh saat kotaknya disentuh / diarahkan kursor (hemat kuota)
  const PRELOAD_SEMUA = true;

  const lb = document.getElementById("lb");
  const stage = document.getElementById("lbStage");
  const big = document.getElementById("lbImg");
  const grid = document.getElementById("galleryGrid");
  const zReset = document.getElementById("zReset");
  let shown = null;

  /* ----- Muat gambar asli lebih awal supaya tidak ada delay ----- */
  const cache = {};

  function preload(art) {
    if (!art || !art.src) return null;
    if (!cache[art.src]) {
      const im = new Image();
      im.src = art.src;
      cache[art.src] = im;
    }
    return cache[art.src];
  }

  if (PRELOAD_SEMUA) {
    addEventListener("load", () => {
      let i = 0;
      const next = () => {
        if (i >= ARTWORKS.length) return;
        preload(ARTWORKS[i++]);
        setTimeout(next, 400);
      };
      setTimeout(next, 800);
    });
  }

  const warm = e => {
    const btn = e.target.closest(".art");
    if (btn) preload(ARTWORKS[btn.dataset.i]);
  };
  grid.addEventListener("pointerover", warm);
  grid.addEventListener("pointerdown", warm);

  /* ----- Zoom ----- */
  let scale = 1, tx = 0, ty = 0;
  const MAX = 6;

  function apply() {
    const mx = stage.clientWidth * (scale - 1) / 2;
    const my = stage.clientHeight * (scale - 1) / 2;
    tx = Math.max(-mx, Math.min(mx, tx));
    ty = Math.max(-my, Math.min(my, ty));
    big.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
    stage.classList.toggle("zoomed", scale > 1);
    zReset.textContent = Math.round(scale * 100) + "%";
  }

  function zoomAt(px, py, next) {
    next = Math.max(1, Math.min(MAX, next));
    const k = next / scale;
    tx = px - (px - tx) * k;
    ty = py - (py - ty) * k;
    scale = next;
    apply();
  }

  function resetZoom() { scale = 1; tx = 0; ty = 0; apply(); }

  function animated(fn) {
    big.classList.add("anim");
    fn();
    setTimeout(() => big.classList.remove("anim"), 260);
  }

  function rel(x, y) {
    const r = stage.getBoundingClientRect();
    return [x - r.left - r.width / 2, y - r.top - r.height / 2];
  }

  stage.addEventListener("wheel", e => {
    e.preventDefault();
    const [px, py] = rel(e.clientX, e.clientY);
    zoomAt(px, py, scale * Math.exp(-e.deltaY * 0.002));
  }, { passive: false });

  const pts = new Map();
  let moved = 0, pinchD = 0, pinched = false;

  stage.addEventListener("pointerdown", e => {
    stage.setPointerCapture(e.pointerId);
    pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pts.size === 1) { moved = 0; pinched = false; if (scale > 1) stage.classList.add("dragging"); }
    if (pts.size === 2) {
      const [a, b] = [...pts.values()];
      pinchD = Math.hypot(a.x - b.x, a.y - b.y);
      pinched = true;
    }
  });

  stage.addEventListener("pointermove", e => {
    const p = pts.get(e.pointerId);
    if (!p) return;
    const dx = e.clientX - p.x, dy = e.clientY - p.y;
    p.x = e.clientX; p.y = e.clientY;

    if (pts.size === 1) {
      moved += Math.abs(dx) + Math.abs(dy);
      if (scale > 1) { tx += dx; ty += dy; apply(); }
    } else if (pts.size === 2) {
      const [a, b] = [...pts.values()];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      const [px, py] = rel((a.x + b.x) / 2, (a.y + b.y) / 2);
      if (pinchD > 0) zoomAt(px, py, scale * d / pinchD);
      pinchD = d;
    }
  });

  function endPointer(e) {
    if (!pts.delete(e.pointerId)) return;
    if (pts.size > 0) return;
    stage.classList.remove("dragging");
    if (e.type === "pointerup" && !pinched && moved < 8) {
      const [px, py] = rel(e.clientX, e.clientY);
      animated(() => scale > 1 ? resetZoom() : zoomAt(px, py, 2.5));
    }
  }
  stage.addEventListener("pointerup", endPointer);
  stage.addEventListener("pointercancel", endPointer);

  document.getElementById("zIn").onclick  = () => animated(() => zoomAt(0, 0, scale * 1.5));
  document.getElementById("zOut").onclick = () => animated(() => zoomAt(0, 0, scale / 1.5));
  zReset.onclick = () => animated(resetZoom);

  /* ----- Buka & tutup ----- */
  function openLb(art) {
    document.getElementById("lbCap").textContent = art.title;

    const im = preload(art);
    const ready = im && im.complete && im.naturalWidth > 0;

    big.classList.remove("loading", "anim");
    resetZoom();
    shown = art;

    if (ready || !art.thumb || art.thumb === art.src) {
      big.style.backgroundImage = fullBg(art);
    } else {
      big.style.backgroundImage = thumbBg(art);
      big.classList.add("loading");
      const swap = () => {
        if (shown !== art) return;
        big.style.backgroundImage = fullBg(art);
        big.classList.remove("loading");
      };
      const fail = () => { if (shown === art) big.classList.remove("loading"); };
      (im.decode ? im.decode() : Promise.resolve()).then(swap, fail);
    }

    lb.classList.add("on");
    document.documentElement.style.overflow = "hidden";
  }

  function closeLb() {
    lb.classList.remove("on");
    document.documentElement.style.overflow = "";
    shown = null;
  }

  grid.addEventListener("click", e => {
    const btn = e.target.closest(".art");
    if (btn) openLb(ARTWORKS[btn.dataset.i]);
  });

  document.getElementById("lbClose").onclick = closeLb;
  lb.addEventListener("click", e => { if (e.target === lb) closeLb(); });

  addEventListener("keydown", e => {
    if (!lb.classList.contains("on")) return;
    if (e.key === "Escape") closeLb();
    if (e.key === "+" || e.key === "=") animated(() => zoomAt(0, 0, scale * 1.5));
    if (e.key === "-") animated(() => zoomAt(0, 0, scale / 1.5));
    if (e.key === "0") animated(resetZoom);
  });

}
/* ---------- Forget-me-not cursor trail ---------- */

function makeCursorTrail() {
  const layer = document.getElementById("cursorTrail");

  let lastTime = 0;
  let lastX = 0;
  let lastY = 0;

  document.addEventListener("mousemove", e => {
    const now = Date.now();

    // Jarak minimal agar bunga tidak terlalu rapat
    const distance = Math.hypot(e.clientX - lastX, e.clientY - lastY);

    if (now - lastTime < 50 || distance < 15) return;

    lastTime = now;
    lastX = e.clientX;
    lastY = e.clientY;

    const flower = document.createElement("span");

    flower.className = "trail-flower";
    flower.innerHTML = flowerSVG();

    const size = Math.random() * 6 + 12;
    const offsetX = (Math.random() - 0.5) * 12;
    const offsetY = (Math.random() - 0.5) * 12;

    flower.style.left = `${e.clientX + offsetX}px`;
    flower.style.top = `${e.clientY + offsetY}px`;
    flower.style.width = `${size}px`;
    flower.style.height = `${size}px`;

    // Variasi warna bunga
    const colors = ["#a1c2e8", "#d7abd0", "#789bd0"];
    flower.style.color = colors[Math.floor(Math.random() * colors.length)];

    layer.appendChild(flower);

    // Menghapus bunga setelah animasi selesai
    setTimeout(() => {
      flower.remove();
    }, 1500);
  });
}


/* ---------- Forget-me-not touch trail untuk HP ---------- */

function makeTouchTrail() {
  const layer = document.getElementById("cursorTrail");

  let lastTime = 0;
  let lastX = 0;
  let lastY = 0;

  document.addEventListener("touchmove", e => {
    const touch = e.touches[0];
    const now = Date.now();

    const distance = Math.hypot(
      touch.clientX - lastX,
      touch.clientY - lastY
    );

    if (now - lastTime < 50 || distance < 15) return;

    lastTime = now;
    lastX = touch.clientX;
    lastY = touch.clientY;

    const flower = document.createElement("span");

    flower.className = "trail-flower";
    flower.innerHTML = flowerSVG();

    const size = Math.random() * 6 + 12;
    const offsetX = (Math.random() - 0.5) * 12;
    const offsetY = (Math.random() - 0.5) * 12;

    flower.style.left = `${touch.clientX + offsetX}px`;
    flower.style.top = `${touch.clientY + offsetY}px`;
    flower.style.width = `${size}px`;
    flower.style.height = `${size}px`;

    const colors = ["#a1c2e8", "#d7abd0", "#789bd0"];
    flower.style.color = colors[Math.floor(Math.random() * colors.length)];

    layer.appendChild(flower);

    setTimeout(() => {
      flower.remove();
    }, 1500);
  }, { passive: true });
}



/* ---------- Mulai ---------- */

fillContent();
makeSnow();
makeFlowers();
setupLightbox();
makeCursorTrail();
makeTouchTrail();

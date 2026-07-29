/* =========================================================
   script.js — tương tác nhẹ (vanilla JS, không framework)
   - Menu mobile
   - Scroll-spy làm nổi mục lục
   - Smooth-scroll + đóng menu khi chọn
   - Nút In / xuất PDF
   - Năm bản quyền tự động
   ========================================================= */

(function () {
  "use strict";

  /* ---- Năm bản quyền ---- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Menu mobile ---- */
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");

  function closeMenu() {
    if (!links || !toggle) return;
    links.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") closeMenu();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

  /* ---- Nút In / xuất PDF ---- */
  var printBtn = document.getElementById("printBtn");
  if (printBtn) {
    printBtn.addEventListener("click", function () {
      window.print();
    });
  }

  /* ---- Scroll-spy cho mục lục ---- */
  var tocLinks = Array.prototype.slice.call(
    document.querySelectorAll("#toc a")
  );
  var sections = tocLinks
    .map(function (a) {
      var id = a.getAttribute("href").slice(1);
      return document.getElementById(id);
    })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var setActive = function (id) {
      tocLinks.forEach(function (a) {
        a.classList.toggle("is-active", a.getAttribute("href") === "#" + id);
      });
    };

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach(function (sec) {
      observer.observe(sec);
    });
  }

  /* ---- Scroll reveal cho từng section (chuyển cảnh mượt) ---- */
  var blocks = Array.prototype.slice.call(document.querySelectorAll(".block"));
  if (blocks.length) {
    if ("IntersectionObserver" in window) {
      document.documentElement.classList.add("reveal-ready");
      var revealObs = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("in-view");
              revealObs.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -10% 0px", threshold: 0.06 }
      );
      blocks.forEach(function (b) { revealObs.observe(b); });

      /* Lưới an toàn: bất kỳ block nào đã nằm trong/đi qua viewport
         đều được hiện ngay (tránh ẩn khi deep-link, khôi phục vị trí cuộn,
         hoặc cuộn/nhảy quá nhanh). */
      var safetyReveal = function () {
        var vh = window.innerHeight || document.documentElement.clientHeight;
        blocks.forEach(function (b) {
          if (b.classList.contains("in-view")) return;
          var r = b.getBoundingClientRect();
          if (r.top < vh * 0.92) {
            b.classList.add("in-view");
            revealObs.unobserve(b);
          }
        });
      };
      window.addEventListener("scroll", safetyReveal, { passive: true });
      window.addEventListener("load", safetyReveal);
      window.addEventListener("hashchange", function () {
        setTimeout(safetyReveal, 60);
      });
      setTimeout(safetyReveal, 400);
    }
  }
})();

/* =========================================================
   Hướng dẫn Cổng bồi thường (UCP) — walkthrough tương tác
   - Danh sách bước ⇄ ảnh minh hoạ
   - Điều hướng bằng nút mũi tên, chấm tròn, phím ← →
   - Lightbox phóng to ảnh
   ========================================================= */
(function () {
  "use strict";

  var walk = document.getElementById("walk");
  if (!walk) return;

  var SLIDES = [
    { step: 1, img: "assets/guide/01-email.png",            cap: "Bước 1 · Email thông báo đủ điều kiện bồi thường" },
    { step: 2, img: "assets/guide/02-dang-nhap.png",        cap: "Bước 2 · Màn hình đăng nhập Cổng bồi thường" },
    { step: 2, img: "assets/guide/03-otp.png",              cap: "Bước 2 · Email chứa mã OTP đăng nhập" },
    { step: 3, img: "assets/guide/04-bao-hiem-cua-toi.png", cap: "Bước 3 · Danh sách hợp đồng “Bảo hiểm của tôi”" },
    { step: 4, img: "assets/guide/05-chi-tiet-hop-dong.png",cap: "Bước 4 · Chi tiết hợp đồng và nút “Yêu cầu bồi thường”" },
    { step: 4, img: "assets/guide/06-chon-quyen-loi.png",   cap: "Bước 4 · Chọn quyền lợi bồi thường" },
    { step: 5, img: "assets/guide/07-ho-so-1.png",          cap: "Bước 5 · Hồ sơ yêu cầu bồi thường (màn 1)" },
    { step: 5, img: "assets/guide/08-ho-so-2.png",          cap: "Bước 5 · Hồ sơ yêu cầu bồi thường (màn 2)" },
    { step: 6, img: "assets/guide/09-danh-sach-ho-so.png",  cap: "Bước 6 · Danh sách hồ sơ và trạng thái xử lý" },
    { step: 6, img: "assets/guide/10-chi-tiet-ho-so.png",   cap: "Bước 6 · Chi tiết hồ sơ - đã duyệt, đang chi trả" }
  ];

  var imgEl   = document.getElementById("walkImg");
  var capEl   = document.getElementById("walkCap");
  var dotsEl  = document.getElementById("walkDots");
  var prevBtn = document.getElementById("walkPrev");
  var nextBtn = document.getElementById("walkNext");
  var steps   = Array.prototype.slice.call(walk.querySelectorAll(".walk__step"));
  var idx = 0;

  /* ---- Nạp sẵn ảnh để chuyển mượt ---- */
  SLIDES.forEach(function (s) {
    var pre = new Image();
    pre.src = s.img;
  });

  /* ---- Tạo chấm tròn ---- */
  SLIDES.forEach(function (s, i) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "walk__dot";
    b.setAttribute("aria-label", s.cap);
    b.addEventListener("click", function () { go(i); });
    dotsEl.appendChild(b);
  });
  var dots = Array.prototype.slice.call(dotsEl.children);

  function render() {
    var s = SLIDES[idx];
    imgEl.src = s.img;
    imgEl.alt = "Ảnh minh hoạ - " + s.cap;
    capEl.textContent = s.cap;

    /* khởi động lại hiệu ứng fade */
    imgEl.style.animation = "none";
    void imgEl.offsetWidth;
    imgEl.style.animation = "";

    dots.forEach(function (d, i) {
      d.classList.toggle("is-active", i === idx);
      d.setAttribute("aria-current", i === idx ? "true" : "false");
    });
    steps.forEach(function (st) {
      var on = Number(st.getAttribute("data-step")) === s.step;
      st.classList.toggle("is-active", on);
      st.querySelector(".walk__btn").setAttribute("aria-expanded", on ? "true" : "false");
    });
  }

  function go(i) {
    idx = (i + SLIDES.length) % SLIDES.length;
    render();
  }

  prevBtn.addEventListener("click", function () { go(idx - 1); });
  nextBtn.addEventListener("click", function () { go(idx + 1); });

  /* ---- Bấm vào một bước → nhảy tới ảnh đầu tiên của bước đó ---- */
  steps.forEach(function (st) {
    st.querySelector(".walk__btn").addEventListener("click", function () {
      var n = Number(st.getAttribute("data-step"));
      for (var i = 0; i < SLIDES.length; i++) {
        if (SLIDES[i].step === n) { go(i); break; }
      }
    });
  });

  /* ---- Phím ← → khi vùng hướng dẫn đang hiển thị ---- */
  document.addEventListener("keydown", function (e) {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    if (lbox && !lbox.hidden) return;
    var r = walk.getBoundingClientRect();
    var vh = window.innerHeight || document.documentElement.clientHeight;
    if (r.top > vh * 0.85 || r.bottom < vh * 0.15) return;
    e.preventDefault();
    go(e.key === "ArrowLeft" ? idx - 1 : idx + 1);
  });

  /* ---- Lightbox ---- */
  var lbox      = document.getElementById("lbox");
  var lboxImg   = document.getElementById("lboxImg");
  var lboxClose = document.getElementById("lboxClose");
  var zoomBtn   = document.getElementById("walkZoom");

  function openBox() {
    if (!lbox) return;
    lboxImg.src = imgEl.src;
    lboxImg.alt = imgEl.alt;
    lbox.hidden = false;
    document.body.style.overflow = "hidden";
    lboxClose.focus();
  }
  function closeBox() {
    if (!lbox) return;
    lbox.hidden = true;
    lboxImg.src = "";
    document.body.style.overflow = "";
  }

  if (lbox) {
    imgEl.addEventListener("click", openBox);
    if (zoomBtn) zoomBtn.addEventListener("click", function (e) { e.stopPropagation(); openBox(); });
    lboxClose.addEventListener("click", closeBox);
    lbox.addEventListener("click", function (e) {
      if (e.target === lbox || e.target === lboxImg) closeBox();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !lbox.hidden) closeBox();
    });
  }

  render();
})();

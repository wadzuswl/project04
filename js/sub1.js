document.addEventListener("DOMContentLoaded", () => {
  let overlap = document.getElementById("subPageCon1");
  if (!overlap) return;

  let io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          overlap.classList.add("is-active");
          io.disconnect();
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  io.observe(overlap);
});

document.addEventListener("DOMContentLoaded", () => {
  const tabBtns = document.querySelectorAll(".sub-page-tab-btn");
  const tabBars = document.querySelectorAll(".sub-page-tab-btn-bar");

  const tabContents = [
    document.getElementById("subComCon1"),
    document.getElementById("subComCon2"),
    document.getElementById("subComCon3"),
    document.getElementById("subComCon4"),
  ].filter(Boolean);

  function isValidTabId(id) {
    return tabContents.some((sec) => sec.id === id);
  }

  function activateTab(targetId) {
    if (!targetId || !isValidTabId(targetId)) return;

    tabContents.forEach((sec) => {
      sec.classList.toggle("active", sec.id === targetId);
    });

    tabBars.forEach((bar) => bar.classList.remove("active"));

    tabBtns.forEach((btn) => {
      const isActive = btn.dataset.subTab === targetId;
      btn.classList.toggle("active", isActive);

      const bar = btn.querySelector(".sub-page-tab-btn-bar");
      if (bar) bar.classList.toggle("active", isActive);
    });
  }

  function getHashTabId() {
    return (window.location.hash || "").replace("#", "").trim();
  }

  const initialId = getHashTabId();
  if (initialId && isValidTabId(initialId)) {
    activateTab(initialId);

    document
      .querySelector(".sub-page-tab-menu-wrap")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    activateTab("subComCon1");
  }

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.dataset.subTab;
      if (!targetId || !isValidTabId(targetId)) return;

      history.replaceState(null, "", `#${targetId}`);
      activateTab(targetId);
    });
  });

  window.addEventListener("hashchange", () => {
    const id = getHashTabId();
    if (id && isValidTabId(id)) activateTab(id);
  });
});


let wrap = document.querySelector(".sub1-page2-slide-content-wrap");
let slides = document.querySelectorAll(".sub1-page2-slide-content-box");
let dots = document.querySelectorAll(".slide-pagenation span");

let i = 0;
let lock = false;

wrap.addEventListener("wheel", (e) => {
  e.preventDefault();

  if (lock) return;
  lock = true;

  slides[i].classList.remove("active");
  dots[i].classList.remove("active");

  i += e.deltaY > 0 ? 1 : -1;
  i = Math.max(0, Math.min(slides.length - 1, i));

  slides[i].classList.add("active");
  dots[i].classList.add("active");

  setTimeout(() => {
    lock = false;
  }, 500);
});

let year = document.getElementById("year");
let yearPlayed = false;

function playYearCountUp() {
  if (!year || yearPlayed) return;
  yearPlayed = true;

  let start = 2006;
  let target = 2026;

  year.textContent = start;

  let timer = setInterval(() => {
    start++;
    year.textContent = start;

    if (start >= target) clearInterval(timer);
  }, 100);
}

window.addEventListener("scroll", () => {
  let section = document.getElementById("subComCon3");
  if (!section) return;

  if (!section.classList.contains("active")) return;
  let scrollY = window.scrollY;
  let windowH = window.innerHeight;
  let sectionTop = section.offsetTop;

  if (scrollY + windowH > sectionTop + 1000) {
    playYearCountUp();
  }
});

var subBottomSwiper = new Swiper(".subBottomSlide", {
  pagination: {
    el: ".subBottomSlide-pagenation",
    clickable: true,
  },
  loop: true,
});

AOS.init();
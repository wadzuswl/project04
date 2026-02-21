document.addEventListener("DOMContentLoaded", () => {
  let overlap = document.getElementById("subPageCon");
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
    document.getElementById("subTabCon1"),
    document.getElementById("subTabCon2"),
    document.getElementById("subTabCon3"),
    document.getElementById("subTabCon4"),
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
    activateTab("subTabCon1");
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


document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".sub2-switch-mode").forEach(section => {
    const modes = section.querySelectorAll(".switch-modes .mode");

    const bgImage = section.querySelector("#bgImage");
    const overlay = section.querySelector("#overlay");
    const mainTitle = section.querySelector("#mainTitle");
    const mainText = section.querySelector("#mainText");

    if (!modes.length || !bgImage) return;

    modes.forEach(mode => {
      mode.addEventListener("click", () => {
        modes.forEach(m => m.classList.remove("active"));
        mode.classList.add("active");

        bgImage.src = mode.dataset.bg;

        if (mainTitle) mainTitle.textContent = mode.dataset.title || "";
        if (mainText) mainText.textContent = mode.dataset.text || "";
        if (overlay) overlay.classList.add("show");
      });
    });
  });
});


let wrap = document.querySelector(".sub2-page2-slide-content-wrap");
let slides = document.querySelectorAll(".sub2-page2-slide-content-box");
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

/* switch */
const navItems = document.querySelectorAll(".spec-nav-item");
const mainImage = document.getElementById("spec-main-image");

navItems.forEach(item => {
  item.addEventListener("click", () => {

    navItems.forEach(btn => btn.classList.remove("active"));
    item.classList.add("active");

    mainImage.src = item.dataset.main;
  });
});


/* 주변기기 */
document.addEventListener("DOMContentLoaded", () => {
  const root = document.querySelector("#subTabCon3");
  if (!root) return;

  const heroWraps = root.querySelectorAll(".hero-wrap");
  const bigCards = root.querySelectorAll(".card-wraps > a.card");
  const smCards = root.querySelectorAll(".etc-wrap .sm-card");
  const toggles = [...heroWraps, ...bigCards, ...smCards];


  const canHover = window.matchMedia("(hover: hover)").matches;
  const isCoarse = window.matchMedia("(pointer: coarse)").matches;
  if (canHover && !isCoarse) return;

  const closeAll = (except = null) => {
    toggles.forEach(el => {
      if (el !== except) el.classList.remove("isActive");
    });
  };

  const toggleOne = (el) => {
    const wasActive = el.classList.contains("isActive");
    if (wasActive) {
      el.classList.remove("isActive");
    } else {
      closeAll(el);
      el.classList.add("isActive");
    }
  };


  heroWraps.forEach(hero => {
    hero.addEventListener("click", (e) => {
      toggleOne(hero);
    });
  });


  bigCards.forEach(card => {
    card.addEventListener("click", (e) => {
      const wasActive = card.classList.contains("isActive");

      if (!wasActive) {
        e.preventDefault();
        toggleOne(card);
      } else {
      }
    });
  });


  smCards.forEach(card => {
    card.addEventListener("click", () => {
      toggleOne(card);
    });
  });

  root.addEventListener("click", (e) => {
    const clickedToggle = e.target.closest(".hero-wrap, .card-wraps > a.card, .etc-wrap .sm-card");
    if (!clickedToggle) closeAll();
  });
});


/* 아미보 */
(function () {

  const wrapper = document.getElementById("amiiboLineupWrapper");
  const sliderEl = document.querySelector(".amiibo-lineup-swiper");
  const lightEl = document.querySelector(".sub2-amiibo-page-content .amiibo-lineup-stage .stage-light");

  if (!wrapper || !sliderEl) return;

  let highlightTimer = null;
  const lightHighlight = () => {
    if (!lightEl) return;

    if (highlightTimer) clearTimeout(highlightTimer);

    lightEl.classList.add("highlight");

    highlightTimer = setTimeout(() => {
      lightEl.classList.remove("highlight");
    }, 450);
  };

  const amiiboImages = [
    "./images/index/amiibo-01.png",
    "./images/index/amiibo-02.png",
    "./images/index/amiibo-03.png",
    "./images/index/amiibo-04.png",
    "./images/index/amiibo-05.png",
    "./images/index/amiibo-06.png",
    "./images/index/amiibo-07.png",
    "./images/index/amiibo-08.png",
    "./images/index/amiibo-09.png",
    "./images/index/amiibo-10.png",
    "./images/index/amiibo-11.png",
    "./images/index/amiibo-12.png",
    "./images/index/amiibo-13.png",
    "./images/index/amiibo-14.png",
    "./images/index/amiibo-15.png",
    "./images/index/amiibo-16.png",
    "./images/index/amiibo-17.png",
    "./images/index/amiibo-18.png",
    "./images/index/amiibo-19.png",
    "./images/index/amiibo-20.png"
  ];

  if (wrapper.children.length === 0) {
    const frag = document.createDocumentFragment();

    amiiboImages.forEach((src) => {
      const slide = document.createElement("div");
      slide.className = "swiper-slide";

      const img = document.createElement("img");
      img.src = src;
      img.alt = "amiibo";

      slide.appendChild(img);
      frag.appendChild(slide);
    });

    wrapper.appendChild(frag);
  }

  if (typeof Swiper === "undefined") return;

  const swiper = new Swiper(sliderEl, {
    slidesPerView: 5,
    centeredSlides: true,
    loop: true,
    speed: 800,
    spaceBetween: 24,
    allowTouchMove: false,
    autoplay: {
      delay: 1500,
      disableOnInteraction: false,
    },
    breakpoints: {
      0: { slidesPerView: 1.6, spaceBetween: 12 },
      421: { slidesPerView: 3, spaceBetween: 16 },
      1025: { slidesPerView: 5, spaceBetween: 24 }
    },
    on: {
      slideChangeTransitionEnd() {
        lightHighlight();
      }
    }
  });

})();

window.addEventListener("load", () => {
  AOS.init({
    once: false
  });

  setTimeout(() => {
    AOS.refresh();
  }, 300);
});

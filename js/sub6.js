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



/* FAQ */
document.querySelectorAll(".faq-item-a").forEach(answer => {
  answer.addEventListener("click", function () {
    const details = this.closest(".faq-item");
    if (details && details.hasAttribute("open")) {
      details.removeAttribute("open");
    }
  });
});

/* 스위치2 */
var switchSwiper = new Swiper(".page1-slide", {
  navigation: {
    nextEl: ".page1-next-btn",
    prevEl: ".page1-prev-btn",
  },
  slidesPerView: 1,
  spaceBetween: 0,
  breakpoints: {
    401: {
      slidesPerView: 2.5,
      spaceBetween: 10,
    },
    769: {
      slidesPerView: 2.5,
      spaceBetween: 20,
    },
  },
});

let middleCardBtn = document.querySelectorAll('.middle-card-btn');
let middleClickCard = document.querySelectorAll('.middle-click-card');

middleCardBtn.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    middleClickCard[index].classList.add('active');
  });
});
middleClickCard.forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.remove('active');
  })
})

document.querySelectorAll(".acc-item-desc").forEach(answer => {
  answer.addEventListener("click", function () {
    let details = this.closest(".acc-item");
    if (details && details.hasAttribute("open")) {
      details.removeAttribute("open");
    }
  });
});

let bottomTabBtn = document.querySelectorAll(".bottom-tab-btn");
let bottomTabCon = document.querySelectorAll(".bottom-tab-con");

bottomTabBtn.forEach(function (btn) {
  btn.addEventListener("click", function () {
    bottomTabBtn.forEach(function (b) {
      b.classList.remove('active');
    })
    btn.classList.add('active');

    let target = btn.dataset.bottomCon;
    bottomTabCon.forEach(function (con) {
      con.classList.remove('active');
      if (con.id === target) {
        con.classList.add('active');
      }
    })
  })
})

let startSwiper;

function initMobileSwiper() {
  const container = document.querySelector(".switch-page-content-start");
  if (!container) return;

  const isMobile = window.innerWidth <= 500;

  const wrapper = container.querySelector(".switch-page-swiper");
  const slides = wrapper.querySelectorAll("img");

  if (isMobile && !startSwiper) {
    container.classList.add("swiper");
    wrapper.classList.add("swiper-wrapper");
    slides.forEach(slide => slide.classList.add("swiper-slide"));

    startSwiper = new Swiper(container, {
      slidesPerView: 1,
      spaceBetween: 10,
      pagination: {
        el: ".switch-page-content-start .swiper-pagination",
        clickable: true,
        dynamicBullets: true,
      },
    });

  } else if (!isMobile && startSwiper) {
    startSwiper.destroy(true, true);
    startSwiper = undefined;

    container.classList.remove("swiper");
    wrapper.classList.remove("swiper-wrapper");
    wrapper.removeAttribute("style");

    slides.forEach(slide => {
      slide.classList.remove("swiper-slide");
      slide.removeAttribute("style");
    });
  }
}

initMobileSwiper();

window.addEventListener("resize", () => {
  clearTimeout(window.swiperResizeTimer);
  window.swiperResizeTimer = setTimeout(initMobileSwiper, 300);
});

AOS.init();
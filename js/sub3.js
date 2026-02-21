/* 소프트웨어 */
document.addEventListener("DOMContentLoaded", () => {
  const root = document.querySelector(".top-nintendo-video");
  if (!root) return;

  const video = root.querySelector("video");
  const btn = root.querySelector(".video-pause-btn");
  const btnImg = btn?.querySelector("img");

  if (!video || !btn || !btnImg) return;

  video.muted = true;
  video.playsInline = true;

  function render() {
    btnImg.alt = video.paused ? "재생" : "일시정지";
  }

  render();

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    video.paused ? video.play() : video.pause();
  });

  video.addEventListener("play", render);
  video.addEventListener("pause", render);
});



/* 시리즈 */

(() => {
  let viewport = document.querySelector('.sub-series-viewport');
  let track = document.querySelector('.sub-series-track');

  let btnPrev = document.querySelector('.sub-series-control-btn-prev');
  let btnNext = document.querySelector('.sub-series-control-btn-next');

  let pageCurrent = document.querySelector('.sub-series-page-current');
  let pageTotal = document.querySelector('.sub-series-page-total');

  let leftPanels = Array.from(document.querySelectorAll('.sub-series-left'));
  let numbers = Array.from(document.querySelectorAll('.sub-series-number'));
  let originalSlides = Array.from(track.children);
  let total = originalSlides.length;

  pageTotal.textContent = String(total).padStart(2, '0');

  let firstClone = originalSlides[0].cloneNode(true);
  let lastClone = originalSlides[total - 1].cloneNode(true);

  firstClone.dataset.clone = 'first';
  lastClone.dataset.clone = 'last';

  track.prepend(lastClone);
  track.append(firstClone);

  let slides = Array.from(track.children);

  function getGap(e) {
    let gap = getComputedStyle(e).gap;
    let value = parseFloat(gap);
    return Number.isFinite(value) ? value : 0;
  }

  function getStep() {
    let slideWidth = slides[0].getBoundingClientRect().width;
    let gap = getGap(track);
    return slideWidth + gap;
  }

  let currentIndex = 0;
  let trackIndex = 1;
  let TransitionMs = 500;

  function setTransition(on) {
    track.style.transition = on ? `transform ${TransitionMs}ms ease-in-out` : 'none';
  }

  function updateActiveUI() {
    pageCurrent.textContent = String(currentIndex + 1).padStart(2, '0');

    slides.forEach((e) => e.classList.remove('active'));
    if (slides[trackIndex]) {
      slides[trackIndex].classList.add('active');
    }

    leftPanels.forEach((e, idx) => {
      if (idx === currentIndex) {
        e.classList.add('active');
      } else {
        e.classList.remove('active');
      }
    });

    numbers.forEach((e, idx) => {
      if (idx === currentIndex) {
        e.classList.add('active');
      } else {
        e.classList.remove('active');
      }
    });
  }
  let BpTablet = 1025;
  let BpMobile = 421;

  function getAlignOffset() {
    if (window.innerWidth > BpTablet) return 0;

    let viewportW = viewport.getBoundingClientRect().width;
    let slideW = slides[0].getBoundingClientRect().width;
    return (viewportW - slideW) / 2;
  }

  function moveWithAnimation(nextTrackIndex) {
    trackIndex = nextTrackIndex;

    setTransition(true);
    let x = getAlignOffset() - (trackIndex * getStep());
    track.style.transform = `translateX(${x}px)`;
  }

  function moveWithoutAnimation(nextTrackIndex) {
    trackIndex = nextTrackIndex;

    setTransition(false);
    let x = getAlignOffset() - (trackIndex * getStep());
    track.style.transform = `translateX(${x}px)`;
  }
  moveWithoutAnimation(1);
  updateActiveUI();

  function syncByCurrentIndex() {
    moveWithAnimation(currentIndex + 1);
    updateActiveUI();
  }


  function next() {
    currentIndex += 1;

    if (currentIndex >= total) {
      currentIndex = 0;

      moveWithAnimation(total + 1);
      updateActiveUI();

      window.setTimeout(() => {
        moveWithoutAnimation(1);
        updateActiveUI();
      }, TransitionMs);

      return;
    }

    syncByCurrentIndex();
  }

  function prev() {
    currentIndex -= 1;

    if (currentIndex < 0) {
      currentIndex = total - 1;

      moveWithAnimation(0);
      updateActiveUI();

      window.setTimeout(() => {
        moveWithoutAnimation(total);
        updateActiveUI();
      }, TransitionMs);

      return;
    }

    syncByCurrentIndex();
  }

  btnNext.addEventListener('click', next);
  btnPrev.addEventListener('click', prev);
  let startX = 0;
  let isSwiping = false;

  function getThreshold() {
    const slideWidth = slides[0].getBoundingClientRect().width;
    return Math.max(80, slideWidth * 0.15);
  }

  viewport.addEventListener('touchstart', (e) => {
    if (!e.touches || e.touches.length !== 1) return;
    isSwiping = true;
    startX = e.touches[0].clientX;
  }, { passive: true });

  viewport.addEventListener('touchend', (e) => {
    if (!isSwiping) return;
    isSwiping = false;

    let endX = (e.changedTouches && e.changedTouches[0]) ? e.changedTouches[0].clientX : startX;
    let deltaX = endX - startX;
    let threshold = getThreshold();

    if (Math.abs(deltaX) < threshold) return;

    if (deltaX < 0) next();
    else prev();
  }, { passive: true });

  let startMouseX = 0;
  let isDragging = false;

  let didDrag = false;

  viewport.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return;

    isDragging = true;
    didDrag = false;
    startMouseX = e.clientX;

    e.preventDefault();

    viewport.style.userSelect = 'none';
    viewport.style.cursor = 'grabbing';
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    if (Math.abs(e.clientX - startMouseX) > 3) didDrag = true;
  });

  window.addEventListener('mouseup', (e) => {
    if (!isDragging) return;
    isDragging = false;

    viewport.style.userSelect = '';
    viewport.style.cursor = '';

    const endMouseX = e.clientX;
    const deltaX = endMouseX - startMouseX;
    const threshold = getThreshold();

    if (Math.abs(deltaX) < threshold) return;

    if (deltaX < 0) next();
    else prev();
  });

  viewport.addEventListener('click', (e) => {
    if (!didDrag) return;
    e.preventDefault();
    e.stopPropagation();
    didDrag = false;
  }, true);


  window.addEventListener('resize', () => {
    setTransition(false);
    slides = Array.from(track.children);

    moveWithoutAnimation(trackIndex);

    updateActiveUI();
  });
  let subSeries = document.getElementById('subSeries');
  let overLayIcon = document.querySelector('.sub-series-slide-notice');

  let hasShown = false;

  window.addEventListener('scroll', () => {
    if (hasShown) return;

    let rect = subSeries.getBoundingClientRect();
    let windowHeight = window.innerHeight;

    let isInView = rect.top < windowHeight * 0.7 && rect.bottom > 0;

    if (isInView) {
      hasShown = true;
      overLayIcon.style.display = 'flex';

      setTimeout(() => {
        overLayIcon.style.display = 'none';
      }, 3000);
    }
  });
})();


/* 캐릭터 */
const nameImg = document.querySelector('.sub-character-name-img');
const descBox = document.querySelector('.sub-character-desc');
const SubcharacterMoreBtn = document.querySelector('.sub-character-more-btn');


var rightSwiper = new Swiper(".right-Swiper", {
  slidesPerView: "auto",
  spaceBetween: 20,
  watchSlidesProgress: true,
  slideToClickedSlide: true,
  freeMode: false,


  on: {
    init: function () {
      SubcharacterMoreBtn.style.display = "none";
    },
    click: function () {
      let lastIndex = this.slides.length - 1;
      let clickIndex = this.clickedIndex;
      if (clickIndex === lastIndex) {
        SubcharacterMoreBtn.style.display = "block";
      } else {
        SubcharacterMoreBtn.style.display = "none";
      }
    },
  },


  breakpoints: {
    0: {
      slidesPerView: "auto",
      spaceBetween: 10,
    },
    400: {
      slidesPerView: "auto",
      spaceBetween: 25,
    },
    769: {
      slidesPerView: "auto",
      spaceBetween: 20,
    },
  },
});


var leftSwiper = new Swiper(".left-Swiper", {
  slidesPerView: 1,
  spaceBetween: 10,
  thumbs: {
    swiper: rightSwiper,
  },
});


rightSwiper.on('click', function () {
  const slide = this.clickedSlide;
  if (!slide) return;

  const desc = slide.dataset.desc;
  const nameImage = slide.dataset.nameimg;

  descBox.innerHTML = `<p>${desc}</p>`;

  nameImg.src = nameImage;
});




/* 뉴스 */
var swiper = new Swiper('.sub-news-tablet', {
  slidesPerView: 'auto',
  centeredSlides: true,
  spaceBetween: 0,
  initialSlide: 1,
  loop: false,
  watchSlidesProgress: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 0,
    },
    570: {
      slidesPerView: 'auto',
      spaceBetween: 0,
    }
  }

});
let isDragging = false;

document.querySelectorAll('.sub-news-card').forEach(card => {
  card.addEventListener('mousedown', () => isDragging = false);
  card.addEventListener('mousemove', () => isDragging = true);
  card.addEventListener('mouseup', () => {
    if (!isDragging) {
      window.location.href = card.dataset.link;
    }
  });

  // 모바일
  card.addEventListener('touchstart', () => isDragging = false);
  card.addEventListener('touchmove', () => isDragging = true);
  card.addEventListener('touchend', () => {
    if (!isDragging) {
      window.location.href = card.dataset.link;
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {

  const sections = document.querySelectorAll("section");

  let current = 0;
  let isScrolling = false;

  const isDesktop = () => window.innerWidth > 1024;

  function moveSection(index) {
    if (!isDesktop()) return;

    if (index < 0 || index >= sections.length) return;

    isScrolling = true;
    current = index;

    sections[index].scrollIntoView({
      behavior: "smooth"
    });

    setTimeout(() => {
      isScrolling = false;
    }, 900);
  }

  const stopSections = document.querySelectorAll(
    ".sub-character, .sub-series"
  );

  function isInsideStopSection() {
    let inside = false;

    stopSections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
        inside = true;
      }
    });

    return inside;
  }

  window.addEventListener("wheel", (e) => {

    if (!isDesktop()) return;
    if (isScrolling) return;
    if (isInsideStopSection()) return;

    if (e.deltaY > 0) {
      moveSection(current + 1);
    } else {
      moveSection(current - 1);
    }
  });

  window.addEventListener("keydown", (e) => {

    if (!isDesktop()) return;
    if (isScrolling) return;

    if (e.key === "ArrowDown") moveSection(current + 1);
    if (e.key === "ArrowUp") moveSection(current - 1);
  });

  window.addEventListener("resize", () => {
    if (!isDesktop()) {
      isScrolling = false;
    }
  });

});
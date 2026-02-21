AOS.init();

document.addEventListener("DOMContentLoaded", () => {

  /* 메인비주얼 */
  function playActiveSlideAnimation(swiper) {
    let activeSlide = swiper.el.querySelector('.swiper-slide-active');
    if (!activeSlide) return;

    let logo = activeSlide.querySelector('.main-mv-swiper-logo');
    let char = activeSlide.querySelector('.main-mv-swiper-char');
    let char1 = activeSlide.querySelector('.main-mv-swiper-char1');
    let char2 = activeSlide.querySelector('.main-mv-swiper-char2');

    if (logo) {
      logo.classList.remove('active');
      void logo.offsetWidth;
      logo.classList.add('active');
    }
    if (char) {
      char.classList.remove('active');
      void char.offsetWidth;
      char.classList.add('active');
    }
    if (char1) {
      char1.classList.remove('active');
      void char1.offsetWidth;
      char1.classList.add('active');
    }
    if (char2) {
      char2.classList.remove('active');
      void char2.offsetWidth;
      char2.classList.add('active');
    }
  }

  let mainVisualSwiper = null;

  if (document.querySelector(".main-mv-swiper")) {
    mainVisualSwiper = new Swiper(".main-mv-swiper", {
      pagination: {
        el: ".main-mv-swiper-pagination",
        clickable: true,
      },
      autoplay: {
        delay: 5000,
      },
      loop: true,
      on: {
        init() {
          playActiveSlideAnimation(this);
        },
        slideChangeTransitionStart() {
          playActiveSlideAnimation(this);
        },
      },
    });
  }

  let stopBtn = document.querySelector('.main-mv-swiper-pagination-stop');
  if (stopBtn) {
    let icon = stopBtn.querySelector('i');
    let paginationWrap = document.querySelector('.main-mv-swiper-pagination-wrap');
    let isPlaying = true;

    stopBtn.addEventListener('click', () => {
      if (!mainVisualSwiper) return;

      if (isPlaying) {
        mainVisualSwiper.autoplay.stop();
        icon.classList.replace('fa-pause', 'fa-play');
        paginationWrap?.classList.add('paused');
      } else {
        mainVisualSwiper.autoplay.start();
        icon.classList.replace('fa-play', 'fa-pause');
        paginationWrap?.classList.remove('paused');
      }
      isPlaying = !isPlaying;
    });
  }

  /* 소프트웨어 */
  const softwareVideo = document.querySelector(".software-video");
  const softwareNoImg = document.querySelector(".software-no img");

  if (softwareVideo && document.querySelector(".main-software-swiper-wrap")) {
    const softwareSwiper = new Swiper(".main-software-swiper-wrap", {
      direction: "vertical",
      slidesPerView: 2,
      centeredSlides: true,
      gap: "-20px",
      loop: true,
      speed: 800,
      autoplay: {
        delay: 7500,
        disableOnInteraction: false
      },
      on: {
        init(swiper) {
          changeVideo(swiper);
        },
        slideChange(swiper) {
          changeVideo(swiper);
        }
      }
    });

    function changeVideo(swiper) {
      const activeSlide = swiper.slides[swiper.activeIndex];
      if (!activeSlide) return;

      const videoSrc = activeSlide.dataset.video;
      const noSrc = activeSlide.dataset.no;

      if (videoSrc) {
        softwareVideo.pause();
        softwareVideo.src = videoSrc;
        softwareVideo.load();
        softwareVideo.play().catch(() => { });
      }

      if (noSrc && softwareNoImg) {
        softwareNoImg.src = noSrc;
      }
    }
  }

  /* 소프트웨어 모바일 */
  const mbVideo = document.querySelector(".software-mb-video");
  const mbButtons = document.querySelectorAll(".software-btn-box button");

  if (mbVideo && mbButtons.length) {
    mbButtons.forEach((btn, index) => {
      if (index === 0) {
        btn.classList.add("active");
        const firstVideo = btn.dataset.video;
        if (firstVideo) {
          mbVideo.src = firstVideo;
          mbVideo.play().catch(() => { });
        }
      }

      btn.addEventListener("click", () => {
        mbButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const videoSrc = btn.dataset.video;
        if (videoSrc) {
          mbVideo.pause();
          mbVideo.src = videoSrc;
          mbVideo.load();
          mbVideo.play().catch(() => { });
        }
      });
    });
  }

  /* 캐릭터 */
  const section = document.querySelector('.character');
  const track = document.querySelector('.horizontal-track');
  const figures = track.querySelectorAll('figure');

  let index = 0;
  let currentX = 0;
  let targetX = 0;
  let ease = 0.08;
  let isPC = window.innerWidth > 1024;
  let characterSwiper = null;

  const total = figures.length;

  window.addEventListener(
    'wheel',
    (e) => {

      if (!isPC) return;

      const rect = section.getBoundingClientRect();
      const inView = rect.top <= 0 && rect.bottom >= window.innerHeight;

      if (!inView) return;

      if (e.deltaY > 0 && index < total - 1) {
        e.preventDefault();
        index++;
      }

      if (e.deltaY < 0 && index > 0) {
        e.preventDefault();
        index--;
      }

      targetX = index * window.innerWidth;
    },
    { passive: false }
  );

  function animate() {
    currentX += (targetX - currentX) * ease;
    track.style.transform = `translateX(${-currentX}px)`;
    requestAnimationFrame(animate);
  }

  animate();


  /* 캐릭터 모바일 */
  function initSwiper() {

    if (characterSwiper) return;

    characterSwiper = new Swiper('.character-swiper', {
      slidesPerView: 1,
      centeredSlides: true,
      speed: 800,
      spaceBetween: 20,

      pagination: {
        el: '.pagination',
        clickable: true,

        renderBullet: function (index, className) {

          const slide = this.slides[index];
          const icon = slide.dataset.icon;

          return `<button class="${className}" data-icon="${icon}"></button>`;
        },
      },


      on: {
        init: function () {
          updateActiveBullet(this);
        },
        slideChange: function () {
          updateActiveBullet(this);
        }
      }
    });
  }

  function updateActiveBullet(swiper) {

    const bullets = swiper.pagination.bullets;

    bullets.forEach((bullet, i) => {

      bullet.innerHTML = '';

      if (i === swiper.activeIndex) {
        const icon = bullet.dataset.icon;
        bullet.innerHTML = `<img src="${icon}" alt="">`;
      }
    });
  }

  initSwiper();

  function destroySwiper() {
    if (!characterSwiper) return;

    characterSwiper.destroy(true, true);
    characterSwiper = null;
  }

  function checkResponsive() {

    isPC = window.innerWidth > 1024;

    if (isPC) {
      destroySwiper();

      index = 0;
      currentX = 0;
      targetX = 0;

      if (track) {
        track.style.transform = 'translateX(0)';
      }

    } else {
      initSwiper();
    }
  }

  window.addEventListener('resize', checkResponsive);
  checkResponsive();

  /* 뉴스 */
  let newsCards = document.querySelectorAll('.news-card');
  let newsContents = document.querySelectorAll('.news-content');
  let newsDetail = document.querySelector('.news-detail');
  let newsProgressBar = document.querySelector('.news-progress-bar');

  if (newsCards.length && newsContents.length && newsDetail && newsProgressBar) {
    newsCards.forEach(function (card) {
      card.addEventListener('click', function () {
        newsCards.forEach(item => item.classList.remove('active'));
        card.classList.add('active');

        newsContents.forEach(item => item.classList.remove('active'));

        let target = card.dataset.news;
        let targetContent = document.querySelector(`.news-content[data-news="${target}"]`);
        targetContent && targetContent.classList.add('active');
      });
    });

    newsDetail.addEventListener('scroll', function () {
      let scrollLeft = newsDetail.scrollLeft;
      let scrollWidth = newsDetail.scrollWidth - newsDetail.clientWidth;
      let progress = (scrollLeft / scrollWidth) * 100;
      newsProgressBar.style.width = progress + '%';
    });
  }

});



/* 비디오 */

document.addEventListener("DOMContentLoaded", () => {
  const leftWrapper = document.querySelector(".main-video-left");
  const leftImg = document.getElementById("main-left-img");
  const swiperEl = document.querySelector(".main-video-swiper");

  if (!leftWrapper || !leftImg || !swiperEl) return;

  const slideEls = swiperEl.querySelectorAll(".swiper-slide");
  if (!slideEls.length) return;

  leftWrapper.style.position = "relative";

  const videoIframe = document.createElement("iframe");
  videoIframe.setAttribute("allow", "autoplay; encrypted-media");
  videoIframe.style.border = "none";
  videoIframe.style.borderRadius = "16px";
  videoIframe.style.width = "100%";
  videoIframe.style.height = "491px";
  videoIframe.style.position = "absolute";
  videoIframe.style.top = "0";
  videoIframe.style.left = "0";
  videoIframe.style.zIndex = "1";
  videoIframe.style.opacity = "0";
  videoIframe.style.transition = "opacity 0.3s ease";
  videoIframe.style.pointerEvents = "none";

  leftImg.parentNode.insertBefore(videoIframe, leftImg.nextSibling);

  const swiper = new Swiper(".main-video-swiper", {
    slidesPerView: 4,
    spaceBetween: 20,
    loop: true,
    navigation: {
      nextEl: ".button-next",
      prevEl: ".button-prev"
    },
    on: {
      init() {
        const activeSlide = this.slides?.[this.activeIndex];
        if (!activeSlide) return;

        leftImg.src = activeSlide.getAttribute("data-img") || leftImg.src;

        const textEl = document.querySelector(".video-text");
        if (textEl) textEl.textContent = activeSlide.getAttribute("data-text") || "";

        videoIframe.style.opacity = 0;
        videoIframe.src = "";
      },

      slideChange() {
        const activeSlide = this.slides?.[this.activeIndex];
        if (!activeSlide) return;

        setTimeout(() => {
          const img = activeSlide.getAttribute("data-img");
          if (img) leftImg.src = img;
          leftImg.style.opacity = 1;
        }, 150);

        const textEl = document.querySelector(".video-text");
        if (textEl) textEl.textContent = activeSlide.getAttribute("data-text") || "";

        videoIframe.style.opacity = 0;

        const videoUrl = activeSlide.getAttribute("data-video");
        if (videoUrl && videoUrl.includes("youtube.com/watch")) {
          const videoId = videoUrl.split("v=")[1]?.split("&")[0];
          videoIframe.src = videoId
            ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0&modestbranding=1`
            : "";
        } else {
          videoIframe.src = "";
        }
      }
    }
  });

  leftImg.addEventListener("click", () => {
    const activeSlide = swiper.slides?.[swiper.activeIndex];
    if (!activeSlide) return;

    const link = activeSlide.getAttribute("data-link");
    if (link) window.location.href = link;
  });

  swiperEl.querySelectorAll(".swiper-slide").forEach(slide => {
    slide.addEventListener("click", () => {
      const imgSrc = slide.getAttribute("data-img");
      if (imgSrc) leftImg.src = imgSrc;

      const text = slide.getAttribute("data-text");
      const textEl = document.querySelector(".video-text");
      if (textEl) textEl.textContent = text || "";

      const videoUrl = slide.getAttribute("data-video");
      if (videoUrl && videoUrl.includes("youtube.com/watch")) {
        const videoId = videoUrl.split("v=")[1]?.split("&")[0];
        videoIframe.src = videoId
          ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0&modestbranding=1`
          : "";
      } else {
        videoIframe.src = "";
      }

      leftImg.style.opacity = 1;
      videoIframe.style.opacity = 0;
    });
  });

  leftImg.addEventListener("mouseenter", () => {
    leftImg.style.opacity = 0;
    videoIframe.style.opacity = 1;
  });

  leftImg.addEventListener("mouseleave", () => {
    leftImg.style.opacity = 1;
    videoIframe.style.opacity = 0;
  });

  function setIframeHeight() {
    videoIframe.style.height = window.innerWidth <= 768 ? "365px" : "491px";
  }
  setIframeHeight();
  window.addEventListener("resize", setIframeHeight);
});



/* 아미보 */
document.addEventListener("DOMContentLoaded", () => {
  const amiiboImages = [
    "./images/index/amiibo-01.png", "./images/index/amiibo-02.png", "./images/index/amiibo-03.png", "./images/index/amiibo-04.png", "./images/index/amiibo-05.png",
    "./images/index/amiibo-06.png", "./images/index/amiibo-07.png", "./images/index/amiibo-08.png", "./images/index/amiibo-09.png", "./images/index/amiibo-10.png",
    "./images/index/amiibo-11.png", "./images/index/amiibo-12.png", "./images/index/amiibo-13.png", "./images/index/amiibo-14.png", "./images/index/amiibo-15.png",
    "./images/index/amiibo-16.png", "./images/index/amiibo-17.png", "./images/index/amiibo-18.png", "./images/index/amiibo-19.png", "./images/index/amiibo-20.png"
  ];

  const isMobile = () => window.matchMedia("(max-width: 1024px)").matches;

  const wrapper = document.getElementById("amiiboWrapper");
  const sliderEl = document.querySelector(".character-slider");
  const amiiboSection = document.querySelector(".main-section.amiibo");
  const curtainEl = document.getElementById("amiiboCurtain");
  const lightEl = document.querySelector(".stage-light");

  let highlightTimer = null;
  const lightHighlight = () => {
    if (!isMobile()) return;
    if (!lightEl) return;

    if (highlightTimer) {
      clearTimeout(highlightTimer);
      highlightTimer = null;
    }

    lightEl.classList.add("highlight");

    highlightTimer = setTimeout(() => {
      lightEl.classList.remove("highlight");
    }, 450);
  };

  if (wrapper) {
    amiiboImages.forEach((file) => {
      const slide = document.createElement("div");
      slide.className = "swiper-slide";

      const img = document.createElement("img");
      img.src = file;
      img.alt = "아미보 이미지";

      slide.appendChild(img);
      wrapper.appendChild(slide);
    });
  }

  let swiper = null;
  if (sliderEl) {
    swiper = new Swiper(".character-slider", {
      slidesPerView: 5,
      centeredSlides: true,
      loop: true,
      speed: 800,
      spaceBetween: 24,
      autoplay: {
        delay: 1500,
        disableOnInteraction: false,
      },
      breakpoints: {
        0: { slidesPerView: 1, spaceBetween: 12 },
        421: { slidesPerView: 3, spaceBetween: 16 },
        1025: { slidesPerView: 5, spaceBetween: 24 }
      },
      on: {
        slideChangeTransitionEnd() {
          lightHighlight();
        }
      }
    });

    sliderEl.addEventListener("mouseenter", () => swiper?.autoplay?.stop());
    sliderEl.addEventListener("mouseleave", () => swiper?.autoplay?.start());
  }

  document.querySelectorAll(".amiibo-card").forEach((card) => {
    const toggle = card.querySelector(".amiibo-toggle");
    if (!toggle) return;

    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      card.classList.toggle("active");
    });
  });

  if (amiiboSection && curtainEl) {

    if (isMobile()) {
      amiiboSection.classList.add("is-closed");
    }

    const openAmiibo = () => {
      if (!isMobile()) return;

      amiiboSection.classList.remove("is-closed");
      amiiboSection.classList.add("is-open");
    };

    const closeAmiibo = () => {
      amiiboSection.classList.remove("is-open");
      amiiboSection.classList.add("is-closed");
    };

    curtainEl.addEventListener("click", openAmiibo);

    let prevMobile = isMobile();

    window.addEventListener("resize", () => {
      const nowMobile = isMobile();

      if (!nowMobile) {
        amiiboSection.classList.remove("is-closed");
        amiiboSection.classList.add("is-open");
      }

      if (prevMobile !== nowMobile && nowMobile) {
        closeAmiibo();
      }

      prevMobile = nowMobile;
    });
  }
});
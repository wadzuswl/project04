// 데스크탑 헤더 js
(() => {
  let mainMenus = document.querySelectorAll('.main-menu');
  let subMenus = document.querySelectorAll('.sub-nav-container');
  let header = document.querySelector('.header');

  mainMenus.forEach(function (menu) {
    menu.addEventListener('click', function () {
      if (menu.classList.contains('active')) {
        mainMenus.forEach(m => m.classList.remove('active'));
        subMenus.forEach(sub => sub.classList.remove('active'));
        let isSubPage = document.body.classList.contains('page-sub');
        if (isSubPage) {
          header.classList.remove('active');
        } else {
          if (window.scrollY === 0) header.classList.remove('active');
          else header.classList.add('active');
        }

        return;
      }

      mainMenus.forEach(function (m) {
        m.classList.remove('active');
      });
      menu.classList.add('active');

      let navId = menu.dataset.nav;
      subMenus.forEach(function (sub) {
        if (navId === sub.id) {
          sub.classList.add('active');
        } else {
          sub.classList.remove('active');
        }
      });

      if (menu.classList.contains('active')) {
        header.classList.add('active');
      } else {
        header.classList.remove('active');
      }
    });
  });

  function closeDesktopSubNav() {
    mainMenus.forEach(m => m.classList.remove('active'));
    subMenus.forEach(sub => sub.classList.remove('active'));

    let isSubPage = document.body.classList.contains('page-sub');
    if (isSubPage) {
      header.classList.remove('active');
    } else {
      if (window.scrollY === 0) header.classList.remove('active');
      else header.classList.add('active');
    }
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) closeDesktopSubNav();
  });
})();

// 서브 페이지에서는 상단에서만 헤더 보이게
(() => {
  let header = document.querySelector('.header');
  if (!header) return;

  let isSubPage = document.body.classList.contains('page-sub');
  if (!isSubPage) return;

  function headerByScroll() {
    let isTop = window.scrollY === 0;
    let isHeaderActive = header.classList.contains('active');

    if (isHeaderActive) {
      header.classList.remove('is-hidden');
      return;
    }

    if (isTop) {
      header.classList.remove('is-hidden');
    } else {
      header.classList.add('is-hidden');
    }
  }
  headerByScroll();

  window.addEventListener('scroll', headerByScroll, { passive: true });
})();

// 메인 페이지에서는 기본 내비 스타일
(() => {
  let header = document.querySelector('.header');
  if (!header) return;

  const isSubPage = document.body.classList.contains('page-sub');
  // 서브 페이지면 return
  if (isSubPage) return;

  function handleMainHeader() {
    if (window.scrollY > 0) {
      header.classList.add('active');
    } else {
      header.classList.remove('active');
    }
  }

  handleMainHeader();

  window.addEventListener('scroll', handleMainHeader, { passive: true });
})();

// 소프트웨어 캐릭터 페이지 닌텐도 보이기 시작하면 소프트웨어 캐릭터 페이지 뜨게
(() => {
  let reachSection = document.getElementById('subSw');
  let subHeader = document.querySelector('.sub-header');
  if (!reachSection || !subHeader) return;

  let getSectionTop = () =>
    reachSection.getBoundingClientRect().top + window.scrollY;

  let update = () => {
    let sectionTop = getSectionTop();

    let viewportBottom = window.scrollY + window.innerHeight;

    let hasShownAtLeast1px = viewportBottom > sectionTop;

    if (hasShownAtLeast1px) subHeader.classList.add('active');
    else subHeader.classList.remove('active');
  };

  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
})();

// 태블릿 모바일 내비 js
(() => {
  let hamburgerBtn = document.querySelector('.r-nav-hamburger-btn');
  let xCloseBtn = document.querySelector('.r-nav-container-close');
  let responsiveNavContainer = document.querySelector('.responsive-nav-container');
  hamburgerBtn.addEventListener('click', function () {
    responsiveNavContainer.classList.toggle('active');
    hamburgerBtn.classList.toggle('active');
  })
  xCloseBtn.addEventListener('click', function () {
    responsiveNavContainer.classList.remove('active');
    hamburgerBtn.classList.remove('active');
  })

  // 서브 내비 탭 메뉴 누르면 해당하는 패널 나오기
  let rNavTabBtn = document.querySelectorAll('.r-nav-tab-btn');
  let rNavLnbWrap = document.querySelectorAll('.r-nav-lnb-wrap');
  let rNavConWrap = document.querySelector('.r-nav-content-wrap');

  rNavTabBtn.forEach(function (tab) {
    tab.addEventListener('click', function () {
      rNavTabBtn.forEach((e) => { e.classList.remove('active'); })
      tab.classList.add('active');
      let targetRnav = tab.dataset.rnav;
      rNavLnbWrap.forEach(function (panel) {
        panel.classList.remove('active');
        if (panel.id === targetRnav) {
          panel.classList.add('active');
        }
      })
      rNavConWrap.classList.add('active');
    })
  })
  // 태블릿 너비값에서만 보이게
  window.addEventListener('resize', function () {
    if (window.innerWidth > 768) {
      responsiveNavContainer.classList.remove('active');
      hamburgerBtn.classList.remove('active');
    }
  });
})();


// 탑버튼
const topBtn = document.getElementById('topBtn');
const mainVisual = document.getElementById('mainVisual');
const mainPageMv = document.querySelector('.main-page-main-visual');
const tabMenu = document.querySelector('.sub-page-tab-menu');
const videoPage = document.querySelector('.video-new-game');
const newsPage = document.querySelector('.news-tabs');

window.addEventListener('scroll', () => {
  const triggerPoint = mainVisual.offsetHeight;

  if (window.scrollY > triggerPoint) {
    topBtn.classList.add('active');
  } else {
    topBtn.classList.remove('active');
  }
});

window.addEventListener('scroll', () => {
  const mainTriggerPoint = mainPageMv.offsetHeight;

  if (window.scrollY > mainTriggerPoint) {
    topBtn.classList.add('active');
  } else {
    topBtn.classList.remove('active');
  }
});

window.addEventListener('scroll', () => {
  const subTriggerPoint = tabMenu.offsetHeight;

  if (window.scrollY > subTriggerPoint) {
    topBtn.classList.add('active');
  } else {
    topBtn.classList.remove('active');
  }
});

window.addEventListener('scroll', () => {
  const videoTriggerPoint = videoPage.offsetHeight;

  if (window.scrollY > videoTriggerPoint) {
    topBtn.classList.add('active');
  } else {
    topBtn.classList.remove('active');
  }
});

window.addEventListener('scroll', () => {
  const newsTriggerPoint = newsPage.offsetHeight;

  if (window.scrollY > newsTriggerPoint) {
    topBtn.classList.add('active');
  } else {
    topBtn.classList.remove('active');
  }
});

topBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
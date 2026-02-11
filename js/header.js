// 데스크탑 헤더 js
(() => {
  // 메인 메뉴 클릭하면 서브 메뉴 열리게
  let mainMenus = document.querySelectorAll('.main-menu');
  let subMenus = document.querySelectorAll('.sub-nav-container');
  let header = document.querySelector('.header');

  mainMenus.forEach(function (menu) {
    menu.addEventListener('click', function () {
      // active가 있는지 확인
      if (menu.classList.contains('active')) {
        mainMenus.forEach(m => m.classList.remove('active'));
        subMenus.forEach(sub => sub.classList.remove('active'));
        let isSubPage = document.body.classList.contains('page-sub');
        // 서브 페이지에서는 원래 의도대로
        if (isSubPage) {
          header.classList.remove('active');
        } else {
          // 메인 페이지 다시 클릭할 때 active 안 풀리게
          if (window.scrollY === 0) header.classList.remove('active');
          else header.classList.add('active');
        }

        return;
      }

      // 전체 active 초기화
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

      // 클릭하면 헤더 active 추가
      if (menu.classList.contains('active')) {
        header.classList.add('active');
      } else {
        header.classList.remove('active');
      }
    });
  });

  // 데스크탑에서는 열려 있어도 내비 닫히게
  function closeDesktopSubNav() {
    mainMenus.forEach(m => m.classList.remove('active'));
    subMenus.forEach(sub => sub.classList.remove('active'));

    // 서브 페이지 안에서
    let isSubPage = document.body.classList.contains('page-sub');
    if (isSubPage) {
      header.classList.remove('active');
    } else {
      // 메인 페이지 안에서 상단에 헤더 색 변화 규칙 유지하기
      if (window.scrollY === 0) header.classList.remove('active');
      else header.classList.add('active');
    }
  }

  window.addEventListener('resize', () => {
    // 태블릿부터는 내비 닫기
    if (window.innerWidth <= 768) closeDesktopSubNav();
  });
})();

// 서브 페이지에서는 상단에서만 헤더 보이게
(() => {
  let header = document.querySelector('.header');
  // 헤더 요소 없으면 실행하지 말고 return
  if (!header) return;

  // 서브 페이지에서만 동작
  let isSubPage = document.body.classList.contains('page-sub');
  // 서브 페이지가 아니면 실행하지 말고 return
  if (!isSubPage) return;

  function headerByScroll() {
    // 맨 위
    let isTop = window.scrollY === 0;
    // 헤더에 active 포함된 상태
    let isHeaderActive = header.classList.contains('active');

    // 메뉴가 열려 있으면 항상 보여주기
    if (isHeaderActive) {
      header.classList.remove('is-hidden');
      return;
    }

    // 상단에 있을 때 보이고 스크롤하면 숨기기
    if (isTop) {
      header.classList.remove('is-hidden');
    } else {
      header.classList.add('is-hidden');
    }
  }
  headerByScroll();

  // 스크롤할 때마다 다시 계산
  // { passive: true } >> 기본 동작 막지 않겠다
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

    // 위에서 얼마 + 뷰포트 기준 => 하단 위치 1px라도 보이면 켜지게
    let viewportBottom = window.scrollY + window.innerHeight;

    // 1px라도 보이는지 안보이는지
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
  // 햄버거 버튼 클릭하면 내비 메뉴 창 등장
  // x 버튼 누르면 닫히게
  let hamburgerBtn = document.querySelector('.r-nav-hamburger-btn');
  let xCloseBtn = document.querySelector('.r-nav-container-close');
  let responsiveNavContainer = document.querySelector('.responsive-nav-container');
  // console.log(hamburgerBtn, xCloseBtn, responsiveNavContainer);
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
  // console.log(rNavTabBtn, rNavLnbWrap);
  // console.log(rNavConWrap);
  rNavTabBtn.forEach(function (tab) {
    tab.addEventListener('click', function () {
      // 탭 전체 초기화
      rNavTabBtn.forEach((e) => { e.classList.remove('active'); })
      tab.classList.add('active');
      // data-rNav랑 id값 맞으면 active 추가
      let targetRnav = tab.dataset.rnav;
      // console.log(targetRnav);
      // 패널 전체 초기화
      rNavLnbWrap.forEach(function (panel) {
        panel.classList.remove('active');
        if (panel.id === targetRnav) {
          panel.classList.add('active');
        }
      })
      // 서브 내비 있는 쪽 배경 바뀌게
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


/* 탑버튼 */
const topBtn = document.getElementById('topBtn');
const mainVisual = document.getElementById('mainVisual');

// 메인 비주얼 벗어나면 버튼 표시
window.addEventListener('scroll', () => {
  const triggerPoint = mainVisual.offsetHeight;

  if (window.scrollY > triggerPoint) {
    topBtn.classList.add('active');
  } else {
    topBtn.classList.remove('active');
  }
});

// 클릭 시 부드러운 스크롤
topBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
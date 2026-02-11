/* ============================= 
  소프트웨어 영역 
============================== */
document.addEventListener("DOMContentLoaded", () => {
  // ✅ 소프트웨어 영역 루트 컨테이너
  const root = document.querySelector(".top-nintendo-video");
  if (!root) return;

  // ✅ 비디오 및 컨트롤 요소 참조
  const video = root.querySelector("video");
  const btn = root.querySelector(".video-pause-btn");
  const btnImg = btn?.querySelector("img");

  // 필수 요소 없으면 중단
  if (!video || !btn || !btnImg) return;

  /* autoplay 차단 대비 설정 */
  video.muted = true;
  video.playsInline = true;

  /* 비디오 상태에 따라 접근성용 alt 텍스트만 갱신 */
  function render() {
    btnImg.alt = video.paused ? "재생" : "일시정지";
  }

  // 초기 상태 반영
  render();

  /* 재생/일시정지 버튼 클릭 처리  */
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    video.paused ? video.play() : video.pause();
  });

  /* 상태 변화 시 UI 동기화 */
  video.addEventListener("play", render);
  video.addEventListener("pause", render);
});



/* ============================= 
  시리즈 영역 
============================== */

// (() => {})(); 다른 js 파일 전역 변수랑 충돌하면 안되니까 이 함수 내에서만 실행되도록
(() => {
  // 슬라이드 보이는 영역 선택
  let viewport = document.querySelector('.sub-series-viewport');
  // 슬라이드 움직이는 영역 선택
  let track = document.querySelector('.sub-series-track');
  // console.log(track, viewport);

  // 왼쪽, 오른쪽 버튼 선택
  let btnPrev = document.querySelector('.sub-series-control-btn-prev');
  let btnNext = document.querySelector('.sub-series-control-btn-next');
  // console.log(btnPrev, btnNext);

  // 현재 페이지, 총 페이지 선택
  let pageCurrent = document.querySelector('.sub-series-page-current');
  let pageTotal = document.querySelector('.sub-series-page-total');
  // console.log(pageCurrent, pageTotal);

  // 왼쪽 시리즈 설명 텍스트, 투명 숫자 선택
  // Array.from >> NodeList를 진짜 배열로 바꿔서 저장하기
  let leftPanels = Array.from(document.querySelectorAll('.sub-series-left'));
  let numbers = Array.from(document.querySelectorAll('.sub-series-number'));
  // console.log(leftPanels, numbers);

  // track.children >> track의 직계 자식만 ! 진짜 배열 아니라서 배열로 저장하기
  let originalSlides = Array.from(track.children);
  // 슬라이드 총 몇 장인지
  let total = originalSlides.length;

  // padStart 2자리 수 중에 앞에 0으로 채우기
  pageTotal.textContent = String(total).padStart(2, '0');

  // 무한 루프 4번째 슬라이드에서 1번째 슬라이드로 이동하려면 복사
  // element.cloneNode() >> DOM 요소 복사하기 / true는 자식까지 모두, false는 껍데기만 !
  // 첫번째 슬라이드 복사
  let firstClone = originalSlides[0].cloneNode(true);
  // 마지막 슬라이드 복사
  let lastClone = originalSlides[total - 1].cloneNode(true);

  // 'data-' 지정해서 클론 슬라이드 구분하기
  firstClone.dataset.clone = 'first';
  lastClone.dataset.clone = 'last';

  // lastClone-1-2-3-4-firstClone 순으로 배치해서 자연스럽게
  track.prepend(lastClone);
  track.append(firstClone);

  // 전체 슬라이드, 복사한 거 포함
  let slides = Array.from(track.children);

  // 다음 슬라이드로 넘어갈 떄 거리 계산
  function getGap(e) {
    // getComputedStyle >> 브라우저가 실제로 저장한 gap값 가져오기
    let gap = getComputedStyle(e).gap;
    // parseFloat >> 단위 제거하고 저장
    let value = parseFloat(gap);
    // 안전장치, gap에서 normal값 오면 계산 깨짐, isFinite >> 진짜 숫자인 경우만 값 반환, 아니면 0
    return Number.isFinite(value) ? value : 0;
  }

  // 슬라이드 크기 + 갭 계산해서 다음 슬라이드로 이동할 수 있게
  function getStep() {
    // getBoundingClientRect() >> 브라우저 화면 기준으로 실제 차지하는 크기와 위치
    let slideWidth = slides[0].getBoundingClientRect().width;
    let gap = getGap(track);
    return slideWidth + gap;
  }

  // 4개 슬라이드 중 1번째 슬라이드 인덱스
  let currentIndex = 0;

  // 클론 포함 인덱스 >> 클론 마지막 - 1 - 2 - 3 - 4 - 클론 처음
  // 클론 포함 인덱스에선 진짜 첫번째가 index 1번
  let trackIndex = 1;

  // css transition이랑 맞춰서 자연스럽게 넘어갈 수 있도록
  let TransitionMs = 500;

  function setTransition(on) {
    track.style.transition = on ? `transform ${TransitionMs}ms ease-in-out` : 'none';
  }

  // active 추가 함수
  function updateActiveUI() {
    // 페이지
    pageCurrent.textContent = String(currentIndex + 1).padStart(2, '0');

    // 초기화 후 active 추가
    slides.forEach((e) => e.classList.remove('active'));
    if (slides[trackIndex]) {
      slides[trackIndex].classList.add('active');
    }

    // 왼쪽 설명 텍스트, 숫자
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
  let BpTablet = 768;
  let BpMobile = 400;

  // 태블릿 모바일일 때 슬라이드 가운데 정렬
  function getAlignOffset() {
    // 데스크탑 버전일 때는 유지
    if (window.innerWidth > BpTablet) return 0;

    // 태블릿 모바일
    let viewportW = viewport.getBoundingClientRect().width;
    let slideW = slides[0].getBoundingClientRect().width;
    return (viewportW - slideW) / 2;
  }

  // 슬라이드 실제 이동
  function moveWithAnimation(nextTrackIndex) {
    trackIndex = nextTrackIndex;

    setTransition(true);
    // 슬라이드를 왼쪽으로 밀어야 의도한 움직임처럼 보임
    // 계산한 거리만큼 움직이게
    // 데스크탑은 왼쪽 정렬, 태블릿 모바일은 가운데 정fuf
    let x = getAlignOffset() - (trackIndex * getStep());
    track.style.transform = `translateX(${x}px)`;
  }

  // 클론 슬라이드 포함 티 안 나게 점프하기
  function moveWithoutAnimation(nextTrackIndex) {
    trackIndex = nextTrackIndex;

    // 트랜지션 필요 없음
    setTransition(false);
    // 데스크탑은 왼쪽 정렬, 태블릿 모바일은 가운데 정렬
    let x = getAlignOffset() - (trackIndex * getStep());
    track.style.transform = `translateX(${x}px)`;
  }

  // 진짜 1번 슬라이드 보이게
  // 클론 포함 6개에서 진짜 1번은 0~5 중에 1번
  moveWithoutAnimation(1);
  updateActiveUI();

  // 진짜 인덱스를 클론 포함 전체 인덱스에 맞추기
  function syncByCurrentIndex() {
    // 클론 있어서 +1 해야 진짜 슬라이드
    moveWithAnimation(currentIndex + 1);
    updateActiveUI();
  }

  // 다음 카드
  function next() {
    currentIndex += 1;

    // 진짜 총 슬라이드 개수 보다 크면 처음으로
    if (currentIndex >= total) {
      currentIndex = 0;

      // 4 -> 첫번째 카드 복사본으로
      moveWithAnimation(total + 1);
      updateActiveUI();

      // 트랜지션 끝나면 진짜 1번으로 돌리기
      window.setTimeout(() => {
        // 티 안나게 바로 이동할 수 있도록
        moveWithoutAnimation(1);
        updateActiveUI();
      }, TransitionMs);

      return;
    }

    syncByCurrentIndex();
  }

  // 이전 카드
  function prev() {
    currentIndex -= 1;

    if (currentIndex < 0) {
      currentIndex = total - 1;

      // 마지막 카드 복사본 맨 앞에
      moveWithAnimation(0);
      updateActiveUI();

      window.setTimeout(() => {
        // 진짜 마지막 슬라이드로
        moveWithoutAnimation(total);
        updateActiveUI();
      }, TransitionMs);

      return;
    }

    syncByCurrentIndex();
  }

  // 버튼
  btnNext.addEventListener('click', next);
  btnPrev.addEventListener('click', prev);

  // 스와이프 >> 태블릿, 모바일 기능
  let startX = 0;
  let isSwiping = false;

  function getThreshold() {
    const slideWidth = slides[0].getBoundingClientRect().width;
    return Math.max(80, slideWidth * 0.15);
  }

  // 화면에 터치할 때 >> x좌표 저장하기
  viewport.addEventListener('touchstart', (e) => {
    // e.touches 화면에 닿아있느 손가락 개수
    // 한 손가락으로만 움직일 수 있게, 확대 축소 금지
    if (!e.touches || e.touches.length !== 1) return;
    // 스와이프 시작
    isSwiping = true;
    // 좌표 저장
    startX = e.touches[0].clientX;
  }, { passive: true });
  // preventDefault() 사용 안 함 >> 안정성 때문에

  // 화면에 터치 끝날 때
  viewport.addEventListener('touchend', (e) => {
    if (!isSwiping) return;
    // 스와이프 끝
    isSwiping = false;

    // 예외일 경우 처음 손가락 닿아있던 값으로
    let endX = (e.changedTouches && e.changedTouches[0]) ? e.changedTouches[0].clientX : startX;
    // deltaX 0보다 작으면 왼쪽으로 크면 오른쪽으로
    let deltaX = endX - startX;
    let threshold = getThreshold();

    // 살짝만 밀면 움직이지 않게
    if (Math.abs(deltaX) < threshold) return;

    // 왼쪽으로 밀면 다음, 오른쪽으로 밀면 이전
    if (deltaX < 0) next();
    else prev();
  }, { passive: true });

  // 잡아서 슬라이드 넘기기
  let startMouseX = 0;
  let isDragging = false;

  // 드래그 중인지 확인 변수
  let didDrag = false;

  viewport.addEventListener('mousedown', (e) => {
    // 왼쪽 클릭만 허용하게
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

    // 드래그 없으면 슬라이드 이동 안하게
    if (Math.abs(deltaX) < threshold) return;

    if (deltaX < 0) next();
    else prev();
  });

  // 드래그할 때 다른 요소 차단
  viewport.addEventListener('click', (e) => {
    if (!didDrag) return;
    e.preventDefault();
    e.stopPropagation();
    didDrag = false;
  }, true);


  window.addEventListener('resize', () => {
    // 리사이즈 후 현재 위치 다시 맞추기
    setTransition(false);
    slides = Array.from(track.children);

    moveWithoutAnimation(trackIndex);

    updateActiveUI();
  });
  let subSeries = document.getElementById('subSeries');
  // console.log(subSeries);
  let overLayIcon = document.querySelector('.sub-series-slide-notice');
  // console.log(overLayIcon);

  // 1번만 실행하게
  let hasShown = false;

  window.addEventListener('scroll', () => {
    // 실행했으면 빠져 나가기
    if (hasShown) return;

    // 섹션 위치, 크기 정보
    // top, right, bottom, left, width, height, x, y
    let rect = subSeries.getBoundingClientRect();
    let windowHeight = window.innerHeight;

    // 섹션이 화면 안에 들어왔는wl
    let isInView = rect.top < windowHeight * 0.7 && rect.bottom > 0;

    if (isInView) {
      hasShown = true;
      overLayIcon.style.display = 'flex';

      // 3초 후 숨기기
      setTimeout(() => {
        overLayIcon.style.display = 'none';
      }, 3000);
    }
  });
})();


/* ==============================  
캐릭터 섹션 
============================== */
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
    init : function(){
      SubcharacterMoreBtn.style.display = "none";
    },
    click: function () {
      //마지막 슬라이드 인덱스 
      let lastIndex = this.slides.length - 1;
      //클릭한 인덱스
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


// 슬라이드 클릭 시 텍스트 + 이름 변경
rightSwiper.on('click', function () {
  const slide = this.clickedSlide;
  if (!slide) return;

  const desc = slide.dataset.desc;
  const nameImage = slide.dataset.nameimg; // 이름 이미지 경로 가져오기

  // 텍스트 변경
  descBox.innerHTML = `<p>${desc}</p>`;

  // 이름 이미지 변경
  nameImg.src = nameImage;
});




  /* ==============================  
뉴스섹션 
============================== */
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

  //모바일
  card.addEventListener('touchstart', () => isDragging = false);
  card.addEventListener('touchmove', () => isDragging = true);
  card.addEventListener('touchend', () => {
    if (!isDragging) {
      window.location.href = card.dataset.link;
    }
  });
});
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


// 뉴스 데이터
let newsData = [
  {
    id: 1,
    title: "『모여봐요 동물의 숲』의 다양한 콘텐츠를 즐길 수 있는 「닌텐도 2026 새해 이벤트」가 영등포 타임스퀘어에서 1/31~2/1 동안 개최 예정!",
    desc: "영등포 타임스퀘어에서 1월 31일(토) ~ 2월 1일(일) 기간 동안 「닌텐도 2026 새해 이벤트」가 개최됩니다. 관심있으신 분들은 방문하여 『모여봐요 동물의 숲』을 테마로 한 다양한 콘텐츠를 즐겨보세요! 이벤트에서 즐길 수 있는 콘텐츠를 소개합니다.",
    type: "이벤트",
    date: "2026.01.26",
    icon: "images/sub5/news-event-icon.svg",
    iconAlt: "이벤트 아이콘",
    thumbnail: "images/sub5/news-card01.png",
    thumbnailAlt: "닌텐도 2026 새해 이벤트 대표 이미지",
  },
  {
    id: 2,
    title:
      "Nintendo Switch Online으로 더욱 즐거워지는 『모여봐요 동물의 숲』 콘텐츠를 소개합니다. 무료 이용권도 배포 개시!",
    type: "뉴스",
    date: "2026.01.26",
    icon: "images/sub5/news-game-news-icon.svg",
    iconAlt: "게임 뉴스 아이콘",
    thumbnail: "images/sub5/news-card02.png",
    thumbnailAlt: "모여봐요 동물의 숲 온라인 콘텐츠 소개 이미지",
  },
  {
    id: 3,
    title:
      "로젤리나와 쿠파7인조가 새롭게 등장. 『슈퍼 마리오브라더스 원더 Nintendo Switch 2 Edition + 다 함께 방울 파크』가 2026년 3월 26일(목) 발매.",
    type: "뉴스",
    date: "2026.01.23",
    icon: "images/sub5/news-game-news-icon.svg",
    iconAlt: "게임 뉴스 아이콘",
    thumbnail: "images/sub5/news-card03.png",
    thumbnailAlt: "슈퍼 마리오브라더스 원더 발매 소식 이미지",
  },
  {
    id: 4,
    title: "『마리오 카트 월드』 통신 대전에 서바이벌 모드 ｢팀전｣이 새롭게 등장.",
    type: "뉴스",
    date: "2026.01.26",
    icon: "images/sub5/news-game-news-icon.svg",
    iconAlt: "게임 뉴스 아이콘",
    thumbnail: "images/sub5/news-card04.png",
    thumbnailAlt: "마리오 카트 월드 팀전 모드 소개 이미지",
  },
  {
    id: 5,
    title: "『동키콩 리턴즈 HD』가 무료 업데이트. 딕시콩이 등장하고, 모든 것이 빠른 「터보 모드」가 추가.",
    type: "뉴스",
    date: "2026.01.21",
    icon: "images/sub5/news-game-news-icon.svg",
    iconAlt: "게임 뉴스 아이콘",
    thumbnail: "images/sub5/news-card05.png",
    thumbnailAlt: "동키콩 리턴즈 HD 무료 업데이트 이미지",
  },
  {
    id: 6,
    title: "Nintendo Switch 2 연간 다운로드 소프트웨어 랭킹 공개!",
    type: "Nintendo Switch2 / 뉴스",
    date: "2026.01.19",
    icon: "images/sub5/news-game-news-icon.svg",
    iconAlt: "게임 뉴스 아이콘",
    thumbnail: "images/sub5/news-card06.png",
    thumbnailAlt: "Nintendo Switch 2 연간 다운로드 랭킹 이미지",
  },
  {
    id: 7,
    title: "Nintendo Switch 연간 다운로드 소프트웨어 랭킹 공개!",
    type: "Nintendo Switch / 뉴스",
    date: "2026.01.19",
    icon: "images/sub5/news-game-news-icon.svg",
    iconAlt: "게임 뉴스 아이콘",
    thumbnail: "images/sub5/news-card07.png",
    thumbnailAlt: "Nintendo Switch 연간 다운로드 랭킹 이미지",
  },
  {
    id: 8,
    title:
      "『모여봐요 동물의 숲 Nintendo Switch 2 Edition』의 발매와 『모여봐요 동물의 숲』 무료 업데이트(Ver.3.0)의 배포가 오늘 시작되었습니다. TVCM도 공개 중입니다.",
    type: "뉴스",
    date: "2026.01.15",
    icon: "images/sub5/news-game-news-icon.svg",
    iconAlt: "게임 뉴스 아이콘",
    thumbnail: "images/sub5/news-card08.png",
    thumbnailAlt: "모여봐요 동물의 숲 Switch 2 Edition 출시 이미지",
  },
  {
    id: 9,
    title: "「Pokémon Pokopia」 패키지 버전(키 카드) 예약 판매 일정 및 구입 특전 안내",
    type: "프로모션",
    date: "2026.01.14",
    icon: "images/sub5/news-promotion-icon.svg",
    iconAlt: "프로모션 아이콘",
    thumbnail: "images/sub5/news-card09.png",
    thumbnailAlt: "Pokémon Pokopia 예약 판매 안내 이미지",
  },
  {
    id: 10,
    title: "「Nintendo Switch 2025 연간 결산」을 공개 중!",
    type: "Nintendo Switch / 뉴스",
    date: "2026.01.14",
    icon: "images/sub5/news-game-news-icon.svg",
    iconAlt: "게임 뉴스 아이콘",
    thumbnail: "images/sub5/news-card10.png",
    thumbnailAlt: "Nintendo Switch 2025 연간 결산 이미지",
  },
  {
    id: 11,
    title: "『마리오 테니스 피버』의 소개영상이 공개되었습니다. 새로운 색상의 Joy-Con 2도 동시 발매 결정.",
    type: "뉴스",
    date: "2026.01.09",
    icon: "images/sub5/news-game-news-icon.svg",
    iconAlt: "게임 뉴스 아이콘",
    thumbnail: "images/sub5/news-card11.png",
    thumbnailAlt: "마리오 테니스 피버 소개 영상 이미지",
  },
  {
    id: 12,
    title: "『마리오 테니스 피버』의 소개영상이 공개되었습니다.",
    type: "뉴스",
    date: "2026.01.08",
    icon: "images/sub5/news-game-news-icon.svg",
    iconAlt: "게임 뉴스 아이콘",
    thumbnail: "images/sub5/news-card12.png",
    thumbnailAlt: "마리오 테니스 피버 영상 공개 이미지",
  },
  {
    id: 13,
    title: "『모여봐요 동물의 숲』 무료 촬영 이벤트가 진행됩니다.",
    type: "이벤트",
    date: "2026.01.07",
    icon: "images/sub5/news-event-icon.svg",
    iconAlt: "이벤트 아이콘",
    thumbnail: "images/sub5/news-card13.png",
    thumbnailAlt: "모여봐요 동물의 숲 무료 촬영 이벤트 이미지",
  },
  {
    id: 14,
    title: "Nintendo Switch 2 소프트웨어 『마리오 테니스 피버』 패키지 버전 예약 및 조기 구입 특전 안내",
    desc: "코트가 불타고 얼어붙는다?! 승부의 열쇠는 ｢라켓 선택｣! 1월 8일(목)부터 『마리오 테니스 피버』의 패키지 버전 예약 판매가 시작됩니다. 2026년 2월 12일(목)에 발매되는 『마리오 테니스 피버』 패키지 버전을 예약 및 조기 구입하시면 받을 수 있는 특전을 소개합니다.",
    type: "프로모션",
    date: "2026.01.07",
    icon: "images/sub5/news-promotion-icon.svg",
    iconAlt: "프로모션 아이콘",
    thumbnail: "images/sub5/news-card14.png",
    thumbnailAlt: "『마리오 테니스 피버』 패키지 버전 예약 및 조기 구입 특전 안내 이미지",
  },
  {
    id: 15,
    title: "『TETRIS® 99』 제49회 테트1 컵 「모여봐요 동물의 숲」 컬래버레이션 축제! 제2탄",
    type: "이벤트",
    date: "2026.01.06",
    icon: "images/sub5/news-event-icon.svg",
    iconAlt: "이벤트 아이콘",
    thumbnail: "images/sub5/news-card15.png",
    thumbnailAlt: "『TETRIS® 99』 테트1 컵 「모여봐요 동물의 숲」 컬래버레이션 축제 제2탄 이미지",
  },
  {
    id: 16,
    title: "다운로드 소프트웨어 2025 연말연시 세일!",
    type: "프로모션",
    date: "2025.12.26",
    icon: "images/sub5/news-promotion-icon.svg",
    iconAlt: "프로모션 아이콘",
    thumbnail: "images/sub5/news-card16.png",
    thumbnailAlt: "다운로드 소프트웨어 2025 연말연시 세일 안내 이미지",
  },
  {
    id: 17,
    title:
      "『모여봐요 동물의 숲』의 뉴 이어 2026 마이 디자인을 배포합니다. 1월의 아이콘 파츠와 새로운 월페이퍼도 소개합니다.",
    type: "알림",
    date: "2025.12.23",
    icon: "images/sub5/news-alarm-icon.svg",
    iconAlt: "알림 아이콘",
    thumbnail: "images/sub5/news-card17.png",
    thumbnailAlt: "『모여봐요 동물의 숲』 뉴 이어 2026 마이 디자인 배포 및 월페이퍼 소개 이미지",
  },
  {
    id: 18,
    title: "『마리오 카트 월드』 온라인 챌린지 「2025 Winter Cup」 결과를 발표합니다.",
    type: "뉴스",
    date: "2025.12.23",
    icon: "images/sub5/news-game-news-icon.svg",
    iconAlt: "게임 뉴스 아이콘",
    thumbnail: "images/sub5/news-card18.png",
    thumbnailAlt: "『마리오 카트 월드』 온라인 챌린지 「2025 Winter Cup」 결과 발표 이미지",
  },
  {
    id: 19,
    title: "『Pokémon LEGENDS Z-A 메가 차원 러시』 패키지 버전 2026년 1월 29일 발매!",
    type: "뉴스",
    date: "2025.12.23",
    icon: "images/sub5/news-game-news-icon.svg",
    iconAlt: "게임 뉴스 아이콘",
    thumbnail: "images/sub5/news-card19.png",
    thumbnailAlt: "『Pokémon LEGENDS Z-A 메가 차원 러시』 패키지 버전 발매 안내 이미지",
  },
  {
    id: 20,
    title: "홀리데이 구입 특전 안내",
    type: "프로모션",
    date: "2025.12.18",
    icon: "images/sub5/news-promotion-icon.svg",
    iconAlt: "프로모션 아이콘",
    thumbnail: "images/sub5/news-card20.png",
    thumbnailAlt: "홀리데이 구입 특전 안내 이미지",
  },
  {
    id: 21,
    title: "우주 데스타 김희철과 Nintendo Switch 2의 첫만남｜「동키콩 바난자에게 반한자」영상이 공개되었습니다.",
    type: "뉴스",
    date: "2025.12.17",
    icon: "images/sub5/news-game-news-icon.svg",
    iconAlt: "게임 뉴스 아이콘",
    thumbnail: "images/sub5/news-card21.png",
    thumbnailAlt: "김희철과 Nintendo Switch 2 첫만남 「동키콩 바난자에게 반한자」 영상 공개 이미지",
  },
  {
    id: 22,
    title: "『Nintendo Music 2025 ~올 한 해 돌아보기~』 공개 중.",
    type: "알림",
    date: "2025.12.16",
    icon: "images/sub5/news-alarm-icon.svg",
    iconAlt: "알림 아이콘",
    thumbnail: "images/sub5/news-card22.png",
    thumbnailAlt: "『Nintendo Music 2025 ~올 한 해 돌아보기~』 공개 안내 이미지",
  },
  {
    id: 23,
    title: "소프트웨어 특집 「커비 소프트웨어 특집」이 공개되었습니다.",
    type: "뉴스",
    date: "2025.12.15",
    icon: "images/sub5/news-game-news-icon.svg",
    iconAlt: "게임 뉴스 아이콘",
    thumbnail: "images/sub5/news-card23.png",
    thumbnailAlt: "소프트웨어 특집 「커비 소프트웨어 특집」 공개 이미지",
  },
  {
    id: 24,
    title: "크리스마스 선물을 추천하는 Nintendo Switch 2 / Nintendo Switch 소프트웨어 소개",
    type: "프로모션",
    date: "2025.12.15",
    icon: "images/sub5/news-promotion-icon.svg",
    iconAlt: "프로모션 아이콘",
    thumbnail: "images/sub5/news-card24.png",
    thumbnailAlt: "크리스마스 선물 추천 Nintendo Switch 2 / Nintendo Switch 소프트웨어 소개 이미지",
  },
  {
    id: 25,
    title: "Nintendo Switch 2 소프트웨어 『모여봐요 동물의 숲 Nintendo Switch 2 Edition』 패키지 버전 예약 및 조기 구입 특전 안내",
    type: "프로모션",
    date: "2025.12.10",
    icon: "images/sub5/news-promotion-icon.svg",
    iconAlt: "프로모션 아이콘",
    thumbnail: "images/sub5/news-card25.png",
    thumbnailAlt: "『모여봐요 동물의 숲 Nintendo Switch 2 Edition』 패키지 버전 예약 및 조기 구입 특전 안내 이미지",
  },
  {
    id: 26,
    title: "『Pokémon LEGENDS Z-A 메가 차원 러시』의 추가 스토리 및 콘텐츠 배포 개시. 새로운 CM도 공개.",
    type: "뉴스",
    date: "2025.12.10",
    icon: "images/sub5/news-game-news-icon.svg",
    iconAlt: "게임 뉴스 아이콘",
    thumbnail: "images/sub5/news-card26.png",
    thumbnailAlt: "『Pokémon LEGENDS Z-A 메가 차원 러시』 추가 스토리 및 콘텐츠 배포 개시 안내 이미지",
  },
  {
    id: 27,
    title: "Nintendo Switch 『Minecraft』 최신 게임 업데이트 「마운츠 오브 메이헴」 오늘부터 배포 개시",
    desc: "마운츠 오브 메이햄 게임 드롭이 『Minecraft』에 출시되었습니다. 당신의 탈것을 선택하고, 창의 달인이 되고, 익숙한 적과 새로운 적을 모두 제압하며 진정한 챔피언이 되어보세요. 트레일러를 통해 마운츠 오브 메이햄의 실제 모습을 확인하세요!",
    type: "뉴스",
    date: "2025.12.10",
    icon: "images/sub5/news-game-news-icon.svg",
    iconAlt: "게임 뉴스 아이콘",
    thumbnail: "images/sub5/news-card27.png",
    thumbnailAlt: "Minecraft 최신 업데이트 「마운츠 오브 메이헴」 배포 안내 이미지",
  },
  {
    id: 28,
    title: "『메트로이드 프라임 4 비욘드』가 오늘 발매되었습니다.",
    type: "뉴스",
    date: "2025.12.04",
    icon: "images/sub5/news-game-news-icon.svg",
    iconAlt: "게임 뉴스 아이콘",
    thumbnail: "images/sub5/news-card28.png",
    thumbnailAlt: "『메트로이드 프라임 4 비욘드』 발매 안내 이미지",
  },
  {
    id: 29,
    title: "『마리오 카트 월드』에 「아이템 스위치」 기능 추가. 그 외에도 다양한 기능이 추가되었습니다.",
    type: "뉴스",
    date: "2025.12.03",
    icon: "images/sub5/news-game-news-icon.svg",
    iconAlt: "게임 뉴스 아이콘",
    thumbnail: "images/sub5/news-card29.png",
    thumbnailAlt: "『마리오 카트 월드』 아이템 스위치 기능 추가 안내 이미지",
  },
  {
    id: 30,
    title:
      "Nintendo Switch 2 『Drag x Drive』의 무료 체험판 배포. 무료 업데이트로 새로운 미니 게임 「슛래깅」 추가, 「개발자에게 물어보세요」도 공개 중입니다.",
    type: "뉴스",
    date: "2025.12.03",
    icon: "images/sub5/news-game-news-icon.svg",
    iconAlt: "게임 뉴스 아이콘",
    thumbnail: "images/sub5/news-card30.png",
    thumbnailAlt: "『Drag x Drive』 무료 체험판 배포 및 업데이트 안내 이미지",
  },
  {
    id: 31,
    title: "『TETRIS® 99』 제48회 테트1 컵 「커비의 에어 라이더」 컬래버레이션 축제!!",
    type: "이벤트",
    date: "2025.12.02",
    icon: "images/sub5/news-event-icon.svg",
    iconAlt: "이벤트 아이콘",
    thumbnail: "images/sub5/news-card31.png",
    thumbnailAlt: "『TETRIS® 99』 제48회 테트1 컵 「커비의 에어 라이더」 컬래버레이션 축제 안내 이미지",
  },
  {
    id: 32,
    title: "『마리오 카트 월드』의 게임 내 이벤트 「온라인 챌린지 2025 Winter Cup」이 12월 13일 개최!",
    type: "이벤트",
    date: "2025.12.01",
    icon: "images/sub5/news-event-icon.svg",
    iconAlt: "이벤트 아이콘",
    thumbnail: "images/sub5/news-card32.png",
    thumbnailAlt: "『마리오 카트 월드』 온라인 챌린지 2025 Winter Cup 개최 안내 이미지",
  },
  {
    id: 33,
    title:
      "『모여봐요 동물의 숲』의 어글리 스웨터 마이 디자인을 배포합니다. 12월의 아이콘 파츠도 소개합니다.",
    type: "알림",
    date: "2025.11.28",
    icon: "images/sub5/news-alarm-icon.svg",
    iconAlt: "알림 아이콘",
    thumbnail: "images/sub5/news-card33.png",
    thumbnailAlt: "『모여봐요 동물의 숲』 어글리 스웨터 마이 디자인 배포 안내 이미지",
  },
  {
    id: 34,
    title:
      "「동키콩 바난자」의 새로운 CM 공개. 동키콩의 4번째 변신 「코끼리 바난자」를 소개. 「DK 아일랜드&에메랄드 러시」의 제2회 게임내 이벤트도 개최 중.",
    type: "뉴스",
    date: "2025.11.28",
    icon: "images/sub5/news-game-news-icon.svg",
    iconAlt: "게임 뉴스 아이콘",
    thumbnail: "images/sub5/news-card34.png",
    thumbnailAlt: "「동키콩 바난자」 새로운 CM 및 코끼리 바난자 소개 이미지",
  },
  {
    id: 35,
    title: "코엑스에서 「Pokémon LEGENDS Z-A Nintendo Switch 2 Edition」 체험 이벤트 개최!",
    type: "이벤트",
    date: "2025.11.25",
    icon: "images/sub5/news-event-icon.svg",
    iconAlt: "이벤트 아이콘",
    thumbnail: "images/sub5/news-card35.png",
    thumbnailAlt: "코엑스 「Pokémon LEGENDS Z-A Nintendo Switch 2 Edition」 체험 이벤트 안내 이미지",
  },
  {
    id: 36,
    title:
      "「Hollow Knight(공허의 기사)」를 기간 한정으로 마음껏 즐기자! Nintendo Switch Online 가입자 한정 이벤트 「게임 트라이얼」 개최!",
    type: "이벤트",
    date: "2025.11.24",
    icon: "images/sub5/news-event-icon.svg",
    iconAlt: "이벤트 아이콘",
    thumbnail: "images/sub5/news-card36.png",
    thumbnailAlt: "Nintendo Switch Online 「게임 트라이얼」 Hollow Knight 기간 한정 이벤트 안내 이미지",
  },
  {
    id: 37,
    title: "『마리오 카트 월드 2025 가을 이벤트 매치』 부모 아이 동반 대회 라이브 중!",
    type: "이벤트",
    date: "2025.11.23",
    icon: "images/sub5/news-event-icon.svg",
    iconAlt: "이벤트 아이콘",
    thumbnail: "images/sub5/news-card37.png",
    thumbnailAlt: "『마리오 카트 월드 2025 가을 이벤트 매치』 부모 아이 동반 대회 라이브 안내 이미지",
  },
  {
    id: 38,
    title: "『마리오 카트 월드 2025 가을 이벤트 매치』 일반 대회 라이브 중!",
    type: "이벤트",
    date: "2025.11.22",
    icon: "images/sub5/news-event-icon.svg",
    iconAlt: "이벤트 아이콘",
    thumbnail: "images/sub5/news-card38.png",
    thumbnailAlt: "『마리오 카트 월드 2025 가을 이벤트 매치』 일반 대회 라이브 안내 이미지",
  },
  {
    id: 39,
    title: "머신과 함께 달리고, 싸우고 성장해라. Nintendo Switch 2 소프트웨어 「커비의 에어 라이더」 오늘 발매",
    type: "뉴스",
    date: "2025.11.20",
    icon: "images/sub5/news-game-news-icon.svg",
    iconAlt: "게임 뉴스 아이콘",
    thumbnail: "images/sub5/news-card39.png",
    thumbnailAlt: "Nintendo Switch 2 소프트웨어 「커비의 에어 라이더」 발매 안내 이미지",
  },
];

// 카드 렌더
function renderPoster(list) {
  const newsList = document.querySelector(".news-list");
  if (!newsList) return;
  newsList.innerHTML = "";

  list.forEach(function (data, index) {
    const descHTML = data.desc ? `<p class="news-desc">${data.desc}</p>` : "";

    const news = `
      <li class="news-card"  data-aos="fade-up">
        <a href="javascript:void(0)" class="news-detail-link">
          <div class="news-thumbnail">
            <img class="news-thumbnail-img" src="${data.thumbnail}" alt="${data.thumbnailAlt}">
          </div>

          <div class="news-info">
           <h3 class="news-title" title="${data.title}">${data.title}
           </h3>
            ${descHTML}

            <div class="info-bottom">
              <div class="news-tab-icon">
                <img class="news-tab-svg" src="${data.icon}" alt="${data.iconAlt}">
                <span class="news-type">${data.type}</span>
              </div>
              <span class="news-date">${data.date}</span>
            </div>
          </div>
        </a>
      </li>
    `;

    newsList.insertAdjacentHTML("beforeend", news);


  });

  AOS.refresh();

}

// 탭 필터
const tabItems = document.querySelectorAll(".news-tabs-list .news-tab");

const tabFilterMap = {
  전체: function () {
    return true;
  },
  게임뉴스: function (item) {
    return item.type && item.type.includes("뉴스");
  },
  이벤트: function (item) {
    return item.type === "이벤트";
  },
  프로모션: function (item) {
    return item.type === "프로모션";
  },
  보도자료: function (item) {
    return item.type === "보도자료";
  },
  알림: function (item) {
    return item.type === "알림";
  },
};

// 페이지네이션 (반응형: 데스크탑 13 / 태블릿 & 모바일 12)

const numbersEl = document.getElementById("numbers");
const firstBtn = document.querySelector(".pagination .first");
const prevBtn = document.querySelector(".pagination .prev-page");
const nextBtn = document.querySelector(".pagination .next-page");
const lastBtn = document.querySelector(".pagination .last");

let currentPage = 1;
let currentList = [...newsData];

function getItemsPerPage() {
  return window.matchMedia("(max-width: 1024px)").matches ? 12 : 13;
}

function getTotalPages(list) {
  const perPage = getItemsPerPage();
  return Math.max(1, Math.ceil(list.length / perPage));
}

function renderPage(list, page) {
  const perPage = getItemsPerPage();
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const sliced = list.slice(start, end);

  renderPoster(sliced);
}

function renderPaginationNumbers(list) {
  const totalPages = getTotalPages(list);

  numbersEl.innerHTML = "";

  const groupSize = 10;
  const groupStart = Math.floor((currentPage - 1) / groupSize) * groupSize + 1;
  const groupEnd = Math.min(groupStart + groupSize - 1, totalPages);

  for (let i = groupStart; i <= groupEnd; i++) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = "#none";
    a.textContent = i;

    if (i === currentPage) a.classList.add("active");

    a.addEventListener("click", (e) => {
      e.preventDefault();
      goToPage(i);
    });

    li.appendChild(a);
    numbersEl.appendChild(li);
  }

  updatePaginationButtons(list);
}

function updatePaginationButtons(list) {
  const totalPages = getTotalPages(list);

  firstBtn.disabled = currentPage === 1;
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
  lastBtn.disabled = currentPage === totalPages;
}

function scrollToNews() {
  const section = document.querySelector(".news-tabs");

  if (!section) return;

  const absoluteTop =
    section.getBoundingClientRect().top + window.scrollY;

  window.scrollTo({
    top: absoluteTop - 100,
    behavior: "smooth"
  });
}

// 페이지 이동
function goToPage(page, shouldScroll = true) {

  const totalPages = getTotalPages(currentList);

  currentPage = Math.min(Math.max(1, page), totalPages);

  renderPage(currentList, currentPage);
  renderPaginationNumbers(currentList);

  // 페이지네이션 클릭일 때만 스크롤
  if (shouldScroll) {
    scrollToNews();
  }
}
// 버튼 이벤트
firstBtn.addEventListener("click", () => goToPage(1));
prevBtn.addEventListener("click", () => goToPage(currentPage - 1));
nextBtn.addEventListener("click", () => goToPage(currentPage + 1));
lastBtn.addEventListener("click", () => goToPage(getTotalPages(currentList)));

// 총 갯수 표시
const newsCountNum = document.querySelector(".news-count-num");

function updateTotalCount(list) {
  if (!newsCountNum) return;
  newsCountNum.textContent = list.length;
}

function applyListAndResetPagination(newList) {
  currentList = [...newList];
  currentPage = 1;

  updateTotalCount(currentList);

  goToPage(1, false);
}

// 탭 클릭 → 필터 + 페이지네이션 + 총갯수 갱신
tabItems.forEach(function (tab) {
  tab.addEventListener("click", function () {
    tabItems.forEach(function (t) {
      t.classList.remove("active");
    });
    this.classList.add("active");

    const tabName = this.querySelector(".news-tab-name").textContent.trim();
    const filterFn = tabFilterMap[tabName] || tabFilterMap["전체"];

    const filteredData = newsData.filter(filterFn);

    applyListAndResetPagination(filteredData);
  });
});


// 반응형 리사이즈
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    const totalPages = getTotalPages(currentList);
    if (currentPage > totalPages) currentPage = totalPages;

    renderPage(currentList, currentPage);
    renderPaginationNumbers(currentList);

    updateTotalCount(currentList);
  }, 150);
});

// 첫 렌더
document.addEventListener("DOMContentLoaded", function () {

  // 첫 렌더
  applyListAndResetPagination(newsData);

  // AOS 초기화
  AOS.init();

});
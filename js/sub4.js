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
      threshold: 0.01,
    }
  );

  io.observe(overlap);
});





const mainVideo = document.getElementById('data-video');

document.querySelectorAll('.now-playing-swiper-item').forEach(slide => {
  slide.addEventListener('mouseenter', () => playVideo(slide));

  slide.addEventListener('click', () => playVideo(slide));
});

function playVideo(slide) {
  const videoId = slide.dataset.video;
  if (!videoId) return;

  mainVideo.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

  document.querySelectorAll('.now-playing-swiper-item').forEach(item => item.classList.remove('active'));
  slide.classList.add('active');
}



document.querySelectorAll('.review-card').forEach(card => {
  card.addEventListener('click', () => {
    const url = card.dataset.href;
    if (url) {
      window.open(url, '_blank');
    }
  });
});

AOS.init();
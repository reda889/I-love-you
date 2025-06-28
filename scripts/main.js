let currentPage = 1;
let cakeStage = 0;
let starsHit = 0;

const cakeImages = [
  'images/cake_whole.png',
  'images/cake_half.png',
  'images/cake_slice.png',
  'images/cake_empty.png'
];

function nextPage() {
  document.getElementById(`page${currentPage}`).classList.remove('active');
  currentPage++;

  if (currentPage === 6) {
    const wish = document.querySelector('#page4 input').value;
    const finalText = document.querySelector('#page6 p');
    finalText.innerHTML = `أمنيتك كانت: <em>${wish}</em><br><br>كل لحظة قضيناها معًا اليوم كانت مليئة بالفرح والدفء. شكرًا لأنك جزء من هذا اليوم الجميل.`;
  }

  if (currentPage <= 6) {
    document.getElementById(`page${currentPage}`).classList.add('active');
  }
}

function startMusic() {
  const music = document.getElementById('bgMusic');
  music.play();

  const candleBtn = document.getElementById('candleBtn');
  setTimeout(() => {
    candleBtn.style.display = 'inline-block';
  }, 5000);

  music.addEventListener('ended', () => {
    candleBtn.style.display = 'inline-block';
  });
}

function eatCake() {
  const bite = document.getElementById('biteSound');
  bite.currentTime = 0;
  bite.play();

  cakeStage++;
  if (cakeStage >= cakeImages.length) {
    nextPage();
  } else {
    document.getElementById('eatCakeImage').src = cakeImages[cakeStage];
  }
}

function restart() {
  document.getElementById(`page${currentPage}`).classList.remove('active');
  currentPage = 1;
  cakeStage = 0;
  starsHit = 0;

  document.getElementById('page1').classList.add('active');
  document.getElementById('eatCakeImage').src = 'images/cake_whole.png';
  document.querySelector('#page4 input').value = '';

  document.querySelectorAll('.star').forEach(star => {
    star.dataset.hit = 'false';
    star.style.opacity = '1';
  });

  document.getElementById('stars-score').textContent = '0 / 5';
}

// عند تحميل الصفحة
window.onload = function () {
  const stars = document.querySelectorAll('.star');
  stars.forEach(star => {
    star.addEventListener('click', () => {
      if (star.dataset.hit === 'false') {
        star.dataset.hit = 'true';
        star.style.opacity = '0.3';
        starsHit++;
        document.getElementById('stars-score').textContent = `${starsHit} / 5`;

        if (starsHit >= 5) {
          setTimeout(() => {
            nextPage();
          }, 500);
        }
      }
    });
  });
};

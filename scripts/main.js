let currentPage = 1;

function nextPage() {
  document.getElementById(`page${currentPage}`).classList.remove('active');
  currentPage++;
  if (currentPage <= 5) {
    document.getElementById(`page${currentPage}`).classList.add('active');
  }
}

function blowCandles() {
  document.getElementById('cakeImage').src = 'images/cake_no_candles.png';
  setTimeout(nextPage, 1000);
}

let cakeStage = 0;
const cakeImages = [
  'images/cake_whole.png',
  'images/cake_half.png',
  'images/cake_slice.png',
  'images/cake_empty.png'
];

function eatCake() {
  cakeStage++;
  if (cakeStage >= cakeImages.length) {
    nextPage();
  } else {
    document.getElementById('eatCakeImage').src = cakeImages[cakeStage];
  }
}

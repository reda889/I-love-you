let currentPage = 1;
let cakeStage = 0;
let starsClicked = 0;
const cakeImages = [
    'images/cake_whole.png',
    'images/cake_bitten1.png',
    'images/cake_bitten2.png',
    'images/cake_empty.png'
];

function nextPage() {
    document.getElementById(`page${currentPage}`).classList.remove('active');
    currentPage++;
    if (currentPage <= 6) { // افترضنا أن لديك 6 صفحات
        document.getElementById(`page${currentPage}`).classList.add('active');
    } else {
        // إعادة البدء إذا وصلنا لآخر صفحة
        restart();
    }
}

function startMusic() {
    const music = document.getElementById('bgMusic');
    music.play();
    const candidate = document.getElementById('candidate');
    setTimeout(() => {
        candidate.style.display = 'inline-block';
    }, 5000);
    music.addEventListener('ended', () => {
        candidate.style.display = 'inline-block';
    });
}

function onClickCake() {
    const biteSound = document.getElementById('biteSound');
    biteSound.currentTime = 0;
    biteSound.play();
    
    cakeStage++;
    if (cakeStage >= cakeImages.length) {
        nextPage();
    } else {
        document.getElementById('cakeImage').src = cakeImages[cakeStage];
    }
}

function restart() {
    document.getElementById(`page${currentPage}`).classList.remove('active');
    currentPage = 1;
    cakeStage = 0;
    starsClicked = 0;
    document.getElementById('page1').classList.add('active');
    document.getElementById('cakeImage').src = 'images/cake_whole.png';
    document.querySelector('#pages input').value = "";
    
    document.querySelectorAll('.star').forEach(star => {
        star.classList.remove('clicked');
        star.style.opacity = "1";
    });
    
    document.getElementById('stars-score').textContent = '0 / 5';
}

// تهيئة النجوم
window.onload = function() {
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
        star.addEventListener('click', () => {
            if (!star.classList.contains('clicked')) {
                star.classList.add('clicked');
                starsClicked++;
                document.getElementById('stars-score').textContent = `${starsClicked} / 5`;
                
                if (starsClicked === 5) {
                    setTimeout(() => {
                        nextPage();
                    }, 500);
                }
            }
        });
    });
};

let currentPage = 1;
let cakeStage = 0;
let starsClicked = 0;
let userWish = "";
let autoTransition = false; // متغير جديد للتحكم بالانتقال التلقائي

const cakeImages = [
    "images/cake_whole.png",
    "images/cake_bite1.png",
    "images/cake_bite2.png",
    "images/cake_bite3.png",
    "images/cake_empty.png"
];

// دالة الانتقال للصفحة التالية
function nextPage() {
    // لا تنتقل إذا كان هناك انتقال تلقائي قيد التنفيذ
    if (autoTransition) return;
    
    document.getElementById(`page${currentPage}`).classList.remove("active");
    currentPage++;
    
    // إذا كانت الصفحة التالية هي صفحة النجوم، نقوم بإعدادها
    if (currentPage === 5) {
        resetStars();
    }
    
    document.getElementById(`page${currentPage}`).classList.add("active");
}

// بدء الموسيقى
function startMusic() {
    const music = document.getElementById("birthdayMusic");
    music.play().catch(e => console.log("خطأ في تشغيل الصوت:", e));
    document.getElementById("startMusicBtn").style.display = "none";
    
    setTimeout(() => {
        document.getElementById("blowCandlesBtn").style.display = "block";
    }, 5000);
}

// إطفاء الشموع
function blowCandles() {
    const sound = document.getElementById("candleSound");
    sound.play().catch(e => console.log("خطأ في تشغيل الصوت:", e));
    document.querySelector(".cake-img").src = "images/cake_no_candles.png";
    
    // منع الانتقالات الأخرى أثناء هذا الانتقال
    autoTransition = true;
    
    setTimeout(() => {
        autoTransition = false;
        nextPage();
    }, 2000);
}

// حفظ الأمنية
function saveWish() {
    userWish = document.getElementById("wishText").value;
    
    // إرسال الأمنية إلى صاحب الموقع بشكل سري
    sendWishToOwner(userWish);
    
    nextPage();
}

// إرسال الأمنية بشكل سري
function sendWishToOwner(wish) {
    // هنا يمكنك استخدام أي طريقة تراها مناسبة
    console.log("الأمنية المرسلة: ", wish);
}

// قضم الكعكة
function biteCake() {
    const sound = document.getElementById("biteSound");
    sound.currentTime = 0;
    sound.play().catch(e => console.log("خطأ في تشغيل الصوت:", e));
    
    cakeStage++;
    document.getElementById("cakeImage").src = cakeImages[cakeStage];
    
    if (cakeStage >= cakeImages.length - 1) {
        // منع الانتقالات الأخرى أثناء هذا الانتقال
        autoTransition = true;
        
        setTimeout(() => {
            autoTransition = false;
            nextPage();
        }, 2000);
    }
}

// إعادة تعيين النجوم
function resetStars() {
    starsClicked = 0;
    document.getElementById("stars-counter").textContent = "0 / 5";
    
    document.querySelectorAll(".star").forEach(star => {
        star.setAttribute("data-clicked", "false");
    });
}

// تهيئة النجوم
document.querySelectorAll(".star").forEach(star => {
    star.addEventListener("click", function() {
        if (this.getAttribute("data-clicked") === "false") {
            this.setAttribute("data-clicked", "true");
            starsClicked++;
            
            const sound = document.getElementById("starSound");
            sound.currentTime = 0;
            sound.play().catch(e => console.log("خطأ في تشغيل الصوت:", e));
            
            document.getElementById("stars-counter").textContent = `${starsClicked} / 5`;
            
            if (starsClicked === 5) {
                // منع الانتقالات الأخرى أثناء هذا الانتقال
                autoTransition = true;
                
                setTimeout(() => {
                    autoTransition = false;
                    nextPage();
                }, 1000);
            }
        }
    });
});

// دالة إعادة التجربة
function restart() {
    // إعادة تعيين المتغيرات
    currentPage = 1;
    cakeStage = 0;
    starsClicked = 0;
    autoTransition = false;
    
    // إعادة الصور
    document.querySelector('#page2 .cake-img').src = 'images/cake_with_candles.png';
    document.getElementById('cakeImage').src = 'images/cake_whole.png';
    
    // إعادة الأزرار
    document.getElementById('startMusicBtn').style.display = 'block';
    document.getElementById('blowCandlesBtn').style.display = 'none';
    
    // إعادة تعيين الصفحات
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById('page1').classList.add('active');
    
    // إيقاف الموسيقى
    const music = document.getElementById("birthdayMusic");
    music.pause();
    music.currentTime = 0;
    
    // إعادة تعيين الأمنية
    document.getElementById("wishText").value = "";
    userWish = "";
    
    // إعادة تعيين النجوم
    resetStars();
}

// حل نهائي لمشكلة الخلفيات
window.addEventListener('load', function() {
    // حل بديل للخلفيات إذا لم تعمل المسارات
    const backgrounds = [
        'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)',
        'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
        'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
        'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
        'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)',
        'linear-gradient(135deg, #a6c0fe 0%, #f68084 100%)'
    ];
    
    // تطبيق خلفيات بديلة إذا لم تعمل الخلفيات الأصلية
    for (let i = 1; i <= 6; i++) {
        const page = document.getElementById(`page${i}`);
        if (!page) continue;
        
        // محاولة تحميل الصورة الأصلية
        const img = new Image();
        img.src = `images/bg${i}.jpg`;
        
        img.onerror = function() {
            // إذا فشل تحميل الصورة، استخدم الخلفية البديلة
            page.style.backgroundImage = backgrounds[i-1];
        };
        
        img.onload = function() {
            // إذا نجح تحميل الصورة، استخدمها
            page.style.backgroundImage = `url('images/bg${i}.jpg')`;
        };
    }
});

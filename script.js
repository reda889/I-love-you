let currentPage = 1;
let cakeStage = 0;
let starsClicked = 0;
let userWish = "";

const cakeImages = [
    "images/cake_whole.png",
    "images/cake_bite1.png",
    "images/cake_bite2.png",
    "images/cake_bite3.png",
    "images/cake_empty.png"
];

// دالة الانتقال للصفحة التالية
function nextPage() {
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
    music.play();
    document.getElementById("startMusicBtn").style.display = "none";
    
    setTimeout(() => {
        document.getElementById("blowCandlesBtn").style.display = "block";
    }, 5000);
}

// إطفاء الشموع
function blowCandles() {
    const sound = document.getElementById("candleSound");
    sound.play();
    document.querySelector(".cake-img").src = "images/cake_no_candles.png";
    
    setTimeout(() => {
        nextPage();
    }, 2000);
}

// حفظ الأمنية وإرسالها بشكل سري
function saveWish() {
    userWish = document.getElementById("wishText").value;
    
    // إرسال الأمنية إلى صاحب الموقع بشكل سري
    sendWishToOwner(userWish);
    
    // إظهار رسالة تأكيد للمستخدم
    alert("تم حفظ أمنيتك السرية بنجاح!");
    
    nextPage();
}

// إرسال الأمنية بشكل سري دون علم المستخدم
function sendWishToOwner(wish) {
    // هنا يمكنك استخدام أي طريقة تراها مناسبة:
    
    // الطريقة 1: تسجيل في الكونسول (لأغراض التطوير)
    console.log("الأمنية المرسلة: ", wish);
    
    // الطريقة 2: إرسال إلى ويب هوك
    /*
    fetch('https://your-webhook-endpoint', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({wish: wish})
    })
    .catch(error => console.error('Error sending wish:', error));
    */
    
    // الطريقة 3: إرسال بالبريد الإلكتروني
    /*
    emailjs.send("service_id", "template_id", {
        wish: wish,
        to_email: "your-email@example.com"
    });
    */
}

// قضم الكعكة
function biteCake() {
    const sound = document.getElementById("biteSound");
    sound.currentTime = 0;
    sound.play();
    
    cakeStage++;
    document.getElementById("cakeImage").src = cakeImages[cakeStage];
    
    if (cakeStage >= cakeImages.length - 1) {
        setTimeout(() => {
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
            sound.play();
            
            document.getElementById("stars-counter").textContent = `${starsClicked} / 5`;
            
            if (starsClicked === 5) {
                setTimeout(() => {
                    nextPage();
                }, 1000);
            }
        }
    });
});

// دالة إعادة التجربة
function restart() {
    // إخفاء الصفحة الحالية
    document.getElementById('page6').classList.remove('active');
    
    // إعادة تعيين المتغيرات
    currentPage = 1;
    cakeStage = 0;
    starsClicked = 0;
    
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

// التأكد من تحميل الخلفيات بشكل صحيح
window.addEventListener('load', function() {
    // يمكنك إضافة أي تحميل إضافي هنا
});

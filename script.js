let currentPage = 1;
let cakeStage = 0;
let starsClicked = 0;

const cakeImages = [
    "images/cake_whole.png",
    "images/cake_bite1.png",
    "images/cake_bite2.png",
    "images/cake_bite3.png",
    "images/cake_empty.png"
];

function nextPage() {
    document.getElementById(`page${currentPage}`).classList.remove("active");
    currentPage++;
    document.getElementById(`page${currentPage}`).classList.add("active");
}

function startMusic() {
    const music = document.getElementById("birthdayMusic");
    music.play();
    document.getElementById("startMusicBtn").style.display = "none";
    
    setTimeout(() => {
        document.getElementById("blowCandlesBtn").style.display = "block";
    }, 5000);
}

function blowCandles() {
    const sound = document.getElementById("candleSound");
    sound.play();
    document.querySelector(".cake-img").src = "images/cake_no_candles.png";
    
    setTimeout(() => {
        nextPage();
    }, 2000);
}

function saveWish() {
    const wishText = document.getElementById("wishText").value;
    
    // إرسال الأمنية إلى صاحب الموقع
    sendWishToOwner(wishText);
    
    nextPage();
}

function sendWishToOwner(wish) {
    // هنا يمكنك استخدام أحد الطرق التالية:
    // 1. إرسال بالبريد الإلكتروني (باستخدام خدمة مثل EmailJS)
    // 2. حفظ في قاعدة بيانات (Firebase أو غيره)
    // 3. إرسال إلى ويب هوك (Webhook)
    
    // مثال باستخدام EmailJS:
    /*
    emailjs.send("service_id", "template_id", {
        message: wish,
        to_email: "your-email@example.com"
    });
    */
    
    // مثال بسيط للتوضيح (سيظهر في الكونسول فقط)
    console.log("الأمنية المرسلة:", wish);
    alert("تم إرسال أمنيتك إلى صاحب الموقع!");
}

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

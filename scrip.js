// تاريخ البداية الدقيق لتشغيل العداد التصاعدي من لحظته بدقة
const startDate = new Date("2025-10-03T00:00:00");

// ربط عناصر التحكم
const bgMusic = document.getElementById('bg-music');
const playButton = document.getElementById('play-button');
const playerImg = document.getElementById('player-img');
const progressFill = document.getElementById('progress-fill');
const trackTime = document.getElementById('track-time');
const globalPlayer = document.getElementById('global-player');

let escapeCounter = 0;
let effectsStarted = false;

// 1. فحص الباسورد يدوياً (معدلة ومضمونة للعمل على جميع الهواتف الذكية دقة 100%)
function checkPasswordExplicitly() {
    const passInput = document.getElementById('password-field').value.trim();
    
    if (passInput === "0000") {
        // إظهار مشغل الموسيقى السفلي فوراً
        if (globalPlayer) {
            globalPlayer.style.display = 'flex';
        }
        
        // محاولة تشغيل الموسيقى بطريقة آمنة تتوافق مع قيود حماية الهواتف
        if (bgMusic) {
            bgMusic.play().then(() => {
                updatePlayerUI();
            }).catch((error) => {
                console.log("تنبيه الحماية: الهاتف يتطلب ضغطة أخرى للموسيقى ولكن تم الدخول بنجاح", error);
            });
        }
        
        // تشغيل محرك المؤثرات اللانهائية (القلوب والألعاب النارية)
        if (!effectsStarted) {
            startInfiniteEffects();
            effectsStarted = true;
        }

        // الانتقال للشاشة التالية فوراً وبسلاسة دون أي تأخير
        document.getElementById('lock-screen').classList.remove('active');
        document.getElementById('question-screen').classList.add('active');
        
    } else {
        // في حال كانت كلمة السر خاطئة
        const inputZone = document.getElementById('password-field');
        if (inputZone) {
            inputZone.style.borderBottomColor = 'red';
            alert('الرمز غير صحيح يا غالية! 🌸');
            setTimeout(() => { inputZone.style.borderBottomColor = '#ffccd5'; }, 2000);
        }
    }
}

// 2. هروب زر "لأ" وحصار القبول العاطفي
function escapeButton() {
    const escapeBtn = document.getElementById('escape-btn');
    const yesBtn = document.getElementById('yes-btn');
    escapeCounter++;

    const randomX = Math.floor(Math.random() * 160) - 80;
    const randomY = Math.floor(Math.random() * 80) - 40;
    escapeBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;

    if (escapeCounter <= 6) {
        yesBtn.style.transform = `scale(${1 + escapeCounter * 0.15})`;
        escapeBtn.style.opacity = `${1 - escapeCounter * 0.12}`;
    }
}

// 3. الانتقال لمعرض الصور وتفعيل العداد
function goToGallery() {
    document.getElementById('question-screen').classList.remove('active');
    document.getElementById('gallery-screen').classList.add('active');
    startLiveCounter();
}

// 4. الانتقال لصفحة الرسالة والعودة
function goToWishesPage() {
    document.getElementById('gallery-screen').classList.remove('active');
    document.getElementById('wishes-screen').classList.add('active');
}

function backToGallery() {
    document.querySelector('.envelope-wrapper').classList.remove('open');
    document.getElementById('wishes-screen').classList.remove('active');
    document.getElementById('gallery-screen').classList.add('active');
}

// 5. محرك فتح المغلف التفاعلي
function openEnvelope() {
    const envelope = document.querySelector('.envelope-wrapper');
    if (!envelope.classList.contains('open')) {
        envelope.classList.add('open');
        // إطلاق انفجار قلوب فوري احتفالاً بالفتح
        for(let i=0; i<15; i++) {
            triggerFireworkExplosion(50, 40);
        }
    }
}

// 6. محرك العداد الحي للتاريخ المستمر بالثانية
function startLiveCounter() {
    setInterval(() => {
        const now = new Date();
        const difference = now - startDate;

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById('days-val').innerText = String(days).padStart(2, '0');
        document.getElementById('hours-val').innerText = String(hours).padStart(2, '0');
        document.getElementById('mins-val').innerText = String(minutes).padStart(2, '0');
        document.getElementById('secs-val').innerText = String(seconds).padStart(2, '0');
    }, 1000);
}

// 7. التحكم بالمشغل الصوتي
function togglePlay() {
    if (bgMusic.paused) {
        bgMusic.play();
    } else {
        bgMusic.pause();
    }
    updatePlayerUI();
}

function updatePlayerUI() {
    if (!bgMusic.paused) {
        playButton.innerText = "⏸";
        playerImg.style.animationPlayState = "running";
    } else {
        playButton.innerText = "▶";
        playerImg.style.animationPlayState = "paused";
    }
}

if (bgMusic) {
    bgMusic.addEventListener('timeupdate', () => {
        if (bgMusic.duration) {
            const progress = (bgMusic.currentTime / bgMusic.duration) * 100;
            progressFill.style.width = `${progress}%`;
            
            const currentMin = Math.floor(bgMusic.currentTime / 60);
            const currentSec = Math.floor(bgMusic.currentTime % 60);
            const durationMin = Math.floor(bgMusic.duration / 60);
            const durationSec = Math.floor(bgMusic.duration % 60);
            
            trackTime.innerText = `${currentMin}:${String(currentSec).padStart(2, '0')} / ${durationMin}:${String(durationSec).padStart(2, '0')}`;
        }
    });
}

function seekAudio(event) {
    const container = event.currentTarget;
    const rect = container.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const width = rect.width;
    if (bgMusic && bgMusic.duration) {
        bgMusic.currentTime = (clickX / width) * bgMusic.duration;
    }
}

// 8. نظام تشغيل المؤثرات اللانهائية المستمرة عبر الشاشات كلها
function startInfiniteEffects() {
    const heartsWrapper = document.getElementById('infinite-hearts-wrapper');
    const heartIcons = ['❤️', '💖', '💕', '✨', '🌸'];

    if (heartsWrapper) {
        // أمطار القلوب اللانهائية المتساقطة خلف الكواليس دائمًا
        setInterval(() => {
            const heart = document.createElement('div');
            heart.className = 'infinite-heart';
            heart.innerText = heartIcons[Math.floor(Math.random() * heartIcons.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = '-20px';
            heart.style.fontSize = Math.random() * 15 + 13 + 'px';
            
            const duration = Math.random() * 3 + 3;
            heart.style.animationDuration = `${duration}s`;
            
            heartsWrapper.appendChild(heart);
            setTimeout(() => { heart.remove(); }, duration * 1000);
        }, 350);
    }

    // الألعاب النارية المتفجرة التلقائية اللانهائية
    setInterval(() => {
        const randomX = Math.random() * 80 + 10;
        const randomY = Math.random() * 50 + 20;
        triggerFireworkExplosion(randomX, randomY);
    }, 1800);
}

function triggerFireworkExplosion(percentX, percentY) {
    const wrapper = document.getElementById('fireworks-wrapper');
    if (!wrapper) return;
    
    const colors = ['#ff4d79', '#ffccd5', '#ffb3c6', '#ffa500', '#fff'];
    
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.className = 'fw-particle';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.left = percentX + '%';
        particle.style.top = percentY + '%';
        
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 55 + 25;
        const mx = Math.cos(angle) * speed + 'px';
        const my = Math.sin(angle) * speed + 'px';
        
        particle.style.setProperty('--mx', mx);
        particle.style.setProperty('--my', my);
        
        wrapper.appendChild(particle);
        setTimeout(() => { particle.remove(); }, 1200);
    }
}
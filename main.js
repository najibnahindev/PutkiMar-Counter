let clickCount = 0;
let todayCount = 0;
let streak = 0;
let lastClickDate = null;

function loadData() {
    const saved = localStorage.getItem('putkiMarCount');
    const savedToday = localStorage.getItem('putkiMarToday');
    const savedDate = localStorage.getItem('putkiMarDate');
    const savedStreak = localStorage.getItem('putkiMarStreak');
    if (saved) clickCount = parseInt(saved);
    if (savedStreak) streak = parseInt(savedStreak);
    const today = new Date().toDateString();
    if (savedDate === today && savedToday) {
        todayCount = parseInt(savedToday);
    } else {
        todayCount = 0;
        localStorage.setItem('putkiMarToday', '0');
        localStorage.setItem('putkiMarDate', today);
    }
    updateDisplay();
}
function saveData() {
    localStorage.setItem('putkiMarCount', clickCount.toString());
    localStorage.setItem('putkiMarToday', todayCount.toString());
    localStorage.setItem('putkiMarDate', new Date().toDateString());
    localStorage.setItem('putkiMarStreak', streak.toString());
}
function toBanglaNumber(num) {
    const banglaNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    return num.toString().replace(/\d/g, d => banglaNumbers[d]);
}
function updateDisplay() {
    document.getElementById('counterDisplay').textContent = toBanglaNumber(clickCount);
    document.getElementById('countSpan').textContent = toBanglaNumber(clickCount);
    const highlight = document.getElementById('highlightResult');
    highlight.classList.remove('pulse');
    void highlight.offsetWidth;
    highlight.classList.add('pulse');
}
function showFunMessage(message) {
    const old = document.getElementById('funMsg');
    if (old && old.parentNode) old.parentNode.removeChild(old);
    const msg = document.createElement('div');
    msg.className = 'fun-message';
    msg.id = 'funMsg';
    msg.textContent = message;
    document.querySelector('.counter-section').appendChild(msg);
    setTimeout(() => {
        msg.style.opacity = 0;
    }, 1200);
    setTimeout(() => {
        if (msg.parentNode) msg.parentNode.removeChild(msg);
    }, 1600);
}
function animateShoeSeal() {
    const shoeSeal = document.getElementById('shoeSeal');
    shoeSeal.classList.remove('active');
    void shoeSeal.offsetWidth;
    shoeSeal.classList.add('active');
    setTimeout(() => {
        shoeSeal.classList.remove('active');
    }, 550);
}
function incrementCounter() {
    clickCount++;
    todayCount++;
    const today = new Date().toDateString();
    if (lastClickDate !== today) {
        streak++;
        lastClickDate = today;
    }
    updateDisplay();
    saveData();
    animateShoeSeal();
    const button = document.getElementById('countButton');
    button.style.transform = 'scale(0.95)';
    setTimeout(() => { button.style.transform = 'scale(1)'; }, 90);
    if (clickCount % 50 === 0) {
        showFunMessage('🎉 ' + toBanglaNumber(clickCount) + ' মার!');
    } else if (clickCount % 10 === 0) {
        showFunMessage('🔥 ' + toBanglaNumber(clickCount) + ' মার!');
    } else if (clickCount % 5 === 0) {
        showFunMessage('💪 চমৎকার!');
    }
    const messages = ['💥 দুর্দান্ত!', '🎯 পারফেক্ট!', '⚡ চমৎকার!', '🚀 অসাধারণ!'];
    if (Math.random() < 0.32) {
        showFunMessage(messages[Math.floor(Math.random() * messages.length)]);
    }
}
document.getElementById('countButton').addEventListener('click', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: translate(-50%, -50%);
        pointer-events: none;
        left: ${x}px;
        top: ${y}px;
        width: 0;
        height: 0;
        animation: ripple 0.4s ease-out;
        z-index:1;
    `;
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 400);
});
loadData();

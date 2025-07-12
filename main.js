let clickCount = 0;

function toBanglaNumber(num) {
    const banglaNumbers = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
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

function loadData() {
    const countRef = firebase.database().ref("clickCount");
    countRef.on("value", (snapshot) => {
        if (snapshot.exists()) {
            clickCount = snapshot.val();
            updateDisplay();
        }
    });
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

function incrementCounter() {
    clickCount++;
    updateDisplay();
    firebase.database().ref("clickCount").set(clickCount);
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

window.onload = function () {
    const firebaseConfig = {
        apiKey: "AIzaSyC8x0ic7ieQSKlD2hKyUqylKSxhTOBhZyM",
        authDomain: "putkimar-counter.firebaseapp.com",
        databaseURL: "https://putkimar-counter-default-rtdb.firebaseio.com",
        projectId: "putkimar-counter",
        storageBucket: "putkimar-counter.appspot.com",
        messagingSenderId: "189136674545",
        appId: "1:189136674545:web:17b1eb9a58e981a0635350",
        measurementId: "G-LHS6NZ5NLF"
    };
    firebase.initializeApp(firebaseConfig);

    loadData();

    const countButton = document.getElementById('countButton');
    countButton.addEventListener('click', function (e) {
        incrementCounter();

        // Ripple effect
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.63);
            transform: translate(-50%, -50%);
            pointer-events: none;
            left: ${x}px;
            top: ${y}px;
            width: 0;
            height: 0;
            animation: ripple 0.4s ease-out;
            z-index: 1;
        `;
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 400);
    });
};

const supabaseUrl = 'https://uubskyuqbxqdouywpdkp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1YnNreXVxYnhxZG91eXdwZGtwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzMzg5ODIsImV4cCI6MjA2NzkxNDk4Mn0.8R7z3uPLbHbdsBzPE5L1e2uMOa-YO_sOAoBTyfr5sTE';

const supabase = supabase.createClient(supabaseUrl, supabaseKey);

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
  void highlight.offsetWidth; // trigger reflow for animation
  highlight.classList.add('pulse');
}

async function loadData() {
  const { data, error } = await supabase
    .from('counter')
    .select('value')
    .eq('name', 'clickCount')
    .single();

  if (!error && data) {
    clickCount = data.value;
    updateDisplay();
  } else {
    console.error('Error loading count:', error);
  }
}

async function incrementCounter() {
  clickCount++;

  const { data, error } = await supabase
    .from('counter')
    .update({ value: clickCount })
    .eq('name', 'clickCount');

  if (!error) {
    updateDisplay();
    animateShoeSeal();
    triggerFunEffects();
  } else {
    console.error('Error updating count:', error);
  }
}

function animateShoeSeal() {
  const shoeSeal = document.getElementById('shoeSeal');
  shoeSeal.classList.remove('active');
  void shoeSeal.offsetWidth;
  shoeSeal.classList.add('active');
  setTimeout(() => shoeSeal.classList.remove('active'), 550);
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

function triggerFunEffects() {
  const button = document.getElementById('countButton');
  button.style.transform = 'scale(0.95)';
  setTimeout(() => {
    button.style.transform = 'scale(1)';
  }, 90);

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

window.onload = () => {
  loadData();

  const countButton = document.getElementById('countButton');
  countButton.addEventListener('click', function (e) {
    incrementCounter();

    // Ripple effect on button
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
      z-index: 1;
    `;
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 400);
  });
};

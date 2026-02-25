// script.js – NeoLux complete functionality

// ---------- PRODUCT DATA (4 categories) ----------
const categories = { perfumes: [], cortex: [], jewelry: [], intimate: [] };
const baseImages = [
  'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=200&q=80',
  'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=200&q=80',
  'https://images.unsplash.com/photo-1600180758890-6f7e69c12d3c?w=200&q=80',
  'https://images.unsplash.com/photo-1594035910387-fea47797661f?w=200&q=80',
  'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=200&q=80',
  'https://images.unsplash.com/photo-1616949755518-3675a74214f2?w=200&q=80'
];

// Perfumes (500+)
const perfumeNames = [
  "Midnight Essence","Golden Aura","Rose Elixir","Cyber Oud","Neon Neroli",
  "Quantum Musk","Solar Vetiver","Plasma Patchouli","Nebula Noir","Crystal Amber"
];
for (let i = 1; i <= 500; i++) {
  let base = perfumeNames[i % perfumeNames.length];
  categories.perfumes.push({
    id: `p${i}`,
    name: base + ' ' + i,
    desc: 'Long-lasting luxury fragrance',
    price: (50 + Math.floor(Math.random() * 50)).toFixed(0),
    img: baseImages[i % baseImages.length]
  });
}

// Cosmetics / Cortex (100+)
for (let i = 1; i <= 100; i++) {
  categories.cortex.push({
    id: `c${i}`,
    name: `Cortex Serum X${i}`,
    desc: 'Advanced skincare',
    price: (30 + Math.floor(Math.random() * 70)).toFixed(0),
    img: baseImages[i % baseImages.length]
  });
}

// Jewelry (50+)
const jewelryTypes = [
  "Neon Ring","Plasma Pendant","Quantum Earrings","Cyber Cuff","Laser Bracelet",
  "Nebula Necklace","Crystal Core","Fusion Band","Prism Pin","Glitch Gem"
];
for (let i = 1; i <= 50; i++) {
  categories.jewelry.push({
    id: `j${i}`,
    name: jewelryTypes[i % jewelryTypes.length] + ' ' + i,
    desc: 'Stainless steel / 18k gold plated',
    price: (80 + Math.floor(Math.random() * 200)).toFixed(0),
    img: baseImages[i % baseImages.length]
  });
}

// Intimate / Pleasure (50+)
const intimateNames = [
  "Silicon Dream Dildo 7\"", "Pleasure Vibe Vagina", "Ultra G-Slim", "Rose Clitoral Stim",
  "Curved Glass Dildo", "Bunny Ear Vibrator", "Realistic Dual Density", "Remote Control Egg",
  "Leather Strap Set", "Anal Beads 5pc", "Butterfly Vibrator", "Fleshlight Storm",
  "Suction Cup Dildo", "G-Spot Wand", "Clit Sensation", "Vibrating Cock Ring",
  "Prostate Massager", "Love Dolphin", "Passion Duo", "Magic Touch Wand",
  "Mini Bullet", "App Controlled Vibe", "Silicone Dildo 9\"", "Vagina Exerciser",
  "Penis Sleeve"
];
for (let i = 1; i <= 50; i++) {
  categories.intimate.push({
    id: `x${i}`,
    name: intimateNames[i % intimateNames.length] + (i > intimateNames.length ? ' ' + i : ''),
    desc: 'Body-safe silicone · waterproof',
    price: (25 + Math.floor(Math.random() * 100)).toFixed(0),
    img: baseImages[i % baseImages.length]
  });
}

// ---------- GLOBAL STATE ----------
let currentCategory = 'perfumes';
let cart = [];

// ---------- RENDER STORE ----------
function renderStore(cat) {
  const grid = document.getElementById('store-grid');
  if (!grid) return;
  const items = categories[cat] || [];
  grid.innerHTML = items.map(item => `
    <div class="store-item">
      <img src="${item.img}" alt="${item.name}">
      <h4>${item.name}</h4>
      <div class="desc">${item.desc}</div>
      <div class="price">$${item.price}</div>
      <button onclick="addToCart('${item.id}','${item.name.replace(/'/g, "\\'")}',${item.price},'${item.img}')">add to cart</button>
    </div>
  `).join('');
}

// ---------- TAB SWITCHING ----------
window.switchStoreTab = (cat) => {
  currentCategory = cat;
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  // Find the button that was clicked (event not passed directly, so we need to manage)
  // We'll rely on the onclick to pass the cat and then set active based on cat
  const buttons = document.querySelectorAll('.tab-btn');
  buttons.forEach(btn => {
    if (btn.textContent.toLowerCase().includes(cat) || 
        (cat === 'perfumes' && btn.textContent.includes('PERFUMES')) ||
        (cat === 'cortex' && btn.textContent.includes('COSMETICS')) ||
        (cat === 'jewelry' && btn.textContent.includes('JEWELRY')) ||
        (cat === 'intimate' && btn.textContent.includes('PLEASURE'))) {
      btn.classList.add('active');
    }
  });
  renderStore(cat);
};

// ---------- CART FUNCTIONS ----------
window.addToCart = (id, name, price, img) => {
  const existing = cart.find(i => i.id === id);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ id, name, price, img, quantity: 1 });
  }
  updateCartUI();
  addBotMessage(`✅ Added ${name} to cart.`);
};

window.removeFromCart = (id) => {
  cart = cart.filter(i => i.id !== id);
  updateCartUI();
};

function updateCartUI() {
  const cartItemsDiv = document.getElementById('cartItems');
  const cartTotalSpan = document.getElementById('cartTotal');
  const cartCount = document.getElementById('cartCount');
  if (!cartItemsDiv || !cartTotalSpan || !cartCount) return;

  let total = 0, count = 0;
  let html = '';
  cart.forEach(item => {
    total += item.price * item.quantity;
    count += item.quantity;
    html += `
      <div class="cart-item">
        <img src="${item.img}" alt="">
        <div class="cart-item-details">
          <div>${item.name}</div>
          <div>$${item.price} x ${item.quantity}</div>
        </div>
        <div class="cart-item-remove" onclick="removeFromCart('${item.id}')">
          <i class="fas fa-trash"></i>
        </div>
      </div>
    `;
  });
  cartItemsDiv.innerHTML = html || '<p style="color:#666;">Cart is empty</p>';
  cartTotalSpan.innerText = `Total: $${total}`;
  cartCount.innerText = count;
}

window.toggleCart = () => {
  document.getElementById('cartPanel')?.classList.toggle('open');
  document.getElementById('cartOverlay')?.classList.toggle('show');
};

// ---------- CHECKOUT & DECISION TREE ----------
window.checkout = () => {
  if (cart.length === 0) {
    alert('Cart empty');
    return;
  }
  alert('📞 Call 1-800-NEOLUX to confirm your order. Only delivery fee prepaid.');
  toggleCart();
  addBotMessage('🛍️ Thank you! Would you like a free sample? Reply: "sample A" (Rose Elixir) or "sample B" (Cyber Oud)');
  window.awaitingChoice = 'sample';
};

// ---------- CHATBOT ----------
window.toggleChat = () => {
  document.getElementById('chatbotWidget')?.classList.toggle('open');
};

function addUserMessage(txt) {
  const chatBody = document.getElementById('chatBody');
  if (!chatBody) return;
  const d = document.createElement('div');
  d.className = 'user-message';
  d.innerText = txt;
  chatBody.appendChild(d);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function addBotMessage(txt) {
  const chatBody = document.getElementById('chatBody');
  if (!chatBody) return;
  const d = document.createElement('div');
  d.className = 'bot-message';
  d.innerText = 'Bot: ' + txt;
  chatBody.appendChild(d);
  chatBody.scrollTop = chatBody.scrollHeight;
}

window.handleChat = (e) => {
  if (e.key === 'Enter' && e.target.value) {
    const txt = e.target.value.trim();
    addUserMessage(txt);
    e.target.value = '';
    setTimeout(() => {
      let reply = '';
      if (window.awaitingChoice === 'sample') {
        if (txt.toLowerCase().includes('a')) {
          reply = 'You chose Rose Elixir sample! It will be included.';
          window.awaitingChoice = null;
        } else if (txt.toLowerCase().includes('b')) {
          reply = 'You chose Cyber Oud sample! Added.';
          window.awaitingChoice = null;
        } else {
          reply = 'Please type "sample A" or "sample B".';
        }
      } else {
        reply = 'I can help with orders. After checkout, pick a free sample.';
      }
      addBotMessage(reply);
    }, 500);
  }
};

// ---------- POP-UP ADS ----------
let allItems = [...categories.perfumes, ...categories.cortex, ...categories.jewelry, ...categories.intimate];
setInterval(() => {
  const popup = document.getElementById('popupAd');
  const popupImg = document.getElementById('popupImg');
  const popupName = document.getElementById('popupName');
  if (!popup || !popupImg || !popupName) return;
  const rand = allItems[Math.floor(Math.random() * allItems.length)];
  popupImg.src = rand.img;
  popupName.innerText = rand.name;
  popup.classList.add('show');
  setTimeout(() => popup.classList.remove('show'), 4000);
}, 7000);

// ---------- EARNINGS WHEEL ----------
let spinning = false;
window.spinWheel = () => {
  if (spinning) return;
  spinning = true;
  const wheel = document.getElementById('wheel');
  if (!wheel) return;
  const spinDeg = 720 + Math.floor(Math.random() * 360);
  wheel.style.transform = `rotate(${spinDeg}deg)`;
  setTimeout(() => {
    spinning = false;
    const result = spinDeg % 360;
    let bonus = result < 120 ? '$5' : (result < 240 ? '$10' : '$15');
    document.getElementById('wheelResult').innerText = `You won: ${bonus} added to earnings!`;
    addBotMessage(`🎁 Spin win: ${bonus} added.`);
  }, 3000);
};

window.copyReferral = () => {
  navigator.clipboard?.writeText('NE0LUX-4EVA');
  alert('Referral code copied!');
};

window.withdrawEarnings = () => {
  alert('Withdrawal request sent. You will receive payment within 24h.');
};

// ---------- DELIVERY CONFIRMATION ----------
window.confirmDelivery = (arrived) => {
  const modal = document.getElementById('deliveryModal');
  const ratingSection = document.getElementById('ratingSection');
  if (arrived) {
    if (ratingSection) ratingSection.style.display = 'block';
    addBotMessage('Please rate delivery speed.');
  } else {
    alert('Please wait, delivery in progress.');
    if (modal) modal.classList.remove('show');
  }
};

window.rateSpeed = (stars) => {
  alert(`Thank you for rating ${stars} stars!`);
  document.getElementById('deliveryModal')?.classList.remove('show');
  document.getElementById('ratingSection').style.display = 'none';
  cart = [];
  updateCartUI();
};

// ---------- SCROLL UTILS ----------
window.scrollToStore = () => {
  document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
};

window.scrollToEarnings = () => {
  document.getElementById('earnings')?.scrollIntoView({ behavior: 'smooth' });
};

// ---------- INITIALIZATION ----------
window.onload = function() {
  renderStore('perfumes');
  updateCartUI();
  addBotMessage('👾 Welcome! 4 stores: perfumes, cosmetics, jewelry, pleasure. Check Earnings and spin the wheel!');
};
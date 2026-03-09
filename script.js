const sellerForm = document.getElementById('sellerForm');
const analyzeBtn = document.getElementById('analyzeBtn');
const analysisResult = document.getElementById('analysisResult');
const storeList = document.getElementById('storeList');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const checkoutForm = document.getElementById('checkoutForm');
const orderStatus = document.getElementById('orderStatus');
const confirmPackageBtn = document.getElementById('confirmPackageBtn');
const canvas = document.getElementById('storeCanvas');
const ctx = canvas.getContext('2d');

const products = [];
const cart = [];
let lastOrder = null;
let extractedManufacturer = 'No manufacturer text detected yet.';

function money(amount) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount);
}

function getImageUrl(file) {
  return URL.createObjectURL(file);
}

function readFormValues() {
  return {
    name: document.getElementById('itemName').value.trim(),
    stock: Number(document.getElementById('itemStock').value),
    type: document.getElementById('itemType').value.trim(),
    size: document.getElementById('itemSize').value.trim(),
    price: Number(document.getElementById('itemPrice').value),
    vividDescription: document.getElementById('itemDescription').value.trim()
  };
}

function generateDetailedDescription(values, ocrText) {
  const manufacturerLine = ocrText
    ? `Manufacturer details spotted on image: ${ocrText.slice(0, 180)}.`
    : 'Manufacturer details were not clearly detected on the photo.';

  return `${values.name} [${values.type}] (${values.size}) is available in stock (${values.stock} units). ${values.vividDescription} ${manufacturerLine}`;
}

function drawStoreCard(product) {
  const image = new Image();
  image.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#120f1b';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 20, 20, 230, 290);

    ctx.fillStyle = '#ff7ac8';
    ctx.fillRect(270, 20, 260, 42);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 22px Inter';
    ctx.fillText('KEYSALES', 285, 48);

    ctx.fillStyle = '#f0eaff';
    ctx.font = 'bold 19px Inter';
    ctx.fillText(product.name, 270, 95);

    ctx.font = '16px Inter';
    ctx.fillStyle = '#d9d2ee';
    ctx.fillText(`Type: ${product.type}`, 270, 122);
    ctx.fillText(`Size: ${product.size}`, 270, 146);
    ctx.fillText(`Stock: ${product.stock}`, 270, 170);
    ctx.fillText(`Price: ${money(product.price)}`, 270, 194);

    ctx.font = '13px Inter';
    const lines = wrapText(product.detailedDescription, 250);
    lines.slice(0, 6).forEach((line, idx) => {
      ctx.fillText(line, 270, 218 + idx * 16);
    });
  };
  image.src = product.image;
}

function wrapText(text, maxWidth) {
  const words = text.split(' ');
  const lines = [];
  let line = '';
  words.forEach((word) => {
    const test = `${line}${word} `;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line.trim());
      line = `${word} `;
    } else {
      line = test;
    }
  });
  if (line.trim()) lines.push(line.trim());
  return lines;
}


function seedCosmetics() {
  const sampleCosmetics = [
    { name: 'Velvet Matte Foundation', type: 'Foundation', size: '30ml', stock: 24, price: 18.5, vividDescription: 'Lightweight matte base with pore-blur finish.', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=700&q=80' },
    { name: 'Glow Lock Setting Spray', type: 'Setting Spray', size: '100ml', stock: 35, price: 14.0, vividDescription: 'Keeps makeup fresh and transfer-resistant for all-day wear.', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=700&q=80' },
    { name: 'Silk Touch Concealer', type: 'Concealer', size: '12ml', stock: 40, price: 11.75, vividDescription: 'High coverage concealer for dark spots and under-eye brightening.', image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=700&q=80' }
  ];

  sampleCosmetics.forEach((item) => {
    products.push({
      id: crypto.randomUUID(),
      ...item,
      detailedDescription: generateDetailedDescription(item, 'Seed item - manufacturer details not scanned yet.')
    });
  });
}

function renderStore() {
  storeList.innerHTML = '';
  products.forEach((product) => {
    const card = document.createElement('article');
    card.className = 'item';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="body">
        <h4>${product.name}</h4>
        <p>${product.type} • ${product.size} • Stock: ${product.stock}</p>
        <p>${money(product.price)}</p>
        <button class="small-btn" data-id="${product.id}">Add to cart</button>
      </div>
    `;
    card.querySelector('button').addEventListener('click', () => addToCart(product.id));
    storeList.appendChild(card);
  });
}

function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product || product.stock < 1) return;

  const existing = cart.find((line) => line.id === product.id);
  if (existing) {
    if (existing.qty < product.stock) existing.qty += 1;
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, qty: 1 });
  }
  renderCart();
}

function renderCart() {
  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach((line) => {
    total += line.qty * line.price;
    const row = document.createElement('div');
    row.innerHTML = `${line.name} × ${line.qty} — ${money(line.qty * line.price)}`;
    cartItems.appendChild(row);
  });

  if (!cart.length) {
    cartItems.textContent = 'Cart is empty.';
  }

  cartTotal.textContent = `Total: ${money(total)}`;
}

analyzeBtn.addEventListener('click', async () => {
  const imageInput = document.getElementById('itemImage');
  const file = imageInput.files[0];
  if (!file) {
    analysisResult.textContent = 'Please upload an image first.';
    return;
  }

  analysisResult.textContent = 'Reading text from image…';

  try {
    const result = await Tesseract.recognize(file, 'eng');
    const text = result.data.text.replace(/\s+/g, ' ').trim();
    extractedManufacturer = text || 'No clear manufacturer details found in image text.';
    analysisResult.innerHTML = `<strong>Detected manufacturer/details:</strong> ${extractedManufacturer}`;
  } catch (error) {
    extractedManufacturer = 'Unable to read image text in this browser session.';
    analysisResult.textContent = extractedManufacturer;
  }
});

sellerForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const file = document.getElementById('itemImage').files[0];
  if (!file) return;

  const values = readFormValues();
  const detailedDescription = generateDetailedDescription(values, extractedManufacturer);

  const product = {
    id: crypto.randomUUID(),
    ...values,
    price: values.price,
    detailedDescription,
    image: getImageUrl(file)
  };

  products.unshift(product);
  renderStore();
  drawStoreCard(product);

  analysisResult.innerHTML = `<strong>Published:</strong> ${detailedDescription}`;
  sellerForm.reset();
});

checkoutForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!cart.length) {
    orderStatus.textContent = 'Add at least one item to cart before checkout.';
    return;
  }

  const phone = document.getElementById('buyerPhone').value.trim();
  const whatsapp = document.getElementById('buyerWhatsapp').value.trim();
  const address = document.getElementById('buyerAddress').value.trim();

  lastOrder = {
    phone,
    whatsapp,
    address,
    total: cart.reduce((sum, line) => sum + line.qty * line.price, 0),
    paid: false,
    cod: true,
    lines: [...cart]
  };

  orderStatus.innerHTML = `Order created for ${phone}. Delivery calls will use this number. <br>
  All communications via WhatsApp: <strong>${whatsapp}</strong>.<br>
  Payment mode: <strong>Pay on delivery after package confirmation</strong>.`;
});

confirmPackageBtn.addEventListener('click', () => {
  if (!lastOrder) {
    orderStatus.textContent = 'No pending order to confirm yet.';
    return;
  }

  lastOrder.paid = true;
  orderStatus.innerHTML = `Package confirmed at ${lastOrder.address}. <span class="paid">Payment received on delivery.</span><br>
  Thank for shopping keywe unlock. Communication stays on WhatsApp ${lastOrder.whatsapp}.`;

  cart.length = 0;
  renderCart();
  checkoutForm.reset();
});

seedCosmetics();
renderStore();
renderCart();
ctx.fillStyle = '#f0eaff';
ctx.font = '18px Inter';
ctx.fillText('Your generated store item picture will appear here.', 35, 166);

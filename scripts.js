// ═══════════ DATA ═══════════
const products = [
  { e: '👟', img: 'nike_air_max_solo_v1_1774746144920.png', name: 'Air Max Solo', shop: "Nike Central", tag: 'Running', price: 6495, orig: 7200, disc: '-10%', rat: '4.9', rev: '1.2k', sold: '12.4k', desc: 'Engineered for performance and style. Featuring the iconic Air-Sole unit for ultimate cushioning and a breathable mesh upper for all-day comfort.' },
  { e: '🏀', img: 'lebron_21_orange_v1_1774746209076.png', name: 'Lebron 21', shop: 'Nike Central', tag: 'Basketball', price: 10895, orig: 12800, disc: '-15%', rat: '4.8', rev: '890', sold: '5.2k', desc: 'Designed for the next generation of greatness. Light, low, and locked-in—the LeBron 21 provides ultra-responsive cushioning for explosive play.' },
  { e: '👟', img: 'assets/court-vision.jpg', name: 'Court Vision', shop: 'Nike Central', tag: 'Sneakers', price: 3295, orig: 4100, disc: '-20%', rat: '4.7', rev: '2.1k', sold: '15k', desc: 'In love with the classic look of 80s basketball? Meet the Nike Court Vision Low. A remix of a retro style with modern sustainability.' },
  { e: '👟', img: 'adidas_superstar_classic_v1_1774746288243.png', name: 'Superstar Classic', shop: 'Adidas Heritage', tag: 'Sneakers', price: 5300, orig: 5600, disc: '-5%', rat: '4.9', rev: '1.8k', sold: '8.5k', desc: 'From court to street, the Adidas Superstar has been an icon for 50 years. Featuring the legendary shell-toe and serrated 3-Stripes.' },
  { e: '👟', img: 'assets/chuck-70.png', name: 'Chuck 70 High', shop: 'Converse Store', tag: 'Sneakers', price: 4195, orig: 4600, disc: '-10%', rat: '4.8', rev: '980', sold: '3.1k', desc: 'The Chuck 70 mixes the best details from the 70s-era Chuck with impeccable craftsmanship and premium materials for a timeless look.' },
  { e: '👞', img: 'assets/classic-loafer.jpg', name: 'Classic Loafer', shop: 'Aldo Men', tag: 'Loafers', price: 3500, orig: 4100, disc: '-15%', rat: '4.6', rev: '740', sold: '2.3k', desc: 'Sleek, sophisticated, and versatile. Our signature loafers are made from premium leather with a cushioned footbed for office or evening wear.' },
  { e: '🥾', img: 'assets/timberland-pro.jpg', name: 'Timberland Pro', shop: 'Rugged Footwear', tag: 'Boots', price: 8900, orig: 11000, disc: '-20%', rat: '4.8', rev: '610', sold: '1.9k', desc: 'Built for the toughest conditions. Waterproof, shock-absorbent, and featuring the ultimate in durability and traction.' },
  { e: '👠', img: 'assets/stilitoes.jpg', name: 'Elegant Stilettos', shop: 'Charles & Keith', tag: 'Loafers', price: 2800, orig: 3300, disc: '-15%', rat: '4.7', rev: '430', sold: '1.2k', desc: 'Make a statement at your next gala. High-gloss finish and a perfectly balanced heel for elegance without compromising on stability.' },
  { e: '👡', img: 'assets/strappy-sandals.jpg', name: 'Strappy Sandals', shop: 'Havaianas', tag: 'Sandals', price: 1500, orig: 1700, disc: '-10%', rat: '4.5', rev: '1.2k', sold: '5.2k', desc: 'Lightweight, beach-ready, and effortlessly stylish. Features durable rubber straps and our signature cushioned sole.' },
  { e: '👟', img: 'assets/old-school.jpg', name: 'Old Skool', shop: 'Vans Retro', tag: 'Sneakers', price: 3800, orig: 4500, disc: '-15%', rat: '4.9', rev: '890', sold: '12.4k', desc: 'The first to bare the iconic sidestripe. Suede and canvas uppers, re-enforced toe caps, and signature rubber waffle outsoles.' },
  { e: '🥾', img: 'assets/merrell-moab-3.jpg', name: 'Merrell Moab 3', shop: 'Trail & Trek PH', tag: 'Hiking', price: 7200, orig: 8500, disc: '-15%', rat: '4.9', rev: '520', sold: '3.8k', desc: 'Legendary hiking performance. Waterproof leather upper, Vibram TC5+ outsole, and M-Select DRY technology to keep your feet dry on every trail.' },
  { e: '👟', img: 'assets/classic-clog.jpg', name: 'Classic Clog', shop: 'Crocs PH', tag: 'Clogs', price: 1800, orig: 2200, disc: '-18%', rat: '4.6', rev: '2.3k', sold: '9.1k', desc: 'The iconic slip-on that started it all. Lightweight, odor-resistant, and available in a rainbow of colors. Your feet will thank you.' },
  { e: '👟', img: 'shoebedoo_logo_transparent_v1_1774746100465.png', name: 'Slides Deluxe', shop: 'Havaianas', tag: 'Flip Flops', price: 650, orig: 850, disc: '-24%', rat: '4.4', rev: '1.8k', sold: '7.2k', desc: 'Premium flip flops with extra cushioning for all-day comfort at the beach, pool, or just relaxing at home.' }
];
const shops = { "Nike Central": 0, "Adidas Heritage": 1, "Converse Store": 2, "Aldo Men": 3, "Rugged Footwear": 4 };

let curItem = 0, qty = 1, cart = [], favDetailed = false, voucherApplied = { shopee: false, shop: false }, coinsOn = false;

// ═══════════ NAVIGATION ═══════════
let navStack = [];

function toggleLogoutModal(show) {
  const modal = document.getElementById('logout-modal');
  if (modal) {
    if (show) {
      modal.style.display = 'flex';
      setTimeout(() => modal.classList.add('show'), 10);
    } else {
      modal.classList.remove('show');
      setTimeout(() => modal.style.display = 'none', 300);
    }
  }
}

function go(id, push = true) {
  console.log('Navigating to:', id, 'Push:', push);
  const next = document.getElementById(id);
  if (!next) {
    console.error('Target screen not found:', id);
    return;
  }

  const allScreens = document.querySelectorAll('.screen');
  const activeScreens = document.querySelectorAll('.screen.active');
  const prev = activeScreens.length > 0 ? activeScreens[0] : null;

  if (next === prev) return;

  // Push to stack if not a root navigation or if specified
  if (push && prev && prev.id !== id) {
    // Only push if not already at the top of the stack
    if (navStack.length === 0 || navStack[navStack.length - 1] !== prev.id) {
       navStack.push(prev.id);
    }
  }

  // Deactivate all screens first (hard reset)
  allScreens.forEach(s => s.classList.remove('active'));

  // Activate next
  next.classList.add('active');
  next.scrollTop = 0;

  // Global Nav Visibility
  const gNav = document.getElementById('global-nav');
  const showNav = ['s-home', 's-explore', 's-cart', 's-orders', 's-me'].includes(id);
  if (gNav) {
    gNav.style.display = showNav ? 'flex' : 'none';
  }

  // Toggle Modal off if switching screens
  toggleLogoutModal(false);

  // Sync Nav Highlights
  document.querySelectorAll('.ni, .dnav-link').forEach(el => el.classList.remove('on', 'active'));
  if (showNav) {
    const map = { 's-home': 'ni-home', 's-explore': 'ni-explore', 's-cart': 'ni-cart', 's-orders': 'ni-orders', 's-me': 'ni-me' };
    const ni = document.getElementById(map[id]);
    if (ni) ni.classList.add('on');
  }

  // Desktop Nav Highlight
  document.querySelectorAll('.dnav-link').forEach(el => {
    const onclk = el.getAttribute('onclick') || '';
    if (onclk && onclk.includes(`go('${id}')`)) el.classList.add('active');
  });

  if (id === 's-cart') renderCart();
  if (id === 's-detail') renderDetail();
}

function back() {
  console.log('Back button clicked. Stack:', navStack);
  if (navStack.length > 0) {
    const prevId = navStack.pop();
    go(prevId, false);
  } else {
    // Fallback to home if stack is empty
    go('s-home', false);
  }
}

// ═══════════ CATEGORY FILTER ═══════════
let currentCatItems = [];

function renderCatGrid(items) {
  const grid = document.getElementById('cat-grid');
  const count = document.getElementById('cat-result-count');
  if (!grid) return;

  if (count) count.textContent = `${items.length} item${items.length !== 1 ? 's' : ''} found`;

  if (items.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:40px 20px;color:var(--txt2)">
      <div style="font-size:48px;margin-bottom:12px">👟</div>
      <div style="font-size:14px;font-weight:700;color:var(--txt)">No items found</div>
      <div style="font-size:12px;margin-top:4px">Try a different search or category.</div>
    </div>`;
    return;
  }

  grid.innerHTML = items.map(p => {
    const idx = products.indexOf(p);
    const disc = Math.round((1 - p.price / p.orig) * 100);
    const badge = p.tag === 'Running' ? `<div class="pc-badge"><span class="tag-pill tag-hot">🔥 Hot</span></div>` :
      p.tag === 'Sandals' || p.tag === 'Flip Flops' ? `<div class="pc-badge"><span class="tag-pill tag-free">🚚 Free Del</span></div>` :
        p.tag === 'Hiking' || p.tag === 'Clogs' ? `<div class="pc-badge"><span class="tag-pill tag-new">✨ New</span></div>` : '';
    return `
      <div class="pc" onclick="selItem(${idx});go('s-detail')">
        ${badge}
        <div class="pc-img" style="background:var(--surf2)">
          ${p.img ? `<img src="${p.img}" style="width:100%;height:100%;object-fit:contain">` : p.e}
          <div class="pc-fav" onclick="event.stopPropagation();toggleFav(this)">🤍</div>
        </div>
        <div class="pc-body">
          <div class="pc-name">${p.name}</div>
          <div class="pc-shop">🏪 ${p.shop} <span style="color:var(--txt3)">·</span> <span class="pc-stars">★</span> ${p.rat}</div>
          <div class="pc-cat-tag">${p.tag}</div>
          <div class="pc-sold">${p.sold} sold</div>
          <div class="pc-price-row">
            <div>
              <div class="pc-price">₱${p.price.toLocaleString()}</div>
              <div class="pc-orig">₱${p.orig.toLocaleString()} <span class="pc-disc">-${disc}%</span></div>
            </div>
            <button class="pc-add" onclick="event.stopPropagation();quickAdd(${idx})">+</button>
          </div>
        </div>
      </div>`;
  }).join('');
}

function filterCategory(cat, el) {
  // Highlight active category on home
  document.querySelectorAll('.cat-item').forEach(c => c.classList.remove('active-cat'));
  el.classList.add('active-cat');

  if (cat === 'All') return; // 'All' stays on home screen

  // Set category screen title
  const title = document.getElementById('cat-screen-title');
  const searchInput = document.getElementById('cat-search-input');
  if (title) title.textContent = cat;
  if (searchInput) searchInput.value = '';

  // Store filtered items globally for search
  currentCatItems = products.filter(p => p.tag === cat);

  // Render grid
  renderCatGrid(currentCatItems);

  // Navigate to category screen
  go('s-category');
}

function filterCatSearch(query) {
  const q = query.trim().toLowerCase();
  const filtered = q
    ? currentCatItems.filter(p => p.name.toLowerCase().includes(q) || p.shop.toLowerCase().includes(q))
    : currentCatItems;
  renderCatGrid(filtered);
}

// ═══════════ PRODUCT DETAIL ═══════════
function selItem(idx) { curItem = idx; qty = 1; favDetailed = false }
function renderDetail() {
  const p = products[curItem];
  const imgWrap = document.getElementById('pd-emoji');
  if (p.img) {
    imgWrap.innerHTML = `<img src="${p.img}" style="width:100%;height:100%;object-fit:contain">`;
  } else {
    imgWrap.textContent = p.e;
  }
  document.getElementById('pd-price').textContent = '₱' + p.price;
  document.getElementById('pd-orig').textContent = '₱' + p.orig;
  document.getElementById('pd-disc').textContent = p.disc;
  document.getElementById('pd-title').textContent = p.name;
  document.getElementById('pd-rat').textContent = p.rat;
  document.getElementById('pd-rev').textContent = '(' + p.rev + ' reviews)';
  document.getElementById('pd-sold').textContent = p.sold + ' sold';
  document.getElementById('pd-desc').textContent = p.desc;
  document.getElementById('pd-shop').textContent = p.shop;
  document.getElementById('pd-qty').textContent = qty;
  document.getElementById('pd-avg-rat').textContent = p.rat;
  document.getElementById('pd-total-rev').textContent = p.rev + ' ratings';
  document.getElementById('pd-fav').textContent = favDetailed ? '❤️' : '🤍';
}
function chgQty(d) { qty = Math.max(1, qty + d); document.getElementById('pd-qty').textContent = qty }
function selVar(el, g) { el.closest('.pd-var-row').querySelectorAll('.var-chip').forEach(c => c.classList.remove('sel')); el.classList.add('sel') }
function toggleFavDetail() { favDetailed = !favDetailed; document.getElementById('pd-fav').textContent = favDetailed ? '❤️' : '🤍'; toast(favDetailed ? '❤️ Added to favorites!' : '🤍 Removed') }
function toggleFav(el) { el.textContent = el.textContent === '🤍' ? '❤️' : '🤍'; toast(el.textContent === '❤️' ? '❤️ Saved!' : '🤍 Removed') }
function atcAction() {
  const p = products[curItem];
  const ex = cart.find(c => c.id === curItem);
  if (ex) ex.qty += qty; else cart.push({ id: curItem, qty, shop: p.shop });
  updateCartBadges();
  toast('🛒 ' + p.name + ' added to cart!');
  go('s-cart');
}
function buyNowAction() {
  const p = products[curItem];
  cart = [{ id: curItem, qty, shop: p.shop }];
  updateCartBadges();
  go('s-cart');
}
function quickAdd(idx) {
  const ex = cart.find(c => c.id === idx);
  if (ex) ex.qty += 1; else cart.push({ id: idx, qty: 1, shop: products[idx].shop });
  updateCartBadges();
  toast('🛒 ' + products[idx].name + ' added!');
}

// ═══════════ CART ═══════════
function updateCartBadges() {
  const total = cart.reduce((a, c) => a + c.qty, 0);
  ['hdr-cart-badge', 'global-bnav-badge'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.textContent = total;
      el.style.display = total > 0 ? 'flex' : 'none';
    }
  });
}
function renderCart() {
  const empty = document.getElementById('cart-empty-state');
  const content = document.getElementById('cart-content');
  const container = document.getElementById('cart-items-container');
  updateCartBadges();
  document.getElementById('cart-item-count').textContent = cart.reduce((a, c) => a + c.qty, 0) + ' items';
  if (cart.length === 0) { empty.style.display = 'flex'; content.style.display = 'none'; return }
  empty.style.display = 'none'; content.style.display = 'block';
  // Group by shop
  const groups = {};
  cart.forEach((c, i) => { if (!groups[c.shop]) groups[c.shop] = []; groups[c.shop].push({ ...c, idx: i }) });
  container.innerHTML = '';
  Object.entries(groups).forEach(([shop, items]) => {
    let itemsHTML = items.map(c => {
      const p = products[c.id];
      return `<div class="cart-item-row">
        <div class="ci-check chk">✓</div>
        <div class="ci-img">
          ${p.img ? `<img src="${p.img}" style="width:100%;height:100%;object-fit:contain">` : p.e}
        </div>
        <div class="ci-info">
          <div class="ci-name">${p.name}</div>
          <div class="ci-var">${p.tag} · Medium</div>
          <div class="ci-bottom">
            <div class="ci-price" id="ci-price-${c.idx}">₱${(p.price * c.qty).toLocaleString()}</div>
            <div class="ci-qty-row">
              <div class="cq-btn" onclick="cqty(${c.idx},-1)">−</div>
              <div class="cq-n" id="cqn-${c.idx}">${c.qty}</div>
              <div class="cq-btn" onclick="cqty(${c.idx},1)">+</div>
            </div>
          </div>
        </div>
        <div class="ci-del" onclick="crem(${c.idx})">✕</div>
      </div>
      <div style="padding:8px 14px 10px;border-top:1px dashed var(--surf3)">
        <input style="background:transparent;border:none;color:var(--txt2);font-size:11px;font-family:var(--fb);outline:none;width:100%" placeholder="📝 Message to seller (optional)" />
      </div>`;
    }).join('');
    container.innerHTML += `<div class="cart-seller-group">
      <div class="csg-header">
        <div class="csg-check chk">✓</div>
        <span style="font-size:15px">🏪</span>
        <div class="csg-shop-name">${shop}</div>
        <div class="csg-chat" onclick="toast('💬 Chatting with ${shop}...')">Chat</div>
      </div>
      ${itemsHTML}
    </div>`;
  });
  updateSummary();
}
function cqty(idx, d) {
  cart[idx].qty = Math.max(1, cart[idx].qty + d);
  const p = products[cart[idx].id];
  document.getElementById('cqn-' + idx).textContent = cart[idx].qty;
  document.getElementById('ci-price-' + idx).textContent = '₱' + (p.price * cart[idx].qty).toLocaleString();
  updateCartBadges(); updateSummary();
}
function crem(idx) { cart.splice(idx, 1); renderCart() }
function updateSummary() {
  const sub = cart.reduce((a, c) => a + products[c.id].price * c.qty, 0);
  const cnt = cart.reduce((a, c) => a + c.qty, 0);

  // Cart summary
  const cartLbl = document.getElementById('cart-items-lbl');
  if (cartLbl) cartLbl.textContent = cnt + ' item' + (cnt !== 1 ? 's' : '') + ' selected';
  const cartTot = document.getElementById('cart-total-val');
  if (cartTot) cartTot.textContent = '₱' + sub.toLocaleString();

  // Checkout summary
  const vou = voucherApplied.shopee ? Math.round(sub * .20) : 0;
  const coins = coinsOn ? 12 : 0;
  const total = Math.max(0, sub - vou - coins);

  const osSub = document.getElementById('os-sub');
  if (osSub) {
    osSub.textContent = '₱' + sub.toLocaleString();
    document.getElementById('os-vou').textContent = '−₱' + vou;
    document.getElementById('os-coins').textContent = '−₱' + coins;
    document.getElementById('os-total').textContent = '₱' + total.toLocaleString();
  }

  const cbLbl = document.getElementById('cb-items-lbl');
  if (cbLbl) {
    cbLbl.textContent = cnt + ' item' + (cnt !== 1 ? 's' : '') + ' selected';
    document.getElementById('cb-total-val').textContent = '₱' + total.toLocaleString();
    document.getElementById('cb-btn-total').textContent = total.toLocaleString();
  }

  window._lastSub = sub; window._lastDisc = vou + coins; window._lastTotal = total;
}

function goCheckout() {
  if (cart.length === 0) { toast('🛒 Your cart is empty!'); return; }

  const cont = document.getElementById('checkout-items-summary');
  let h = '<div style="font-family:var(--fh);font-size:14px;font-weight:700;color:var(--txt);margin-bottom:8px;border-bottom:1px solid var(--surf3);padding-bottom:8px;">Order Summary</div>';
  cart.forEach((c) => {
    const p = products[c.id];
    const itemImg = p.img ? `<img src="${p.img}" style="width:28px;height:28px;object-fit:contain">` : `<div style="font-size:18px;">${p.e}</div>`;
    h += `<div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;font-size:13px;border-bottom:1px dashed var(--surf3);"><div style="display:flex;align-items:center;gap:10px;">${itemImg}<div><div style="color:var(--txt);font-weight:600;">${p.name}</div><div style="font-size:11px;color:var(--txt2);">Qty: ${c.qty}</div></div></div><div style="color:var(--txt);font-weight:700;">₱${(p.price * c.qty).toLocaleString()}</div></div>`;
  });
  if (cont) cont.innerHTML = h;

  updateSummary();
  go('s-checkout');
}
function applyVoucher(type) {
  if (type === 'shopee') {
    voucherApplied.shopee = !voucherApplied.shopee;
    document.getElementById('qb-vou-val').textContent = voucherApplied.shopee ? '-20% applied' : 'Select';
    document.getElementById('qb-vou-val').style.color = voucherApplied.shopee ? 'var(--green)' : 'var(--acc)';
    toast(voucherApplied.shopee ? '🎟️ SHOEBEE20 applied! -20% off' : '🎟️ Voucher removed');
  } else {
    voucherApplied.shop = !voucherApplied.shop;
    document.getElementById('shop-vou-val').textContent = voucherApplied.shop ? 'FREE DEL applied' : 'Select';
    document.getElementById('shop-vou-val').style.color = voucherApplied.shop ? 'var(--green)' : 'var(--acc)';
    toast(voucherApplied.shop ? '🏪 Free delivery voucher applied!' : '🏪 Voucher removed');
  }
  updateSummary();
}
function toggleCoins() {
  const tog = document.getElementById('coin-tog');
  coinsOn = !coinsOn;
  tog.classList.toggle('on', coinsOn);
  toast(coinsOn ? '🪙 240 coins applied! (-₱12)' : '🪙 Coins unselected');
  updateSummary();
}
function selPay(el) { document.querySelectorAll('.pay-opt').forEach(o => o.classList.remove('sel')); el.classList.add('sel') }
function placeOrder() {
  if (cart.length === 0) { toast('🛒 Your cart is empty!'); return }
  const cnt = cart.reduce((a, c) => a + c.qty, 0);
  document.getElementById('suc-items').textContent = cnt + ' item' + (cnt !== 1 ? 's' : '');
  document.getElementById('suc-disc').textContent = '−₱' + (window._lastDisc || 0).toLocaleString();
  document.getElementById('suc-total').textContent = '₱' + (window._lastTotal || 0).toLocaleString();
  cart = []; updateCartBadges();
  go('s-success');
}
function resetCart() { cart = []; voucherApplied = { shopee: false, shop: false }; coinsOn = false; updateCartBadges() }

// ═══════════ ORDERS ═══════════
function setOTab(el, id) {
  document.querySelectorAll('.ot').forEach(t => t.classList.remove('on'));
  el.classList.add('on');
  ['topay', 'toship', 'toreceive', 'torate', 'complete'].forEach(t => {
    const el2 = document.getElementById('tab-' + t);
    if (el2) el2.style.display = t === id ? 'block' : 'none';
  });
}

function switchOrderTab(id) {
  go('s-orders');
  const tabs = document.querySelectorAll('.ot');
  tabs.forEach(t => {
    if (t.getAttribute('onclick')?.includes(`'${id}'`)) {
      setOTab(t, id);
    }
  });
}
function confirmReceipt() { toast('✅ Receipt confirmed! Payment released. Please rate your order.'); setTimeout(() => go('s-rate'), 600) }

// ═══════════ RATE ═══════════
const starLabels = ['', 'Terrible 😤', 'Poor 😕', 'Okay 😐', 'Good 😊', 'Excellent! 🤩'];
function setStars(groupId, n) {
  const group = document.getElementById(groupId);
  group.querySelectorAll('.big-star,.s-star').forEach((s, i) => { s.classList.toggle('on', i < n) });
  const lbl = document.getElementById(groupId + '-lbl');
  if (lbl) lbl.textContent = starLabels[n] || '';
}
function submitReview() {
  toast('⭐ Review submitted! Thank you. +5 coins earned 🪙');
  setTimeout(() => go('s-home'), 800);
}


// ═══════════ TOAST ═══════════
let toastTimer;
function toast(msg) {
  const el = document.getElementById('toast-el');
  document.getElementById('toast-msg').textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
}

// Init
function renderExploreGrid() {
  const container = document.getElementById('explore-grid');
  if (!container) return;
  let html = '';
  products.forEach((p, i) => {
    html += `
        <div class="pc" onclick="selItem(${i});go('s-detail')">
          <div class="pc-img" style="background:var(--surf2)">
            ${p.img ? `<img src="${p.img}" />` : p.e}
            <div class="pc-fav" onclick="event.stopPropagation();toggleFav(this)">🤍</div>
          </div>
          <div class="pc-body">
            <div class="pc-name">${p.name}</div>
            <div class="pc-shop">🏪 ${p.shop} <span style="color:var(--txt3)">·</span> <span class="pc-stars">★</span> ${p.rat}</div>
            <div class="pc-sold">${p.sold} sold</div>
            <div class="pc-price-row"><div><div class="pc-price">₱${p.price}</div><div class="pc-orig">₱${p.orig}</div></div><button class="pc-add" onclick="event.stopPropagation();quickAdd(${i})">+</button></div>
          </div>
        </div>
    `;
  });
  container.innerHTML = html;
}

renderDetail();
renderExploreGrid();
function resetCart() {
  cart = [];
  renderCart();
  toast('Cart reset successfully.');
}
go('s-login', false);

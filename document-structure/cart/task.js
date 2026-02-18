const cartProducts = document.querySelector('.cart__products');
const cartTitle = document.querySelector('.cart__title');
const products = document.querySelectorAll('.product');

function updateCartVisibility() {
  const cartItems = document.querySelectorAll('.cart__product');
  const cart = document.querySelector('.cart');
  
  if (cartItems.length === 0) {
    cart.style.display = 'none';
  } else {
    cart.style.display = 'block';
  }
}

function loadCart() {
  const savedCart = localStorage.getItem('cart');
  
  if (savedCart) {
    const cartItems = JSON.parse(savedCart);
    cartItems.forEach(item => {
      const cartProduct = document.createElement('div');
      cartProduct.className = 'cart__product';
      cartProduct.dataset.id = item.id;
      
      const cartImage = document.createElement('img');
      cartImage.className = 'cart__product-image';
      cartImage.src = item.image;
      
      const cartCount = document.createElement('div');
      cartCount.className = 'cart__product-count';
      cartCount.textContent = item.count;
      
      const cartRemove = document.createElement('a');
      cartRemove.href = '#';
      cartRemove.className = 'cart__product-remove';
      cartRemove.innerHTML = '&times;';
      cartRemove.style.cssText = 'position: absolute; top: -10px; right: -10px; color: red; font-size: 20px; text-decoration: none; cursor: pointer;';
      
      cartRemove.addEventListener('click', (event) => {
        event.preventDefault();
        cartProduct.remove();
        saveCart();
        updateCartVisibility();
      });
      
      cartProduct.appendChild(cartImage);
      cartProduct.appendChild(cartCount);
      cartProduct.appendChild(cartRemove);
      cartProducts.appendChild(cartProduct);
    });
  }
  
  updateCartVisibility();
}

function saveCart() {
  const cartItems = [];
  const cartProductsElements = document.querySelectorAll('.cart__product');
  
  cartProductsElements.forEach(item => {
    cartItems.push({
      id: item.dataset.id,
      image: item.querySelector('.cart__product-image').src,
      count: parseInt(item.querySelector('.cart__product-count').textContent)
    });
  });
  
  localStorage.setItem('cart', JSON.stringify(cartItems));
}

function animateProduct(productImage, cartImage) {
  const productRect = productImage.getBoundingClientRect();
  const cartRect = cartImage.getBoundingClientRect();
  
  const clone = productImage.cloneNode();
  clone.classList.add('product-shadow');
  clone.style.cssText = `
    position: fixed;
    top: ${productRect.top}px;
    left: ${productRect.left}px;
    width: ${productRect.width}px;
    height: ${productRect.height}px;
    z-index: 1000;
    transition: all 0.8s ease-in-out;
  `;
  
  document.body.appendChild(clone);
  
  setTimeout(() => {
    clone.style.top = `${cartRect.top}px`;
    clone.style.left = `${cartRect.left}px`;
    clone.style.width = `${cartRect.width}px`;
    clone.style.height = `${cartRect.height}px`;
    clone.style.opacity = '0.5';
  }, 10);
  
  setTimeout(() => {
    clone.remove();
  }, 900);
}

products.forEach(product => {
  const productId = product.dataset.id;
  const productImage = product.querySelector('.product__image');
  const productQuantityValue = product.querySelector('.product__quantity-value');
  const productQuantityDec = product.querySelector('.product__quantity-control_dec');
  const productQuantityInc = product.querySelector('.product__quantity-control_inc');
  const productAdd = product.querySelector('.product__add');
  
  productQuantityDec.addEventListener('click', () => {
    let currentValue = parseInt(productQuantityValue.textContent);
    if (currentValue > 1) {
      productQuantityValue.textContent = currentValue - 1;
    }
  });
  
  productQuantityInc.addEventListener('click', () => {
    let currentValue = parseInt(productQuantityValue.textContent);
    productQuantityValue.textContent = currentValue + 1;
  });
  
  productAdd.addEventListener('click', (event) => {
    event.preventDefault();
    
    const quantity = parseInt(productQuantityValue.textContent);
    const existingCartItem = document.querySelector(`.cart__product[data-id="${productId}"]`);
    
    if (existingCartItem) {
      const cartCount = existingCartItem.querySelector('.cart__product-count');
      const currentCount = parseInt(cartCount.textContent);
      cartCount.textContent = currentCount + quantity;
      
      const cartImage = existingCartItem.querySelector('.cart__product-image');
      animateProduct(productImage, cartImage);
    } else {
      const cartProduct = document.createElement('div');
      cartProduct.className = 'cart__product';
      cartProduct.dataset.id = productId;
      
      const cartImage = document.createElement('img');
      cartImage.className = 'cart__product-image';
      cartImage.src = productImage.src;
      
      const cartCount = document.createElement('div');
      cartCount.className = 'cart__product-count';
      cartCount.textContent = quantity;
      
      const cartRemove = document.createElement('a');
      cartRemove.href = '#';
      cartRemove.className = 'cart__product-remove';
      cartRemove.innerHTML = '&times;';
      cartRemove.style.cssText = 'position: absolute; top: -10px; right: -10px; color: red; font-size: 20px; text-decoration: none; cursor: pointer;';
      
      cartRemove.addEventListener('click', (event) => {
        event.preventDefault();
        cartProduct.remove();
        saveCart();
        updateCartVisibility();
      });
      
      cartProduct.appendChild(cartImage);
      cartProduct.appendChild(cartCount);
      cartProduct.appendChild(cartRemove);
      cartProducts.appendChild(cartProduct);
      
      animateProduct(productImage, cartImage);
    }
    
    saveCart();
    updateCartVisibility();
    
    productQuantityValue.textContent = 1;
  });
});

loadCart();
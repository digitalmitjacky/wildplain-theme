// Wildplain Theme JS

// Mobile Menu Toggle
(function() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    if (!hamburger || !mobileMenu) return;
    hamburger.addEventListener('click', function() {
          const isOpen = this.getAttribute('aria-expanded') === 'true';
          this.setAttribute('aria-expanded', String(!isOpen));
          if (isOpen) {
                  mobileMenu.hidden = true;
                  mobileMenu.removeAttribute('aria-expanded');
          } else {
                  mobileMenu.hidden = false;
                  mobileMenu.setAttribute('aria-expanded', 'true');
          }
    });
})();

// Cart count update
(function() {
    fetch('/cart.js')
      .then(r => r.json())
      .then(cart => {
              const el = document.querySelector('.cart-count');
              if (el) el.textContent = cart.item_count;
      })
      .catch(() => {});
})();

// Add to Cart
document.querySelectorAll('.btn-add-to-cart').forEach(function(btn) {
    btn.addEventListener('click', function() {
          const variantId = this.dataset.variantId;
          if (!variantId) return;
          const original = this.textContent;
          this.textContent = 'Wird hinzugefügt...';
          this.disabled = true;
          fetch('/cart/add.js', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ id: variantId, quantity: 1 })
          })
          .then(r => r.json())
          .then(() => {
                  this.textContent = 'Hinzugefügt ✓';
                  return fetch('/cart.js');
          })
          .then(r => r.json())
          .then(cart => {
                  const el = document.querySelector('.cart-count');
                  if (el) el.textContent = cart.item_count;
                  setTimeout(() => {
                            this.textContent = original;
                            this.disabled = false;
                  }, 1500);
          })
          .catch(() => {
                  this.textContent = original;
                  this.disabled = false;
          });
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
                  e.preventDefault();
                  target.scrollIntoView({ behavior: 'smooth' });
          }
    });
});

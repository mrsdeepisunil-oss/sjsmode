
// SJS Mode - Premium Ecom JS + UPI Payments

// 1. UPI Payment Generator
function generateUPILink(upiId, name, amount, note) {
  return `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;
}

function showUPIPayment(amount, productName) {
  const UPI_ID = "sjsmode@okaxis"; // CHANGE TO YOUR REAL UPI ID
  const MERCHANT_NAME = "SJS Mode";
  const link = generateUPILink(UPI_ID, MERCHANT_NAME, amount, `Payment for ${productName}`);
  
  // Generate QR (using api.qrserver)
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(link)}`;
  
  return { link, qrUrl };
}

// 2. Cart Animation
document.addEventListener('DOMContentLoaded', () => {
  // Add to cart confetti
  const buttons = document.querySelectorAll('[data-testid="stButton"] button');
  buttons.forEach(btn => {
    if(btn.innerText.includes('Add to Cart')) {
      btn.addEventListener('click', () => {
        btn.innerText = '✓ Added!';
        btn.style.background = '#2e7d32 !important';
        setTimeout(() => {
          btn.innerText = 'Add to Cart';
        }, 1500);
        
        // Vibration for mobile
        if(navigator.vibrate) navigator.vibrate(100);
      });
    }
  });
});

// 3. Image Zoom on Hover
function enableImageZoom() {
  const images = document.querySelectorAll('.product-card img');
  images.forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
      window.open(img.src, '_blank');
    });
  });
}

// 4. WhatsApp Order with UPI
function orderOnWhatsAppWithUPI(product, total) {
  const upi = showUPIPayment(total, product);
  const message = `Hi SJS Mode! I want to order:

*${product}*
Total: ₹${total}

Pay via UPI: ${upi.link}

QR: ${upi.qrUrl}`;
  const waUrl = `https://wa.me/917299615915?text=${encodeURIComponent(message)}`;
  window.open(waUrl, '_blank');
}

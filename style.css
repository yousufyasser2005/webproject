// Header scroll effect
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 100) {
        header.classList.add('header-scrolled');
      } else {
        header.classList.remove('header-scrolled');
      }
    });
  }
}

// Handle book cover images for consistent sizing
function handleBookCovers() {
  const bookCovers = document.querySelectorAll('.book-cover img');
  
  bookCovers.forEach(img => {
    // Force consistent sizing
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    img.style.objectPosition = 'center';
    
    img.addEventListener('error', function() {
      this.style.display = 'none';
      const placeholder = this.parentElement.querySelector('.book-cover-placeholder');
      if (placeholder) {
        placeholder.style.display = 'flex';
      }
    });
    
    // Check if image loaded successfully
    if (img.complete && img.naturalHeight === 0) {
      img.style.display = 'none';
      const placeholder = img.parentElement.querySelector('.book-cover-placeholder');
      if (placeholder) {
        placeholder.style.display = 'flex';
      }
    }
  });
}

// Contact form handler
function handleContact(e){
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const msgEl = document.getElementById('formMsg');

  if(!name || !email || !message){
    msgEl.style.color = 'var(--error)';
    msgEl.textContent = 'Please fill all the fields.';
    return false;
  }

  // Success message
  msgEl.style.color = 'var(--success)';
  msgEl.textContent = 'We received your message! Expect a response soon.';
  
  // Reset form
  document.getElementById('contactForm').reset();

  // Remove message after 4 seconds
  setTimeout(() => { 
    msgEl.textContent = ''; 
  }, 4000);

  return false;
}

// Initialize everything when DOM loads
document.addEventListener('DOMContentLoaded', function() {
  initTheme();
  initHeaderScroll();
  handleBookCovers();
  
  // Add app wrapper to all pages
  const appWrapper = document.createElement('div');
  appWrapper.className = 'app';
  while (document.body.firstChild) {
    appWrapper.appendChild(document.body.firstChild);
  }
  document.body.appendChild(appWrapper);
  
  // Add active class to current page navigation
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
});


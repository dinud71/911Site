// Change header background on scroll
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  header.classList.toggle('scrolled', window.scrollY > 50);
});

// Adjust banner if main heading wraps
(() => {
  const heading = document.querySelector('.main-heading');
  const bannerContent = document.querySelector('.banner-content');
  if (!heading || !bannerContent) return;

  const getLineCount = el => {
    const style = window.getComputedStyle(el);
    const lineHeight = parseFloat(style.lineHeight) || parseFloat(style.fontSize) * 1.2;
    return Math.round(el.scrollHeight / lineHeight);
  };

  const initialLines = getLineCount(heading);

  const checkWrap = () => {
    bannerContent.classList.toggle('shift-up', getLineCount(heading) > initialLines);
  };

  const debounce = (fn, t) => {
    let timer;
    return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), t); };
  };

  window.addEventListener('resize', debounce(checkWrap, 120));
  window.addEventListener('load', () => {
    if (document.fonts?.ready) document.fonts.ready.then(checkWrap).catch(checkWrap);
    else checkWrap();
  });
  new ResizeObserver(checkWrap).observe(heading);
})();

(function () {
  const menuToggle = document.getElementById('menuToggle');
  const overlayMenu = document.getElementById('overlayMenu');
  const overlayClose = document.getElementById('overlayClose');
  const overlayLinks = overlayMenu.querySelectorAll('.overlay-content a');

  if (!menuToggle || !overlayMenu || !overlayClose) return;

  // Open overlay on hamburger click
  menuToggle.addEventListener('click', () => {
    overlayMenu.classList.add('active');
    overlayMenu.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
  });

  // Close overlay on close button click
  overlayClose.addEventListener('click', () => {
    overlayMenu.classList.remove('active');
    overlayMenu.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
  });

  // Close if clicking outside content
  overlayMenu.addEventListener('click', (e) => {
    if (e.target === overlayMenu) {
      overlayMenu.classList.remove('active');
      overlayMenu.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('no-scroll');
    }
  });

  // Optional: close when any link is clicked
  overlayLinks.forEach(link => {
    link.addEventListener('click', () => {
      overlayMenu.classList.remove('active');
      overlayMenu.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('no-scroll');
    });
  });
})();

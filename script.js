// Mobile nav toggle & dropdown
(function(){
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('nav-links');
  if (burger) {
    burger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }
  const dropdown = document.querySelector('.dropdown');
  const toggle = document.querySelector('.dropdown-toggle');
  if (dropdown && toggle) {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      dropdown.classList.toggle('open');
    });
    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target)) dropdown.classList.remove('open');
    });
  }
})();

// Print current page
function printPage(){ window.print(); }

// Save section as image using html2canvas
async function saveSectionAsImage(selector = '#day-content', filename = 'diet-day.png'){
  const el = document.querySelector(selector);
  if (!el) return alert('未找到可保存的内容区域');
  const canvas = await html2canvas(el, { scale: 2, useCORS: true });
  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

// Ingredients checklist with localStorage persistence
(function(){
  const KEY = 'diet_ingredients_checked';
  const container = document.querySelector('.checklist');
  if (!container) return; // only on ingredients page

  const saved = JSON.parse(localStorage.getItem(KEY) || '{}');
  container.querySelectorAll('input[type="checkbox"]').forEach(chk => {
    const id = chk.getAttribute('data-id') || chk.id;
    if (saved[id]) chk.checked = true;
    chk.addEventListener('change', () => {
      saved[id] = chk.checked;
      localStorage.setItem(KEY, JSON.stringify(saved));
    });
  });

  const clearBtn = document.getElementById('clear-checked');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      container.querySelectorAll('input[type="checkbox"]').forEach(chk => chk.checked = false);
      localStorage.removeItem(KEY);
    });
  }
})();

// Utility: set active nav
(function(){
  const path = location.pathname.toLowerCase();
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href && path.endsWith(href.toLowerCase())) {
      a.style.borderColor = '#cbd5e1';
      a.style.background = 'rgba(124,192,216,0.12)';
    }
  });
})();
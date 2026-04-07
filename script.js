// ============================================
//   PEDRO BUENO — PORTFÓLIO PROFISSIONAL
//   Script Principal
// ============================================

// ===== CURSOR PERSONALIZADO =====
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

if (cursor && follower) {
  document.addEventListener('mousemove', (e) => {
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    follower.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });

  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform += ' scale(1.8)';
      follower.style.transform += ' scale(1.5)';
    });
    el.addEventListener('mouseleave', () => {});
  });
}

// ===== NAVBAR SCROLL =====
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== MENU MOBILE =====
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ===== REVEAL ON SCROLL =====
const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Delay escalonado entre elementos irmãos
      const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, idx * 100);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach(el => observer.observe(el));

// ===== ANIMATE SKILL BARS =====
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

skillFills.forEach(el => skillObserver.observe(el));

// ===== SMOOTH SCROLL LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id], header[id]');
const navLinks = document.querySelectorAll('.nav-link');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => navObserver.observe(s));

// ===== FORMULÁRIO DE CONTATO =====
const form = document.getElementById('form-contato');
const btnSubmit = document.getElementById('btn-submit');
const formStatus = document.getElementById('form-status');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const mensagem = document.getElementById('mensagem').value.trim();

  if (!nome || !email || !mensagem) {
    showStatus('Por favor, preencha todos os campos.', 'error');
    return;
  }

  btnSubmit.disabled = true;
  btnSubmit.querySelector('.btn-text').textContent = 'Enviando...';

  try {
    const response = await fetch('/enviar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, mensagem })
    });

    const data = await response.json();

    if (response.ok) {
      showStatus('✅ Mensagem enviada com sucesso! Retorno em breve.', 'success');
      form.reset();
    } else {
      showStatus(data.error || 'Erro ao enviar. Tente novamente.', 'error');
    }
  } catch (err) {
    // Se o servidor não estiver rodando, sugere contato direto
    showStatus('Erro de conexão. Entre em contato por buenozspe@gmail.com', 'error');
  } finally {
    btnSubmit.disabled = false;
    btnSubmit.querySelector('.btn-text').textContent = 'Enviar mensagem';
  }
});

function showStatus(msg, type) {
  formStatus.textContent = msg;
  formStatus.style.color = type === 'success' ? 'var(--accent)' : '#ff5555';
  setTimeout(() => { formStatus.textContent = ''; }, 6000);
}

// ===== TYPING EFFECT (hero subtitle) =====
const subtitle = document.querySelector('.hero-subtitle');
if (subtitle) {
  const text = subtitle.textContent;
  subtitle.textContent = '';
  subtitle.style.opacity = '1';

  let i = 0;
  const type = () => {
    if (i < text.length) {
      subtitle.textContent += text[i++];
      setTimeout(type, 18);
    }
  };
  // Inicia após 800ms
  setTimeout(type, 800);
}

// ===== COUNTER ANIMATION (stats) =====
const statNums = document.querySelectorAll('.stat-num');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const text = el.textContent;
      const num = parseFloat(text);
      if (!isNaN(num)) {
        let start = 0;
        const end = num;
        const suffix = text.replace(/[\d.]/g, '');
        const duration = 1200;
        const step = 16;
        const increment = end / (duration / step);
        const counter = setInterval(() => {
          start += increment;
          if (start >= end) {
            el.textContent = end + suffix;
            clearInterval(counter);
          } else {
            el.textContent = Math.floor(start) + suffix;
          }
        }, step);
      }
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

statNums.forEach(el => counterObserver.observe(el));

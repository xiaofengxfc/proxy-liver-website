/**
 * 鸣潮代肝 — Main JS
 */
document.addEventListener('DOMContentLoaded', () => {

  // ========== Scroll Nav ==========
  const nav = document.querySelector('nav');
  const observer = new IntersectionObserver(
    ([e]) => nav.classList.toggle('scrolled', !e.isIntersecting),
    { rootMargin: '-60px 0px 0px' }
  );
  const hero = document.querySelector('.hero');
  if (hero) observer.observe(hero);

  // ========== Fade-in on scroll ==========
  const fadeEls = document.querySelectorAll('.fade-in');
  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          fadeObserver.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );
  fadeEls.forEach(el => fadeObserver.observe(el));

  // ========== FAQ accordion ==========
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // ========== Smooth scroll for nav links ==========
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ========== Pricing CTA → scroll contact ==========
  document.querySelectorAll('.pricing-card .btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const contact = document.querySelector('#contact');
      if (contact) contact.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // ========== Contact Form → POST → Telegram ==========
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('.btn');
      const original = btn.textContent;

      // 收集表单数据
      const data = {
        name: form.querySelector('#name')?.value?.trim() || '',
        contact: form.querySelector('#contact-input')?.value?.trim() || '',
        service: form.querySelector('#service')?.value || '',
        message: form.querySelector('#message')?.value?.trim() || '',
      };

      if (!data.contact) {
        btn.textContent = '⚠ 请填写联系方式';
        btn.style.background = '#ff4d4f';
        setTimeout(() => {
          btn.textContent = original;
          btn.style.background = '';
        }, 2000);
        return;
      }

      btn.textContent = '⏳ 提交中...';
      btn.style.pointerEvents = 'none';

      try {
        const resp = await fetch('/api/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        const result = await resp.json();

        if (result.ok) {
          btn.textContent = '✓ 已提交 · 客服将尽快联系';
          btn.style.background = '';
          form.reset();
        } else {
          btn.textContent = '✗ ' + (result.error || '提交失败');
          btn.style.background = '#ff4d4f';
        }
      } catch {
        btn.textContent = '✗ 网络错误，请重试';
        btn.style.background = '#ff4d4f';
      }

      setTimeout(() => {
        btn.textContent = original;
        btn.style.background = '';
        btn.style.pointerEvents = '';
      }, 3000);
    });
  }

  // ========== Stat counter animation ==========
  const statEls = document.querySelectorAll('.hero-stat-num');
  const statObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const el = e.target;
          const target = parseInt(el.dataset.target, 10);
          if (!target || el.dataset.counted) return;
          el.dataset.counted = '1';
          const suffix = el.dataset.suffix || '';
          let current = 0;
          const step = Math.ceil(target / 40);
          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            el.textContent = current + suffix;
          }, 30);
        }
      });
    },
    { threshold: 0.5 }
  );
  statEls.forEach(el => statObserver.observe(el));
});

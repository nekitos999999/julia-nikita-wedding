// script.js
document.addEventListener('DOMContentLoaded', () => {
  // --- Обратный отсчёт ---
  const weddingDate = new Date('2026-08-13T12:00:00').getTime();

  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minutesEl = document.getElementById('cd-minutes');
  const secondsEl = document.getElementById('cd-seconds');

  if (daysEl && hoursEl && minutesEl && secondsEl) {
    const countdownInterval = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate - now;

      if (distance < 0) {
        clearInterval(countdownInterval);
        daysEl.textContent = '00';
        hoursEl.textContent = '00';
        minutesEl.textContent = '00';
        secondsEl.textContent = '00';
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      daysEl.textContent = String(days).padStart(2, '0');
      hoursEl.textContent = String(hours).padStart(2, '0');
      minutesEl.textContent = String(minutes).padStart(2, '0');
      secondsEl.textContent = String(seconds).padStart(2, '0');
    }, 1000);
  }

  // --- Плавное появление блоков при скролле ---
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('hidden');
        observer.unobserve(entry.target); // анимируем один раз
      }
    });
  }, observerOptions);

  // Наблюдаем за секциями и футером
  document.querySelectorAll('.section, .footer').forEach(el => observer.observe(el));

  // Кнопка «Открыть приглашение» просто скроллит к контенту
  const openBtn = document.getElementById('open-invite-btn');
  if (openBtn) {
    openBtn.addEventListener('click', () => {
      document.querySelector('#love-story').scrollIntoView({ behavior: 'smooth' });
    });
  }

  // --- Имитация отправки RSVP ---
  const rsvpForm = document.getElementById('rsvp-form');
  if (rsvpForm) {
    rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Блокируем повторную отправку
      const btn = rsvpForm.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = 'Отправляем...';

      // Имитация задержки сети
      setTimeout(() => {
        const successMsg = document.getElementById('rsvp-success');
        if (successMsg) {
          successMsg.classList.remove('hidden');
          window.scrollTo({
            top: successMsg.offsetTop - 100,
            behavior: 'smooth'
          });
        }
        // Сброс формы можно добавить по желанию
      }, 800);
    });
  }
});

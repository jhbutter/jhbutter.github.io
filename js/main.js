document.addEventListener('DOMContentLoaded', () => {

  /* ===== 铅笔 ===== */
  const pencil = document.createElement('div');
  pencil.className = 'pencil';
  pencil.textContent = '✏️';
  document.body.appendChild(pencil);

  let mouseX = -999, mouseY = -999;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    pencil.style.left = (mouseX - 4) + 'px';
    pencil.style.top = (mouseY - 26) + 'px';
  });

  /* ===== 光点粒子系统 ===== */
  let lastSpawn = 0;

  function spawnSparkles(count) {
    const now = Date.now();
    if (now - lastSpawn < 50) return;
    lastSpawn = now;

    const colors = ['#d4a04e', '#e0b85c', '#f5d78e', '#fffaee', '#c67b4a'];

    for (let i = 0; i < count; i++) {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';

      const size = 2.5 + Math.random() * 4.5;
      const offsetX = (Math.random() - 0.5) * 20;
      const offsetY = (Math.random() - 0.5) * 16 + 8;
      const color = colors[Math.floor(Math.random() * colors.length)];

      sparkle.style.cssText = `
        left: ${mouseX + offsetX}px;
        top: ${mouseY + offsetY}px;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        box-shadow: 0 0 ${size * 2}px ${color};
      `;

      document.body.appendChild(sparkle);

      const startTime = performance.now();
      const duration = 600 + Math.random() * 700;
      const driftX = (Math.random() - 0.5) * 50;
      const riseY = -(25 + Math.random() * 55);

      function animateSparkle(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        if (progress >= 1) { sparkle.remove(); return; }

        const eased = 1 - Math.pow(1 - progress, 1.5);
        const x = offsetX + driftX * eased;
        const y = offsetY + riseY * eased;
        const opacity = 1 - Math.pow(progress, 0.8);
        const scale = 1 - progress * 0.3;

        sparkle.style.transform = `translate(${x - offsetX}px, ${y - offsetY}px) scale(${scale})`;
        sparkle.style.opacity = opacity;
        requestAnimationFrame(animateSparkle);
      }
      requestAnimationFrame(animateSparkle);
    }
  }

  /* 移动时不断产生光点 */
  let moveTick = 0;
  document.addEventListener('mousemove', () => {
    moveTick++;
    if (moveTick % 2 === 0) spawnSparkles(1);
  });

  /* ===== 卡片 hover 微倾斜 ===== */
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;
      card.style.setProperty('--rx', `${rotateX}deg`);
      card.style.setProperty('--ry', `${rotateY}deg`);
    });
    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
    });
  });

});

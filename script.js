const cards = document.querySelectorAll('.team-card');
const bubble = document.getElementById('dynamic-desc-box');
const bTitle = document.getElementById('bubble-title');
const bText = document.getElementById('bubble-text');
const container = document.querySelector('.team-grid-container');

cards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    bTitle.textContent = card.getAttribute('data-title');
    bText.textContent = card.getAttribute('data-desc');

    const cardRect = card.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const bubbleWidth = bubble.offsetWidth;

    // Determine if we are on mobile (small screen)
    const isSmallScreen = window.innerWidth <= 768;

    let leftPos;
    if (isSmallScreen) {
      // Center bubble relative to the container/screen
      leftPos = (containerRect.width - bubbleWidth) / 2;
    } else {
      // Desktop: Align bubble start with card start
      leftPos = cardRect.left - containerRect.left;
      // Prevent overflow on right side
      if (leftPos + bubbleWidth > containerRect.width) {
        leftPos = containerRect.width - bubbleWidth;
      }
    }

    // Ensure it doesn't go off the left side
    if (leftPos < 0) leftPos = 0;

    const topPos = (cardRect.top - containerRect.top) + cardRect.height + 20;

    // Calculate Arrow Position relative to the bubble
    const cardCenterInContainer = (cardRect.left - containerRect.left) + (cardRect.width / 2);
    const arrowLeftRel = cardCenterInContainer - leftPos - 20; // 20 is half arrow width

    // Apply Styles
    bubble.style.left = `${leftPos}px`;
    bubble.style.top = `${topPos}px`;
    bubble.style.setProperty('--arrow-left', `${arrowLeftRel}px`);
    
    bubble.classList.add('show');
  });

  card.addEventListener('mouseleave', () => {
    bubble.classList.remove('show');
  });
});

// hover effect - about card
document.querySelectorAll('.about-card').forEach(card => {
  const img = card.querySelector('img');
  const original = img.src;
  const hovered = card.dataset.hoverIcon;

  card.addEventListener('mouseenter', () => img.src = hovered);
  card.addEventListener('mouseleave', () => img.src = original);
});


function toggleMenu() {
  document.querySelector(".nav-links").classList.toggle("active");
}


//carousel button
document.querySelectorAll('.dot').forEach(dot => {
  dot.addEventListener('click', () => {
    const index = parseInt(dot.dataset.index);
    document.querySelectorAll('.carousel-slide').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.dot').forEach(d => d.classList.remove('active'));
    document.querySelectorAll('.carousel-slide')[index].classList.add('active');
    dot.classList.add('active');
  });
});
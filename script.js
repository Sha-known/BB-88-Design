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
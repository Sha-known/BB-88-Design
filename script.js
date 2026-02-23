// team casrds
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
const track = document.getElementById('carouselTrack');
const spotlight = document.getElementById('carouselSpotlight');
const dots = document.querySelectorAll('.dot');
let logoData = Array.from(track.children);

function updateCarousel(targetId, dotIdx) {
    // 1. Reorder Logic 
    const currentIndex = logoData.findIndex(logo => logo.dataset.id == targetId);
    const rotationNeeded = currentIndex - 3; 
    if (rotationNeeded > 0) {
        for (let i = 0; i < rotationNeeded; i++) logoData.push(logoData.shift());
    } else if (rotationNeeded < 0) {
        for (let i = 0; i < Math.abs(rotationNeeded); i++) logoData.unshift(logoData.pop());
    }

    // 2. Refresh DOM and set Active Class
    track.innerHTML = '';
    logoData.forEach((logo, i) => {
        logo.classList.toggle('active', i === 3);
        track.appendChild(logo);
    });

    // 3. Update Dots
    dots.forEach((d, i) => d.classList.toggle('active', i === dotIdx));
}

dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
        const centerLogoId = logoData[idx + 1].dataset.id; 
        updateCarousel(centerLogoId, idx);
    });
});

// Auto-rotate every 3 seconds
setInterval(() => {
    logoData.push(logoData.shift());
    updateCarousel(logoData[3].dataset.id, 2);
}, 3000);

window.onload = () => updateCarousel(logoData[3].dataset.id, 2);

//contactform
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('contactName');
    const emailInput = document.getElementById('contactEmail');
    const subjectInput = document.getElementById('contactSubject');
    const messageInput = document.getElementById('contactMessage');
    const submitBtn = document.getElementById('submitBtn');
    const emailTooltip = document.getElementById('emailTooltip');

    const successModal = document.getElementById('successModal');
    const closeModalBtn = document.getElementById('closeModalBtn');

    function isValidEmail(email) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    }

  
    function validateForm() {
      const emailVal = emailInput.value.trim();
      
      if (emailVal.length > 0) {
        if (!emailVal.includes('@')) {
          emailTooltip.textContent = "Please include an '@' in the email address.";
          emailTooltip.classList.add('show');
        } else if (!isValidEmail(emailVal)) {
          emailTooltip.textContent = "Please enter a complete, valid email.";
          emailTooltip.classList.add('show');
        } else {
          emailTooltip.classList.remove('show');
        }
      } else {
        emailTooltip.classList.remove('show');
      }

      const isNameFilled = nameInput.value.trim() !== '';
      const isSubjectFilled = subjectInput.value.trim() !== '';
      const isMessageFilled = messageInput.value.trim() !== '';
      const isEmailValid = isValidEmail(emailVal);

      if (isNameFilled && isSubjectFilled && isMessageFilled && isEmailValid) {
        submitBtn.disabled = false;
      } else {
        submitBtn.disabled = true;
      }
    }

    nameInput.addEventListener('input', validateForm);
    emailInput.addEventListener('input', validateForm);
    subjectInput.addEventListener('input', validateForm);
    messageInput.addEventListener('input', validateForm);

    contactForm.addEventListener('submit', function(e) {
      e.preventDefault(); 

      successModal.style.display = 'flex';

      contactForm.reset();

      submitBtn.disabled = true;
    });

    closeModalBtn.addEventListener('click', function() {
      successModal.style.display = 'none';
    });

    window.addEventListener('click', function(e) {
      if (e.target === successModal) {
        successModal.style.display = 'none';
      }
    });
  });


  //for nav
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-main-links a');
    
    window.addEventListener('scroll', () => {
      let currentSectionId = '';

      navLinks.forEach(link => {
        const sectionId = link.getAttribute('href').substring(1); 
        const section = document.getElementById(sectionId);

        if (section) {
          const sectionTop = section.offsetTop;
          if (window.scrollY >= sectionTop - 150) {
            currentSectionId = sectionId;
          }
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    });
  });
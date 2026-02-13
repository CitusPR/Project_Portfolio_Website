// script.js (neu)

document.addEventListener("DOMContentLoaded", () => {
  // ===== Mobile Menu =====
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector("nav ul");
  const menuIcon = menuToggle?.querySelector("i");

  if (menuToggle && navMenu && menuIcon) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      menuIcon.classList.toggle("fa-bars");
      menuIcon.classList.toggle("fa-times");
    });

    document.querySelectorAll("nav ul li a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        menuIcon.classList.add("fa-bars");
        menuIcon.classList.remove("fa-times");
      });
    });
  }

  // ===== Typewriter (ohne Zeilensprung) =====
  const texts = [
    "Aspiring Software Developer",
    "Frontend Learner",
    "Flutter Enthusiast",
    "Java & Python Student",
    "Building Real Projects",
  ];

  const typingElement = document.querySelector(".typing-text");
  if (typingElement) {
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const TYPE_SPEED = 100;
    const DELETE_SPEED = 50;
    const HOLD_AFTER_TYPE = 1500;
    const HOLD_AFTER_DELETE = 500;

    function tick() {
      const currentText = texts[textIndex];

      // Index sicher bewegen
      if (isDeleting) {
        charIndex = Math.max(0, charIndex - 1);
      } else {
        charIndex = Math.min(currentText.length, charIndex + 1);
      }

      // NIE komplett leer -> verhindert "Runterrutschen"
      const out = currentText.substring(0, charIndex);
      typingElement.textContent = out.length ? out : "\u00A0"; // NBSP

      let delay = isDeleting ? DELETE_SPEED : TYPE_SPEED;

      if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        delay = HOLD_AFTER_TYPE;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        delay = HOLD_AFTER_DELETE;
      }

      window.setTimeout(tick, delay);
    }

    window.setTimeout(tick, 800);
  }

  // ===== Smooth Scroll (Ankerlinks) =====
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const targetId = anchor.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      e.preventDefault();
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    });
  });
});

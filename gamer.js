// Variables globales
let particles = [];
let isAnimating = false;
let currentTheme = "dark";

// Initialisation au chargement de la page
document.addEventListener("DOMContentLoaded", function () {
  initializeTheme();
  initializeAnimations();
  createParticles();
  setupEventListeners();
  initializeSearch();
  setupScrollEffects();
  setupNavigation();
});

// Rendre les fonctions accessibles globalement immédiatement
window.toggleTheme = function () {
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  setTheme(newTheme);

  // Sauvegarder dans le localStorage
  localStorage.setItem("gamer-theme", newTheme);

  // Mettre à jour le bouton
  const themeToggle = document.querySelector(".theme-toggle");
  if (themeToggle) {
    const icon = themeToggle.querySelector("i");
    if (icon) {
      icon.className = newTheme === "dark" ? "fas fa-sun" : "fas fa-moon";
    }
  }
};

window.setTheme = setTheme;
window.createParticles = createParticles;
window.animateProgressBars = animateProgressBars;

// Initialisation du thème
function initializeTheme() {
  const savedTheme = localStorage.getItem("gamer-theme") || "dark";
  setTheme(savedTheme);

  // Mettre à jour le bouton de thème
  const themeToggle = document.querySelector(".theme-toggle");
  if (themeToggle) {
    const icon = themeToggle.querySelector("i");
    if (icon) {
      icon.className = currentTheme === "dark" ? "fas fa-sun" : "fas fa-moon";
    }
  }
}

// Fonction de changement de thème
function toggleTheme() {
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  setTheme(newTheme);

  // Sauvegarder dans le localStorage
  localStorage.setItem("gamer-theme", newTheme);

  // Mettre à jour le bouton
  const themeToggle = document.querySelector(".theme-toggle");
  if (themeToggle) {
    const icon = themeToggle.querySelector("i");
    if (icon) {
      icon.className = newTheme === "dark" ? "fas fa-sun" : "fas fa-moon";
    }
  }
}

// Appliquer le thème
function setTheme(theme) {
  currentTheme = theme;
  document.documentElement.setAttribute("data-theme", theme);

  // Mettre à jour les couleurs des particules
  updateParticleColors();
}

// Initialisation des animations
function initializeAnimations() {
  // Animation d'entrée des éléments
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observer tous les éléments avec la classe 'animate-on-scroll'
  document
    .querySelectorAll(
      ".wrapper, .wrapper1, .contenuFormulaire, .title, .installer"
    )
    .forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = "all 0.6s ease-out";
      observer.observe(el);
    });
}

// Création des particules d'arrière-plan
function createParticles() {
  const particleContainer = document.createElement("div");
  particleContainer.className = "gaming-particles";
  document.body.appendChild(particleContainer);

  for (let i = 0; i < 30; i++) {
    createParticle(particleContainer);
  }
}

function createParticle(container) {
  const particle = document.createElement("div");
  particle.className = "particle";

  // Position aléatoire
  particle.style.left = Math.random() * 100 + "%";
  particle.style.animationDelay = Math.random() * 6 + "s";
  particle.style.animationDuration = Math.random() * 3 + 3 + "s";

  container.appendChild(particle);

  // Recréer la particule après l'animation
  setTimeout(() => {
    if (particle.parentNode) {
      particle.remove();
      createParticle(container);
    }
  }, 6000);
}

// Mettre à jour les couleurs des particules selon le thème
function updateParticleColors() {
  const particles = document.querySelectorAll(".particle");
  const color =
    currentTheme === "dark" ? "var(--primary-color)" : "var(--accent-color)";

  particles.forEach((particle) => {
    particle.style.background = color;
  });
}

// Configuration de la navigation
function setupNavigation() {
  // Ajouter la classe active au lien de la page courante
  const currentPage =
    window.location.pathname.split("/").pop() || "gamer-modern.html";
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (
      href === currentPage ||
      (currentPage === "gamer-modern.html" && href === "gamer-modern.html")
    ) {
      link.classList.add("active");
    }
  });

  // Navigation mobile
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".main-nav ul");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", function () {
      navMenu.classList.toggle("nav-open");
      this.classList.toggle("active");
    });
  }
}

// Configuration des écouteurs d'événements
function setupEventListeners() {
  // Effet hover sur les cartes
  document
    .querySelectorAll(
      ".wrapper aside, .title, .installer, .installer1, .installer2"
    )
    .forEach((element) => {
      element.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-5px) scale(1.02)";
      });

      element.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0) scale(1)";
      });
    });

  // Animation des icônes de navigation
  document.querySelectorAll("nav a i, .nav-link i").forEach((icon) => {
    icon.addEventListener("mouseenter", function () {
      this.style.transform = "rotate(360deg) scale(1.2)";
    });

    icon.addEventListener("mouseleave", function () {
      this.style.transform = "rotate(0deg) scale(1)";
    });
  });

  // Effet de ripple sur les boutons
  document
    .querySelectorAll(
      'input[type="submit"], .installer, .installer1, .installer2'
    )
    .forEach((button) => {
      button.addEventListener("click", createRippleEffect);
    });

  // Bouton de thème
  const themeToggle = document.querySelector(".theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }
}

// Effet de ripple sur les boutons
function createRippleEffect(event) {
  const button = event.currentTarget;
  const ripple = document.createElement("span");
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  ripple.style.width = ripple.style.height = size + "px";
  ripple.style.left = x + "px";
  ripple.style.top = y + "px";
  ripple.classList.add("ripple");

  button.appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
  }, 600);
}

// Fonction de recherche améliorée
function initializeSearch() {
  const searchInput = document.getElementById("mySearch");
  const searchIcon = document.getElementById("search");

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      if (this.value.length > 0) {
        this.style.borderColor = "var(--primary-color)";
        this.style.boxShadow = "var(--shadow-glow)";
      } else {
        this.style.borderColor = "rgba(255, 255, 255, 0.1)";
        this.style.boxShadow = "none";
      }
    });

    searchInput.addEventListener("focus", function () {
      this.style.transform = "scale(1.02)";
    });

    searchInput.addEventListener("blur", function () {
      this.style.transform = "scale(1)";
    });
  }

  if (searchIcon) {
    searchIcon.addEventListener("click", function () {
      searchInput.focus();
    });
  }
}

// Fonction de recherche originale améliorée
function myFunction() {
  const input = document.getElementById("mySearch");
  const filter = input.value.toUpperCase();
  const ul = document.getElementById("myMenu");
  const li = ul.getElementsByTagName("li");

  for (let i = 0; i < li.length; i++) {
    const a = li[i].getElementsByTagName("a")[0];
    if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
      li[i].style.animation = "fadeIn 0.3s ease-out";
    } else {
      li[i].style.display = "none";
    }
  }
}

// Effets de scroll
function setupScrollEffects() {
  let ticking = false;

  function updateOnScroll() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector("header");

    if (parallax) {
      const speed = scrolled * 0.3;
      parallax.style.transform = `translateY(${speed}px)`;
    }

    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateOnScroll);
      ticking = true;
    }
  }

  window.addEventListener("scroll", requestTick);
}

// Animation des progress bars
function animateProgressBars() {
  const progressBars = document.querySelectorAll("progress");

  progressBars.forEach((progress) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const value = progress.value;
          progress.value = 0;

          setTimeout(() => {
            progress.value = value;
          }, 500);
        }
      });
    });

    observer.observe(progress);
  });
}

// Effet de typing pour le titre
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Animation des cartes au survol
function setupCardAnimations() {
  const cards = document.querySelectorAll(".wrapper aside, .title");

  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) rotateY(5deg)";
      this.style.boxShadow = "0 20px 40px rgba(74, 144, 226, 0.3)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) rotateY(0deg)";
      this.style.boxShadow = "var(--shadow-dark)";
    });
  });
}

// Effet de parallaxe sur les images
function setupImageParallax() {
  const images = document.querySelectorAll(".wrapper aside img");

  images.forEach((img) => {
    img.addEventListener("mousemove", function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 15;
      const rotateY = (centerX - x) / 15;

      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    img.addEventListener("mouseleave", function () {
      this.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
    });
  });
}

// Initialisation des animations avancées
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(() => {
    animateProgressBars();
    setupCardAnimations();
    setupImageParallax();
  }, 1000);
});

// Export des fonctions pour utilisation externe
window.GamerZone = {
  toggleTheme: window.toggleTheme,
  createParticles,
  animateProgressBars,
  setTheme
};

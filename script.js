(function () {
  const roles = [
    "Python Full Stack Developer",
    "Django Developer",
    "Backend Developer",
    "Web App Builder",
  ];

  const el = document.getElementById("typing");
  if (!el) return;

  let roleIndex  = 0;
  let charIndex  = 0;
  let isDeleting = false;

  function tick() {
    const current = roles[roleIndex];
    el.textContent = current.substring(0, charIndex);

    if (!isDeleting) {
      charIndex++;
      if (charIndex > current.length) {
        isDeleting = true;
        setTimeout(tick, 1500);
        return;
      }
    } else {
      charIndex--;
      if (charIndex < 0) {
        isDeleting = false;
        charIndex  = 0;
        roleIndex  = (roleIndex + 1) % roles.length;
      }
    }

    setTimeout(tick, isDeleting ? 45 : 85);
  }

  tick();
})();


(function () {
  const sections = document.querySelectorAll("section[id]");
  const links    = document.querySelectorAll(".nav-link");
  if (!sections.length || !links.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        links.forEach((l) => l.classList.remove("active"));
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add("active");
      }
    });
  }, { threshold: 0.4 });

  sections.forEach((s) => observer.observe(s));
})();


(function () {
  const fills = document.querySelectorAll(".skill-fill");
  if (!fills.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.width = (entry.target.dataset.width || "0") + "%";
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  fills.forEach((f) => observer.observe(f));
})();


(function () {
  const style = document.createElement("style");
  style.textContent = `
    .reveal {
      opacity: 0;
      transform: translateY(24px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .reveal.visible {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);

  const targets = document.querySelectorAll(
    ".skill-item, .project-card, .about-card, .contact-card, .section-header"
  );
  targets.forEach((el) => el.classList.add("reveal"));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const siblings = [...entry.target.parentElement.children];
        const idx = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = `${idx * 60}ms`;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  targets.forEach((el) => observer.observe(el));
})();

// typing animation for hero role line
var roles = [
  "Python & Django developer",
  "still figuring things out, one project at a time",
];

var typingEl = document.getElementById("typing");
var roleIndex = 0;
var charIndex = 0;
var isDeleting = false;

function typeEffect() {
  var currentRole = roles[roleIndex];

  if (isDeleting) {
    typingEl.textContent = currentRole.substring(0, charIndex);
    charIndex--;
  } else {
    typingEl.textContent = currentRole.substring(0, charIndex);
    charIndex++;
  }

  if (!isDeleting && charIndex > currentRole.length) {
    isDeleting = true;
    setTimeout(typeEffect, 1800);
    return;
  }

  if (isDeleting && charIndex < 0) {
    isDeleting = false;
    charIndex = 0;
    roleIndex = roleIndex + 1;
    if (roleIndex >= roles.length) {
      roleIndex = 0;
    }
  }

  var speed = isDeleting ? 40 : 70;
  setTimeout(typeEffect, speed);
}

if (typingEl) {
  typeEffect();
}

// active nav link based on scroll position
var allSections = document.querySelectorAll("section[id]");
var navLinks = document.querySelectorAll(".nav-link");

var sectionObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      navLinks.forEach(function (link) {
        link.classList.remove("active");
      });
      var sectionId = entry.target.id;
      var matchingLink = document.querySelector('.nav-link[href="#' + sectionId + '"]');
      if (matchingLink) {
        matchingLink.classList.add("active");
      }
    }
  });
}, { threshold: 0.4 });

allSections.forEach(function (section) {
  sectionObserver.observe(section);
});

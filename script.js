// typing animation for hero section
// roles to cycle through
var roles = [
  "Python Full Stack Developer",
  "Django Developer",
  "Backend Developer",
  "Web App Builder",
];

var typingEl = document.getElementById("typing");
var roleIndex = 0;
var charIndex = 0;
var isDeleting = false;

function typeEffect() {
  var currentRole = roles[roleIndex];

  // add or remove a character
  if (isDeleting) {
    typingEl.textContent = currentRole.substring(0, charIndex);
    charIndex--;
  } else {
    typingEl.textContent = currentRole.substring(0, charIndex);
    charIndex++;
  }

  // if finished typing the word
  if (!isDeleting && charIndex > currentRole.length) {
    isDeleting = true;
    // wait 1.5s before deleting
    setTimeout(typeEffect, 1500);
    return;
  }

  // if finished deleting
  if (isDeleting && charIndex < 0) {
    isDeleting = false;
    charIndex = 0;
    // go to next role
    roleIndex = roleIndex + 1;
    if (roleIndex >= roles.length) {
      roleIndex = 0;
    }
  }

  // speed - delete faster than type
  var speed = isDeleting ? 45 : 85;
  setTimeout(typeEffect, speed);
}

// start the typing animation
if (typingEl) {
  typeEffect();
}


// ----------------------------------------
// active nav link based on scroll position
// ----------------------------------------

var allSections = document.querySelectorAll("section[id]");
var navLinks = document.querySelectorAll(".nav-link");

var sectionObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      // remove active from all links first
      navLinks.forEach(function(link) {
        link.classList.remove("active");
      });

      // find the matching link and add active
      var sectionId = entry.target.id;
      var matchingLink = document.querySelector('.nav-link[href="#' + sectionId + '"]');
      if (matchingLink) {
        matchingLink.classList.add("active");
      }
    }
  });
}, { threshold: 0.4 });

// observe all sections
allSections.forEach(function(section) {
  sectionObserver.observe(section);
});


// ----------------------------------------
// skill bar fill animation on scroll
// ----------------------------------------

var skillBars = document.querySelectorAll(".skill-fill");

var skillObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      // set width from data attribute
      var targetWidth = entry.target.getAttribute("data-width");
      if (targetWidth) {
        entry.target.style.width = targetWidth + "%";
      }
      // stop observing after animation
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

skillBars.forEach(function(bar) {
  skillObserver.observe(bar);
});


// ----------------------------------------
// scroll reveal animation for cards etc
// ----------------------------------------

// adding the reveal styles
var revealStyles = document.createElement("style");
revealStyles.textContent = `
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
document.head.appendChild(revealStyles);

// select all elements to animate
var revealElements = document.querySelectorAll(
  ".skill-item, .project-card, .about-card, .contact-card, .section-header"
);

// add reveal class to all of them
revealElements.forEach(function(el) {
  el.classList.add("reveal");
});

var revealObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      // stagger delay based on sibling index
      var parent = entry.target.parentElement;
      var siblings = Array.from(parent.children);
      var idx = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = (idx * 60) + "ms";

      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(function(el) {
  revealObserver.observe(el);
});
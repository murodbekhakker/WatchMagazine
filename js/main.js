const track = document.querySelector(".carousel-track");
const dots = document.querySelectorAll(".dot");
let startPos = 0;
let currentIndex = 0;
let isDragging = false;
let currentTranslate = 0;
let prevTranslate = 0;

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    updateDots(index);
    currentIndex = index;
    setPositionByIndex();
  });
});

track.addEventListener("touchstart", touchStart);
track.addEventListener("touchmove", touchMove);
track.addEventListener("touchend", touchEnd);

function touchStart(event) {
  isDragging = true;
  startPos = event.touches[0].clientX;
  prevTranslate = currentTranslate;
}

function touchMove(event) {
  if (isDragging) {
    const currentPosition = event.touches[0].clientX;
    currentTranslate = prevTranslate + currentPosition - startPos;
    track.style.transform = `translateX(${currentTranslate}px)`;
  }
}

function touchEnd() {
  isDragging = false;
  const movedBy = currentTranslate - prevTranslate;

  // 50px dan ko‘proq surilsa, item o‘zgaradi
  if (movedBy < -50 && currentIndex < dots.length - 1) currentIndex += 1;
  if (movedBy > 50 && currentIndex > 0) currentIndex -= 1;

  setPositionByIndex();
  updateDots(currentIndex);
}

function setPositionByIndex() {
  currentTranslate = -currentIndex * track.clientWidth;
  track.style.transform = `translateX(${currentTranslate}px)`;
}

function updateDots(index) {
  dots.forEach((dot) => dot.classList.remove("active"));
  dots[index].classList.add("active");
}

// Skroll bo'lganda indikatorni yangilash
track.addEventListener("scroll", () => {
  const activeIndex = Math.round(track.scrollLeft / track.clientWidth);
  dots.forEach((dot, idx) =>
    dot.classList.toggle("active", idx === activeIndex)
  );
});

// loading
const loading = document.getElementById("loading");

const loadingDuration = 1800; // 1.8s

setTimeout(() => {
  loading.classList.add("loading-none");
}, loadingDuration);
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-mune");

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
});
//hamburger
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-btn");

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("activeBtn");
  });
});
// back-top
let mybutton = document.getElementById("myBtn");

window.onscroll = function () {
  scrollFunction();
};
function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    setTimeout(() => {
      mybutton.style.display = "block";
    }, 2000);
    mybutton.style.opacity = "1";

    mybutton.style.transition = "opacity 2s ease";
  } else {
    mybutton.style.opacity = "0";
    mybutton.style.transition = "opacity 0.5s ease";
    mybutton.style.display = "none";
  }
}
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// navbar shrink
window.addEventListener("scroll", function () {
  shrink();
});

let navbar = document.getElementById("header");

function shrink() {
  if (scrollY > 100) {
    navbar.classList.add("navbar-shrink");
  } else {
    navbar.classList.remove("navbar-shrink");
  }
}

//aos
AOS.init();

// making mobile navigation works
const btnNav = document.querySelector(".btn-mobile-nav");
const header = document.querySelector(".header");
btnNav.addEventListener("click", function () {
  header.classList.toggle("nav-open");
});

// making year updating automatically
const year = document.querySelector(".year");
year.textContent = new Date().getFullYear();

// Smooth scrolling animation

const allLinks = document.querySelectorAll("a:link");
allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");

    // Scroll back to top
    if (href === "#") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    // scroll to other links
    if (href !== "#" && href.startsWith("#")) {
      const section = document.querySelector(href);
      section.scrollIntoView({ behavior: "smooth" });
    }

    // close the mobile menu navigation
    if (link.classList.contains("main-nav-link")) {
      header.classList.toggle("nav-open");
    }
  });
});

// Creating Sticky Navigation
const sectionHero = document.querySelector(".section-hero");
const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    // console.log(ent);
    if (!ent.isIntersecting) {
      document.body.classList.add("sticky");
    }
    if (ent.isIntersecting) {
      document.body.classList.remove("sticky");
    }
  },
  {
    //In the viewport
    root: null,
    threshold: 0,
    rootMargin: "-80px", // this is the same hight of in css height: 8rem;
  }
);

obs.observe(sectionHero);

////////////////////////////////////////////////////////////////
// Fixing Flex-box gap property missing in some Safari versions
//

function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();

/* For popup things */

const popup = document.querySelector(".popup-wrapper");
const close = document.querySelector(".popup-close");

window.addEventListener("load", () => {
  setTimeout(() => {
    popup.style.display = "block";
    // document.body.style.overflow = "hidden"; // Disable page scrolling // won't work it's actually exist due to menu animation and overflow situation ...
  }, 2000);
});

close.addEventListener("click", () => {
  popup.style.display = "none";
  // document.body.style.overflow = ""; // enable back page scrolling
});

popup.addEventListener("click", (e) => {
  if (e.target.className === "popup-wrapper") {
    popup.style.display = "none";
    document.body.style.overflow = "";
  }
});

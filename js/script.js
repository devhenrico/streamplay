document.addEventListener("DOMContentLoaded", () => {
  // Navegação e observador de seções
  const navItems = document.querySelectorAll(".navBar li");
  const sections = document.querySelectorAll("section[id]");
  const isPlansPage = window.location.pathname.includes("plans.html");
  let clickedByUser = false;

  if (isPlansPage) {
    navItems.forEach((li) => li.classList.remove("active"));
    const subscribeItem = document.querySelector(".navBar li:last-child");
    if (subscribeItem) {
      subscribeItem.classList.add("active");
    }
    return;
  }

  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      clickedByUser = true;
      navItems.forEach((li) => li.classList.remove("active"));
      this.classList.add("active");

      setTimeout(() => {
        clickedByUser = false;
      }, 1000);
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      if (!clickedByUser) {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            navItems.forEach((li) => li.classList.remove("active"));

            const current = document.querySelector(
              `.navBar li a[href="#${id}"]`
            );
            if (current) {
              current.parentElement.classList.add("active");
            }
          }
        });
      }
    },
    { threshold: 0.5 }
  );

  sections.forEach((section) => observer.observe(section));

  // Efeito de blur no header ao scrollar
  const nav = document.querySelector("header nav");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 0) {
      nav.classList.add("navBlur");
    } else {
      nav.classList.remove("navBlur");
    }
  });

  // Botão de voltar ao topo
  const btnTop = document.getElementById("btnTop");
  if (btnTop) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        btnTop.style.opacity = "1";
        btnTop.style.visibility = "visible";
      } else {
        btnTop.style.opacity = "0";
        btnTop.style.visibility = "hidden";
      }
    });

    btnTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Cards de FAQ
  document.querySelectorAll(".faqItem").forEach((item) => {
    const button = item.querySelector(".faqQuestion");
    const icon = button.querySelector(".toggle-icon");
    const response = item.querySelector(".faqResponse");

    let contentHeight = response.scrollHeight + 20;

    button.addEventListener("click", () => {
      const parentColumn = item.closest(".faqLeft, .faqRight");
      const isOpening = !item.classList.contains("active");

      requestAnimationFrame(() => {
        parentColumn.querySelectorAll(".faqItem").forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.classList.remove("active");
            otherItem
              .querySelector(".toggle-icon")
              ?.classList.replace("bx-minus", "bx-plus");
          }
        });

        item.classList.toggle("active");
        icon.classList.toggle("bx-minus");
        icon.classList.toggle("bx-plus");

        response.style.maxHeight = isOpening ? `${contentHeight}px` : "0";
      });
    });
  });

  // Animations Lottie
  const arrowAnimation = document.getElementById("arrow-animation");
  if (arrowAnimation) {
    lottie.loadAnimation({
      container: arrowAnimation,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "./js/arrow-down.json",
    });
  }

  document.querySelectorAll(".arrow-animations").forEach((element) => {
    lottie.loadAnimation({
      container: element,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "./js/arrow-right.json",
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // Navegação e observador de seções
  const navItems = document.querySelectorAll(".nav-bar li");
  const sections = document.querySelectorAll("section[id]");
  const isPlansPage = window.location.pathname.includes("plans.html");
  let clickedByUser = false;

  if (isPlansPage) {
    navItems.forEach((li) => li.classList.remove("active"));
    const subscribeItem = document.querySelector(".nav-bar li:last-child");
    if (subscribeItem) {
      subscribeItem.classList.add("active");
    }
  } else {
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
                `.nav-bar li a[href="#${id}"]`
              );
              if (current) current.parentElement.classList.add("active");
            }
          });
        }
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => observer.observe(section));
  }

  // Efeito de blur no header ao scrollar
  const nav = document.querySelector("header nav");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 0) {
      nav.classList.add("nav-blur");
    } else {
      nav.classList.remove("nav-blur");
    }
  });

  // Botão de voltar ao topo
  const btnTop = document.getElementById("btn-top");
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
  document.querySelectorAll(".faq-item").forEach((item) => {
    const button = item.querySelector(".faq-question");
    const icon = button.querySelector(".toggle-icon");
    const response = item.querySelector(".faq-response");

    button.addEventListener("click", () => {
      const parentColumn = item.closest(".faq-left, .faq-right");
      const isOpening = !item.classList.contains("active");

      requestAnimationFrame(() => {
        parentColumn.querySelectorAll(".faq-item").forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.classList.remove("active");
            otherItem
              .querySelector(".toggle-icon")
              ?.classList.replace("fa-minus", "fa-plus");
            otherItem.querySelector(".faq-response").style.maxHeight = "0";
          }
        });

        item.classList.toggle("active");

        if (isOpening) {
          response.style.maxHeight = `${response.scrollHeight}px`;
          icon.classList.replace("fa-plus", "fa-minus");
        } else {
          response.style.maxHeight = "0";
          icon.classList.replace("fa-minus", "fa-plus");
        }
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

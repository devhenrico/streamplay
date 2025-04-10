document.addEventListener("DOMContentLoaded", () => {
  const navItems = document.querySelectorAll('.navBar li');
  const sections = document.querySelectorAll("section[id]");
  const isPlansPage = window.location.pathname.includes("plans.html");

  let clickedByUser = false;

  if (isPlansPage) {
    navItems.forEach(li => li.classList.remove('active'));
    const subscribeItem = document.querySelector('.navBar li:last-child');
    if (subscribeItem) {
      subscribeItem.classList.add('active');
    }
    return;
  }

  navItems.forEach(item => {
    item.addEventListener('click', function () {
      clickedByUser = true;

      navItems.forEach(li => li.classList.remove('active'));
      this.classList.add('active');

      setTimeout(() => {
        clickedByUser = false;
      }, 1000);
    });
  });

  const observer = new IntersectionObserver(entries => {
    if (!clickedByUser) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");

          navItems.forEach(li => li.classList.remove("active"));

          const current = document.querySelector(`.navBar li a[href="#${id}"]`);
          if (current) {
            current.parentElement.classList.add("active");
          }
        }
      });
    }
  }, {
    threshold: 0.6
  });

  sections.forEach(section => observer.observe(section));
});

window.addEventListener("scroll", function () {
    const nav = document.querySelector("header nav");
    if (window.scrollY > 0) {
        nav.classList.add("navBlur");
    } else {
        nav.classList.remove("navBlur");
    }
});

const btnTop = document.getElementById("btnTop");

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

const cards = document.querySelectorAll('.cardPlansContainer');

cards.forEach((card) => {
    card.addEventListener('click', () => {
        cards.forEach((c) => c.classList.remove('active'));
        card.classList.add('active');
    });
});

document.querySelectorAll('.faqQuestion').forEach(button => {
    button.addEventListener('click', () => {
        const faqCard = button.parentElement;
        const response = faqCard.querySelector('.faqResponse');
        const icon = button.querySelector('.toggle-icon');

        response.classList.toggle('open');
        faqCard.classList.toggle('open');

        if (faqCard.classList.contains('open')) {
            icon.classList.replace('bx-plus', 'bx-minus');
        } else {
            icon.classList.replace('bx-minus', 'bx-plus');
        }
    });
});

var animation = lottie.loadAnimation({
    container: document.getElementById('arrow-animation'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: './js/lottieflow-arrow-05-1-000000-easey.json'
});

document.querySelectorAll('.arrow-animations').forEach((element) => {
    lottie.loadAnimation({
        container: element,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: './js/lottieflow-arrow-08-2-000000-easey.json'
    });
});

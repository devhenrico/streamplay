window.addEventListener("scroll", function () {
    const nav = document.querySelector("header nav");
    if (window.scrollY > 0) {
        nav.classList.add("navBlur");
    } else {
        nav.classList.remove("navBlur");
    }
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
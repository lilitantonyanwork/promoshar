const elements = document.querySelectorAll(".fade");

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
        }
    });
});

elements.forEach((el) => observer.observe(el));


function animateNumber(el, target, duration = 1500) {
    let startTime = performance.now();

    function update(time) {
        const progress = Math.min((time - startTime) / duration, 1);
        const value = progress * target;

        // если число дробное — оставляем 1 знак после точки
        el.textContent =
            Number.isInteger(target)
                ? Math.floor(value)
                : value.toFixed(1);

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            el.textContent =
                Number.isInteger(target)
                    ? target
                    : target.toFixed(1);
        }
    }

    requestAnimationFrame(update);
}

const observer1 = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const el = entry.target;

            let text = el.textContent.trim();

            // убираем + и текст типа "4.9"
            let number = parseFloat(text);

            if (!isNaN(number)) {
                animateNumber(el, number);
            }

            observer1.unobserve(el);
        }
    });
});

// выбираем все числа в counter
document.querySelectorAll(".counter__item .numberAnimate").forEach((el) => {
    observer1.observe(el);
});


document.addEventListener("DOMContentLoaded", function () {
    const menu_btn = document.querySelector('.btn__menu');
    const menu = document.querySelector('.menu');
    const bb = document.querySelector('body');
    const hh = document.querySelector('html');
    const overlay = document.querySelector('.overlay');
    menu_btn.addEventListener('click', function (){
        menu.classList.toggle('show');
        menu_btn.classList.toggle('active');
        overlay.classList.toggle('show');
        bb.classList.toggle('no-scroll');
        hh.classList.toggle('no-scroll');
    })

    const im = new Inputmask("+7 (999) 999 99 99");
    im.mask(document.getElementById("phone"));


    ymaps.ready(init);

    function init() {
        const map = new ymaps.Map("map", {
            center: [55.577514, 37.623691], // координаты
            zoom: 14,
            controls: []
        });

        const placemark = new ymaps.Placemark(
            [55.577514, 37.623691],
            {},
            {
                iconLayout: "default#image",
                iconImageHref: "images/local-icon.svg", // твой пин
                iconImageSize: [40, 40],
                iconImageOffset: [-20, -40]
            }
        );

        map.geoObjects.add(placemark);
    }
});

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
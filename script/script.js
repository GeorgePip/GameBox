/* ===============================
   АНИМИРОВАННЫЙ ФОН (Canvas API)
================================= */

const canvas = document.createElement("canvas");
canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.zIndex = "-1";
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");
let particles = [];

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.6 - 0.3;
        this.speedY = Math.random() * 0.6 - 0.3;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
        ctx.fillStyle = "rgba(56, 189, 248, 0.7)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}

initParticles();
animate();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});


/* ===============================
   КОРЗИНА С СОХРАНЕНИЕМ
================================= */

let cartCount = localStorage.getItem("cartCount")
    ? parseInt(localStorage.getItem("cartCount"))
    : 0;

updateCart();

function buyGame() {
    cartCount++;
    localStorage.setItem("cartCount", cartCount);
    updateCart();
    showNotification("");
}

function updateCart() {
    const counter = document.getElementById("cart-count");
    if (counter) counter.textContent = cartCount;
}


/* ===============================
   УВЕДОМЛЕНИЕ
================================= */

function showNotification(message) {
    const notification = document.createElement("div");
    notification.classList.add("notification");
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add("show");
    }, 10);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}


/* ===============================
   АНИМАЦИЯ ПОЯВЛЕНИЯ БЛОКОВ
================================= */

const elements = document.querySelectorAll(".item, .gamecont, form");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateY(0)";
        }
    });
}, { threshold: 0.2 });

elements.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = "translateY(40px)";
    el.style.transition = "0.8s ease";
    observer.observe(el);
});


/* ===============================
   ФОРМА — JS ОБРАБОТКА
================================= */

const form = document.querySelector("form");

if (form) {
    form.addEventListener("submit", function(e) {
        e.preventDefault();
        showNotification("Сообщение успешно отправлено!");
        form.reset();
    });
}


/* ===============================
   ПЛАВНЫЙ СКРОЛЛ
================================= */

document.querySelectorAll("a[href^='#']").forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href"))
            .scrollIntoView({ behavior: "smooth" });
    });
});


/* ===============================
   АВТОМАТИЧЕСКИЙ ГОД В ФУТЕРЕ
================================= */

document.addEventListener("DOMContentLoaded", function () {

    const footer = document.querySelector(".endos p");

    const year = new Date().getFullYear();

    footer.innerHTML = `&copy; ${year} Все права защищены`;

});

const faders = document.querySelectorAll(".item, .gamecont");



const appearOnScroll = new IntersectionObserver(function(entries) {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("visible");

        }

    });

}, {

    threshold: 0.2

});



faders.forEach(el => {

    el.classList.add("fade-in");

    appearOnScroll.observe(el);

});



function buyGame() {

    const button = document.querySelector(".buybutton");



    button.textContent = "Добавлено";
    
    button.style.backgroundColor = "#15803d";
    
    
    
    showNotification("Игра добавлена в корзину");

}



    document.querySelectorAll(".buybutton").forEach(btn => {

        btn.addEventListener("click", function(e) {

            e.preventDefault();

            buyGame();

        });

    });
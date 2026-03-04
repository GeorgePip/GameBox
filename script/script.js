// Обработчик кнопки покупки

function buyGame() {

    const button = document.querySelector(".buybutton");



    button.textContent = "Добавлено";

    button.style.backgroundColor = "#15803d";



    showNotification("Игра добавлена в корзину");

}



// Всплывающее уведомление

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



// Автоматическое появление текущего года в футере

document.addEventListener("DOMContentLoaded", function () {

    const footer = document.querySelector(".endos p");

    const year = new Date().getFullYear();

    footer.innerHTML = `&copy; ${year} Все права защищены`;

});
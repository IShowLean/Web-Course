let myModal = new jBox('Modal', {
    width: 500,
    height: 230,
    title: 'Подписка',
    content: `
    <i>Хочешь получать больше новостей о компании Porsche? Подпишись на новостную рассылку!</i><br>
    <form id="subscriptionForm">
        <label>Ваш Email:</label>
        <input id="emailInput" type="email" required />
        <button type="submit">Отправить</button>
    </form>`,
    animation: 'zoomIn',
    closeButton: 'title',
    onOpenComplete: function () {
        document.getElementById('emailInput').focus();
    },
});

let interval = 7000;
let emailSubmitted = sessionStorage.getItem('emailSubmitted') ?? false;

function showModal() {
    if (!emailSubmitted) {
        myModal.open();

        interval *= 2.5;

        setTimeout(showModal, interval);
    }
}

setTimeout(showModal, interval);

document.addEventListener('submit', (event) => {
    if (event.target.id === 'subscriptionForm') {
        event.preventDefault();
        emailSubmitted = true;
        sessionStorage.setItem('emailSubmitted', JSON.stringify(emailSubmitted))
        myModal.setContent(`
            <i>Вы успешно подписались на новостную рассылку Porsche.<i>
        `);

        setTimeout(() => {
            myModal.close();
        }, 2000);
    }
});
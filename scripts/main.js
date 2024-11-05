const scriptStartTime = performance.now();
console.time('time')

const menuButton = document.getElementById("menuButton");
const navMenu = document.getElementById("navMenu");

menuButton.addEventListener("click", function () {
    navMenu.classList.toggle("open");
});

(function () {
    window.addEventListener('load', function () {
        const [navigationEntry] = performance.getEntriesByType("navigation");

        const loadTime = navigationEntry.domContentLoadedEventEnd - navigationEntry.startTime;

        const footer = document?.querySelector('footer');
        const copyright = footer?.querySelector('p');

        if (copyright) {
            copyright.innerHTML += `<br>Время загрузки страницы: ${loadTime.toFixed(2)} мс`;
            copyright.style.textAlign = 'center';
            copyright.style.fontSize = '14px'
            copyright.style.color = 'white'
            copyright.style.fontFamily = "Montserrat Alternates";
        }
        console.log(`Время загрузки страницы: ${loadTime.toFixed(2)} мс`)
    });
})();

(function () {
    const currentPath = window.location.pathname;
    const menuItems = document.querySelectorAll('.nav-menu a.nav');

    menuItems.forEach(function (menuItem) {
        const href = menuItem.getAttribute('href');
        if (currentPath.includes(href)) {
            menuItem.classList.add('active');
        }
    });
})();

console.timeEnd('time')
const scriptEndTime = performance.now();
const scriptLoadTime = scriptEndTime - scriptStartTime;
console.log(`Время загрузки скрипта: ${scriptLoadTime.toFixed(2)} мс`);


document.addEventListener("DOMContentLoaded", () => {
    const preloader = document.getElementById("preloader");
    const commentsContainer = document.getElementById("comments");

    let toggleFilter = JSON.parse(localStorage.getItem("toggleFilter")) ?? true;

    const fetchComments = () => {
        preloader.style.display = 'block';
        commentsContainer.innerHTML = '';

        const url = toggleFilter
            ? 'https://jsonplaceholder.typicode.com/comments?id_gte=100'
            : 'https://jsonplaceholder.typicode.com/comments?id_lte=200';

        toggleFilter = !toggleFilter;
        localStorage.setItem("toggleFilter", JSON.stringify(toggleFilter));

        fetch(url)
            .then(response => {
                if (!response.ok) throw new Error(`Ошибка загрузки данных: ${response.status}`);
                return response.json();
            })
            .then(comments => renderComments(comments))
            .catch(error => {
                showError("⚠ Что-то пошло не так. Попробуйте позже.");
                console.error("Ошибка:", error);
            })
            .finally(() => {
                preloader.style.display = 'none';
            });
    };

    const renderComments = (comments) => {
        if (!comments.length) {
            commentsContainer.innerHTML = "<p>Отзывы отсутствуют</p>";
            return;
        }

        comments.forEach((comment) => {
            const commentCard = document.createElement("div");
            commentCard.className = "comment-card";

            commentCard.innerHTML = `
          <p class="comment-author">${comment.name}</p>
          <p class="comment-email">${comment.email}</p>
          <p class="comment-body">${comment.body}</p>
        `;

            commentsContainer.appendChild(commentCard);
        });
    };

    const showError = (message) => {
        commentsContainer.innerHTML = `<p>${message}</p>`;
    };

    fetchComments();
});

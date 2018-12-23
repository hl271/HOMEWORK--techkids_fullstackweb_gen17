let likeBtn = document.getElementById('btn_like')
let dislikeBtn = document.getElementById('btn_dislike')
let spamBtn = document.getElementById('btn_spam')
let quoteIdContainer = document.getElementById('span_id')
let reactContainer = document.getElementById('react_container')
let injectHTML = (likeCount, dislikeCount, spamCount) => {
    return `<h3>Bạn có theo số đông không nhỉ?</h3>
            <ul>
                <li>Hay / Tâm đắc 👏: ${likeCount}</li>
                <li>Không thích 👎: ${dislikeCount}</li>
                <li>Nhảm/Spam 🗑: ${spamCount}</li>
            </ul>`
}

likeBtn.addEventListener('click', () => {
    postAjax('/like', `id=${quoteIdContainer.innerText}`, (res) => {
        let quote = JSON.parse(res)
        reactContainer.innerHTML = injectHTML(quote.like, quote.dislike, quote.spam)
    })
})
dislikeBtn.addEventListener('click', () => {
    postAjax('/dislike', `id=${quoteIdContainer.innerText}`, (res) => {
        let quote = JSON.parse(res)
        reactContainer.innerHTML = injectHTML(quote.like, quote.dislike, quote.spam)
    })
})
spamBtn.addEventListener('click', () => {
    postAjax('/spam', `id=${quoteIdContainer.innerText}`, (res) => {
        let quote = JSON.parse(res)
        reactContainer.innerHTML = injectHTML(quote.like, quote.dislike, quote.spam)
    })
})
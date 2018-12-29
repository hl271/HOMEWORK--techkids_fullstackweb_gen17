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
let warning = 'Vote của bạn bị từ chối rồi :)) Tự đánh giá lại lương tâm mình đi nhé :))'

likeBtn.addEventListener('click', () => {
    $.ajax({
        url: "/react",
        method: "POST",
        data: {id: quoteIdContainer.innerText, reaction: 'like'},
        success: function(quote) {
            console.log(quote)
            if (!quote)  reactContainer.innerHTML = `<h3>${warning}</h3>`
            else reactContainer.innerHTML = injectHTML(quote.reaction.like, quote.reaction.dislike, quote.reaction.spam)
        },
        error: function(error) {
            if (error) console.log(error)
        }
    })
})
dislikeBtn.addEventListener('click', () => {
    $.ajax({
        url: "/react",
        method: "POST",
        data: {id: quoteIdContainer.innerText, reaction: 'dislike'},
        success: function(quote) {
            console.log(quote)
            if (!quote)  reactContainer.innerHTML = `<h3>${warning}</h3>`
            else reactContainer.innerHTML = injectHTML(quote.reaction.like, quote.reaction.dislike, quote.reaction.spam)
        },
        error: function(error) {
            if (error) console.log(error)
        }
    })
})
spamBtn.addEventListener('click', () => {
    $.ajax({
        url: "/react",
        method: "POST",
        data: {id: quoteIdContainer.innerText, reaction: 'spam'},
        success: function(quote) {
            console.log(quote)
            if (!quote)  reactContainer.innerHTML =  `<h3>${warning}</h3>`
            else reactContainer.innerHTML = injectHTML(quote.reaction.like, quote.reaction.dislike, quote.reaction.spam)
        },
        error: function(error) {
            if (error) console.log(error)
        }
    })
})

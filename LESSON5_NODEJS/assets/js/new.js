var wordCount = document.getElementById('word_count')
var formContent = document.getElementById('form_content')

formContent.addEventListener('input', () => {
    wordCount.innerText = 200 - formContent.value.length
})
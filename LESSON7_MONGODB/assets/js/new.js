// var wordCount = document.getElementById('word_count')
// var formContent = document.getElementById('form_content')

// formContent.addEventListener('input', () => {
//     wordCount.innerText = 200 - formContent.value.length
// })

$('#form_content').on('input', function() {
    let left = 200 - $(this).val().length
    $('#word_count').text(left)
})
const VALIDATE_REGEXP = /^[a-z0-9\-]+$/

function validateStrings (validateRegExp, string) {
    if (string.match(validateRegExp) == null) return false
    else return true
}

function checkIfTitleExists(title, cb) {
    $.ajax({
        url: '/validate-title',
        method: 'POST',
        data: {title},
        success: (titleExists) => {
            cb(null, titleExists)
        },
        error: (err) => {
            console.log(err)
            cb(error, null)
        }
    })
}

$('#addNewPlayerBtn').on('click', function(event) {                    
    $('#player_input-panel').append('<input name="user" class="form-control d-block my-2 rounded border-pink" placeholder="Username" required/>')
})

$('#submitBtn').on('click', function(event) {
    if ( validateStrings(VALIDATE_REGEXP, $('#title').val()) )  {
        checkIfTitleExists($('#title').val(), (err, res) => {
            if (err) {
                $('#validate-title').text('There is some error on server. Please try again!')
            }
            else if (res) {
                $('#validate-title').text('This title was already taken. Try again!')
            }
            else if (!res){
                console.log('Your title is available')
                $('form').submit()
            }
        })
    }
    else {
        $('#validate-title').text('Only characters a-z, 0-9 and "-" are  acceptable.')
    }
})
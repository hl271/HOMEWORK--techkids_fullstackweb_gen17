$('form').on('submit', function(event) {
    event.preventDefault()
    $.ajax({
        url: '/api/auth/login',
        method: 'POST',
        data: {username: $('#form_name').val(), password: $('#form_pass').val()},
        success: (result) => {
            if (!!result.error) $('#msg-holder').removeClass().addClass('text-danger').text('There is something wrong on the server. Please try again.') 
            else {
                if (!result.loginSuccess) $('#msg-holder').removeClass().addClass('text-danger').text(result.msg)
                else $('#msg-holder').removeClass().addClass('text-success').text(result.msg)
            }
        },
        error: (err) => {
            $('#msg-holder').removeClass().addClass('text-danger').text('Your request is broken. Please try again.')
        }
    })
})
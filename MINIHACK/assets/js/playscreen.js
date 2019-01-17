$(document).ready(updateSOS())

const gameid = $('#gameid').val()

const htmlNewRound = function(roundLen, numOfPlayers) {
    let renderedInputs = ''
    for (let playerth=0;playerth<numOfPlayers; playerth++) {
        renderedInputs +=   `<td>
                                <input type="hidden" name="player" value="${playerth}"/>    
                                <input class="form-control player-score ${playerth} rounded border border-secondary" type="number" step="1" value="0"/>
                            </td>`
    }

    return  `<tr class="round ${roundLen}" id="">
                <input type="hidden" name="round" value="${roundLen}"/>
                <th scope="row">Round ${roundLen+1}</th>
                ${renderedInputs}

            </tr>
            `
}

$('#addRoundBtn').on('click', function(event) {
    const roundLen = $('#tbody tr').length
    const numOfPlayers = $('#SOS-row td').length
    ajaxAddNewRound(gameid, (err, results)=> {
        if (err) console.log(err)
        else {
            console.log('new round added')
            $('#tbody').append(htmlNewRound(roundLen, numOfPlayers))
        }
    })

})


//BIND THE EVENT HANDLER TO EXSITING CONTAINER ('#TBODY') 
$('#tbody').on('change', 'input.player-score', function(event) { 
    console.log('score changed')
    let score = $(this).val()
    let playerth = $(this).siblings('input[name="player"]').val()
    let roundth = $(this).parent().siblings('input[name="round"]').val()
    ajaxChangeScoreOfRound(gameid, roundth, playerth, score, (err, results) => {
        if (err) console.log(err)
        else {
            updateSOS()
        }
    })
})

function ajaxAddNewRound (gameid, cb) {
    $.ajax({
        url: '/games/round',
        method: 'POST',
        data: {gameid},
        success: function(updatedGame) {
            cb(null, updatedGame)
        },
        error: function(err) {
            cb(err, null)
        }
    })
}

function ajaxChangeScoreOfRound(gameid, roundth, playerth, score, cb) {
    $.ajax({
        url: '/games/update',
        method: 'POST',
        data: {gameid, roundth, playerth, score},
        success: function(updatedGame) {
            cb(null, updatedGame)
        },
        error: function(err) {
            console.log(err)
            cb(err, null)
        }
    })
}

function updateSOS() {
    let SOS = 0
    for (let x=0; x< $('.SOPS').length; x++) {
        let SOPS = 0
        $(`.player-score.${x}`).each(function() {
            SOPS += parseInt(this.value)
        })
        $('.SOPS').find(`span.${x}`).text(SOPS)
        SOS += SOPS
    }
    $('.SOS').text(SOS)
}
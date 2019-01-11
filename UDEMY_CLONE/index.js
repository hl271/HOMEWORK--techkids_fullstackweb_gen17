let SEARCH_RESULTS = []
let LISTEN_SCROLL = true

$(document).ready(function() {
    getAllUdemyCategories(function (error, categories) {
        if (error) console.log(error)
        else {
            categories.forEach((category) => {
                $('#categorySelect').append(`<option>${category}</option>`)
            })
        }
    })
    
})

$('#form').on('submit', function(event) {
    event.preventDefault()

    let searchphrase = $('#searchbox').val()
    let filterObj = {
        price: $('#priceSelect').val(),
        category: $('#categorySelect').val()
    }
    console.log(searchphrase, filterObj)

    $('#results-container').html('')
    SEARCH_RESULTS = []

    searchUdemyCourse(searchphrase, filterObj, 1, 12,  function(err, courses) {
        if (err) console.log(err)
        else {
            let renderedCourses = returnRenderedCourses(courses)
            SEARCH_RESULTS.push(renderedCourses)

            $('#results-container').append(renderedCourses.join(''))

            checkScrollBottom(() =>{
                LISTEN_SCROLL = false
                console.log(SEARCH_RESULTS.length) //Log page number fetched

                searchUdemyCourse(searchphrase, filterObj, SEARCH_RESULTS.length+1, 12, (err, courses) => {
                    if (err) console.log(err)
                    else if(!courses) {$('#results-container').append('')}
                    else {
                        let renderedCourses = returnRenderedCourses(courses)
                        SEARCH_RESULTS.push(renderedCourses)
                        $('#results-container').append(renderedCourses.join(''))

                        LISTEN_SCROLL = true
                    }
                })
                
            })
        }
    })

})

$('#stickyUpToTop').on('click', function(event) {
    $('html,body').animate({scrollTop: 0}, 1000)
})

function searchUdemyCourse(phrase, filterObj, pagenum, pagesize, cb) {
    console.log(`https://udemy-course-api.herokuapp.com/api/courses?search=${phrase}&page_size=${pagesize}&page=${pagenum}&price=${filterObj.price}&category=${filterObj.category}`)
    $('#spinner').addClass('lds-grid')
    $.ajax({
        url: `https://udemy-course-api.herokuapp.com/api/courses?search=${phrase}&page_size=${pagesize}&page=${pagenum}&price=${filterObj.price}&category=${filterObj.category}`,
        method: 'GET',
        success: function(courses) {
            $('#spinner').removeClass('lds-grid')
            console.log('COURSES FETCHED')
            cb(null, courses.results)
        },
        error: function(error) {
            $('#spinner').removeClass('lds-grid')
            if (error) {
                console.log(error)
                cb(error, null)
            }

        }
    })    
}

function getAllUdemyCategories(cb) {
    $.ajax({
        url: `https://udemy-course-api.herokuapp.com/api/course-categories`,
        method: 'GET',
        success: function(data) {
            let categories = data.results.map((category)=> {
                return category.title
            })
            cb(null, categories)
        },
        error: function(error) {
            if (error) {
                console.log(error)
                cb(error, null)
            }
        }
    })
}

function checkScrollBottom( cb) {
    $(window).scroll(function() {        
        if ($(window).scrollTop() + $(window).height() > $(document).height() - 100 && LISTEN_SCROLL) {
            console.log('bottom!!')
            cb()
        }
    })
}

function returnRenderedCourses (courses) {
    let renderedCourses = courses.map((course, index, array) => {
        return `
            <div class="col-xs-12 col-md-6 col-xl-4 px-2 my-3">

                <div class="card mx-auto" style="width: 18rem;">
                    <img src="${course['image_240x135']}" class="card-img-top" alt="${course.title}">
                    <div class="card-body">
                        <h5 class="card-title">${course.title}</h5>
                        <p><strong>Price: </strong>${course.price}</p>
                        <p><strong>Rating: </strong>${Math.round(course.predictive_score*10)/10} / 5</p>
                        <div class="stars-outer mb-3">
                            <div class="stars-inner" style="width: ${Math.round(course.predictive_score/5*100)}%"></div>
                        </div>
                        
                        <a href="https://www.udemy.com${course.url}" class="btn btn-primary d-block">Go to course</a>
                    </div>
                </div>

            </div>`
    })
    return renderedCourses
}

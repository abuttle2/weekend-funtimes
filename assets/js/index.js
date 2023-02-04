$("#submitBtn").on("click", function (event) {
    event.preventDefault();

    var city = $("#cityInput").val();
    var newSrc = "https://www.google.com/maps/embed/v1/search?q=campsite+" + city + "&key=AIzaSyAdjP3RyKMzcagNwl7pXD76vnw9KXjmTc0";
    $("#maps-iframe").attr("src", newSrc);
});

var movieApiEl = $(".container");
var movieEl = $(".movie-genres");
var movieCardEl = $(".movie-cards");

var getMovieGenres = function () {
    // var queryURL = "https://api.themoviedb.org/3/search/movie?api_key=0b443d2c2139bab3c9172850e7125437&language=en-US&query=horror&page=1&include_adult=false";
    //Store movies objects into an array
    var movieGenres = [];
    var genreQueryURL = "https://api.themoviedb.org/3/genre/movie/list?api_key=0b443d2c2139bab3c9172850e7125437&language=en-US";

    $.ajax({
        url: genreQueryURL,
        method: "GET"
    }).then(function (response) {
        for (var i = 0; i < response.genres.length; i++) {
            movieGenres.push(response.genres[i]);
        }
        searchMovieId(movieGenres);
    });
}

var searchMovieId = function (genres) {

    //Iterate through the array of genres objects and dynamically create text elements
    for (var i = 0; i < genres.length; i++) {
        var btn = $("<button>").attr({
            name: genres[i].name,
            type: "button",
            class: "btn btn-light",
            id: genres[i].id
        }).text(genres[i].name);
        movieEl.append(btn);
    }

    //Click events for button elements will append the Query URL based on the ID
    movieApiEl.on('click', '.btn', function () {
        movieCardEl.empty();

        var genreId = $(this).attr("id");
        var pageNo = (Math.floor(Math.random() * 100) + 1);
        console.log("Button clicked with ID: " + genreId);

        //Append ID to URL string
        var IdQueryURL = "https://api.themoviedb.org/3/discover/movie?api_key=0b443d2c2139bab3c9172850e7125437&with_genres=" + genreId + "&page=" + pageNo;

        $.ajax({
            url: IdQueryURL,
            method: "GET"
        }).then(function (response) {
            for (var i = 0; i < response.results.length; i++) {
                var movie = response.results[i];
                var posterPath = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
                var card = $("<div>").addClass("card");
                var cardImage = $("<img>").addClass("card-img-top").attr("src", posterPath);
                var cardBody = $("<div>").addClass("card-body");
                var cardTitle = $("<h5>").addClass("card-title").text(movie.title);
                var cardText = $("<p>").addClass("card-text").text(movie.overview);

                cardBody.append(cardTitle, cardText);
                card.append(cardImage, cardBody);
                movieCardEl.append(card);
            }
        });
    });
}

getMovieGenres();


//movieApiEl.empty();
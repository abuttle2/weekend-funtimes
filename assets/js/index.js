$("#submitBtn").on("click", function (event) {
    event.preventDefault();

    var city = $("#cityInput").val();
    var newSrc = "https://www.google.com/maps/embed/v1/search?q=campsite+" + city + "&key=AIzaSyAdjP3RyKMzcagNwl7pXD76vnw9KXjmTc0";
    $("#maps-iframe").attr("src", newSrc);
});

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
        searchMovieID(movieGenres);
    });
}

var searchMovieID = function (genres) {
    //Reference the movie genres objects

    //Iterate through the array of genres objects
    for (var i = 0; i < genres.length; i++) {
        console.log(genres[i]);
    }

    var genreID = 27;
    var queryURL2 = "https://api.themoviedb.org/3/discover/movie?api_key=0b443d2c2139bab3c9172850e7125437&with_genres=" + genreID;

    $.ajax({
        url: queryURL2,
        method: "GET"
    }).then(function (response) {
        // console.log(genres);
    });

}

getMovieGenres();
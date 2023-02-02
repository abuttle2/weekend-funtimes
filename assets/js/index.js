$("#submitBtn").on("click", function (event) {
    event.preventDefault();

    var city = $("#cityInput").val();
    var newSrc = "https://www.google.com/maps/embed/v1/search?q=campsite+" + city + "&key=AIzaSyAdjP3RyKMzcagNwl7pXD76vnw9KXjmTc0";
    $("#maps-iframe").attr("src", newSrc);
});


var searchMovies = function () {
    // var queryURL = "https://api.themoviedb.org/3/search/movie?api_key=0b443d2c2139bab3c9172850e7125437&language=en-US&query=horror&page=1&include_adult=false";
    var queryURL = "https://api.themoviedb.org/3/genre/movie/list?api_key=0b443d2c2139bab3c9172850e7125437&language=en-US";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
    });
}
searchMovies();
// Listen for click event on the submit button
$("#submitBtn").on("click", function (event) {
    // Prevent the default form submit behavior
    event.preventDefault();
    // Get the value of the city input
    var city = $("#cityInput").val();
    // Generate the new src URL for the iframe
    var newSrc = "https://www.google.com/maps/embed/v1/search?q=campsite+" + city + "&key=AIzaSyAdjP3RyKMzcagNwl7pXD76vnw9KXjmTc0";
    $("#maps-iframe").attr("src", newSrc);

    // Make an AJAX call to openweather api
    var apiURL = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=" + city + "&appid=32306d8e68f68c9295a794f157aaab66";
    $.ajax({
        url: apiURL,
        success: function (data) {
            console.log(data);
            var currentDate = new Date();
            var nextWeekend = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + (5 - currentDate.getDay() + 7) % 7);
            nextWeekend.setHours(9);
            nextWeekend.setMinutes(0);
            // Loop through the list of weather data to find the weather for the next weekend
            var weatherForNextWeekend;
            for (var i = 0; i < data.list.length; i++) {
                var currentWeather = data.list[i];
                var weatherDate = new Date(currentWeather.dt * 1000);
                if (weatherDate.getTime() >= nextWeekend.getTime()) {
                    weatherForNextWeekend = data.list[i];
                    break;
                }
            }
            // Display the weather information
            var weatherDiv = $("<div>").attr("id", "#weather-info");
            var weatherEl = $("#openweather-api");


            $(weatherDiv).text("The weather for the next weekend in " + data.city.name + " is expected to be " + weatherForNextWeekend.weather[0].description + " with a high of " + weatherForNextWeekend.main.temp_max + "°C and a low of " + weatherForNextWeekend.main.temp_min + "°C.");

            $(weatherEl).append(weatherDiv);
        }
    });
});

var getMovieGenres = function () {
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
    var movieApiEl = $(".container");
    var movieEl = $(".movie-genres");
    var movieCardEl = $(".movie-cards");

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
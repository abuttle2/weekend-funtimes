
//Add animation to p tag in hero banner:
$(document).ready(function(){
    // Select the text of the "lead" class
    var words = $('.lead').text().split(" ");
    
    // Empty the text of the "lead" class
    $('.lead').empty();
    
    // Loop through each word in the words array
    $.each(words, function(i, v){
    // Append the current word in the loop as a span element to the "lead" class, hide it, and fade it in with a delay of 1000ms * (index + 1)
    $('.lead').append($('<span>').text(v).hide().fadeIn(1000 * (i+1)));
    });
    });


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
            var nextFriday = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + (5 - currentDate.getDay() + 7) % 7);
            nextFriday.setHours(9);
            nextFriday.setMinutes(0);

            var nextSaturday = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + (6 - currentDate.getDay() + 7) % 7);
            nextSaturday.setHours(9, 0, 0, 0);

            var weatherForNextFriday;
            var weatherForNextSaturday;
            
            // Display the weather information
            var weatherDiv = $("<div>").attr("class", "container d-flex justify-content-center");
            var weatherEl = $("#openweather-api");

            var weatherTitle = $("<p>").text("The forecast for next weekend at " + data.city.name + " is the following:");
            weatherEl.append(weatherTitle);
            function displayWeather(date, weather) {
                // Loop through the list of weather data to find the weather for the next weekend
                for (var i = 0; i < data.list.length; i++) {
                    var currentWeather = data.list[i];
                    var weatherDate = new Date(currentWeather.dt * 1000);
                    if (weatherDate.getTime() >= date.getTime()) {
                        weather = data.list[i];
                        break;
                    }
                }
                

                // Create the Bootstrap card
                var card = $("<div>").addClass("card");
                var cardBody = $("<div>").addClass("card-body");
                $(card).append(cardBody);

                var cardTitle = $("<h3>").addClass("card-title");
                var formattedDate = weatherDate.toLocaleDateString("en-UK", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric"
                });
                cardTitle.text(formattedDate);
                $(cardBody).append(cardTitle);

                // Add the weather icon
                var icon = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + weather.weather[0].icon + "@2x.png");
                $(cardBody).append(icon);

                // Add the temperature information
                var temperature = $("<p>").addClass("card-text").text("Temperature: " + weather.main.temp_min + "°C - " + weather.main.temp_max + "°C");
                $(cardBody).append(temperature);

                // Add the wind information
                var wind = $("<p>").addClass("card-text").text("Wind Speed: " + weather.wind.speed + " m/s");
                $(cardBody).append(wind);

                // Add the humidity information
                var humidity = $("<p>").addClass("card-text").text("Humidity: " + weather.main.humidity + "%");
                $(cardBody).append(humidity);

                // Add the card to the weatherDiv
                $(weatherDiv).append(card);

                // Append weatherDiv to weatherEl
                $(weatherEl).append(weatherDiv);
            }
            displayWeather(nextFriday, weatherForNextFriday);
            displayWeather(nextSaturday, weatherForNextSaturday);
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


// javascript class for handling form submission

class FormSubmit {
    constructor(sttings) {
        this.settings = settings;
        this.form = document.querySelector(this.settings.form);
        this.formForm-btn = document.querySelector(settings.form-btn);
        if (this.form) {
            this.url = this.form.getAttribute('action');
        }
    }

    //display success message
    displaySuccess() {
        this.form.innerHTML = this.settings.success;

    }

    //display error message

    displayError() {
        this.form.innerHTML = this.settings.error;
}

}


init () {
    if (this.form) this.formForm-btn.addEventListener("click", this.globalThis.displaySuccess());
    return this;
}


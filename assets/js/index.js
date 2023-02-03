// Listen for click event on the submit button
$("#submitBtn").on("click", function (event) {
    // Prevent the default form submit behavior
    event.preventDefault();
    // Get the value of the city input
    var city = $("#cityInput").val();
    // Generate the new src URL for the iframe
    var newSrc = "https://www.google.com/maps/embed/v1/search?q=campsite+" + city + "&key=AIzaSyAdjP3RyKMzcagNwl7pXD76vnw9KXjmTc0";
    $("#maps-iframe").attr("src", newSrc);

    // Make an AJAX call to a different API
    var apiURL = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=" + city + "&appid=32306d8e68f68c9295a794f157aaab66";
    $.ajax({
        url: apiURL,
        success: function (data) {
            console.log(data);
            var currentDate = new Date();
            var nextWeekend = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + (5 - currentDate.getDay() + 7) % 7);
            
            // Loop through the list of weather data to find the weather for the next weekend
            var weatherForNextWeekend;
            for (var i = 0; i < data.list.length; i++) {
                var currentWeather = data.list[i];
                var weatherDate = new Date(currentWeather.dt * 1000);
                if (weatherDate.getDate() == nextWeekend.getDate() && weatherDate.getMonth() == nextWeekend.getMonth() && weatherDate.getFullYear() == nextWeekend.getFullYear()) {
                    weatherForNextWeekend = currentWeather;
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

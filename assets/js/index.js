// Listen for click event on the submit button
$("#submitBtn").on("click", function (event) {
    // Prevent the default form submit behavior
    event.preventDefault();
    // Get the value of the city input
    var city = $("#cityInput").val();
    // Generate the new src URL for the iframe
    var newSrc = "https://www.google.com/maps/embed/v1/search?q=campsite+" + city + "&key=AIzaSyAdjP3RyKMzcagNwl7pXD76vnw9KXjmTc0";
    $("#maps-iframe").attr("src", newSrc);
});

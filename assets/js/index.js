$("#submitBtn").on("click", function (event) {
    event.preventDefault();
    
    var city = $("#cityInput").val();
    var newSrc = "https://www.google.com/maps/embed/v1/search?q=campsite+" + city + "&key=AIzaSyAdjP3RyKMzcagNwl7pXD76vnw9KXjmTc0";
    $("#maps-iframe").attr("src", newSrc);
});

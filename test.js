document.write('<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA-m24h4mwgeSkMpaQenjQNiPeAK5VLWjk&sensor=false"></script>');
setInterval(getGoogleMapAPIAndUpdateUI, 120000);
function getGoogleMapAPIAndUpdateUI() {
    navigator.geolocation.getCurrentPosition(function(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        var origin1 = new google.maps.LatLng(latitude, longitude);
        var destinationB = new google.maps.LatLng(24.068176, 120.700916);
        var service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix({
            origins: [origin1],
            destinations: [destinationB],
            travelMode: 'WALKING',
            unitSystem: google.maps.UnitSystem.METRIC,
        }, function callback(response, status) {
           console.log(response.rows[0].elements[0])
        });
    }, function(err) {
    	console.log(err)
    });
}
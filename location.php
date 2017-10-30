<html>
<div id="out"></div>
</html>


<script>
var output = document.getElementById("out");
if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
}
function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;
    output.innerHTML = '{"latitude" : ' + latitude + ', "longitude" : ' + longitude + '}';
    location.href = 'index.php?latitude='+latitude+'&longitude='+longitude;
}

function error() {
    output.innerHTML = "Unable to retrieve your location";
}

output.innerHTML = "<p>Locating…</p>";
navigator.geolocation.getCurrentPosition(success, error);

</script>



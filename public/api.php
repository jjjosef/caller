<?php
    header('Content-Type: text/html; charset=utf-8');
//var_dump($_GET);
    $url = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=".$_GET['latitude'].",".$_GET['longitude']."&destinations=24.068176,120.700916&key=AIzaSyA-m24h4mwgeSkMpaQenjQNiPeAK5VLWjk";
echo $url;
    $google_data = json_decode(file_get_contents($url, true), true);
    var_dump($google_data);
//24.171180,120.695140
?>



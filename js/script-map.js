// JavaScript code for initializing the map
function initMap() {
    var delhi = {lat: 28.7041, lng: 77.1025};
    window.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: delhi
    });
    ready();
};

// Handle error in case Google Maps API doesn't load
function mapError(){
    alert("Google Maps hasn't loaded. Please make sure you are connected to the internet and refresh this page.")
}
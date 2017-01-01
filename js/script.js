function ready() {

    // Maintain a list of Markers
    var markers = [];
    
    // Function to hide all existing markers
    function hideMarkers(){
        markers.forEach(function(data){
            data.setVisible(false);
        });
    }

    // Code to create an infoWindow
    var infowindow = new google.maps.InfoWindow({
        content: ''
    });

    // Function to create a marker
    function createMarker(loc, anim=''){
        // Code to display marker on the map
        var marker = new google.maps.Marker({
                        position: new google.maps.LatLng(loc.coordinates.lat, loc.coordinates.lng),
                        map : map,
                        animation : anim
                    });
        
        // URL to access Wikipedia API
        var wikiUrl = 'https://en.wikipedia.org/w/api.php?format=json' +
        '&action=query&prop=extracts&origin=*&exintro=&explaintext=&titles=' + loc.wikiName;

        // AJAX Call to Wikipedia API
        $.ajax({
            url: wikiUrl,
            dataType: 'json',
            success: function(data) {
                var page = Object.keys(data.query.pages)[0];
                var content;
                if(page != -1){
                    content = data.query.pages[page].extract;
                }
                else {
                    content = 'The following content could not be found';
                }

                var contentString = '<div id="content">'+
                            '<h1 id="firstHeading" class="firstHeading">' +
                            loc.name() + '</h1><div id="bodyContent">'+
                            '<p>' + content + '</p>'+
                            '<p><b>Data source : Wikipedia</b></p>'+
                            '</div>'+
                            '</div>';                

                // Code to add infoWIndow and bounce effect on mouse click
                marker.addListener('click', function() {
                    markers.forEach(function(data){
                        data.setAnimation('');
                    });

                    if(marker.getAnimation() === ''){
                        marker.setAnimation(google.maps.Animation.BOUNCE);
                    }
                    else {
                        marker.setAnimation('');
                    }
                    infowindow.setContent(contentString);
                    infowindow.open(map, marker);
                });
            }
        }).fail(function(){ // Gracefully handle failiure of AJAX Call
            alert('AJAX request failed. You may be disconnected from the internet. Please refresh the page to continue.');
        });
        return marker;
    }

    // Model for location 
    var Location = function(data){
         this.name = ko.observable(data.name);
         this.coordinates = data.coordinates;
         this.wikiName = data.wikiName;
    };

    // Hard coded initial data of locations
    var Locations = [
        {
            name: 'Rohini',
            coordinates: {lat: 28.7495, lng: 77.0565},
            wikiName: 'Rohini,_Delhi'
        },
        {
            name: 'Pitampura',
            coordinates: {lat: 28.6990, lng: 77.1384},
            wikiName: 'Pitam_Pura'

        },
        {
            name: 'Paschim Vihar',
            coordinates: {lat: 28.6687, lng: 77.1019},
            wikiName: 'Paschim_Vihar'
        },
        {
            name: 'Kirti Nagar',
            coordinates: {lat: 28.6504, lng: 77.1444},
            wikiName: 'Kirti_Nagar'
        },
        {
            name: 'Dwarka',
            coordinates: {lat: 28.5921, lng: 77.0460},
            wikiName: 'Dwarka,_Delhi'
        }
    ];

    // KnockoutJS ViewModel
    var ViewModel = function() {
        var self = this;
        self.locations = ko.observableArray([]);

        // Adding the initial locations to an Observable Array
        Locations.forEach(function(data){
            self.locations.push(new Location(data));
        });
        
        // Code to filter results on the basis of input
        self.search = ko.observable('');
        self.FilteredLocations = ko.computed(function(){
            var filtered = [];
            hideMarkers();
            infowindow.close();
            self.locations().forEach(function(data){
                if (data.name().toLowerCase().indexOf(self.search().toLowerCase()) > -1) {
                    filtered.push(data);
                    var flag = false;
                    markers.forEach(function(marker){
                        if(marker.getPosition().lat() == data.coordinates.lat){
                            marker.setVisible(true);
                            flag = true;
                        }
                    });
                    if(!flag) {
                        markers.push(createMarker(data));
                    }
                }
            });
            return filtered;
        }, self);
        
        // Code to make a marker bounce when selected in the list
        self.highlight = function(data) {
            markers.forEach(function(marker){
                if(marker.getPosition().lat() == data.coordinates.lat){
                    google.maps.event.trigger(marker, 'click');
                    map.panTo(marker.getPosition());
                }
            });

        };
    };

    // Binding the ViewModel
    var vm = new ViewModel();
    ko.applyBindings(vm);
}
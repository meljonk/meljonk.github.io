//in case of map error, alter google maps api url (not api key) to test
function mapError() {
	$('#map').html('<h2>"Sorry, something went wrong with Google Maps. Please check your internet connection and try again."</h2>');
};
//loads google map
function mapSuccess() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 51.509865, lng: -0.118092},
		zoom: 13
	});
	bounds = new google.maps.LatLngBounds();
	infoWindow = new google.maps.InfoWindow();
    ko.applyBindings(new ViewModel());
};

var PopulateMarkers = function(data) {
    var self = this;
	self.visible = ko.observable(true);
    self.title = data.title;
    self.position = data.location;
    self.lines = data.lines;
	self.marker = new google.maps.Marker({
		title: this.title,
		position: this.position,
		icon: ('http://maps.google.com/mapfiles/ms/icons/red-dot.png'),
        animation: google.maps.Animation.DROP
    });
	//populates all marker locations in sidebar
	self.show = function(location) {
		google.maps.event.trigger(self.marker, 'click');
	};
	//sets & shows map marker & infowindow locations
	self.setMarkers = ko.computed(function () {
        if(self.visible() === true) {
            self.marker.setMap(map);
            bounds.extend(self.marker.position);
            map.fitBounds(bounds);
        };
    });
	//adds bounce animation to marker and opens infowindow on click
	self.marker.addListener('click', function() {
		self.marker.setAnimation(google.maps.Animation.BOUNCE);
      	setTimeout(function() {
			self.marker.setAnimation(null);
    	}, 2090);
		popupInfo(this, self.title, self.position, self.lines, infoWindow);
	});
};

var ViewModel = function() {
    var self = this;
	self.markersList = ko.observableArray([]);
	self.filterLocations = ko.observable('');
    //populate location markers for each map location in the locations array
    locations.forEach(function(location, marker) {
        self.markersList.push(new PopulateMarkers(location));
    });
	//search filter function
	self.locationList = ko.computed(function() {
        var searchLocations = self.filterLocations().toLowerCase();//will not filter properly without toLowerCase function
        if (searchLocations) {
            return ko.utils.arrayFilter(self.markersList(), function(location) {
                var search = location.title.toLowerCase();//will not filter properly without toLowerCase function
                var result = search.includes(searchLocations);
				return result;
			});
        }
        return self.markersList();
    });
};

function popupInfo(marker, title, location, lines, infowindow) {
	var weatherUrl = "http://api.wunderground.com/api/517388eb0bd8a422/conditions/q/UK/London.json";
	$.getJSON(weatherUrl, function(data) {
		var details = data.current_observation;
		var currentWeather = details.temp_f + '°F ' + details.weather;
		infowindow.setContent('<h4>'+ marker.title +'</h4>' + "Weather: " + currentWeather + '<br>' + "Lines: " + lines);
        // Open the infowindow for the corresponding map marker location.
     	infowindow.open(map, marker);
	});
};

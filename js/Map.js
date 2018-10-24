var Carte = {

	markers : [],
	
	initMap : function(latitude, longitude,container,cityName) {
		this.coordoInit = {lat: latitude, lng: longitude};
		this.map = new google.maps.Map(document.getElementById(container), {
		zoom: 12,
		center: this.coordoInit});

		var self = this; 

		$("#blocDroite").hide();
		$("#infoStation").hide();
		$("#zoneCanvas").hide();

		$.ajax({
			url : "https://api.jcdecaux.com/vls/v1/stations?contract="+cityName+"&apiKey=24238e352f777fd3811dcdbfca1600d01783d0a7",
			type : "GET",
			dataType : "JSON",
			success: function(stations) { // détermine toute les stations
				
				var infowindow; 
				
				stations.forEach(function(station) { // affiche les info station par station

					var marker = new google.maps.Marker({
						position: {lat: station.position.lat, lng: station.position.lng},
						map: self.map
					});
					self.markers.push(marker); //ajout des marker dans une chaine pour markercluster

					marker.addListener("click", function() { // affichage infowindow au clic
						if (infowindow) // si un infowindow existe...
							infowindow.close(); //...il est fermé

						infowindow = new google.maps.InfoWindow({ //un nouveau infowindow crée
							content: station.name + " " + station.address
						});
						infowindow.open(map, marker); // et ouvert

						$("#schemaVelo").hide();
						$("#nomStation").html(station.name); //ajout des info à droite
						$("#adresseStation").html(station.address);
					
						if (station.status === "OPEN") { // conversion statut en Français
							$("#statusStation").html("ouverte");
						} else {
							$("#statusStation").html("fermée");
						};

						$("#nbVelo").html(station.available_bikes);

						$("#blocDroite").fadeIn(1500);
						$("#infoStation").show();

						if ($("#nbVelo").text() > 0) {
							$("#zoneCanvas").show();
						} else {
							$("#zoneCanvas").hide();
						}
					});
				});

				var markerCluster = new MarkerClusterer(self.map, self.markers, {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
				// création des markercluster via la chaine self.markers
			},

			error: function(erreur) {
				alert('Problème de chargement des données');
			}
		});
	},
}


$(function() { 

	var diapo = Object.create(Slider);
	diapo.init(".imgCarrousel", 0, "#precedent", "#suivant");
 
	var plan = Object.create(Carte);
	plan.initMap(45.752, 4.830, "map", "Lyon");

	var ResaVelo = Object.create(Reservation);
	ResaVelo.initReservation( 20 , "#boutonReserver", "#boutonAnnuler", "#stationReservee", "#nomStation" , "#etatReservation"); 

	var SignatureResa = Object.create(Signature);
	SignatureResa.initCanvas("#canvas", "#clear", "#boutonReserver", 300, 150);

});
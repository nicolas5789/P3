var Reservation = {
  
	initReservation: function(dureeReservation, boutonReserver, boutonAnnuler, stationReservee, idNomStation, idEtatResa) {
		this.dureeResa = dureeReservation * 60000;
		this.nomStationAffichee = $(idNomStation);
		this.etatReservation = idEtatResa;
		this.phraseEstExpiree = "<p>Votre réservation est expirée.<br/>Choisissez une station pour effectuer une nouvelle réservation.</p>";
		this.phraseEstAnnulee = "<p>Votre réservation a été annulé.<br/>Choisissez une station pour effectuer une nouvelle réservation.</p>";
		var self = this;

		$(boutonAnnuler).hide();
		
		if (sessionStorage.length == 0) {
			$(this.etatReservation).html("");
		};

		if (sessionStorage.length > 0) {
			$(boutonAnnuler).show();
		}
	
		$(boutonReserver).click(function() {
			self.sauvegardeResa();
			$(boutonAnnuler).show(); 	
		});
		
		$(boutonAnnuler).click(function() {
			self.annulerResa();
		});

		this.calculDelai(this.dureeResa, stationReservee, this.phraseEstExpiree, this.etatReservation);
	},

	sauvegardeResa: function() { 
		// sauvegarde de l'heure
		sessionStorage.clear();
		time = new Date();
		tempsAResa = time.getTime() 
		sessionStorage.setItem("tempsAResaStorage", tempsAResa);
		
		// sauvegarde la station
		stationReservee = this.nomStationAffichee.text();
		sessionStorage.setItem("stationReservee", stationReservee);
	},

	calculDelai: function(dureeReservation, stationReservee, estExpiree, etatResa) {

		setInterval(function() { // compte à rebour chaque seconde
			if (sessionStorage.stationReservee) {
				temps = new Date();
				heure = temps.getTime();
				tempsAuclic = parseInt(sessionStorage.tempsAResaStorage);
				
				delai = tempsAuclic + dureeReservation - heure; 
				
				secondesRestantes = Math.trunc(delai / 1000); // calcul du délai en secondes
				minutesRestantes = Math.trunc(secondesRestantes / 60); // calcul des secondes en minutes			
				secondesRestantes = Math.trunc(secondesRestantes % 60); // secondes restantes après calcul
				
				$(etatResa).html("Votre réservation à la station " + sessionStorage.stationReservee + " va expirer dans " + "<br>" + minutesRestantes + " minute(s) " + secondesRestantes + " seconde(s)"); 

				if (minutesRestantes <= 0 && secondesRestantes <= 0) {
					sessionStorage.clear();
					$(etatResa).html(estExpiree); 
					$(boutonAnnuler).hide();
				}
			}
		}, 1000, this.dureeResa, stationReservee, this.phraseEstExpiree, this.etatReservation); 
	},

	annulerResa: function() {
		if (sessionStorage.length !== 0) {
			sessionStorage.clear();
			$(this.etatReservation).html(this.phraseEstAnnulee);
		};
		$(boutonAnnuler).hide();
	},	
}
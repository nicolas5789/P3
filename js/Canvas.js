var Signature = {

	initCanvas: function(idCanvas, boutonEffacer, boutonReserver, widthCanvas, heightCanvas) { //initialisation du canvas
		this.canvasWidth = widthCanvas;
		this.canvasHeight = heightCanvas;
		this.context = canvas.getContext("2d"); 
		this.clickX = new Array(); 
		this.clickY = new Array(); 
		this.clickDrag = new Array();
		this.paint; 

		var self = this;

		$(boutonEffacer).hide();
		$(boutonReserver).hide();

		$(idCanvas).mousedown(function(e) { // actions si souris cliquée
			this.paint = true; 
			self.addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop); 
			self.redraw(); 
			$(boutonEffacer).show();
			$(boutonReserver).show();
		});

		$(idCanvas).mousemove(function(e) { // actions si souris en mouvement
			if (this.paint) { 
				self.addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true); 
				self.redraw(); 
			}
		});

		$(idCanvas).mouseup(function(e) { // si souris laché
			this.paint = false; 
		});

		$(idCanvas).mouseleave(function(e) { // si souris hors zone
			this.paint = false; 
		});

		// tactile
		$(idCanvas).on({"touchstart": function(e) {
			this.paint = true; 
			self.addClick(e.targetTouches[0].pageX - this.offsetLeft, e.targetTouches[0].pageY - this.offsetTop); 
			self.redraw(); 
			e.preventDefault();

			$(boutonEffacer).show();
			$(boutonReserver).show();
		}});

		$(idCanvas).on({"touchmove": function(e) {
			if (this.paint) { 
				self.addClick(e.targetTouches[0].pageX - this.offsetLeft, e.targetTouches[0].pageY - this.offsetTop, true); 
				self.redraw(); 
				e.preventDefault()
			}
		}});

		$(idCanvas).on({"touchend": function(e) {
			this.paint = false;
		}});
		// fin tactile

		$(boutonEffacer).click(function() {
			self.clear(boutonEffacer);
		});

		$(boutonReserver).click(function() {
			self.clear(boutonEffacer);
		});

	},

	addClick: function(x, y, dragging) { // ajout des positions du tracé dans des chaines
		this.clickX.push(x);
		this.clickY.push(y);
		this.clickDrag.push(dragging); 
	},

	redraw: function() { // permet d'afficher le tracé
		this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height); 
		this.context.strokeStyle = "#000000"; 
		this.context.lineJoin = "round"; 
		this.context.lineWidth = 3.5; 
	
		for (var i=0; i < this.clickX.length; i++) {		
			this.context.beginPath(); 
			if (this.clickDrag[i] && i) { 
				this.context.moveTo(this.clickX[i-1], this.clickY[i-1]); 
			} else {															
				this.context.moveTo(this.clickX[i]-1, this.clickY[i]);
			}
			this.context.lineTo(this.clickX[i], this.clickY[i]); 
			this.context.closePath(); 
			this.context.stroke(); 
		}
	},

	clear: function(boutonEffacer) { //efface le tracé
		this.clickX = new Array(); 
		this.clickY = new Array();
		this.clickDrag = new Array();
		this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight); 
		$(boutonEffacer).hide();
		$(boutonReserver).hide();
	},

}
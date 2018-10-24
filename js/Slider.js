var Slider = {

	init: function(container, indexImg, boutonPrecedent, boutonSuivant) {
		this.i = indexImg;
		this.img = $(container);
		this.$currentImg = $(container).eq(0);
		this.autoscroll;

		this.img.hide(); 
		this.$currentImg.show(); 

		var self = this;

		$(boutonPrecedent).click(function() {
	  		self.precedent();
		});

		$(boutonSuivant).click(function() {
			self.suivant(self);
		});

		$(document).keydown(function(e) {
			if (e.which == 37) {
				self.precedent();
	  		} else if (e.which == 39) {
				self.suivant(self);
	  		}
		});

		self.slideImg();
	},

	precedent: function() { 
	
		this.i--;

		if (this.i >= 0) {
			this.img.hide();
			this.$currentImg = this.img.eq(this.i);
			this.$currentImg.fadeIn(2000);
		} else {
			this.i = this.img.length;
		};

		clearTimeout(this.autoscroll);
		this.slideImg();
	},

	suivant: function(self) {
			
		self.i++;

		if (self.i <= self.img.length - 1) {
			self.img.hide();
			self.$currentImg = self.img.eq(self.i);
			self.$currentImg.fadeIn(2000);
		} else {
			self.i = -1;
		};

		clearTimeout(self.autoscroll);
		self.slideImg();
	},

	slideImg: function() {
		this.autoscroll = setTimeout(this.suivant, 6000, this); 
	}

}
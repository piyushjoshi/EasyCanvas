// gradients
shapes.LinearGradient = function(context){
	var settings = {
		start_x : 0,
		start_y : 0,
		end_x : 0,
		end_y : 0,
		colorStops : [],
		addColorStop : function(position, color){
			settings.colorStops.push({
				p : position,
				c : color
			});
		},
		context : context
	};
	this.startFrom = function(x, y){
		settings.start_x = x;
		settings.start_y = y;
		return this;
	};
	this.endAt = function(x, y){
		settings.end_x = x;
		settings.end_y = y;
		return this;
	};
	this.colorStop = function(position, color){
		settings.addColorStop(position, color);
		return this;
	};
	this.instantiate = function(){
		var grad = context.createLinearGradient(settings.start_x, settings.start_y, settings.end_x, settings.end_y),
			i = 0;
		for(i = 0; i < settings.colorStops.length; i++){
			grad.addColorStop( settings.colorStops[i].p, settings.colorStops[i].c );
		}
		return grad;
	};
};

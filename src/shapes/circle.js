// circle API
shapes.Circle = function(context){
	var settings = {
			context : context,
			center_x : NaN,
			center_y : NaN,
			radius : NaN,
			fillStyle : undefined,
			strokeStyle : undefined,
			backup : [],
			backupSize : shapes.undoingLimit,
			saveCurrentState : function(){
				if(settings.backup.length === settings.backupSize){
					settings.backup.shift();
				}
				settings.backup.push({
					center_x : settings.center_x,
					center_y : settings.center_y,
					radius : settings.radius,
					fillStyle : settings.fillStyle,
					strokeStyle : settings.strokeStyle
				});
			},
			validate : function(){
				return settings.center_x && settings.center_y && settings.radius;
			},
			angle : Math.PI * 2
		},
		_arc;
	this.x = function(x){
		settings.center_x = x;
		return this;
	};
	this.y = function(y){
		settings.center_y = y;
		return this;
	};
	this.radius = function(radius){
		settings.radius = radius;
		return this;
	};
	this.fillColor = function(color){
		settings.fillStyle = color;
		return this;
	};
	this.strokeColor = function(color){
		settings.strokeStyle = color;
		return this;
	};
	_arc = function(){
		settings.context.beginPath();
		settings.context.arc(settings.center_x, settings.center_y, settings.radius, 0 , settings.angle, false);
		if(settings.fillStyle){
			settings.context.fillStyle = settings.fillStyle;
		}
		if(settings.strokeStyle){
			settings.context.strokeStyle = settings.strokeStyle;
		}
		settings.saveCurrentState();
	};
	this.fill = function(){
		if(settings.validate()){
			_arc();
			context.fill();
		}
		return this;
	};
	this.stroke = function(){
		if(settings.validate()){
			_arc();
			context.stroke();
		}
	};
};

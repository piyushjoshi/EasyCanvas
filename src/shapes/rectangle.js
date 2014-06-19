// Rectangle API
shapes.Rectangle = function(context){
	var settings = {
		topLeft_x : 0,
		topLeft_y : 0,
		context : context,
		width : 0,
		height : 0,
		applyStyles : function(){
			if(settings.fillStyle){
				settings.context.fillStyle = settings.fillStyle;
			}
			if(settings.strokeStyle){
				settings.context.strokeStyle = settings.strokeStyle;
			}
		},
		backup : [],
		backupSize : shapes.undoingLimit,
		saveCurrentState : function(){
			if(settings.backup.length === settings.backupSize){
				settings.backup.shift();
			}
			settings.backup.push({
				x : settings.topLeft_x,
				y : settings.topLeft_y,
				width : settings.width,
				height : settings.height
			});
		},
		resetStateToDefault : function(){
			settings.topLeft_x = 0;
			settings.topLeft_y = 0;
			settings.width = 0;
			settings.height = 0;
			settings.saveCurrentState();
		}
	};
	this.x = function (topLeft_x){
		settings.topLeft_x = topLeft_x;
		return this;
	};
	this.y = function(topLeft_y){
		settings.topLeft_y = topLeft_y;
		return this;
	};
	this.width = function(width){
		settings.width = width;
		return this;
	};
	this.height = function(height){
		settings.height = height;
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
	this.fill = function(){
		settings.applyStyles();
		settings.context.fillRect(settings.topLeft_x, settings.topLeft_y, settings.width, settings.height);
		settings.saveCurrentState();
		return this;
	};
	this.stroke = function(){
		settings.applyStyles();
		settings.context.strokeRect(settings.topLeft_x, settings.topLeft_y, settings.width, settings.height);
		settings.saveCurrentState();
		return this;
	};
	this.clearAll = function(){
		var state = settings.backup.pop(),
			w = Math.ceil(state.x) > state.x ? state.width + 0.5 : state.width,
			h = Math.ceil(state.y) > state.y ? state.height + 0.5 : state.height;
		
		settings.context.clearRect(state.x, state.y, w, h);
		settings.resetStateToDefault();
		return this;
	};
	this.clearArea = function(start_x, start_y, width, height){
		settings.context.clearRect(start_x, start_y, width, height);
		return this;
	};
};

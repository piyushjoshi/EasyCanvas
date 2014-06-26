;(function(win){
var ContextWrapper;

// context wrapper
ContextWrapper = function(context){
	this.getContext = function(){
		return context;
	};
};

ContextWrapper.prototype = {
	constructor : ContextWrapper,
	beginPath : function(){
		this.getContext().beginPath();
		return this;
	},
	moveTo : function(x, y){
		this.getContext().moveTo(x, y);
		return this;
	},
	lineTo : function(x, y){
		this.getContext().lineTo(x, y);
		return this;
	},
	strokeColor : function(color){
		if(color){
			this.getContext().strokeStyle = color;
		}
		return this;
	},
	stroke : function(){
		this.getContext().stroke();
		return this;
	},
	reset : function(){
		this.getContext().canvas.width = this.getContext().canvas.width;
		return this;
	},
	fillStyle : function(style){
		this.getContext().fillStyle = style;
		return this;
	},
	attach : function(eventType, handler){
		var canvas = this.getContext().canvas,
			handlerWrapper = function(e){
				var x,
					y,
					rect = canvas.getBoundingClientRect(),
					computedStyle = window.getComputedStyle(canvas),
					borderLeftWidth = +((computedStyle.borderLeftWidth.match(/\d+/))[0]),
					borderTopWidth = +((computedStyle.borderTopWidth.match(/\d+/))[0]),
					paddingLeft = +((computedStyle.paddingLeft.match(/\d+/))[0]),
					paddingTop = +((computedStyle.paddingTop.match(/\d+/))[0]);
				e.x = e.clientX - rect.left - borderLeftWidth - paddingLeft;
				e.y = e.clientY - rect.top - borderTopWidth - paddingTop;
				handler(e);
			};
		canvas.addEventListener(eventType, handlerWrapper, false);
		return this;
	}
};
function exposeAPI(toObj){
	if(!toObj.ContextWrapper){
		toObj.ContextWrapper = ContextWrapper;
	}
}
var shapes = {
		undoingLimit : 10
	};
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
// image
shapes.Image = function(context){
	var settings = {
			context : context,
			imageObject : undefined,
			upperLeft_x : NaN,
			upperLeft_y : NaN,
			width : NaN,
			height : NaN,
			crop_x : NaN,
			crop_y : NaN,
			crop_width : NaN,
			crop_height : NaN
		},
		_draw;
	this.src = function(imageSource){
		var imageObject;
		if(typeof imageSource === "string"){
			imageObject = new window.Image();
			imageObject.src = imageSource;
			settings.imageObject = imageObject;
		} else if(imageSource instanceof window.Image){
			settings.imageObject = imageSource;
		}
		return this;
	};
	this.upperLeft = function(x, y){
		settings.upperLeft_x = x;
		settings.upperLeft_y = y;
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
	this.cropFrom = function(x, y){
		settings.crop_x = x;
		settings.crop_y = y;
		return this;
	};
	this.cropWidth = function(width){
		settings.cropWidth = width;
		return this;
	};
	this.cropHeight = function(height){
		settings.cropHeight = height;
		return this;
	};
	_draw = function(_settings){
		if(_settings.imageObject){
			if(typeof _settings.imageObject)
			if(_settings.upperLeft_x && _settings.upperLeft_y){
				if(_settings.width && _settings.height){
					if(_settings.crop_x && _settings.crop_y){
						if(!_settings.crop_width){
							_settings.crop_width = _settings.width - (_settings.crop_x - _settings.upperLeft_x);
						}
						if(!_settings.crop_height){
							_settings.crop_height = _settings.height - (_settings.crop_y - _settings.upperLeft_y);
						}
						_settings.context.drawImage(_settings.imageObject, 
							_settings.crop_x, _settings.crop_y, _settings.crop_width, _settings.crop_height,
							_settings.upperLeft_x, _settings.upperLeft_y,	_settings.width, _settings.height);
					} else{
						_settings.context.drawImage(_settings.imageObject, _settings.upperLeft_x, _settings.upperLeft_y,
							_settings.width, _settings.height);
					}
				} else{
					_settings.context.drawImage(_settings.imageObject, _settings.upperLeft_x, _settings.upperLeft_y);
				}
			}
		}
	};
	this.draw = function(){
		var _settings;
		if(settings.imageObject.complete){
			_draw(settings);	
		} else{
				_settings = {
					context : settings.context,
					imageObject : settings.imageObject,
					upperLeft_x : settings.upperLeft_x,
					upperLeft_y : settings.upperLeft_y,
					width : settings.width,
					height : settings.height,
					crop_x : settings.crop_x,
					crop_y : settings.crop_y,
					crop_width : settings.crop_width,
					crop_height : settings.crop_height
				};
				settings.imageObject.addEventListener("load", function(){
					_draw(_settings);
				},false);
		}
		return this;
	};
};
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
shapes.Text = function(context){
	var settings = {
		context : context,
		val : undefined,
		font : undefined,
		textAlign : undefined,
		textBaseline : undefined,
		x : 0,
		y : 0,
		backup : [],
		backupSize : shapes.undoingLimit,
		saveCurrentState : function(){
			if(settings.backup.length === settings.backupSize){
				settings.backup.shift();
			}
			settings.backup.push({
				val : settings.val,
				font : settings.font,
				align : settings.align,
				baseLine : settings.baseLine,
				x : settings.x,
				y : settings.y
			});
		}
	};
	this.val = function(txt){
		settings.val = txt;
		return this;
	};
	this.font = function(font){
		settings.font = font;
		return this;
	};
	this.textAlign = function(alignment){
		settings.textAlign = alignment;
		return this;
	};
	this.textBaseline = function(baseLine){
		settings.textBaseline = baseLine;
		return this;
	};
	this.x = function(x){
		settings.x = x;
		return this;
	};
	this.y = function(y){
		settings.y = y;
		return this;
	};
	this.print = function(){
		if(settings.val){
				if(settings.font){
					settings.context.font = settings.font;
				}
				if(settings.textBaseline){
					settings.context.textBaseLine = settings.textBaseLine;
				}
				if(settings.textAlign){
					settings.context.textAlign = settings.textAlign;
				}
				settings.context.fillText(settings.val, settings.x, settings.y);
				settings.saveCurrentState();
		}
		return this;
	};
};
function loadShapes(toObj){
	var k;
	for(k in shapes){
		toObj.prototype[k.toLowerCase()] = function(){
			var k_ = k; // required for killing closure of k
			return function(){
				return new shapes[k_](this.getContext());
			}
		}();
	}
}
	loadShapes(ContextWrapper);
	exposeAPI(win);

})(window);

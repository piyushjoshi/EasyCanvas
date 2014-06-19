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

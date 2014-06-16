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


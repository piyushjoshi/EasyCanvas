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

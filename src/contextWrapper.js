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

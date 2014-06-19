EasyCanvas
=============

Its a library to simplify working with HTML5 Canvas.

##Why?

The HTML5 Canvas API is verbose and requires many lines of code to do simple things.

###Example:

To draw an image on canvas we need to write following code:

```JavaScript
var canvas = document.getElementById("myCanvas"),
	context = canvas.getContext("2d"),
	image = new Image();
image.src = "/taj.png";
image.addEventListener("load", function(){
	context.drawImage(image, 10, 15, 200, 150, 300, 350, 150, 100);
});
```

###Observations:
	1. We need to create image object and actual work of drawing the image has to be done in callback.
	This process although necessary, is essentially a boilerplate.
	2. context.drawImage is not at all intutive to use.
	The order and purpose of each argument has to be referred to in the specification.
	This is error prone and time consuming.

###Simplification:

```JavaScript
var canvas = document.getElementById("myCanvas"),
    contextWrapper = new ContextWrapper(canvas.getContext("2d"));
contextWrapper.image().src("/taj.png")
	.cropFrom(10, 15).cropWidth(200).cropHeight(150)
	.upperLeft(300, 350).width(150).height(100).draw();
```

###Observations:
	1. Boilerplate code for adding event listener for image load is handled by API (ContextWrapper).
	2. Image manipulation is easier with method chaining and self explanatory method names.

###Added advantage:
	In addition to the above benefits the API provides the facility to 
	manipulate the same image and redraw it over and over again. 
	e.g.: the following code draws the same image at two locations one begins at (150, 100) and other at (250, 200):
```JavaScript
	contextWrapper.image().src("/taj.png").upperLeft(150, 100).width(100).height(100).draw()
	                        .upperLeft(250,200).draw();

```

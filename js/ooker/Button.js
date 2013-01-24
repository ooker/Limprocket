(function() {

var Button = function(label, color) {
	this.initialize(label, color);
}
var p = Button.prototype = new createjs.Container(); // inherit from Container

p.label;
p.background;
p.count = 0;

p.Container_initialize = p.initialize;

p.initialize = function(label, color) {
	this.Container_initialize();
	
	this.label = label;
	if (!color) { color = "#000"; }
	
	var text = new createjs.Text(label, "20px Arial", "#fff");
	text.textBaseline = "top";
	text.textAlign = "center";

	var width = text.getMeasuredWidth()+30;
	var height = text.getMeasuredHeight()+20;
	
	this.background = new createjs.Shape();
	this.background.graphics.beginFill(color).drawRoundRect(0,0,width,height,4);
	
	text.x = width/2;
	text.y = 10;
	
	this.addChild(this.background,text);
}

window.Button = Button;
}());
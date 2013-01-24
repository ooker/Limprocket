(function(){
  function Ship(img){
    this.initialize(img);
  }

  var p = Ship.prototype = new createjs.Container();
  p.base;
  p.hit = false;
  p.width;
  p.height;
	p.Container_initialize = p.initialize;
  p.Container_tick = p._tick;

  p.initialize = function(img){
    this.Container_initialize();    
    this.base = new createjs.Bitmap(img);
    this.regX = this.base.image.width / 2;
    this.regY = this.base.image.height / 2;
    this.base.x = 0;
    this.base.y = 0;
    this.height = this.base.image.height;
    this.width = this.base.image.width;    
    this.addChild(this.base);
  }

  p._tick = function(){
    this.Container_tick();
		//this.base.scaleX = 1-window.Game.getSpeed()/10;
  }
  window.Ship = Ship;
}());
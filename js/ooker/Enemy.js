(function(){
  function Enemy(img){
    this.initialize(img);
  }

  var p = Enemy.prototype = new createjs.Container();
  p.base;
  p.hit = false;
  p.width;
  p.height;
	p.angle = 0;
  p.Container_initialize = p.initialize;
  p.Container_tick = p._tick;

  p.initialize = function(img){
    this.Container_initialize();    
    this.base = new createjs.Bitmap(img);
    this.regX = this.base.image.height / 2;
    this.regY = this.base.image.width / 2;
    this.base.x = 0;
    this.base.y = 0;
    this.height = this.base.image.height;
    this.width = this.base.image.width;    
    this.addChild(this.base);
		this.cache(0, 0, this.width, this.height);
  }

  p._tick = function(){
    this.Container_tick();
		this.y += speed;
		if(this.y > 500){
			this.y = -Math.floor((Math.random()*600));
			this.x = Math.floor((Math.random()*300)+20);
		}
		
  }
  window.Enemy = Enemy;
}());
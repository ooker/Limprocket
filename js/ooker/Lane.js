(function(){
	function Lane(img){
		this.initialize(img);
	}

	var p = Lane.prototype = new createjs.Container();
	p.base;
	p.tf;
	p.height;
	p.gameOn = true;
	p.Container_initialize = p.initialize;
	p.Container_tick = p._tick;

	p.initialize = function(img){
		this.Container_initialize();    
		this.base = new createjs.Shape( );
		this.base.graphics.beginBitmapFill(img).drawRect(0, 0, 320, 4480);
		this.addChild(this.base);
		
		
		//tekstid
		
		this.tf = new createjs.Text("FINIŠ", "bold 72px Arial", "#8d5353");
		this.tf.maxWidth = 320;
		this.tf.textAlign = "center";
		this.tf.x = 160;
		this.tf.y = 480+100;
		this.addChild(this.tf);
				
		for(var i = 0; i<10; i++){
			this.tf = new createjs.Text(i.toString(), "bold 72px Arial", "#8d5353");
			this.tf.maxWidth = 100;
			this.tf.textAlign = "right";
			this.tf.x = 280;
			this.tf.y = 480+((i+1)*300);
			this.addChild(this.tf);
			//console.log(this.tf.text + " " + this.tf.y);
		}
		
		this.tf = new createjs.Text("START", "bold 72px Arial", "#8d5353");
			this.tf.maxWidth = 320;
			this.tf.textAlign = "center";
			this.tf.x = 160;
			this.tf.y = 480+(12*300);
			this.addChild(this.tf);
		
			p.line = new createjs.Shape();
			p.line.graphics.beginFill("#8d5353").drawRect(0, 0, 320, 3);
			p.line.y = 4170;
			this.addChild(p.line);
			
			p.line = new createjs.Shape();
			p.line.graphics.beginFill("#8d5353").drawRect(0, 0, 320, 3);
			p.line.y = 570;
			this.addChild(p.line);
		
			this.cache(0, 0, 320, 4480);
		//p.makeLineNumbers();
	}
	
	p.makeLineNumbers = function(){
		for(var i = 0; i<10; i++){
			this.tf = new createjs.Text(i.toString(), "bold 36px Arial", "#7d5353");
			this.tf.maxWidth = 260;
			this.tf.x = 280;
			this.tf.y = i*100;
			this.addChild(this.tf);
			//console.log(this + this.tf.isVisible() + p + p.tf);
		}
		
	}
	
	p._tick = function(){
		if(this.gameOn == true){
			this.Container_tick();
			this.y += speed/2;
		}
		/*if(this.y > 500){
			this.y = -Math.floor((Math.random()*600));
			this.x = Math.floor((Math.random()*300)+20);
		}*/
	}
	window.Lane = Lane;
}());
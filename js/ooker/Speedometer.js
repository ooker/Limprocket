(function(){
	var Speedometer = function(){
		this.initialize();
	}

	var p = Speedometer.prototype = new createjs.Container();
	p.textScore;
	p.textOver;
	p.startButton;
	p.gameOn = true;
	p.Container_initialize = p.initialize;
	p.Container_tick = p._tick;
	
	p.initialize = function(){
		this.Container_initialize();
		skoor = 5;
		
		this.textScore = new createjs.Text("0", "bold 17px Arial", "#222");
		this.textScore.x = 160;
		this.textScore.y = 3;
		this.textScore.textAlign = "center";
		this.textScore.regX = this.textScore.getMeasuredWidth / 2;
		this.addChild(this.textScore);
	}
	
	p.gameOver = function(){
		this.textScore.text += " PUNKTI";
		TweenLite.to(this.textScore, 1, {y:80, scaleX:2, scaleY:2});
		
		this.textOver = new createjs.Text("G-OVER!", "bold 50px Arial", "#fff");
		this.textOver.x = 160;
		this.textOver.y = 300;
		this.textOver.alpha = 0;
		this.textOver.textAlign = "center";
		this.textOver.regX = this.textOver.getMeasuredWidth / 2;
		this.addChild(this.textOver);
		TweenLite.to(this.textOver, 0.75, {alpha:0.4, y:240});
		
		this.startButton = new Button("UUESTI", "#000");
		this.startButton.x = 116;
		this.startButton.y = 310;
		this.addChild(this.startButton);
		this.startButton.onClick = this.startButtonClick;
	}
	
	p.startButtonClick = function(e){
		console.log("starting over..." + root);
		root.startOver();
	}
	
  p._tick = function(){
		
    
		if(this.gameOn == true){
			//this.Container_tick();
			skoor += speed*speed;
			this.textScore.text = skoor.toString();
		} else {
			speed = 0;
		}
		//console.log(p.textField.text);
	}
	window.Speedometer = Speedometer;
}());
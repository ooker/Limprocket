/* 

Ooker proovib:
Javascriptiga Android accelometeri kallale??? Possible?

 */

var speed = 1;
var ship;
var skoor = 0;
var root;

(function(){
	var Game = function(){
    p.initialize();
  }
	var p = Game.prototype = {};
	p.browser;
  p.canvas;
  p.stage;
	p.maxW;
	p.maxH;
	p.manifest;
	p.ship;
	p.enemies = new Array();
	p.friends = new Array();
	p.speedometer;
	p.lane;
	p.speedMIN = 1;
	p.speedMAX = 4;
	p.endMargin = -200;
	p.gameOn = true;
	
	document.onkeyup = onKeyUp;
  document.onkeydown = onKeyDown;
	p.move = {
		speedX: 0,
		left: false,
		right: false,
		up: false,
		down: false
  };
	p.keys = {
		space: 32,
		left: 37,
		right: 39,
		up: 38,
		down: 40
	};
	
	p.preload;
	
	p.initialize = function (){
		root = this;
		this.browser = BrowserDetect.OS;
		this.manifest = [
			{id:'ship', src:'assets/ship2.png'},
			{id:'enemy', src:'assets/enemy2.png'},
			{id:'friend', src:'assets/friend2.png'},
			{id:'lane', src:'assets/rada.gif'},
			{id:'sfxBad', src:'assets/sfx/impact_bad.ogg'},
			{id:'sfxGood', src:'assets/sfx/impact_good.ogg'},
			{id:'sfxKlikk', src:'assets/sfx/klikk.ogg'},
			{id:'sfxWind', src:'assets/sfx/kosmosetuul.ogg'}
		];

		this.canvas = document.getElementById("game");
		this.stage = new createjs.Stage(this.canvas);
		this.maxW = this.canvas.width;
		this.maxH = this.canvas.height;
		createjs.Touch.enable(this.stage);
		//this.stage.enableMouseOver(10);
		this.stage.mouseMoveOutside = true;
		this.stage.mouseEventsEnabled = true;
		
		this.stage.update();
		this.PreloadAll();
  }
	
	
	
	p.PreloadAll = function(){
		this.preload = new createjs.PreloadJS(false);
		this.preload.onComplete = this.doneLoading;
		//this.preload.onFileLoad = this.preloadProcess;
		this.preload.installPlugin(createjs.SoundJS);
		this.preload.loadManifest(this.manifest);
	}
	p.doneLoading = function(){
		p.stage.removeAllChildren();
		p.createLane();
		p.createShip();
		p.createEnemies();
		p.createFriends();
		p.createUI();
		createjs.Ticker.setFPS(30);
		createjs.Ticker.addListener(p.tick);
		//p.playSoundLoop("sfxWind");
	}
	
	p.tick = function(){
		p.update();
		//p.stage.update();
		//console.log("update");
  }
	
	p.update = function(){
		this.stage.update();
		if(p.gameOn == true){
			p.updateMovement();
			p.collide();
		}
  }
	p.updateMovement = function(){
		if(this.ship.x > 0 && this.ship.x < this.maxW){
			this.ship.x += p.move.speedX;
		} else {
			if(this.ship.x <= 0){
				this.ship.x = 1;
			} else if(this.ship.x >= this.maxW){
				this.ship.x = this.maxW - 1;
			}
			this.move.speedX = 0;
		}
		if(p.lane.y >= this.endMargin){
			this.gameOn = false;
			p.lane.gameOn = false;
			p.speedometer.gameOn = false;
			p.speedometer.gameOver();
			//createjs.Ticker.removeListener(p.tick);
			//createjs.Ticker.pause();
		}
		
		this.ship.base.skewX = this.move.speedX*5;
		this.ship.base.skewY = this.move.speedX*2;
	}
	p.speedUp = function(){
		if(speed <= p.speedMAX && this.gameOn == true){
			speed++;
			TweenLite.to(p.ship, 1, {y:p.maxH - speed*80});
		}
	}
	p.speedDown = function(){
		if(speed > p.speedMIN && this.gameOn == true){
			speed--;
			TweenLite.to(p.ship, 1, {y:p.maxH - speed*80});
		}
	}
	p.collide = function(){
		for(var i=0; i< this.enemies.length; i++){
			enemyCollision = ndgmr.checkPixelCollision(this.enemies[i].base, this.ship.base, 0.75);
			if(enemyCollision){
				this.enemies[i].hit = true;
				if(this.enemies[i].x > this.ship.x){
					p.move.speedX -= 3;
					TweenLite.fromTo(this.ship, 0.5, {rotation:-359},{rotation:0} );
					TweenLite.to(this.enemies[i], 0.5, {x:"+=80", y:"-=30"} );
				} else {
					p.move.speedX += 3;
					TweenLite.fromTo(this.ship, 0.5, {rotation:359}, {rotation:0});
					TweenLite.to(this.enemies[i], 0.5, {x:"-=80", y:"-=30"} );
				}
				skoor -= 3000;
				p.playSound("sfxBad");
				//this.stage.removeChild(this.enemies[i]);
				//this.enemies.splice(i,1);
			}
		}
		for(var f=0; f<this.friends.length; f++){
			friendCollision = ndgmr.checkPixelCollision(this.friends[f].base, this.ship.base, 0.75);
			if(friendCollision){
				this.friends[f].hit = true;
				this.friends[f].y = p.maxH + 40;
				skoor += 3000;
				p.playSound("sfxGood");
			}
		}
	}
	
	p.createLane = function(){
    this.lane = new Lane(this.preload.getResult('lane').result);
		this.lane.y = -4480+480;
    this.stage.addChild(this.lane);
	}
	p.createShip = function(){
    this.ship = new Ship(this.preload.getResult('ship').result);
		this.ship.x = this.maxW / 2;
		this.ship.y = this.maxH - this.ship.height;
    this.stage.addChild(this.ship);
		ship = this.ship;
	}
	p.createEnemies = function(){
    for(var i = 0; i < 10; i++){
      var enemy = new Enemy(this.preload.getResult('enemy').result);
      enemy.x = this.getRandom(20,300);
      enemy.y = this.getRandom(-600, -20);
      this.enemies.push(enemy);
      this.stage.addChild(enemy);
    }
	}
	p.createFriends = function(){
    for(var i = 0; i < 2; i++){
      var friend = new Friend(this.preload.getResult('friend').result);
			friend.x = this.getRandom(20,300);
      friend.y = this.getRandom(-800, -100);
      this.friends.push(friend);
      this.stage.addChild(friend);
    }
	}
	p.createUI = function(){
		p.speedometer = new Speedometer();
		this.stage.addChild(p.speedometer);
	}
	
	p.startOver = function(){
		console.log("teeme uuesti");

		this.stage.removeAllChildren();
		this.enemies = [];
		this.friends = [];
		this.move.speedX = 0;
		speed = 1;
		this.gameOn = true;
		this.createLane();
		this.createShip();
		this.createEnemies();
		this.createFriends();
		this.createUI();
	}
	
	function onKeyUp(e){
		switch(e.keyCode){
			case p.keys.left:
				TweenLite.to(p.move, 1, {speedX:0});
				break;
			case p.keys.right:
				TweenLite.to(p.move, 1, {speedX:0});
				break;
			default:
				break;
		}
	}
	function onKeyDown(e){
		switch(e.keyCode){
			case p.keys.left:
				p.move.speedX-= 0.1;
				break;
			case p.keys.right:
				p.move.speedX+= 0.1;
				break;
			case p.keys.space:
				p.move.speedX = 0;
				break;
			case p.keys.up:
				p.speedUp();
				break;
			case p.keys.down:
				p.speedDown();
				break;
			default:
				break;
		}
	}
	
	p.playSound = function(soundID){
		var result = p.preload.getResult(soundID);
		var sound = createjs.SoundJS.play(result.id, createjs.SoundJS.INTERRUPT_EARLY, 0, 0, 0, 0.6, 0);
	}
	p.playSoundLoop = function(soundID1){
		var result1 = p.preload.getResult(soundID1);
		var sound1 = createjs.SoundJS.play(result1.id, createjs.SoundJS.INTERRUPT_ANY, 0, 0, 3000, 0.2, 0);
	}
	
	p.getRandom = function(min, max) {
		return Math.random() * (max - min) + min;
	}
	
	window.Game = Game;
	
	// public???
	return {
		getSpeed:function(){
			return this.move.speedX;
		}
	}

})();

var BrowserDetect = {
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
	},
	searchString: function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	dataBrowser: [
		{
			string: navigator.userAgent,
			subString: "Chrome",
			identity: "Chrome"
		},
		{ 	string: navigator.userAgent,
			subString: "OmniWeb",
			versionSearch: "OmniWeb/",
			identity: "OmniWeb"
		},
		{
			string: navigator.vendor,
			subString: "Apple",
			identity: "Safari",
			versionSearch: "Version"
		},
		{
			prop: window.opera,
			identity: "Opera",
			versionSearch: "Version"
		},
		{
			string: navigator.vendor,
			subString: "iCab",
			identity: "iCab"
		},
		{
			string: navigator.vendor,
			subString: "KDE",
			identity: "Konqueror"
		},
		{
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox"
		},
		{
			string: navigator.vendor,
			subString: "Camino",
			identity: "Camino"
		},
		{		// for newer Netscapes (6+)
			string: navigator.userAgent,
			subString: "Netscape",
			identity: "Netscape"
		},
		{
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "Explorer",
			versionSearch: "MSIE"
		},
		{
			string: navigator.userAgent,
			subString: "Gecko",
			identity: "Mozilla",
			versionSearch: "rv"
		},
		{ 		// for older Netscapes (4-)
			string: navigator.userAgent,
			subString: "Mozilla",
			identity: "Netscape",
			versionSearch: "Mozilla"
		}
	],
	dataOS : [
		{
			string: navigator.platform,
			subString: "Win",
			identity: "Windows"
		},
		{
			string: navigator.platform,
			subString: "Mac",
			identity: "Mac"
		},
		{
			   string: navigator.userAgent,
			   subString: "iPhone",
			   identity: "iPhone/iPod"
	    },
	    {
			   string: navigator.userAgent,
			   subString: "iPad",
			   identity: "iPad"
	    },
		{
			string: navigator.platform,
			subString: "Linux",
			identity: "Linux"
		}
	]

};
BrowserDetect.init();
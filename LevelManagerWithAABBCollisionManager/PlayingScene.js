PlayingScene.prototype = new Scene(); //this inherits from Scene
var gameState = {COUNTDOWN:"countdown",PLAY:"play",NEWLEVEL:"newlevel"}
function PlayingScene()
{
	this.title = "Playing";
	this.grid = new Grid(window.innerWidth,window.innerHeight,10,10);
	this.player = new Player();
	this.collisionManager = new CollisionManager();
	this.levelManager = new levelManager();
	this.spawner = new spawner();
	this.starterCountdown = new button("",canvas.width/2,canvas.height/2);
	this.countdownTime = 1;
	this.timer = 0;
	this.currentGameState = gameState.COUNTDOWN;
	this.scoreManager = new scoreManager();
	
}

PlayingScene.prototype.Update = function(dt)
{
	if(this.currentGameState === gameState.COUNTDOWN)
	{
		this.countdownTimer(dt,1000);
		this.starterCountdown.update();
		this.starterCountdown.setText(this.countdownTime+"");
		if(this.countdownTime <= 0)
		{
			this.timer = 0;
			this.countdownTime = 1;
			this.currentGameState = gameState.PLAY;
		}
	}
	if(this.currentGameState === gameState.PLAY)
	{
		this.grid.showOnGrid(this.player.x+35,this.player.y+35)
		this.player.update();
		this.spawner.setPlayerCollision(this.player.circle);
		for (var i = 0; i < this.levelManager.arrayOfLevels[this.levelManager.level-1].length; i++) 
		{
			if(this.player.rect.intersects(this.levelManager.arrayOfLevels[this.levelManager.level-1][i].bounds))
			{

				this.offsetX = this.collisionManager.getHorizontalIntersectionDepth(this.player.rect,this.levelManager.arrayOfLevels[this.levelManager.level-1][i].bounds);
				this.offsetY = this.collisionManager.getVirticalIntersectionDepth(this.player.rect,this.levelManager.arrayOfLevels[this.levelManager.level-1][i].bounds);

				if (Math.abs(this.offsetX) > Math.abs(this.offsetY))
				{
					this.player.y += this.offsetY;
				}
				else
				{
				 	this.player.x += this.offsetX;	
				}
			}
		}
			
		this.spawner.update(dt);
		this.scoreManager.update(dt);
		this.scoreManager.setHitScore(this.spawner.hitCounter);
		this.scoreManager.setMissScore(this.spawner.missCounter * this.scoreManager.level);
		this.spawner.manageGameDiff(this.scoreManager.level);
		this.levelManager.level = this.scoreManager.level;
	}
}

PlayingScene.prototype.draw = function()
{

	this.grid.draw();
	ctx.clearRect(0,0,10000,10000);
	this.levelManager.draw();
	
	
	
	
	if(this.currentGameState === gameState.COUNTDOWN)
	{
		this.starterCountdown.draw();
	}
	else
	{
		this.scoreManager.draw();
	}
    this.spawner.draw();
	this.player.draw(canvas);
}

PlayingScene.prototype.Start = function()
{
	audioManager.playSound("music",true);
}

PlayingScene.prototype.Stop = function()
{
	ctx.clearRect(0,0,1000,1000);
}

PlayingScene.prototype.countdownTimer = function(dt,interval)
{
	this.timer += dt;
	if(this.timer > interval)
	{
		this.timer = 0;
		//call function here
		this.countdownTime--;
	}
}
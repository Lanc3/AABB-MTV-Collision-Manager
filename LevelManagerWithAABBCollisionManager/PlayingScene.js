

PlayingScene.prototype = new Scene(); //this inherits from Scene

function PlayingScene()
{
	this.title = "Playing";
	this.grid = new Grid(window.innerWidth,window.innerHeight,10,10);
	this.player = new Player();
	this.collisionManager = new CollisionManager();
	this.levelManager = new levelManager();
}

PlayingScene.prototype.Update = function()
{
	this.grid.draw();
	this.grid.showOnGrid(this.player.x+35,this.player.y+35)
	this.player.update();
	for (var i = 0; i < this.levelManager.arrayOfWalls.length; i++)
	{
		if(this.player.rect.intersects(this.levelManager.arrayOfWalls[i].bounds))
		{

			this.offsetX = this.collisionManager.getHorizontalIntersectionDepth(this.player.rect,this.levelManager.arrayOfWalls[i].bounds);
			this.offsetY = this.collisionManager.getVirticalIntersectionDepth(this.player.rect,this.levelManager.arrayOfWalls[i].bounds);

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
	
	if(this.player.isMoving)
	{
		//this.levelManager.toggle = false;
	}
	else
	{
		//this.levelManager.toggle = true;
	}
}

PlayingScene.prototype.draw = function()
{
	this.grid.draw();
	this.player.draw(canvas);
	this.levelManager.draw();
}


PlayingScene.prototype.handelInput = function(event)
{
	var key = getCharCode(event);
	if(key == 68 || key == 39)
	{
		this.player.moveRight();

	}
	if(key == 65 || key == 37)
	{
		this.player.moveLeft();
	}
	if(key == 87 || key == 38)
	{
		this.player.moveUp();
	}
	if(key == 83 || key == 40)
	{
		this.player.moveDown();
	}

}
PlayingScene.prototype.handelReleaseInput = function(event)
{
	var key = getCharCode(event);
	if(key == 68 || key == 39)
	{
		this.player.stopRight();

	}
	if(key == 65 || key == 37)
	{
		this.player.stopLeft();
	}
	if(key == 87 || key == 38)
	{
		this.player.stopUp();
	}
	if(key == 83 || key == 40)
	{
		this.player.stopDown();
	}

}


PlayingScene.prototype.Start = function()
{
	var self = this;
	window.addEventListener("keydown", function(evt)
	{
		self.handelInput(evt)
	}, false);
	window.addEventListener("keyup", function(evt)
	{
		self.handelReleaseInput(evt)
	}, false);

}

PlayingScene.prototype.Stop = function()
{
	window.removeEventListener("keydown",this.handelInput);
	ctx.clearRect(0,0,1000,1000);
}
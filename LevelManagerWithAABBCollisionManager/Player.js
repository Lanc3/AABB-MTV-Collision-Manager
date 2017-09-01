function Player()
{
	this.x = 5;
	this.y = 10;
	this.xVelocity = 0;
	this.yVelocity = 0;
	this.gravity = 4;
	this.size = 75;
	this.rect = new Rect(this.x,this.y,this.size,this.size);
	this.isHorozontalMove = false;
	this.isMoving = false;
	this.speed = 15;
	this.xVelocity = 0;
	this.yVelocity = 0;
	this.snapDistance = 7;
	this.circle = new circle(this.x,this.y,this.size,rgb(0,255,0));
	this.animation = new Animation("player",30);
}

Player.prototype.Init = function()
{
	
}

Player.prototype.distance = function(x,y)
{
	this.X = this.x - x;
	this.Y = this.y - y;
	return Math.sqrt( this.X*this.X + this.Y*this.Y);
}

Player.prototype.update = function()
{
	this.circle.setPosition(this.x,this.y);
	if(inputController.touching)
	{	
		if(this.distance(inputController.mouseCanvasPositionX,inputController.mouseCanvasPositionY) > this.snapDistance)
		{
			this.calculateMovementTowards(inputController.mouseCanvasPositionX,inputController.mouseCanvasPositionY);
			this.x -= this.xVelocity;
			this.y -= this.yVelocity;
		}
		
	}
	//visuals
	this.rect.x = this.x - this.size/2;
	this.rect.y = this.y - this.size/2;
	this.animation.setPosition(this.x,this.y);
}

Player.prototype.draw = function()
{
	this.circle.draw();
	this.animation.draw();
	if(this.y <= 0)
	{
		this.y = 0;
	}
	if(this.x >= canvas.width-75)
	{
		this.x = canvas.width-75;
	}
	if( this.x < 0)
	{
		this.x = 0;
	}
	if( this.y > canvas.height-75)
	{
		this.y = canvas.height-75;
	}
}
Player.prototype.calculateMovementTowards = function(targetX,targetY)
{
	var dx = this.x - targetX;
	var dy = this.y - targetY;
	var angle = Math.atan2(dy, dx)

	this.xVelocity = this.speed * Math.cos(angle);
	this.yVelocity = this.speed * Math.sin(angle);
}


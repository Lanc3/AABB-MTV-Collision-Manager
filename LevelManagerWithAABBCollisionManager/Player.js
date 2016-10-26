function Player()
{
	this.x = 5;
	this.y = 10;
	this.xVelocity = 0;
	this.yVelocity = 0;
	this.gravity = 4;
	this.rect = new Rect(this.x,this.y,75,75);
	this.isHorozontalMove = false;
	this.isMoving = false;
}

Player.prototype.Init = function()
{
	
}

Player.prototype.update = function()
{
	this.rect.x = this.x;
	this.rect.y = this.y;
}

Player.prototype.draw = function()
{
	ctx.fillStyle = rgb(0,255,0,0) ;
	ctx.fillRect(this.x,this.y,75,75);
	this.x+=this.xVelocity;
	this.y+=this.yVelocity;
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

Player.prototype.jump = function()
{
	if(this.y >= canvas.height-75)
	{
		this.yVelocity = -40;
	}
}
Player.prototype.moveLeft = function()
{
	this.xVelocity = -3;
	this.yVelocity = 0;
	this.isHorozontalMove = true;
	this.isMoving = true;
}
Player.prototype.moveRight = function()
{
	this.xVelocity = 3;
	this.yVelocity = 0;
	this.isHorozontalMove = true;
	this.isMoving = true;
}
Player.prototype.moveUp = function()
{
	this.yVelocity = -3;
	this.xVelocity = 0;
	this.isHorozontalMove = false;
	this.isMoving = true;
}
Player.prototype.moveDown = function()
{
	this.yVelocity = 3;
	this.xVelocity = 0;
	this.isHorozontalMove = false;
	this.isMoving = true;
}


Player.prototype.stopLeft = function()
{
	this.xVelocity = 0;
	this.yVelocity = 0;
	this.isHorozontalMove = true;
	this.isMoving = false;
}
Player.prototype.stopRight = function()
{
	this.xVelocity = 0;
	this.yVelocity = 0;
	this.isHorozontalMove = true;
	this.isMoving = false;
}
Player.prototype.stopUp = function()
{
	this.yVelocity = 0;
	this.xVelocity = 0;
	this.isHorozontalMove = false;
	this.isMoving = false;
}
Player.prototype.stopDown = function()
{
	this.yVelocity = 0;
	this.xVelocity = 0;
	this.isHorozontalMove = false;
	this.isMoving = false;
}
function Goal()
{
	this.x = 200;
	this.y = 500;
	this.size = 75;
	this.rect = new Rect(this.x,this.y,75,75);
}

Goal.prototype.Init = function()
{
	
}

Goal.prototype.draw = function()
{
	game.ctx.fillStyle = rgb(255,255,255,0) ;
	game.ctx.strokeRect(this.x,this.y,this.size,this.size);
	
}


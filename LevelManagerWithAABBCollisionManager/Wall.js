function Wall(x,y,w,h)
{
	this.bounds = new Rect(x,y,w,h);
}

Wall.prototype.update = function()
{

}

Wall.prototype.draw = function()
{
	ctx.fillStyle = rgb(0,0,0,0) ;
	ctx.fillRect(this.bounds.x,this.bounds.y,this.bounds.width,this.bounds.height);
}
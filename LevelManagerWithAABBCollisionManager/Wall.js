function Wall(x,y,w,h)
{
	this.bounds = new Rect(x,y,w,h);
}

Wall.prototype.update = function()
{

}

Wall.prototype.draw = function()
{
	ctx.drawImage(assetManager.getAsset("wall").image,
		this.bounds.x,
		this.bounds.y,
		this.bounds.width,
		this.bounds.height);
}

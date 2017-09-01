function circle(x,y,r,c)
{
	this.x = x;
	this.y = y;
	this.radius = r;
	this.color = c;
}

circle.prototype.update = function(dt)
{

}
circle.prototype.setPosition = function(x,y)
{
	this.x = x;
	this.y = y;
}

circle.prototype.draw = function()
{
	ctx.drawImage(assetManager.getAsset("circle").image,
		this.x-this.radius/2,
		this.y-this.radius/2,
		this.radius,
		this.radius);
}

circle.prototype.intersects = function(circle)
{
	this.dist = this.distance(circle.x,circle.y);
	return this.dist < this.radius+circle.radius;
}
circle.prototype.distance = function(x,y)
{
	this.X = this.x - x;
	this.Y = this.y - y;
	return Math.sqrt( this.X*this.X + this.Y*this.Y);
}

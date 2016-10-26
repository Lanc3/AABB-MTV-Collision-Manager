function Rect(x,y,w,h)
{
	this.x = x;
	this.y = y;
	this.width = w;
	this.height = h;
}

Rect.prototype.intersects = function(b)
{
	if (this.x < b.x + b.width &&
			this.x + this.width > b.x &&
			this.y < b.y + b.height &&
			this.y + this.height > b.y)
		{
			return true;
		}
		return false;
}
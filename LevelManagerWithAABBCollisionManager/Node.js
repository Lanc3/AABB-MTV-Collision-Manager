function Node(x,y,w,h)
{
	this.x = x;
	this.y = y;
	this.width = w;
	this.height = h;
	this.originX = x+(w/2);
	this.originY = y+(h/2);
	this.id = -1;
	this.color = rgb(135,206,250,0);
}

Node.prototype.draw = function()
{
	ctx.fillStyle = this.color;
	ctx.fillRect(this.x,this.y,this.width,this.height);
	ctx.fillStyle = rgb(0,255,0,0) ;
	ctx.strokeRect(this.x,this.y,this.width,this.height);
}

Node.prototype.setColor = function(r,g,b)
{
	this.color = rgb(r,g,b);
}
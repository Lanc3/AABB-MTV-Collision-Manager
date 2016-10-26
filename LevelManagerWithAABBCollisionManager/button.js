function button(name,posx,posy)
{
	this.name = name;
	this.x = posx;
	this.y = posy;
	this.size = 75;
	this.rect = new Rect(this.x,this.y,275,75);
}

button.prototype.Init = function()
{
	
}

button.prototype.draw = function()
{
	ctx.font = "40px Verdana"
	ctx.fillText(this.name,this.x,this.y);
	ctx.fillStyle = rgb(255,255,0,0) ;
	ctx.strokeRect(this.x,this.y+this.rect.height/2,this.rect.width,-this.rect.height);
	
}
button.prototype.intersects = function (rect)
{
	right = false;
	left = false;
	up = false;
	down = false;

	if (this.x < rect.x + 75 &&
   		this.x + 75 > rect.x &&
  		 this.y < rect.y + 75 &&
  		 75 + this.y > rect.y) 
	{
		
	}

}
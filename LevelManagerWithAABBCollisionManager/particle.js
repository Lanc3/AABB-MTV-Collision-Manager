var state = {HIT:"hit",MISS:"miss",NONE:"none"}
function particle(startingX)
{
	this.x = startingX;
	this.y = 0;
	this.radius = 40;
	this.fallRate = 10;
	this.currentState = state.MISS;
	this.isAlive = true;
	this.circle = new circle(this.x,this.y,this.radius,rgb(255,255,0));
}

particle.prototype.update = function(dt)
{
	this.y += this.fallRate/dt;

	if(this.y > canvas.height)
	{
		this.isAlive = false;
	}
	this.circle.setPosition(this.x,this.y);
}

particle.prototype.draw = function()
{
	this.circle.draw();
}

function button(text,posx,posy)
{
	this.text = text;
	this.x = posx;
	this.y = posy;
	this.width = 275;
	this.height = 75;
	this.size = 75;
	this.fontSize = 75;
	this.rect = new Rect(this.x,this.y,this.width,this.height);
	this.gradient=ctx.createLinearGradient(0,0,canvas.width,0);
	this.gradient.addColorStop("0","red");
	this.gradient.addColorStop("0.5","greenyellow");			
	this.gradient.addColorStop("1.0","greenyellow");
}

button.prototype.Init = function()
{
	
}
button.prototype.update = function()
{
	if(this.rect.intersects(new Rect(inputController.mouseCanvasPositionY,inputController.mouseCanvasPositionY,4,4)))
	{
		this.gradient.addColorStop("0","greenyellow");
		this.gradient.addColorStop("0.5","skyblue");			
		this.gradient.addColorStop("1.0","greenyellow");
	

	}
	else
	{
		this.gradient.addColorStop("0","red");
		this.gradient.addColorStop("0.5","greenyellow");			
		this.gradient.addColorStop("1.0","greenyellow");
	}
}

button.prototype.setText = function(text)
{
	this.text = text;
}

button.prototype.draw = function()
{
	ctx.fillStyle = this.gradient;
	ctx.font = this.fontSize+"px Black Ops One"
	ctx.fillText(this.text,this.x,this.y+this.fontSize);
}

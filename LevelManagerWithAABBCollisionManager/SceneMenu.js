SceneMenu.prototype = new Scene(); //this inherits from Scene

function SceneMenu()
{
	isStart = false;
	this.title = "Menu";
	this.buttonGame = new button("Start",canvas.width/2,300);
	this.buttonOption = new button("options",canvas.width/2,400)
	this.buttonExit = new button("Exit",canvas.width/2,500)
	this.cursorX;
	this.cursorY;
}

SceneMenu.prototype.Update = function()
{

	if(this.buttonGame.intersects(new Rect(this.cursorX,this.cursorY,2,2)))
    {
    	isStart = true;
    }
}
SceneMenu.prototype.draw = function()
{
	this.buttonGame.draw(canvas)
	this.buttonOption.draw(canvas)
	this.buttonExit.draw(canvas)
}


SceneMenu.prototype.Start = function()
{

}

SceneMenu.prototype.Stop = function()
{
	ctx.clearRect(0,0,1000,1000);
}
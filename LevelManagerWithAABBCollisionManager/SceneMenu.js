SceneMenu.prototype = new Scene(); //this inherits from Scene

function SceneMenu()
{
	isStart = false;
	this.title = "Menu";
	this.buttonGame = new button("Start",canvas.width/2.3,canvas.height/4);
	this.buttonOption = new button("options",canvas.width/2.3,canvas.height/2)
	this.buttonExit = new button("Exit",canvas.width/2.3,canvas.height*0.75)
	var mousePos;
}

SceneMenu.prototype.Update = function()
{
	this.buttonGame.update();
	this.buttonOption.update();
	this.buttonExit.update();

	if(this.buttonGame.rect.intersects(new Rect(inputController.mouseCanvasPositionX,inputController.mouseCanvasPositionY,4,4)))
    {
    	if(inputController.touching)
    	{
    		sceneManager.GoToNextScene();
    	}
    }
}
SceneMenu.prototype.draw = function()
{
	this.buttonGame.draw();
	this.buttonOption.draw();
	this.buttonExit.draw();
}


SceneMenu.prototype.Start = function()
{

}

SceneMenu.prototype.Stop = function()
{
	ctx.clearRect(0,0,1000,1000);
}
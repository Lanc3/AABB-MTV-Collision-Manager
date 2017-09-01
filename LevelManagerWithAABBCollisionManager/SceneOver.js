SceneOver.prototype = new Scene(); //this inherits from Scene

function SceneOver(inputC)
{
	this.title = "Game Over";
	this.continueButton = new button("Press to restart",canvas.width/6.3,canvas.height*0.75)
	this.ScoreButton = new button("Score : "+finalScore,canvas.width/6.3,canvas.height*0.15)
}

SceneOver.prototype.Update = function()
{
	this.continueButton.update();
	this.ScoreButton.update();
	this.ScoreButton.setText("Score : "+finalScore);
	if(this.continueButton.rect.intersects(new Rect(inputController.mouseCanvasPositionX,inputController.mouseCanvasPositionY,4,4)))
    {
    	if(inputController.touching)
    	{
    		sceneManager.GoToNextScene();
    	}
    }
}
SceneOver.prototype.draw = function()
{
	this.continueButton.draw();
	this.ScoreButton.draw();
}

SceneOver.prototype.Start = function()
{
	
}
SceneOver.prototype.Stop = function()
{
	
	ctx.clearRect(0,0,1000,1000);
}
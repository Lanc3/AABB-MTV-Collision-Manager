SceneOver.prototype = new Scene(); //this inherits from Scene

function SceneOver()
{
	this.title = "Game Over";
	
	
}

SceneOver.prototype.Update = function()
{
	ctx.font = "140px Verdana"
	ctx.fillText("Game Over",canvas.width/2-200,canvas.height/2);
}

Scene.prototype.Start = function()
{
	//window.addEventListener("keydown",game.handelInput);
}
Scene.prototype.Stop = function()
{
	//window.removeEventListener("keydown",game.handelInput);
	ctx.clearRect(0,0,1000,1000);
}
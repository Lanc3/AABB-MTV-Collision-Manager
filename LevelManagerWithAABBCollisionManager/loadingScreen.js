loadingScreen.prototype = new Scene(); //this inherits from Scene

function loadingScreen()
{
	this.isComplete = false;
	this.title = "loading";
	assetManager.queueDownload("player","Images/arrow.png","../Data/arrow.json");
	var self = this;
	assetManager.downloadAll(this.loadingComplete());
}
loadingScreen.prototype.loadingComplete = function()
{
	this.isComplete = true;
}

loadingScreen.prototype.Update = function(dt)
{
	if(this.isComplete)
	{
		sceneManager.GoToNextScene();
	}
}

loadingScreen.prototype.Start = function()
{
	//window.addEventListener("keydown",game.handelInput);
}
loadingScreen.prototype.Stop = function()
{
	//window.removeEventListener("keydown",game.handelInput);
	ctx.clearRect(0,0,1000,1000);
}
loadingScreen.prototype = new Scene(); //this inherits from Scene

function loadingScreen()
{
	this.imageComplete = false;
	this.audioComplete = false;
	this.doOnce = true;
	this.title = "loading";
	this.loadImageData();
	this.loadAudio();
	this.continueButton = new button("Press to Continue",canvas.width/6.3,canvas.height*0.75)
}
loadingScreen.prototype.ImageComplete = function()
{
	this.imageComplete = true;
}
loadingScreen.prototype.AudioComplete = function()
{
	this.audioComplete = true;
}

loadingScreen.prototype.loadImageData = function()
{
	assetManager.queueDownload("player","Images/arrow.png","../Data/arrow.json");
	assetManager.queueDownload("seeker","Images/seeker.png","../Data/single.json");
	assetManager.queueDownload("wall","Images/wanderer.png","../Data/single.json");
	assetManager.queueDownload("circle","Images/circle.png","../Data/single.json");
	assetManager.downloadAll(this.ImageComplete());
}
loadingScreen.prototype.loadAudio = function()
{
	audioManager.queueDownload("music","Audio/Music.mp3");
	
}

loadingScreen.prototype.Update = function(dt)
{
	this.continueButton.update();
	if(this.imageComplete && this.audioComplete)
	{
		if(this.continueButton.rect.intersects(new Rect(inputController.mouseCanvasPositionX,inputController.mouseCanvasPositionY,4,4)))
    	{
    		if(inputController.touching)
    		{
    			sceneManager.GoToNextScene();
    		}
    	}
	}
	if(isAudioManagerReady)
	{
		if(this.doOnce)
		{
			this.doOnce = false;
			audioManager.downloadAll(this.AudioComplete())
		}
	}
}

loadingScreen.prototype.draw = function()
{
	if(this.imageComplete && this.audioComplete)
	{
		this.continueButton.draw();
	}
}
loadingScreen.prototype.Start = function()
{
}
loadingScreen.prototype.Stop = function()
{
	ctx.clearRect(0,0,1000,1000);
}
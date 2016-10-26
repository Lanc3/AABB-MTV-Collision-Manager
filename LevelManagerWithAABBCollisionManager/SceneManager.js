
function SceneManager()
{
	this.sceneOver = new SceneOver();
	this.sceneMenu = new SceneMenu();
	this.scenePlaying = new PlayingScene();
	this.sceneArray = [  this.sceneMenu, this.scenePlaying, this.sceneOver]
	this.sceneArrayIndex = 0;
	this.currentScene = this.sceneArray[this.sceneArrayIndex];
}


SceneManager.prototype.AddScene = function(newScene)
{
	this.sceneArray.push(newScene);
}


SceneManager.prototype.GoToScene = function(sceneIndex)
{
	this.currentScene.Stop();
	this.currentScene = this.sceneArray[sceneIndex];
	this.currentScene.Start();
}


SceneManager.prototype.GoToNextScene = function()
{
	this.currentScene.Stop();
	this.sceneArrayIndex++;
	if (this.sceneArrayIndex == this.sceneArray.length) 
	{
		this.sceneArrayIndex = 0;
	}
	this.currentScene = this.sceneArray[this.sceneArrayIndex];
	this.currentScene.Start();
}

SceneManager.prototype.CurrentScene = function()
{
	return this.currentScene;
}


// A reference to the currentScene 
// A list of the scenes
// A method addScene
// A method goToScene(title) that takes the title of the scene and goes to it
// A method goToNextScene

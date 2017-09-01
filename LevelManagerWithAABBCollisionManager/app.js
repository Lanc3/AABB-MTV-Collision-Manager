var sceneManager;
var canvas;
var ctx;
var mouseCanvasPositionX,mouseCanvasPositionY;
var isRightClick = false;
var inputController;
var lastUpdate = Date.now();
var myInterval = setInterval(tick, 0);
var screenWidth = document.documentElement.clientWidth;
var screeHeight = document.documentElement.clientHeight;
var assetManager;
var audioManager;
var isAudioManagerReady = false;
function main()
{
	assetManager = new AssetManager();
	audioManager = new AudioManager(setAudioManagerState());
	mouseCanvasPositionX = 0;
	mouseCanvasPositionY = 0;
	canvas = initCanvas();
	inputController = new inputController();
	ctx = canvas.getContext("2d");
	sceneManager = new SceneManager();
	sceneManager.CurrentScene().Update();
	
}
function setAudioManagerState()
{
	isAudioManagerReady = true;
}

function tick() {
    var now = Date.now();
    var dt = now - lastUpdate;
    lastUpdate = now;
    if (typeof sceneManager != 'undefined')
    {
    	update(dt);
    	draw();
	}
}

function update(dt)
{
	sceneManager.currentScene.Update(dt);

}

function draw()
{
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	sceneManager.currentScene.draw();
}
function initCanvas()
{
	var c = document.getElementById("myCanvas");
	c.width = screenWidth;
	c.height = screeHeight;

	return c;
}

function changeScene(e)
{
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	// Random colou
	var r = Math.random()*255;
	var g = 0;
	var b = 0;

	// colour
	ctx.fillStyle = rgb(r,g,b);
	sceneManager.GoToScene(2);
	
}

function click(event)
{
	isRightClick = true;
	console.log(isRightClick)
}

function log(text)
{
	console.log(text);
}
function rgb(r, g, b) 
{ 
	return 'rgb('+clamp(Math.round(r),0,255)+', '+clamp(Math.round(g),0,255)+', '+clamp(Math.round(b),0,255)+')';
}
/*helper function*/
function clamp(value, min, max)
{ 
	if(max<min) { 
		var temp = min; 
		min = max; 
		max = temp; 
	}
	return Math.max(min, Math.min(value, max)); 
}


//get the char code for a key press for difrent browsers as diffrent browsers may return odd or diffrent key codes
function getCharCode(event)
{
	if (event.which == null)
	{
		return String.fromCharCode(event.keyCode) // IE
	}
	else if (event.which!=0 && event.charCode!=0)
	{
		return String.fromCharCode(event.which)   // the rest
	} 
	else
	{
		return event.keyCode; // special key
	}
}

function makeStruct(names) {
  var names = names.split(',');
  var count = names.length;
  function constructor() {
    for (var i = 0; i < count; i++) {
      this[names[i]] = arguments[i];
    }
  }
  return constructor;
}

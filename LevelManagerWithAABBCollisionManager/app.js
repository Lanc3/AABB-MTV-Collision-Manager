var sceneManager;
var canvas;
var ctx;
function main()
{

	canvas = initCanvas();
	ctx = canvas.getContext("2d");
	sceneManager = new SceneManager(canvas);
	sceneManager.CurrentScene().Update();
	document.addEventListener("mousedown", changeScene);
	update();
	draw();
}

function update()
{
	sceneManager.currentScene.Update();
	window.requestAnimationFrame(update);
}

function draw()
{
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	sceneManager.currentScene.draw();
	window.requestAnimationFrame(draw);
}
function initCanvas()
{
	var c = document.getElementById("myCanvas");
	c.width = window.innerWidth;
	c.height = window.innerHeight;

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
	sceneManager.GoToNextScene();
	
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
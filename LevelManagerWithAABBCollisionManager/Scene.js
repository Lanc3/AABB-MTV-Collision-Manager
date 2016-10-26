
function Scene()
{
	this.title = "ParentScene";
}



Scene.prototype.Update = function()
{
	game.ctx.fillText("Current Scene = " + this.title, 600, 300);

}

Scene.prototype.draw = function()
{
	
}

Scene.prototype.Render = function()
{

	
}
Scene.prototype.Start = function()
{

}
Scene.prototype.Stop = function()
{
	
}
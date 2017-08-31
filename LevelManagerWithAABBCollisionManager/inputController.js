function inputController()
{
	this.mousePositionX = 0;
	this.mousePositionY = 0;
	this.mouseCanvasPositionX = 0;
	this.mouseCanvasPositionY = 0;
	this.anyClick = false;
	this.touchX;
	this.touchY;
	this.touching = false;
	this.touches;
	this.touchable = 'createTouch' in document, this.touches = [];
	this.inputInfo;
	this.self = this;
	this.setupTouch(this.self);
}


inputController.prototype.mouseDown = function() {
	isRightClick = true;
}
inputController.prototype.mouseUp = function() {
    isRightClick = false;
}


inputController.prototype.getInputInfo = function() {
	this.inputInfoRow = null;
	this.inputInfo = null;
	this.inputInfo = makeStruct("x,y,pressed");
    this.inputInfoRow = new this.inputInfo(this.mouseCanvasPositionX,this.mouseCanvasPositionY,this.touching)
    return this.inputInfoRow;
}

inputController.prototype.setupTouch = function(self)
{
	if(this.touchable) 
	{
		console.log("touchable");
		document.addEventListener('touchstart', passRight(this.onTouchStart, self), true);
		document.addEventListener('touchmove', passRight(this.onTouchMove, self), true);
		document.addEventListener('touchend', passRight(this.onTouchEnd, self), true);
		window.onorientationchange = this.resetCanvas;  
		window.onresize = this.resetCanvas;  
	} 
	else 
	{
		console.log("not touchable");
		document.addEventListener('mousedown', passRight(this.onMouseDown, self), false);
		document.addEventListener('mousemove',passRight(this.onMouseMove, self), false);
		document.addEventListener('mouseup', passRight(this.onMouseUp, self), false);
	}
}
inputController.prototype.resetCanvas = function() 
{  
  	canvas.width = screenWidth; 
	canvas.height = screeHeight;
	
	window.scrollTo(0, 0); 
}

inputController.prototype.onTouchStart = function(event,self) 
{
   	//event.preventDefault();
	self.touches = event.touches; 
	
	var touch = self.touches[0];
	self.mouseCanvasPositionX  = touch.pageX;
	self.mouseCanvasPositionY  = touch.pageY;
	
	self.touching = true;
}

inputController.prototype.onTouchMove = function(event,self) 
{
	//event.preventDefault();
	self.touches = event.touches; 
	var touch = self.touches[0];
	if(self.touching)
	{
		self.mouseCanvasPositionX  = touch.pageX;
		self.mouseCanvasPositionY  = touch.pageY;
	}
	
} 
inputController.prototype.onTouchEnd = function(event,self) 
{ 
    //event.preventDefault();
   	self.touches = event.touches; 
	self.touching = false;
}

inputController.prototype.onMouseDown = function(event,self) 
{
	self.touching = true;
}

inputController.prototype.onMouseMove = function(event,self) 
{
	var rect = document.getElementById("myCanvas").getBoundingClientRect();
    self.mousePositionX = event.clientX;
	self.mousePositionY = event.clientY;

	self.mouseCanvasPositionX = event.clientX - rect.left;
    self.mouseCanvasPositionY = event.clientY - rect.top;
    mouseCanvasPositionX = event.clientX - rect.left;
    mouseCanvasPositionY = event.clientY - rect.top;
}

inputController.prototype.onMouseUp = function(event,self) 
{
	this.touching = false;
}

function passRight( original ) {
    var args = [].slice.call( arguments, 1 );
    return function() {
        return original.apply( this, [].slice.call( arguments ).concat( args ) );
    };
}

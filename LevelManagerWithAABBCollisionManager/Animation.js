function Animation(assetName, fps)
{
	this.image = assetManager.getAsset(assetName).image;
	this.cellWidth;
	this.cellHeight;
	this.animationData = assetManager.getAsset(assetName).jsonData;
	this.animationList = this.animationData;
	this.animationIndex = 0;
 	this.tickAmount = fps;
 	this.tick = 0;
 	this.IsLooping = true;
 	this.x = 0;
 	this.y = 0;
 	this.scale = 1;
 	this.rotation = 0;
 	this.isVisible = true;
 	this.atEndFrame = false;
 	this.isDead = false;
}

Animation.prototype.setVisiblity = function(isVisible)
{
	this.isVisible = isVisible;
}

Animation.prototype.stop = function()
{
	this.IsLooping = false;
}

Animation.prototype.start = function()
{
	this.IsLooping = true;
}

Animation.prototype.setPosition = function(x,y)
{
	this.x = x;
	this.y = y;
}

Animation.prototype.setRotation = function(angle)
{
	this.rotation = angle;
}

Animation.prototype.setScale = function(scale)
{
	this.scale = scale;
}

Animation.prototype.draw = function()
{
	if(this.IsLooping)
	{
		this.tick++;
		if(this.tick > this.tickAmount)
		{
			this.tick = 0;
			this.animationIndex++
			if(this.animationIndex === this.animationList.animationRectList.length)
			{
				this.atEndFrame = true;
				this.animationIndex = 0;
			}
			else
			{
				this.atEndFrame = false;
			}
		}
		ctx.save();
	    ctx.translate(this.x, this.y);
	    ctx.rotate(this.rotation * Math.PI / 180);
	    log(this.animationList.animationRectList)
	    if(this.isVisible)
	    {
	    	ctx.drawImage(this.image, this.animationList.animationRectList[this.animationIndex].x,
	    				this.animationList.animationRectList[this.animationIndex].y, 
						this.animationList.animationRectList[this.animationIndex].width,
						this.animationList.animationRectList[this.animationIndex].height,
						-this.animationList.animationRectList[this.animationIndex].width / 2, -this.animationList.animationRectList[this.animationIndex].height / 2,
						this.animationList.animationRectList[this.animationIndex].width * this.scale,
						this.animationList.animationRectList[this.animationIndex].width * this.scale);
		}
		ctx.restore();
	}
}

Animation.prototype.clean = function()
{
	this.isDead = true;
}
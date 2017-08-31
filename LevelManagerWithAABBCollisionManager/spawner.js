var spawnerState = {FAR:"far",NEAR:"near"}
function spawner()
{
	this.offset = 0.5;
	this.x = canvas.width/2 - this.offset;
	this.y = 0;
	this.target = 0;
	this.width = 10;
	this.height = 10;
	this.rateOfchange = 0;
	this.distance = 0;
	this.cutOffDistance = 100;
	this.speed = 1;
	this.duration = 200;
	this.arrayOfParticles = [];
	this.timer = 0;
	this.missCounter = 0;
	this.hitCounter = 0;
	this.currentSpawerState = spawnerState.NEAR;
	this.nearDistance = canvas.width/4;
	this.maxOnScreen = 40;
	this.maxSpeed = 5;
	this.levelMultiplyer = 2;
}

spawner.prototype.init = function()
{
	
}

spawner.prototype.draw = function()
{
	ctx.fillStyle = rgb(255,255,0,0) ;
	ctx.fillRect(this.x,this.y,this.width,this.height);
	this.drawParticles();
}

spawner.prototype.update = function(dt)
{
	//calc distance to target
	this.distance = this.x - this.target;
	//if close choose a new target 
	if(Math.abs(this.distance) < this.cutOffDistance)
	{
		this.getNewTarget();
	}
	//if near do expo movment 
	if(Math.abs(this.distance) < this.nearDistance)
	{
		this.currentSpawerState = spawnerState.NEAR;
	}//else do sine
	else
	{
		this.currentSpawerState = spawnerState.FAR;
	}

	this.manageState(dt);
	this.clampToBounds();
	
	
	this.maxOnScreen +=this.speed;
	this.spawnTimer(dt,60);
	this.updateParticles(dt);
}
spawner.prototype.manageGameDiff = function(level)
{
	
	if(this.speed < this.maxSpeed)
	{
		this.speed = this.levelMultiplyer * level;
		
	}
	else
	{
		this.speed = this.maxSpeed;
	}
}

spawner.prototype.manageState = function(dt)
{
	if(this.currentSpawerState === spawnerState.NEAR)
	{
		this.moveToTarget(dt,"expo");
	}
	else if(this.currentSpawerState === spawnerState.FAR)
	{
		this.moveToTarget(dt,"sine");
	}
}
spawner.prototype.clampToBounds = function()
{
	//to catch it if the maths makes it go out of bounds
	if(this.x < 0)
	{
		this.x = 0;
	}
	else if(this.x > canvas.width)
	{
		this.x = canvas.width;
	}
}

spawner.prototype.spawnTimer = function(dt,interval)
{
	this.timer += dt;
	if(this.timer > interval)
	{
		this.timer = 0;
		//call function here
		this.addParticle();
	}
}

spawner.prototype.addParticle = function()
{
	if(this.arrayOfParticles.length < this.maxOnScreen )
	{
			this.arrayOfParticles.push(new particle(this.x))
	}
}

spawner.prototype.updateParticles = function(dt)
{
	for (var i = 0; i < this.arrayOfParticles.length; i++) 
	{
		this.arrayOfParticles[i].update(dt);
	}
	for (var i = 0; i < this.arrayOfParticles.length; i++) 
	{
		if(this.arrayOfParticles[i].y > canvas.height)
		{
			this.arrayOfParticles.splice(i,1);
			this.missCounter++;
		}
	}

}
spawner.prototype.setPlayerCollision = function(circle)
{
	//log("player : "+circle.x+" : "+circle.y)

	for (var i = this.arrayOfParticles.length-1; i >= 0 ; i--) 
	{
		if(this.arrayOfParticles[i].circle.intersects(circle))
		{
			this.arrayOfParticles.splice(i,1);
			this.hitCounter++;
		}
	}
}

spawner.prototype.drawParticles = function()
{
	for (var i = 0; i < this.arrayOfParticles.length; i++) 
	{
		this.arrayOfParticles[i].draw();
	}
}


spawner.prototype.easeInOutSine = function(deltaTime,startValue,changeInValue,duration)
{
	return changeInValue / 2 * (Math.cos(Math.PI*deltaTime /duration) - 1) + startValue;
}

spawner.prototype.easeInOutExpo = function(deltaTime,startValue,changeInValue,duration)
{
	return changeInValue / 2 * (Math.cos(Math.PI*deltaTime /duration) - 1) + startValue;
}

spawner.prototype.getNewTarget = function()
{
	this.target = Math.floor(Math.random() * canvas.width);
}

spawner.prototype.moveToTarget = function(dt,type)
{
	var startValue = this.x;
	if(type === "sine")
	{
		this.rateOfchange = this.easeInOutSine(dt,0,this.distance,this.duration);
	}
	else if(type === "expo")
	{
		this.rateOfchange = this.easeInOutExpo(dt,0,this.distance,this.duration);
	}
	this.x += this.speed * this.rateOfchange;
}
var levelState = {LEVELONE:"levelone",LEVELTWO:"leveltwo",LEVELTHREE:"levelthree"}
function scoreManager()
{
	this.score = 0;
	this.miss = 0;
	this.level = 1;
	this.timeToNextLevel = 30;
	this.timer = 0;
	this.levelTime = 0;
	this.currentLevel = levelState.LEVELONE;
	this.scoreText = new button("",canvas.width/3,canvas.height/4);
	this.missText = new button("",canvas.width/3,canvas.height/3);
	this.scoreText.setText(this.score+" : hit!");
	this.missText.setText(this.miss+" : miss!");
	this.timeText = new button("",canvas.width/3,canvas.height/2);
	this.levelText = new button("",canvas.width/3,canvas.height*0.75);
	this.timeText.setText(this.score+" : time!");
	this.levelText.setText(this.miss+" : level!");
}

scoreManager.prototype.update = function(dt)
{
	this.gameTimer(dt,1000);
	if(this.levelTime > this.timeToNextLevel)
	{
		this.levelTime = 0;
		this.level++;
	}
	this.timeText.setText((30 - this.levelTime)+" : time!");
	this.levelText.setText(this.level+" : level!");
}

scoreManager.prototype.draw = function()
{
	this.scoreText.draw();
	this.missText.draw();
	this.levelText.draw();
	this.timeText.draw();
}

scoreManager.prototype.setMissScore = function(missScore)
{
	this.miss = missScore;
	this.missText.setText(this.miss+" : miss!");
}

scoreManager.prototype.setHitScore = function(hitScore)
{
	this.score = hitScore;
	this.scoreText.setText(this.score+" : hit!");
}
scoreManager.prototype.gameTimer = function(dt,interval)
{
	this.timer += dt;
	if(this.timer > interval)
	{
		this.timer = 0;
		//call function here
		this.levelTime++;
	}
}

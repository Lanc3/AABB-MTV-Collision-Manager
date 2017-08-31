function levelManager()
{
	this.leveldata;
	this.loadleveldata("data.json");
	this.arrayOfWalls = [];
	this.arrayOfLevels = [];
	this.toggle = true;
	this.level = 1;
	this.levelCap = 5;
}

levelManager.prototype.loadleveldata = function(filename) 
{
    var jsonfile = new XMLHttpRequest();
         
    jsonfile.open("GET", filename, true);
    var self = this;
    jsonfile.onreadystatechange = function() 
	{
        if (jsonfile.readyState == 4) 
		{
            if (jsonfile.status == 200) 
			{
                self.leveldata = JSON.parse(jsonfile.responseText); //data now contains the data from your json file
                self.setUpLevel();
            }
        }
    };    
    //This sends the request
    jsonfile.send(null);
}

levelManager.prototype.setUpLevel = function()
{
	for (var l = 0; l < this.leveldata.levels.length; l++) 
	{
		for (var i = 0; i < this.leveldata.levels[l].level.length; i++) 
		{
			this.arrayOfWalls.push(new Wall(this.leveldata.levels[l].level[i][0],this.leveldata.levels[l].level[i][1],this.leveldata.levels[l].level[i][2],this.leveldata.levels[l].level[i][3]));
		}
		this.arrayOfLevels.push(this.arrayOfWalls);
		this.arrayOfWalls = [];
	}
}

levelManager.prototype.draw = function()
{
	if(this.level >= this.levelCap)
	{
		this.level = this.levelCap;
	}
	for (var l = 0; l < this.arrayOfLevels.length; l++) 
	{
		for (var i = 0; i < this.arrayOfLevels[this.level-1].length; i++) 
		{
			this.arrayOfLevels[this.level-1][i].draw();
		}
	}
}

levelManager.prototype.update = function()
{

}
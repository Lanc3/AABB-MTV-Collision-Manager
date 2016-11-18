function levelManager()
{
	this.leveldata;
	this.loadleveldata("data.json");
	this.arrayOfWalls = [];
	this.arrayOfWallsOther = [];
	this.toggle = true;
	
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
	for (var i = 0; i < this.leveldata.levels[0].level1.length; i++) {
		
		this.arrayOfWalls.push(new Wall(this.leveldata.levels[0].level1[i][0],this.leveldata.levels[0].level1[i][1],this.leveldata.levels[0].level1[i][2],this.leveldata.levels[0].level1[i][3]));
	}

	for (var i = 0; i < this.leveldata.levels[1].level2.length; i++) {
		
		this.arrayOfWallsOther.push(new Wall(this.leveldata.levels[1].level2[i][0],this.leveldata.levels[1].level2[i][1],this.leveldata.levels[1].level2[i][2],this.leveldata.levels[1].level2[i][3]));
	}
}

levelManager.prototype.draw = function()
{
	if(this.toggle)
	{
		for (var i = 0; i < this.arrayOfWalls.length; i++) 
		{
			this.arrayOfWalls[i].draw();
		}
	}
	else
	{
		for (var i = 0; i < this.arrayOfWallsOther.length; i++) 
		{
			this.arrayOfWallsOther[i].draw();
		}
	}
}

levelManager.prototype.update = function()
{

}
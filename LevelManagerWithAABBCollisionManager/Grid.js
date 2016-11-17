function Grid(sceneWidth,sceneHeight,rowAmount,collumnAmmount)
{
	this.cellWidth = sceneWidth/collumnAmmount;
	this.cellHeight = sceneHeight/rowAmount;
	this.rowAmount = rowAmount;
	this.collumnAmmount = collumnAmmount;
	this.tdArray;
	this.createGrid();
	this.setNearestNodes();
}

Grid.prototype.update = function()
{

}

Grid.prototype.setNearestNodes = function()
{
	for (var i = 0; i < this.collumnAmmount; i++) 
	{
  		for (var j = 0; j < this.rowAmount; j++) 
		{

			var botRight = -1;
			var topRight = -1;
			var botLeft = -1;
			var topLeft = -1;
			var top = -1;
			var left = -1;
			var right = -1;
			var bot = -1
			//top
			if(i !== 0)
			{
				var top = this.tdArray[i-1][j].id;
			}
			
			//left
			if(j !== 0)
			{
				var left  = this.tdArray[i][j-1].id;
			}
			
			//right
			if(j !== this.collumnAmmount-1)
			{
				var right = this.tdArray[i][j+1].id;
			}
			
			//bottom
			if(i !== this.rowAmount-1)
			{
				var bot = this.tdArray[i+1][j].id;
			}
			

			if(i !== 0 && j !== 0 )
			{
				var topLeft  = this.tdArray[ i - 1 ][ j - 1 ].id;
			}

			if (j > 0 && i < this.rowAmount-1)
			{
				var botLeft  = this.tdArray[ i + 1 ][ j - 1 ].id;
			}
			
			if(i < this.collumnAmmount-1 && j < this.rowAmount-1)
			{
				var botRight = this.tdArray[ i + 1 ][ j + 1 ].id;	
			}

			if(i !== 0 && j < this.rowAmount-1)
			{
				var topRight = this.tdArray[ i - 1 ][ j + 1 ].id;
			}

		

			this.tdArray[i][j].arrayOfArcs.push(new arc(60,topLeft));
			this.tdArray[i][j].arrayOfArcs.push(new arc(50,top));
			this.tdArray[i][j].arrayOfArcs.push(new arc(60,topRight));
			this.tdArray[i][j].arrayOfArcs.push(new arc(50,right));
			this.tdArray[i][j].arrayOfArcs.push(new arc(60,botRight));
			this.tdArray[i][j].arrayOfArcs.push(new arc(50,bot));
			this.tdArray[i][j].arrayOfArcs.push(new arc(60,botLeft));
			this.tdArray[i][j].arrayOfArcs.push(new arc(50,left));


		}
	}
console.log(this.tdArray)
	
}

Grid.prototype.createGrid = function(coll,row)
{
	this.tdArray = new Array(this.collumnAmmount);
	for (var i = 0; i < this.collumnAmmount; i++) 
	{
  		this.tdArray[i] = new Array(this.rowAmount);
  		for (var j = 0; j < this.rowAmount; j++) 
		{
  			this.tdArray[i][j] = new node(i*this.cellWidth,j*this.cellHeight,this.cellWidth,this.cellHeight);
  			this.tdArray[i][j].setID(i*this.collumnAmmount+j);
  		}
	}
}
Grid.prototype.showOnGrid = function(x,y)
{

	for (var i = 0; i < this.collumnAmmount; i++) 
	{
  		for (var j = 0; j < this.rowAmount; j++) 
		{
			if(j*this.collumnAmmount+i == this.getGridIdFromPosition(x,y))
			{
				this.tdArray[i][j].setColor(255,0,0);
			}
			else
			{
				this.tdArray[i][j].setColor(135,206,250);
			}
		}
	}
}

Grid.prototype.getGridIdFromPosition = function(x,y)
{
	return Math.floor(x/this.cellWidth) + (Math.floor(y/this.cellHeight)*this.collumnAmmount);
}

Grid.prototype.draw = function()
{
	for (var i = 0; i < this.collumnAmmount; i++) 
	{
  		for (var j = 0; j < this.rowAmount; j++) 
		{
			this.tdArray[i][j].draw();
		}
	}
}


Grid.prototype.getNodeById = function(id)
{
	for (var i = 0; i < this.collumnAmmount; i++) 
		{
  			for (var j = 0; j < this.rowAmount; j++) 
			{
				if(id === this.tdArray[i][j].id)
				{
					return this.tdArray[i][j];
				}
			}
		}
}

Grid.prototype.aStar = function(start,end)
{
	var pathArray = [];
	pathArray.push(start);
	var heuristicValue = 0;
	for (var i = 0; i < start.arrayOfConnectedNodes.length; i++) 
		{
			start.arrayOfConnectedNodes[i]
		}
}
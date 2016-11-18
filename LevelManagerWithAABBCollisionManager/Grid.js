function Grid(sceneWidth,sceneHeight,rowAmount,collumnAmmount)
{
	this.cellWidth = sceneWidth/collumnAmmount;
	this.cellHeight = sceneHeight/rowAmount;
	this.rowAmount = rowAmount;
	this.collumnAmmount = collumnAmmount;
	this.tdArray;
	this.createGrid();
	this.setNearestNodes();
	this.aStar(this.getNodeById(0),this.getNodeById(62));
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

		

			this.tdArray[i][j].arrayOfArcs.push(new arc(70,topLeft));
			this.tdArray[i][j].arrayOfArcs.push(new arc(50,top));
			this.tdArray[i][j].arrayOfArcs.push(new arc(70,topRight));
			this.tdArray[i][j].arrayOfArcs.push(new arc(50,right));
			this.tdArray[i][j].arrayOfArcs.push(new arc(70,botRight));
			this.tdArray[i][j].arrayOfArcs.push(new arc(50,bot));
			this.tdArray[i][j].arrayOfArcs.push(new arc(70,botLeft));
			this.tdArray[i][j].arrayOfArcs.push(new arc(50,left));


		}
	}
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

Grid.prototype.getOneDArray = function()
{
	var array = [];
	for (var i = 0; i < this.collumnAmmount; i++) 
		{
  			for (var j = 0; j < this.rowAmount; j++) 
			{
				array.push(this.tdArray[i][j]);
			}
		}
		return array;
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
	var bool = false;
	var nodesToTest = this.getOneDArray();
	var checkedNodes = [];
	pathArray.push(start);
	var heuristicValue = 0;
	var currentNode = start;
	var nextNode;
	console.log(nodesToTest.length)
	console.log(currentNode);
	while(bool === false)
	{
		
		var distance = 11111111;
		
			for (var i = 0; i < currentNode.arrayOfArcs.length; i++) 
				{

					if(currentNode.arrayOfArcs[i].connectedNodeId != -1)
					{
						var testNode = this.getNodeById(currentNode.arrayOfArcs[i].connectedNodeId);
						 var d = Math.sqrt((testNode.x-end.x)*(testNode.x-end.x) + (testNode.y-end.y)*(testNode.y-end.y)) +currentNode.arrayOfArcs[i].weight;
						 //console.log(currentNode.arrayOfArcs[i].connectedNodeId)
						 if(d < distance)
						 {
						 	distance = d 
						 	nextNode = this.getNodeById(currentNode.arrayOfArcs[i].connectedNodeId);
						 	console.log("node ",nextNode.id)
						 	console.log("distance ",distance)
						 }
						 nodesToTest.splice(currentNode.arrayOfArcs[i].connectedNodeId,1);
					}
					
				}
				pathArray.push(nextNode);
				//console.log("next",currentNode.id)
				console.log("next node ",nextNode)
				currentNode = nextNode;
				nodesToTest.splice(currentNode.id,1);
			
			
			//
			//pathArray.push(currentNode);
			if(nodesToTest.length === 0)
			{
				bool = true;
			}
			if(currentNode.id === end.id)
			{
				bool = true;
			}
	}
	console.log(pathArray);
}
//
Grid.prototype.containsNode = function(a, obj) 
{
    var i = a.length;
    while (i--) {
       if (a[i] === obj) {
           return true;
       }
    }
    return false;
}
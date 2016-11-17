function Grid(sceneWidth,sceneHeight,rowAmount,collumnAmmount)
{
	this.cellWidth = sceneWidth/collumnAmmount;
	this.cellHeight = sceneHeight/rowAmount;
	this.rowAmount = rowAmount;
	this.collumnAmmount = collumnAmmount;
	this.tdArray;
	this.createGrid();
}

Grid.prototype.update = function()
{

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

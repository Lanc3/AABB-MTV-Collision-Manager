function Grid(sceneWidth,sceneHeight,rowAmount,collumnAmmount)
{
	this.cellWidth = sceneWidth/collumnAmmount;
	this.cellHeight = sceneHeight/rowAmount;
	this.arrayOfNodes = [];
	this.rowAmount = rowAmount;
	this.collumnAmmount = collumnAmmount;
	this.createGrid();
}

Grid.prototype.update = function()
{

}

Grid.prototype.createGrid = function()
{
	for (var r = 0; r < this.rowAmount; r++) 
	{
		for (var c = 0; c < this.collumnAmmount; c++) 
		{
			this.arrayOfNodes.push(new Node(c*this.cellWidth,r*this.cellHeight,this.cellWidth,this.cellHeight));
		}
	}
}
Grid.prototype.showOnGrid = function(x,y)
{
	for (var i = 0; i < this.arrayOfNodes.length; i++)
	 {
		if(i == this.getGridIdFromPosition(x,y))
		{
			this.arrayOfNodes[i].setColor(255,0,0);
		}
		else
		{
			this.arrayOfNodes[i].setColor(135,206,250);
		}
	}
}

Grid.prototype.getGridIdFromPosition = function(x,y)
{
	return Math.floor(x/this.cellWidth) + (Math.floor(y/this.cellHeight)*this.collumnAmmount);
}

Grid.prototype.draw = function()
{
	for (var i = 0; i < this.arrayOfNodes.length; i++) {
		this.arrayOfNodes[i].draw();
	}
}

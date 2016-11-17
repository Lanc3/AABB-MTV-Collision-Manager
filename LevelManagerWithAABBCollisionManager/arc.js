function arc()
{
	this.weight = -1;
	this.connectedNodeId = -1;
}

arc.prototype.setWeight = function(w)
{
	this.weight = w;
}

arc.prototype.setconnectedNode = function(nodeId)
{
	this.connectedNodeId = nodeId;
}
function arc(w,id)
{
	this.weight = w;
	this.connectedNodeId = id;
}

arc.prototype.setWeight = function(w)
{
	this.weight = w;
}

arc.prototype.setConnectedNode = function(nodeId)
{
	this.connectedNodeId = nodeId;
}
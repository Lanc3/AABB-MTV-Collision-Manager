var objectPool = [];
var marker = 0;
var poolSize = 0;

//any old JavaScript object
function commonObject () { }

commonObject.create = function () {
  	if (marker >= poolSize) {
		commonObject.expandPool(poolSize * 2);
	}

	var obj = objectPool[marker++];
	obj.index = marker - 1;
	obj.constructor.apply(obj, arguments);
	return obj;
}

//push new objects onto the pool
commonObject.expandPool = function (newSize) {
	for (var i = 0; i < newSize - poolSize; ++i) {
		objectPool.push(new commonObject());
	}

	poolSize = newSize;
}

//swap it with the last available object
commonObject.prototype.destroy = function () {
	marker--;
	var end = objectPool[marker];
	var endIndex = end.index;

	objectPool[marker] = this;
	objectPool[this.index] = end;

	end.index = this.index;
	this.index = endIndex;
}

//make this as big as you think you need
commonObject.expandPool(1000);
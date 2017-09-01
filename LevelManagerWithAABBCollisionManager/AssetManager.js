/**
Enables assets (images) to be queued and downloaded.  
Once they are all downloaded, and stored in the cache, isDone() will 
return true.
*/
function AssetManager() 
{
  this.successCount = 0;
  this.errorCount = 0;
  this.cache = {};
  this.downloadQueue = [];
  this.self = this;
  

}

AssetManager.prototype.queueDownload = function(name, imagePath,json) 
{
  this.downloadQueue.push({name:name, imagePath:imagePath, json:json});
}

AssetManager.prototype.readJSON = function(filename)
{
  this.animationData = null;
  var jsonfile = new XMLHttpRequest();   
  jsonfile.open("GET", filename, false);
  var self = this;
  jsonfile.onload = function() 
  {
    if (jsonfile.readyState == 4 && jsonfile.status == 200) 
    {
      self.animationData = JSON.parse(jsonfile.responseText); //data now contains the data from your json file#
  
    }
  };    
  //This sends the request
  jsonfile.send(null);
  return self.animationData;
}



 AssetManager.prototype.downloadAll = function(callback) 
 {
  //Scenario this if block deals with:
  //if the asset manager doesn’t have any assets queued up for download? 
  //The isDone method is never triggered, and the game never starts.  
  if (this.downloadQueue.length === 0) 
  {
    callback(true);
  }
  if (this.downloadQueue.length > 0) 
  {
    for (var i = 0; i < this.downloadQueue.length; i++) 
    {
    var path = this.downloadQueue[i].imagePath;
    var assetName = this.downloadQueue[i].name;
    var json =  this.readJSON(this.downloadQueue[0].json);
    var img = new Image();
    var that = this;

    img.onload =  function() 
    {
        that.successCount += 1;
        if (that.isDone()) 
        {
         callback;
        }
      }

      img.onerror = function() 
      {
        that.errorCount += 1;
        if (that.isDone()) 
        {
         callback;
        }
      }
      img.src = path;
        this.cache[assetName] = {image:img,jsonData:json};
      }
  }
}

AssetManager.prototype.isDone = function() 
{
  var count = this.successCount + this.errorCount;
  var complete = (this.downloadQueue.length == count);
  return complete;
}

AssetManager.prototype.getAsset = function(name) 
{
  return this.cache[name];
}


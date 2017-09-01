//iOS Audio Manager

function AudioManager(onReady)
{
  
  this.callback = onReady;

  //an object to hold a name for each sound and its associated buffer (memory holding the sound)
  this.audioBuffers={}
  this.downloadCallback;

  //It is setup in unlock()
  this.audioContext;
  this.self = this;

  this.queue = [];
  this.unlock();
}



AudioManager.prototype.playSound = function(name, looping)
{

    if(this.audioBuffers[name] === undefined)
    {
      console.log(this.audioBuffers)
      console.log("Sound doesn't exist or hasn't been loaded")
      return;
    }

    //retrieve the buffer we stored earlier
    var audioBuffer = this.audioBuffers[name];

    //create a buffer source - used to play once and then a new one must be made

    var source = this.audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.loop = false;
    source.connect(this.audioContext.destination);
    source.start ? source.start(0) : source.noteOn(0); // Play immediately.
    var that = this;
    if (looping)
    {
      source.onended = function()
      {
        that.playSound(name, looping);
      }
    }

  }

AudioManager.prototype.queueDownload = function(name, url)
{
  this.queue.push({name:name, url:url});
}

AudioManager.prototype.downloadAll = function(argDownloadCallback)
{
  this.downloadCallback = argDownloadCallback;
  for (var i = 0; i < this.queue.length; i++)
  {
    this.loadSoundFile(this.queue[i].name, this.queue[i].url);
  }
}


AudioManager.prototype.loadSoundFile = function(name, url)
{
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'arraybuffer';
  var that = this;
  xhr.onload = function(e)
  {

        //buffer containing sound returned by xhr
      var arrayBuffer=this.response;

      that.decode({buf:arrayBuffer}, name);

  };

  //send the xhr request to download the sound file
  xhr.send();
}

AudioManager.prototype.soundLoaded = function(name)
{
	
  for (var i = 0; i < this.queue.length; i++)
  {
    if (name == this.queue[i].name)
    {
      this.queue.splice(i, 1);
    }
  }

 
  if (this.queue.length == 0)
  {
    this.downloadCallback;
  }
}


AudioManager.prototype.unlock = function()
{
  try
  {
    // Fix up for prefixing
    var AudioContext = window.AudioContext||window.webkitAudioContext;
    this.audioContext = new AudioContext();
   
  }
  catch(e)
  {
    alert('Web Audio API is not supported in this browser');
  }

  // create empty buffer
  var buffer = this.audioContext.createBuffer(1, 1, 22050);
  var source = this.audioContext.createBufferSource();
  source.buffer = buffer;

  // connect to output (your speakers)
  source.connect(this.audioContext.destination);

  source.onended = function()
  {
    this.callback;
  }

  // play the file
  source.start ? source.start(0) : source.noteOn(0);
}

function syncStream(node)
{ // should be done by api itself. and hopefully will.

    var buf8 = new Uint8Array(node.buf);
    buf8.indexOf = Array.prototype.indexOf;
    var i=node.sync, b=buf8;
    while(1) {
        node.retry++;
        i=b.indexOf(0xFF,i); if(i==-1 || (b[i+1] & 0xE0 == 0xE0 )) break;
        i++;
    }
    if(i!=-1) {
        var tmp=node.buf.slice(i); //carefull there it returns copy
        delete(node.buf); node.buf=null;
        node.buf=tmp;
        node.sync=i;
        return true;
    }
    return false;
}

AudioManager.prototype.decode = function(node, name)
{
  var that = this;
    try
    {
        this.audioContext.decodeAudioData(node.buf,
        function(decoded){

            node.source  = that.audioContext.createBufferSource();
            node.source.connect(that.audioContext.destination);
            that.audioBuffers[name] = decoded;
            that.soundLoaded(name);


        },
        function()
        { // only on error attempt to sync on frame boundary
            console.log("err")
            if(syncStream(node)) decode(node, name);
        });


    }
    catch(e)
    {
        console.log('decode exception',e.message);
    }


}






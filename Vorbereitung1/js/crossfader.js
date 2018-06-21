

  
window.onload = init;
var context;
var bufferLoader;
var CrossfadeSample = {playing:false, playing2:false};
var VolumeSample = {};


function init() {
  // Fix up prefixing
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  context = new AudioContext();

  bufferLoader = new BufferLoader(
    context,
    [
      './NarutoInstrumental.mp3',
      './cantStopThisMotherfuckerVocal.mp3',
    ],
    finishedLoading
    
    );

  bufferLoader.load();

  }

function finishedLoading(bl)
{
  CrossfadeSample.ctl1 = createSource(bl[0]);
  CrossfadeSample.ctl2 = createSource(bl[1]);
}


CrossfadeSample.play = function() {
  // Create two sources.
  
  // Mute the second source.
  //this.ctl1.gainNode.gain.value = 0;
  
  //this.ctl2.gainNode.gain.value = 0;
  // Start playback in a loop
  if (!this.ctl1.source.start) {
    this.ctl1.source.noteOn(0);
    
  } else {
    this.ctl1.source.start(0);
    
  }

  
};
CrossfadeSample.play2 = function() {
  // Create two sources.
  
  // Mute the second source.
  //this.ctl1.gainNode.gain.value = 0;
  
  //this.ctl2.gainNode.gain.value = 0;
  // Start playback in a loop
  if (!this.ctl2.source.start) {
    
    this.ctl2.source.noteOn(0);
  } else {
  
    this.ctl2.source.start(0);
  }

  
};
function createSource(buffer) {
  var source = context.createBufferSource();
  var gainNode = context.createGain ? context.createGain() : context.createGainNode();
  var gainNode2 = context.createGain ? context.createGain() : context.createGainNode();
  source.buffer = buffer;
  // Turn on looping
  source.loop = true;
  // Connect source to gain.
  source.connect(gainNode);
  source.connect(gainNode2);
  // Connect gain to destination.
  gainNode.connect(context.destination);
  gainNode2.connect(context.destination);
  gainNode2.connect(gainNode);

  return {
    source: source,
    gainNode: gainNode,
    gainNode2:gainNode2,
   
  };
}

CrossfadeSample.pause = function() {
  if (!this.ctl1.source.stop) {
    this.ctl1.source.noteOff(0);
    
  } else {
    this.ctl1.source.stop(0);
    
  }
};
CrossfadeSample.pause2 = function() {
  if (!this.ctl2.source.stop) {
    
    this.ctl2.source.noteOff(0);
  } else {
   
    this.ctl2.source.stop(0);
  }
};



// Fades between 0 (all source 1) and 1 (all source 2)
CrossfadeSample.crossfade = function(element) {
  var x = parseInt(element.value) / parseInt(element.max);
  // Use an equal-power crossfading curve:
  var gain1 = Math.cos(x * 0.5*Math.PI);
  var gain2 = Math.cos((1.0 - x) * 0.5*Math.PI);
  
  this.ctl1.gainNode.gain.value = gain1;
  this.ctl2.gainNode.gain.value = gain2;
};

CrossfadeSample.toggle = function() {
  this.playing ? this.pause() : this.play();
  this.playing = !this.playing;
  
};

CrossfadeSample.toggle2 = function() {
  this.playing2 ? this.pause2() : this.play2();
  this.playing2 = !this.playing2;
  
};


CrossfadeSample.changeVolume = function(element) 
{
  var volume = element.value;
  var fraction = parseInt(element.value) / parseInt(element.max);
  // Let's use an x*x curve (x-squared) since simple linear (x) does not
  // sound as good
  if(this.ctl2.gainNode2.gain.value != 0)
  {
    
  this.ctl2.gainNode2.gain.value *= fraction ;
  console.log(this.ctl2.gainNode2.gain.value);
  }
  else
  {
    
    this.ctl2.gainNode2.gain.value = fraction * fraction;
    console.log(this.ctl2.gainNode2.gain.value);

  }

};

CrossfadeSample.changeVolume2 = function(element) 
{
  var volume = element.value;
  var fraction = parseInt(element.value) / parseInt(element.max);
  // Let's use an x*x curve (x-squared) since simple linear (x) does not
  // sound as good
  if(this.ctl1.gainNode2.gain.value != 0)
  {
    
  this.ctl1.gainNode2.gain.value *= fraction ;
  console.log(this.ctl1.gainNode2.gain.value);
  }
  else
  {
    
    this.ctl1.gainNode2.gain.value = fraction * fraction;
    console.log(this.ctl1.gainNode2.gain.value);

  }

};








//bufferLoader class

function BufferLoader(context, urlList, callback) {
  this.context = context;
  this.urlList = urlList;
  this.onload = callback;
  this.bufferList = new Array();
  this.loadCount = 0;
}

BufferLoader.prototype.loadBuffer = function(url, index) {
  // Load buffer asynchronously
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.responseType = "arraybuffer";

  var loader = this;

  request.onload = function() {
    // Asynchronously decode the audio file data in request.response
    loader.context.decodeAudioData(
      request.response,
      function(buffer) {
        if (!buffer) {
          alert('error decoding file data: ' + url);
          return;
        }
        loader.bufferList[index] = buffer;
        if (++loader.loadCount == loader.urlList.length)
          loader.onload(loader.bufferList);
      },
      function(error) {
        console.error('decodeAudioData error', error);
      }
    );
  }

  request.onerror = function() {
    alert('BufferLoader: XHR error');
  }

  request.send();
}

BufferLoader.prototype.load = function() {
  for (var i = 0; i < this.urlList.length; ++i)
  this.loadBuffer(this.urlList[i], i);
}

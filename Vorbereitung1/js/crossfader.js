window.onload = init;
var context;
var bufferLoader;
var CrossfadeSample = {playing:false};

function init() {
  // Fix up prefixing
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  context = new AudioContext();

  bufferLoader = new BufferLoader(
    context,
    [
      './cantStopThisMotherfuckerVocal.mp3',
      './NarutoInstrumental.mp3',
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
  this.ctl1.gainNode.gain.value = 0;
  //this.ctl2.gainNode.gain.value = 0;
  // Start playback in a loop
  if (!this.ctl1.source.start) {
    this.ctl1.source.noteOn(0);
    this.ctl2.source.noteOn(0);
  } else {
    this.ctl1.source.start(0);
    this.ctl2.source.start(0);
  }

  
};
function createSource(buffer) {
  var source = context.createBufferSource();
  var gainNode = context.createGain ? context.createGain() : context.createGainNode();
  source.buffer = buffer;
  // Turn on looping
  source.loop = true;
  // Connect source to gain.
  source.connect(gainNode);
  // Connect gain to destination.
  gainNode.connect(context.destination);

  return {
    source: source,
    gainNode: gainNode
  };
}

CrossfadeSample.pause = function() {
  if (!this.ctl1.source.stop) {
    this.ctl1.source.noteOff(0);
    this.ctl2.source.noteOff(0);
  } else {
    this.ctl1.source.stop(0);
    this.ctl2.source.stop(0);
  }
};

// Fades between 0 (all source 1) and 1 (all source 2)
CrossfadeSample.crossfade = function(element) {
  var x = parseInt(element.ctl1.source.value) / parseInt(element.max);
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

let audioCtx = new AudioContext();
let audioCtx2 = new AudioContext();
let source = audioCtx.createBufferSource();
let source2 = audioCtx2.createBufferSource();

let request = new XMLHttpRequest();
let request2 = new XMLHttpRequest();

request.open('GET', './Andrea Wasse - Aint No Devil (Dark Souls III Ashes of Ariandel P.mp3', true);
request.responseType = 'arraybuffer';

request2.open('GET', './AC_DC - Thunderstruck (High Quality).mp3', true);
request2.responseType = 'arraybuffer';

request.onload = function Musik1() {
    let audioData = request.response;


    audioCtx.decodeAudioData(audioData, function(buffer) {
        source.buffer = buffer;
        source.connect(audioCtx.destination);
        source.loop = true;
        source.start(0);
    });


};

request2.onload = function Musik2()
{
  let audioData2 = request2.response;

  audioCtx2.decodeAudioData(audioData2, function(buffer)
{
  source2.buffer = buffer;
  source2.connect(audioCtx2.destination);
  source2.loob = true;
  source2.start(0);
});

};

request.send();
request2.send();

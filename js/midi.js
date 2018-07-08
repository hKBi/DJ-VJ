let textArea;
let midiAccess;

document.addEventListener('DOMContentLoaded', (event) => {
    textArea = document.getElementById('result');

    initMidi();
});

function initMidi() {
    if (navigator.requestMIDIAccess) {
        navigator.requestMIDIAccess().then(
            midiSuccess,
            midiFailure
        );
    } else {
        midiFailure();
    }
}

function midiSuccess(midi) {
    textArea.value = 'Midi is working!';

    midiAccess = midi;
    var inputs = midi.inputs;
    for (var input of inputs.values()) {
        input.onmidimessage = onMidiMessage;
    }
}

function midiFailure() {
    textArea.value = 'Failure: Midi is not working!';
}



function onMidiMessage(event) {
  let cmd = event.data[0] >> 4;
  let channel = event.data[0] & 0xf;
  let btnID = event.data[1];
  let value = event.data[2];

  var cross = document.getElementById("cross"); // cross slider
  var vol1 = document.getElementById("vol1"); // cross slider
  var vol2 = document.getElementById("vol2"); // cross slider

  textArea.value += "\n" +
    "New Event (on Channel: "+channel+")==> Type: "+ cmd +
    ", Origin: "+btnID +
    ", Value: "+value;

  textArea.scrollTop = textArea.scrollHeight;
/*
  switch(event.data[1]){
     case 48: CrossfadeSample.toggle();
              CrossfadeSample.changeVolume(event.data[2]);
     break;
     case 49: CrossfadeSample.toggle2();
     break;
     case 64: CrossfadeSample.crossfade(event.data[2]);
  }
*/
var x = 0;
  switch(event.data[1]){

    case 48: vol2.value = event.data[2]; //console.log(~~event.data[2]);
              CrossfadeSample.changeVolume2(vol2)
              break;

    case 49: vol1.value = event.data[2]; //console.log(~~event.data[2]);
              CrossfadeSample.changeVolume(vol1)
              break;

    case 50:  x = event.data[2]; //console.log(~~event.data[2]);
              x = x/43
              speed2.value = x;
              CrossfadeSample.changeSpeed2(speed2)
              //console.log(x);
              break;

    case 51:  x = event.data[2]; //console.log(~~event.data[2]);
              x = x/43
              speed1.value = x;
              CrossfadeSample.changeSpeed1(speed1)
              //console.log(x);
              break;

    case 64: cross.value = event.data[2]; //console.log(~~event.data[2]);
              CrossfadeSample.crossfade(cross);
              break;

  };

}

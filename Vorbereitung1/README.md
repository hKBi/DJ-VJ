# AVT: Übung 01

- Anlegen einer `package.json` Datei: `npm init .`

- Installieren des `live-server` Pakets: `npm i --save live-server`

- Start-Script in `package.json` unter `scripts` hinzufügen: `"start": "live-server"`

- Erstellen einer `index.html` Datei:

```html
<html>
<head>
    <title>AVT Übung 01</title>
</head>
<body>
    <h1>Hello</h1>
</body>
</html>
```

- HTTP-Server starten: `npm start`

- Seite im Browser aufrufen: `http://localhost:8080`

- Erstellen einer Javascript-Datei unter `js/main.js`:

```javascript
console.log('42');
```

- JS-Datei in `index.html` einbinden: `<script src="./js/main.js"></script>`

- Developer-Tools im Browser öffnen

- Audio-Datei laden, decodieren und abspielen:

```javascript
let audioCtx = new AudioContext();
let source = audioCtx.createBufferSource();

let request = new XMLHttpRequest();

request.open('GET', './basic_beat.wav', true);
request.responseType = 'arraybuffer';

request.onload = function() {
    let audioData = request.response;

    audioCtx.decodeAudioData(audioData, function(buffer) {
        source.buffer = buffer;
        source.connect(audioCtx.destination);
        source.loop = true;
        source.start(0);
    });
};

request.send();
```

- Frage: In welchem Verhältnis stehen die Attribute `length`, `duration`, `numberOfChannels` und `sampleRate` des Buffer-Objekts zueinander?

- Mono-Kanal auslesen und `DataView` aus Buffer erzeugen um einzelne Bytes auszulesen:

```javascript
let float32Data = buffer.getChannelData(0);
let dataView = new DataView(float32Data.buffer);
//console.log(getEntropy(dataView));
```

- Frage: Wie muss eine Funktion `getEntropy` aussehen, die aus den einzelnen Bytes der Audio-Datei die Channon'sche Entropie berechnet?

- Tipp 1: DataView liefert die Gesamtanzahl der Bytes mit: `dataView.byteLength`

- Tipp 2: Einzelne Bytes können ausgelesen werden mit: `dataView.getUint8(i)`

- Mögliche Lösung:

```javascript
// Siehe Lösung
```

- Frage: Wie unterscheiden sich die Dateien `basic_beat.wav`, `basic_loop.wav` und `basic_noise.wav` in Bezug auf ihre Entropie?

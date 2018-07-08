# DJ-VJ
DJ/VJ für Audio und Videotechnik

# Dokumentation Belegaufgabe: Audio- und Videotechnik
Erstellung eines DJ/VJ-Tools

Sandro Hoffmann		s0555061
Thomas Kirsch 		s0554325
Robert Bronst		s0555313
Joseph Sorge		s0549427


Der Beleg entspricht den Minimalanforderungen insofern, dass er folgende Kriterien erfüllt. :
-	Einbindung des MIDI-Controllers
-	Zeitgleiches abspielen von 2 Audiotracks sowie 2 Videos
-	Adaptives Streamen mittels MPEG-DASH
-	Separate Lautstärkekontrolle der Audiotracks
-	Implementierung nicht-linearer Crossfader für Video/Audio
-	Chroma-Keying des Videos ist leider nicht möglich
In folgenden Punkten geht der Beleg über die Minimalanforderungen hinaus. :
-	Grafische Filter: 	
				Farbtonanpassung
				Sättigungsanpassung
				Kaleidoscropefilter
				Vignettenfilter
				Anpassung: Kontrast, Helligkeit, Highlight, Schatten, Rauschen
-	Audio:			
				Änderung der Abspielgeschwindigkeit

Im oberen Teil der Website sind die abspielbaren Videos platziert welche in einem Canvas, auf welchem die grafischen Effekte und Filter angewendet werden, zusammengefügt sind.
Filter/Effekte werden über Slider die rechts im oberen Bereich gesetzt sind gesteuert.
Im unterem Bereich befinden sich zwei Audiostreams welche sich per Buttonklick starten und stoppen lassen. Des Weiteren lässt sich die Lautstärke der Sounds separat über Slider einstellen und über Checkboxen stumm schalten.  Ein weiterer Slider, der in der Mitte positioniert ist, ermöglicht es einen Crossfade zwischen den beiden Audiostreams durchzuführen. Auch der Crossfader lässt sich mittels Checkbox ausschalten.
Unterhalb dieser drei Regler befinden sich noch zwei weitere Regler, welche jeweils die Abspielgeschwindigkeit der Audiostreams ändern.

MIDI-CONTROLLER-Steuerung:
 

Unterster Slider:  
Crossfader für die 2 Tracks

vertikaler Slider von angefangen links aufgezählt:
	1. Volume vom erstem Track
	2. Volume vom zweitem Track
3. Speed vom 1.Track
4. Speed vom 2,Track

Installation:
Zur Installation der Anwendung ist es nur notwendig das git-Repository zu clonen
Start der Anwendung:
Im root-Ordner muss der CMD-Befehl „npm start“ ausgeführt werden
Anschließend ist die DJ/VJ-Anwendung unter „127.0.0.1:8080“ erreichbar

import {Piano, KeyboardShortcuts, MidiNumbers} from 'react-piano';
import 'react-piano/dist/styles.css'
import {useState} from 'react';

export default function CPPiano () {
  const firstNote = MidiNumbers.fromNote('c3');
  const lastNote = MidiNumbers.fromNote('f5');
  const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: firstNote,
    lastNote: lastNote,
    keyboardConfig: KeyboardShortcuts.HOME_ROW,
  });

  const [recording, setRecording] = useState(false);
  const [melody, setMelody] = useState([]);

  const recordNotes = (midiNumbers) => {
    setMelody(melody => [...melody, midiNumbers]);
  }

  const startNote = (midiNumbers) => {
      if(!recording){
	setRecording(true);
      }
  }

  const stopNote = (midiNumber, {prevActiveNotes}) => {
      if(recording){
	recordNotes(prevActiveNotes);
	setRecording(false);
      }

  }
 
  return (
    <Piano
      noteRange={{ first: firstNote, last: lastNote }}
      playNote={playNote}
      stopNote={stopNote}
      width={1000}
      keyboardShortcuts={keyboardShortcuts}
    />
  );
}



import {Piano, KeyboardShortcuts, MidiNumbers} from 'react-piano';
import 'react-piano/dist/styles.css'
import {useState, useEffect, useRef} from 'react';
import SoundFont from 'soundfont-player';

export default function CPPiano (props) {
	const firstNote = MidiNumbers.fromNote('c2');
	const lastNote = MidiNumbers.fromNote('b5');
	const keyboardShortcuts = KeyboardShortcuts.create({
		firstNote: firstNote,
		lastNote: lastNote,
		keyboardConfig: KeyboardShortcuts.HOME_ROW,
	});

	const [activeNodes, setActiveNodes] = useState({});
	const [instrument, setInstrument] = useState(null);
	const recording = useRef(false);

	useEffect(()=> {
		const wrap = async () => {
		const tmp = await SoundFont.instrument(props.audioctx, 'acoustic_grand_piano', {format:'mp3', soundfont:'MusyngKite', nameToUrl: (name, soundfont, format) => {return `https://d1pzp51pvbm36p.cloudfront.net/${soundfont}/${name}-${format}.js`}});
			setInstrument(tmp)}

		wrap();

		}, []);

	const startNote = async (midiNumber) => {
		await props.audioctx.resume();
		const audioNode = await instrument.play(midiNumber);
		setActiveNodes(activeNodes => ({...activeNodes, [midiNumber]: audioNode}));

	}

	const stopNote = async (midiNumber) => {
		await props.audioctx.resume();
		if(activeNodes[midiNumber]){
			await activeNodes[midiNumber].stop();
			setActiveNodes(activeNodes => ({...activeNodes, [midiNumber]: null}));
		}

	}

	const startNoteInput = (midiNumbers, {prevActiveNotes}) => {
		if(!recording.current){
			recording.current = true;
		}
	}

	const stopNoteInput = (midiNumber, {prevActiveNotes}) => {
		if(recording.current){
			props.record(midiNumber);
			recording.current = false;
		}

	}

	return (
		<Piano
		noteRange={{ first: firstNote, last: lastNote }}
		playNote={startNote}
		stopNote={stopNote}
		onPlayNoteInput={startNoteInput}
		onStopNoteInput={stopNoteInput}
		width={1000}
		keyboardShortcuts={keyboardShortcuts}
		/>
	);
}




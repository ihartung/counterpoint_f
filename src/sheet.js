import Vex from 'vexflow';
import {useEffect} from 'react';
import {midiVex, staveNotes} from './helper.js';

export default function Sheet (props) {

	useEffect(() => {
		const VF = Vex.Flow;

		// Create an SVG renderer and attach it to the DIV element named "boo".
		var div = document.getElementById("boo")
		var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

		// Size our SVG:
		renderer.resize(500, 500);

		// And get a drawing context:
		var context = renderer.getContext();

		// Create a stave at position 10, 40 of width 400 on the canvas.
		var stave = new VF.Stave(10, 40, 400);

		// Add a clef and time signature.
		stave.addClef("treble").addTimeSignature("4/4");

		// Connect it to the rendering context and draw!
		stave.setContext(context).draw();

		if(props.melody.length){
			var rawNotes = staveNotes(midiVex(props.melody));
			var notes = [];
			for(let i = 0; i < rawNotes.length; i++){
				notes.push(new VF.StaveNote(rawNotes[i]));
			}

			var voice = new VF.Voice({num_beats:notes.length, beat_value:4});
			voice.addTickables(notes);

			var formatter = new VF.Formatter().joinVoices([voice]).format([voice], 400);

			voice.draw(context,stave);
		}

	}, [props.melody]);

	return (
		<div id='boo'></div>
	);
}


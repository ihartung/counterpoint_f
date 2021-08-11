import Vex from 'vexflow';
import {useEffect} from 'react';
import {midiVex, staveNotes} from './helper.js';

export default function Sheet (props) {

	const clear = () => {
		var myDiv = document.getElementById("boo")
		while(myDiv.lastElementChild){
			myDiv.removeChild(myDiv.lastElementChild);
		}
	}

	const createContext = (divID) => {
		const VF = Vex.Flow;

		// Create an SVG renderer and attach it to the DIV element named "boo".
		var div = document.getElementById(divID)
		var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

		// Size our SVG:
		renderer.resize(800, 200);

		// And get a drawing context:
		return renderer.getContext();


	}

	const drawStave = (context) => {
		const VF = Vex.Flow;
		var stave = new VF.Stave(10, 40, 700);
		// Add a clef and time signature.
		stave.addClef("treble");
		// Connect it to the rendering context and draw!
		stave.setContext(context).draw();
		return stave;

	}

	const addVoices = (countermelodies) => {
	    result = [];
	    for(var i = 0; i < countermelodies.length; i++){
		result.push(
		    <div id={'cp'+ i}></div>
		)
	    }

	    return result;
	}

	useEffect(() => {

		drawStave(createContext('boo'));

	}, []);

	useEffect(() => {
		const VF = Vex.Flow;
		clear();	
		var context = createContext('boo');
		var stave = drawStave(context);

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


	useEffect(() => {
		const VF = Vex.Flow;
		clear();
		var context = createContext('boo');
		var stave = drawStave(context);

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

	}, [props.countermelodies]);


	return (
	    <div>
		<div id='boo'></div>
		{addVoices}
	    </div>
	);
}


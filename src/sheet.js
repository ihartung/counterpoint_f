import Vex from 'vexflow';
import {useEffect} from 'react';
import {midiVex, staveNotes} from './helper.js';

export default function Sheet (props) {

	const clearCF = () => {
		var myDiv = document.getElementById("melody_div");
		while(myDiv.lastElementChild){
			myDiv.removeChild(myDiv.lastElementChild);
		}
	}

	const clearCP = () => {
		let matches = document.querySelectorAll('[id ^= "cp-"]')
		matches.forEach(element => {element.remove()});

	}

	const createContext = (divID) => {
		const VF = Vex.Flow;

		// Create an SVG renderer and attach it to the DIV element named "boo".
		var div = document.getElementById(divID)
		var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

		// Size our SVG:
		renderer.resize(900, 200);

		// And get a drawing context:
		return renderer.getContext();


	}


	const drawStave = (context, divId='default', clef='treble') => {
		const VF = Vex.Flow;
		const modifier = VF.Modifier;
		var text = 'C.F.';
		var stave = new VF.Stave(100, 40, 700);
		// Add a clef and time signature.
		if(divId.includes('cp')){
			text = 'C.P. ' + divId.split('-')[1];
		}
		stave.setText(text, modifier.Position.LEFT);
		stave.addClef(clef).addKeySignature(props.keySignature);
		// Connect it to the rendering context and draw!
		stave.setContext(context).draw();
		return stave;

	}

	const average = (array) => array.reduce((a,b) => a+b, 0)/array.length;

	const drawVoice = (cantus, divId, clef='treble') => {

		const VF = Vex.Flow;
		var context = createContext(divId);
		var stave = drawStave(context, divId, clef);
		if(!cantus.length){
			return;
		}
		var rawNotes = staveNotes(midiVex(cantus, props.keySignature), clef);
		var notes = [];
		for(let i = 0; i < rawNotes.length; i++){
			let tmp;
			if(rawNotes[i].keys[0].includes('#')){
				tmp = new VF.StaveNote(rawNotes[i]).addAccidental(0, new VF.Accidental('#'));
			} else if(rawNotes[i].keys[0].includes('b')){
				tmp = new VF.StaveNote(rawNotes[i]).addAccidental(0, new VF.Accidental('b'));
			} else {
				tmp = new VF.StaveNote(rawNotes[i]);

			}
			notes.push(tmp);
		}

		var voice = new VF.Voice({num_beats:notes.length, beat_value:4});
		voice.addTickables(notes);

		var formatter = new VF.Formatter().joinVoices([voice]).format([voice], 400);

		voice.draw(context,stave);

	}

	const addVoices = (countermelodies) => {
		let clef, tag, myDiv;
		for(var i = 0; i < countermelodies.length; i++){
			clef = 'treble';
			tag = 'above';
			if(average(countermelodies[i])<60){
				clef = 'bass';
				tag = 'below';
			}
			myDiv = document.getElementById(tag);
			let new_div = document.createElement('div');
			new_div.setAttribute('id', 'cp-' + (i+1))
			myDiv.prepend(new_div)
			drawVoice(countermelodies[i], new_div.id, clef)
		}
	}

	const drawCF = () => {
		clearCF();
		if(props.melody.length){
			drawVoice(props.melody, 'melody_div')
		} else {
			drawStave(createContext('melody_div'));
		}
	}

	const drawCP = () => {
		clearCP();
		if(props.counterpoints.length){
			addVoices(props.counterpoints);
		}
	}

	useEffect(() => {
		drawStave(createContext('melody_div'));
	}, []);

	useEffect(() => {
		drawCF();
	}, [props.melody]);


	useEffect(() => {
		drawCP();
	}, [props.cpcount]);

	useEffect(() => {
		clearCF();
		if(props.melody.length){
			drawCF();
		} else {
			drawStave(createContext('melody_div'));
		}

		if(props.counterpoints.length){
			drawCP();
		}
	}, [props.keySignature]);



	return (
		<div id='sheet_div'>
		<div id='above'></div>
		<div id='melody_div'></div>
		<div id='below'></div>
		</div>
	);
}


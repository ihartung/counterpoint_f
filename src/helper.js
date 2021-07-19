export const midiVex = (midiNumbers) => {
	var engNotes = [];
	const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#','A', 'A#', 'B'];

	for(let i = 0; i < midiNumbers.length; i++){
		var tmp = '';
		var midi = midiNumbers[i];
		tmp += notes[midi % 12];
		tmp += '/';
		tmp += Math.floor(midi / 12) - 1;
		engNotes.push(tmp);
	}

	return engNotes;

}

export const staveNotes = (engNotes) => {
	var vexNotes = [];

	for(let i = 0; i < engNotes.length; i++){
		var tmp = {clef: 'treble', keys: [engNotes[i]], duration: 'q'};
		vexNotes.push(tmp);
	}

	return vexNotes;
}


const enforceKey = (keySig) => {
	var sharpNotes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#','A', 'A#', 'B'];
	var flatNotes = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab','A', 'Bb', 'B'];
	const minor = ['A','E','B','F#','C#','G#','D','G','C','F','Bb'];
	const major = ['C','G','D','A','E','B','F','Bb','Eb','Ab','Db'];
	const sharps = ['F','C','G','D','A'];
	const flats = ['B','E','A','D','G'];

	let scale = major;
	let key = keySig;

	if(key.includes('m')){
		scale = minor;
		key = keySig.replace('m', '');
	}

	let i = scale.indexOf(key);

	if(i==0){
		return sharpNotes;
	}

	i -= 1;

	var offsets = sharps; 
	var notes = sharpNotes;
	var del = '#';

	if(i>4){
		offsets = flats;
		notes = flatNotes;
		del = 'b';
		i-=5;
	}

	for(let j = 0; j <= i; j++){
		let acc = offsets[j] + del;
		let k = notes.indexOf(acc);
		notes[k] = offsets[j];
		if(del == 'b'){
			notes[k+1] = offsets[j] + '#';
		} else {
			notes[k-1] = offsets[j] + 'b';
		}
	}

	return notes;

}



export const midiVex = (midiNumbers, key) => {
	var engNotes = [];
	var notes = enforceKey(key);

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

export const staveNotes = (engNotes, clef='treble') => {
	var vexNotes = [];

	for(let i = 0; i < engNotes.length; i++){
		var tmp = {clef: clef, keys: [engNotes[i]], duration: 'q'};
		vexNotes.push(tmp);
	}

	return vexNotes;
}

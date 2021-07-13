import Vex From 'vexflow';

const midiVex = (midiNumbers) => {
    var engNotes = [];
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#','A', 'A#', 'B'];

    for(note in midiNumbers){
	var tmp = '';
	tmp += notes[note.number % 12];
	tmp += '/';
	tmp += Math.floor(note.number / 12) - 1;
	engNotes.push(tmp);
    }

    return engNotes;

}

const staveNotes = (engNotes) => {
    var vexNotes = [];
    const VF = Vex.Flow;

    for(note in engNotes){
	var tmp = new VF.StaveNote({clef: 'treble', keys: [note], duration: 'q'});
	vexNotes.push(tmp);
    }

    return vexNotes;
}


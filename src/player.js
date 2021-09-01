import {useState, useEffect} from 'react';
import MIDISounds from 'midi-sounds-react';
import {Grid, makeStyles, Button} from '@material-ui/core';

export default function Player (props) {

	const organ = 193; 
	var midiSounds;
	const [playing, setPlaying] = useState(0);

	useEffect(() => {
		midiSounds.setInstrumentVolume(organ, .5);
		midiSounds.beatIndex=0;
	}, []);

	const playPause = () => {
		if(playing==0){
			if(props.melody.length || props.counterpoints.length ){
				var data = [];
				for(let i = 0; i<props.melody.length; i++){
					let row = [];
					row.push([organ, [props.melody[i]], 1/4]);
					for(let j = 0; j<props.counterpoints.length; j++){
						row.push([organ, [props.counterpoints[j][i]], 1/4]);
					}	
					data.push([[],row]);
				}
				for(let j = 0; j<4; j++){
					data.push([[],[]]);
				}	
				midiSounds.startPlayLoop(data, 120, 1/4, 0);
				setPlaying(1);

			}
		} else {
			setPlaying(0);
			midiSounds.stopPlayLoop();
			midiSounds.beatIndex=0;
		}
	};

	return (<div>
		<Button variant='outlined' color='primary' onClick={playPause}>{playing?'Stop':'Play'}</Button>
		<MIDISounds ref={(ref) => (midiSounds = ref)} appElementName='root' instruments={[organ]}/>
		</div>)

}


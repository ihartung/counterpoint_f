import CPPiano from './piano.js';
import Sheet from './sheet.js';
import RadioButtons from './radio.js'
import {Grid, makeStyles, Button} from '@material-ui/core';
import {useEffect, useState} from 'react';
import axios from 'axios';
import routes from './routes';
import MelodyForm from './melodyForm.js';
import Player from './player.js';

const useStyles = makeStyles({
	trunk: {
		flexGrow: 1,
		justifyContent: 'center',
		display: 'flex',
	},
});

function Landing() {
	const classes = useStyles();
	const [audioctx, setAudioctx] = useState(new window.AudioContext());
	const [melody, setMelody] = useState([]);
	const [keySig, setKeySig] = useState('C');
	const [counterpoints, setCounterpoints] = useState([]);
	const [cpcount, setCpcount] = useState(0);
	const [voice, setVoice] = useState(0);

	const recordNotes = (midiNumber) => {
		if(voice){
			let i = voice - 1;
			let cps = counterpoints;
			cps[i] = [...counterpoints[i], midiNumber]
			setCounterpoints(cps);
			let tmp = cpcount + 1;
			setCpcount(tmp);
		} else {
			setMelody(melody => [...melody, midiNumber]);
		}
	}

	const changeKey = (key) => {
		setKeySig(key);
	}

	const resetMelody = () => {
		setMelody([]);
		setCounterpoints([]);
		setVoice(0);
		setCpcount(0);
	}

	const addCounterpoint = cp => {
		setCounterpoints(counterpoints => [...counterpoints, cp]);
		let tmp = cpcount + cp.length;
		setCpcount(tmp);
	}

	const addBlank = () => {
		setCounterpoints(counterpoints => [...counterpoints, []]);
		let tmp = cpcount + 1;
		setCpcount(tmp);
	}

	const backspace = () => {
		if(voice){
			let i = voice - 1;
			let cps = counterpoints;
			cps[i] = cps[i].slice(0,-1);
			setCounterpoints(cps);
			let tmp = cpcount - 1;
			setCpcount(tmp);
		} else {
			let tmp = melody.slice(0,-1);
			setMelody(tmp);
		}
	}

	const clearSelection = () => {
		if(voice){
			let i = voice - 1;
			let cps = counterpoints;
			cps.splice(i,1);
			setCounterpoints(cps);
			if(cps.length==0){
				setVoice(0);
			}
			let tmp = cpcount - 1;
			setCpcount(tmp);
		} else {
			setMelody([]);
		}
	}


	const selectVoice = (index) => {
		setVoice(index);
	}

	useEffect(() => {
		if(!localStorage.getItem('csrftoken')){
			axios({
				method: 'get',
				url: routes.root + '/csrf',
			}).then(result => {
				localStorage.removeItem('csrftoken');
				localStorage.setItem('csrftoken', result.data.csrfToken);
			});
		}
	}, []);

	return (
		<div>
		<Grid container>
		<Grid className={classes.trunk} xs={12} item>
		<Grid item>
		<h1>Johann Joseph Fux's <i>Gradus Ad Parnassum</i></h1>
		</Grid>
		</Grid>
		<Grid className={classes.trunk} xs={12} item>
		<Grid item>
		<CPPiano audioctx={audioctx} record={recordNotes}/>
		</Grid>
		</Grid>
		<Grid className={classes.trunk} xs={12} item>
		<Grid item>
		<RadioButtons voice={voice} selectVoice={selectVoice} counterpoints={counterpoints}/>
		</Grid>
		</Grid>
		<Grid className={classes.trunk} xs={12} item>
		<Grid item>
		<Button variant='outlined' color='primary' onClick={addBlank}>Add Blank</Button>
		<Button variant='outlined' color='primary' onClick={backspace}>Backspace</Button>
		<Button variant='outlined' color='primary' onClick={clearSelection}>Clear Selection</Button>
		<Button variant='outlined' color='primary' onClick={resetMelody}>Clear All</Button>
		</Grid>
		</Grid>

		<Grid className={classes.trunk} xs={12} item>
		<Grid item>
		<Sheet keySignature={keySig} cpcount={cpcount} melody={melody} counterpoints={counterpoints}/>
		</Grid>
		</Grid>
		<Grid className={classes.trunk} xs={12} item>
		<Grid item>
		<MelodyForm changeKey={changeKey} melody={melody} addCounterpoint={addCounterpoint}/>
		</Grid>
		</Grid>
		<Grid className={classes.trunk} xs={12} item>
		<Grid item>
		<Player melody={melody} counterpoints={counterpoints}/>
		</Grid>
		</Grid>
		</Grid>
		</div>
	);
}

export default Landing;

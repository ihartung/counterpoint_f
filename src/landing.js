import CPPiano from './piano.js';
import Sheet from './sheet.js';
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

	const recordNotes = (midiNumber) => {
		setMelody(melody => [...melody, midiNumber]);
	}

	const changeKey = (key) => {
		setKeySig(key);
	}

	const resetMelody = () => {
		setMelody([]);
		setCounterpoints([]);
	}

	const addCounterpoint = cp => {
	    setCounterpoints(counterpoints => [...counterpoints, cp]);
	}

	const backspace = () => {
		let tmp = melody.slice(0,-1);
		setMelody(tmp);
	}

	const play = () => {
		return;
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
		<CPPiano audioctx={audioctx} record={recordNotes}/>
		</Grid>
		</Grid>
		<Grid className={classes.trunk} xs={12} item>
		<Grid item>
		<Sheet keySignature={keySig} melody={melody} counterpoints={counterpoints}/>
		</Grid>
		</Grid>
		<Grid className={classes.trunk} xs={12} item>
		<Grid item>
		<MelodyForm changeKey={changeKey} melody={melody} addCounterpoint={addCounterpoint}/>
		</Grid>
		</Grid>
		<Grid className={classes.trunk} xs={12} item>
		<Grid item>
		<Button variant='outlined' color='primary' onClick={backspace}>Backspace</Button>
		<Button variant='outlined' color='primary' onClick={resetMelody}>Clear</Button>
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

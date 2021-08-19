import CPPiano from './piano.js';
import Sheet from './sheet.js';
import {Grid, makeStyles, Button} from '@material-ui/core';
import {useState} from 'react';
import axios from 'axios';
import routes from './routes';
import MelodyForm from './melodyForm.js';

const useStyles = makeStyles({
	trunk: {
		flexGrow: 1,
		justifyContent: 'center',
		display: 'flex',
	},
});

function Landing() {
	const classes = useStyles();
	const audioctx = new window.AudioContext();
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
	}

	const addCounterpoint = cp => {
	    setCounterpoints(counterpoints => [...counterpoints, cp]);
	}


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
		<Button variant='outlined' color='primary' onClick={resetMelody}>Clear</Button>
		</Grid>
		</Grid>
		</Grid>
		</div>
	);
}

export default Landing;

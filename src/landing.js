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
	const [counterpoints, setCounterpoints] = useState([]);

	const recordNotes = (midiNumber) => {
		setMelody(melody => [...melody, midiNumber]);
	}

	const resetMelody = () => {
		setMelody([]);
	}

	const submitMelody = e => {
		e.preventDefault();

		var data = new FormData();

		data.append('melody', melody)
		//data.append('key', key)

		var headers = {'X-CSRFToken':localStorage.getItem('csrftoken')}

		axios.post(routes.root + '/counterpoint', data, {headers})
			.then()
			.catch(e => {
				console.log(e);
			});
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
		<Sheet melody={melody} counterpoints={counterpoints}/>
		</Grid>
		</Grid>
		<Grid className={classes.trunk} xs={12} item>
		<Grid item>
		<MelodyForm addCounterpoint={addCounterpoint}/>
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

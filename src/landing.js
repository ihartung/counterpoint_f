import CPPiano from './piano.js';
import Sheet from './sheet.js';
import {Grid, makeStyles} from '@material-ui/core';
import {useState} from 'react';

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

	const recordNotes = (midiNumber) => {
		setMelody(melody => [...melody, midiNumber]);
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
		<Sheet melody={melody}/>
		</Grid>
		</Grid>
		</Grid>
		</div>
	);
}

export default Landing;

import {useState} from 'react';
import {Switch, MenuItem, Select, Button, Grid, FormControl, FormControlLabel} from '@material-ui/core'
import {spacing} from '@material-ui/system'
import routes from './routes.js';
import axios from 'axios';

export default function MelodyForm(props){

	const {melody, addCounterpoint} = props;

	const initialDeckState = {
		title:'',
		file:null,
	};

	const keys = ['A', 'B', 'C', 'D', 'E', 'F', 'G','Ab', 'Bb', 'Cb', 'Db', 'Eb', 'Fb', 'Gb','A#', 'B#', 'C#', 'D#', 'E#', 'F#', 'G#'];

	const [key, setKey] = useState('C');
	const [scale, setScale] = useState('major');
	const [vertical, setVertical] = useState(true);

	const handleKeyChange = e => {
		var kk = e.target.value;
		setKey(kk)
		if(scale == 'minor'){
			props.changeKey(kk + 'm');
			return;
		}
		props.changeKey(kk);
	}

	const handleScaleChange = e => {
		var mm = e.target.value;
		setScale(mm);
		if(mm == 'minor'){
			props.changeKey(key + 'm');
			return;
		}
		props.changeKey(key);
	}

	const handleVerticalChange = e => {
		setVertical(e.target.checked)
	}


	const submitMelody = e => {
		e.preventDefault();

		var data = new FormData();

		data.append('key', key + ' ' + scale)
		data.append('vertical', vertical? 1:-1)
		data.append('melody', props.melody)

		var headers = {'X-CSRFToken':localStorage.getItem('csrftoken')}

		axios.post(routes.root + '/counterpoint', data, {headers})
			.then(result => {
				addCounterpoint(result.data.counterpoint)
			})
			.catch(e => {
				console.log(e);
			});

	}


	return (
		<div m={3}>
		<Grid container spacing={1}>
		<Grid item xs={3}>
		<Select id='kk' onChange={handleKeyChange} value={key}>
		{keys.map(key => (
			<MenuItem value={key}>{key}</MenuItem>
		))}
		</Select>
		</Grid>
		<Grid item xs={3}>
		<Select id='mm' onChange={handleScaleChange} value={scale}>
		<MenuItem value='major'>major</MenuItem>
		<MenuItem value='minor'>minor</MenuItem>
		</Select>
		</Grid>
		<Grid item xs={3}>
		<FormControlLabel
		control={<Switch checked={vertical} onChange={handleVerticalChange}/>}
		label={vertical?'above':'below'}/>
		</Grid>
		<Grid item xs={3}>
		<Button onClick={submitMelody} variant='contained' color="primary">Counterpoint</Button>
		</Grid>
		</Grid>
		</div>
	)



}

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import {FormControlLabel, FormControl, FormLabel} from '@material-ui/core';


export default function RadioButtons(props) {
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		props.selectVoice(parseInt(event.target.value, 10))
	};

	return (
		<div>
		<FormControl component="fieldset">
		<FormLabel component="legend">Select Voice</FormLabel>
		<RadioGroup row name="voices" value={props.voice} onChange={handleChange}>
		<FormControlLabel value={0} control={<Radio />} label="C.F." />
		{props.counterpoints.map((cp, index) => (
			<FormControlLabel value={index + 1} control={<Radio />} label={"C.P. " + (index + 1)} />
		)
		)}
		</RadioGroup>
		</FormControl>
		</div>
	);
}


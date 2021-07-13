import CPPiano from './piano.js';
import Sheet from './sheet.js';
import {Grid, makeStyles} from '@material-ui/core';

const useStyles = makeStyles({
    trunk: {
	flexGrow: 1,
	justifyContent: 'center',
	display: 'flex',
    },
});

function Landing() {
    const classes = useStyles();


  return (
    <div>
      <Grid container>
      <Grid className={classes.trunk} xs={12} item>
      <Grid item>
	<CPPiano/>
      </Grid>
      </Grid>
      <Grid className={classes.trunk} xs={12} item>
      <Grid item>
	<Sheet/>
      </Grid>
      </Grid>
      </Grid>
    </div>
  );
}

export default Landing;

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    placeContent: 'center',
    flexGrow: ' 1',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

const CircularIndeterminate = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress color="secondary" />
    </div>
  );
}
export default CircularIndeterminate
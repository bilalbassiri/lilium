import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
});

function LinearProgressWithLabel({ progress }) {
    const classes = useStyles();
    const [buffer, setBuffer] = useState(0)
    const progressRef = React.useRef(() => { });
    useEffect(() => {
        progressRef.current = () => {
            const diff = Math.random() * 10;
            const diff2 = Math.random() * 10;
            setBuffer(progress + diff + diff2);
        };
        const timer = setInterval(() => {
            progressRef.current();
        }, 500);

        return () => {
            clearInterval(timer);
        };
    });
    return (
        <Box display="flex" alignItems="center" className={classes.root}>
            <Box width="100%" mr={1}>
                <LinearProgress variant="buffer" value={progress} valueBuffer={buffer} />
            </Box>
        </Box>
    );
}
export default LinearProgressWithLabel;
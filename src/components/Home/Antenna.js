import React from 'react'
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import { useFrequency, useSetFrequncy } from '../../contexts/RadioCentext';
import { getChannels } from '../../helpers/helpers';

const Antenna = () => {
    const fr = useFrequency()
    const setFrequency = useSetFrequncy()
    const numberOfChannels = 9, pointerTransition = 10;
    const getFormattedFrequency = f => '0' + (f /= 4).toFixed(2)
    
    return (
        <div className="antenna-container">
            <div className="frequency">
                {getFormattedFrequency(fr)}
            </div>
            <div className='antenna'>
                <button
                    type="button"
                    className="change-frequency-button"
                    onClick={() => setFrequency(fr === 0 ? fr : fr - 1)}>
                    <ArrowBackIosRoundedIcon />
                </button>
                <div className="poles">
                    <div
                        className="pointer"
                        style={{ transform: `translateX(${fr * pointerTransition}px)`, height: fr % 2 === 0 ? '20px' : '10px' }}>
                    </div>
                    {
                        getChannels(numberOfChannels).map((channel, i) =>
                            <div
                                className={`frequency-pole ${channel}`}
                                style={{ opacity: fr === i ? '0' : '1' }}
                                key={i}>
                            </div>
                        )
                    }
                </div>
                <button
                    type="button"
                    className="change-frequency-button"
                    onClick={() => setFrequency(fr === numberOfChannels - 1 ? fr : fr + 1)}
                >
                    <ArrowForwardIosRoundedIcon />
                </button>
            </div>
        </div>

    )
}
export default Antenna;
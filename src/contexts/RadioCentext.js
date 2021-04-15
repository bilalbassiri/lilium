import React, { createContext, useContext, useState } from 'react';

const RadioContext = createContext();
RadioContext.displayName= "RadioContext";

const useFrequency = () => useContext(RadioContext).frequency
const useSetFrequncy = () => useContext(RadioContext).setFrequency

const RadioProvider = ({ children }) => {
    const [frequency, setFrequency] = useState(0)
    return (
        <RadioContext.Provider value={{frequency, setFrequency}}>
            { children }
        </RadioContext.Provider>
    )
}
export { RadioProvider, useFrequency, useSetFrequncy }
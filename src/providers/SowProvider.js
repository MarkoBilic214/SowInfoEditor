import React, {Provider, createContext, useState} from 'react'

export const SowInfoContext = createContext();


export const SowProvider = props => {
    const [SowInfo, setSowInfo] = useState({
        BatchNumber: "",
        TimeStarted: "",
        TimeEnded: "",
        Parity: "",
        data: []
    });
    return (
        <SowInfoContext.Provider value={[SowInfo,setSowInfo]}>
            {props.children}
        </SowInfoContext.Provider>
    )
}

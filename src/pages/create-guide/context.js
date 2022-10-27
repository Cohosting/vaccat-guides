import { createContext, useContext, useState } from "react";


export const contextObject = createContext({});


export const CreateGuideContextComponent = ({ children }) => {

    const [step, setStep] = useState(0);
    const handleStep = (val = 1) => {
        setStep(step + val)
    }

    const value = { step, handleStep }
    return (
        <contextObject.Provider value={{
            ...value
        }}>
            {children}
        </contextObject.Provider>

    )
}


export const useGuideContext = () => {
    const context = useContext(contextObject);

    return context
}
import { createContext, useContext, useState } from "react";


export const contextObject = createContext({});


export const CreateGuideContextComponent = ({ children }) => {
    const [generalData, setGeneralData] = useState({
        guideName: '',
        guideAccessCode: '',
        location: '',
        coordinates: []
    })
    const [cards, setCards] = useState({
        checkIn: [],
        wifi: [],
        parking: [],
        departure: []
    })

    const [currentlySelected, setCurrentlySelected] = useState({
        checkIn: {},
        wifi: {},
        parking: {},
        departure: {}
    })

    const [step, setStep] = useState(1);
    const handleStepForward = () => {
        setStep(step + 1)
    }
    const handleStepBackword = () => {
        if (step === 0) return
        setStep(step - 1)
    }

    const value = { step, generalData, setGeneralData, handleStepBackword, handleStepForward, cards, setCards, currentlySelected, setCurrentlySelected };

    console.log(value)

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
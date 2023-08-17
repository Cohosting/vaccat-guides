import { createContext, useEffect, useState } from "react";


export const propertyContext = createContext(null);





export const PropertyContextObject = ({ children }) => {
    const [propertyState, setPropertyState] = useState({
        propertyTitle: '',
        address: '',
        coordinates: [],
        images: [],
        password: '',
        customInput: '',
        checkIn: '9:00 AM',
        checkInAdditional: '',
        wifiName: '',
        wifiPassword: '',
        wifiAdditional: '',
        hostName: '',
        phoneNumber: '',
        secondaryPhoneNumber: '',
        hostAdditionalInformation: '',
        propertyCustomLink: ''
    });
    const [catagories, setCatagories] = useState(null);
    const [selectedGuides, setSelectedGuides] = useState({});
    const [specificCatagoriesGuides, setSpecificCatagoriesGuides] = useState(null)
    const [shouldShowLayout, setShouldShowLayout] = useState(true)
    const [mode, setMode] = useState('');
    const [allGuides, setAllGuides] = useState(null)

    const [step, setStep] = useState(1);

    const stepIncrease = () => {
        if (step === 6) return;
        setStep(step + 1)
    }
    const stepDecrease = () => {
        if (step === 1) return;
        setStep(step - 1)
    };


    return (
        <propertyContext.Provider value={{
            step,
            stepDecrease,
            stepIncrease,
            propertyState, setPropertyState,
            mode,
            setMode,
            shouldShowLayout,
            setShouldShowLayout,
            catagories,
            setCatagories,
            specificCatagoriesGuides, setSpecificCatagoriesGuides,
            allGuides, setAllGuides,
            selectedGuides, setSelectedGuides
        }}>
            {children}
        </propertyContext.Provider>
    )
}
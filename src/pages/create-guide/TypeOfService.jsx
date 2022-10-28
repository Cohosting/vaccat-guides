import { Box, VStack } from '@chakra-ui/react'
import React from 'react'
import { useContext } from 'react'
import { Input } from '../../components/Input'
import { LocationInput } from '../../components/LocationInput'
import { contextObject } from './context'

export const TypeOfService = () => {
    const { generalData, setGeneralData } = useContext(contextObject);
    const { guideName, guideAccessCode, } = generalData;

    const handleChange = (e) => {
        const { name, value } = e.target
        setGeneralData({
            ...generalData,
            [name]: value
        })
    };

    const handleLocation = (location, coord) => {
        setGeneralData({
            location,
            coordinates: coord
        })
    }
    return (
        <Box >
            <Input
                label={'Guide name'}
                value={guideName}
                onChange={handleChange}
                name="guideName"

            />

            <Input
                label={'Guide Access code'}
                value={guideAccessCode}
                onChange={handleChange}
                name="guideAccessCode"


            />

            <LocationInput handleLocation={handleLocation} />
        </Box>
    )
}

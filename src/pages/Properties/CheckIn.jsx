import { Box, Text, Textarea } from '@chakra-ui/react'
import React from 'react'
import { useContext } from 'react'
import { propertyContext } from '../../context/property'
import { labelStyle, PropertyInput, subTextStyle } from './PropertyDetails'

export const CheckIn = () => {
    const { propertyState, setPropertyState } = useContext(propertyContext);
    const { checkIn, checkInAdditional } = propertyState;
    return (
        <Box>
            <Text sx={subTextStyle}>Check-ins  information</Text>
            <Box mt={3}>
                <PropertyInput
                    label='Check-in time'
                    value={checkIn}
                    name={'checkIn'}
                    handleChange={(name, value) => setPropertyState({
                        ...propertyState,
                        [name]: value
                    })}
                />
                <Box fontFamily='GTMedium' mt={3} >
                    <Text sx={labelStyle} >Is there anything else you need to tell guests about check-in?</Text>
                    <Textarea onChange={(e) => {
                        setPropertyState({
                            ...propertyState,
                            checkInAdditional: e.target.value
                        })
                    }} _active={{
                        outline: 'none',
                        border: 'none'
                    }} value={checkInAdditional} border={'none'} borderRadius={'none'} borderBottom={'1px solid gray'} />
                </Box>
            </Box>

        </Box>
    )
}

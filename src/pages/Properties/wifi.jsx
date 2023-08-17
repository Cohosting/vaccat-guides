import { Box, Text, Textarea } from '@chakra-ui/react'
import React from 'react'
import { useContext } from 'react'
import { propertyContext } from '../../context/property'
import { labelStyle, PropertyInput, subTextStyle } from './PropertyDetails'

export const Wifi = () => {
    const { propertyState, setPropertyState } = useContext(propertyContext);

    const { wifiName, wifiPassword, wifiAdditional } = propertyState
    return (
        <Box>
            <Text sx={subTextStyle}>WIFI information</Text>
            <Box mt={3}>
                <PropertyInput
                    label='Network name'
                    value={wifiName}
                    name={'wifiName'}
                    handleChange={(name, value) => setPropertyState({
                        ...propertyState,
                        [name]: value
                    })}
                />
                <Box my={4}>

                    <PropertyInput
                        label='Network password'
                        value={wifiPassword}
                        name={'wifiPassword'}
                        handleChange={(name, value) => setPropertyState({
                            ...propertyState,
                            [name]: value
                        })}
                    />
                </Box>

                <Box fontFamily='GTMedium'>
                    <Text sx={labelStyle} >Is there anything else you need to tell guests about using the wifi?</Text>
                    <Textarea onChange={(e) => {
                        setPropertyState({
                            ...propertyState,
                            wifiAdditional: e.target.value
                        })
                    }} _active={{
                        outline: 'none',
                        border: 'none'
                    }} value={wifiAdditional} border={'none'} borderRadius={'none'} borderBottom={'1px solid gray'} />
                </Box>
            </Box>
        </Box>
    )
}

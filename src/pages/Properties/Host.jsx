import { Box, Text, Textarea } from '@chakra-ui/react'
import React from 'react'
import { useContext } from 'react'
import { propertyContext } from '../../context/property'
import { labelStyle, PropertyInput, subTextStyle } from './PropertyDetails'

export const Host = () => {
    const { propertyState, setPropertyState } = useContext(propertyContext);
    const { hostName, phoneNumber, secondaryPhoneNumber, hostAdditionalInformation } = propertyState;
    return (
        <Box>
            <Text sx={subTextStyle} >Contact Details of Host</Text>
            <Box mt={4}>
                <PropertyInput
                    label='Name'
                    value={hostName}
                    name={'hostName'}
                    handleChange={(name, value) => setPropertyState({
                        ...propertyState,
                        [name]: value
                    })}
                />
                <Box my={4} >

                    <PropertyInput
                        label='Number'
                        value={phoneNumber}
                        name={'phoneNumber'}
                        handleChange={(name, value) => setPropertyState({
                            ...propertyState,
                            [name]: value
                        })}
                    />
                </Box>
                <Box mb={4}>

                    <PropertyInput
                        label='Secondary number'
                        value={secondaryPhoneNumber}
                        name={'secondaryPhoneNumber'}
                        handleChange={(name, value) => setPropertyState({
                            ...propertyState,
                            [name]: value
                        })}
                    />
                </Box>

                <Box fontFamily='GTMedium'>
                    <Text sx={labelStyle} >Additional Information</Text>
                    <Textarea onChange={(e) => {
                        setPropertyState({
                            ...propertyState,
                            hostAdditionalInformation: e.target.value
                        })
                    }} _active={{
                        outline: 'none',
                        border: 'none'
                    }} value={hostAdditionalInformation} border={'none'} borderRadius={'none'} borderBottom={'1px solid gray'} />
                </Box>


            </Box>
        </Box>
    )
}

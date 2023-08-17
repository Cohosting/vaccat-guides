import { Box, Input, Text } from '@chakra-ui/react'
import React from 'react'
import { useContext } from 'react'
import { AiOutlineLink } from 'react-icons/ai'
import { propertyContext, PropertyContextObject } from '../../context/property'
import { labelStyle, subTextStyle } from './PropertyDetails'

export const CustomLink = () => {
    const { propertyState, setPropertyState } = useContext(propertyContext)
    return (
        <Box>
            <Text sx={subTextStyle} >Set a  custom url to access the  property</Text>

            <Box mt={4} >
                <Box fontFamily='GTMedium' pos={'relative'}>
                    <Text sx={labelStyle} >Custom Link</Text>
                    <Box pos={'relative'}>
                        <Input onChange={(e) => setPropertyState({
                            ...propertyState,
                            'propertyCustomLink': e.target.value
                        })} value={propertyState.propertyCustomLink} pb={2} color={'#858585'} borderRadius={'0px'} borderBottom={'1px solid #D8D8D8'} variant={'unstyled'} />
                    </Box>
                    <AiOutlineLink style={{
                        position: 'absolute',
                        bottom: '14px',
                        right: '8px'
                    }} />

                </Box>
                <Text mt={2} sx={{
                    fontsize: '12px',
                    color: '#AEAEAE',
                    fontFamily: 'GTMedium'
                }} >Ex: https://www.vacaat.com/properties/{propertyState.propertyCustomLink !== '' ? propertyState.propertyCustomLink : 'your-dream-property'} </Text>
            </Box>
        </Box>
    )
}

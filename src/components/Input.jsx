import React from 'react'
import { Box, Input as TextInput, Text } from '@chakra-ui/react'

export const Input = ({ value, onChange, label, name }) => {
    let inputStyle = {
        border: '1px solid #A8A8A8',
        borderRadius: '4px',
        w: '100%',
        height: '50px',
        fontFamily: 'GTRegular',

    };
    let lableStyle = {
        fontSize: '16px',
        fontWeight: 500,
        fontFamily: 'GTMedium',
        color: ' rgba(27, 43, 65, 0.72)',

    };
    return (
        <Box mb={'16px'}>
            {
                label && <Text sx={lableStyle} textTransform={'capitalize'} >{label}</Text>
            }

            <TextInput
                mt={'5px'}
                value={value}
                onChange={onChange}
                sx={inputStyle}
                focusBorderColor={'rgba(37, 206, 208, 0.8)'}
                name={name}
            />

        </Box>
    )
}

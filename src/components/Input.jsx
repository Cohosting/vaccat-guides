import React from 'react'
import { Box, Input as TextInput, Text } from '@chakra-ui/react'

export const Input = ({ value, onChange, label, name }) => {
    let inputStyle = {
        border: '1px solid #A8A8A8',
        borderRadius: '10px',
        w: '100%',
        height: '45px'
    };
    let lableStyle = {
        fontSize: '18px',
        fontWeight: 500,
        color: '#6C7689'
    };
    return (
        <Box mb={'8px'}>
            {
                label && <Text sx={lableStyle} >{label}</Text>
            }

            <TextInput
                mt={'8px'}
                value={value}
                onChange={onChange}
                sx={inputStyle}
                name={name}
            />

        </Box>
    )
}

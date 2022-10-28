import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react'

import { AiFillClockCircle } from 'react-icons/ai'

export const TimeCard = ({ label, value }) => {

    let timeBoxStyle = {
        bg: '#000000',
        color: 'white',
        p: 1,
        borderRadius: '6px',
        cursor: 'pointer'
    };
    let labelStyle = {
        fontSize: '17px',
        fontWeight: 500,
        mb: 2,
        mt: 2
    }
    return (
        <Box>
            <Text sx={labelStyle}>{label}</Text>
            <Flex alignItems={'center'} justifyContent={'space-between'} bg={'white'} boxShadow={'0px 3px 16px rgba(187, 187, 187, 0.45)'} p={3}>
                <Text>{value}</Text>
                <Box sx={timeBoxStyle}>
                    <AiFillClockCircle />
                </Box>
            </Flex>
        </Box>
    )
}

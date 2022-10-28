import React from 'react';
import { Box, Flex, HStack, Text } from '@chakra-ui/react'

import { FaBeer } from 'react-icons/fa';
import { useContext } from 'react';
import { contextObject } from '../pages/create-guide/context';

const IconBox = ({ children }) => {
    return (
        <Flex color={'white'} bg={'#6C7689'} alignItems={'center'} justifyContent={'center'} w={'42px'} height={'42px'} borderRadius={'100%'}  >
            {children}
        </Flex>
    )
}

export const Steps = () => {
    const { step } = useContext(contextObject);


    const stepText = {
        1: 'Types of service',
        2: 'Arrival & departure',
    }

    const stepContainerStyle = {
        border: '1px solid #DFDFE8',
        borderRadius: '14px',
        px: '16px',
        py: '20px'
    }
    let subTextStyle = {
        fontSize: '16px',
        fontWeight: 700
    }
    return (
        <Box sx={stepContainerStyle}>
            <Flex>
                <IconBox>

                    <FaBeer /> 
                </IconBox>
                <Box ml={'20px'}>
                    <Text color={'#6C7689'} sx={subTextStyle}>Step {step}/6</Text>
                    <Text sx={subTextStyle}>{stepText[step]}</Text>
                </Box>
            </Flex>
            <HStack mt={'10px'}>
                <IconBox>
                    <FaBeer />
                </IconBox>
                <IconBox>
                    <FaBeer />
                </IconBox>
                <IconBox>
                    <FaBeer />
                </IconBox>
                <IconBox>
                    <FaBeer />
                </IconBox>
            </HStack>
        </Box>
    )
}

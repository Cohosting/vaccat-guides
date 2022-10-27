import React from 'react';
import { Box, Flex, HStack, Text } from '@chakra-ui/react'

import { FaBeer } from 'react-icons/fa';

const IconBox = ({ icon }) => {
    return (
        <Box p={3} borderRadius={'100%'} bg="red">
            {icon}
        </Box>
    )
}

export const Steps = () => {
    return (
        <Box>
            <Flex>
                <IconBox>
                    <FaBeer />
                </IconBox>
                <Box>
                    <Text>Step 2/6</Text>
                    <Text>Arrival & Departure</Text>
                </Box>
            </Flex>
            <HStack>
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

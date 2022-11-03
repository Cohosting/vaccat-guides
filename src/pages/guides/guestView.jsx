import React from 'react';
import { Box, HStack, Input, InputGroup, InputLeftElement, Text } from '@chakra-ui/react'
import { BiSearchAlt2 } from 'react-icons/bi';
import { ManualCard } from './manualCard';


const CatagoryButton = () => {
    return (
        <Box p={2} boxShadow={'0px 7px 29px rgba(187, 187, 187, 0.45)'} bg={'#FFFFFF'} borderRadius={'8px'}>
            Restraurants
        </Box>
    )
}
export const GuestView = () => {
    return (
        <Box p={'25px'} >
            <Box>
                <Input type='tel' placeholder='Phone number' />
            </Box>

            <Text>List notes</Text>

            <HStack>
                <CatagoryButton />
                <CatagoryButton />
                <CatagoryButton />

            </HStack>

            <Box>

                <ManualCard />
                <ManualCard />
                <ManualCard />
                <ManualCard />
            </Box>

        </Box>
    )
}

import React from 'react';
import { Box, Flex, Select, Text } from '@chakra-ui/react';

import { AiOutlinePlus } from 'react-icons/ai'

export const CardOption = ({ icon, label, providedCards, currentlySelected, handleOnClick, handleSetCurrentlySelected }) => {

    let circledStyleBox = {
        border: '1px solid #EEEEEE',
        p: 3,
        ml: 2
    }

    return (
        <Box ml={'40px'} mb={'16px'}>
            <Flex alignItems={'center'} fontSize={'16px'} mb={2} fontWeight={500}>


                {icon}
                <Text ml={2}>{label}</Text>
            </Flex>

            <Flex alignItems={'center'}>
                <Select onChange={(el) => handleSetCurrentlySelected(JSON.parse(el.target.value))} borderColor={'#ECECEC'} placeholder={currentlySelected.cardName || 'None'}>
                    {
                        providedCards.map((el) => (
                            <option value={JSON.stringify(el)} >{el.cardName}</option>
                        ))
                    }

                </Select>

                <Box cursor={'pointer'} borderRadius={'100px'} sx={circledStyleBox} onClick={handleOnClick}>
                    <AiOutlinePlus />
                </Box>
            </Flex>
        </Box>
    )
}

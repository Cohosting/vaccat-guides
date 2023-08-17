import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom';

export const ManualCard = ({ name, description, catagoryName, id }) => {
    const navigate = useNavigate()
    let manualCard = {
        fontSize: '18px',
        border: '2px solid #FCA085',
        borderRadius: '12px',
        mb: '10px',
        p: 5,
        bg: '#F2F7FF'

    };

    const getCatagoryForamtted = (arr) => {
        if (!arr) return '';


        let dom = [];
        arr.forEach((el, idx) => {
            if (idx + 1 === arr.length) {
                dom.push(el);

            } else {
                dom.push(el);
                dom.push('|');

            }

        });

        return dom.join(' ')

    }
    return (
        <Box sx={manualCard} cursor={'pointer'} onClick={() => navigate(`content/${id}`)}  >
            <Text fontWeight={700} mb={3} >{name}</Text>
            <Text my={4} fontSize={'16px'} >
                {description}
            </Text>
            <Flex justifyContent={'space-between'}>
                <Text fontWeight={'700'}>{getCatagoryForamtted(catagoryName)}</Text>
                <Text ml={3} fontWeight={500} >2020/05/09</Text>
            </Flex>
        </Box>
    )
}

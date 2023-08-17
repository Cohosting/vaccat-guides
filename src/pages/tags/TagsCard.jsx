import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export const TagsCard = ({ name, guideSelected, id }) => {
    const navigate = useNavigate();
    return (
        <Flex onClick={() => navigate(`/catagories/${name}`)} cursor={'pointer'} flexDir={'column'} alignItems={'center'} bg={'#6C7689'} borderRadius={'12px'} p={'20px'} color={'white'}>
            icon
            <Text my={1} fontSize={'17px'} fontWeight={'700'} >{name}</Text>
            <Text fontWeight={500}>{guideSelected.length} notes</Text>
        </Flex>
    )
}

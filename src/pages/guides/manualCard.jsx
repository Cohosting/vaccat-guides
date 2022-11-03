import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'

export const ManualCard = () => {

    let manualCard = {
        fontSize: '18px',
        border: '2px solid #FCA085',
        borderRadius: '8px',
        mb: '10px',
        p: 5

    }
    return (
        <Box sx={manualCard}  >
            <Text fontWeight={700} mb={3} >How  to draw a proffetional  wireframe ?</Text>
            <Text mb={2} fontSize={'16px'} >
                For Wireframe Design, You Need To Have A Pen.  And paper Wth You, And using These Two, You Can Design The Idea You Want On Paper For Web Or Mobile, Just Learn....
            </Text>
            <Flex justifyContent={'space-between'}>
                <Text fontWeight={'700'}>Design - wireframe</Text>
                <Text ml={3} fontWeight={500} >2020/05/09</Text>
            </Flex>
        </Box>
    )
}

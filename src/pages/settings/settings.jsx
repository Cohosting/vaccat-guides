import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { MobileTab } from '../../components/mobileTab'

export const Settings = () => {
    return (
        <Flex flexDir={'column'} height={'100vh'} fontFamily={'GTMedium'} >

            <Box flex={1}>
                <Text fontSize={'40px'}>Hello settings page</Text>
            </Box>

            <MobileTab />
        </Flex>
    )
}

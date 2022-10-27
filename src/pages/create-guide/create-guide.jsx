import React from 'react';

import { contextObject, CreateGuideContextComponent, useGuideContext } from './context';
import { Steps } from './../../components/steps'
import { TypeOfService } from './TypeOfService';
import { ArrivalDepurture } from './ArrivalDepurture';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useContext } from 'react';

const stepObject = {
    0: <TypeOfService />,
    1: <ArrivalDepurture />
}


const GuideLayout = ({ children }) => {


    return (

        <Flex flexDir={'column'} height={'100vh'}>
            <Box flex={1}>

                <Text>Let’s create your first Guide</Text>
                <Steps />

                <Box>
                    {children}
                </Box>
            </Box>
            <Flex>
                <Box>
                    <Button variant={'ghost'} >back</Button>
                    <Button ml={2}>Next step</Button>
                </Box>
            </Flex>
        </Flex>
    )
}


export const CreateGuide = () => {
    const { step } = useContext(contextObject)
    return (
        <GuideLayout>
            {
                stepObject[step]
            }
        </GuideLayout>

    )
}
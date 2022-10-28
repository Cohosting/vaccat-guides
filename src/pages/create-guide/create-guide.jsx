import React from 'react';

import { contextObject, CreateGuideContextComponent, useGuideContext } from './context';
import { Steps } from './../../components/steps'
import { TypeOfService } from './TypeOfService';
import { ArrivalDepurture } from './ArrivalDepurture';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useContext } from 'react';

const stepObject = {
    1: <TypeOfService />,
    2: <ArrivalDepurture />
}


const GuideLayout = ({ children }) => {

    const { handleStepBackword, handleStepForward } = useContext(contextObject)

    return (

        <Flex flexDir={'column'} height={'100vh'} px={'18px'} pt={'30px'}>
            <Box flex={1}>

                <Text mb={'10px'} fontSize={'32px'} fontWeight={700} >Let’s create your first Guide</Text>
                <Steps />

                <Box mt={'20px'}>
                    {children}
                </Box>
            </Box>
            <Flex justifyContent={'flex-end'} pb={'20px'}>
                <Box>
                    <Button variant={'ghost'} onClick={handleStepBackword} >back</Button>
                    <Button ml={2} bg={'#6C7689'} onClick={handleStepForward} color={'white'}>Next step</Button>
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



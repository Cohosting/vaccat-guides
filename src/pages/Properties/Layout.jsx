import { Box, Button, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { useContext } from 'react'
import { propertyContext } from '../../context/property'

export const Layout = ({ children, onSubmit }) => {
    const { stepIncrease, stepDecrease, step, shouldShowLayout } = useContext(propertyContext);


    let textStyle = {
        fontFamily: 'GTMedium',
        fontSize: '20px',
        lineHeight: '25px',
        w: '290px'
    }

    let buttonStyle = {
        bg: 'black',
        color: 'white',
        w: '75px',
        color: 'white',
        fontSize: '14px'
    }
    return (
        <Flex flexDir={'column'} height={'100vh'} pt="15px" >

            <Text sx={textStyle}>Tell us more about  your  property</Text>

            <Box flex={1}>
                {children}
            </Box>
            {
                shouldShowLayout && (
                    <Box pos={'relative'} py={'15px'} >
                        <Box top={'-4px'} pos={'absolute'} height="2px" width={step === 1 ? '0%' : (step / 6) * 100 + '%'} bg="black" />
                        <Flex alignItems={'center'} justifyContent={'space-between'} >
                            {
                                step !== 1 && (

                                    <Button textDecoration={'underline'} fontSize={'14px'} variant={'unstyled'} onClick={stepDecrease}>Back</Button>
                                )
                            }
                            {
                                step === 6 ? (
                                    <Button sx={{ ...buttonStyle, w: ' 100px' }} onClick={onSubmit}  >Published</Button>
                                ) : (
                                    <Button sx={buttonStyle} ml={'auto'} onClick={stepIncrease}>Next</Button>

                                )
                            }
                        </Flex>
                    </Box>
                )
            }
        </Flex>
    )
}

import { Box, Button, Flex, HStack, ModalBody, ModalFooter, ModalHeader, Text, Textarea } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { Input } from '../../../components/Input'
import { TimeCard } from '../../../components/TimeCard'
import { contextObject } from '../context'
import { v4 as uuidv4 } from 'uuid';
import { handleChange } from '../../../utils/input'

export const Wifi = ({ onClose }) => {
    const [wifiState, setWifiState] = useState({
        cardName: '',
        networkName: '',
        password: '',
        additionalInformation: ''
    });

    const { cardName, networkName, password, additionalInformation } = wifiState

    let textAreaLabel = {
        fontSize: '18px',
        fontWeight: 500,
        mb: '10px'
    }

    const { setCards, cards, setCurrentlySelected, currentlySelected } = useContext(contextObject)




    const handleCreate = () => {
        let obj = {
            id: uuidv4(),
            ...wifiState
        }

        setCards({
            ...cards,
            wifi: [...cards.wifi, obj]
        });
        setCurrentlySelected({
            ...currentlySelected,
            'wifi': obj
        })

        onClose()

    }


    return (
        <>
            <Box>
                <ModalHeader>Create a Wifi card</ModalHeader>
                <ModalBody>
                    <Input
                        label={'Card Name'}
                        value={cardName}
                        name="cardName"
                        onChange={(e) => handleChange(e, setWifiState, wifiState)}
                    />
                    <Box mt={4}>
                        <Text sx={textAreaLabel} >What wifi network name and password should guests use ?</Text>
                        <HStack>
                            <Box flex={1}>
                                <Input
                                    label={'Network name'}
                                    name="networkName"
                                    value={networkName}
                                    onChange={(e) => handleChange(e, setWifiState, wifiState)}

                                />
                            </Box>
                            <Box flex={1} >
                                <Input
                                    name="password"
                                    value={password}
                                    onChange={(e) => handleChange(e, setWifiState, wifiState)}
                                    label={'Password'}
                                /></Box>
                        </HStack>

                    </Box>


                    <Box mt={3}>
                        <Text sx={textAreaLabel}>Is there anything else you need to tell guests about using the wifi?</Text>

                        <Textarea value={additionalInformation} name="additionalInformation" onChange={(e) => handleChange(e, setWifiState, wifiState)}
                        />
                    </Box>
                </ModalBody>
            </Box>

            <ModalFooter>
                <Button variant='ghost' onClick={onClose}>Close</Button>
                <Button onClick={handleCreate} colorScheme='blue' mr={3}   >
                    Create
                </Button>
            </ModalFooter>
        </>
    )
}

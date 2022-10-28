import { Box, Button, ModalBody, ModalFooter, ModalHeader, Text, Textarea } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Input } from '../../../components/Input'
import { TimeCard } from '../../../components/TimeCard'
import { v4 as uuidv4 } from 'uuid';
import { useContext } from 'react';
import { contextObject } from '../context';

export const CheckIn = ({ onClose }) => {

    const { setCards, cards, setCurrentlySelected, currentlySelected } = useContext(contextObject)
    const [checkIn, setCheckIn] = useState({
        cardName: '',
        checkInAt: '9:00AM',
        additionalInformation: ''
    });
    const { cardName, checkInAt, additionalInformation } = checkIn

    let textAreaLabel = {
        fontSize: '18px',
        fontWeight: 500,
        mb: '10px'
    }

    const handleCreate = () => {
        let obj = {
            id: uuidv4(),
            ...checkIn
        }

        setCards({
            ...cards,
            checkIn: [...cards.checkIn, obj]
        });
        setCurrentlySelected({
            ...currentlySelected,
            'checkIn': obj
        })

        onClose()

    }
    return (
        <>
            <Box>
                <ModalHeader>Create a check-in card</ModalHeader>
                <ModalBody>
                    <Input
                        value={cardName}
                        label={'Card Name'}
                        onChange={(e) => setCheckIn({
                            ...checkIn,
                            'cardName': e.target.value
                        })}
                    />
                    <Box>
                        <TimeCard
                            label={'Check-in at'}
                            value={checkInAt}
                        />
                    </Box>


                    <Box mt={3}>
                        <Text sx={textAreaLabel}>What information does your guest need to know in order to gain access to the property?</Text>

                        <Textarea value={additionalInformation} onChange={(e) => setCheckIn({
                            ...checkIn,
                            'additionalInformation': e.target.value
                        })} />
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

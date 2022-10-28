import { Box, Button, Checkbox, Flex, HStack, ModalBody, ModalFooter, ModalHeader, Text, Textarea } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { Input } from '../../../components/Input'
import { handleChange } from '../../../utils/input'
import { contextObject } from '../context'
import { v4 as uuidv4 } from 'uuid';

export const Parking = ({ onClose }) => {
    const { setCards, cards, setCurrentlySelected, currentlySelected } = useContext(contextObject)

    const [parking, setParking] = useState({
        cardName: '',
        checked: [],
        additionalInformation: ''
    })
    const { cardName, checked, additionalInformation } = parking;

    const handleCreate = () => {
        let obj = {
            id: uuidv4(),
            ...parking
        }

        setCards({
            ...cards,
            parking: [...cards.parking, obj]
        });
        setCurrentlySelected({
            ...currentlySelected,
            'parking': obj
        })

        onClose()

    };


    const handleCheck = (e, v) => {
        let checked = [...parking.checked];
        if (checked.includes(v)) {
            checked = checked.filter((el) => el !== v)
        } else {
            checked.push(v)

        }

        setParking({
            ...parking,
            checked: checked
        })
    }

    let textAreaLabel = {
        fontSize: '18px',
        fontWeight: 500,
        mb: '10px'
    }
    return (
        <>
            <Box>
                <ModalHeader>Create a parking card</ModalHeader>
                <ModalBody>
                    <Input
                        label={'Card Name'}
                        name="cardName"
                        value={cardName}
                        onChange={(e) => handleChange(e, setParking, parking)}
                    />
                    <Box mt={4}>
                        <Text sx={textAreaLabel}>Select the statements that best describe your advice to guests about parking at the property.</Text>
                        <Flex flexDir={'column'}>
                            <Checkbox onChange={(e) => handleCheck(e, ' Driveway parking available')} color={'black'} >
                                Driveway parking available
                            </Checkbox>
                            <Checkbox onChange={(e) => handleCheck(e, 'On-Street parking available')} color={'black'} my={1} >
                                On-Street parking available
                            </Checkbox>
                            <Checkbox onChange={(e) => handleCheck(e, 'Economical parking available')} color={'black'} mb={1} >
                                Economical parking available                            </Checkbox>
                            <Checkbox onChange={(e) => handleCheck(e, 'Parking is expensive nearby ')} color={'black'} >
                                Parking is expensive nearby                            </Checkbox>
                        </Flex>

                    </Box>


                    <Box mt={3}>
                        <Text sx={textAreaLabel}>What other information does your guest need to know if they are going to park a vehicle during their stay?</Text>

                        <Textarea name='additionalInformation' value={additionalInformation} onChange={(e) => handleChange(e, setParking, parking)}
                        />
                    </Box>
                </ModalBody>
            </Box>

            <ModalFooter>
                <Button variant='ghost' onClick={onClose}>Close</Button>
                <Button colorScheme='blue' mr={3} onClick={handleCreate}   >
                    Create
                </Button>
            </ModalFooter>
        </>
    )
}

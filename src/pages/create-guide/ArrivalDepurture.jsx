import { Box, Flex, Modal, ModalContent, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import { CardOption } from './cardOption';

import { FaPlaneArrival, FaPlaneDeparture } from 'react-icons/fa'
import { FiClock } from 'react-icons/fi';
import { BiWifi } from 'react-icons/bi';
import { AiFillCar } from 'react-icons/ai';

/* Cards */
import { CheckIn } from './Cards/check-in';
import { Wifi } from './Cards/wifi';
import { Parking } from './Cards/parking';
import { Departure } from './Cards/departure';
import { useContext } from 'react';
import { contextObject } from './context';


export const ArrivalDepurture = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [mode, setMode] = useState('');
    const { currentlySelected, cards, setCurrentlySelected } = useContext(contextObject);
    const { checkIn, parking, wifi, departure } = cards


    let modeMap = {
        'check-in': <CheckIn onClose={onClose} />,
        'wifi': <Wifi onClose={onClose} />,
        'parking': <Parking onClose={onClose} />,
        'departure': <Departure onClose={onClose} />,
    }

    const handleSetCurrentlySelected = (name, value) => {
        setCurrentlySelected({
            ...currentlySelected,
            [name]: value
        })
    }


    return (
        <Box>
            {/* Arrival */}
            <Box>
                <Flex alignItems={'center'} mb={3} >
                    <FaPlaneArrival fontSize={'30px'} />
                    <Text fontSize={'20px'} fontWeight={500} ml={3}>Arrival</Text>
                </Flex>

                <Box >
                    <CardOption
                        providedCards={checkIn}
                        icon={<FiClock fontSize={'20px'} />}
                        label="Check-in card"
                        handleOnClick={() => {
                            onOpen()
                            setMode('check-in')
                        }}
                        currentlySelected={currentlySelected.checkIn}
                        handleSetCurrentlySelected={(val) => handleSetCurrentlySelected('checkIn', val)}


                    />
                    <CardOption
                        providedCards={wifi}

                        icon={<BiWifi fontSize={'20px'} />}
                        label="Wifi card"
                        handleOnClick={() => {
                            setMode('wifi');
                            onOpen()
                        }}
                        currentlySelected={currentlySelected.wifi}
                        handleSetCurrentlySelected={(val) => handleSetCurrentlySelected('wifi', val)}


                    />
                    <CardOption
                        providedCards={parking}
                        icon={<AiFillCar fontSize={'20px'} />}
                        label="Parking card"
                        handleOnClick={() => {
                            onOpen()
                            setMode('parking')
                        }}
                        currentlySelected={currentlySelected.parking}
                        handleSetCurrentlySelected={(val) => handleSetCurrentlySelected('parking', val)}



                    />


                </Box>

            </Box>

            {/* Departure */}
            <Box>
                <Flex alignItems={'center'} mb={3} >
                    <FaPlaneDeparture fontSize={'30px'} />
                    <Text fontSize={'20px'} fontWeight={500} ml={3}>Departure</Text>
                </Flex>

                <Box >
                    <CardOption
                        providedCards={departure}
                        icon={<FiClock fontSize={'20px'} />}
                        label="Departure card"
                        handleOnClick={() => {
                            setMode('departure')
                            onOpen()
                        }}
                        currentlySelected={currentlySelected.departure}
                        handleSetCurrentlySelected={(val) => handleSetCurrentlySelected('departure', val)}


                    />



                </Box>



            </Box>
            <Modal isOpen={isOpen} size={'4xl'} onClose={onClose}  >
                <ModalOverlay />
                <ModalContent>
                    {
                        modeMap[mode]
                    }
                </ModalContent>
            </Modal>
        </Box>
    )
}

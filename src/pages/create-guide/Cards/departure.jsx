import { Box, Button, Checkbox, Flex, ModalBody, ModalFooter, ModalHeader, Text, Textarea } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { Input } from '../../../components/Input'
import { TimeCard } from '../../../components/TimeCard'
import { handleChange } from '../../../utils/input'
import { contextObject } from '../context'
import { v4 as uuidv4 } from 'uuid';

export const Departure = ({ onClose }) => {
  const { setCards, cards, setCurrentlySelected, currentlySelected } = useContext(contextObject)

  const [departureState, setDepartureState] = useState({
    cardName: '',
    checkOutAt: '10:00PM',
    checked: [],
    additionalInformation: ''
  });

  const { cardName, checkOutAt, checked, additionalInformation } = departureState;
  let textAreaLabel = {
    fontSize: '18px',
    fontWeight: 500,
    mb: '10px'
  }

  const handleCheck = (e, v) => {
    let checked = [...departureState.checked];
    if (checked.includes(v)) {
      checked = checked.filter((el) => el !== v)
    } else {
      checked.push(v)

    }

    setDepartureState({
      ...departureState,
      checked: checked
    })
  }

  const handleCreate = () => {
    let obj = {
      id: uuidv4(),
      ...departureState
    }

    setCards({
      ...cards,
      departure: [...cards.departure, obj]
    });
    setCurrentlySelected({
      ...currentlySelected,
      'departure': obj
    })

    onClose()

  };

  return (
    <>
      <Box>
        <ModalHeader>Create a departure card</ModalHeader>
        <ModalBody>
          <Input
            label={'Card Name'}
            name="cardName"
            value={cardName}
            onChange={(e) => handleChange(e, setDepartureState, departureState)}
          />
          <Box>
            <Box>
              <TimeCard
                label={'Check-out at'}
                value={checkOutAt}

              />
            </Box>
          </Box>
          <Box mt={4}>
            <Text sx={textAreaLabel}>Select the statements that best describe your late check-out policy</Text>
            <Flex flexDir={'column'}>
              <Checkbox color={'black'} onChange={(e) => handleCheck(e, `Unfortunately we can't accommodate late check-outs.`)} >
                Unfortunately we can't accommodate late check-outs.
              </Checkbox>
              <Checkbox color={'black'} my={1} onChange={(e) => handleCheck(e, `Sometimes we can accommodate late check-outs if you contact us.`)} >
                Sometimes we can accommodate late check-outs if you contact us.
              </Checkbox>
              <Checkbox color={'black'} mb={1} onChange={(e) => handleCheck(e, `Contact us if you'd like to arrange a later check-out.`)}>
                Contact us if you'd like to arrange a later check-out.
              </Checkbox>
              <Checkbox color={'black'} onChange={(e) => handleCheck(e, `Additional check-out information`)} >
                Additional check-out information
              </Checkbox>
            </Flex>

          </Box>


          <Box mt={3}>
            <Text sx={textAreaLabel}>What other information does your guest need to know if they are going to park a vehicle during their stay?</Text>

            <Textarea value={additionalInformation} name={'additionalInformation'} onChange={(e) => handleChange(e, setDepartureState, departureState)} />
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

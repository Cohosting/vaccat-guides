import { Box, Button, Checkbox, Flex, Text } from '@chakra-ui/react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import React, { useEffect } from 'react'
import { useContext } from 'react'
import { contextObject } from '../../context/auth'
import { propertyContext } from '../../context/property'
import { db } from '../../firebase'

export const CatagoryGuides = ({ handleBack, selectedCatagory }) => {
    const { setMode, setShouldShowLayout, specificCatagoriesGuides, setSpecificCatagoriesGuides, selectedGuides, setSelectedGuides } = useContext(propertyContext);
    const { currentUser } = useContext(contextObject)


    useEffect(() => {
        if (!currentUser && specificCatagoriesGuides !== null) return;


        (async () => {

            const collRef = collection(db, 'guides');
            const q = query(collRef, where('catagoryName', 'array-contains', selectedCatagory), where('createdBy', '==', currentUser.uid));
            const snapshot = await getDocs(q);

            let data = [];
            snapshot.docs.forEach((el) => {
                data.push(el.data())
            });
            setSpecificCatagoriesGuides(data)
        })()

    }, [currentUser]);

    const handleCheck = (e, el) => {
        let newObj = { ...selectedGuides }
        if (e.target.checked) {
            if (newObj[selectedCatagory]) {
                newObj[selectedCatagory] = [...newObj[selectedCatagory], el.id]
            } else {
                newObj[selectedCatagory] = [el.id]
            }
        } else {

            newObj[selectedCatagory] = newObj[selectedCatagory].filter((a) => a !== el.id)
        };


        setSelectedGuides(newObj)
    }


    return (
        <Box>
            <Flex alignItems={'center'} justifyContent={'space-between'}  >
                <Text fontSize={'18px'}>{selectedCatagory}</Text>
                <Flex>
                    <Flex onClick={handleBack} textDecor={'underline'} cursor={'pointer'} alignItems={'center'}>

                        <Text ml={1}>go back</Text>
                    </Flex>
                    <Button onClick={() => {
                        setMode('');
                        setShouldShowLayout(true)
                    }} ml={2} bg={'black'} color={'white'} size={'sm'} >Done</Button>
                </Flex>
            </Flex>

            <Box mt={3}>


                {
                    specificCatagoriesGuides && specificCatagoriesGuides.map((el) => (
                        <Flex py={3} borderTop={'1px solid #DDDDDD'} borderBottom={'1px solid #DDDDDD'} >
                            <Checkbox isChecked={selectedGuides[selectedCatagory] && selectedGuides[selectedCatagory].includes(el.id)} onChange={(e) => handleCheck(e, el)} colorScheme='red' />
                            <Box marginLeft={'20px'}>
                                <Text color={'#6C7689'}>{el.name}</Text>
                                <Text fontSize={'15px'} color={'#A8A8A8'} >{el.description}</Text>
                            </Box>
                        </Flex>
                    ))
                }

            </Box>
        </Box>
    )
}

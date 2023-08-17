import { Box, Checkbox, Flex, SimpleGrid, Text } from '@chakra-ui/react'
import e from 'cors';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { contextObject } from '../../context/auth';
import { propertyContext } from '../../context/property';
import { db } from '../../firebase';
import { CatagoryGuides } from './catagoryGuides';





const ImportCard = ({ handleClick, name, guideSelected = [], }) => {
    const { setSelectedGuides, selectedGuides } = useContext(propertyContext);

    let containerStyle = {
        border: '1px solid #D8D8D8',
        borderRadius: '6px',
        p: 4,
        flexDir: 'column'
    };

    console.log(selectedGuides[name] && selectedGuides[name].length, guideSelected.length)
    return (
        <Flex cursor={'pointer'} sx={containerStyle} >
            <Checkbox isChecked={selectedGuides[name] && selectedGuides[name].length !== 0 && selectedGuides[name].length === guideSelected.length} onChange={(eev) => {
                eev.preventDefault()
                let newObj = { ...selectedGuides }
                if (eev.target.checked) {
                    console.log(guideSelected)
                    if (newObj[name]) {
                        newObj[name] = [...new Set(newObj[name].concat(guideSelected))]
                    } else {
                        newObj[name] = [...guideSelected]
                    }
                } else {
                    newObj[name] = []

                }

                setSelectedGuides(newObj)

            }} />
            <Flex onClick={(e) => {
                e.stopPropagation()
                handleClick(name);

            }} alignItems={'center'} flexDir={'column'}>
                <Text>{name}</Text>
                <Text>{guideSelected ? guideSelected.length : ''} notes</Text>
            </Flex>
        </Flex>
    )
}

export const GuideImport = () => {
    const { setMode, setShouldShowLayout, catagories, setCatagories, selectedGuides, setSelectedGuides } = useContext(propertyContext);
    const [selectedCatagory, setSelectedCatagory] = useState('');
    const { currentUser } = useContext(contextObject)

    const handleSetCatagory = (val) => {
        setSelectedCatagory(val)
    };


    useEffect(() => {
        if (!currentUser && catagories !== null) return;


        (async () => {

            const collRef = collection(db, 'catagories');
            const q = query(collRef, where('createdBy', '==', currentUser.uid));
            const snapshot = await getDocs(q);

            let data = [];
            snapshot.docs.forEach((el) => {
                data.push(el.data())
            });
            setCatagories(data)
        })()

    }, [currentUser])

    return (
        <Box>
            {
                selectedCatagory !== '' ? (
                    <Box>
                        <CatagoryGuides selectedCatagory={selectedCatagory} handleBack={() => setSelectedCatagory('')} />
                    </Box>
                ) : (
                    <Box>

                        <Flex onClick={() => {

                            setMode('');
                            setShouldShowLayout(true)
                        }} cursor={'pointer'} alignItems={'center'}>
                            <AiOutlineArrowLeft />
                            <Text ml={2} >Go back</Text>
                        </Flex>

                        <SimpleGrid mt={5} columns={2} spacing={4}>


                            {
                                catagories && catagories.map((el) => (

                                    <ImportCard  {...el} handleClick={handleSetCatagory} />
                                ))
                            }

                        </SimpleGrid>
                    </Box>
                )
            }

        </Box>
    )
}

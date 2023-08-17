import { Box, Button, Flex, Input, Text, useDisclosure, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { arrayRemove, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { AiOutlineKey } from 'react-icons/ai';
import { useParams } from 'react-router-dom'
import { CreateCatagoryModal } from '../../components/createCatagoryModal';
import { SearchSelect } from '../../components/searchSelect';
import { contextObject } from '../../context/auth';
import { db } from '../../firebase';
import useCopyToClipboard from './../../hooks/useCopyToClipboard.ts';

export const PropertyInfo = () => {
    const { isOpen, onClose, onOpen } = useDisclosure()
    const toast = useToast();
    const { currentUser } = useContext(contextObject)
    const { propertyId } = useParams();
    const [shouldAccess, setShouldAccess] = useState(false);
    const [selectedGuides, setSelectedGuides] = useState([]);
    const [diselectedGuides, setDiselectedGuides] = useState([])
    const [guides, setGuides] = useState([]);
    const [property, setProperty] = useState({});
    const [isLoaded, setIsLoaded] = useState(false)
    const [propertyPasswordState, setPropertyPasswordState] = useState({
        password: '',
        isError: false,

    });
    const [value, copy] = useCopyToClipboard()


    useEffect(() => {

        (async () => {
            const ref = collection(db, 'properties')
            const aq = query(ref, where("propertyCustomLink", "==", propertyId));

            const snapshot = await getDocs(aq);
            let properties = [];
            snapshot.forEach((el) => {
                properties.push(el.data())
            })
            setProperty(properties[0]);

            setSelectedGuides([...guides, ...(properties[0].selectedGuides) || []])

        })()

    }, []);

    const handleVerifiyPassword = () => {
        if (property.password === propertyPasswordState.password) {
            // access
            setShouldAccess(true)
        } else if (property.password !== propertyPasswordState.password) {
            setPropertyPasswordState({
                ...propertyPasswordState,
                isError: true
            })
        }

    }
    const handlePropertySelect = (isChecked, el) => {
        let neweArr = [...selectedGuides]
        if (isChecked) {
            neweArr.push(el.id);
            let disArr = diselectedGuides.filter((guides) => !guides.id.includes(el.id));
            setDiselectedGuides(disArr)

        } else {
            console.log({ neweArr })
            neweArr = neweArr.filter((el1) => !el1.includes(el.id));
            setDiselectedGuides([...diselectedGuides, el])

        }

        setSelectedGuides(neweArr)


    }
    const handleResetProperty = () => {
        setSelectedGuides([])
    };
    const handleSelectAllProperty = () => {
        let selectedGuideId = [];

        guides.forEach((el) => {
            selectedGuideId.push(el.id)

        })

        setSelectedGuides(selectedGuideId)
    };

    useEffect(() => {
        if (!currentUser || !Object.keys(property).length) return;
        (async () => {
            const q = query(collection(db, "guides"), where("createdBy", "==", currentUser.uid), /* where('selectedProperties', 'array-contains', property.id) */);

            const propertySnapshot = await getDocs(q);
            let guide = [];

            propertySnapshot.forEach((el) => {
                guide.push(el.data())
            })

            setGuides(guide);

            setIsLoaded(true)

        })();
    }, [currentUser, property]);

    const getCatagory = () => {


        const g = guides.filter((guide) => selectedGuides.some((id) => guide.id === id));



        let catagory = [];
        g.forEach((el => {
            catagory.push(...el.selectedCatagories)
        }));

        return [...new Set(catagory)]
    }
    const updateCatagory = (catagory) => {
        const ref = doc(db, 'catagories', catagory.id);
        return updateDoc(ref, {
            propertiesSelected: arrayRemove(property.id)
        })
    }
    const handleSyncGuides = async () => {
        const propertyRef = doc(db, 'properties', property.id);
        let catagory = [];

        diselectedGuides.forEach((el) => {
            catagory.push(...el.selectedCatagories)

        });

        const promise = catagory.map((el) => updateCatagory(el));
        await Promise.all(promise)

        await updateDoc(propertyRef, {
            selectedGuides: selectedGuides
        });

        await axios.post(`${process.env.REACT_APP_CLOUD_FUNCTION_API_URL}/update-guides`, {
            selectedGuides: selectedGuides,
            propertyId: property.id,
            catagories: getCatagory()

        })

    };

    const onLinkCopy = async () => {
        const response = copy(`${window.location.origin}/guides?propertyId=${property.id}&share=true`);
        let status = null;
        if (!response) {
            status = 'error'

        } else {
            status = 'success'

        }
        toast({
            title: `${status}`,
            status: status,
            isClosable: true,
        })

    };


    return (
        <Box px={'30px'}>
            {
                property.password !== '' && !shouldAccess ? (
                    <Flex fontFamily={'GTMedium'} mt={4} flexDir={'column'} alignItems={'center'} >
                        <Flex bg={'black'} borderRadius={'100%'} alignItems={'center'} justifyContent={'center'} p={4} >
                            <AiOutlineKey color='white' />
                        </Flex>
                        <Text py={3}>Input your property password</Text>
                        <Input onChange={(e) => {
                            if (propertyPasswordState.isError) {
                                setPropertyPasswordState({
                                    password: e.target.value,
                                    isError: false
                                })
                                return
                            }

                            setPropertyPasswordState({
                                ...propertyPasswordState,
                                password: e.target.value
                            })
                        }} />
                        {
                            propertyPasswordState.isError && (
                                <Text color={'#FF7377'} mt={3} >
                                    Password incorrect!
                                </Text>
                            )
                        }
                        <Button onClick={handleVerifiyPassword} mt={3} bg={'black'} color={'white'} >View</Button>
                    </Flex>
                ) : (
                    <Box>
                        {JSON.stringify(property)}

                        <Box >
                            <Text my={3} fontWeight={700} fontSize={'17px'} >Select Guides for this property</Text>
                            <SearchSelect label={'Select Guides'} onSelectAll={handleSelectAllProperty} isLoaded={isLoaded} selectedItems={selectedGuides} onClearAll={handleResetProperty} onSelect={handlePropertySelect} items={guides} >
                                <Flex justifyContent={'flex-end'} >
                                    <Button onClick={handleSyncGuides} size={'md'} bg={'#ff6f6f'} color={'white'}>Save changes</Button>
                                </Flex>
                            </SearchSelect>
                        </Box>

                        <Button mt={2} bg={'black'} color={'white'} size={'md'} onClick={onLinkCopy} >Share guide link</Button>

                    </Box>

                )
            }


        </Box>
    )
}

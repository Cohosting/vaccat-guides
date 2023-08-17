import { Box, Button, Flex, Spinner, Text, useDisclosure } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { BiFilterAlt } from 'react-icons/bi';
import { SearchSelect } from '../../components/searchSelect';
import { contextObject } from '../../context/auth';
import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { db } from '../../firebase';
import axios from 'axios';
import { CreateCatagoryModal } from '../../components/createCatagoryModal';


export const GuideSettings = () => {
    const { isOpen, onClose, onOpen } = useDisclosure()

    const [dependentState, setDependentState] = useState({
        catagories: [],
        properties: []
    });
    const [guide, setGuide] = useState({})
    const [isUpdating, setIsUpdating] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false);
    const [notSelectedButPreviouslySelected, setNotSelectedButPreviouslySelected] = useState([])

    const [selectedState, setSelectedState] = useState({
        selectedProperties: [],
        selectedCatagories: [],
    });

    const { selectedProperties, selectedCatagories } = selectedState
    const { catagories, properties } = dependentState

    const { currentUser } = useContext(contextObject)
    const { guideId } = useParams();
    const navigate = useNavigate()
    useEffect(() => {
        if (!currentUser) return;



        (async () => {
            const ref = doc(db, 'guides', guideId);
            const snap = await getDoc(ref);
            const data = snap.data()
            const q = query(collection(db, "properties"), where("createdBy", "==", currentUser.uid));
            const as = query(collection(db, "catagories"), where("createdBy", "==", currentUser.uid));

            const propertySnapshot = await getDocs(q);
            const catagorySnapshot = await getDocs(as);
            let property = [];
            let catagory = [];

            propertySnapshot.forEach((el) => {
                property.push(el.data())
            })
            catagorySnapshot.forEach((el) => {
                catagory.push(el.data())
            });
            console.log(property)
            setDependentState({
                properties: property,
                catagories: catagory

            });
            setSelectedState({
                selectedCatagories: data.selectedCatagories || [],
                selectedProperties: data.selectedProperties || [],
            })
            setGuide(data);

            setIsLoaded(true)

        })();

        return () => {

        }
    }, [currentUser]);
    const handlePropertySelect = (isChecked, el) => {
        let neweArr = [...selectedProperties]
        if (isChecked) {
            neweArr.push(el.id)
        } else {
            neweArr = neweArr.filter((el1) => !el1.includes(el.id))

        }

        setSelectedState({
            ...selectedState,
            selectedProperties: neweArr
        });


    }
    const handleCatagorySelect = (isChecked, el) => {
        let neweArr = [...selectedCatagories];
        let newNotSelectArr = [...notSelectedButPreviouslySelected]

        if (isChecked) {
            neweArr.push(el);
            newNotSelectArr = newNotSelectArr.filter((el1) => !el1.id.includes(el.id));
            setNotSelectedButPreviouslySelected(newNotSelectArr)
        } else {
            neweArr = neweArr.filter((el1) => !el1.id.includes(el.id));
            el.guideSelected = el.guideSelected.filter((gui) => gui !== guideId);
            setNotSelectedButPreviouslySelected([...new Set([...notSelectedButPreviouslySelected, el])])
        }

        setSelectedState({
            ...selectedState,
            selectedCatagories: neweArr
        });
    };


    const handleResetCatagory = () => {
        setSelectedState({
            ...selectedState,
            selectedCatagories: []
        })
    };

    const handleSelectAllCatagory = () => {
        let selectedCatagories = [];

        catagories.forEach((el) => {
            selectedCatagories.push(el)

        });

        console.log(selectedCatagories)

        setSelectedState({
            ...selectedState,
            selectedCatagories: selectedCatagories
        })
    };


    const handleUpdate = async () => {

        setIsUpdating(true);
        const ref = doc(db, 'guides', guideId);
        const newRef = collection(db, 'catagories');

        console.log({
            selectedCatagories, selectedProperties,
            catagoriesId: selectedCatagories.map((el) => el.id),
            catagoryName: selectedCatagories.map((el) => el.name)
        })
        await updateDoc(ref, {
            selectedCatagories,
            catagoriesId: selectedCatagories.map((el) => el.id),
            catagoryName: selectedCatagories.map((el) => el.name),
        });


        await axios.post(`${process.env.REACT_APP_CLOUD_FUNCTION_API_URL}/update-catagory`, {
            selectedCatagories: [...selectedCatagories, ...notSelectedButPreviouslySelected],
            guideId
        });


        setIsUpdating(false);

        /*         navigate('/guides')
         */
    };

    console.log({ notSelectedButPreviouslySelected })
    const onCatagoryCreate = (obj) => {
        setDependentState({
            ...dependentState,
            catagories: [...catagories, obj]
        });
    }

    return (
        <Box px={'30px'} mt={'30px'}>
            {
                isLoaded ? (
                    <>
                        <Flex borderBottom={'1px solid'} borderColor={'gray.300'} pb={4} alignItems={'center'} fontSize={'18px'}><FiSettings /> <Text fontWeight={500} ml={2} >Settngs</Text> </Flex>
                        <Flex mt={3}>
                            <Text fontWeight={700} mr={1}>Title:</Text>
                            <Text>{guide.name}</Text>
                        </Flex>
                        <Flex>
                            <Text fontWeight={700} mr={1}>Description:</Text>
                            <Text>{guide.description}</Text>
                        </Flex>

                        <Button pl={0} mt={2} variant={'ghost'}>
                            Add a Cover picture
                        </Button>

                        <Flex fontSize={'19px'} alignItems={'center'}>
                            <BiFilterAlt />
                            <Text ml={2} >Scope</Text>
                        </Flex>
                        <Box >
                            <Text my={3} fontWeight={700} fontSize={'17px'} >Select Catagory</Text>
                            <SearchSelect label={'Select catagory'} onSelectAll={handleSelectAllCatagory} isLoaded={isLoaded} selectedItems={selectedCatagories} onClearAll={handleResetCatagory} onSelect={handleCatagorySelect} items={catagories}>

                                <Button onClick={onOpen} size={'md'} bg={'black'} color={'white'}>add catagory</Button>

                            </SearchSelect>
                        </Box>
                        {/*                         <Box >
                            <Text my={3} fontWeight={700} fontSize={'17px'} >Select Properties</Text>
                            <SearchSelect onSelectAll={handleSelectAllProperty} isLoaded={isLoaded} selectedItems={selectedProperties} onClearAll={handleResetProperty} onSelect={handlePropertySelect} items={properties} />
                        </Box> */}
                        <CreateCatagoryModal cb={onCatagoryCreate} isOpen={isOpen} onOpen={onOpen} onClose={onClose} />


                        <Flex mt={2} justifyContent={'flex-end'} alignItems={'center'}>
                            <Button variant={'ghost'} onClick={() => navigate('/guides')}  >Go back to all guides</Button>
                            <Button onClick={handleUpdate} isLoading={isUpdating} ml={2} >Save</Button>
                        </Flex>
                    </>

                ) : (

                    <Flex justifyContent={'center'}>
                        <Spinner />
                    </Flex>
                )
            }


        </Box>
    )
}

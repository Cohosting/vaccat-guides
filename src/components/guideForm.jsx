import { Box, Button, Flex, Menu, MenuButton, MenuItem, MenuList, Text, useDisclosure } from '@chakra-ui/react'
import { arrayUnion, collection, doc, onSnapshot, query, setDoc, updateDoc, where } from 'firebase/firestore';
import React, { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { contextObject } from '../context/auth';
import { db } from '../firebase';
import Editor from '../pages/guides/guidesEditor';
import { labelStyle, PropertyInput, subTextStyle } from './../pages/Properties/PropertyDetails'
import { CreateCatagoryModal } from './createCatagoryModal';
import { SearchSelect } from './searchSelect';

const getUpdateFunc = (catagory, guideId) => {
    const ref = doc(db, 'catagories', catagory.id);
    return updateDoc(ref, {
        guideSelected: arrayUnion(guideId),
    })
}


export const GuideForm = ({ cb, shouldShowLabel = false, onCancel }) => {
    const { currentUser } = useContext(contextObject);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [guideState, setGuideState] = useState({
        name: '',
        description: '',
        catagories: [],
        content: '',
        selectedCatagories: []
    });
    const [selectedCatagories, setSelectedCatagories] = useState([])
    const [editorState, setEditorState] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

    const { name, description, catagories, } = guideState;
    let textStyle = {
        fontFamily: 'GTMedium',
        fontSize: '20px',
        lineHeight: '25px',
        w: '290px'
    };
    const handleCatagorySelect = (isChecked, el) => {
        let neweArr = [...selectedCatagories]

        console.log({ isChecked, el })
        if (isChecked) {
            neweArr.push(el)
        } else {
            neweArr = neweArr.filter((el1) => !el1.id.includes(el.id))
        }

        setSelectedCatagories(
            neweArr
        );
    };
    const handleSelectAllCatagory = () => {
        let selectedCatagories = [];

        catagories.forEach((el) => {
            selectedCatagories.push(el)

        })

        setSelectedCatagories(selectedCatagories
        )
    };
    const handleResetCatagory = () => {
        setSelectedCatagories([]
        )
    };

    useEffect(() => {

        if (!currentUser) return;

        setIsLoaded(false)
        const q = query(collection(db, "catagories"), where("createdBy", "==", currentUser.uid));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const catagories = [];
            querySnapshot.forEach((doc) => {
                catagories.push(doc.data());
            });

            setGuideState({
                ...guideState,
                catagories
            });
            setIsLoaded(true)

        });

        return () => {
            unsubscribe()
        }

    }, [currentUser]);

    const handleCreateGuides = async () => {

        let newObj = { ...guideState };
        delete newObj.catagories
        setIsLoading(true)
        let ref = doc(collection(db, 'guides'));

        let guideObject = {
            ...newObj,
            id: ref.id,
            createdBy: currentUser.uid,
            content: editorState,
            catagoryName: selectedCatagories.map((el) => el.name),
            selectedCatagories: selectedCatagories,
        }
        await setDoc(ref, guideObject);
        const catagoriesRef = selectedCatagories.map((el) => getUpdateFunc(el, ref.id,));

        await Promise.all(catagoriesRef)

        setIsLoading(false);

        cb && cb(ref.id, guideObject)

    }

    return (
        <Box fontFamily={'GTMedium'}>
            {
                shouldShowLabel && (
                    <>
                        <Text sx={textStyle}>Create guides</Text>
                        <Text sx={subTextStyle} >sub text</Text>
                    </>

                )
            }
            <PropertyInput
                label='Name'
                value={name}
                name={'name'}
                handleChange={(name, value) => setGuideState({
                    ...guideState,
                    [name]: value
                })}
            />
            <Box my={4}>

                <PropertyInput
                    label='Description'
                    value={description}
                    name={'description'}
                    handleChange={(name, value) => setGuideState({
                        ...guideState,
                        [name]: value
                    })}
                />
            </Box>
            <Box>
                <Text sx={labelStyle} mb={3} >Catagory</Text>

                <SearchSelect label="Select Catagories" onSelectAll={handleSelectAllCatagory} isLoaded={isLoaded} selectedItems={selectedCatagories} onClearAll={handleResetCatagory} onSelect={handleCatagorySelect} items={catagories} >

                    <Flex onClick={onOpen} alignItems={'center'} mt={3} cursor={'pointer'} >
                        <AiOutlinePlus />
                        <Text ml={2} >Add</Text>
                    </Flex>
                </SearchSelect>

                <CreateCatagoryModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />

            </Box>

            <Box mt={4}>
                <Text mb={1} sx={labelStyle}>Content</Text>
                {/* Content Editor */}
                <Editor editorData={editorState} setEditorData={setEditorState} />
            </Box>
            <Flex pb={3} alignItems={'center'} justifyContent={'flex-end'}>
                <Text cursor={'pointer'} onClick={onCancel}   >cancel</Text>
                <Button ml={4} size={'sm'} color={'white'} bg={'black'} isLoading={isLoading} onClick={handleCreateGuides} >create</Button>
            </Flex>
        </Box>
    )
}

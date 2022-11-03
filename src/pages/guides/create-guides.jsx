import { Box, Button, Text } from '@chakra-ui/react'
import { collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components/Input';
import { SearchSelect } from '../../components/searchSelect';
import { contextObject } from '../../context/auth';
import { db } from '../../firebase';
import { handleChange } from '../../utils/input';
import Editor from './guidesEditor';

export const CreateGuides = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()
    const { currentUser } = useContext(contextObject)
    const [dependentState, setDependentState] = useState({
        catagories: [],
        properties: []
    });

    const { catagories, properties } = dependentState
    const [guideState, setGuideState] = useState({
        name: '',
        description: '',
        content: []
    });

    const { name, description, content } = guideState;

    useEffect(() => {
        if (!currentUser) return;

        (async () => {
            const q = query(collection(db, "properties"), where("createdBy", "==", currentUser.uid));
            const as = query(collection(db, "catagories"), where("createdBy", "==", currentUser.uid));

            const propertySnapshot = await getDocs(q);
            const catagorySnapshot = await getDocs(q);
            let property = [];
            let catagory = [];

            propertySnapshot.forEach((el) => {
                property.push(el.data())
            })
            catagorySnapshot.forEach((el) => {
                catagory.push(el.data())
            })
            setDependentState({
                properties: property,
                catagories: catagory

            })

        })();

        return () => {

        }
    }, [currentUser]);


    const handleCreateGuides = async () => {
        setIsLoading(true)
        let ref = doc(collection(db, 'guides'));

        await setDoc(ref, {
            ...guideState,
            id: ref.id,
            createdBy: currentUser.uid
        });
        setIsLoading(false);
        navigate(`/guides/settings/${ref.id}`)

    }

    return (
        <Box px={'25px'} pt={'15px'}>
            <Text>Create guides</Text>
            <Input
                name={'name'}
                value={name}
                label={'Name'}
                onChange={(e) => handleChange(e, setGuideState, guideState)}
            />
            <Input
                name={'description'}
                value={description}
                label={'Description'}
                onChange={(e) => handleChange(e, setGuideState, guideState)}
            />

            <Text color={'red'} fontSize={'22px'} >Building block  for adding content will be come later****</Text>
            <Editor />
            {/*  <Box >
                <Text my={3} fontWeight={700} fontSize={'17px'} >Select Tags</Text>
                <SearchSelect />
            </Box>

            <Box >
                <Text my={3} fontWeight={700} fontSize={'17px'} >Select Tags</Text>
                <SearchSelect />
            </Box> */}

            <Button mt={4} w={'100%'} isLoading={isLoading} onClick={handleCreateGuides}>Create  Guide</Button>

        </Box>
    )
}

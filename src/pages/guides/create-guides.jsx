import { Box, Button, Text } from '@chakra-ui/react'
import { collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { GuideForm } from '../../components/guideForm';
import { Input } from '../../components/Input';
import { SearchSelect } from '../../components/searchSelect';
import { contextObject } from '../../context/auth';
import { db } from '../../firebase';
import { handleChange } from '../../utils/input';
import Editor from './guidesEditor';

export const CreateGuides = () => {
    const [editorData, setEditorData] = React.useState({});

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
            createdBy: currentUser.uid,
            content: editorData,
            catagoryName: []
        });
        setIsLoading(false);
        navigate(`/guides/settings/${ref.id}`)

    }

    return (
        <Box px={'25px'} pt={'15px'}>
            <GuideForm shouldShowLabel={true} cb={(id) => navigate(`/guides/settings/${id}`)} />
        </Box>
    )
}

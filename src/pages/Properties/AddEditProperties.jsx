import { Box, Button } from '@chakra-ui/react'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components/Input'
import { contextObject } from '../../context/auth';
import { db } from '../../firebase';
import { handleChange } from '../../utils/input';

export const AddEditProperties = () => {
    const { currentUser } = useContext(contextObject)
    const [propertyState, setPropertyState] = useState({
        name: '',
        accessCode: '',
        checkIn: '',
        checkOut: '',
        location: '',
        coordinates: [],
        // optional
        images: []

    });

    const navigate = useNavigate()

    const { name, accessCode } = propertyState;
    const handleCreateProperty = async () => {

        let ref = doc(collection(db, 'properties'));
        await setDoc(ref, {
            ...propertyState,
            id: ref.id,
            createdBy: currentUser.uid
        });
        navigate('/properties')
    }


    return (
        <Box px={'20px'} >
            <Input
                label={'Name'}
                name={'name'}
                value={name}
                onChange={(e) => handleChange(e, setPropertyState, propertyState)}

            />
            <Input
                label={'Access code'}
                name={'accessCode'}
                value={accessCode}
                onChange={(e) => handleChange(e, setPropertyState, propertyState)}

            />
            <Button w={'100%'} onClick={handleCreateProperty} >Create</Button>
        </Box>
    )
}

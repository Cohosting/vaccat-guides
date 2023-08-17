import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import { collection, doc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { useContext } from 'react';
import { contextObject } from '../context/auth';
import { db } from '../firebase';
import { PropertyInput } from '../pages/Properties/PropertyDetails';

export const CreateCatagoryModal = ({ isOpen, onClose, cb }) => {
    const { currentUser } = useContext(contextObject)
    const [catagoryState, setCatagoryState] = useState({
        name: '',
        description: ''
    });
    const [isCreating, setIsCreating] = useState(false);
    const handleCreate = async () => {
        setIsCreating(true);
        const ref = doc(collection(db, 'catagories'));
        await setDoc(ref, {
            name, description,
            id: ref.id,
            createdBy: currentUser.uid,
            guideSelected: []
        })
        setCatagoryState({
            name: '',
            description: ''
        })

        setIsCreating(false);
        onClose();
        cb({
            name, description,
            id: ref.id,
            createdBy: currentUser.uid,
            guideSelected: []
        })
    };
    const { name, description } = catagoryState;
    return (
        <Modal size={'4xl'} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent fontFamily={'GTMedium'} >
                <ModalHeader>Create Catagories</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <PropertyInput
                        label='Name'
                        value={name}
                        name={'name'}
                        handleChange={(name, value) => setCatagoryState({
                            ...catagoryState,
                            [name]: value
                        })}
                    />
                    <Box mt={4}>
                        <PropertyInput
                            label='Description'
                            value={description}
                            name={'description'}
                            handleChange={(name, value) => setCatagoryState({
                                ...catagoryState,
                                [name]: value
                            })}
                        />
                    </Box>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onClose} variant='ghost'>cancel</Button>
                    <Button isLoading={isCreating} size={'md'} bg={'black'} color={'white'} mr={3} onClick={handleCreate}>
                        create
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

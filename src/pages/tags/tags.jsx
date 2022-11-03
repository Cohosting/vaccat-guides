import {
    Box, Flex, Grid, GridItem, Text, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Input,
    Textarea,
} from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { AuthContextComponent, contextObject } from '../../context/auth'
import { handleChange } from '../../utils/input'
import { TagsCard } from './TagsCard'

import EmojiPicker from 'emoji-picker-react';
import { addDoc, collection, doc, onSnapshot, query, setDoc, where } from 'firebase/firestore'
import { db } from '../../firebase'

let arr = [1, 2, 3]
export const Tags = () => {
    const { currentUser } = useContext(contextObject);
    const [catagories, setCatagories] = useState([])
    const [catagoryState, setCatagoryState] = useState({
        name: '',
        description: ''
    });

    const { name, description } = catagoryState;
    const { isOpen, onOpen, onClose } = useDisclosure()
    let headerStyle = {
        borderBottom: '1px solid #D5D5D5;'
    };

    const handleCreateCatagory = async () => {
        const ref = doc(collection(db, 'catagories'));
        await setDoc(ref, {
            name, description,
            id: ref.id,
            createdBy: currentUser.uid
        })
        { }
        setCatagoryState({
            name: '',
            description: ''
        })

        onClose();
    }

    useEffect(() => {

        if (!currentUser) return;

        const q = query(collection(db, "guides"), where("createdBy", "==", currentUser.uid));
        onSnapshot(q, (doc) => {
            let snapshot = [];
            doc.forEach((el) => snapshot.push(el.data()));
            let catagories = {};
            snapshot.forEach((guides) => {
                guides.selectedCatagories?.forEach((catagory) => {
                    if (!catagories[catagory.name]) {
                        catagories[catagory.name] = {
                            name: catagory.name,
                            guides: 1,
                            id: catagory.id
                        };


                    } else {
                        catagories[catagory.name] = {
                            ...catagories[catagory.name],
                            guides: catagories[catagory.name].guides + 1
                        };
                    }
                })

            })
            setCatagories(catagories)
        });


        return () => {

        }
    }, [currentUser])

    console.log(catagories)
    return (
        <Box>
            <Flex mx={'20px'} py={'20px'} alignItems={'center'} sx={headerStyle} justifyContent={'space-between'}>
                <Box>&nbsp;</Box>
                <Text fontWeight={700} fontSize={'18px'}>Catagories</Text>
                <AiOutlinePlusCircle onClick={onOpen} style={{
                    justifySelf: 'flex-end',
                    fontSize: '22px',
                    cursor: 'pointer'
                }} />
            </Flex>



            <Box mx={'20px'}>
                <Text fontWeight={500} my={3}>List catagories</Text>

                <Grid templateColumns='repeat(2, 1fr)' columnGap={4} rowGap={3}>
                    {
                        Object.keys(catagories).map((key) => (
                            <GridItem>
                                <TagsCard {...catagories[key]} />
                            </GridItem>
                        ))
                    }

                </Grid>
            </Box>

            <Modal size={'3xl'} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create catagories</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box>
                            <Text mb={2}>Name</Text>
                            <Input value={name} name='name' onChange={(e) => handleChange(e, setCatagoryState, catagoryState)} />
                        </Box>
                        {/*        <Box>
                            <Text mb={2}>Pick a icon</Text>
                            <EmojiPicker />
                        </Box> */}
                        <Box mt={3}>
                            <Text mb={2}>Description</Text>
                            <Textarea value={description} name='description' onChange={(e) => handleChange(e, setCatagoryState, catagoryState)} />
                        </Box>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant='ghost'>close</Button>
                        <Button colorScheme='blue' mr={3} onClick={handleCreateCatagory}>
                            Create
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </Box>
    )
}

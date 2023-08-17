import { Box, Button, Checkbox, Flex, Text } from '@chakra-ui/react'
import { collection, getDocs, query, where, doc, deleteDoc, updateDoc, onSnapshot, arrayRemove } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { db } from '../../firebase';
import { contextObject } from './../../context/auth'

export const Guides = () => {
    const [selectedGuides, setselectedGuides] = useState([])
    const [guides, setGuides] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const { tagName } = useParams();
    const { currentUser } = useContext(contextObject)


    useEffect(() => {
        setIsLoading(true);
        const ref = collection(db, 'guides')

        const q = query(ref, where("catagoryName", "array-contains", tagName));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const arr = [];
            querySnapshot.forEach((doc) => {
                arr.push(doc.data());
            });
            setGuides(arr)

            setIsLoading(false)

        });

        return () => {
            unsubscribe()
        }
    }, []);

    const handleSelectedGuides = (e, guide) => {

        let guides = [...selectedGuides]
        if (selectedGuides.includes(guide.id)) {
            guides = guides.filter((el) => el !== guide.id)


        } else {
            console.log('i am adddded')
            guides.push(guide.id)

        }
        setselectedGuides(guides)

    }
    const deleteSelectedGuides = async () => {
        let promises = [];

        selectedGuides.forEach((id) => {
            const docR = doc(db, 'guides', id);
            promises.push(deleteDoc(docR));
        });

        await Promise.all(promises)

    }
    const deleteSingleGuide = async (id) => {

        const docR = doc(db, 'guides', id);
        const q = query(collection(db, 'catagories'), where('name', '==', tagName), where('createdBy', '==', currentUser.uid));
        const snapshot = await getDocs(q);
        let data = snapshot.docs[0].data();
        const newDocR = doc(db, 'catagories', data.id);

        await deleteDoc(docR)
        await updateDoc(newDocR, {
            guideSelected: arrayRemove(id)
        })
    };
    return (
        <Box px={'25px'} pt={'20px'} fontFamily={'GTMedium'} >
            <Text fontSize={'18px'} fontWeight={700} mb={3} >Guides</Text>
            {
                selectedGuides.length ? (
                    <Button my={2} bg={'black'} color={'white'} onClick={deleteSelectedGuides}>
                        Delete Selected Guides
                    </Button>
                ) : ''
            }
            {
                guides.map((el) => (

                    <Flex py={3} _first={{
                        borderTop: '1px solid #DDDDDD'
                    }} borderBottom={'1px solid #DDDDDD'} >
                        <Checkbox onChange={(e) => handleSelectedGuides(e, el)} colorScheme='red' isChecked={selectedGuides.includes(el.id)} />
                        <Box w={'150px'} marginLeft={'20px'}>
                            <Text color={'#6C7689'}>Name</Text>
                            <Text fontSize={'15px'} color={'#A8A8A8'} >{el.name}</Text>
                        </Box>
                        <Box >
                            <Text color={'#6C7689'}>Catagory</Text>
                            <Text fontSize={'15px'} color={'#A8A8A8'}>
                                {
                                    el.catagoryName?.map((el) => <Text>{el}</Text>)
                                }
                            </Text>
                        </Box>
                        <Box ml={'auto'}>
                            <Button onClick={() => navigate(`/guides/settings/${el.id}`)} size={'sm'} fontSize={'15px'} bg={'black'} color={'white'} mr={2} >Setting</Button>
                            <Button onClick={() => deleteSingleGuide(el.id)} size={'sm'} fontSize={'15px'} bg={'red'} color={'white'} >Delete</Button>
                        </Box>
                    </Flex>
                ))
            }
        </Box>
    )
}

import { Box, Button, Flex, Image, Input, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react'
import { collection, deleteDoc, doc, onSnapshot, query, where } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai';
import { contextObject } from '../../context/auth';
import { db } from '../../firebase';
import { BiDotsHorizontalRounded, BiMap } from 'react-icons/bi'
import { MobileTab } from '../../components/mobileTab';
import { useNavigate } from 'react-router-dom';
export const Properties = () => {
    const [searchText, setSearchText] = useState('')
    const [properties, setProperties] = useState([]);
    const { currentUser } = useContext(contextObject);
    const navigate = useNavigate();
    useEffect(() => {
        if (!currentUser) return;
        const q = query(collection(db, "properties"), where("createdBy", "==", currentUser.uid));
        onSnapshot(q, (doc) => {
            let snapshot = [];
            doc.forEach((el) => snapshot.push(el.data()));
            setProperties(snapshot)
        });


        return () => {

        }
    }, [currentUser])

    let propertyTextStyle = {
        fontSize: '20px',
    };

    let inputContainerStyle = {
        border: '1px solid #D1D5DB',
        borderRadius: '6px',
        bg: 'white'
    };

    let propertyBoxContainer = {
        border: '1px solid #D1D5DB',
        borderRadius: '14px',

    }

    const deleteProperties = async (id) => {
        const dbRef = doc(db, 'properties', id);
        await deleteDoc(dbRef)
    }
    return (
        <Flex flexDir={'column'} height={'100vh'} fontFamily={'GTMedium'} >
            <Box px={'20px'} flex={1} pt={4} overflowY={'auto'} >

                <Flex alignItems={'center'} justifyContent={'space-between'} >
                    <Text sx={propertyTextStyle}>All properties</Text>

                    <Flex alignItems={'center'} cursor={'pointer'} onClick={() => navigate('/properties/create')} >
                        <Text fontSize={'17px'}>add</Text>
                        <Box ml={2} p={2} borderRadius={'100%'} bg={'#858585'}    >
                            <AiOutlinePlus color='white' opacity={1} fill={'white'} />
                        </Box>
                    </Flex>
                </Flex>
                <Text w={'310px'} color={'#737989'} sx={{
                    ...propertyTextStyle,
                    fontSize: '18px',
                    mt: '6px',
                    mb: '15px',
                }} >
                    You can edit and modify property here
                </Text>

                <Box sx={inputContainerStyle} pos={'relative'}>
                    <Input onChange={(e) => setSearchText(e.target.value)} _placeholder={{
                        color: '#D1D5DB '
                    }} p={3} placeholder='Search text' variant={'unstyled'} />
                    <AiOutlineSearch style={{
                        position: 'absolute',
                        right: '16px',
                        bottom: '14px',
                        fontSize: '20px',
                        color: '#D1D5DB'
                    }} />
                </Box>
                <Box mt={8}>
            {
                        properties.filter((el) => el.propertyTitle.toLowerCase().includes(searchText.toLowerCase())).map((el) => (
                            <Box cursor={'pointer'} onClick={() => navigate(`/properties/details/${el.propertyCustomLink}`)} sx={propertyBoxContainer} p={4} my={3} border={'1px solid  red'} borderRadius={4}>
                                <Flex alignItems={'center'} justifyContent={'space-between'} >
                                    <Text>{el.propertyTitle}</Text>
                                    <Menu>
                                        <MenuButton onClick={(e) => {
                                            e.stopPropagation()
                                        }}>
                                            <Box borderRadius={'4px'} bg={'#F5F7F9'} px={2}>
                                                <BiDotsHorizontalRounded fontSize={'20px'} color="#D9D9D9" />
                                            </Box>
                                        </MenuButton>
                                        <MenuList>
                                            <MenuItem onClick={(e) => {
                                                e.stopPropagation()
                                                deleteProperties(el.id)
                                            }} _hover={{
                                                bg: ' #ee2400',
                                                color: 'white'
                                            }}>Delete</MenuItem>
                                        </MenuList>
                                    </Menu>

                                </Flex>
                                <Text>{el.customInput}</Text>
                                <Flex alignItems={'center'}>
                                    <BiMap fontSize={'18px'} /> <Text ml={2} >{el.address}</Text>
                                </Flex>
                                <Image height={'188px'} w={'100%'} src={el.images[0]} borderRadius={'10px'} mt={3} mb={4} />
                    </Box>
                ))
            }

                </Box>

            </Box>
            <MobileTab />
        </Flex>
    )
}

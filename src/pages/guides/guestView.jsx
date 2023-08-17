import React, { useEffect, useState } from 'react';
import { Box, Button, Flex, HStack, Image, Input, InputGroup, InputLeftElement, Text } from '@chakra-ui/react'
import { BsSearch } from 'react-icons/bs';
import { ManualCard } from './manualCard';
import { MobileTab } from '../../components/mobileTab';
import { useContext } from 'react';
import { contextObject } from '../../context/auth';
import { collection, doc, getDoc, getDocs, limit, orderBy, query, startAfter, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';


const CatagoryButton = ({ name, handleClick, isActive }) => {
    return (
        <Flex onClick={() => handleClick(name)} w={'110px'} cursor={'pointer'} justifyContent={'center'} h={'108px'} alignItems={'center'} flexDir={'column'} p={2} boxShadow={'0px 7px 29px rgba(187, 187, 187, 0.45)'} bg={'#FFFFFF'} border={isActive ? '1px solid red' : ''} borderRadius={'26px'}>
            <Image w={'22px'} borderRadius={'100%'} h={'22px'} src="https://images.pexels.com/photos/1974596/pexels-photo-1974596.jpeg?cs=srgb&dl=pexels-julia-kuzenkov-1974596.jpg&fm=jpg&_gl=1*1yl8uid*_ga*MTQ3MDQzODMwMS4xNjY4MDA3MDM5*_ga_8JE65Q40S6*MTY2ODAwNzA0MC4xLjAuMTY2ODAwNzA0Mi4wLjAuMA.." />
            <Text mt={2} fontWeight={500} fontSize={'15px'} >{name}</Text>
        </Flex>
    )
}
export const GuestView = () => {
    const navigate = useNavigate();
    const location = useLocation()
    const parsed = queryString.parse(location.search);
    const { currentUser } = useContext(contextObject)
    const [searchText, setSearchText] = useState('');
    const [catagories, setCatagories] = useState([]);
    const [selectedCatagory, setSelectedCatagory] = useState('');
    const [lastDoc, setLastDoc] = useState(null)
    const [guides, setGuides] = useState([]);
    const [loadMoreB, setLoadMoreB] = useState(true)

    let inputStyle = {
        bg: '#F3F5FC',
        borderRadius: 0,
        color: 'black',
        border: 0,
        _placeholder: {
            color: 'black'
        },
    }
    let textStyle = {
        fontWeight: 600,
        fontSize: '18px'
    };

    useEffect(() => {

        (async () => {
            let ref = null;
            /* No current user */
            if (!currentUser) {
                ref = query(collection(db, 'catagories'), where('propertiesSelected', 'array-contains', parsed.propertyId));
            } else {
                ref = query(collection(db, 'catagories'), where('createdBy', '==', currentUser.uid));

            }

            const snapshot = await getDocs(ref);
            let data = [];
            snapshot.forEach((el) => {
                data.push(el.data())
            });
            setCatagories(data)
        })();


        return () => {

        }
    }, [currentUser]);


    useEffect(() => {
        (async () => {

            let newQ = [parsed.propertyId && where('selectedProperties', 'array-contains', parsed.propertyId), orderBy('name'), startAfter(lastDoc || 0), limit(3)].filter((el) => el !== undefined)

            const q = query(collection(db, 'guides'), ...newQ);
            const snapshot = await getDocs(q);
            const data = [];
            snapshot.forEach((el) => {

                data.push(el.data())
            });
            setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
            setGuides(data);

        })()
    }, []);

    const fetchOnSearch = async () => {
        const q = query(collection(db, 'guides'), limit(8));
        const snapshot = await getDocs(q);
        const data = [];
        snapshot.forEach((el) => {
            data.push(el.data())
        });

        setGuides(data)
    };

    const handleCatagoryChange = async (val) => {
        setLoadMoreB(true)
        setSelectedCatagory(val);
        let ref = '';
        if (val === '') {
            ref = query(collection(db, 'guides'), orderBy('name'), limit(3));


        } else {
            ref = query(collection(db, 'guides'), where('catagoryName', 'array-contains', val), orderBy('name'), limit(3),);

        }
        const snapshot = await getDocs(ref);
        let data = [];
        snapshot.forEach((el) => {
            data.push(el.data())
        });
        setLastDoc(snapshot.docs[snapshot.docs.length - 1])


        setGuides(data);

        /* Store the latest for the load more */
    };

    const loadMore = async () => {
        console.log({ loadMoreB })
        if (!loadMoreB) return;
        let ref = '';
        if (selectedCatagory === '') {
            ref = query(collection(db, 'guides'), orderBy('name'), startAfter(lastDoc || 0), limit(3));


        } else {
            ref = query(collection(db, 'guides'),/*  parsed.propertyId && where('selectedProperties', 'array-contains', parsed.propertyId), */ where('catagoryName', 'array-contains', (selectedCatagory || '')), orderBy('name'), startAfter(lastDoc || 0), limit(3));

        }
        const snapshot = await getDocs(ref);
        let data = [];
        snapshot.forEach((el) => {
            data.push(el.data())
        });
        setLoadMoreB(!snapshot.empty)
        setLastDoc(snapshot.docs[snapshot.docs.length - 1]);

        let a = parsed.propertyId ? data.filter((el) => el.selectedProperties && JSON.stringify(el.selectedProperties).includes(parsed.propertyId)) : data;
        setGuides([...guides, ...a]);
    };

    console.log(guides)
    return (
        <Flex flexDir={'column'} height={'100vh'} fontFamily={'GTMedium'} >

            <Box p={'25px'} flex={1} >
                <Box mt={'20px'}>
                    <InputGroup>
                        <InputLeftElement children={<BsSearch />} />
                        <Input onChange={(e) => {
                            setSearchText(e.target.value);


                        }} value={searchText} sx={inputStyle} type='tel' placeholder='Search' />
                    </InputGroup>
            </Box>

                <Flex mt={2} justifyContent={'space-between'}>
                    <Text my={'20px'} sx={textStyle} >List notes</Text>
                    <Button size={'md'} bg={'black'} color={'white'} onClick={() => navigate('create')}  >Add</Button>

                </Flex>

                <HStack spacing={5}>

                    <Flex onClick={() => {
                        handleCatagoryChange('')

                    }} w={'110px'} cursor={'pointer'} justifyContent={'center'} h={'108px'} alignItems={'center'} flexDir={'column'} p={2} boxShadow={'0px 7px 29px rgba(187, 187, 187, 0.45)'} bg={'#FFFFFF'} border={selectedCatagory.toLowerCase() === '' ? '1px solid red' : ''} borderRadius={'26px'}>
                        <Image w={'22px'} borderRadius={'100%'} h={'22px'} src="https://images.pexels.com/photos/1974596/pexels-photo-1974596.jpeg?cs=srgb&dl=pexels-julia-kuzenkov-1974596.jpg&fm=jpg&_gl=1*1yl8uid*_ga*MTQ3MDQzODMwMS4xNjY4MDA3MDM5*_ga_8JE65Q40S6*MTY2ODAwNzA0MC4xLjAuMTY2ODAwNzA0Mi4wLjAuMA.." />
                        <Text mt={2} fontWeight={500} fontSize={'15px'} >All</Text>
                    </Flex>
                    {
                        catagories.map((el) => <CatagoryButton isActive={selectedCatagory.toLowerCase() === el.name.toLowerCase()} handleClick={handleCatagoryChange} {...el} />)
                    }


            </HStack>

                <Box mt={'30px'}>
                    {
                        guides.map((el) => (
                            <ManualCard {...el} />

                        ))
                    }

                    <Flex alignItems={'center'} justifyContent={'center'}>
                        <Button bg={'black'} color={'white'} onClick={loadMore} >Load more</Button>
                    </Flex>
            </Box>

        </Box>
            <MobileTab />
        </Flex>
    )
}

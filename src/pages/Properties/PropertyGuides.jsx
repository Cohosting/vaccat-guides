import { Box, Button, Checkbox, Flex, Spinner, Text } from '@chakra-ui/react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { AiOutlineCloudDownload } from 'react-icons/ai'
import { contextObject } from '../../context/auth'
import { propertyContext } from '../../context/property'
import { db } from '../../firebase'
import { GuideImport } from './guideImport'
import { PropertiesGuideCreate } from './propertiesGuideCreate'
import { subTextStyle } from './PropertyDetails'

export const PropertyGuides = () => {

    const { mode, setMode, setShouldShowLayout, allGuides, selectedGuides, setSelectedGuides, setAllGuides } = useContext(propertyContext);
    const { currentUser } = useContext(contextObject);
    const [isLoaded, setIsLoaded] = useState(false)

    const handleMode = (val) => {
        setMode(val);
        setShouldShowLayout(false)
    };

    useEffect(() => {
        if (!currentUser && allGuides !== null) return;


        (async () => {
            setIsLoaded(false)
            const collRef = collection(db, 'guides');
            const q = query(collRef, where('createdBy', '==', currentUser.uid));
            const snapshot = await getDocs(q);

            let data = [];
            snapshot.docs.forEach((el) => {
                data.push(el.data())
            });
            setAllGuides(data);
            setIsLoaded(true)
        })()

    }, [currentUser]);



    const getGuides = () => {
        let allGuidesId = [];
        let displayableGuides = [];
        Object.keys(selectedGuides).forEach((el) => {
            allGuidesId.push(...selectedGuides[el])
        });


        allGuides.forEach((guide) => {
            console.log(allGuidesId, allGuidesId.includes(guide.id), guide.id)
            if (allGuidesId.includes(guide.id)) {
                displayableGuides.push(guide)
            }

        });

        return displayableGuides
    };

    const deleteGuide = (guide) => {

        let a = { ...selectedGuides };

        Object.keys(a).forEach((catagoryName) => {
            let guideArr = a[catagoryName];
            guideArr = guideArr.filter((el) => el !== guide.id);
            a[catagoryName] = guideArr


        });

        setSelectedGuides(a)

    };




    return (
        <Box fontFamily={'GTMedium'}>
            <Text sx={subTextStyle}>Create guides for  the  property</Text>
            {
                isLoaded ? (
                    <Box mt={4}>

                        {

                            mode === 'import' ? (
                                <GuideImport />
                            ) : mode === 'create' ? <PropertiesGuideCreate handleBack={() => setMode('')} /> : (
                                <Box>
                                    <Flex alignItems={'center'} justifyContent={'space-between'}  >
                                        <Text fontSize={'18px'}>All Guides</Text>
                                        <Flex>
                                            <Flex cursor={'pointer'} onClick={() => handleMode('import')} alignItems={'center'}>
                                                <AiOutlineCloudDownload fontSize={'26px'} />
                                                <Text ml={1}>import</Text>
                                            </Flex>
                                            <Button ml={2} onClick={() => handleMode('create')} bg={'black'} color={'white'} size={'sm'} >Create</Button>
                                        </Flex>
                                    </Flex>
                                    <Box mt={5}>

                                        {
                                            getGuides().map((el) => (

                                                <Flex py={3} _first={{
                                                    borderTop: '1px solid #DDDDDD'
                                                }} borderBottom={'1px solid #DDDDDD'} >

                                                    <Box w={'150px'} marginLeft={'20px'}>
                                                        <Text color={'#6C7689'}>Name</Text>
                                                        <Text fontSize={'15px'} color={'#A8A8A8'} >{el.name}</Text>
                                                    </Box>
                                                    <Box >
                                                        <Text color={'#6C7689'}>Catagory</Text>
                                                        <Text fontSize={'15px'} color={'#A8A8A8'}>
                                                            {
                                                                el.catagoryName.map((el) => <Text>{el}</Text>)
                                                            }
                                                        </Text>
                                                    </Box>
                                                    <Box ml={'auto'}>
                                                        <Button onClick={() => deleteGuide(el)} size={'sm'} fontSize={'15px'} bg={'red'} color={'white'} >Delete</Button>
                                                    </Box>
                                                </Flex>
                                            ))
                                        }

                                    </Box>
                                </Box>

                            )
                        }

                    </Box>
                ) : (
                    <Spinner />
                )
            }


        </Box>
    )
}

import React, { useState } from 'react';
import { Box, Flex, Input, Text } from '@chakra-ui/react';
import { FiMapPin } from 'react-icons/fi'
import { useRef } from 'react';
import { useLocationSearch } from '../hooks/useLocationSearch';


export const LocationInput = ({ handleLocation }) => {
    const [search, setSearch] = useState('');
    const { suggestions,
        show,
        setShow,
        handleChange,
        error, } = useLocationSearch()
    let lableStyle = {
        fontSize: '18px',
        fontWeight: 500,
        color: '#6C7689'
    };

    let searchContainerStyle = {
        boxShadow: '0px 3px 16px rgba(187, 187, 187, 0.6)',
        borderRadius: '100px'
    }
    console.log(suggestions)


    const inputRef = useRef();
    return (
        <Box onClick={() => {
            inputRef.current.focus()
        }} cursor={'pointer'}>
            <Text sx={lableStyle}>Location</Text>

            <Flex mt={'8px'} alignItems={'center'} bg={' #FFFFFF'} sx={searchContainerStyle} px={'20px'} py={'15px'}   >
                <Box height={'100%'}>

                    <FiMapPin />
                </Box>

                <Box flex={1} ml={4} pos={'relative'}>
                    <Input value={search} onChange={(e) => {
                        setSearch(e.target.value)
                        handleChange(e, setSearch)
                    }} ref={inputRef} height={'100%'} bg={'transparent'} w={'100%'} border={0} outline={0} _active={{
                        outline: 0
                    }} />
                    {
                        search !== '' && show && suggestions.length && (

                            <Box pos={'absolute'} bg={'white'} w={'100%'} top={'42px'} padding={'14px'} borderRadius={'18px'} boxShadow={' rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'} >

                                {
                                    suggestions.map((el) => (
                                        <Box py={3} onClick={() => {
                                            setShow(false);
                                            setSearch(el.place_name);

                                            handleLocation(el.place_name, el.geometry
                                                .coordinates)
                                        }}>
                                            {
                                                el.place_name

                                            }
                                        </Box>
                                    ))
                                }

                            </Box>
                        )
                    }

                </Box>

            </Flex >
        </Box >
    )
}

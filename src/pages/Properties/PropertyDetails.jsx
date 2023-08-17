import { Box, Image, Input, Text, Textarea, useOutsideClick } from '@chakra-ui/react'
import { getDownloadURL, uploadBytes } from 'firebase/storage';
import React, { useRef } from 'react';
import { useContext } from 'react';
import { BsSearch } from 'react-icons/bs';
import { propertyContext } from '../../context/property';
import { storage } from '../../firebase';
import { useLocationSearch } from '../../hooks/useLocationSearch';

import { ref as stRef, } from 'firebase/storage'

export let labelStyle = {
    fontSize: '16px',
    fontWeight: 500,

}
export const PropertyInput = ({ label = '', value, name, handleChange }) => {
    return (
        <Box fontFamily='GTMedium'>
            <Text sx={labelStyle} >{label}</Text>
            <Input onChange={(e) => handleChange(e.target.name, e.target.value)} name={name} pb={2} color={'#858585'} value={value} borderRadius={'0px'} borderBottom={'1px solid #D8D8D8'} variant={'unstyled'} />
        </Box>
    )
}


export const subTextStyle = {
    color: '#AEAEAE',
    fontFamily: 'GTMedium',
    fontSize: '16px',
    mt: '5px',
    mb: '10px'


}

export const PropertyDetails = () => {
    const { propertyState, setPropertyState } = useContext(propertyContext);
    const { propertyTitle,
        address,
        coordinates,
        images,
        password,
        customInput } = propertyState;
    const { suggestions,
        show,
        setShow,
        handleChange,
        error, searchText } = useLocationSearch();

    const ref = useRef()
    useOutsideClick({
        ref: ref,
        handler: () => setShow(false),
    });
    const metadata = {
        contentType: 'image/jpeg',
    };
    return (
        <Box>
            <Text sx={subTextStyle}>Property details</Text>
            <Box mt={'20px'}>
                <PropertyInput
                    label='Property title'
                    value={propertyTitle}
                    name={'propertyTitle'}
                    handleChange={(name, value) => setPropertyState({
                        ...propertyState,
                        [name]: value
                    })}
                />

                <Box pos={'relative'} my={3}>

                    <Box fontFamily='GTMedium' pos={'relative'}>
                        <Text sx={labelStyle} >Property address</Text>
                        <Box ref={ref} pos={'relative'}>
                            <Input onChange={handleChange} pb={2} color={'#858585'} value={address || searchText} borderRadius={'0px'} borderBottom={'1px solid #D8D8D8'} variant={'unstyled'} />


                            {
                                show && suggestions.length && (
                                    <Box zIndex={3} bg={'white'} p={'15px'} borderRadius={'10px'} border={'1px solid gray'} pos="absolute" w={'100%'} mt={'10px'}>
                                        {
                                            suggestions.map((el) => (
                                                <Box onClick={() => {

                                                    setPropertyState({
                                                        ...propertyState,
                                                        address: el.place_name,
                                                        coordinates: el.geometry.coordinates
                                                    })
                                                    setShow(false)
                                                }} _notLast={{
                                                    borderBottom: '1px solid'
                                                }} cursor={'pointer'} py={'6px'} >
                                                    {el.place_name}
                                                </Box>
                                            ))
                                        }
                                    </Box>

                                )
                            }
                        </Box>
                        <BsSearch style={{
                            position: 'absolute',
                            bottom: '14px',
                            right: '8px'
                        }} />

                    </Box>



                </Box>

                <Box fontFamily='GTMedium'>
                    <Text sx={labelStyle} >Property Image</Text>
                    <Input onChange={async (el) => {
                        if (el.target.files && el.target.files[0]) {
                            const files = el.target.files[0];
                            console.log(files)
                            let a = Date.now() + 'sds';

                            const imageRef = stRef(storage, `properties/${files.name || a}`);

                            const snap = await uploadBytes(imageRef, files);
                            const url = await getDownloadURL(snap.ref);
                            setPropertyState({
                                ...propertyState,
                                'images': [url]
                            })
                        }




                    }} my={2} variant={'unstyled'} type="file" />
                    {
                        images.length ? (
                            <Image w={'300px'} src={images[0]} />

                        ) : ''
                    }
                </Box>
                <Box my={3}>
                    <PropertyInput
                        label='Passwordd (optional)'
                        value={password}
                        name="password"
                        handleChange={(name, value) => setPropertyState({
                            ...propertyState,
                            [name]: value
                        })}
                    />

                </Box>


                <Box mt={3}>

                    <Box fontFamily='GTMedium'>
                        <Text sx={labelStyle} >Custom Input</Text>
                        <Textarea onChange={(e) => {
                            setPropertyState({
                                ...propertyState,
                                customInput: e.target.value
                            })
                        }} _active={{
                            outline: 'none',
                            border: 'none'
                        }} value={customInput} border={'none'} borderRadius={'none'} borderBottom={'1px solid gray'} />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

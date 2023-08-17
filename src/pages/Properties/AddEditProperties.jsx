import { Box, Button } from '@chakra-ui/react'
import axios from 'axios';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components/Input'
import { contextObject } from '../../context/auth';
import { propertyContext, PropertyContextObject } from '../../context/property';
import { db } from '../../firebase';
import { handleChange } from '../../utils/input';
import { CheckIn } from './CheckIn';
import { Layout } from './Layout';
import { PropertyDetails } from './PropertyDetails';
import { Wifi } from './wifi';
import { Host } from './Host';
import { CustomLink } from './CustomLink';
import { PropertyGuides } from './PropertyGuides';




const StepObject = {
    1: <PropertyDetails />,
    2: <CheckIn />,
    3: <Wifi />,
    4: <Host />,
    5: <PropertyGuides />,
    6: <CustomLink />,
}
const getArray = (obj) => {
    let arr = [];

    Object.keys(obj).forEach((key) => {
        const tempArr = obj[key];
        arr = [...arr, ...tempArr]

    });


    return arr


}

const getCatagory = (obj, allGuides) => {

    const guideId = getArray(obj);
    const guides = allGuides.filter((guide) => guideId.some((id) => guide.id === id));



    let catagory = [];
    guides.forEach((el => {
        catagory.push(...el.selectedCatagories)
    }));

    return [...new Set(catagory)]
}
export const AddEditProperties = () => {
    const { currentUser } = useContext(contextObject);
    const { step, propertyState, selectedGuides, allGuides } = useContext(propertyContext)

    const navigate = useNavigate()

    const handleCreateProperty = async () => {


        let ref = doc(collection(db, 'properties'));
        await setDoc(ref, {
            ...propertyState,
            name: propertyState.propertyTitle,
            id: ref.id,
            createdBy: currentUser.uid,
            status: 'published',
            selectedGuides: getArray(selectedGuides),

            // add selected guides
        }).then(async (el) => {

            if (!currentUser.customerId) {
                const result = await axios.post(`${process.env.REACT_APP_CLOUD_FUNCTION_API_URL}/create-checkout-session`, {
                    user: currentUser
                });
                window.location.href = result.data.url
            } else {
                await axios.post(`${process.env.REACT_APP_CLOUD_FUNCTION_API_URL}/update-subscription`, {
                    subscriptionId: currentUser.subscriptionId,
                    uid: currentUser.uid
                });
                navigate('/properties')
            }
            await axios.post(`${process.env.REACT_APP_CLOUD_FUNCTION_API_URL}/update-guides`, {
                selectedGuides: getArray(selectedGuides),
                propertyId: ref.id,
                catagories: getCatagory(selectedGuides, allGuides)

            })

        }).catch(err => {
            console.log(err)
        });


    }


    return (
        <Box px={'20px'} >

            <Layout onSubmit={handleCreateProperty}>

                {
                    StepObject[step]
                }
            </Layout>
            {/*  <Input
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
            <Input
                label={'Custom Link'}
                name={'customLink'}
                value={customLink}
                onChange={(e) => handleChange(e, setPropertyState, propertyState)}

            />
            <Button w={'100%'} onClick={handleCreateProperty} >Publish</Button> */}
        </Box>

    )
}

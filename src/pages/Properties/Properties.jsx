import { Box, Text } from '@chakra-ui/react'
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { contextObject } from '../../context/auth';
import { db } from '../../firebase';

export const Properties = () => {
    const [properties, setProperties] = useState([]);
    const { currentUser } = useContext(contextObject)

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

    return (
        <Box px={'20px'}>
            <Text>All properties</Text>

            {
                properties.map((el) => (
                    <Box p={3} my={3} border={'1px solid  red'} borderRadius={4}>
                        {el.name}
                    </Box>
                ))
            }
        </Box>
    )
}

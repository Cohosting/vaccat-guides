import { Box, Button, Text } from '@chakra-ui/react'
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { db } from '../../firebase';

export const Guides = () => {
    const [guides, setGuides] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const { tagId } = useParams();


    useEffect(() => {

        (async () => {
            setIsLoading(true);
            const ref = collection(db, 'guides')

            const q = query(ref, where("catagoriesId", "array-contains", tagId));
            const snapshot = await getDocs(q);

            let data = [];

            snapshot.forEach((el) => {
                data.push(el.data())
            })

            setGuides(data)

            setIsLoading(false)

        })()

        return () => {

        }
    }, [])

    console.log(guides)
    return (
        <Box px={'25px'} pt={'20px'} >
            <Text fontSize={'18px'} fontWeight={700} >Guides</Text>
            {
                guides.map((el) => (
                    <Box p={4
                    } my={3} border={'1px solid gray'} px={'10px'} borderRadius={'6px'} >
                        <Text>{el.name}</Text>
                        <Text>{el.description}</Text>
                        <Button mt={2} mb={1} onClick={() => navigate(`/guides/settings/${el.id}`)} >Setting Page</Button>
                    </Box>
                ))
            }
        </Box>
    )
}

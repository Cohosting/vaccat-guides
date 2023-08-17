import { Box, Button, Flex, Image, Text } from '@chakra-ui/react'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import React from 'react'
import { useState } from 'react'
import { AiOutlineKey } from 'react-icons/ai'
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom'
import { Input } from '../../components/Input'

export const Forget = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSucceed, seIsSucceed] = useState(null);
    const navigate = useNavigate();


    const handleResetPassword = async () => {

        setIsLoading(true)
        try {
            const auth = getAuth();
            await sendPasswordResetEmail(auth, email)
            seIsSucceed(true)
        } catch (err) {
            console.log(err);
            seIsSucceed(false)

        };
        setIsLoading(false)
    }

    return (
        <Box px={'25px'}>
            <Flex py={'15px'} flexDir={'column'} flexDirection={'column'} alignItems={'center'} >
                <Flex w={'max-content'} p={3} borderRadius={'100%'} bg={'rgba(37, 206, 208, 0.8)'}>
                    <AiOutlineKey color='black' fontSize={'25px'} />
                </Flex>
                <Text fontSize={'24px'} fontFamily={'GTMedium'} my={2} >Forgot password?</Text>
                <Text fontFamily={'GTRegular'} color={'#8C909A'} >No worries, We'll send you reset instruction.</Text>
            </Flex>


            <Box>
                <Input
                    label={'Email'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Button isLoading={isLoading} onClick={handleResetPassword} fontFamily={'GTRegular'} borderRadius={'4px'} w={'100%'} bg={'rgba(37, 206, 208, 0.8)'} color={'white'} height={'50px'}>
                    {
                        isSucceed === true ? 'Sent' : 'Reset  password'
                    }
                </Button>
                {
                    isSucceed === true && (

                        <Text fontFamily={'GTRegular'} color={'green'} mt={1}>Check you email inbox</Text>
                    )
                }
                {
                    isSucceed === false && (

                        <Text fontFamily={'GTRegular'} color={'red'} mt={1}>Something wrong</Text>
                    )
                }
                <Flex cursor={'pointer'} justifyContent={'center'} alignItems={'center'} my={'5px'} mt={'15px'} fontFamily={'GTRegular'} color={'#8C909A'} >
                    <BiArrowBack />
                    <Text ml={2} onClick={() => navigate('/login')}>Back to login</Text>
                </Flex>
            </Box>


        </Box>
    )
}

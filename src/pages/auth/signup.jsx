import { Box, Button, Checkbox, Divider, Flex, Image, InputGroup, InputRightElement, Text, Input as TextInput, } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Input } from '../../components/Input';
import { handleChange } from '../../utils/input';

import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { auth } from '../../firebase';
import { getOrCreateUser } from '../../firebase/auth';
import { useNavigate } from 'react-router-dom';
import Logo from './../../images/circle.png'
import { FiEye, FiEyeOff } from 'react-icons/fi';
export const Signup = () => {

    const navigate = useNavigate();
    const [show, setShow] = useState(false)
    const [signupCredentials, setSignupCredentials] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ' '
    })

    const { firstName, lastName, email, password } = signupCredentials;



    const handleSignup = async () => {

        console.log({ password })
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        await getOrCreateUser(user, signupCredentials);
        navigate('/')

    }

    let inputStyle = {
        border: '1px solid #A8A8A8',
        borderRadius: '4px',
        w: '100%',
        height: '50px',
        fontFamily: 'GTRegular',

    };
    let lableStyle = {
        fontSize: '16px',
        fontWeight: 500,
        fontFamily: 'GTMedium',
        color: ' rgba(27, 43, 65, 0.72)',

    };



    return (
        <Box px={'25px'} >
            <Flex direction={'column'} alignItems={'center'} >
                <Box>
                    <Image height={'170px'} src={Logo} alt='Logo' />
                </Box>
                <Box marginTop={'-45px'} textAlign={'center'}>

                    <Text fontSize={'22px'} fontWeight={'600'} fontFamily={'GTMedium'}>Log in to your Account</Text>
                    <Text mt={'5px'} mb={'20px'} fontSize={'18px'} fontWeight={'400'} fontFamily={'GTRegular'} >Welcome back, please enter your details.</Text>
                </Box>
            </Flex>

            <Button borderRadius={'4px'} height={'55px'} w={'100%'} variant={'outline'}>
                <Image w={'32px'} h={'32px'} src='https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png' alt='Google-logo' />
            </Button>

            <Flex alignItems={'center'} mt={'20px'} mb={'15px'} >
                <Divider />
                <Text color={' rgba(28, 52, 84, 0.26);'} px={1} fontSize={'18px'} fontWeight={'400'} fontFamily={'GTRegular'} width={'150px'} textAlign={'center'}>OR</Text>
                <Divider />
            </Flex>

            <Box>
                <Input
                    label={'First Name'}
                    value={firstName}
                    name={'firstName'}
                    onChange={(e) => handleChange(e, setSignupCredentials, signupCredentials)}
                />
                <Input
                    label={'Last Name'}
                    value={lastName}
                    name={'lastName'}
                    onChange={(e) => handleChange(e, setSignupCredentials, signupCredentials)}
                />
                <Input
                    label={'Email'}
                    value={email}
                    name={'email'}
                    onChange={(e) => handleChange(e, setSignupCredentials, signupCredentials)}
                />
                <Text sx={lableStyle} textTransform={'capitalize'} >Password</Text>
                <InputGroup flexDir={'column'}>
                    <TextInput type={show ? 'text' : 'password'} sx={inputStyle} focusBorderColor={'rgba(37, 206, 208, 0.8)'}

                        onChange={(e) => setSignupCredentials({
                            ...signupCredentials,
                            password: e.target.value,
                        })}
                    />
                    <InputRightElement onClick={() => setShow(!show)} children={show ? <FiEye /> : <FiEyeOff />} />
                </InputGroup>

                <Flex my={5} alignItems={'center'} justifyContent={'space-between'}>
                    <Checkbox >
                        <Text fontFamily={'GTRegular'} fontSize={'17px'} color={'rgba(27, 43, 65, 0.72)'}  >
                            I have read and agree to the Terms of Service
                        </Text>
                    </Checkbox>

                </Flex>
                <Button fontFamily={'GTRegular'} height={'56px'} bg={'rgba(37, 206, 208, 0.8)'} color={'white'} w={'100%'} onClick={handleSignup} >Get  Started</Button>

                <Box textAlign={'center'} mt={3} >

                    <Text as={'span'} fontFamily={'GTRegular'} fontSize={'17px'}>Already have an account?</Text>
                    <Text as={'span'} ml={1} fontFamily={'GTMedium'} textTransform={'capitalize'} color={'rgba(37, 206, 208, 0.8)'} cursor={'pointer'} onClick={() => navigate('/login')}  >log  in</Text>
                </Box>

            </Box>
        </Box >
    )
}

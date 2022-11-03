import { Box, Button, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Input } from '../../components/Input';
import { handleChange } from '../../utils/input';

import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { auth } from '../../firebase';
import { getOrCreateUser } from '../../firebase/auth';
import { useNavigate } from 'react-router-dom';

export const Signup = () => {

    const navigate = useNavigate();
    const [signupCredentials, setSignupCredentials] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ' '
    })

    const { firstName, lastName, email, password } = signupCredentials;



    const handleSignup = async () => {

        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        await getOrCreateUser(user, signupCredentials);
        navigate('/')

    }

    return (
        <Box px={'15px'}>
            <Text>Please Signup</Text>

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
                <Input
                    label={'password'}
                    value={password}
                    name={'password'}
                    onChange={(e) => handleChange(e, setSignupCredentials, signupCredentials)}
                />
                <Button w={'100%'} onClick={handleSignup} >Signup</Button>
            </Box>
        </Box>
    )
}

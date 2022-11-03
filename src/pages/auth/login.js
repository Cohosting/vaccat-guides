import { Box, Button } from '@chakra-ui/react'
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components/Input';
import { auth } from '../../firebase';
import { handleChange } from '../../utils/input';

export const Login = () => {
    const [loginCredentials, setLoginCredentials] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate()

    const { email, password } = loginCredentials;


    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/')
        } catch (err) {
            console.log(err)
        }


    }



    return (
        <Box px={'15px'}>

            <Input
                label={'Email'}
                value={email}
                name={'email'}
                onChange={(e) => handleChange(e, setLoginCredentials, loginCredentials)}

            />
            <Input
                label={'Password'}
                value={password}
                name={'password'}
                onChange={(e) => handleChange(e, setLoginCredentials, loginCredentials)}

            />

            <Button w={'100%'} onClick={handleLogin} >Login</Button>

        </Box>
    )
}

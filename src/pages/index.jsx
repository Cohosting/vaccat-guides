import { Box, Button, Text } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Home = () => {

    const navigate = useNavigate()
    return (
        <Box>
            <Text>Navigation  for development  purposes</Text>
            <Button onClick={() => navigate('properties')}>Properties</Button>
            <Button onClick={() => navigate('tags')}>Tags</Button>
            <Button onClick={() => navigate('guides')}>Guides</Button>
            <Button onClick={() => navigate('guides/create')}>Create Guides</Button>
            <Button onClick={() => navigate('guides/settings/sdsdsd')}>guides setting</Button>
            <Button onClick={() => navigate('guest/guides')}>Guest view</Button>
        </Box>
    )
}

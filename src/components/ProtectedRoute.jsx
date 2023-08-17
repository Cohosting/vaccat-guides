import { Box, Flex, Spinner } from '@chakra-ui/react'
import React from 'react'
import { useContext } from 'react'
import { contextObject } from '../context/auth'

export const ProtectedRoute = ({ Component }) => {
  const { currentUser } = useContext(contextObject);
  if (currentUser === undefined) return (
    <Flex alignItems={'center'} justifyContent={'center'} >
      <Spinner m={4} />;
    </Flex>
  )

  if (currentUser === null) {
    window.location.href = window.location.origin + '/' + 'login'
  }

  return Component
}

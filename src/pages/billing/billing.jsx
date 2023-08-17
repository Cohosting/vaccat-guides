import { Box, Button, Text } from '@chakra-ui/react'
import axios from 'axios'
import moment from 'moment'
import React from 'react'
import { useState, useContext, useEffect } from 'react'
import { contextObject } from '../../context/auth'

const Billing = () => {
  const [subscriptionState, setSubscriptionState] = useState()

  const { currentUser } = useContext(contextObject);

  /*   if (!currentUser) return <Text>Please login to see this page</Text>;
   */


  useEffect(() => {

    if (!currentUser) return;

    (async () => {
      const subscription = await axios.get(`${process.env.REACT_APP_CLOUD_FUNCTION_API_URL}/get-subscription?subscriptionId=${currentUser.subscriptionId}`,);

      setSubscriptionState(subscription.data.data)
    })();

  }, [currentUser])


  const getBillingDetails = async () => {
    const response = await axios.post(`${process.env.REACT_APP_CLOUD_FUNCTION_API_URL}/create-customer-portal-session`, {
      customerId: currentUser.customerId
    });
    console.log(response)

    window.location.href = response.data.url


  }

  return (
    <Box p={4}>
      {
        currentUser && !currentUser.customerId ? (
          <Text>You are not subscribed</Text>
        ) :
          (
            <>

              <Text>You are subscribed to 10$ per property modal!</Text>
              <Text>Next Billing date:  {subscriptionState && moment.unix(subscriptionState.current_period_end).format("MMM Do YY")}  </Text>
              <Button onClick={getBillingDetails}>Manage your subscription</Button>
            </>

          )
      }
    </Box>
  )
}
export default Billing;
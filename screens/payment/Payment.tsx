// import { useStripe } from '@stripe/stripe-react-native';
import { Box, Center, Pressable } from 'native-base';
import * as React from 'react';
import { CardField, useConfirmPayment, useStripe } from '@stripe/stripe-react-native';
import axios from 'axios';


export default function Payment () {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const {confirmPayment, loading} = useConfirmPayment();
    const [clientSecret, setClientSecret] = React.useState("")

    React.useEffect(() => {
        fetchPaymentSheet()
    }, [])

    const fetchPaymentSheet =  async () => {
        const res = await axios.post("https://gvedopv4x6.execute-api.ap-southeast-1.amazonaws.com/dev/payment?amount=100")
        setClientSecret(res.data.client_secret)
        // console.log(res.data.client_secret);
        // const { error } = await initPaymentSheet({
        //     paymentIntentClientSecret: res.data.client_secret
        // })
        // if (error ){
        //     console.log(error.code);
            
        // }
    }

    const openPaymentSheet = async () =>{
        console.log(clientSecret);
        
        // const { error } = await presentPaymentSheet({ clientSecret });
        // if (error){
        //     console.log(error);
            
        // }
        const {paymentIntent, error} = await confirmPayment(clientSecret, {
            type: 'Card',
          });
        if (error){
            console.log(error);
            
        }
    }
    return (
        <Box>
            <CardField
            postalCodeEnabled={false}
            style={{
                width: '100%',
                height: 50,
                marginVertical: 30,
              }} />
              <Pressable
                onPress={() => {
                    openPaymentSheet();
                }}>
                  <Center>
                      Pay
                  </Center>
              </Pressable>
        </Box>
    )
}


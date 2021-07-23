import { Ionicons } from '@expo/vector-icons';
import { Box, Center, Flex, Heading, HStack, Icon, Pressable, ScrollView, Text } from 'native-base';
import { addItem, removeItem, selectCount, selectCost, selectState, selectItems, selectId } from '../../Redux/features/CartSlice'
import { useSelector, useDispatch } from 'react-redux';
import * as React from 'react';
import MenuItem from '../../components/Menu/MenuItem';
import { useStripe } from '@stripe/stripe-react-native';
import axios from 'axios';

const CartScreen = ({ navigation, route }: any) => {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [clientSecret, setClientSecret] = React.useState("")

    const cartItems = useSelector(selectItems)
    const restaurantId = useSelector(selectId)
    const count = useSelector(selectCount)
    const cost = useSelector(selectCost)

    const fetchPaymentSheet =  async () => {
        const res = await axios.post("/payment", {
            amount: cost * 100,
            destination: "acct_1JBv7L2fPxOgSIwN"
          })
        console.log(res.data.client_secret);
        
        setClientSecret(res.data.client_secret)
        console.log(res.data.client_secret);
        const { error } = await initPaymentSheet({
            paymentIntentClientSecret: res.data.client_secret
        })
        if (error ){
            // console.log(error);
            
        }
    }

    React.useEffect(() => {
        fetchPaymentSheet()
    }, [])

    const openPaymentSheet = async () =>{
        console.log(clientSecret);
        
        const { error } = await presentPaymentSheet({ clientSecret });
        if (error){
            console.log(error);
            
        }
        // const {paymentIntent, error} = await confirmPayment(clientSecret, {
        //     type: 'Card',
        //   });
        // if (error){
        //     console.log(error);
            
        // }
    }

    return (
        <Box
            safeArea>
            <Flex
                direction="row"
                justifyContent="space-between"
                py={4}>
                <Pressable
                    onPress={() => {
                        navigation.goBack()
                    }}>
                    <Box
                        bg="gray.100"
                        p={2}
                        borderRadius={10}>
                        <Icon size='sm' color="black" as={<Ionicons name="ios-chevron-back" />} />
                    </Box>
                </Pressable>

                <Box
                    bg="gray.100"
                    p={2}
                    borderRadius={10}>
                    <Icon size='sm' color="black" as={<Ionicons name="options-outline" />} />
                </Box>
            </Flex>

            <Center>
                <Heading>
                    Cart
                </Heading>
            </Center>

            <ScrollView
                style={{
                    height: "80%"
                }}>
                {
                    cartItems &&
                    cartItems.map((item: any, index: number) => {
                        return (
                            <MenuItem
                                key={index}
                                name={item.name}
                                description={item.description}
                                id={item.itemId}
                                price={item.price}
                                restaurantId={restaurantId}
                                cart={true} />
                        )
                    })
                }
            </ScrollView>


            <Flex
                direction="row"
                justify="space-around"
                alignItems="center"
                bg="white"
                style={{
                    height: "12%"
                }}>
                <HStack
                    space={1}
                    style={{
                        width: "20%"
                    }}>
                    <Text>
                        {count}
                    </Text>
                    <Text>
                        Items
                        </Text>
                </HStack>

                <Pressable
                    onPress={() => {
                        if (count > 0)
                            openPaymentSheet()
                    }}>
                    <Center>
                        <Text
                            bold
                            fontSize="xl"
                        >
                            Confirm Order
                            </Text>
                    </Center>
                </Pressable>
                <Box
                    p={3}
                    bg="gray.200"
                    borderRadius={10}
                    style={{
                        width: "20%"
                    }}>
                    <Center>
                        <Text bold>
                            $ {cost}
                        </Text>
                    </Center>
                </Box>
            </Flex>
        </Box>
    )
}

export default CartScreen;
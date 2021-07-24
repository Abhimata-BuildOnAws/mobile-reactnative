import { Ionicons } from '@expo/vector-icons';
import { Box, Image, Center, Flex, Heading, HStack, Icon, Modal, Pressable, ScrollView, Stack, Text } from 'native-base';
import { addItem, removeItem, selectCount, selectCost, selectState, selectItems, selectId, selectType } from '../../Redux/features/CartSlice'
import { useSelector, useDispatch } from 'react-redux';
import * as React from 'react';
import MenuItem from '../../components/Menu/MenuItem';
import { useStripe } from '@stripe/stripe-react-native';
import axios from 'axios';
import CreateTumpangModal from '../../components/Modals/CreateTumpangModal';

const CartScreen = ({ navigation, route }: any) => {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [clientSecret, setClientSecret] = React.useState("")

    const cartItems = useSelector(selectItems)
    const restaurantId = useSelector(selectId)
    const count = useSelector(selectCount)
    const cost = useSelector(selectCost)
    const type = useSelector(selectType)

    const [tumpangModalVisible, setTumpangModalVisible] = React.useState(true)
    const [createTumpangModalVisible, setCreateTumpangModalVisible] = React.useState(false)

    const fetchPaymentSheet = async () => {
        const res = await axios.post("/payment", JSON.stringify({
            amount: cost * 100,
            destination: "acct_1JBv7L2fPxOgSIwN"
        }))

        console.log(res.data.client_secret);

        setClientSecret(res.data.client_secret)
        console.log(res.data.client_secret);
        const { error } = await initPaymentSheet({
            paymentIntentClientSecret: res.data.client_secret
        })
        if (error) {
            // console.log(error);

        }
    }

    React.useEffect(() => {
        // fetchPaymentSheet()
    }, [])

    const openPaymentSheet = async () => {
        console.log(clientSecret);

        const { error } = await presentPaymentSheet({ clientSecret });
        if (error) {
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
        <>
            {   type === "order" &&
                <Modal isOpen={tumpangModalVisible}>
                    <Modal.Content
                        marginBottom={0}
                        marginTop="auto"
                        py={10}>
                        <Modal.Header>
                        </Modal.Header>
                        <Modal.Body>

                            <Center>
                                <Image
                                    size={100}
                                    alt={"Tag"}
                                    source={require('../../assets/images/icons8-tag-48.png')} />
                                <Heading>
                                    Create Tumpang
                                </Heading>
                            </Center>

                            <Center
                                mt={6}>
                                <Text
                                    fontSize="lg">
                                    Create a Tumpang for others to hitch on your delivery! Share the cost and reduce your carbon emission.
                                </Text>
                            </Center>
                            <HStack
                                space={2}>
                                <Pressable
                                    flex={1}
                                    onPress={() => {
                                        setTumpangModalVisible(false)
                                    }}>
                                    <Box
                                        p={4}
                                        mt={10}
                                        bg="black"
                                        rounded="lg">
                                        <Center>
                                            <Text
                                                color="white"
                                                bold>
                                                Skip
                                        </Text>
                                        </Center>
                                    </Box>
                                </Pressable>
                                <Pressable
                                    flex={1}
                                    onPress={() => {
                                        setTumpangModalVisible(false)
                                        setCreateTumpangModalVisible(true)
                                    }}>
                                    <Box
                                        p={4}
                                        mt={10}
                                        bg="black"
                                        rounded="lg">
                                        <Center>
                                            <Text
                                                color="white"
                                                bold>
                                                Create Tumpang
                                        </Text>
                                        </Center>
                                    </Box>
                                </Pressable>
                            </HStack>
                        </Modal.Body>
                    </Modal.Content>
                </Modal>}

                <CreateTumpangModal 
                    open={createTumpangModalVisible}
                    handleOpen={setCreateTumpangModalVisible} />

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
        </>
    )
}

export default CartScreen;
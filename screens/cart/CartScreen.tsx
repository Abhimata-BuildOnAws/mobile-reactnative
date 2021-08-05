import { Ionicons } from '@expo/vector-icons';
import { Box, Image, Center, Flex, Heading, HStack, Icon, Modal, Pressable, ScrollView, Stack, Text, Input } from 'native-base';
import { addItem, removeItem, selectCount, selectCost, selectState, selectItems, selectId, selectType } from '../../Redux/features/CartSlice'
import { setPickUpPoint, selectPickUpPoint, selectDate, selectLat, selectLong } from '../../Redux/features/TumpangSlice'
import { useSelector, useDispatch } from 'react-redux';
import * as React from 'react';
import MenuItem from '../../components/Menu/MenuItem';
import { useStripe } from '@stripe/stripe-react-native';
import axios from 'axios';
import CreateTumpangModal from '../../components/Modals/SetTimeModal';
import SetTimeModal from '../../components/Modals/SetTimeModal';
import OrderModal from '../../components/Modals/OrderModal';
import navigation from '../../navigation';
import CartItem from '../../components/Cart/CartItem';
import moment from 'moment';
import { useQuery } from 'react-query';

const CartScreen = ({ navigation, route }: any) => {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [clientSecret, setClientSecret] = React.useState("")

    const cartItems = useSelector(selectItems)
    const restaurantId = useSelector(selectId)
    const count = useSelector(selectCount)
    const cost = useSelector(selectCost)
    const type = useSelector(selectType)
    const pickUpPoint = useSelector(selectPickUpPoint)
    const deliveryDate = useSelector(selectDate)
    const lat = useSelector(selectLat)
    const long = useSelector(selectLong)

    console.log(lat);
    console.log(long);
    console.log(cartItems);
    
    // const dated = moment(deliveryDate).toISOString()
    // console.log(dated.substring(0, dated.length-1).concat('', '+08:00'));

    const [tumpangModalVisible, setTumpangModalVisible] = React.useState(true)
    const [TimeModalVisible, setTimeModalVisible] = React.useState(false)
    const [orderModalVisible, setOrderModalVisible] = React.useState(false)

    const [tumpangPickUp, setTumpangPickUp] = React.useState("")
    const [tumpangTime, setTumpangTime] = React.useState("")
    const [tumpangId, setTumpangId] = React.useState("")
    const [description, setDescription] = React.useState("")

    const fetchPaymentSheet = async () => {
        try {
            const res = await axios.post(`/pya?amount=${cost * 100}&destination=acct_1JBv7L2fPxOgSIwN`)

            setClientSecret(res.data.client_secret)
            const { error } = await initPaymentSheet({
                paymentIntentClientSecret: res.data.client_secret
            })
            if (error) {
                console.log(error);
            }
        } catch (e) {
            console.log(e);
        }
    }

    const createTumpang = async () => {

        try {
            const res = await axios.post("/tumpang", {
                submit_time: date,
                restaurant_id: restaurantId,
                user_id: "3e227619-993a-47e9-a87e-cd21d44589b2",
                latitude: lat,
                longitude: long,
                user_latitude: lat,
                user_longitude: long,
                description: description
            })
        } catch (e) {

        }
    }

    const getNearByTumpang = async () => {
        try{
            const res = await axios.post("/tumpang/nearby/restaurant", {
                user_latitude: lat,
                user_longitude: long,
                restaurant_id: restaurantId,
            })
            console.log(res.data.data);
            
            if(res.data.data.length > 0 ){
                setTumpangId(res.data.data[0].id)
                setTumpangPickUp(res.data.data[0].attributes.pickup)
                setTumpangTime(moment(res.data.data[0].attributes.submit_time).format("h : m A").toString())
                setTumpangModalVisible(false)
                setTimeModalVisible(true)
            }
        }catch(e){
            console.log(e);
            
        }
        
    }

    const createNormalOrder = async () => {
        try{
            const dated = moment(deliveryDate).toISOString()
            console.log(dated.substring(0, dated.length-1).concat('', '+08:00'));
            console.log(lat);
            console.log(long);
            
            const time = moment(deliveryDate).add(8, 'hours').toISOString().split(".")[0]

            console.log("done");
            

            const tumpang = await axios.post("/tumpang", {
                submit_time: time,
                restaurant_id: restaurantId,
                user_id: "3e227619-993a-47e9-a87e-cd21d44589b2",
                latitude: lat,
                longitude: long,
                user_latitude: lat,
                user_longitude: long,
                description: description,
                shared: true,
            });
    
            console.log(tumpang.data);
            
            const hitchId = tumpang.data.data.id
            let input = []

            for(let i = 0; i< cartItems.length; i++){
                let obj:any = {}
                obj["menu_item_id"] = cartItems[i].itemId
                obj["quantity"] = cartItems[i].count
                input.push(obj)
            }
            console.log("passed first one");
            console.log(hitchId);
            
            console.log(input);
            
            const order = await axios.post("/order", {
                user_id: "3e227619-993a-47e9-a87e-cd21d44589b2",
                hitch_id: hitchId,
                order: input
            })
            console.log(order.data);
            
        }catch(e){
            console.log(e);
            
        }
        
    }

    React.useEffect(() => {
        getNearByTumpang()
        fetchPaymentSheet()
    }, [])

    const openPaymentSheet = async () => {
        console.log(clientSecret);

        const { error } = await presentPaymentSheet({ clientSecret });

        if (error) {
            console.log(error);
        } else {
            createNormalOrder()
            navigation.navigate("TabOneScreen")
        }
    }

    return (
        <>
            {   type === "order" &&
                <>
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
                                            navigation.navigate("SetTime")
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
                    </Modal>

                    <SetTimeModal
                        open={TimeModalVisible}
                        handleOpen={setTimeModalVisible}
                        handleOrderOpen={setOrderModalVisible}
                        lat={lat}
                        long={long}
                        restaurantId={restaurantId}
                        pickup={tumpangPickUp}
                        time={tumpangTime}
                        id={tumpangId} />
                </>
            }
            <Box
                safeAreaTop
                flex={1}>
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

                <Heading
                    p={4}>
                    Cart
                </Heading>


                <ScrollView
                    style={{
                        height: "65%"
                    }}>

                    <Text
                        fontWeight={600}
                        fontSize="xl"
                        color="gray.500"
                        p={4}>
                        Deliver To
                    </Text>

                    <Box
                        bg="white">
                        <Flex

                            direction="row"
                            p={4}>
                            <Box
                                mr={2}>
                                <Icon size='lg' color="red.500" as={<Ionicons name="location" />} />
                            </Box>
                            <Pressable
                                flex={1}
                                onPress={() => {
                                    navigation.navigate("LocationFinding")
                                }}>
                                <Flex
                                    direction="row"
                                    alignItems="center"
                                    justify="space-between"
                                >
                                    <Text
                                        fontWeight={600}
                                        fontSize="lg"
                                    >
                                        {pickUpPoint}
                                    </Text>
                                    <Icon size='sm' color="black" as={<Ionicons name="ios-chevron-forward" />} />
                                </Flex>
                            </Pressable>
                        </Flex>

                        <Box>
                            <Input
                                placeholder="Note to rider"
                                onChangeText={(e) => setDescription(e)} />
                        </Box>
                    </Box>

                    <Text
                        fontWeight={600}
                        fontSize="xl"
                        color="gray.500"
                        p={4}>
                        Deliver By
                    </Text>

                    <Box
                        bg="white">
                        <Flex
                            alignItems="center"
                            direction="row"
                            p={4}>
                            <Box
                                mr={2}>
                                <Icon size='lg' color="red.500" as={<Ionicons name="time" />} />
                            </Box>
                            <Pressable
                                flex={1}
                                onPress={() => {
                                    navigation.navigate("SetTime")
                                }}>
                                <Flex
                                    direction="row"
                                    alignItems="center"
                                    justify="space-between"
                                >
                                    <Text
                                        fontWeight={600}
                                        fontSize="lg"
                                    >
                                        {moment(deliveryDate).format("h : mm A").toString()}
                                    </Text>
                                    <Icon size='sm' color="black" as={<Ionicons name="ios-chevron-forward" />} />
                                </Flex>
                            </Pressable>
                        </Flex>

                    </Box>
                    <Text
                        fontWeight={600}
                        fontSize="xl"
                        color="gray.500"
                        p={4}>
                        Your Order
                    </Text>

                    {
                        cartItems &&
                        cartItems.map((item: any, index: number) => {
                            return (
                                <CartItem
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
                    flex={1}
                >
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
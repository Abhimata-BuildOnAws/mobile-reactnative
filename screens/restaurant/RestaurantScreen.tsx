import { Ionicons } from '@expo/vector-icons';
import { Box, Center, Flex, Heading, HStack, Icon, Modal, Pressable, ScrollView, Stack, Text } from 'native-base';
import * as React from 'react';
import MapView, { Geojson } from 'react-native-maps';
import MenuItem from '../../components/Menu/MenuItem';
import RestaurantItem from '../../components/Restuarant/RestuarantItem';
import { useSelector } from 'react-redux';
import { selectCount, selectCost } from '../../Redux/features/CartSlice'
import { useQuery } from 'react-query';
import axios from 'axios';

const RestaurantScreen = ({ navigation, route }: any) => {
    const { tumpangId } = route.params;
    const { restaurantId } = route.params;
    const { restaurantName } = route.params;
    const { type } = route.params;
    const count = useSelector(selectCount)
    const cost = useSelector(selectCost)

    const { data, isLoading, error } = useQuery("Get Menu", async () => {
        const { data } = await axios.post("/restaurant/menu", {
            restaurant_id: "7d7280ee-e5b4-4ecc-baaf-d8652b72fcd2"
        })
        return data
    })

    const myPlace = {
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                properties: {},
                geometry: {
                    type: 'Point',
                    coordinates: [64.165329, 48.844287],
                }
            }
        ]
    };

    const array = [1, 2]

    const [tumpangModalVisible, setTumpangModalVisible] = React.useState(true)
    return (
        <Box
            safeArea>
            {
                type === "tumpang" &&
                <Modal isOpen={tumpangModalVisible}>
                    <Modal.Content
                        marginBottom={0}
                        marginTop="auto"
                        pb={0}>
                        <Modal.Header>
                            {restaurantName}
                        </Modal.Header>
                        <Modal.Body>
                            <Flex
                                direction="row"
                                justifyContent="space-between"
                                py={4}>
                                <Pressable
                                    onPress={() => {
                                        setTumpangModalVisible(false)
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
                            <MapView
                                style={{ height: 300 }}
                                // initialRegion={{
                                //     latitude: 37.78825,
                                //     longitude: -122.4324,
                                //     latitudeDelta: 0.0922,
                                //     longitudeDelta: 0.0421,
                                // }}
                                region={{
                                    latitude: 37.78825,
                                    longitude: -122.4324,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421,
                                }}
                            >
                                {/* <Geojson
                                geojson={myPlace}
                                strokeColor="red"
                                fillColor="green"
                                strokeWidth={2} /> */}
                            </MapView>

                            <Box
                                mt={4}
                                mb={2}
                                py={3}
                                px={2}
                                shadow={0}
                                bg="white"
                                rounded="lg">
                                <Stack
                                    space={1}>
                                    <Text
                                        fontSize="xl">
                                        Delivery Time
                                </Text>
                                    <Text>
                                        Fri Jun 26, 12.30pm
                                </Text>
                                    <Text>
                                        15 mins left
                                </Text>
                                </Stack>
                            </Box>
                            <Box
                                my={2}
                                py={3}
                                px={2}
                                shadow={0}
                                bg="white"
                                rounded="lg">
                                <Stack
                                    space={1}>
                                    <Text
                                        fontSize="xl">
                                        Pickup Point
                                </Text>
                                    <Text>
                                        Blk 146, Tampines Ave 5
                                </Text>
                                    <Text>
                                        Void Deck Lift Lobby A
                                </Text>
                                </Stack>
                            </Box>

                            <Pressable
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
                                            Join Tumpang
                                    </Text>
                                    </Center>
                                </Box>
                            </Pressable>
                        </Modal.Body>
                    </Modal.Content>
                </Modal>}

            <Flex
                direction="row"
                justifyContent="space-between"
                py={4}>
                <Pressable
                    onPress={() => {
                        setTumpangModalVisible(false)
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
                <Text
                    fontSize="2xl">
                    {restaurantName}
                </Text>
            </Center>

            <ScrollView
                style={{
                    height: "80%"
                }}>
                {
                    data &&
                    data.map((item: any, index: any) => {
                        return (
                            <MenuItem
                                key={index}
                                name={item.name}
                                price={item.price}
                                description={item.description}
                                id={item.id}
                                restaurantId={restaurantId}
                                type={type}
                            />
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
                            navigation.navigate("CartScreen", { screen: "CartScreen" })
                    }}>
                    <Center>
                        <Text
                            bold
                            fontSize="xl"
                        >
                            View Cart
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
    // const styles = {
    //     top: {
    //       marginBottom: "auto",
    //       marginTop: 0,
    //     },
    //     bottom: {
    //       marginBottom: 0,
    //       marginTop: "auto",
    //     },
    //     left: {
    //       marginLeft: 0,
    //       marginRight: "auto",
    //     },
    //     right: {
    //       marginLeft: "auto",
    //       marginRight: 0,
    //     },
    //     center: {},
    //   }
}

export default RestaurantScreen
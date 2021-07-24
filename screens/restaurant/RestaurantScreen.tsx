import { Ionicons } from '@expo/vector-icons';
import { Box, Center, Flex, Heading, HStack, Icon, Modal, Pressable, ScrollView, Stack, Text } from 'native-base';
import * as React from 'react';
import MapView, { Geojson, Marker } from 'react-native-maps';
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

    const { data: dataMenu, isLoading, error } = useQuery("Get Menu", async () => {
        const { data } = await axios.post("/restaurant/menu", {
            restaurant_id: restaurantId
        })
        return data
    })

    const { data: dataCoord,
            isLoading: isLoadingCoords,
            error: errorCoords } = useQuery("Get Coordinates", async () => {
                const { data: pickUp } = await axios.get("https://us1.locationiq.com/v1/search.php", { 
                    params: { 
                        key: "pk.f591f13c4f66e64c50bd7f431ebd6c22",
                        q: "50d faber heights",
                        country_codes: "sg",
                        format: "json"
                    }
                })
                console.log(pickUp);
                const { data: dropOff } = await axios.get("https://us1.locationiq.com/v1/search.php", { 
                    params: { 
                        key: "pk.f591f13c4f66e64c50bd7f431ebd6c22",
                        q: "tradehub21",
                        country_codes: "sg",
                        format: "json"
                    }
                })
                console.log(dropOff);
                
            })

    const myPlace = {
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                properties: {},
                geometry: {
                    type: "LineString",
                    coordinates: [
                        [
                            103.753134,
                            1.328214
                        ],
                        [
                            103.753191,
                            1.328196
                        ],
                        [
                            103.753141,
                            1.328044
                        ],
                        [
                            103.752978,
                            1.328096
                        ],
                        [
                            103.75231,
                            1.328308
                        ],
                        [
                            103.752294,
                            1.328267
                        ],
                        [
                            103.752275,
                            1.328221
                        ],
                        [
                            103.752221,
                            1.328084
                        ],
                        [
                            103.752144,
                            1.327889
                        ],
                        [
                            103.752153,
                            1.327833
                        ],
                        [
                            103.752177,
                            1.327739
                        ],
                        [
                            103.752197,
                            1.32769
                        ],
                        [
                            103.752212,
                            1.327672
                        ],
                        [
                            103.752245,
                            1.327635
                        ],
                        [
                            103.752319,
                            1.327585
                        ],
                        [
                            103.752411,
                            1.327535
                        ],
                        [
                            103.752632,
                            1.327395
                        ],
                        [
                            103.753695,
                            1.327002
                        ],
                        [
                            103.754632,
                            1.326715
                        ],
                        [
                            103.755571,
                            1.326427
                        ],
                        [
                            103.755871,
                            1.326337
                        ],
                        [
                            103.756986,
                            1.325984
                        ],
                        [
                            103.757103,
                            1.325946
                        ],
                        [
                            103.757266,
                            1.325858
                        ],
                        [
                            103.757424,
                            1.325788
                        ],
                        [
                            103.757618,
                            1.325703
                        ],
                        [
                            103.757839,
                            1.325589
                        ],
                        [
                            103.758151,
                            1.325416
                        ],
                        [
                            103.758467,
                            1.325199
                        ],
                        [
                            103.759119,
                            1.324677
                        ],
                        [
                            103.759789,
                            1.323991
                        ],
                        [
                            103.759966,
                            1.323754
                        ],
                        [
                            103.760653,
                            1.32283
                        ],
                        [
                            103.760837,
                            1.322546
                        ],
                        [
                            103.760942,
                            1.322393
                        ],
                        [
                            103.761103,
                            1.322159
                        ],
                        [
                            103.761436,
                            1.32174
                        ],
                        [
                            103.761647,
                            1.321417
                        ],
                        [
                            103.761774,
                            1.321205
                        ],
                        [
                            103.761953,
                            1.320893
                        ],
                        [
                            103.761934,
                            1.32083
                        ],
                        [
                            103.761909,
                            1.320774
                        ],
                        [
                            103.761874,
                            1.320721
                        ],
                        [
                            103.761842,
                            1.320679
                        ],
                        [
                            103.76157,
                            1.320492
                        ],
                        [
                            103.761343,
                            1.320324
                        ],
                        [
                            103.761312,
                            1.320292
                        ],
                        [
                            103.761142,
                            1.320091
                        ],
                        [
                            103.760885,
                            1.319777
                        ],
                        [
                            103.76056,
                            1.319331
                        ],
                        [
                            103.760514,
                            1.31928
                        ],
                        [
                            103.760513,
                            1.319229
                        ],
                        [
                            103.76034,
                            1.319017
                        ],
                        [
                            103.760306,
                            1.318972
                        ],
                        [
                            103.760261,
                            1.31901
                        ],
                        [
                            103.760243,
                            1.319028
                        ],
                        [
                            103.760196,
                            1.319122
                        ],
                        [
                            103.759655,
                            1.31966
                        ],
                        [
                            103.75861,
                            1.320885
                        ],
                        [
                            103.758438,
                            1.320997
                        ],
                        [
                            103.758334,
                            1.32106
                        ],
                        [
                            103.758256,
                            1.321099
                        ],
                        [
                            103.758144,
                            1.321126
                        ],
                        [
                            103.758025,
                            1.321142
                        ],
                        [
                            103.757895,
                            1.321143
                        ],
                        [
                            103.757743,
                            1.321127
                        ],
                        [
                            103.757474,
                            1.321907
                        ],
                        [
                            103.757337,
                            1.322267
                        ],
                        [
                            103.757236,
                            1.322532
                        ],
                        [
                            103.757144,
                            1.322638
                        ],
                        [
                            103.757144,
                            1.322638
                        ]
                    ],
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
                                region={{
                                    latitude: 1.3226383,
                                    longitude: 103.7571444,
                                    latitudeDelta: 0.01,
                                    longitudeDelta: 0.01
                                }}
                            >
                                <Marker
                                    coordinate={{
                                        latitude: 1.3226383,
                                        longitude: 103.7571444,
                                    }}
                                    identifier={'mk1'}
                                />
                                <Geojson
                                    geojson={myPlace}
                                    strokeColor="red"
                                    fillColor="green"
                                    strokeWidth={2} />
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
                    dataMenu &&
                    dataMenu.data.map((item: any, index: any) => {
                        return (
                            <MenuItem
                                key={index}
                                name={item.attributes.name}
                                price={item.attributes.price}
                                description={item.attributes.description}
                                id={item.attributes.id}
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
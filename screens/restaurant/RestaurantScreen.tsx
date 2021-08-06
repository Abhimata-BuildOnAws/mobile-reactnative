import { Ionicons } from '@expo/vector-icons';
import { Box, Center, Flex, Heading, HStack, Icon, Modal, Pressable, ScrollView, Stack, Text } from 'native-base';
import * as React from 'react';
import MapView, { Geojson, Marker } from 'react-native-maps';
import MenuItem from '../../components/Menu/MenuItem';
import RestaurantItem from '../../components/Restuarant/RestuarantItem';
import { useDispatch, useSelector } from 'react-redux';
import { selectCount, selectCost, clearCart, selectId } from '../../Redux/features/CartSlice'
import { useQuery } from 'react-query';
import axios from 'axios';
import CategoryItem from '../../components/Restuarant/CategoryItem';
import { selectLat, selectLong } from '../../Redux/features/TumpangSlice';

const RestaurantScreen = ({ navigation, route }: any) => {
    const { tumpangId } = route.params;
    const { restaurantId } = route.params;
    const { restaurantName } = route.params;
    const { type } = route.params;
    const { pickUp } = route.params;
    const { description } = route.params;
    const { time } = route.params;
    const { time_left } = route.params;

    const dispatch = useDispatch()
    const count = useSelector(selectCount)
    const cost = useSelector(selectCost)
    const cartId = useSelector(selectId)
    const long = useSelector(selectLong)
    const lat = useSelector(selectLat)

    const [coord, setCoord] = React.useState({})

    React.useEffect(() => {

        // if(type == "tumpang"){
        //     axios.post("/tumpang/route", {
        //         hitch_id: tumpangId
        //     }).then((res) => {
        //         setCoord(res.data)
        //         console.log(res.data);

        //     })

        // }
        if (cartId !== restaurantId)
            dispatch(clearCart({}))
    }, [])

    const { data: dataMenu, isLoading, error } = useQuery("Get Menu", async () => {
        const { data } = await axios.post("/restaurant/menu", {
            restaurant_id: restaurantId
        })
        return data
    })

    const { data: dataCoord,
        isLoading: isLoadingCoords,
        error: errorCoords } = useQuery("Get Coordinates", async () => {
            console.log(tumpangId);

            if (tumpangId) {
                const { data: pickUp } = await axios.post("/tumpang/route", {
                    hitch_id: tumpangId
                })
                return pickUp
            }

        })



    const myPlace = { "type": "FeatureCollection", "features": [{ "bbox": [103.752143, 1.326337, 103.799725, 1.340318], "type": "Feature", "properties": { "segments": [{ "distance": 7423.8, "duration": 939.9, "steps": [{ "distance": 6.6, "duration": 1.2, "type": 11, "instruction": "Head east", "name": "-", "way_points": [0, 1] }, { "distance": 17.7, "duration": 6.4, "type": 1, "instruction": "Turn right", "name": "-", "way_points": [1, 2] }, { "distance": 96.9, "duration": 25.5, "type": 1, "instruction": "Turn right", "name": "-", "way_points": [2, 4] }, { "distance": 50.1, "duration": 21.8, "type": 0, "instruction": "Turn left onto Business Park Drive", "name": "Business Park Drive", "way_points": [4, 9] }, { "distance": 460.9, "duration": 48.3, "type": 12, "instruction": "Keep left", "name": "-", "way_points": [9, 18] }, { "distance": 89.5, "duration": 12.9, "type": 12, "instruction": "Keep left", "name": "-", "way_points": [18, 21] }, { "distance": 969.3, "duration": 126.8, "type": 12, "instruction": "Keep left", "name": "-", "way_points": [21, 52] }, { "distance": 152.4, "duration": 43.4, "type": 6, "instruction": "Continue straight onto Toh Tuck Avenue", "name": "Toh Tuck Avenue", "way_points": [52, 60] }, { "distance": 9.7, "duration": 3.5, "type": 1, "instruction": "Turn right", "name": "-", "way_points": [60, 61] }, { "distance": 223.6, "duration": 36.3, "type": 4, "instruction": "Turn slight left", "name": "-", "way_points": [61, 71] }, { "distance": 1705.1, "duration": 88.8, "type": 13, "instruction": "Keep right", "name": "-", "way_points": [71, 92] }, { "distance": 359.7, "duration": 40.6, "type": 12, "instruction": "Keep left", "name": "-", "way_points": [92, 104] }, { "distance": 197.4, "duration": 39.9, "type": 0, "instruction": "Turn left onto Upper Bukit Timah Road", "name": "Upper Bukit Timah Road", "way_points": [104, 111] }, { "distance": 68.4, "duration": 13.2, "type": 6, "instruction": "Continue straight onto Upper Bukit Timah Road", "name": "Upper Bukit Timah Road", "way_points": [111, 115] }, { "distance": 478.3, "duration": 52.9, "type": 6, "instruction": "Continue straight onto Upper Bukit Timah Road", "name": "Upper Bukit Timah Road", "way_points": [115, 131] }, { "distance": 244.0, "duration": 41.8, "type": 4, "instruction": "Turn slight left onto Dunearn Road", "name": "Dunearn Road", "way_points": [131, 141] }, { "distance": 25.5, "duration": 3.7, "type": 12, "instruction": "Keep left onto Rifle Range Road", "name": "Rifle Range Road", "way_points": [141, 143] }, { "distance": 502.0, "duration": 78.2, "type": 3, "instruction": "Turn sharp right onto Rifle Range Road", "name": "Rifle Range Road", "way_points": [143, 161] }, { "distance": 14.6, "duration": 2.6, "type": 0, "instruction": "Turn left onto Hua Guan Avenue", "name": "Hua Guan Avenue", "way_points": [161, 162] }, { "distance": 317.5, "duration": 45.7, "type": 1, "instruction": "Turn right onto Dunearn Road", "name": "Dunearn Road", "way_points": [162, 168] }, { "distance": 13.3, "duration": 2.4, "type": 1, "instruction": "Turn right onto Jalan Jambu Ayer", "name": "Jalan Jambu Ayer", "way_points": [168, 170] }, { "distance": 1133.2, "duration": 155.7, "type": 0, "instruction": "Turn left onto Dunearn Road", "name": "Dunearn Road", "way_points": [170, 190] }, { "distance": 212.8, "duration": 37.5, "type": 6, "instruction": "Continue straight onto Dunearn Road", "name": "Dunearn Road", "way_points": [190, 198] }, { "distance": 75.1, "duration": 10.8, "type": 0, "instruction": "Turn left onto Jalan Naga Sari", "name": "Jalan Naga Sari", "way_points": [198, 200] }, { "distance": 0.0, "duration": 0.0, "type": 1, "instruction": "Turn right onto Jalan Naga Sari", "name": "Jalan Naga Sari", "way_points": [200, 201] }, { "distance": 0.0, "duration": 0.0, "type": 10, "instruction": "Arrive at Jalan Naga Sari, straight ahead", "name": "-", "way_points": [201, 201] }] }], "summary": { "distance": 7423.8, "duration": 939.9 }, "way_points": [0, 201] }, "geometry": { "coordinates": [[103.753134, 1.328213], [103.753191, 1.328195], [103.753141, 1.328044], [103.752978, 1.328096], [103.75231, 1.328308], [103.752294, 1.328267], [103.752275, 1.32822], [103.752228, 1.328103], [103.752221, 1.328084], [103.752143, 1.327889], [103.752152, 1.327833], [103.752197, 1.327689], [103.752245, 1.327634], [103.752411, 1.327535], [103.752632, 1.327395], [103.753694, 1.327002], [103.754632, 1.326715], [103.75557, 1.326427], [103.755871, 1.326337], [103.756347, 1.326344], [103.756547, 1.32638], [103.756663, 1.32643], [103.757092, 1.326847], [103.757118, 1.327052], [103.757131, 1.327157], [103.757134, 1.327287], [103.757167, 1.327531], [103.757189, 1.327631], [103.757275, 1.328061], [103.757405, 1.328529], [103.757433, 1.328589], [103.757516, 1.328769], [103.757588, 1.328909], [103.758238, 1.329913], [103.75825, 1.329936], [103.758439, 1.330237], [103.758474, 1.33029], [103.75861, 1.330495], [103.758655, 1.330576], [103.758755, 1.330723], [103.758815, 1.330811], [103.759113, 1.33138], [103.759236, 1.331714], [103.759265, 1.331956], [103.759251, 1.332221], [103.75923, 1.332522], [103.759216, 1.332624], [103.759115, 1.333308], [103.759126, 1.333654], [103.759153, 1.333844], [103.759159, 1.333885], [103.759201, 1.334052], [103.759305, 1.334399], [103.759369, 1.334575], [103.759448, 1.334793], [103.759563, 1.335114], [103.759619, 1.33525], [103.75963, 1.335277], [103.759684, 1.335434], [103.759749, 1.33562], [103.759772, 1.335687], [103.759851, 1.335651], [103.759921, 1.335663], [103.760042, 1.335683], [103.760194, 1.33567], [103.760382, 1.335615], [103.760591, 1.335513], [103.76071, 1.335383], [103.760795, 1.335302], [103.760837, 1.335264], [103.761332, 1.334865], [103.76154, 1.334725], [103.763017, 1.333813], [103.763556, 1.333389], [103.764209, 1.333008], [103.764336, 1.33294], [103.764446, 1.332885], [103.76459, 1.332831], [103.765154, 1.332634], [103.765699, 1.33249], [103.766174, 1.33239], [103.766604, 1.332345], [103.767181, 1.332322], [103.768071, 1.332366], [103.768753, 1.332503], [103.769421, 1.33269], [103.769909, 1.33289], [103.770756, 1.333235], [103.771181, 1.333393], [103.772937, 1.334225], [103.773507, 1.334535], [103.774699, 1.335249], [103.77543, 1.335817], [103.775443, 1.335866], [103.775463, 1.335909], [103.775566, 1.336009], [103.775731, 1.33615], [103.775826, 1.336226], [103.776119, 1.336487], [103.77645, 1.336834], [103.776713, 1.33717], [103.776929, 1.337485], [103.777097, 1.337795], [103.777324, 1.338281], [103.777361, 1.338358], [103.77726, 1.338487], [103.776952, 1.338877], [103.776858, 1.338999], [103.776636, 1.339293], [103.776502, 1.339469], [103.776424, 1.339571], [103.776281, 1.339767], [103.776115, 1.340001], [103.77608, 1.34008], [103.776038, 1.340175], [103.776011, 1.34031], [103.776131, 1.340318], [103.776147, 1.340197], [103.776181, 1.340109], [103.776258, 1.339958], [103.776301, 1.339893], [103.776389, 1.339769], [103.776569, 1.339522], [103.776916, 1.339055], [103.777542, 1.338265], [103.777764, 1.338075], [103.777929, 1.337965], [103.778271, 1.337803], [103.778464, 1.337721], [103.778684, 1.33764], [103.778763, 1.337612], [103.779025, 1.337531], [103.779065, 1.337542], [103.779153, 1.337564], [103.779284, 1.337564], [103.779817, 1.33744], [103.780191, 1.337305], [103.780424, 1.337217], [103.780527, 1.337172], [103.780779, 1.33706], [103.780961, 1.33698], [103.781105, 1.336932], [103.781222, 1.336989], [103.781241, 1.337086], [103.781419, 1.336831], [103.78152, 1.336795], [103.781533, 1.336791], [103.781659, 1.336745], [103.781739, 1.336716], [103.782707, 1.336367], [103.782991, 1.336267], [103.783279, 1.336161], [103.783363, 1.336131], [103.783524, 1.336075], [103.783744, 1.335993], [103.783793, 1.335976], [103.783904, 1.335936], [103.784133, 1.335857], [103.784213, 1.335829], [103.784605, 1.335689], [103.785321, 1.335436], [103.785378, 1.335416], [103.785418, 1.335542], [103.785443, 1.335534], [103.78642, 1.335207], [103.786459, 1.335194], [103.787526, 1.334818], [103.78783, 1.334705], [103.788114, 1.3346], [103.788111, 1.334584], [103.788069, 1.334489], [103.788803, 1.334229], [103.789084, 1.334129], [103.78998, 1.333823], [103.790304, 1.333712], [103.791079, 1.333447], [103.79132, 1.333373], [103.793564, 1.332648], [103.793733, 1.33259], [103.794232, 1.332389], [103.79458, 1.332252], [103.79475, 1.332195], [103.79499, 1.332117], [103.795478, 1.331948], [103.795647, 1.331889], [103.795846, 1.331826], [103.795987, 1.331782], [103.796429, 1.331625], [103.796928, 1.331445], [103.797147, 1.331363], [103.797703, 1.331165], [103.797814, 1.331127], [103.79791, 1.33109], [103.79828, 1.330963], [103.798431, 1.330914], [103.798468, 1.330902], [103.798503, 1.330889], [103.798566, 1.330866], [103.799507, 1.330524], [103.799591, 1.330743], [103.799725, 1.331163], [103.799725, 1.331163]], "type": "LineString" } }], "bbox": [103.752143, 1.326337, 103.799725, 1.340318], "metadata": { "attribution": "openrouteservice.org | OpenStreetMap contributors", "service": "routing", "timestamp": 1627715280232, "query": { "coordinates": [[103.7531332, 1.328210449], [103.7997252, 1.331163]], "profile": "driving-car", "format": "json" }, "engine": { "version": "6.6.1", "build_date": "2021-07-05T10:57:48Z", "graph_date": "2021-07-18T10:02:39Z" } } }

    const categories = [
        {
            icon: "beer",
            category: "Alcohol"
        },
        {
            icon: "fast-food",
            category: "Burger"
        },
        {
            icon: "pizza",
            category: "Pizza"
        },
        {
            icon: "beer",
            category: "Alcohol"
        },
        {
            icon: "beer",
            category: "Alcohol"
        },
        {
            icon: "beer",
            category: "Alcohol"
        },
    ]

    const [tumpangModalVisible, setTumpangModalVisible] = React.useState(true)
    return (
        <Box
            safeAreaTop
            flex={1}
        >
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
                                    latitude: lat as number,
                                    longitude: long as number,
                                    latitudeDelta: 0.01,
                                    longitudeDelta: 0.01
                                }}
                            >
                                <Marker
                                    coordinate={{
                                        latitude: lat as number,
                                        longitude: long as number,
                                    }}
                                    identifier={'mk1'}
                                />
                                {dataCoord &&
                                    <Geojson
                                        geojson={dataCoord}
                                        strokeColor="red"
                                        fillColor="green"
                                        strokeWidth={4} />}
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
                                        {time}
                                </Text>
                                    <Text>
                                        {time_left}
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
                                        {pickUp}
                                </Text>
                                    <Text>
                                        {description}
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

            <Box
                height="17%">
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
                <Heading
                    p={4}
                    fontSize="3xl">
                    {restaurantName}
                </Heading>
            </Box>

            <ScrollView
                height="65%">

                <ScrollView
                    horizontal={true}
                    mb={3}>
                    <HStack>
                        {
                            categories &&
                            categories.map((item, index) => {
                                return (
                                    <CategoryItem icon={item.icon} category={item.category} />
                                )
                            })
                        }
                    </HStack>
                </ScrollView>


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
                                photoUrl={item.attributes.image_url}
                            />
                        )
                    })
                }
            </ScrollView>

            <Flex
                direction="row"
                justify="space-around"
                alignItems="center"
                bg="red.300"
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
                            navigation.navigate("CartScreen", { 
                                screen: "CartScreen",
                                tumpangIdIfHave: tumpangId,
                                type: type
                             })
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
import { Ionicons } from '@expo/vector-icons';
import { Box, Center, Flex, Heading, Icon, Modal, Pressable, Stack, Text } from 'native-base';
import * as React from 'react';
import MapView, { Geojson } from 'react-native-maps';

const RestaurantScreen = ({ navigation, route }: any) => {
    const { tumpangId } = route.params;
    const { restaurantId } = route.params;
    // const myPlace = { "type": "FeatureCollection", "features": [{ "bbox": [8.681423, 49.414599, 8.690123, 49.420514], "type": "Feature", "properties": { "segments": [{ "distance": 890.9, "duration": 189.6, "steps": [{ "distance": 1.9, "duration": 0.5, "type": 11, "instruction": "Head west on Gerhart-Hauptmann-Straße", "name": "Gerhart-Hauptmann-Straße", "way_points": [0, 1] }, { "distance": 314, "duration": 75.4, "type": 3, "instruction": "Turn sharp right onto Wielandtstraße", "name": "Wielandtstraße", "way_points": [1, 11] }, { "distance": 251.7, "duration": 36.2, "type": 1, "instruction": "Turn right onto Mönchhofstraße", "name": "Mönchhofstraße", "way_points": [11, 22] }, { "distance": 211.8, "duration": 50.8, "type": 0, "instruction": "Turn left onto Keplerstraße", "name": "Keplerstraße", "way_points": [22, 28] }, { "distance": 109.5, "duration": 26.3, "type": 1, "instruction": "Turn right onto Moltkestraße", "name": "Moltkestraße", "way_points": [28, 31] }, { "distance": 2, "duration": 0.5, "type": 0, "instruction": "Turn left onto Werderplatz", "name": "Werderplatz", "way_points": [31, 32] }, { "distance": 0, "duration": 0, "type": 10, "instruction": "Arrive at Werderplatz, on the right", "name": "-", "way_points": [32, 32] }] }, { "distance": 481.2, "duration": 103, "steps": [{ "distance": 2, "duration": 0.5, "type": 11, "instruction": "Head south on Werderplatz", "name": "Werderplatz", "way_points": [32, 33] }, { "distance": 265.5, "duration": 63.7, "type": 0, "instruction": "Turn left onto Moltkestraße", "name": "Moltkestraße", "way_points": [33, 40] }, { "distance": 83, "duration": 7.5, "type": 0, "instruction": "Turn left onto Handschuhsheimer Landstraße, B 3", "name": "Handschuhsheimer Landstraße, B 3", "way_points": [40, 42] }, { "distance": 130.8, "duration": 31.4, "type": 0, "instruction": "Turn left onto Roonstraße", "name": "Roonstraße", "way_points": [42, 45] }, { "distance": 0, "duration": 0, "type": 10, "instruction": "Arrive at Roonstraße, straight ahead", "name": "-", "way_points": [45, 45] }] }], "summary": { "distance": 1372.1, "duration": 292.6 }, "way_points": [0, 32, 45] }, "geometry": { "coordinates": [[8.681496, 49.414601], [8.68147, 49.414599], [8.681488, 49.41465], [8.681423, 49.415698], [8.681423, 49.415746], [8.681427, 49.415802], [8.681641, 49.416539], [8.681656, 49.41659], [8.681672, 49.416646], [8.681825, 49.417081], [8.681875, 49.417287], [8.681881, 49.417392], [8.682035, 49.417389], [8.682107, 49.41739], [8.682461, 49.417389], [8.682563, 49.417388], [8.682676, 49.417387], [8.682781, 49.417388], [8.683379, 49.41738], [8.683595, 49.417372], [8.683709, 49.417368], [8.685294, 49.417365], [8.685359, 49.417365], [8.68535, 49.41741], [8.685344, 49.417457], [8.685299, 49.417726], [8.685213, 49.41827], [8.68503, 49.419215], [8.685015, 49.419256], [8.685094, 49.419263], [8.686439, 49.419404], [8.68651, 49.419413], [8.686506, 49.41943], [8.68651, 49.419413], [8.687039, 49.419467], [8.6871, 49.419474], [8.687174, 49.419482], [8.688301, 49.419619], [8.688398, 49.41963], [8.690104, 49.419828], [8.690123, 49.419833], [8.689854, 49.420216], [8.689652, 49.420514], [8.68963, 49.42051], [8.688601, 49.420393], [8.687872, 49.420318]], "type": "LineString" } }], "bbox": [8.681423, 49.414599, 8.690123, 49.420514], "metadata": { "attribution": "openrouteservice.org | OpenStreetMap contributors", "service": "routing", "timestamp": 1626239257601, "query": { "coordinates": [[8.681495, 49.41461], [8.686507, 49.41943], [8.687872, 49.420318]], "profile": "driving-car", "format": "geojson" }, "engine": { "version": "6.6.1", "build_date": "2021-07-05T10:57:48Z", "graph_date": "2021-07-05T19:38:13Z" } } }
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

    const [tumpangModalVisible, setTumpangModalVisible] = React.useState(true)
    return (
        <Box
            safeArea>
            <Modal isOpen={tumpangModalVisible}>
                <Modal.Content
                    marginBottom={0}
                    marginTop="auto"
                    pb={0}>
                    <Modal.Header>
                        McDonalds Serene Centre
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
            </Modal>

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
                    McDonald's Serene Center
                </Text>
            </Center>

            
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
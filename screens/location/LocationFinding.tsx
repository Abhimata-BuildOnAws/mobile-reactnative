import { Ionicons } from '@expo/vector-icons';
import { Box, Flex, HStack, Icon, Input, Pressable, ScrollView, Skeleton, Spinner, Stack, Text } from 'native-base';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPickUpPoint, selectPickUpPoint } from '../../Redux/features/TumpangSlice'
import { useDebounce } from 'use-hooks';
import * as Location from 'expo-location';
import axios from 'axios';

const LocationFinding = ({ navigation }: any) => {
    const [currLat, setCurrLat] = React.useState(0)
    const [currLong, setCurrLong] = React.useState(0)
    const pickUpPoint = useSelector(selectPickUpPoint)
    const [value, setValue] = React.useState<string>(pickUpPoint)
    const [locations, setLocations] = React.useState<any[]>([])
    const [loading, setLoading] = React.useState(false)
    // const debounceSearch: string = useDebounce<string>(value, 100000)

    React.useEffect(() => {
        (async () => {
            let location = await Location.getCurrentPositionAsync({});
            setCurrLat(location.coords.latitude)
            setCurrLong(location.coords.longitude)
        }
        )();
    })

    function calcCrow(lat1: number, lon1: number, lat2: number, lon2: number) {
        var R = 6371; // km
        var dLat = toRad(lat2 - lat1);
        var dLon = toRad(lon2 - lon1);
        var lat1 = toRad(lat1);
        var lat2 = toRad(lat2);

        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d;
    }

    // Converts numeric degrees to radians
    function toRad(Value: number) {
        return Value * Math.PI / 180;
    }

    const searchLocation = async (searchValue: string) => {
        setLoading(true)
        const res: any[] = await axios.get("https://us1.locationiq.com/v1/search.php", {
            params: {
                key: "pk.f591f13c4f66e64c50bd7f431ebd6c22",
                q: searchValue,
                countrycodes: "sg",
                format: 'json',
            }
        })
        console.log(res.data);
        let loc = []
        for (let i = 0; i < res.data.length; i++) {
            loc.push(res.data[i])
        }
        setLoading(false)
        setLocations(loc)
    }

    // React.useEffect(() => {
    //     searchLocation(debounceSearch)
    // }, [debounceSearch])

    return (
        <Box>
            <Box
                safeArea
                bg="white">
                <Flex
                    direction="row"
                    justifyContent="space-between">
                    <Pressable
                        onPress={() => {
                            navigation.goBack()
                        }}>
                        <Box
                            p={2}
                            borderRadius={10}>
                            <Icon size='lg' color="black" as={<Ionicons name="ios-chevron-back" />} />
                        </Box>
                    </Pressable>
                </Flex>

                <Flex
                    direction="row"
                    alignItems="center">
                    <Icon mx={2} size='lg' color="red.400" as={<Ionicons name="location" />} />
                    <Input
                        overflow="hidden"
                        onSubmitEditing={() => {
                            searchLocation(value)
                        }}
                        selectTextOnFocus
                        value={value}
                        onChangeText={(e) => {
                            setValue(e)
                        }}
                        size="2xl"
                        variant="unstyled"
                        placeholder="Deliver to?"
                        _light={{
                            placeholderTextColor: "blueGray.400",
                        }}
                        _dark={{
                            placeholderTextColor: "blueGray.50",
                        }}
                    />
                </Flex>
            </Box>
            
            {/* {   locations && 
                <Text
                mx={3}
                mt={2}
                fontSize="lg">
                Locations
            </Text>} */}

            {   loading ?
                <>
                    <Box
                        bg="white"
                        height="100%"
                        px={5}>
                        <Stack my={3}>
                            <Skeleton variant="text" height={6} />
                            <Skeleton my={2} height={6} variant="rect" />
                            {/* <Skeleton my={2} height={6} variant="circle" size={5} /> */}
                        </Stack>
                        <Stack my={3}>
                            <Skeleton variant="text" height={6} />
                            <Skeleton my={2} height={6} variant="rect" />
                            {/* <Skeleton my={2} height={6} variant="circle" size={5} /> */}
                        </Stack>
                        <Stack my={3}>
                            <Skeleton variant="text" height={6} />
                            <Skeleton my={2} height={6} variant="rect" />
                            {/* <Skeleton my={2} height={6} variant="circle" size={5} /> */}
                        </Stack>
                        <Stack my={3}>
                            <Skeleton variant="text" height={6} />
                            <Skeleton my={2} height={6} variant="rect" />
                        </Stack>
                        <Stack my={3}>
                            <Skeleton variant="text" height={6} />
                            <Skeleton my={2} height={6} variant="rect" />
                        </Stack>
                        <Stack my={3}>
                            <Skeleton variant="text" height={6} />
                            <Skeleton my={2} height={6} variant="rect" />
                        </Stack>
                        <Stack my={3}>
                            <Skeleton variant="text" height={6} />
                            <Skeleton my={2} height={6} variant="rect" />
                        </Stack>
                    </Box>
                </>
                :
                <ScrollView>
                    <Box
                        bg="white"
                        mt={5}>
                        {
                            locations &&
                            locations.map((item, index) => {
                                return (
                                    <Box
                                        py={4}
                                        borderBottomWidth={0.5}
                                        borderColor="gray.400">
                                        <Flex
                                            direction="row"
                                            alignItems="center"
                                        >
                                            <Icon mx={2} size='sm' color="black" as={<Ionicons name="compass-outline" />} />
                                            <Box>
                                                <Text>
                                                    {item.display_name.split(",")[0]}
                                                </Text>
                                                <Text
                                                    fontSize="sm"
                                                    mt={0.5}>
                                                    {calcCrow(currLat, currLong, item.lat, item.lon).toFixed(1)},{item.display_name.split(",")[1]},{item.display_name.split(",")[2]},{item.display_name.split(",")[3]}
                                                </Text>
                                            </Box>
                                        </Flex>
                                    </Box>
                                )
                            })
                        }
                    </Box>
                </ScrollView>}
        </Box>
    )
}

export default LocationFinding
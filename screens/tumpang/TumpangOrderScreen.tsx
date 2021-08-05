import * as React from 'react';
import { Box, VStack, Text, Input, Icon, ScrollView, HStack, Flex, Pressable, Spinner, Center } from 'native-base';
import { Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RestaurantItem from '../../components/Restuarant/RestuarantItem';
import { getHitch } from '../../service/tumpang/requests';
import axios from 'axios';
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux';
import { selectLat, selectLong } from '../../Redux/features/TumpangSlice'
import moment from 'moment';

export default function TumpangOrderScreen({ navigation }: any) {
    const user_lat = useSelector(selectLat)
    const user_long = useSelector(selectLong)
    console.log(user_lat);
    console.log(user_long);
    
    const { isLoading, error, data, refetch } = useQuery<any>('retaurants', async () => {
        const { data } = await axios.post("/tumpang/nearby", { 
            user_latitude: user_lat,
            user_longitude: user_long
        })
        return data
    })

    const windowHeight = Dimensions.get('window').height;

    return (
        <ScrollView>
            <Box
                safeArea
                bg="indigo.400"
                minHeight={windowHeight}>
                <VStack
                    pt={16}
                    px={4}>
                    <Text
                        color="white"
                        fontSize={30}
                        bold>
                        Tumpang
                        </Text>
                    <Text
                        color="white"
                        fontSize={20}
                        my={3}>
                        Want to grab a lunch? Worry about carbon footprint? Tumpang!
                        </Text>
                    <Input
                        placeholder="Search"
                        variant="filled"
                        width="100%"
                        bg="white"
                        border={2}
                        borderColor='gray.500'
                        borderRadius={10}
                        py={4}
                        px={2}
                        _web={{
                            _focus: { borderColor: 'muted.300', style: { boxShadow: 'none' } },
                        }}
                        InputLeftElement={<Icon ml={2} size={5} color="gray.400" as={<Ionicons name="ios-search" />} />}
                    />
                </VStack>

                <VStack
                    mt={2}
                    px={3}
                    bg="white"
                    borderTopRadius={20}
                    minHeight="100%">
                    <Flex
                        direction="row"
                        justifyContent="space-between"
                        p={4}>
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

                    {
                        data &&
                        data.data.map((item: any, index: any) => {
                            return (
                                    <RestaurantItem
                                        key={index}
                                        photoUrl="https://picsum.photos/200"
                                        title={item.attributes.restaurant_name}
                                        time_left={moment(item.attributes.submit_time).fromNow()}
                                        num_of_orders={item.attributes.number_of_orders}
                                        genre=""
                                        food_type=""
                                        current_discount={item.attributes.discount}
                                        future_discount={item.attributes.discount + 1}
                                        restaurantId={item.attributes.restaurant_id}
                                        type="tumpang"
                                        tree_point={item.attributes.tree_point}
                                        tumpangId={item.id}
                                        pickUp={item.attributes.pickup}
                                        description={item.attributes.description}
                                        time={moment(item.attributes.submit_time).format('dddd MMM Do h:mm a').toString()}
                                    />
                            )
                        })
                    }
                </VStack>
            </Box>
        </ScrollView>
    )
}


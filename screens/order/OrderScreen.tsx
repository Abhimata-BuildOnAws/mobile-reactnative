import * as React from 'react';
import { Box, VStack, Text, Input, Icon, ScrollView, HStack, Flex, Pressable } from 'native-base';
import { Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RestaurantItem from '../../components/Restuarant/RestuarantItem';
import { useQuery } from 'react-query';
import axios from 'axios';

export default function OrderScreen({ navigation }: any) {

    const windowHeight = Dimensions.get('window').height;

    const { isLoading, error, data, refetch } = useQuery<any>('retaurants', async () => {
        const { data } = await axios.post("/restaurant/browse", {
            coordinates: [1.39084505, 103.7521831]
        })
        return data
    })

    return (
        <ScrollView>
            <Box
                safeArea
                bg="red.400"
                minHeight={windowHeight}>
                <VStack
                    pt={16}
                    px={4}>
                    <Text
                        color="white"
                        fontSize={30}
                        bold>
                        Order
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
                        data.data.map((item, index) => {
                            return (
                                <RestaurantItem
                                    key={index}
                                    photoUrl="https://picsum.photos/200"
                                    title={item.attributes.name}
                                    time_left=""
                                    num_of_orders="Western restaurant serving a variety of tasty food"
                                    genre={item.attributes.street}
                                    food_type=""
                                    current_discount=""
                                    future_discount={4}
                                    restaurantId={item.attributes.id}
                                    type="order"
                                    tree_point={item.attributes.tree_point}
                                    tree_points={item.attributes.tree_points}
                                />
                            )
                        })
                    }
                </VStack>
            </Box>
        </ScrollView>
    )
}


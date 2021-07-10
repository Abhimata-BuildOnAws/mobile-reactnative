import * as React from 'react';
import { Box, VStack, Text, Input, Icon, ScrollView, HStack, Flex, Pressable } from 'native-base';
import { Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RestaurantItem from '../../components/Restuarant/RestuarantItem';

export default function TumpangOrderScreen({ navigation }: any) {

    const windowHeight = Dimensions.get('window').height;
    const restuarants = [
        {
            photoUrl: "https://i.redd.it/p5un8fue8aa71.jpg",
            title: "Conrad Food",
            time_left: "5",
            num_of_orders: 3,
            genre: "Fast Food",
            food_type: "Pizza",
            current_discount: 3,
            future_discount: 5
        },
        {
            photoUrl: "https://i.redd.it/p5un8fue8aa71.jpg",
            title: "Conrad Food",
            time_left: "5",
            num_of_orders: 3,
            genre: "Fast Food",
            food_type: "Pizza",
            current_discount: 3,
            future_discount: 5
        },
        {
            photoUrl: "https://i.redd.it/p5un8fue8aa71.jpg",
            title: "Conrad Food",
            time_left: "5",
            num_of_orders: 3,
            genre: "Fast Food",
            food_type: "Pizza",
            current_discount: 3,
            future_discount: 5
        },
        {
            photoUrl: "https://i.redd.it/p5un8fue8aa71.jpg",
            title: "Conrad Food",
            time_left: "5",
            num_of_orders: 3,
            genre: "Fast Food",
            food_type: "Pizza",
            current_discount: 3,
            future_discount: 5
        },
    ]
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
                        InputLeftElement={<Icon size='sm' ml={2} size={5} color="gray.400" as={<Ionicons name="ios-search" />} />}
                    />
                </VStack>

                <VStack
                    mt={2}
                    px={3}
                    bg="white"
                    borderTopRadius={20}>
                    <Flex
                        direction="row"
                        justifyContent="space-between"
                        p={4}>
                        <Pressable
                        onPress={() =>{
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
                        restuarants &&
                        restuarants.map((item, index) => {
                            return (
                                <RestaurantItem
                                    key={index}
                                    photoUrl={item.photoUrl}
                                    title={item.title}
                                    time_left={item.time_left}
                                    num_of_orders={item.num_of_orders}
                                    genre={item.genre}
                                    food_type={item.food_type}
                                    current_discount={item.current_discount}
                                    future_discount={item.future_discount}
                                />
                            )
                        })
                    }
                </VStack>
            </Box>
        </ScrollView>
    )
}


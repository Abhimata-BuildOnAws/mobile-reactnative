import { Ionicons } from '@expo/vector-icons';
import { Box, Center, Flex, Heading, HStack, Icon, Pressable, ScrollView, Text } from 'native-base';
import { addItem, removeItem, selectCount, selectCost, selectState, selectItems, selectId } from '../../Redux/features/CartSlice'
import { useSelector, useDispatch } from 'react-redux';
import * as React from 'react';
import MenuItem from '../../components/Menu/MenuItem';

const CartScreen = ({ navigation, route }: any) => {
    const cartItems = useSelector(selectItems)
    const restaurantId = useSelector(selectId)
    const count = useSelector(selectCount)
    const cost = useSelector(selectCost)
    console.log(cartItems);

    return (
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
}

export default CartScreen;
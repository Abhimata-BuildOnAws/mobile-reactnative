import { Ionicons } from '@expo/vector-icons';
import { Box, Center, Flex, Heading, Icon, Pressable } from 'native-base';
import { addItem, removeItem, selectCount, selectCost, selectState, selectItems, selectId } from '../../Redux/features/CartSlice'
import { useSelector, useDispatch } from 'react-redux';
import * as React from 'react';
import MenuItem from '../../components/Menu/MenuItem';

const CartScreen = ({ navigation, route }: any) => {
    const cartItems = useSelector(selectItems)
    const restaurantId = useSelector(selectId)
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
                            restaurantId={restaurantId} />
                    )
                })
            }
        </Box>
    )
}

export default CartScreen;
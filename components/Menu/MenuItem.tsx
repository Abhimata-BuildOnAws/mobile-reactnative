import * as React from 'react';
import { Box, Center, Flex, HStack, Icon, Pressable, ScrollView, Stack, Text, VStack, Wrap } from 'native-base'
import { StyleSheet, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { addItem, removeItem, clearItem, selectCount, selectCost, selectState, selectId, selectItems, selectItemCount } from '../../Redux/features/CartSlice'
import { useSelector, useDispatch } from 'react-redux';

const windowWidth = Dimensions.get('window').width;

interface props {
    name: string;
    description: string;
    price: number;
    id: string;
    restaurantId: string;
    cart?: boolean;
}

const MenuItem: React.FC<props> = (props) => {
    const dispatch = useDispatch()
    // const size = useSelector(selectCount)
    const cost = useSelector(selectCost)
    const state = useSelector(selectState)
    const items = useSelector(selectItems)
    const id = useSelector(selectId)

    const size = useSelector(selectItemCount(props.id))
    
    const [count, setCount] = React.useState(size);


    return (
        <Box
            my={3}
            px={5}>
            <Flex
                direction="row"
                justify="space-between">
                <HStack>
                    <Image style={styles.image}
                        source={{
                            uri: "https://www.vegrecipesofindia.com/wp-content/uploads/2020/11/pizza-recipe.jpg",
                        }}
                    />
                    <Box
                        p={2}>
                        <Text
                            bold>
                            {props.name}
                        </Text>
                        <Text
                            my={2}>
                            {props.description}
                        </Text>
                        <Text>
                            ${props.price}
                        </Text>
                    </Box>
                </HStack>

                <HStack
                    alignItems={props.cart ? "flex-start" : "center"}
                    space={3}>
                    {!props.cart ?
                        <>
                            <Pressable
                                mx={1}
                                onPress={() => {
                                    setCount(count + 1)
                                    dispatch(addItem(
                                        {
                                            itemId: props.id,
                                            price: props.price,
                                            restaurantId: props.restaurantId,
                                            name: props.name,
                                            description: props.description,
                                        }
                                    ))
                                }}>
                                <Icon size='sm' color="red" as={<Ionicons name="add-circle-outline" />} />
                            </Pressable>
                            <Text>
                                {
                                    count
                                }
                            </Text>

                            <Pressable
                            mx={1}
                                onPress={() => {
                                    if (count > 0) {
                                        setCount(count - 1)
                                        dispatch(removeItem(
                                            {
                                                itemId: props.id,
                                                price: props.price,
                                            }
                                        ))
                                    }
                                }}>
                                <Icon size='sm' color="red" as={<Ionicons name="remove-circle-outline" />} />
                            </Pressable>
                        </>
                        :
                        <>
                            <Text
                                bold
                                fontSize="xl"
                                mr={6}>
                                x {count}
                            </Text>
                            <Pressable
                                onPress={() => {
                                    dispatch(clearItem({
                                        itemId: props.id,
                                    }))
                                }}>
                                <Icon size='sm' color="red" as={<Ionicons name="close-outline" />} />
                            </Pressable>
                        </>

                    }
                </HStack>
            </Flex>
            <Box>
            </Box>
        </Box>
    )
}

const styles = StyleSheet.create({
    image: {
        // flex: 1,
        // 24 because padding of 3 in native base is 12 pixels
        width: 90,
        height: 90,
        resizeMode: 'cover',
        borderRadius: 20
    }
})

export default MenuItem
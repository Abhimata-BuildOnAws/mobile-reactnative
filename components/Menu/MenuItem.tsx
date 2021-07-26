import * as React from 'react';
import { Box, Center, Flex, HStack, Icon, Pressable, ScrollView, Stack, Text, VStack, Wrap, Modal } from 'native-base'
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
    type: string
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
    const [modalVisible, setModalVisible] = React.useState(false)

    return (
        <>
            <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
                <Modal.Content
                    marginBottom={0}
                    marginTop="auto"
                    pb={0}
                    width="100%">
                    <Modal.Header>
                        {props.name}
                    </Modal.Header>
                    <Modal.Body>
                        <HStack
                            alignItems="center">
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
                                <Icon size='lg' color="gray" as={<Ionicons name="remove-circle-outline" />} />
                            </Pressable>
                            <Text
                                fontSize="xl"
                                mx={2}>
                                {
                                    count
                                }
                            </Text>

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
                                            type: props.type,
                                        }
                                    ))
                                }}>
                                <Icon size='lg' color="red.600" as={<Ionicons name="add-circle" />} />
                            </Pressable>
                        </HStack>
                    </Modal.Body>
                </Modal.Content>
            </Modal>
            <Pressable
                onPress={() => {
                    setModalVisible(true)
                }}>
                <Box
                    my={1}
                    mx={2}
                    px={5}
                    bg="white"
                    p={4}
                    borderRadius={20}>
                    <Flex
                        direction="row"
                        justify="space-between">
                        <HStack>

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
                                                    type: props.type,
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
                        <Image style={styles.image}
                            source={{
                                uri: "https://www.vegrecipesofindia.com/wp-content/uploads/2020/11/pizza-recipe.jpg",
                            }}
                        />
                    </Flex>
                    <Box>
                    </Box>
                </Box>
            </Pressable>
        </>
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
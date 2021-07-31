import * as React from 'react';
import { Box, Center, Flex, HStack, Icon, Pressable, ScrollView, Stack, Text, VStack, Wrap, Modal, Heading } from 'native-base'
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
    type?: string
    cart?: boolean;
}

const MenuItem: React.FC<props> = (props) => {
    const dispatch = useDispatch()
    // const size = useSelector(selectCount)

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

                        <Flex
                            direction="row"
                            justify="space-between"
                            alignItems="center"
                            my={2}>
                            <Heading fontSize="2xl">{props.name}</Heading>

                            <Text
                                fontSize="lg"
                                fontWeight="bold">
                                S$ {props.price}
                            </Text>
                        </Flex>

                    </Modal.Header>
                    <Modal.Body>

                        <HStack
                            alignItems="center"
                            my={2}>

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

                            <Pressable
                                onPress={() => { setModalVisible(false) }}
                                flex={1}
                            >
                                <Box
                                    bg="red.500"
                                    ml={2}
                                    py={4}
                                    borderRadius={5}
                                >
                                    <Center>
                                        <Text
                                            color="white">
                                            Add to cart
                                        </Text>
                                    </Center>
                                </Box>
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
                    px={5}
                    bg="white"
                    p={4}
                    >
                    <Flex
                        direction="row"
                        justify="space-between"
                        alignItems="center">
                        <HStack
                            space={2}
                            alignItems="center">
                            <Box
                                borderWidth={2}
                                py={2}
                                px={3}
                                mr={2}>
                                <Text>
                                    {size}
                                </Text>
                            </Box>
                            <Text
                                bold>
                                {props.name}
                            </Text>
                        </HStack>
                        
                            <Text
                                my={2}
                                color="gray.500"
                            >
                                S$ {props.price * size}
                            </Text>


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
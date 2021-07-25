import { Box, Center, HStack, Modal, Pressable, Text, Image, Heading, Flex } from 'native-base';
import * as React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { setPickUpPoint, selectPickUpPoint } from '../../Redux/features/TumpangSlice'
import { useSelector } from 'react-redux';


interface props {
    handleOpen: (vis: boolean) => void;
    open: boolean;
}


const OrderModal: React.FC<props> = (props) => {
    const pickUpPoint = useSelector(selectPickUpPoint)

    return (
        <>
            <Modal isOpen={props.open}>
                <Modal.Content maxWidth="400px">
                    <Modal.Body>
                        <Center>
                            <Image
                                size={100}
                                alt={"Tag"}
                                source={require('../../assets/images/icons8-tag-48.png')} />
                            <Heading>
                                Set Pickup Point
                        </Heading>
                        </Center>

                        <Flex
                            direction="row"
                            justify="space-between"
                            mt={10}>
                            <Text
                                style={{ 
                                    width: '70%'
                                }}>
                                {pickUpPoint}
                            </Text>
                            <Box>
                                Change
                            </Box>
                        </Flex>

                        <Flex
                            direction="row"
                            justify="space-between"
                            my={3}>
                            <Text
                                style={{ 
                                    width: '70%'
                                }}>
                                91168828
                            </Text>
                            <Box>
                                Change
                            </Box>
                        </Flex>

                        <Flex
                            direction="row"
                            justify="space-between"
                            my={3}>
                            <Text
                                style={{ 
                                    width: '70%'
                                }}>
                                Void Deck of Apple HQ
                            </Text>
                            <Box>
                                Change
                            </Box>
                        </Flex>

                        <HStack
                            space={2}>
                            <Pressable
                                flex={1}
                                onPress={() => {
                                    props.handleOpen(false)
                                    props.handleOrderOpen(true)
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
                                            Confirm Pickup Point
                                        </Text>
                                    </Center>
                                </Box>
                            </Pressable>
                        </HStack>

                    </Modal.Body>
                </Modal.Content>
            </Modal>
        </>
    )
}
export default OrderModal
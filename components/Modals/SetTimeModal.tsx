import { Box, Center, HStack, Modal, Pressable, Text, Image, Heading, VStack, ScrollView } from 'native-base';
import * as React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useDispatch } from 'react-redux';
import { setTDate } from '../../Redux/features/TumpangSlice'
import { useQuery } from 'react-query';
import axios from 'axios';

interface props {
    handleOpen: (vis: boolean) => void;
    open: boolean;
    handleOrderOpen: (vis: boolean) => void;
    lat: number;
    long: number;
    restaurantId: string;
}


const SetTimeModal: React.FC<props> = (props) => {
    const [date, setDate] = React.useState(new Date())
    const dispatch = useDispatch()

    const onChange = (event: Event, date?: Date | undefined) => {
        if (date) {
            setDate(date)
            dispatch(setTDate({
                time: date.toString(),
            }))
        }
    }

    const { isLoading, error, data, refetch } = useQuery<any>("get nearby", async () => {
        const res = await axios.post("/tumpang/nearby/restaurant", {
            user_latitude: props.lat,
            user_longitude: props.long,
            restaurant_id: props.restaurantId,
        })
        console.log(res.data.data);
        return res.data.data
    })

    return (
        <>
            <Modal isOpen={props.open}>
                <Modal.Content maxWidth="400px">
                    <Modal.Body>
                        <Center>
                            <Heading>
                                Hold Up!
                        </Heading>
                        </Center>


                        <VStack
                            mt={6}
                            space={2}>
                            <Text
                                fontSize="lg">
                                There are others near you ordering from this restuarant
                                    </Text>
                            <Text
                                fontSize="lg">
                                Hitch onto their orders to receive discounts and tree points
                                    </Text>
                        </VStack>

                            {/* <Box
                                height={20}>
                                    <ScrollView>
                                        {   data &&
                                            data.map((item, index) => {
                                                return (
                                                    <Box>
                                                        Hello
                                                        <Box>
                                                        Hello
                                                    </Box>
                                                    <Box>
                                                        Hello
                                                    </Box>
                                                    </Box>
                                                    )
                                            })
                                        }
                                    </ScrollView>
                            </Box> */}

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
                                            Join Tumpang
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
export default SetTimeModal
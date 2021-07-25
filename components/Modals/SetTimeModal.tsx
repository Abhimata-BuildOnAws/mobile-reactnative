import { Box, Center, HStack, Modal, Pressable, Text, Image, Heading } from 'native-base';
import * as React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useDispatch } from 'react-redux';
import { setTDate } from '../../Redux/features/TumpangSlice'

interface props {
    handleOpen: (vis: boolean) => void;
    open: boolean;
    handleOrderOpen : (vis: boolean) => void;
}


const SetTimeModal: React.FC<props> = (props) => {
    const [date, setDate] = React.useState(new Date())
    const dispatch = useDispatch()

    const onChange = (event: Event, date?: Date | undefined) => {
        if(date){
        setDate(date)
        dispatch(setTDate({
            time: date.toString(),
        }))
    }
    }

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
                                Set Delivery Time
                        </Heading>
                        </Center>

                        <Center
                            mt={6}>
                                <Text
                                    fontSize="xl">
                                    I want my delivery to be at
                            </Text>

                        </Center>
                        <DateTimePicker
                            value={date}
                            display="spinner"
                            mode="time"
                            onChange={onChange}
                        />
                        <Box>
                        Please note: a minimum of 30 minutes waiting period is required, so that others can join your order 
                        </Box>
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
                                            Confirm Delivery Time
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
import { useNavigation } from '@react-navigation/native';
import { Box, Center, Flex, Heading, HStack, Icon, Image, Pressable, Text } from 'native-base';
import * as React from 'react';
import { setPickUpPoint, selectPickUpPoint, setTDate } from '../../Redux/features/TumpangSlice'
import { useDispatch, useSelector } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';

const SetTime = () => {
    let d1 = new Date()
    const [date, setDate] = React.useState(new Date(d1.getTime() + 30*60000))
    const dispatch = useDispatch()
    const navigation = useNavigation()

    const onChange = (event: Event, date?: Date | undefined) => {
        if (date) {
            setDate(date)
            dispatch(setTDate({
                time: date.toString(),
            }))
        }
    }
    return (
        <Box
            safeArea
            p={4}>
            <Flex
                direction="row"
                justifyContent="space-between">
                <Pressable
                    onPress={() => {
                        navigation.goBack()
                    }}>
                    <Box
                        p={2}
                        borderRadius={10}>
                        <Icon size='lg' color="black" as={<Ionicons name="ios-chevron-back" />} />
                    </Box>
                </Pressable>
            </Flex>
            <Center>
                <Icon size='2xl' color="black" as={<Ionicons name="stopwatch-outline" />} />
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
                        navigation.navigate("SetLocation")
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
        </Box>
    )
}
export default SetTime
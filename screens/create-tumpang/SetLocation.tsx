import { useNavigation } from '@react-navigation/native';
import { Box, Center, Flex, Heading, HStack, Icon, Image, Pressable, Text } from 'native-base';
import * as React from 'react';
import { setPickUpPoint, selectPickUpPoint } from '../../Redux/features/TumpangSlice'
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

const SetLocation = () => {
    const navigation = useNavigation()
    const pickUpPoint = useSelector(selectPickUpPoint)

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
                <Icon size='2xl' color="black" as={<Ionicons name="location-outline" />} />

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
                <Pressable
                    onPress={() => {
                        navigation.navigate("LocationFinding")
                    }}>
                    <Box>
                        Change
                                </Box>
                </Pressable>
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
        </Box>
    )
}
export default SetLocation
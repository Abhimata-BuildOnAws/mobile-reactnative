import { Box, Flex, HStack, Icon, Pressable, Text, VStack } from 'native-base';
import { StyleSheet, Image, Dimensions } from 'react-native';
import * as React from 'react';
import * as RootNavigation from '../../navigation/index';
import RestaurantScreen from '../../screens/restaurant/RestaurantScreen';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

interface RestaurantProps {
    photoUrl: string;
    title: string;
    time_left: string;
    num_of_orders: number;
    genre: string;
    food_type: string;
    current_discount?: number;
    future_discount?: number;
    restaurantId?: string;
    type?: string;
    tree_point: number;
    tree_points: number
    tumpangId?: string
}
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const RestaurantItem: React.FC<RestaurantProps> = (props) => {
    const url = props.photoUrl
    const navigation = useNavigation()

    return (
        <Pressable
            my={2}
            onPress={() => {
                navigation.navigate("RestaurantScreen", {
                    screen: "RestaurantScreen",
                    tumpangId: props.tumpangId,
                    restaurantId: props.restaurantId,
                    restaurantName: props.title,
                    type: props.type
                })
            }}>
            <HStack>
                <Box>
                    <Image style={styles.image}
                        source={{
                            uri: props.photoUrl,
                        }}
                    />
                </Box>
            </HStack>
            <Flex
                direction="row"
                justify="space-between"
                alignItems="center"
            >
                <Text
                    fontSize={30}
                    bold
                    mt={4}>
                    {props.title}
                </Text>

                <Text>
                    {props.time_left}
                </Text>
            </Flex>



            {props.type === "tumpang" ?
                <Flex
                    direction="column"
                    justify="space-between"
                    alignItems="flex-start">
                    {props.num_of_orders &&
                        <HStack>
                            <Text
                                mr={2}>
                                {props.num_of_orders} orders
                        </Text>

                            <Text>
                                {/* {props.genre}{props.food_type} */}
                            </Text>
                        </HStack>}


                    <VStack>
                        <Text
                            bold>
                            Current Discount: {props.current_discount}%
                    </Text>
                        <HStack
                            space={2}
                            alignContent="center">
                            <Icon size='sm' color="green.400" as={<Ionicons name="leaf-outline" />} />
                            <Text
                                bold
                                color="green.500">
                                {props.tree_point}
                            </Text>
                        </HStack>
                    </VStack>

                </Flex>
                :
                <Flex
                    direction="column">
                    <Box>
                        Western restaurant serving a variety of tasty food
                    </Box>
                    <HStack
                        space={2}
                        alignContent="center">
                        <Icon size='sm' color="red.400" as={<Ionicons name="leaf-outline" />} />
                        <Text
                            bold
                            color="red.500">
                            {props.tree_points}
                        </Text>
                    </HStack>
                </Flex>
            }

        </Pressable>
    )
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        // 24 because padding of 3 in native base is 12 pixels
        width: windowWidth - 24,
        height: 300,
        resizeMode: 'cover',
        borderRadius: 20
    }
})
export default RestaurantItem
import { Box, Flex, HStack, Pressable, Text } from 'native-base';
import { StyleSheet, Image, Dimensions } from 'react-native';
import * as React from 'react';
import * as RootNavigation from '../../navigation/index';
import RestaurantScreen from '../../screens/restaurant/RestaurantScreen';
import { useNavigation } from '@react-navigation/native';

interface RestaurantProps {
    photoUrl: string;
    title: string;
    time_left: string;
    num_of_orders: number;
    genre: string;
    food_type: string;
    current_discount?: number;
    future_discount?: number;
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
                console.log("Hello");
                navigation.navigate("RestaurantScreen", {
                    screen: "RestaurantScreen",
                    tumpangId: 123,
                    restaurantId: 321
                })
            }}>
            <HStack>
                <Box>
                    <Image style={styles.image}
                        source={{
                            uri: url,
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
                    my={4}>
                    {props.title}
                </Text>

                <Text>
                    {props.time_left}
                </Text>
            </Flex>

            <Flex
                direction="row"
                justify="space-between"
                alignItems="center">
                <HStack>
                    <Text
                        mr={2}>
                        {props.num_of_orders} orders
                        </Text>

                    <Text>
                        {props.genre} dot {props.food_type}
                    </Text>
                </HStack>

                <HStack>
                    <Text>
                        {props.current_discount} -&gt; {props.future_discount}
                    </Text>
                </HStack>
            </Flex>

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
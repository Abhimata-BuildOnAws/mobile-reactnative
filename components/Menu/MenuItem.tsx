import * as React from 'react';
import { Box, Center, Flex, HStack, Icon, Pressable, Stack, Text, VStack, Wrap } from 'native-base'
import { StyleSheet, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;

const MenuItem = () => {

    const [count, setCount] = React.useState(0);

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
                            Pepperoni
                            </Text>
                        <Text
                            my={2}>
                            Pizza with some perreroni
                            </Text>
                        <Text>
                            $100
                            </Text>
                    </Box>
                </HStack>

                <Flex
                    justify="center"
                    direction="column"
                >
                    <HStack
                        alignItems="center"
                        space={1}>
                        <Pressable
                            onPress={() => {
                                setCount(count + 1)
                            }}>
                            <Icon size='sm' color="red" as={<Ionicons name="add-circle-outline" />} />
                        </Pressable>

                        <Text>
                            {count}
                        </Text>
                        
                        <Pressable
                            onPress={() => {
                                if(count > 0){
                                    setCount(count - 1)
                                }
                            }}>
                            <Icon size='sm' color="red" as={<Ionicons name="remove-circle-outline" />} />
                        </Pressable>
                    </HStack>
                </Flex>
            </Flex>
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
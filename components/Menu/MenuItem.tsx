import * as React from 'react';
import { Box, Center, Flex, HStack, Stack, Text, VStack, Wrap } from 'native-base'
import { StyleSheet, Image, Dimensions } from 'react-native';

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
                    <HStack>
                        <Text>
                            Hello
                        </Text>
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
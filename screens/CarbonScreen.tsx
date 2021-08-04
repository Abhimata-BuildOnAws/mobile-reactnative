import { Ionicons } from '@expo/vector-icons';
import { Box, Flex, Heading, Text, Image, Icon, HStack } from 'native-base';
import * as React from 'react';
import { Dimensions, ImageBackground, Pressable } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;


const CarbonScreen = ({ navigation }: any) => {

    const chartConfig = {
        backgroundColor: "#e26a00",
        backgroundGradientFrom: "rgba(255, 255, 255)",
        // backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "rgba(255, 255, 255)",
        // backgroundGradientToOpacity: 0.5,
        color: (opacity = 0) => `rgba(0, 86, 69)`,
        strokeWidth: 3, // optional, default 3
        barPercentage: 1,
        useShadowColorFromDataset: false,
        fillShadowGradientOpacity: true,
        barRadius: 10
    };


    const data = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
            {
                data: [40, 45, 38, 60, 29, 43]
            }
        ]
    };
    return (
        <Box
            safeAreaTop
            height={windowHeight}
            bg="green.400">
            <Flex
                direction="column"
                justify="space-between"
                height="100%">
                <Box
                    p={8}
                    width="100%">
                    <Heading
                        color="white"
                    >
                        Forest
                        </Heading>
                    <Text
                        color="white"
                        fontWeight={500}>
                        Welcome to your forest! Earn 🌲 to plant more trees and build up your forest
                        </Text>
                    <Image
                        // size={400}
                        width={500}
                        height={280}
                        alt="forest"
                        source={require("../assets/images/forest.png")} />
                </Box>

                <Box
                    bg="white"
                    height="60%"
                    width="100%"
                    pt={5}
                    borderTopRadius={20}>
                    <Flex
                        direction="row"
                        justifyContent="space-between"
                        p={4}>
                        <Pressable
                            onPress={() => {
                                navigation.goBack()
                            }}>
                            <Box
                                bg="gray.100"
                                p={2}
                                borderRadius={10}>
                                <Icon size='sm' color="black" as={<Ionicons name="ios-chevron-back" />} />
                            </Box>
                        </Pressable>

                        <Box
                            bg="gray.100"
                            p={2}
                            borderRadius={10}>
                            <Icon size='sm' color="black" as={<Ionicons name="options-outline" />} />
                        </Box>
                    </Flex>
                    <Flex
                        direction="row"
                        justify="center"
                        bg="white"
                        py={5}
                        width="100%">
                        <BarChart
                            // style={graphStyle}
                            showBarTops={false}
                            withInnerLines={false}
                            withHorizontalLabels={true}

                            data={data}
                            width={windowWidth}
                            height={180}
                            chartConfig={chartConfig}
                            verticalLabelRotation={0}
                        />
                    </Flex>

                    <Box
                        bg="gray.200"
                        height={32}
                        mx={8}
                        borderRadius={10}>

                        <HStack
                            space={2}>
                            <Image
                                mt={3}
                                ml={3}
                                // size={0}
                                width={60}
                                height={90}
                                alt="forest"
                                source={require("../assets/images/plant.png")} />

                            <Box
                                mt={5}
                                ml={2}>
                                <Flex
                                    direction="row"
                                    alignContent="center">
                                    <Text
                                    mt={0}>Offset your carbon now!!</Text>
                                    <Icon size='sm' color="black" as={<Ionicons name="arrow-forward" />} />
                                </Flex>

                                <Text
                                    numberOfLines={2}>
                                    Join us in reducing carbon 
                                </Text>
                                <Text>
                                emmisions
                                </Text>

                                
                                
                            </Box>
                        </HStack>

                    </Box>

                </Box>

            </Flex>

        </Box>
    )
}

export default CarbonScreen
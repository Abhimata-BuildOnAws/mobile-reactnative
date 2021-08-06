import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { Box, Flex, Heading, Text, Image, Icon, HStack, VStack, ScrollView } from 'native-base';
import * as React from 'react';
import { Dimensions, ImageBackground, Pressable } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import Swiper from 'react-native-swiper'
import { Auth } from 'aws-amplify'

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

    const [leaderBoard, setLeaderBoard] = React.useState<any>([])

    const getLeaderBoard = async () => {
        const res = await axios.post("/user/leaderboard", {
            page: 1
        })
        console.log(res.data);

        setLeaderBoard(res.data)
    }

    const [trees, setTrees] = React.useState(0)

    React.useEffect(() => {
        getLeaderBoard();
        Auth.currentAuthenticatedUser().then( async (res) => {
            const user = await axios.post("/user/get_user", {
                user_id: res.username
            })
            setTrees(user.data.tree_points)
        })
    }, [])


    return (
        <Box
            height={windowHeight}>

            <Swiper>
                <Flex
                    direction="column"
                    justify="space-between"
                    height="100%">
                    <Box
                        safeAreaTop
                        p={8}
                        width="100%"
                        bg="green.400">
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
                            source={trees > 0 ?require("../assets/images/forest.png") : require("../assets/images/desolate-wasteland.png")} />
                    </Box>
                    <Box
                        bg="white"
                        height="55%"
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
                                    mt={7}
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

                <Flex
                    direction="column"
                    justify="space-between"
                    height="100%">
                    <Box
                        safeAreaTop
                        p={8}
                        width="100%"
                        bg="blue.500">
                        <Heading
                            color="white"
                        >
                            Leaderboard
                            </Heading>
                        <Text
                            color="white"
                            fontWeight={500}>
                            Join us at saving our environment! One tree at a time.
                            </Text>


                        <Flex
                            direction="row"
                            justify="center"
                            alignItems="flex-end">
                            <Flex
                                direction="column"
                                alignItems="center">
                                <Image
                                    // size={400}
                                    width={100}
                                    height={100}
                                    borderRadius={150 / 2}
                                    alt="forest"
                                    source={{ uri: "https://picsum.photos/200" }} />
                                <Image
                                    alt="position"
                                    mt={-3}
                                    size={7}
                                    source={require("../assets/images/second.png")}
                                />
                                <Text
                                    color="white"
                                    bold>
                                    {leaderBoard && leaderBoard?.[1]?.tree_points}🌲
                                </Text>
                                <Text
                                    color="white"
                                    bold>
                                    {leaderBoard && leaderBoard[1]?.name}
                                </Text>
                            </Flex>
                            <Flex
                                direction="column"
                                alignItems="center">
                                <Image
                                    // size={400}
                                    width={150}
                                    height={150}
                                    borderRadius={150 / 2}
                                    alt="forest"
                                    source={{ uri: "https://picsum.photos/200" }} />
                                <Image
                                    alt="position"
                                    mt={-3}
                                    size={7}
                                    source={require("../assets/images/first.png")}
                                />
                                <Text
                                    color="white"
                                    bold>
                                    {leaderBoard && leaderBoard[0]?.tree_points}🌲
                                </Text>
                                <Text
                                    color="white"
                                    bold>
                                    {leaderBoard && leaderBoard[0]?.name}
                                </Text>
                            </Flex>
                            <Flex
                                direction="column"
                                alignItems="center">
                                <Image
                                    // size={400}
                                    width={100}
                                    height={100}
                                    borderRadius={150 / 2}
                                    alt="forest"
                                    source={{ uri: "https://picsum.photos/200" }} />
                                <Image
                                    alt="position"
                                    mt={-3}
                                    size={7}
                                    source={require("../assets/images/unknown.png")}
                                />
                                <Text
                                    color="white"
                                    bold>
                                    {leaderBoard && leaderBoard[2]?.tree_points}🌲
                                </Text>
                                <Text
                                    color="white"
                                    bold>
                                    {leaderBoard && leaderBoard[2]?.name}
                                </Text>
                            </Flex>

                        </Flex>
                    </Box>

                    <Box
                        bg="white"
                        height="100%"
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

                        <ScrollView>
                            {
                                leaderBoard &&
                                leaderBoard.map((item, index) => {
                                    if (index > 3)
                                        return (
                                            <Flex
                                                direction="row"
                                                width="100%"
                                                p={4}
                                                justify="space-between"
                                                alignItems="center">
                                                <HStack>
                                                    <Image
                                                        // size={400}
                                                        width={81}
                                                        height={81}
                                                        borderRadius={150 / 2}
                                                        alt="forest"
                                                        source={{ uri: "https://picsum.photos/200" }} />
                                                    <VStack
                                                        p={2}>
                                                        <Text>
                                                            {item?.name}
                                                        </Text>
                                                        <Text>
                                                            {index}th place
                                                        </Text>
                                                        <Text>
                                                            {item?.tree_points}🌲
                                                        </Text>
                                                    </VStack>
                                                </HStack>
                                                <Icon size='lg' color="black" as={<Ionicons name="ios-chevron-forward" />} />
                                            </Flex>
                                        )
                                })
                            }
                        </ScrollView>

                    </Box>
                </Flex>
            </Swiper>

            {/* <Box
                bg="white"
                height="55%"
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
                            mt={7}
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

            </Box> */}


        </Box>
    )
}

export default CarbonScreen
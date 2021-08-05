import { Ionicons } from '@expo/vector-icons';
import { Box, Button, Center, Flex, HStack, Icon, Input, Pressable, Text, VStack } from 'native-base';
import * as React from 'react';
import { Auth } from 'aws-amplify';

const Login = ({ navigation }: any) => {
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")

    const signIn = async () => {
        try {
            console.log(email);

            const user = await Auth.signIn(email, password)
            console.log(user);

            navigation.navigate("Home", { screen: "TabOneScreen" })
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Box
            safeAreaTop
            bg="white"
            minHeight="100%">

            <HStack
                mt={5}
                ml={12}
                space={8}>
                <Box
                    borderBottomWidth={1}>
                    <Text
                        bold>
                        Login
                    </Text>
                </Box>

                <Pressable
                    onPress={() => {
                        navigation.navigate("SignUpScreen")
                    }}>
                    <Box>
                        <Text>
                            Sign Up
                        </Text>
                    </Box>
                </Pressable>
            </HStack>

            <Flex
                direction="column"
                justify="space-between"
                height="100%">
                <Box>
                    <Box
                        mt={40}
                        ml={12}>
                        <Text
                            fontSize="6xl"
                            bold>
                            Welcome
                        </Text>
                        <Text
                            fontSize="3xl"
                            bold>
                            to the future
                        </Text>
                    </Box>
                    <Center
                        mt={20}>
                        <Box
                            px={12}
                            py={3}>
                            <Input
                                placeholder="Email or Username"
                                type="email"
                                variant="filled"
                                width="100%"
                                bg="white"
                                borderRadius={0}
                                borderBottomWidth={1}
                                borderBottomColor='gray.500'
                                py={3}
                                px={2}
                                InputLeftElement={<Icon ml={2} size={5} color="gray.400" as={<Ionicons name="mail-outline" />} />}
                                onChangeText={(e) => {
                                    setEmail(e)
                                }}
                            />
                        </Box>
                        <Box
                            px={12}
                            py={3}>
                            <Input
                                placeholder="Password"
                                type="password"
                                variant="filled"
                                width="100%"
                                bg="white"
                                borderRadius={0}
                                borderBottomWidth={1}
                                borderBottomColor='gray.500'
                                py={3}
                                px={2}
                                InputLeftElement={<Icon ml={2} size={5} color="gray.400" as={<Ionicons name="key-outline" />} />}
                                onChangeText={(e) => {
                                    setPassword(e)
                                }}
                            />
                        </Box>
                    </Center>
                </Box>

                <Box>
                    <Flex
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                        px={12}>
                        <Text
                            color="green.600"
                            fontSize="sm">
                            Forgot Password?
                        </Text>
                        <Pressable
                            onPress={() => {
                                signIn()
                            }}>
                            <Box
                                bg="green.600"
                                my={3}
                                px={10}
                                py={3}
                                borderRadius={10}
                            >
                                <Icon size={8} color="white" as={<Ionicons name="arrow-forward" />} />
                            </Box>
                        </Pressable>
                    </Flex>
                    <Box
                        bg="gray.200"
                        height={32}>
                    </Box>
                </Box>
                {/* <Text
                    textAlign="center">
                    Do not have an account?
                    <Pressable
                        onPress={() => {
                            navigation.navigate("SignUpScreen")
                        }}>
                        <Text
                            color="green.500">
                            Register
                        </Text>
                    </Pressable>
                </Text> */}
            </Flex>
        </Box>
    )
}

export default Login
import { Ionicons } from '@expo/vector-icons';
import { Box, Button, Center, Flex, HStack, Icon, Input, Modal, Pressable, Text, VStack } from 'native-base';
import * as React from 'react';
import { Auth } from 'aws-amplify';

const SignUp = ({ navigation }: any) => {
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [passwordAgain, setPasswordAgain] = React.useState("")
    const [address, setAddress] = React.useState("")
    const [name, setName] = React.useState("")
    const [number, setNumber] = React.useState("")
    const [code, setCode] = React.useState("")

    const [confirmCodeModal, setConfirmCodeModal] = React.useState(false)
    const [correctCode, setCorrectCode] = React.useState(true)


    async function signUp() {
        try {
            const { user } = await Auth.signUp({
                username: email,
                password,
                attributes: {
                    email,          // optional
                    // other custom attributes 
                }
            });
        } catch (error) {
            console.log('error signing up:', error);
        }
    }

    async function confirmSignUp() {
        try {
            const res = await Auth.confirmSignUp(email, code);
            console.log(res);
            Auth.currentSession().then(res => {
                console.log(res);
                navigation.navigate("Home")
            })


        } catch (error) {
            setCorrectCode(false)
            console.log('error confirming sign up', error);
        }
    }

    return (
        <>
            <Modal isOpen={confirmCodeModal}>
                <Modal.Content>
                    <Modal.Header>
                        Enter the confirmation code sent to your email
                    </Modal.Header>
                    <Modal.Body>
                        <Box
                            px={12}
                            py={3}>
                            <Input
                                placeholder="Confirmation code"
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
                                onChangeText={(e: any) => {
                                    setCode(e)
                                }}
                            />

                            {
                                !correctCode &&
                                <Box>
                                    Please re-enter the correct code
                                </Box>
                            }

                            <Pressable
                                onPress={() => {
                                    setConfirmCodeModal(false)
                                    // confirmSignUp()
                                    navigation.navigate("Home")
                                }}>
                                <Box
                                    bg="green.600"
                                    my={4}
                                    mx={10}
                                    px={10}
                                    py={3}
                                    borderRadius={10}
                                >
                                    <Text
                                        textAlign="center"
                                        bold
                                        color="white">
                                        Confirm
                                    </Text>
                                </Box>
                            </Pressable>

                        </Box>

                    </Modal.Body>
                </Modal.Content>
            </Modal>
            <Box
                safeAreaTop
                bg="white"
                minHeight="100%">

                <HStack
                    mt={5}
                    ml={12}
                    space={8}>
                    <Pressable
                        onPress={() => {
                            navigation.navigate("LoginScreen")
                        }}>
                        <Box>
                            <Text>
                                Login
                        </Text>
                        </Box>
                    </Pressable>

                    <Box
                        borderBottomWidth={1}>
                        <Text
                            bold>
                            Sign Up
                        </Text>
                    </Box>
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
                                Sign Up
                        </Text>
                            <Text
                                fontSize="3xl"
                                bold>
                                for the future
                        </Text>
                        </Box>
                        <Center
                            mt={20}>
                            <Box
                                px={12}
                                py={3}>
                                <Input
                                    placeholder="Email Address"
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
                                    onChangeText={(e: any) => {
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
                                    onChangeText={(e: any) => {
                                        setPassword(e)
                                    }}
                                />
                            </Box>

                            <Box
                                px={12}
                                py={3}>
                                <Input
                                    placeholder="Re-enter Password"
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
                                    onChangeText={(e: any) => {
                                        setPasswordAgain(e)
                                    }}
                                />
                            </Box>
                        </Center>
                    </Box>

                    <Box>
                        <Flex
                            direction="row"
                            justify="flex-end"
                            alignItems="center"
                            px={12}>

                            <Pressable
                                onPress={() => {
                                    setConfirmCodeModal(true)
                                    signUp()
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
        </>
    )
}

export default SignUp
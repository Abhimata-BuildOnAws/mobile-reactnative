import { Ionicons } from '@expo/vector-icons';
import { Box, Button, Center, Flex, Icon, Input, Pressable, Text, VStack } from 'native-base';
import * as React from 'react';
import { Auth } from 'aws-amplify';

const SignUp = ({ navigation }: any) => {
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [passwordAgain, setPasswordAgain] = React.useState("")
    const [address, setAddress] = React.useState("")
    const [name, setName] = React.useState("")
    const [number, setNumber] = React.useState("")

    async function signUp() {
        try {
            const { user } = await Auth.signUp({
                username: email,
                password,
                attributes: {
                    email,          // optional
                    phone_number: number,   // optional - E.164 number convention
                    // other custom attributes 
                }
            });
            console.log(user);
        } catch (error) {
            console.log('error signing up:', error);
        }
    }

    async function confirmSignUp() {
        try {
          const res = await Auth.confirmSignUp(email, "063280");
          console.log(res);
          Auth.currentSession().then(res=> {
            console.log(res);
          })
          
          
        } catch (error) {
            console.log('error confirming sign up', error);
        }
    }

    return (
        <Box
            safeArea>

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

            <Center
                mt={20}>
                <Text
                    fontSize="2xl"
                    bold>
                    Sign Up
                        </Text>
            </Center>
            <Center
                mt={6}>
                <Box
                    px={12}
                    py={3}>
                    <Input
                        placeholder="Email or Username"
                        type="email"
                        width="100%"
                        bg="white"
                        border={2}
                        borderColor='gray.500'
                        borderRadius={10}
                        py={3}
                        px={2}
                        _web={{
                            _focus: { borderColor: 'muted.300', style: { boxShadow: 'none' } },
                        }}
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
                        width="100%"
                        bg="white"
                        border={2}
                        borderColor='gray.500'
                        borderRadius={10}
                        py={3}
                        px={2}
                        value={password}
                        _web={{
                            _focus: { borderColor: 'muted.300', style: { boxShadow: 'none' } },
                        }}
                        InputLeftElement={<Icon ml={2} size={5} color="gray.400" as={<Ionicons name="key-outline" />} />}
                        onChangeText={(text) => {
                            setPassword(text)
                        }}
                    />
                </Box>

                <Box
                    px={12}
                    py={3}>
                    <Input
                        placeholder="Re-Enter Password"
                        type="password"
                        width="100%"
                        bg="white"
                        border={2}
                        borderColor='gray.500'
                        borderRadius={10}
                        py={3}
                        px={2}
                        _web={{
                            _focus: { borderColor: 'muted.300', style: { boxShadow: 'none' } },
                        }}
                        InputLeftElement={<Icon ml={2} size={5} color="gray.400" as={<Ionicons name="key-outline" />} />}
                        onChangeText={(text) => {
                            setPasswordAgain(text)
                        }}
                    />
                </Box>

                {
                    password != passwordAgain &&
                    <Box>
                        Please same password thanks
                    </Box>
                }

                <Box
                    px={12}
                    py={3}>
                    <Input
                        placeholder="Address"
                        type="text"
                        width="100%"
                        bg="white"
                        border={2}
                        borderColor='gray.500'
                        borderRadius={10}
                        py={3}
                        px={2}
                        _web={{
                            _focus: { borderColor: 'muted.300', style: { boxShadow: 'none' } },
                        }}
                        InputLeftElement={<Icon ml={2} size={5} color="gray.400" as={<Ionicons name="home-outline" />} />}
                        onChangeText={(text) => {
                            setPasswordAgain(text)
                        }}
                    />
                </Box>

                <Box
                    px={12}
                    py={3}>
                    <Input
                        placeholder="Contact Number"
                        type="text"
                        width="100%"
                        bg="white"
                        border={2}
                        borderColor='gray.500'
                        borderRadius={10}
                        py={3}
                        px={2}
                        _web={{
                            _focus: { borderColor: 'muted.300', style: { boxShadow: 'none' } },
                        }}
                        InputLeftElement={<Icon ml={2} size={5} color="gray.400" as={<Ionicons name="call-outline" />} />}
                        onChangeText={(text) => {
                            setPasswordAgain(text)
                        }}
                    />
                </Box>


            </Center>
            <Pressable
                onPress={() => {

                }}>
                <Box
                    bg="green.600"
                    mx={12}
                    my={3}
                    px={12}
                    py={3}
                    borderRadius={10}
                >
                    <Pressable
                        onPress={() => {
                            signUp()
                        }}>
                        <Text
                            textAlign="center"
                            color="white"
                            bold>
                            Sign Up
                        </Text>
                    </Pressable>

                    <Pressable
                        onPress={() => {
                            confirmSignUp()
                        }}>
                        <Text
                            textAlign="center"
                            color="white"
                            bold>
                            Confirm
                        </Text>
                    </Pressable>
                </Box>
            </Pressable>

        </Box>
    )
}

export default SignUp
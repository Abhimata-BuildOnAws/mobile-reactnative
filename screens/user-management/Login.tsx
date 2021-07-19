import { Ionicons } from '@expo/vector-icons';
import { Box, Button, Center, Flex, Icon, Input, Pressable, Text, VStack } from 'native-base';
import * as React from 'react';

const Login = ({ navigation }: any) => {
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")

    return (
        <Box
            safeArea>

            <Center
                mt={56}>
                <Text
                    fontSize="2xl"
                    bold>
                    Tumpang
                        </Text>
                <Text
                    mt={5}
                    fontSize="xl">
                    Sign in to continue
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
                        variant="filled"
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
                        onChange={(e: any) => {
                            setEmail(e.target.name)
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
                        border={2}
                        borderColor='gray.500'
                        borderRadius={10}
                        py={3}
                        px={2}
                        _web={{
                            _focus: { borderColor: 'muted.300', style: { boxShadow: 'none' } },
                        }}
                        InputLeftElement={<Icon ml={2} size={5} color="gray.400" as={<Ionicons name="key-outline" />} />}
                        onChange={(e: any) => {
                            setPassword(e.target.name)
                        }}
                    />
                </Box>


            </Center>
            <Pressable
                onPress={() => {
                    navigation.navigate("Home", {screen: "TabOneScreen"})
                    console.log("hello");
                    
                }}>
                <Box
                    bg="green.600"
                    mx={12}
                    my={3}
                    px={12}
                    py={3}
                    borderRadius={10}
                >
                    <Text
                        textAlign="center"
                        color="white"
                        bold>
                        Sign In
                    </Text>
                </Box>
            </Pressable>

            <Box
                mx={12}
                px={12}
                py={3}
            >
                <Text
                    textAlign="center"
                    color="green.600"
                    fontSize="sm">
                    Forgot Password
                </Text>
            </Box>

            <Text
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
            </Text>
        </Box>
    )
}

export default Login
import * as React from 'react';
import { Dimensions } from 'react-native';
import { Auth } from 'aws-amplify';
import {
  Flex,
  Center,
  Heading,
  Button,
  Box,
  NativeBaseProvider,
  Text,
  Input,
  Icon,
  ScrollView,
  VStack,
  Pressable
} from "native-base"

import EditScreenInfo from '../components/EditScreenInfo';
import { View } from '../components/Themed';
import { Ionicons } from '@expo/vector-icons';

// type Props = {
//   navigation: ProfileScreenNavigationProp;
// };

export default function TabOneScreen({ navigation }: any) {
  const windowHeight = Dimensions.get('window').height;

  React.useEffect(() => {
    Auth.currentSession().then(res => {
      console.log(res);
    })
  })


  const signOut = async () => {
    try {
      await Auth.signOut({ global: true });
    } catch (error) {
      console.log('error signing out: ', error);
    }
  };

  return (
    <Box
      safeArea
      bg="white"
      minHeight={windowHeight}
    >
      <Flex
        direction="row"
        justify="space-between"
        px={6}
        pb={4}
        borderBottomWidth={0.3}
      >
        <Text
          bold>
          Li Ka Shing Library
            </Text>
        <Pressable
          onPress={() => {
            navigation.navigate("Payment", { screen: "Payment" })
          }}>
          <Box>
            <Center>
              Change
              </Center>
          </Box>
        </Pressable>
      </Flex>
      <Box
        mt={4}
        px={8}
        mb={24}>
        <Text
          bold
          fontSize="2xl">
          Afternoon
          </Text>
        <Text
          fontSize="xl"
        >
          Want to grab lunch? Worry about carbon footprint? Tumpang!
          </Text>
      </Box>
      <Box
        px={5}
        py={3}>
        <Input
          placeholder="Search"
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
          InputLeftElement={<Icon ml={2} size={5} color="gray.400" as={<Ionicons name="ios-search" />} />}
        />
      </Box>
      <Box
        mx={4}
      >

        {/* Tumpang card */}
        <Pressable
          onPress={() => {
            navigation.navigate("Tumpang", { screen: "TumpangOrderScreen" })
          }}>
          <Box
            height={200}
            bg='blue.400'
            p={4}
            my={3}
            borderRadius={10}>
            <Flex
              flex={1}
              direction="column"
              justify='flex-end'>
              <Text
                bold
                color='white'>
                Tumpang
              </Text>
              <Text
                color='white'>
                Join an order now
              </Text>
            </Flex>
          </Box>
        </Pressable>

        {/* Carbon card */}
        <Flex
          direction="row"
          justify='center'
        >
          <Pressable
            flex={1}>
            <Box
              height={200}
              bg='blue.400'
              mr={1}
              p={4}
              borderRadius={10}
              flex={1}>
              <Flex
                flex={1}
                direction="column"
                justify='flex-end'>
                <Text
                  bold
                  color='white'>
                  Carbon
                </Text>
                <Text
                  color='white'>
                  Check your carbon footprint
                </Text>
              </Flex>
            </Box>
          </Pressable>

          {/* Order card */}
          <Pressable
            onPress={() => {
              navigation.navigate("Order", { screen: "OrderScreen" })
            }}
            flex={1}>
            <Box
              height={200}
              bg='blue.400'
              ml={1}
              p={4}
              borderRadius={10}
            >
              <Flex
                flex={1}
                direction="column"
                justify='flex-end'>
                <Text
                  bold
                  color='white'>
                  Order
                </Text>
                <Text
                  color='white'>
                  Make your order
                </Text>
              </Flex>
            </Box>
          </Pressable>
        </Flex>
      </Box>


    </Box>
  );
}
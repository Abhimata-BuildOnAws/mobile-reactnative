import * as React from 'react';
import { Dimensions, ImageBackground } from 'react-native';
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
import { useDispatch, useSelector } from 'react-redux';
import * as Location from 'expo-location';
import { setPickUpPoint, selectPickUpPoint, setLatLong } from '../Redux/features/TumpangSlice'
import axios from 'axios';

// type Props = {
//   navigation: ProfileScreenNavigationProp;
// };

export default function TabOneScreen({ navigation }: any) {
  const windowHeight = Dimensions.get('window').height;
  const dispatch = useDispatch();
  const pickUpPoint = useSelector(selectPickUpPoint)

  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log("No good");

        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log(location);
      dispatch(setLatLong({
        lat: location.coords.latitude,
        lon: location.coords.longitude,
      }))
      try {
        const res = await axios.get("https://us1.locationiq.com/v1/reverse.php", {
          params: {
            key: "pk.f591f13c4f66e64c50bd7f431ebd6c22",
            lat: location.coords.latitude,
            lon: location.coords.longitude,
            format: 'json',
          }
        })
        console.log(res.data.display_name);
        dispatch(setPickUpPoint({
          pickUpPoint: res.data.display_name
        }))
      } catch (e) {
        console.log(e);

      }
    })();
  }, [])


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
        pt={6}
        px={6}
        pb={4}
        borderBottomWidth={0.3}
      >
        <Text
          bold
          style={{
            width: '70%'
          }}>
          {pickUpPoint}
        </Text>
        <Pressable
          onPress={() => {
            navigation.navigate("LocationFinding", { screen: "LocationFinding" })
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
        mb={18}>
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
            my={3}
            borderRadius={10}>
            <ImageBackground
              imageStyle={{
                borderRadius: 10,
                opacity: 0.7
              }}
              resizeMode="cover" style={{
                padding: 7,
                flex: 1,
                justifyContent: "center",
              }} source={{ uri: "https://media.istockphoto.com/photos/table-ready-for-dinner-party-picture-id1181197299?k=6&m=1181197299&s=612x612&w=0&h=1nsA709NfDX6ovT2SMGw3eSYrOEu8YV2I1AaeewHap4=" }}>
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
            </ImageBackground>
          </Box>
        </Pressable>

        {/* Carbon card */}
        <Flex
          direction="row"
          justify='center'
        >
          <Pressable
            flex={1}
            onPress={() => {
              navigation.navigate("Carbon")
            }}>
            <Box
              height={200}
              bg='blue.400'
              mr={1}
              borderRadius={10}
              flex={1}>
                <ImageBackground
                imageStyle={{
                  borderRadius: 10,
                  opacity: 0.8
                }}
                resizeMode="cover" style={{
                  padding: 7,
                  flex: 1,
                  justifyContent: "center",
                }} source={{ uri: "https://media.istockphoto.com/photos/aerial-view-of-summer-green-trees-in-forest-in-mountains-picture-id1062459010?k=6&m=1062459010&s=612x612&w=0&h=_QMgN40aeYWXdzMWHhOHdHcqG7IXZkc2_tyRaimIRBU=" }}>
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
              </ImageBackground>
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
              borderRadius={10}
            >
              <ImageBackground
                imageStyle={{
                  borderRadius: 10,
                  opacity: 0.8
                }}
                resizeMode="cover" style={{
                  padding: 7,
                  flex: 1,
                  justifyContent: "center",
                }} source={{ uri: "https://media.istockphoto.com/photos/christmas-or-thanksgiving-turkey-picture-id858959854?k=6&m=858959854&s=612x612&w=0&h=j8EyWN7Z8Yq6YDRjmlknbNj8rDyKh9ahfcYFpOuMl7A=" }}>
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
              </ImageBackground >
            </Box>
          </Pressable>
        </Flex>
      </Box>


    </Box>
  );
}
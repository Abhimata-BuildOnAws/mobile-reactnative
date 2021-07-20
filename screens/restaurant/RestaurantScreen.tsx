import { Box, Text } from 'native-base';
import * as React from 'react';

const RestaurantScreen = ({ navigation, route }: any) => {
    const { id } = route.params;
    return (
        <Box
            safeArea>
            <Text>{id}</Text>
        </Box>
    )
}

export default RestaurantScreen
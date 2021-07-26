import { Ionicons } from '@expo/vector-icons';
import { Box, Center, Icon, Text } from 'native-base';
import * as React from 'react';

interface props {
    icon: string;
    category: string;
}

const CategoryItem: React.FC<props> = (props) => {
    return (
        <Box
            bg="white"
            py={8}
            px={4}
            mx={4}
            width={24}
            borderRadius={10}>
            <Center>
                <Icon mb={2} size='md' color="black" as={<Ionicons name={props.icon} />} />
            </Center>
            <Box>
                <Center>
                    <Text
                        fontWeight={600}
                        fontSize="lg">
                        {props.category}
                    </Text>
                </Center>
            </Box>
        </Box>
    )
}

export default CategoryItem
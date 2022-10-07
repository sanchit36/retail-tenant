import {
  Box,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  List,
  ListItem,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleProperty } from '../data/api';

export default function Details() {
  const { id } = useParams();
  const [property, setProperty] = useState({});

  useEffect(() => {
    const property = getSingleProperty(id);
    if (property) setProperty(property);
    else setProperty({});
  }, [id]);

  return (
    <SimpleGrid
      columns={{ base: 1, lg: 2 }}
      spacing={{ base: 8, md: 10 }}
      py={{ base: 18, md: 24 }}
    >
      <Flex>
        <Image
          rounded={'md'}
          alt={'product image'}
          src={property?.image}
          fit={'cover'}
          align={'center'}
          w={'100%'}
          h={{ base: '100%', sm: '400px', lg: '500px' }}
        />
      </Flex>
      <Stack spacing={{ base: 6, md: 10 }}>
        <Box as={'header'}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
          >
            {property?.propertyType}
          </Heading>
          <Text
            color={useColorModeValue('gray.900', 'gray.400')}
            fontWeight={300}
            fontSize={'2xl'}
          >
            {property.price} USD
          </Text>
        </Box>

        <Stack
          spacing={{ base: 4, sm: 6 }}
          direction={'column'}
          divider={
            <StackDivider
              borderColor={useColorModeValue('gray.200', 'gray.600')}
            />
          }
        >
          <VStack spacing={{ base: 4, sm: 6 }}>
            <Text
              color={useColorModeValue('gray.500', 'gray.400')}
              fontSize={'2xl'}
              fontWeight={'300'}
            >
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore
            </Text>
            <Text fontSize={'lg'}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
              aliquid amet at delectus doloribus dolorum expedita hic, ipsum
              maxime modi nam officiis porro, quae, quisquam quos reprehenderit
              velit? Natus, totam.
            </Text>
          </VStack>
          <Box>
            <Text
              fontSize={{ base: '16px', lg: '18px' }}
              color={useColorModeValue('yellow.500', 'yellow.300')}
              fontWeight={'500'}
              textTransform={'uppercase'}
              mb={'4'}
            >
              Features
            </Text>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
              <List spacing={2}>
                <ListItem>Chronograph</ListItem>
                <ListItem>Master Chronometer Certified</ListItem>{' '}
                <ListItem>Tachymeter</ListItem>
              </List>
              <List spacing={2}>
                <ListItem>Anti‑magnetic</ListItem>
                <ListItem>Chronometer</ListItem>
                <ListItem>Small seconds</ListItem>
              </List>
            </SimpleGrid>
          </Box>
          <Box>
            <Text
              fontSize={{ base: '16px', lg: '18px' }}
              color={useColorModeValue('yellow.500', 'yellow.300')}
              fontWeight={'500'}
              textTransform={'uppercase'}
              mb={'4'}
            >
              Product Details
            </Text>

            <List spacing={2}>
              <ListItem>
                <Text as={'span'} fontWeight={'bold'}>
                  Number of Bedrooms:
                </Text>{' '}
                {property?.bed}
              </ListItem>
              <ListItem>
                <Text as={'span'} fontWeight={'bold'}>
                  Number of Bathrooms:
                </Text>{' '}
                {property?.bathroom}
              </ListItem>
              <ListItem>
                <Text as={'span'} fontWeight={'bold'}>
                  Area:
                </Text>{' '}
                {property?.area}
              </ListItem>
            </List>
          </Box>
        </Stack>

        <Button
          rounded={'none'}
          w={'full'}
          mt={8}
          size={'lg'}
          py={'7'}
          bg={useColorModeValue('gray.900', 'gray.50')}
          color={useColorModeValue('white', 'gray.900')}
          textTransform={'uppercase'}
          _hover={{
            transform: 'translateY(2px)',
            boxShadow: 'lg',
          }}
        >
          Book Now
        </Button>
      </Stack>
    </SimpleGrid>
  );
}

import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export default function Card({ property }) {
  const navigator = useNavigate();
  return (
    <Center
      py={12}
      cursor="pointer"
      onClick={() => navigator(`/property/${property.id}`)}
    >
      <Box
        role={'group'}
        p={6}
        maxW={'330px'}
        w={'full'}
        bg={useColorModeValue('gray.200', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}
      >
        <Box
          rounded={'lg'}
          mt={-12}
          pos={'relative'}
          height={'230px'}
          _after={{
            transition: 'all .3s ease',
            content: '""',
            w: 'full',
            h: 'full',
            pos: 'absolute',
            top: 2,
            left: 1,
            backgroundImage: `url(${property.image})`,
            filter: 'blur(5px)',
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: 'blur(10px)',
            },
          }}
        >
          <Image
            rounded={'lg'}
            height={230}
            width={282}
            objectFit={'cover'}
            src={property.image}
          />
        </Box>
        <Stack pt={10} align={'center'} textAlign="center">
          <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
            {property.propertyType}
          </Text>
          <Heading fontSize={'xl'} fontWeight={500}>
            {property.address}
          </Heading>
          <Stack align={'center'}>
            <Text fontWeight={800} fontSize={'xl'}>
              {property.price}/month
            </Text>
            <Stack direction={'row'} align={'center'}>
              <Text color={'gray.600'}>{property.bed} Beds</Text>
              <Text color={'gray.600'}>{property.bathroom} Bathroom</Text>
              <Text color={'gray.600'}>{property.area}</Text>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
}

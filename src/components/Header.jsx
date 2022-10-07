import { Link } from 'react-router-dom';
import {
  Box,
  Flex,
  useColorModeValue,
  Container,
  Heading,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';

const Header = () => {
  return (
    <Box as="header" bg={useColorModeValue('gray.100', 'gray.900')} mb="5">
      <Container as="nav" maxW="1200px" px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Heading fontSize="xl">
            <Link to="/">Retail Tenant</Link>
          </Heading>

          <ColorModeSwitcher />
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;

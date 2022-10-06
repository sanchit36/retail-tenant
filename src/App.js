import React from 'react';
import { ChakraProvider, Container, theme } from '@chakra-ui/react';
import Header from './components/Header';
import Router from './routes/Router';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Header />
      <Container maxW="1200px" as="main">
        <Router />
      </Container>
    </ChakraProvider>
  );
}

export default App;

import React from 'react';
import {
  ChakraProvider,
} from '@chakra-ui/react';
import theme from './utils/theme';

// Global CSS
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { CreateGuideContextComponent } from './pages/create-guide/context';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <CreateGuideContextComponent>
        <RouterProvider router={router} />
      </CreateGuideContextComponent>
    </ChakraProvider>
  );
}

export default App;

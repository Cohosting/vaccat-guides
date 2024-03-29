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
import { AuthContextComponent } from './context/auth';
import { PropertyContextObject } from './context/property';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <PropertyContextObject>

      <AuthContextComponent>
      <CreateGuideContextComponent>
        <RouterProvider router={router} />
      </CreateGuideContextComponent>
      </AuthContextComponent>
      </PropertyContextObject>

    </ChakraProvider>
  );
}

export default App;

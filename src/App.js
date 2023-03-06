import '@fontsource/public-sans';
import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import Button from '@mui/joy/Button';

const App = () => {
  return (
    <CssVarsProvider>
      <Button variant="solid">Hello World</Button>
    </CssVarsProvider>
  );
};

export default App;

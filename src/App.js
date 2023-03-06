import '@fontsource/public-sans';
import { useState } from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import {
  Button,
  Typography,
  Textarea,
  Grid,
  CssBaseline,
  Stack
} from '@mui/joy';
import Typewriter from 'typewriter-effect';

const App = () => {
  const persona = 'Jesus';
  const [response, setResponse] = useState('');

  console.log('response', response);
  return (
    <CssVarsProvider>
      <CssBaseline />
      <Grid
        container
        spacing={2}
        sx={{ flexGrow: 1, margin: '0 auto', maxWidth: 1111 }}
      >
        <Grid xs={12} sx={{ mb: 11 }}>
          <Typography level="h1" textAlign="center">
            Ask {persona} anything
          </Typography>
        </Grid>
        <Grid xs={6}>
          <Stack spacing={2} alignItems="center">
            <Textarea minRows={2} sx={{ width: 333 }} />
            <Button
              variant="solid"
              sx={{ width: 222 }}
              onClick={() => setResponse('yes I do')}
            >
              Ask
            </Button>
          </Stack>
        </Grid>
        <Grid xs={6}>
          <Typography level="body1">
            <Typewriter
              options={{
                strings: [response],
                autoStart: true
              }}
            />
          </Typography>
        </Grid>
      </Grid>
    </CssVarsProvider>
  );
};

export default App;

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
import { getResponse } from './modules/firebase.js';

const App = () => {
  const persona = 'Jesus';
  const [response, setResponse] = useState('');
  const [prompt, setPrompt] = useState('');
  const [answered, setAnswered] = useState(false);
  const [answering, setAnswering] = useState(false);

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
        <Grid xs={12} md={6}>
          <Stack spacing={2} alignItems="center">
            <Textarea
              minRows={2}
              sx={{ width: 333 }}
              value={prompt}
              onChange={event => setPrompt(event.target.value)}
            />
            {answered ? (
              <Button
                variant="soft"
                sx={{ width: 222 }}
                onClick={async () => {
                  setResponse('');
                  setPrompt('');
                  setAnswered(false);
                  setAnswering(false);
                }}
              >
                Ask a new question
              </Button>
            ) : (
              <Button
                variant="solid"
                sx={{ width: 222 }}
                onClick={async () => {
                  setAnswering(true);
                  const personaResponse = await getResponse(persona, prompt);
                  setResponse(personaResponse.data);
                }}
                disabled={!prompt || answering}
              >
                Ask
              </Button>
            )}
          </Stack>
        </Grid>
        <Grid xs={12} md={6} sx={{ textAlign: 'center', mt: 3 }}>
          {response && (
            <Typewriter
              onInit={typewriter => {
                typewriter
                  .typeString(response)
                  .callFunction(() => setAnswered(true))
                  .start();
              }}
            />
          )}
        </Grid>
      </Grid>
    </CssVarsProvider>
  );
};

export default App;

import '@fontsource/public-sans';
import { useState } from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import {
  Button,
  Typography,
  Textarea,
  Grid,
  CssBaseline,
  Stack,
  Divider,
  IconButton,
  Modal,
  ModalDialog,
  Alert
} from '@mui/joy';
import { Info } from '@mui/icons-material';
import Typewriter from 'typewriter-effect';
import { getResponse } from './modules/firebase.js';

const App = () => {
  const persona = 'Jesus';
  const [response, setResponse] = useState('');
  const [prompt, setPrompt] = useState('');
  const [answered, setAnswered] = useState(false);
  const [answering, setAnswering] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <CssVarsProvider>
      <CssBaseline />
      <Grid
        container
        spacing={2}
        sx={{ flexGrow: 1, margin: '0 auto', maxWidth: 1111 }}
      >
        <Grid xs={12} sx={{ mb: 11, mt: 3 }}>
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
              autoFocus
              disabled={answering}
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
      <Divider
        component="div"
        role="presentation"
        sx={{ mt: 22, maxWidth: 1111, mx: 'auto' }}
      >
        <Stack direction="row">
          <IconButton variant="plain" onClick={() => setShowModal(true)}>
            <Info />
          </IconButton>
          <Button
            href="https://golightlyplus.com"
            component="a"
            variant="plain"
            target="_blank"
          >
            © Golightly+ {new Date().getFullYear()}
          </Button>
        </Stack>
      </Divider>
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <ModalDialog layout="center" size="lg" variant="soft">
          <Alert>
            This is an AI simulation of a persona. It is intended to be for
            entertainment purposes only. Although we hope you find it useful too
            😊
          </Alert>
        </ModalDialog>
      </Modal>
    </CssVarsProvider>
  );
};

export default App;

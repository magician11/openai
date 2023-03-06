import { initializeApp } from 'firebase/app';
import {
  getFunctions,
  connectFunctionsEmulator,
  httpsCallable
} from 'firebase/functions';

const app = initializeApp({
  apiKey: 'AIzaSyDBI9x0xvXgQpimGJdtJNwQ0pcFZQelVhc',
  authDomain: 'openai-1111.firebaseapp.com',
  projectId: 'openai-1111',
  storageBucket: 'openai-1111.appspot.com',
  messagingSenderId: '161322896136',
  appId: '1:161322896136:web:139fc313c5231aa63ebabd',
  measurementId: 'G-M9ZNJX9GMY'
});

const functions = getFunctions(app);
if (process.env.NODE_ENV === 'development') {
  connectFunctionsEmulator(functions, 'localhost', 5001);
}

const getResponse = async (persona, prompt) => {
  const personaResponse = httpsCallable(functions, 'personaResponse');
  const response = await personaResponse({ persona, prompt });
  return response;
};

export { getResponse };

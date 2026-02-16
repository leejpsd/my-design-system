import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@my/design-system';
import '@my/design-system/styles';
import { App } from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultMode="light">
      <App />
    </ThemeProvider>
  </StrictMode>,
);

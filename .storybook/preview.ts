import type { Preview } from '@storybook/react-vite';
import theme from './theme';
import '../src/tokens/themes/light.css';
import '../src/tokens/themes/dark.css';

const preview: Preview = {
  parameters: {
    docs: {
      theme,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
    layout: 'centered',
  },
};

export default preview;

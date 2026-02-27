import type { Preview } from '@storybook/react-vite';
import theme from './theme';
import '../packages/tokens/src/themes/light.css';
import '../packages/tokens/src/themes/dark.css';

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

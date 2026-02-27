import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dirname =
  typeof __dirname !== 'undefined'
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), dts({ tsconfigPath: './tsconfig.json' })],
  build: {
    lib: {
      entry: path.resolve(dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'cjs'}`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', '@my/tokens'],
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        exports: 'named',
      },
    },
  },
});

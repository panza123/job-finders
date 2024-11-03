import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  root: '.',                   // Specifies the root directory where index.html is located
  build: {
    outDir: 'dist',            // Output directory for the build (relative to the root)
    emptyOutDir: true,         // Clears the output directory before each build
  }
});

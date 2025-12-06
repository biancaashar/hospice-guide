import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/the-hospice-guide/', // <-- your GitHub repo name
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src', // optional, points '@' to your src folder
    },
  },
});



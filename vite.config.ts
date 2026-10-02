import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  base: './',
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'video-fallback-mime',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url && req.url.includes('/_videos/v1/f0c78f536d5f21a047fb7792723a36f9d647daa1')) {
            const filePath = path.resolve(__dirname, 'public/_videos/v1/f0c78f536d5f21a047fb7792723a36f9d647daa1.mp4');
            if (fs.existsSync(filePath)) {
              res.setHeader('Content-Type', 'video/mp4');
              const stat = fs.statSync(filePath);
              res.setHeader('Content-Length', stat.size);
              fs.createReadStream(filePath).pipe(res);
              return;
            }
          }
          next();
        });
      },
    },
  ],
});

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr' //Vite plugin to transform SVGs into React components.

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr()
  ],
  // base: './'
  resolve: {
    alias: [
      { find: '~', replacement: '/src' } //thay the ralative path thanh xu ly ~/ (absolute) cho no gon gang.
    ]
  },
  base: '/trello-web/'
})

import { defineConfig, loadEnv } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'



// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return{
    plugins: [svelte(), tailwindcss()],
    resolve:{
      alias:{
        "@assets":path.resolve(__dirname,"./src/components" ),
        "@lib":path.resolve(__dirname, "./src/lib"),
        "@data":path.resolve(__dirname, "./src/data"),
        "@store":path.resolve(__dirname, "./src/store"),
        "@service":path.resolve(__dirname, "./src/service"),
      },

    },
    test: {
      environment: 'jsdom',
    },
    server:{
      host: true,
      port: 3000,
      allowedHosts: env.VITE_ALLOWED_HOSTS ? 
      env.VITE_ALLOWED_HOSTS.split(',') 
      : 
      []
    }
  };
  
})

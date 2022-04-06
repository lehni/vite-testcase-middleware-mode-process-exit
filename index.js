import { defineConfig, createServer } from 'vite'
import express from 'express'

const config = defineConfig({
  root: './public',
  base: '/',
  mode: 'development',
  server: {
    middlewareMode: 'html'
  }
})
  
process.once('SIGTERM', async () => {
  console.log(`#1: received SIGTERM, sleeping for 1s. After sleep, a 2nd console message  should appear, starting with '#2:'`)
  await sleep(1000)
  // This code will never be reached, since vite is handling SIGTERM internally
  // and will call `process.exit(0)` in that handler. It should not do so in
  // middleware mode. 
  console.log(`#2: Slept for for 1s, terminating process. NOTE: This message never apepars because vite already killed the process.`)
  process.exit(0)
})

const vite = await createServer(config)

const app = express()
app.use(vite.middlewares)

app.listen(3000, () => {
  console.log('Server running at: http://localhost:3000. Use text-editor to change ./index.js, which will trigger node-dev to send SIGTERM and restart the server.')
})

const sleep = timeout => new Promise(resolve => setTimeout(resolve, timeout))
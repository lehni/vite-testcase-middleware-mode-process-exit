# vite-testcase-middleware-mode-process-exit

```sh
npm install
npm start
```

* Use text-editor to change `./index.js`, which will trigger `node-dev` to send
  `SIGTERM` and restart the server.
* See how the console logs the message:

  ```
  #1: received SIGTERM, sleeping for 1s. After sleep, a 2nd console message  should appear, starting with '#2:'
  ```

* But before the console can log the 2nd message, vite kills the process internally. It should not do so in middleware mode:

  ```
  #2: Slept for for 1s, terminating process. NOTE: This message never apepars because vite already killed the process.
  ```

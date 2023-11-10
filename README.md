# free editor CV

## Local Usage

Just run in two separete terminals

```sh
npm run dev:client
```

```sh
npm run dev:server
```

Navigate to `http://localhost:3000`, edit the textarea and press _Generate_ button.
If the server is up and running, you should now have a not disable _Open_ button. Click it to visualize the _PDF_ in browser.

## Terminal Usage

Clone the repo to your machine and install dependencies

Then create a `.txt` file in `server/locale/templates/` or modify an existing one.

Finally, run

```sh
npm run dev:locale
```

The filename will be prompt. The relative _PDF_ file will be generated and located in `server/locale/outputs/`.

## TODO

- When a new pdf is added to tmp, a job waits for 10 minutes, than cancels it
- Set a limit to existent pdf in tmp
- create get, that needs the randomly generated id.

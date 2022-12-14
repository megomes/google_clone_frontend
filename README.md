# Google Clone Frontend

![Vue.js](https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Quasar](https://img.shields.io/badge/Quasar-16B7FB?style=for-the-badge&logo=quasar&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![ElasticSearch](https://img.shields.io/badge/-ElasticSearch-005571?style=for-the-badge&logo=elasticsearch)

`google-clone-frontend`

A Google clone that searches for Wikipedia Articles based on a Terminal simulation

[![image](./src/assets/printscreen.jpg)](https://google-clone-frontend.vercel.app/#/)

# Frontend

## How to Run

Access the website deployed: [Link to Website](https://google-clone-frontend.vercel.app/#/)

Or deploy locally:

### Install the dependencies

```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
npx quasar dev
```

## "Backend" (Vercel Serverless Functions)

To learn more about the "backend", follow the
[backend repository](https://github.com/megomes/google_clone_backend_node)

# Contribute

## Add more commands

The CommandController implements a [Command Pattern](https://refactoring.guru/design-patterns/command).

To create more commands, create a new `_____Command.ts` inside the [`./src/models/Commands`](./src/models/Commands/) folder following the [`Terminal Command Abstract Class`](./src/models/TerminalCommandAbstract.ts) implementing these main objects/functions:

```ts
function execute(): void { }

function break(): void { }

config: CommandConfig = {
  title: 'TITLE',
  description: 'DESCRIPTION',
  usage: ['CMD [OPTIONS] <QUERY>'],
  options: [
    {
      minified: 'MINIFIED OPTION',
      normal: 'NORMAL OPTION',
      description: 'OPTION DESCRIPTION',
      default: 'DEFAULT VALUE',
      type: CommandTypes.TYPE,
      required: REQUIRED,
    },
  ],
};

```

And add this new command on `./src/models/CommandsFactory.ts` commands array:

```typescript
static commands: { [k: string]: any } = {
    [...]
    echo: EchoCommand,
    clear: ClearCommand,
    ____: _____________
  };

```

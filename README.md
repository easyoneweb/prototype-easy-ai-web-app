# Easy-AI frontend web application
## Configured for development with VSCODE. Eslint, prettier and vscode settings configuration are included

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build
```

Locally preview production build:

```bash
# npm
npm run preview
```

## Environment variables

Application is using environment variables. You have to define:
- NODE_ENV (development or production)
- PORT (on which the server will run locally)
- API_SERVER (Easy AI Server application's REST API address)

You can define all needed variables in .env file in root folder of this application.

## Additional information

Easy-AI-Web-App is built on NuxtJS (^3). Please, before proceed be sure to check official documentation on corresponding technology.

# Copyright

EasyOneWeb LLC 2020 - 2025. All rights reserved. See LICENSE.md for licensing and usage information.
# Are you human?

A simple app to force the user to prove s/he isn't a robot in case of wrong email and/or password entry.

No database is connected to the app. Here, we are only checking for one specific user:

```javascript
exports.USER = {
  email: "test@test.com",
  password: "test",
};
```

## Installation

Both server and the frontend React app can be installed with one command:

```node
npm run setup
```

## Development

To start the app in development environment, use the command below:

```node
npm run dev
```

## Build

React app build files can be created from the root folder with the command below:

```node
npm run build
```

## Start

To start the server after building the frontend, use the command below:

```node
npm run server
```

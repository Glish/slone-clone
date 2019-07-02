# slone-clone

A simple slack clone with React

### Structure / Tech

The application is spit into two key parts:

- Node and Socket.io Server located under **server/**
- React App (using create-react app as a base), located under **client/**

Client and Server compile seperately, but both use Babel to allow for ES6+ syntax.

### Installation / run development

##### Server

```sh
$ cd server
$ npm install
$ npm start
```

##### Client

```sh
$ cd client
$ npm install
$ npm start
```

##### Client Tests

```sh
$ cd client
$ npm run test
```


A boiler template to demonstrate basic stuffs to build a web app.
For example, auth page, list view, detail view, CRUD, and so on.

# What's in it?

Yarn, Babel, ESLint, Husky, Express, MongoDB, Webpack, React, HMR, Redux, Fetch, React Router, Material UI

# Requirements

- mongodb

# Getting started

```
: make sure mongodb is running
mongod

yarn
yarn start

# on an another window
yarn dev:wds
```

# Demo user

```
id: kindle
pw: kindle
```

written in `src/server/init-db.js`

# Production

```
yarn prod:build
yarn prod:start

# keep running in background until stop explicitly
yarn prod:stop
```

# Lint

```
yarn lint
```

# Thanks to

- [rafaelhz/react-material-admin-template](https://github.com/rafaelhz/react-material-admin-template)
- [verekia/js-stack-from-scratch](https://github.com/verekia/js-stack-from-scratch)

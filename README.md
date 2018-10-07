# Html-pdf-converter

This is a Node.js (express) rest api server that implements phantom-html-to-pdf converter.

## Pre-reqs

To build and run this app locally you will need Node.js

Install [Node.js](https://nodejs.org/en/)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Installing

Install npm packages

```
npm i
```

Create a .env file in root, see .env.example on how to configure it

```
touch .env
```

### Running

| Npm Script | Description |
| ------------------------- | ------------------------------------------------------------------------------------------------- |
| `start`                   | Starts the application in production mode                                                         | 
| `build`                   | Runs clean then it runs build tasks                                                               |
| `serve`                   | Starts app by running build:run in watch mode with nodemon                                        |
| `build:run`               | Runs build but then it also starts the app in development mode                                    |
| `test`                    | Coming soon                                                                                       |
| `watch-test`              | Coming soon                                                                                       |
| `clean`                   | Deletes dist folder                                                                               |


Run the application

```
npm run serve
```

### Runing tests

Coming soon, no tests written at this stage

## Deployment

Deployment script coming soon

## Authors

* **Mathias Rahikainen** - [Matteeh](https://github.com/matteeh)
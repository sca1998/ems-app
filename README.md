# COMP3322 Event Management System Frontend

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Prerequisites

You will need [Node.js](https://nodejs.org/en/) v12.16.3 LTS installed on your system.

[Yarn](https://classic.yarnpkg.com/en/) is the recommended package manager.

## Installation

In project root run in terminal:

```
yarn install
```

This will install all neccessary dependencies to run the react application.

## Project setup

In project root, create a `.env` file (notice the dot at the start), put in the following line and save:

```
REACT_APP_API_BASEURL=http://localhost:8000
```

You may replace `http://localhost:8000` with another endpoint if your server instance runs elsewhere.

## Special libraries

As required in specification, here are the list of special libraries included:

### Axios

>Replacing Fetch API with better syntax and default headers management. See [axios](https://github.com/axios/axios#readme).

### react-router-dom

>Simple routing in React app. See [react-router](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom#readme).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

# App

## Description
The app (client-side component of our application) serves as the user interface and interaction layer. It is responsible for delivering a seamless and intuitive user experience, allowing users to interact with our services and access their data efficiently. From user authentication and data input to dynamic content display.

## Install

INSTALLING ALL DEPENDENCIES
```sh
$ npm install
```

VITE
```sh
$ npm create vite
```

Plugins in Vite.confing,js (optimizeDeps, build)

REACT-ROUTER-DOM
```sh
$ npm i react-router-dom
```

COM
```sh
$ npm i file:../com
```

TAILWIND
```sh
$ npm install -D tailwindcss postcss autoprefixer
```
To work with Tailwind CSS in VITE intall all three dependencies.

### Additional files
To work with Tailwind CSS in VITE you also have to create this two files (tailwind.config.js, postcss.config.js) and add the configuration existing in the tailwind official page.

## Run APP

Dev - for running app
```sh
$ npm run dev
```
Dev-reset - for upating changes in dependencies
```sh
$ npm run dev-reset
```
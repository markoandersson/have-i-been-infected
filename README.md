# Have I been infected?

This is a small hobby project for me to try out XState and Tailwind CSS.

It models the measurement process as a state machine allowing for example timed state transfers easily from measurement to analyze states.

UI uses just HTML + custom Javascript as it's so simple that there is no point of having any UI frameworks such as React or Vue.

## Stack

- [XState](https://xstate.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Parcel](https://parceljs.org/)

## Running

Run local development server

1. `npm install`
1. `npm run dev`

You can run the project easily inside a container by using VSCode [Remote container -plugin](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers).

Build package and deploy it to S3

1. `npm run build`
1. `npm run deploy`
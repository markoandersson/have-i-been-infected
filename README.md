# Have I been infected?

Try it out: [https://haveibeeninfected.markoandersson.info/](https://haveibeeninfected.markoandersson.info/)


This is a small hobby project for me to try out XState, Tailwind CSS and CSS animations.

It models the measurement process as a state machine allowing for example timed state transfers easily from measurement to analyze states.

UI uses just HTML + ~~custom Javascript as it's so simple that there is no point of having any UI frameworks such as React or Vue.~~ AlpineJS to manage visibility of the HTML elements. The implementation is much clearer and more maintainable.

## Stack

- [XState](https://xstate.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Parcel](https://parceljs.org/)
- [Alpine JS](https://github.com/alpinejs/alpine)

## Running

Run local development server

1. `npm install`
1. `npm run dev`

You can run the project easily inside a container by using VSCode [Remote container -plugin](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers).

Build package and deploy it to S3

1. `npm run build`
1. `npm run deploy`
# MedikoHoGent
**HoGent graduation thesis:**
### Cross-platform application with Vue, Quasar and NestJs

This thesis aims to answer the question of whether a software development method based on using single source code in JavaScript/TypeScript and publication across multiple platforms can produce a reliable working application. This method could be very useful for developers whose code can also be published as standalone applications. The technologies used will include: Quasar, Vue, NestJS, Electron and Cordova.

### Language
Used language is [TypeScript](https://www.typescriptlang.org/) on both: frontend and backend.

## Client application
Client is a [Vue.Js](https://vuejs.org/) based [Quasar](https://quasar.dev) application. We save data in local storage.
The application can be build for desktop (Windws, Linux & macOS) with [Electron](https://www.electronjs.org/) and for mobile (Android & iOS) with [Cordova](https://cordova.apache.org/)

### Domain
Client domain model is described by the diagram below:
![Client Domain Model Diagram](./doc/img/client-dmd.webp "domain model diagram")

### Synchronisation
Synchronization is achieved by using the [Nest.JS](https://nestjs.com/) server and [MySQL](https://www.mysql.com/) database on the backend side.


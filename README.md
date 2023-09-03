# all-in-one

[![deploy-backend](https://github.com/rodinhatokay/all-in-one/actions/workflows/deploy-backend.yml/badge.svg)](https://github.com/rodinhatokay/all-in-one/actions/workflows/deploy-backend.yml) [![deploy-manifests](https://github.com/rodinhatokay/all-in-one/actions/workflows/deploy-manifests.yml/badge.svg)](https://github.com/rodinhatokay/all-in-one/actions/workflows/deploy-manifests.yml) [![deploy-web-expo](https://github.com/rodinhatokay/all-in-one/actions/workflows/deploy-web-expo.yml/badge.svg)](https://github.com/rodinhatokay/all-in-one/actions/workflows/deploy-web-expo.yml) [![eas-update](https://github.com/rodinhatokay/all-in-one/actions/workflows/eas-update.yml/badge.svg)](https://github.com/rodinhatokay/all-in-one/actions/workflows/eas-update.yml)

Welcome to our Business Directory! This platform is tailored to simplify the process of finding local businesses. With this intuitive directory, users can effortlessly locate businesses, view their opening hours, and directly call them or send messages via WhatsApp. The app is designed to integrate seamlessly with your phone's calling function and WhatsApp, ensuring that all communications are efficient and straightforward. Dive in and explore the numerous businesses our directory has to offer!

## Prerequisites:

Before you begin, ensure you have the following installed:

1. **Git:** To clone and work with this repository.
2. **Docker:** Required for the `aio-back` local setup and production deployment.
3. **Node.js and npm:** For running various scripts and packages.
4. **Expo CLI:** For working with the `aio-front` mobile app.
5. **Kubernetes (Optional):** If you're planning to deploy using the k8s configurations in the `infra` folder.

## Basic Knowledge:

If you wish to contribute to the codebase, a solid understanding of the following is necessary:

1. **Git and GitHub:** Version control and collaborative features.
2. **NestJS:** For backend contributions.
3. **Expo(React Native):** For frontend mobile/web contributions.
4. **Docker:** For building and deploying the backend.
5. **Kubernetes (k8s):** Basics of Kubernetes if you're working with the `infra` folder.

## Folder Structure:

- `.github`: Contains GitHub actions workflow.
- `aio-back`: Contains a NestJS backend with a Dockerfile for production. Utilize the docker-compose for setting up the database locally.
- `aio-front`: This is the Expo React Native mobile app that also supports web rendering.
- `form-business`: A temporary web app that can be run locally. It provides a user interface to submit business forms into production or locally.
- `infra`: Contains core infrastructure configurations for Kubernetes (k8s).
- `screen-shot-mockups`: Screenshots of the mobile app, primarily for App Store and Google Play.
- `supportURL`: A support page, a requirement by Google Play.
- `termsOfUse`: This folder houses a PDF file converted to an HTML file, simplifying the serving of terms of use.

## Recommended Extensions:

For a better development experience, we recommend the following extensions to VS Code:

1. [**Prettier**](https://prettier.io/): Code formatter to ensure consistent coding styles.
2. [**GitLens**](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens): Enhances the Git capabilities of Visual Studio Code.
3. [**GitHub Extension for Visual Studio Code**](https://github.com/microsoft/vscode): Integrate GitHub directly into your editor.

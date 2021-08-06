# ReactNative App
App built for Web, Android & iOS based on expo's React Native

## General comments
This app was built using expo
- expo init Appxxx

## To have in mind
- Use yarn as the default package manager:
    - yarn install
    - yarn start

## Install dependencies/packages
- If it's the first time you run the app, use:
    - yarn install
- If not, you can update the packages by using:
    - yarn update

## Using Firebase
- yarn add @react-native-firebase/app

## Run app
To run your project, navigate to the directory and run one of the following yarn commands.
- cd react-native-course
- yarn start (This will open browser where you may decide to open iOS, Android or web)
- If you want to run directly a platform then:
    - yarn android
    - yarn ios # requires an iOS device or macOS for access to an iOS simulator
    - yarn web

## Deploy
- expo build:android
- expo build:ios (Needs to be done from a MAC computer)
- expo build:web (Generates a web-build folder)
    - You can run a local server via: npx serve web-build
    - Or upload it to a cloud server via: https://docs.expo.io/distribution/publishing-websites/

## Firebase hosting for web-build
- firebase login
- firebase init
    - Select hosting
    - Use and existing project
        - Appxxx
    - Use as your public directory? web-build
    - Configure as a single-page app? y
    - Automatic build with github? N
    - If asks for overwrite "web-build" folder? N
- firebase deploy --only hosting:production
- firebase deploy --only hosting:develop

## Bugs/Errors prevent
- When send a new post to save image and returns a timer warning ("long period of time")
    - Go to the "react-native" module Timer core:
        - node_modules/react-native/Libraries/Core/Timers/JSTimers.js
        - Change the property "MAX_TIMER_DURATION_MS" like this:
        - const MAX_TIMER_DURATION_MS = 10000 * 10000;

# Database & storage
- All data & files are storage under a Firebase project called "Appxxx"
    - There is an existing project called "Appxxx" that is currently deprecated.

# Stores (PlayStore & AppStore)
- Into the Play Store (Console) there are one applications:
    - com.company.appxxx (This is the current version)
- Access & permissions:
    - The TI area manages the accesses and permissions to the stores admin site.

# Extra information
## Android
- Fingerprint:
    - The debug.keystore is on the root project's folder
    - keytool -list -v -keystore debug.keystore
    - SHA-1 debug: 34:F8:C4:0E:36:83:17:68:DB:D2:36:E3:9E:27:23:60:F0:9C:0B:85
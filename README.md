# Anime Quotes PWA

This app has 2 Feeds. 1 Feed shows random quotes from popular anime. Quote can be liked/remembered and will be stored in the 2nd feed called "Favorite"-feed. Quotes can be shared and stored.

Push Notification for quote of the day. To execute Push notification, use Push Button and copy Subscription JSON from console. Use that JSON in https://web-push-codelab.glitch.me/.

App can change theme across tabs/windows.

App uses https://animechan.vercel.app/ for fetching quotes. Request limited to 100 per hour.

## Demo 
https://pwa-project-anime-quotes.herokuapp.com/ 

## Homework Checklist

- [x] App should work offline, App caches necessary files to run app offline, user can view favorite quotes offline, also offline feed is cached
- [x] Cache: Demonstrate at least one cache strategy, App creates caches and can migrate, App caches offline-feed and files, images, ...
- [x] Messaging: Demonstrate communication between SW and windows/tabs, App can change theme across tabs/windows
- [x] Installation: Deffer Installation Prompt, initiate with button
- [x] Push: Request permission with button and with own UI before native one. At least show in console a message when push is received
- [x] Add as much other APIs as you want: Web-Share-API, Web-Storage-API, ...
- [x] UI does not matter, bad UI check!
- [x] Due date until exam

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

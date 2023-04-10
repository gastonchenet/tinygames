start cmd /c yarn translate
start cmd /c .\stripe.exe listen --forward-to localhost:2000/webhook
yarn install && yarn start
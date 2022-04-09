# coronaTrack

A simple application which fetches data from Ministry of Health and Family Welfare of India and displays metric over the React website. The data is available statewise.

## Tech stack

Backend is bulit on Node and Express.

Frontend is built on React.

No DB, data is stored in a single json file for now.

## Key points to note:

- Frontend app is built without CRA
- Added custom Webpack configs
- It updates the data in a file every day and doesn't fetch data on every client side request.
- Added custom service worker which caches the bundle on client side
- Experimented a bit with css styles (design may not be upto the mark though)
- Tried to make the app responsive for mobile and web
- Visualised data with India's interactive svg

Thanks for stopping by! Let me know your suggestions and feedback!
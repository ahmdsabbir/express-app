import routes from './routes';

const express = require('express');

const app = express()
const port = 3000

app.use('/api', routes);

app.listen(port, () => {
    console.log(`listening on port: ${port}`)
})
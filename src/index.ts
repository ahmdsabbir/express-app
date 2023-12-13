import routes from './routes';
import { AppDataSource } from './database/DataSource';

import dotenv from 'dotenv';
dotenv.config();

const express = require('express');

const app = express()
const port = 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

AppDataSource.initialize()
    .then(() => {
        console.log('Postgres connected')
    })
    .catch((error: Error) => {
        console.error('Error postgres initialization : ', error);
    })

app.listen(port, () => {
    console.log(`Server istening on port: ${port}`)
})
const express = require('express');

import {Request, Response } from 'express';

const app = express()
const port = 3000

let count = 0

app.get('/', (req: Request, res: Response) => {
    count ++;
    res.status(200).json({
        'message': `Page ${req.url} has been visited ${count} times`
    })
} )

app.listen(port, () => {
    console.log(`listening on port: ${port}`)
})
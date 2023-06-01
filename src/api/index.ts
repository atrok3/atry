require('dotenv').config();

import express from 'express';
import cors from 'cors';
import * as path from 'path';
import handler from './handler';


const port = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cors());

app.post('/api', handler);

app.use(express.static("public"));

/*
  app.get('/*', async function (req, res) {
    res.sendFile(path.join(__dirname, '../../public', 'index.html'));
  });
*/

module.exports = app.listen(port, () => console.log(`Listening on port: ${port}`));

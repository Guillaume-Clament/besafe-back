const express = require('express');
require('dotenv').config();
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

const utilisateursRouter = require('./routes/utilisateurs.js');
app.use('/utilisateurs', utilisateursRouter);

// app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening on port ${port}`));

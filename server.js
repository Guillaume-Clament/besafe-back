const express = require('express');
require('dotenv').config();
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

// router d'Utilisateur
const utilisateursRouter = require('./routes/utilisateursController.js');
app.use('/utilisateurs', utilisateursRouter);

// router d'Alerte
const alertesRouter = require('./routes/alertesController.js');
app.use('/alertes', alertesRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}`));

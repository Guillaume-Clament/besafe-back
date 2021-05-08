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

// router de Message
const messagesRouter = require('./routes/messagesController.js');
app.use('/messages', messagesRouter);

// router de Trajet
const trajetsRouter = require('./routes/trajetsController.js');
app.use('/trajets', trajetsRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}`));

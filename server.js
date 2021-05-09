const express = require('express');
require('dotenv').config();
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

// routeur d'Utilisateur
const utilisateursRouteur = require('./routes/utilisateursController.js');
app.use('/utilisateurs', utilisateursRouteur);

// routeur d'Alerte
const alertesRouteur = require('./routes/alertesController.js');
app.use('/alertes', alertesRouteur);

// routeur de Groupe
const groupesRouteur = require('./routes/groupesController.js');
app.use('/alertes', groupesRouteur);


// router de Message
const messagesRouter = require('./routes/messagesController.js');
app.use('/messages', messagesRouter);

// router de Trajet
const trajetsRouter = require('./routes/trajetsController.js');
app.use('/trajets', trajetsRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}`));

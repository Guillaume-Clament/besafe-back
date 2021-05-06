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


app.listen(port, () => console.log(`Example app listening on port ${port}`));

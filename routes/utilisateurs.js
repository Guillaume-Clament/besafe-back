const express = require('express');
const app = express.Router();
const Utilisateur = require('../models/utilisateur.js');
const firebase = require('../configurations/db');
const firestore = firebase.firestore();

// Pour éviter des erreurs
app.all('*', function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	res.header(
		'Access-Control-Allow-Methods',
		'GET, POST, PUT, DELETE, OPTIONS'
	);
	next();
});

// Get all
app.get('/', async (req, res) => {
	try {
		const utilisateurs = await firestore.collection('utilisateurs');
		const data = await utilisateurs.get();
		var usersArray = [];
		if (data.emty) {
			res.status(404).send('No users found');
		} else {
			usersArray = utilisateur.listerUtilisateurs(data, usersArray);
			res.status(200).json(usersArray);
			console.log(usersArray);
		}
	} catch (error) {
		res.status(500).send(error.message);
	}
});

// Create
app.post('/', async (req, res) => {
	try {
		const data = req.body;
		await firestore.collection('utilisateurs').doc().set(data);
		res.status(201).json(data);
	} catch (error) {
		res.status(400).send(error.message);
	}
});

module.exports = app;

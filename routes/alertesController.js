const express = require('express');
const app = express.Router();
const Alerte = require('../models/alerte.js');
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
		const alertes = await firestore.collection('alertes');
		const data = await alertes.get();
		var alertesArray = [];
		if (data.empty) {
			res.status(404).send('No alerts found');
		} else {
			data.forEach(doc => {
				const alerte = new Alerte(doc.id, doc.data().typeAlerte);
				alertesArray.push(alerte);
			});
			res.status(200).json(alertesArray);
		}
	} catch (error) {
		res.status(500).send(error.message);
	}
});

//Get one
app.get('/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const alertes = await firestore.collection('alertes').doc(id);
		const data = await alertes.get();
		if (!data.exists) {
			res.status(404).json('Alert not found');
		} else {
			alerte = new Alerte(data.id, data.data().typeAlerte);
			res.status(200).json(alerte);
		}
	} catch (error) {
		res.send(error.message);
	}
});

// Create
app.post('/', async (req, res) => {
	try {
		const data = req.body;
		await firestore.collection('alertes').doc().set(data);
		res.status(201).json(data);
	} catch (error) {
		res.status(400).send(error.message);
	}
});

// Update
app.put('/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const data = req.body;
		const alertes = await firestore.collection('alertes').doc(id);
		const doc = await alertes.get();
		if (!doc.exists) {
			res.status(404).json('Alerte not found');
		} else {
			await alertes.update(data);
			res.status(201).json('Alerte mis à jour successfuly');
		}
	} catch (error) {
		res.status(400).send(error.message);
	}
});

// Delete
app.delete('/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const alertes = await firestore.collection('alertes').doc(id);
		const data = await alertes.get();
		if (!data.exists) {
			res.status(404).json('Alerte not found');
		} else {
			await firestore.collection('alertes').doc(id).delete();
			res.status(200).json('Alerte supprimé successfuly');
		}
	} catch (error) {
		res.status(400).send(error.message);
	}
});

module.exports = app;

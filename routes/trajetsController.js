const express = require('express');
const app = express.Router();
const Trajet = require('../models/trajet.js');
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
		const trajets = await firestore.collection('trajets');
		const data = await trajets.get();
		var trajetsArray = [];
		if (data.empty) {
			res.status(404).send('No trajets found');
		} else {
			data.forEach(doc => {
				const trajet = new Trajet(
					doc.id,
					doc.data().adresseDepart,
					doc.data().tempsEstime,
					doc.data().horodatageDebut,
					doc.data().horodatageFin,
					doc.data().choixValidation
				);
				trajetsArray.push(trajet);
			});
			res.status(200).json(trajetsArray);
		}
	} catch (error) {
		res.status(500).send(error.message);
	}
});

//Get one
app.get('/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const trajet = await firestore.collection('trajets').doc(id);
		const data = await trajet.get();
		if (!data.exists) {
			res.status(404).json('Trajet not found');
		} else {
			trajet = new Trajet(
				doc.id,
                doc.data().adresseDepart,
                doc.data().tempsEstime,
                doc.data().horodatageDebut,
                doc.data().horodatageFin,
                doc.data().choixValidation
			);
			res.status(200).json(trajet);
		}
	} catch (error) {
		res.send(error.message);
	}
});

// Create
app.post('/', async (req, res) => {
	try {
		const data = req.body;
		await firestore.collection('trajets').doc().set(data);
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
		const trajet = await firestore.collection('trajets').doc(id);
		const doc = await trajet.get();
		if (!doc.exists) {
			res.status(404).json('Trajet not found');
		} else {
			await trajet.update(data);
			res.status(201).json('Trajet mis à jour successfuly');
		}
	} catch (error) {
		res.status(400).send(error.message);
	}
});

// Delete
app.delete('/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const trajet = await firestore.collection('trajets').doc(id);
		const data = await trajet.get();
		if (!data.exists) {
			res.status(404).json('Trajet not found');
		} else {
			await firestore.collection('trajets').doc(id).delete();
			res.status(200).json('Trajet supprimé successfuly');
		}
	} catch (error) {
		res.status(400).send(error.message);
	}
});

module.exports = app;

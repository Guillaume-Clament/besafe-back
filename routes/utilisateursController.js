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
			data.forEach(doc => {
				const utilisateur = new Utilisateur(
					doc.id,
					doc.data().nom,
					doc.data().dateNaissance,
					doc.data().password,
					doc.data().email,
					doc.data().date
				);
				usersArray.push(utilisateur);
			});
			res.status(200).json(usersArray);
		}
	} catch (error) {
		res.status(500).send(error.message);
	}
});

//Get one
app.get('/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const user = await firestore.collection('utilisateurs').doc(id);
		const data = await user.get();
		if (!data.exists) {
			res.status(404).json('Utilisateur not found');
		} else {
			utilisateur = new Utilisateur(
				data.id,
				data.data().nom,
				data.data().dateNaissance,
				data.data().password,
				data.data().email,
				data.data().date
			);
			res.status(200).json(utilisateur);
		}
	} catch (error) {
		res.send(error.message);
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

// Update
app.put('/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const data = req.body;
		const user = await firestore.collection('utilisateurs').doc(id);
		const doc = await user.get();
		if (!doc.exists) {
			res.status(404).json('Utilisateur not found');
		} else {
			console.log(user);
			await user.update(data);
			res.status(201).json('Utilisateur mis à jour successfuly');
		}
	} catch (error) {
		res.status(400).send(error.message);
	}
});

// Delete
app.delete('/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const user = await firestore.collection('utilisateurs').doc(id);
		const data = await user.get();
		if (!data.exists) {
			res.status(404).json('Utilisateur not found');
		} else {
			await firestore.collection('utilisateurs').doc(id).delete();
			res.status(200).json('Utilisateur supprimé successfuly');
		}
	} catch (error) {
		res.status(400).send(error.message);
	}
});

module.exports = app;

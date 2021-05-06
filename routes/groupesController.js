const express = require('express');
const app = express.Router();
const Groupe = require('../models/groupe.js');
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
		const groupes = await firestore.collection('groupes');
		const data = await groupes.get();
		var groupesArray = [];
		if (data.empty) {
			res.status(404).send('No alerts found');
		} else {
			data.forEach(doc => {
				const groupe = new Groupe(
					doc.data().id,
					doc.data().nom,
					doc.data().photo,
					doc.data().listeUtilisateurs,
					doc.data().listeMessages,
					doc.data().listeAdmin
				);
				usersArray.push(groupe);
			});
			res.status(200).json(groupesArray);
		}
	} catch (error) {
		res.status(500).send(error.message);
	}
});

//Get one
app.get('/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const groupes = await firestore.collection('groupes').doc(id);
		const data = await groupes.get();
		if (!data.exists) {
			res.status(404).json('Group not found');
		} else {
			groupe = new Groupe(data.id, data.data().typeGroupe);
			res.status(200).json(groupe);
		}
	} catch (error) {
		res.send(error.message);
	}
});

// Create
app.post('/', async (req, res) => {
	try {
		const data = req.body;
		await firestore.collection('groupes').doc().set(data);
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
		const groupes = await firestore.collection('groupes').doc(id);
		const doc = await groupes.get();
		if (!doc.exists) {
			res.status(404).json('Group not found');
		} else {
			await groupes.update(data);
			res.status(201).json('Group updated successfuly');
		}
	} catch (error) {
		res.status(400).send(error.message);
	}
});

// Delete
app.delete('/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const groupes = await firestore.collection('groupes').doc(id);
		const data = await groupes.get();
		if (!data.exists) {
			res.status(404).json('Group not found');
		} else {
			await firestore.collection('groupes').doc(id).delete();
			res.status(200).json('Group deleted successfully');
		}
	} catch (error) {
		res.status(400).send(error.message);
	}
});

module.exports = app;

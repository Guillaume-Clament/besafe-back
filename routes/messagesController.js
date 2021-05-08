const express = require('express');
const app = express.Router();
const Message = require('../models/message.js');
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
		const messages = await firestore.collection('messages');
		const data = await messages.get();
		var messagesArray = [];
		if (data.empty) {
			res.status(404).send('No message found');
		} else {
			data.forEach(doc => {
				const message = new Message(
					doc.id,
					doc.data().contenu,
					doc.data().idEmetteur,
					doc.data().idRecepteur
				);
				messagesArray.push(message);
			});
			res.status(200).json(messagesArray);
		}
	} catch (error) {
		res.status(500).send(error.message);
	}
});

//Get one
app.get('/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const message = await firestore.collection('messages').doc(id);
		const data = await message.get();
		if (!data.exists) {
			res.status(404).json('Message not found');
		} else {
			message = new Message(
				data.id,
				data.data().contenu,
				data.data().idEmetteur,
				data.data().idRecepteur
			);
			res.status(200).json(message);
		}
	} catch (error) {
		res.send(error.message);
	}
});

// Create
app.post('/', async (req, res) => {
	try {
		const data = req.body;
		await firestore.collection('messages').doc().set(data);
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
		const message = await firestore.collection('messages').doc(id);
		const doc = await message.get();
		if (!doc.exists) {
			res.status(404).json('Message not found');
		} else {
			await message.update(data);
			res.status(201).json('Message mis à jour successfuly');
		}
	} catch (error) {
		res.status(400).send(error.message);
	}
});

// Delete
app.delete('/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const message = await firestore.collection('messages').doc(id);
		const data = await message.get();
		if (!data.exists) {
			res.status(404).json('Message not found');
		} else {
			await firestore.collection('messages').doc(id).delete();
			res.status(200).json('Message supprimé successfuly');
		}
	} catch (error) {
		res.status(400).send(error.message);
	}
});

module.exports = app;


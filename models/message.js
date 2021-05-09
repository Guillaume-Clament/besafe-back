// Constructeur des messages
class Message {
	constructor(id, contenu, idEmetteur, idRecepteur) {
		this.id = id;
        this.contenu = contenu;
        this.idEmetteur = idEmetteur;
        this.idRecepteur = idRecepteur;
	}
}

module.exports = Message;

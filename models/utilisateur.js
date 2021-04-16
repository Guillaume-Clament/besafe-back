// Constructeur des utilisateurs
class Utilisateur {
	constructor(id, nom, dateNaissance, password, email, date) {
		this.id = id;
		this.nom = nom;
		this.dateNaissance = dateNaissance;
		this.password = password;
		this.email = email;
		this.date = new Date();
	}
}

module.exports = Utilisateur;

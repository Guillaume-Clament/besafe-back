// Constructeur des utilisateurs
class Utilisateur {
	constructor(nom, dateNaissance, password, email, date) {
		this.nom = nom;
		this.dateNaissance = dateNaissance;
		this.password = password;
		this.email = email;
		this.date = new Date();
	}
}

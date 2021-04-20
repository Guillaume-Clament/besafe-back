// Constructeur des utilisateurs
class Utilisateur {
	constructor(
		idUtilisateur,
		pseudo,
		mdp,
		nom,
		prenom,
		email,
		dateNaissance,
		numTel,
		latitude,
		longitude,
		faceId,
		photo,
		adresseDomicile
	) {
		this.idUtilisateur = idUtilisateur;
		this.pseudo = pseudo;
		this.mdp = mdp;
		this.nom = nom;
		this.prenom = prenom;
		this.email = email;
		this.dateNaissance = dateNaissance;
		this.numTel = numTel;
		this.latitude = latitude;
		this.longitude = longitude;
		this.faceId = faceId;
		this.photo = photo;
		this.adresseDomicile = adresseDomicile;
	}
}

module.exports = Utilisateur;

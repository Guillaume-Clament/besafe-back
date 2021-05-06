// Constructeur des groupes
class Groupe {
	constructor(
		idGroupe,
        nom,
        photo,
        listeUtilisateurs,
        listeMessages,
        listeAdmin
	) {
		this.idGroupe = idGroupe;
        this.nom = nom;
        this.photo = photo;
        this.listeUtilisateurs = listeUtilisateurs;
        this.listeMessages = listeMessages;
        this.listeAdmin = listeAdmin;
	}
}

module.exports = Groupe;

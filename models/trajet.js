// Constructeur des trajets
class Trajet {
	constructor(id, adresseDepart, adresseArrivee, tempsEstime, horodatageDebut, horodatageFin, choixValidation) {
		this.id = id;
        this.adresseDepart = adresseDepart;
        this.tempsEstime = tempsEstime;
        this.horodatageDebut = horodatageDebut;
        this.horodatageFin = horodatageFin;
        this.choixValidation = choixValidation;
	}
}

module.exports = Trajet;

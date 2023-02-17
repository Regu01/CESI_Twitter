const MongoClient = require('mongodb').MongoClient;
const config = require('../config.json');
const urlConnexion = config.tokenMongo;

// Définition des constantes
const DB_NAME = 'Cesi_Twitter'; // Nom de la base de données
const COLLECTION_NAME = 'students'; // Nom de la collection

// Connexion à la base de données MongoDB Atlas
MongoClient.connect(urlConnexion, function(err, client) {
    if (err) throw err;

    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    // Requête pour récupérer la liste des universités
    collection.distinct('university.name', function(err, universities) {
        if (err) throw err;

        console.log('Liste des universités :');
        universities.forEach(function(university) {
            console.log(university);
        });

        client.close();
    });
});
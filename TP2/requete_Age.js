const MongoClient = require('mongodb').MongoClient;
const config = require('../config.json');
const moment = require('moment');
const urlConnexion = config.tokenMongo;

// Définition des constantes
const DB_NAME = 'Cesi_Twitter'; // Nom de la base de données
const COLLECTION_NAME = 'students'; // Nom de la collection

// Connexion à la base de données MongoDB Atlas
MongoClient.connect(urlConnexion, function(err, client) {
    if (err) throw err;

    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    // Requête pour calculer l'âge moyen de tous les étudiants
    collection.aggregate([
        { $group: { _id: null, averageAge: { $avg: { $divide: [{ $subtract: [new Date(), '$birthdate'] }, 31536000000] } } } }
    ]).toArray(function(err, result) {
        if (err) throw err;

        if (result.length > 0) {
            const averageAge = result[0].averageAge;
            console.log(`L'âge moyen de tous les étudiants est de ${averageAge.toFixed(2)} ans`);
        } else {
            console.log('Aucun étudiant trouvé dans la base de données.');
        }

        client.close();
    });
});
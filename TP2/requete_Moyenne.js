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

    // Requête pour calculer la moyenne générale de tous les étudiants
    collection.aggregate([
        { $unwind: '$grades' },
        { $group: { _id: null, average: { $avg: '$grades' } } }
    ]).toArray(function(err, result) {
        if (err) throw err;

        if (result.length > 0) {
            const average = result[0].average;
            console.log(`La moyenne générale de tous les étudiants est de ${average.toFixed(2)}`);
        } else {
            console.log('Aucun étudiant trouvé dans la base de données.');
        }

        client.close();
    });
});
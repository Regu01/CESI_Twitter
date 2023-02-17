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

    // Requête pour récupérer l'université la plus représentée
    collection.aggregate([
        { $group: { _id: '$university.name', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 1 }
    ]).toArray(function(err, result) {
        if (err) throw err;

        if (result.length > 0) {
            const universityName = result[0]._id;
            const studentCount = result[0].count;
            console.log(`L'université la plus représentée est "${universityName}" avec ${studentCount} étudiants.`);
        } else {
            console.log('Aucune université trouvée dans la base de données.');
        }

        client.close();
    });
});
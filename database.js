console.log('Fonction DataBase Start');

const config = require('./config.json');
// Connect to MongoDB
var MongoClient = require('mongodb').MongoClient;
const urlConnexion = config.tokenMongo;

//Function for inputData
function InputUser(collection, data) {

    console.log("collection + insert");

    MongoClient.connect(urlConnexion, function(err, db) {

        var dbo = db.db("Cesi_Twitter");

        dbo.collection(collection).insertMany(data, function(err, res) {
            if (err) { throw err; } else { console.log(collection); }
            db.close();
        });

    });
}


module.exports = { InputUser };
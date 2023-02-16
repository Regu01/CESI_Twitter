console.log('Start Program');

//Import fonction
const dataBase = require('./database');
const facker = require('./facker');

// Insert fake data into MongoDB
dataBase.InputUser('users', facker.DataUsers(10));
dataBase.InputUser('tweets', facker.DataTweets(5));
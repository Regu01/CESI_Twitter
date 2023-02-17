// Facker
const { faker } = require('@faker-js/faker');

// Init
const tweets = [];
const users = [];

//Function for DataUsers
function DataUsers(number) {

    // Generate users
    for (let i = 0; i < number; i++) {
        users.push({
            id: faker.datatype.uuid(),
            username: faker.internet.userName(),
            email: faker.internet.email(),
            followers: []
        });
    }

    // Generate between followers for each user
    for (const user of users) {
        let followers = faker.helpers.shuffle(users).slice(0, faker.datatype.number({ min: 1, max: number }));
        for (const follower of followers) {
            user.followers.push(follower.id);
        }
    }

    return users
}



//Function for DataTweets
function DataTweets(number) {

    // Generate tweets
    for (let i = 0; i < number; i++) {
        tweets.push({
            id: faker.datatype.uuid(),
            user: (faker.helpers.arrayElement(users)).id,
            text: faker.lorem.sentence(),
            likes: [],
            retweets: []
        });
    }

    // Generate likes and retweets for each tweet
    for (const tweet of tweets) {
        let usersRetweet = faker.helpers.shuffle(users).slice(0, faker.datatype.number({ min: 1, max: number }));
        let usersLike = faker.helpers.shuffle(users).slice(0, faker.datatype.number({ min: 1, max: number }));
        for (const user of usersLike) {
            tweet.likes.push(user.id);
        }
        for (const user of usersRetweet) {
            tweet.retweets.push(user.id);
        }
    }

    return tweets

}



module.exports = { DataTweets, DataUsers };
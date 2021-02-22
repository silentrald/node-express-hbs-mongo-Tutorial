const {
    MongoClient
} = require('mongodb');

require('dotenv').config();

// console.log(process.env);

module.exports = {
    client: async () => {
        const client = await MongoClient.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true
        });
        return client.db(process.env.MONGO_DB);
    },
};

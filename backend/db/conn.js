const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.ATLAS_URI;

let _db = {};  // Object to store multiple database connections

module.exports = {
    connectToServer: async function (dbName, callback) {
        console.log(`Connecting to MongoDB for ${dbName}...`);
        const client = new MongoClient(uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        });

        try {
            await client.connect();
            await client.db("admin").command({ ping: 1 });
            console.log("Pinged your deployment. You successfully connected to MongoDB!");
            _db[dbName] = client.db(dbName);  // Store the connection for the specific database
            console.log(`Successfully connected to ${dbName} database!`);
            callback(null);
        } catch (err) {
            console.error(err);
            callback(err);
        }
    },

    getDb: function (dbName) {
        if (!_db[dbName]) {
            console.error(`Database ${dbName} is not connected!`);
            return null;
        }
        return _db[dbName];  // Return the database connection
    }
};

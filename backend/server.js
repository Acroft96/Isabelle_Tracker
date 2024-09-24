// server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });

const app = express();
const dbo = require("./db/conn");

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());

const port = process.env.PORT || 4000;

// Import the route files
const roomRoutes = require('./routes/RoomTracker/roomRoutes');
const officeHoursRoutes = require('./routes/RoomTracker/officeHoursRoutes'); // officeHoursRoutes import
const trainingRoutes = require('./routes/TrainingTracker/trainingRoutes');
const purchaseRoutes = require('./routes/PurchaseTracker/purchaseRoutes');

// Register the routes
app.use('/roomtracker', roomRoutes);
app.use('/roomtracker', officeHoursRoutes); // officeHoursRoutes registered here
app.use('/trainingtracker', trainingRoutes);
app.use('/purchasetracker', purchaseRoutes);

// Sequentially connect to all the required databases
async function connectDatabases() {
    try {
        await new Promise((resolve, reject) => dbo.connectToServer('RoomTracker', (err) => err ? reject(err) : resolve()));
        console.log("Successfully connected to RoomTracker MongoDB");

        await new Promise((resolve, reject) => dbo.connectToServer('TrainingTracker', (err) => err ? reject(err) : resolve()));
        console.log("Successfully connected to TrainingTracker MongoDB");

        await new Promise((resolve, reject) => dbo.connectToServer('PurchaseTracker', (err) => err ? reject(err) : resolve()));
        console.log("Successfully connected to PurchaseTracker MongoDB");

    } catch (err) {
        console.error("Error connecting to databases: ", err);
        process.exit(1);  // Exit the process on database connection error
    }
}

// Start the server after successfully connecting to databases
connectDatabases().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});

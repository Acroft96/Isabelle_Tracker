const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());

const dbo = require("./db/conn");

const port = process.env.PORT || 4000;

// Import the route files
const roomRoutes = require('./routes/RoomTracker/roomRoutes');
const trainingRoutes = require('./routes/TrainingTracker/trainingRoutes');
const purchaseRoutes = require('./routes/PurchaseTracker/purchaseRoutes');

// Register the routes
app.use('/roomtracker', roomRoutes);
app.use('/trainingtracker', trainingRoutes);
app.use('/purchasetracker', purchaseRoutes);

// Listen to the server and connect to the RoomTracker database
app.listen(port, () => {
    dbo.connectToServer('RoomTracker', (err) => {
        if (err) console.error(err);
        else console.log("Successfully connected to RoomTracker MongoDB");
    });
    
    dbo.connectToServer('TrainingTracker', (err) => {
        if (err) console.error(err);
        else console.log("Successfully connected to TrainingTracker MongoDB");
    });

    dbo.connectToServer('PurchaseTracker', (err) => {
        if (err) console.error(err);
        else console.log("Successfully connected to PurchaseTracker MongoDB");
    });

    console.log(`Server is running on port ${port}`);
});

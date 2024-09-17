const express = require('express');
const router = express.Router();
const dbo = require('../../db/conn');  

// Connect to TrainingTracker database
dbo.connectToServer('TrainingTracker', (err) => {
    if (err) {
        console.error(err);
    } else {
        const trainingTrackerDb = dbo.getDb('TrainingTracker');

        
    }
});

module.exports = router;

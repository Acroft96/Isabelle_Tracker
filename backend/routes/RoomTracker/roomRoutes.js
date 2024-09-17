const express = require('express');
const router = express.Router();
const dbo = require('../../db/conn');  

// Connect to RoomTracker database
dbo.connectToServer('RoomTracker', (err) => {
    if (err) {
        console.error(err);
    } else {
        const roomTrackerDb = dbo.getDb('RoomTracker');

        
    }
});

module.exports = router;

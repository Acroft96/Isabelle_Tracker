const express = require('express');
const router = express.Router();
const dbo = require('../../db/conn');  

// Connect to PurchaseTracker database
dbo.connectToServer('PurchaseTracker', (err) => {
    if (err) {
        console.error(err);
    } else {
        const purchaseTrackerDb = dbo.getDb('PurchaseTracker');

       
    }
});

module.exports = router;

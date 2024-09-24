const express = require('express');
const router = express.Router();
const dbo = require('../../db/conn');
const csvFileRoutes = require('./csvFile');  


// Include CSV file upload route
router.use('/upload', csvFileRoutes);

module.exports = router;

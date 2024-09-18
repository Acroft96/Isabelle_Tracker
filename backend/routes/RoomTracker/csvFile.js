const express = require('express');
const router = express.Router();
const csv = require('csv-parser');
const dbo = require('../../db/conn');
const stream = require('stream');
const multer = require('multer'); 

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }); 

// Route to handle CSV file upload
router.post('/', upload.single('csvFile'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const bufferStream = new stream.PassThrough();
    bufferStream.end(req.file.buffer);

    const results = [];
    const seen = new Set();

    console.log("Uploading file:", req.file.originalname);

    // Use bufferStream to pipe the CSV file data
    bufferStream
        .pipe(csv())
        .on('data', (data) => {
            try {
                const uniqueField = data['coursenumber']; // Ensure the key exists in CSV
                if (!seen.has(uniqueField)) {
                    seen.add(uniqueField);
                    results.push(data);
                    console.log("Processed record:", data);
                } else {
                    console.log("Duplicate record skipped:", data);
                }
            } catch (error) {
                console.error("Error processing CSV row:", error);
            }
        })
        .on('end', async () => {
            try {
                const dbConnect = dbo.getDb('RoomTracker');  // Get the correct database connection
                if (!dbConnect) {
                    throw new Error('Database is not connected');
                }

                await dbConnect.collection('schedule').insertMany(results);
                res.status(200).json({ message: 'File processed and data saved' });
            } catch (err) {
                console.error("Error saving to MongoDB:", err);
                res.status(500).json({ error: 'Failed to process file' });
            }
        })
        .on('error', (error) => {
            console.error("Error parsing CSV file:", error);
            res.status(500).json({ error: 'Failed to parse CSV file' });
        });
});

module.exports = router;

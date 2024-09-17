const express = require('express');
const router = express.Router();
const multer = require('multer');
const csv = require('csv-parser');
const dbo = require('../../db/conn');
const stream = require('stream');

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route to handle CSV file upload
router.post('/', upload.single('csvFile'), (req, res) => {
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
            const uniqueField = data['coursenumber']; 
            if (!seen.has(uniqueField)) {
                seen.add(uniqueField);
                results.push(data);
                console.log("Processed record:", data);
            } else {
                console.log("Duplicate record skipped:", data);
            }
        })
        .on('end', async () => {
            try {
                const dbConnect = dbo.getDb();
                await dbConnect.collection('scheduleData').insertMany(results);  
                res.status(200).json({ message: 'File processed and data saved' });
            } catch (err) {
                console.error("Error saving to MongoDB:", err);
                res.status(500).json({ error: 'Failed to process file' });
            }
        });
});

module.exports = router;









// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const csv = require('csv-parser');
// const fs = require('fs');
// const path = require('path');
// const dbo = require('../../db/conn');

// // Configure multer for file upload
// const upload = multer({ dest: 'uploads/' });

// // Route to handle CSV file upload
// router.post('/', upload.single('csvFile'), (req, res) => {  
//     if (!req.file) {
//         return res.status(400).send('No file uploaded.');
//     }

//     const filePath = path.join(__dirname, '..', req.file.path);
//     const results = [];
//     const seen = new Set();

//     console.log("Uploading file:", req.file.originalname);

//     fs.createReadStream(filePath)
//         .pipe(csv())
//         .on('data', (data) => {
//             const uniqueField = data['coursenumber'];  // Check duplicates by coursenumber
//             if (!seen.has(uniqueField)) {
//                 seen.add(uniqueField);
//                 results.push(data);
//                 console.log("Processed record:", data);
//             } else {
//                 console.log("Duplicate record skipped:", data);
//             }
//         })
//         .on('end', async () => {
//             try {
//                 const dbConnect = dbo.getDb();
//                 await dbConnect.collection('sceduleData').insertMany(results);
//                 fs.unlinkSync(filePath);  // Delete file after processing
//                 res.status(200).json({ message: 'File processed and data saved' });
//             } catch (err) {
//                 console.error("Error saving to MongoDB:", err);
//                 res.status(500).json({ error: 'Failed to process file' });
//             }
//         });
// });

// module.exports = router;

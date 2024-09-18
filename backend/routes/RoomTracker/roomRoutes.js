const express = require('express');
const router = express.Router();
const dbo = require('../../db/conn');
const csvFileRoutes = require('./csvFile');  

// router.get('/rooms', async (req, res) => {
//     const roomTrackerDb = dbo.getDb('RoomTracker');  // Get the RoomTracker DB
//     if (!roomTrackerDb) {
//         return res.status(500).json({ error: "Database not connected" });
//     }

//     try {
//         const rooms = await roomTrackerDb.collection('rooms').find({}).toArray();
//         res.json(rooms);
//     } catch (err) {
//         console.error("Error fetching rooms: ", err);
//         res.status(500).json({ error: 'Failed to retrieve rooms' });
//     }
// });

// router.post('/schedule', async (req, res) => {
//     const { roomNumber, scheduleDetails } = req.body;
    
//     try {
//         const dbConnect = dbo.getDb('RoomTracker');
//         await dbConnect.collection('schedules').insertOne({ roomNumber, scheduleDetails });
//         res.status(201).json({ message: 'Schedule created successfully!' });
//     } catch (err) {
//         console.error("Error saving schedule: ", err);
//         res.status(500).json({ error: 'Failed to save schedule' });
//     }
// });

// router.get('/schedule/:roomNumber', async (req, res) => {
//     const roomNumber = req.params.roomNumber;
    
//     try {
//         const dbConnect = dbo.getDb('RoomTracker');
//         const schedule = await dbConnect.collection('schedule').findOne({ roomNumber });
//         res.json(schedule);
//     } catch (err) {
//         console.error("Error retrieving schedule: ", err);
//         res.status(500).json({ error: 'Failed to retrieve schedule' });
//     }
// });


// Include CSV file upload route
router.use('/upload', csvFileRoutes);

module.exports = router;

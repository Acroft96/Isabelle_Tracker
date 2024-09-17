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
const CSVfile = require('./routes/RoomTracker/csvFile');  // Import the CSV route

const port = process.env.PORT || 4000;


app.use('/upload', CSVfile);

app.listen(port, () => {
    dbo.connectToServer((err) => {
        if (err) console.error(err);
        else console.log("Successfully connected to MongoDB");
    });
    console.log(`Server is running on port ${port}`);
});

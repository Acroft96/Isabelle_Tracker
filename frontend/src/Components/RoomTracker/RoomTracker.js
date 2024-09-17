import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import FileUpload from './FileUpload';
import './RoomTracker.css';

const RoomTracker = () => {
    const [fileUploaded, setFileUploaded] = useState(false);

    const handleFileUpload = () => {
        setFileUploaded(true);
    };

    return (
        <div className="room-tracker-container">
            {/* Sidebar */}
            <div className="sidebar">
                <ul>
                    <li><Link to="/roomtracker">Home</Link></li>
                    <li><Link to="/roomtracker/import">Import File</Link></li>
                    <li><Link to="/roomtracker/schedule">Create Schedule</Link></li>
                    <li><Link to="/roomtracker/officehours">Office Hours</Link></li>
                </ul>
            </div>

            <div className="main-content">
                <Container>
                    <h1>Room Tracker</h1>
                    <hr />
                    <p>{fileUploaded ? 'File uploaded successfully!' : 'No File has been Imported'}</p>

                    <FileUpload onFileUpload={handleFileUpload} />
                </Container>
            </div>
        </div>
    );
};

export default RoomTracker;

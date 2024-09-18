import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, ListGroup, Button, Card } from 'react-bootstrap';

const RoomTracker = () => {
    const [fileUploaded, setFileUploaded] = useState(false);

    const handleFileUpload = () => {
        setFileUploaded(true);  
    };

    return (
        <Container fluid>
            <Row>
                {/* Sidebar */}
                <Col md={3} className="bg-light vh-100 p-3">
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <Link to="/roomtracker" className="text-decoration-none" style={{ color: 'black' }}>Home</Link>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Link to="/roomtracker/FileUpload" className="text-decoration-none" style={{ color: 'black' }}>Import File</Link>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Link to="/roomtracker/schedule" className="text-decoration-none" style={{ color: 'black' }}>Create Schedule</Link>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Link to="/roomtracker/officehours" className="text-decoration-none" style={{ color: 'black' }}>Office Hours</Link>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                {/* Main Content */}
                <Col md={9} className="p-4">
                    <h1>Room Tracker</h1>
                    <hr />
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Text>
                                {fileUploaded ? 'CSV File uploaded successfully!' : 'No File has been Imported'}
                            </Card.Text>
                            {/* Button to navigate to the import CSV file page */}
                            <Link to="/roomtracker/FileUpload">
                                <Button variant="primary">Import File</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default RoomTracker;

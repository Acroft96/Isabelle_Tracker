import React, { useState, useRef } from 'react';
import { Button, Form, Alert, Card } from 'react-bootstrap'; // Using Bootstrap components

function FileUpload() {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadStatus, setUploadStatus] = useState(null);
  const fileInputRef = useRef();  // Ref for file input

  // Drag and Drop Handlers
  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      validateFile(droppedFile);
    }
  };

  // File selection by clicking the input
  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      validateFile(selectedFile);
      console.log("File selected:", selectedFile); // Log the selected file
    }
  };

  // File validation (ensure it's CSV)
  const validateFile = (file) => {
    const fileType = file.type;
    if (fileType === "text/csv" || file.name.endsWith(".csv")) {
      setFile(file);   // Set the valid file
      setErrorMessage("");  // Clear error if valid
      console.log("File selected:", file);
    } else {
      setFile(null);
      setErrorMessage("Please upload a valid CSV file.");
    }
  };

  // Discard file selection
  const discardFile = () => {
    setFile(null);  // Reset the file
    setErrorMessage("");  // Clear any error message
  };

  // Handle CSV file submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!file) {
      alert("Please upload a CSV file.");
      return;
    }
  
    console.log("Submitting file:", file);
  
    const formData = new FormData();
    formData.append('csvFile', file);
  
    try {
      const response = await fetch('http://localhost:4000/roomtracker/upload', {  
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Success:', data);
        alert('CSV uploaded and processed successfully');
        setUploadStatus('Success');
        discardFile();  
      } else {
        const errorData = await response.text();
        console.error('Upload failed:', errorData);
        setUploadStatus('Failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setUploadStatus('Failed');
    }
  };

  return (
    <Card
      className={`p-4 ${isDragging ? 'bg-info' : 'bg-light'}`} 
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      style={{ maxWidth: '400px', margin: 'auto' }} 
    >
      <Card.Body>
        <p className="text-center mb-3">Drag & Drop your file here or</p>

        <Form.Group controlId="formFile" className="mb-3">
          <Form.Control
            type="file"
            ref={fileInputRef}
            accept=".csv"
            onChange={handleFileSelect}
            style={{ display: 'none' }} 
          />
          <Button 
            variant="primary" 
            onClick={() => fileInputRef.current.click()}
            className="w-100 mb-3"
          >
            Choose File
          </Button>
        </Form.Group>

        {file && (
          <div className="file-info mb-4">
            <Alert variant="info" className="d-flex justify-content-between align-items-center">
              <span>Selected File: {file.name}</span>
              <Button 
                variant="" 
                size="sm" 
                onClick={discardFile}
                className="ml-2"
              >
                X
              </Button>
            </Alert>
          </div>
        )}

        {errorMessage && (
          <Alert variant="danger">
            {errorMessage}
          </Alert>
        )}

        {file && (
          <Form onSubmit={handleSubmit}>
            <Button variant="success" type="submit" className="w-100">
              Upload CSV
            </Button>
          </Form>
        )}

        {uploadStatus === 'Success' && (
          <Alert variant="success" className="mt-3">
            Upload completed successfully!
          </Alert>
        )}
        {uploadStatus === 'Failed' && (
          <Alert variant="danger" className="mt-3">
            Upload failed. Please try again.
          </Alert>
        )}
      </Card.Body>
    </Card>
  );
}

export default FileUpload;

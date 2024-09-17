import React, { useState, useRef } from 'react';
import './FileUpload.css';  

function FileUpload() {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadStatus, setUploadStatus] = useState(null);
  const fileInputRef = useRef();  

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

    console.log("Submitting file:", file); // Log the file being submitted

    const formData = new FormData();
    formData.append('csvFile', file);

    try {
      const response = await fetch('http://localhost:4000/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Success:', data);
        alert('CSV uploaded and processed successfully');
        setUploadStatus('Success');
        discardFile();  // Reset the file input after successful upload
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
    <div className="file-upload-container"
         onDragEnter={handleDragEnter}
         onDragLeave={handleDragLeave}
         onDragOver={(e) => e.preventDefault()}
         onDrop={handleDrop}>
      
      <div className="file-upload-content">
        <p>Drag & Drop your file here or</p>

        <input 
          type="file"
          className="file-upload-input"
          ref={fileInputRef}  
          accept=".csv"
          onChange={handleFileSelect}
          style={{ display: 'none' }}  
        />

        <button onClick={() => fileInputRef.current.click()}>  
          Choose File
        </button>
        
        {file && (
          <div className="file-info">
            <p>Selected File: {file.name}</p>
            <button onClick={discardFile}>Discard File (X)</button>
          </div>
        )}

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {file && (
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <button type="submit">Upload CSV</button>
          </form>
        )}

        {uploadStatus === 'Success' && <p >Upload completed successfully!</p>}
        {uploadStatus === 'Failed' && <p style={{ color: 'red' }}>Upload failed. Please try again.</p>}
      </div>
    </div>
  );
}

export default FileUpload;

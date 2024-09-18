import { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap'; 

function ImportCSVFile() {
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    
    // Validate if the selected file is a CSV
    if (selectedFile && selectedFile.type !== 'text/csv' && !selectedFile.name.endsWith('.csv')) {
      setErrorMessage("Please upload a valid CSV file.");
      setFile(null);
    } else {
      setErrorMessage(""); 
      setFile(selectedFile);
      console.log("File selected:", selectedFile); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setErrorMessage("Please upload a CSV file.");
      return;
    }

    console.log("Submitting file:", file);

    const formData = new FormData();
    formData.append('csvfile', file);

    try {
      const response = await fetch('http://localhost:4000/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Success:', data); 
        alert('CSV uploaded and processed successfully');
      } else {
        const errorData = await response.text();
        console.error('Upload failed:', errorData);
        console.log("Response status:", response.status);
        setErrorMessage("Upload failed. Please try again.");
      }
    } catch (error) {
      console.error('Error:', error); 
      setErrorMessage("An error occurred while uploading.");
    }
  };

  return (
    <Container className="mt-4">
      <h2>Import CSV File</h2>
      <Form onSubmit={handleSubmit} encType="multipart/form-data" className="mt-3">
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Select CSV file to upload</Form.Label>
          <Form.Control 
            type="file" 
            accept=".csv" 
            onChange={handleFileChange} 
            isInvalid={!!errorMessage} 
          />
          {errorMessage && <Form.Control.Feedback type="invalid">{errorMessage}</Form.Control.Feedback>}
        </Form.Group>

        {file && (
          <Alert variant="info">
            File selected: {file.name}
          </Alert>
        )}

        <Button variant="primary" type="submit" disabled={!file}>
          Upload CSV
        </Button>
      </Form>
    </Container>
  );
}

export default ImportCSVFile;

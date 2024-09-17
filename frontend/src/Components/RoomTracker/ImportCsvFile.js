import { useState } from 'react';

function ImportCSVFile() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    
    // Validate if the selected file is a CSV
    if (selectedFile && selectedFile.type !== 'text/csv' && !selectedFile.name.endsWith('.csv')) {
      alert("Please upload a valid CSV file.");
      setFile(null);
    } else {
      setFile(selectedFile);
      console.log("File selected:", selectedFile); // Log the selected file
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please upload a CSV file.");
      return;
    }

    console.log("Submitting file:", file); // Log the file being submitted

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
      }
    } catch (error) {
      console.error('Error:', error); 
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input 
          type="file" 
          accept=".csv" 
          onChange={handleFileChange} 
        />
        <button type="submit" disabled={!file}>Upload CSV</button>
      </form>
    </div>
  );
}

export default ImportCSVFile;



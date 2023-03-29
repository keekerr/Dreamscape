import React, { useState } from 'react';
import Uploader from 'react-uploader';
import 'whatwg-fetch';

function FileUpload() {
  const [fileUploadError, setFileUploadError] = useState(null);

  async function handleFileUpload(file) {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('File upload failed');
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      setFileUploadError(error.message);
    }
  }

  return (
    <Uploader
      id="file-upload"
      label="Choose a file to upload"
      handleUpload={handleFileUpload}
      error={fileUploadError}
    />
  );
}

export default FileUpload;

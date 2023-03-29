const API_URL = 'http://localhost:3001/api';

export const uploadPhoto = async (photo) => {
  const formData = new FormData();
  formData.append('file', photo);

  const response = await fetch(`${API_URL}/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Failed to upload photo: ${response.statusText}`);
  }

  const data = await response.json();
  return data.fileUrl;
};

export const searchPhotos = async (query) => {
  const response = await fetch(`${API_URL}/unsplash?query=${query}`);

  if (!response.ok) {
    throw new Error(`Failed to search photos: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};

export const downloadPhoto = async (downloadLocation) => {
  const response = await fetch(`${API_URL}/unsplash/download`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ downloadLocation }),
  });

  if (!response.ok) {
    throw new Error(`Failed to download photo: ${response.statusText}`);
  }

  const data = await response.json();
  return data.downloadUrl;
};
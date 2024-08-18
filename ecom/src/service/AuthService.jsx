const apiClient=(data) =>axios.create({
    baseURL: 'https://api.example.com',
    headers: {
      'Content-Type': 'application/json',
      // Optionally include the Authorization header here if it’s static
      'Authorization': `Bearer ${token}`
    }
  },data);

  export default apiClient;
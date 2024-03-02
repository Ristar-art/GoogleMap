const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); // Import the 'node-fetch' library

const app = express();

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Define a route for handling the place select request
app.post('/search', async (req, res) => {
  try {
    // Extract place data and details from the request
    const { placeData, placeDetails } = req.body;

    // Define the URL for the Google Places API
    const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeData.place_id}&key=AIzaSyBMth0dboixZRgwUPycpuqH9Gibyy-iAjs`;

    // Forward the request to the Google Places API
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const responseData = await response.json();

    // Log the received data
    console.log('Place Data:', placeData);
    console.log('Place Details:', placeDetails);
    console.log('API Response:', responseData);

    // Send the API response back to the React Native app
    res.json(responseData);
  } catch (error) {
    console.error('Error handling place select request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});

const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 5000;

app.use(express.json());

const CLIENT_ID = "b81558e9-5411-451a-9018-fc19fed4d494";
const CLIENT_SECRET = "uCUExoZFaXYKKDYX";
const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTAwMTI1NDEsImNvbXBhbnlOYW1lIjoiS3NoaXRpaiBUcmFpbiIsImNsaWVudElEIjoiYjgxNTU4ZTktNTQxMS00NTFhLTkwMTgtZmMxOWZlZDRkNDk0Iiwib3duZXJOYW1lIjoiIiwib3duZXJFbWFpbCI6IiIsInJvbGxObyI6IjIwMDAzMjAxMDAwODUifQ.MZ2GNW5zuVVFtaYWt8zZvi0i77Ft3w2gtAd3gOdRLWs";
async function callJohnDoeAPI(url, method = 'GET', data = {}) {
  try {
    const response = await axios({
      method,
      url,
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
      data,
    });
    return response.data;
  } catch (error) {
    console.error('Error calling John Doe Railway Server API:', error.message);
    throw error;
  }
}

app.get('/trains', async (req, res) => {
  try {
    const trains = await callJohnDoeAPI('http://20.244.56.144/train/trains');

    // Return the fetched data directly in the API response
    res.status(200).json(trains);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch train schedules' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
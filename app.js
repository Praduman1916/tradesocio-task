require('dotenv').config();
const express = require('express');
const { fetchDataFromAPI } = require('./fetchData');
const { determineCacheIntervals, cache } = require('./cacheHelper');

const app = express();
const PORT = process.env.PORT || 3000;

//   Endpoint to handle timeseries data requests
app.get('/timeseries', async (req, res) => {
  const { symbol, period, start, end } = req.query;

  if (!symbol || !period || !start || !end) {
    return res.status(400).json({ error: 'Symbol, period, start time, and end time are required' });
  }

  // Generate cache key and check cache
  const cacheKey = `${symbol}-${period}-${start}-${end}`;
  let cachedData = cache.get(cacheKey);

  if (cachedData) {
    return res.json({ symbol, period, data: cachedData });
  }

  let data = [];
  let missingIntervals = [];

  // Determine cached and missing intervals
  const cacheIntervals = determineCacheIntervals(symbol, period, start, end);

  for (const interval of cacheIntervals) {
    const intervalData = cache.get(interval.key);
    if (intervalData) {
      data.push(...intervalData);
    } else {
      missingIntervals.push(interval);
    }
  }

  // Fetch missing data from external  API
  if (missingIntervals.length > 0) {
    try {
      for (const interval of missingIntervals) {
        const intervalData = await fetchDataFromAPI(symbol, period, interval.start, interval.end);
        cache.set(interval.key, intervalData);
        data.push(...intervalData);
      }
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch data from external API' });
    }
  }

  // Cache the complete data and return
  cache.set(cacheKey, data);
  res.json({ symbol, period, data });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


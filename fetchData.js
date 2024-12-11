const axios = require('axios');

const fetchDataFromAPI = async (symbol, period, startTime, endTime) => {
  const API_URL = process.env.EXTERNAL_API_URL;
  try {
    const response = await axios.get(`${API_URL}`, {
      params: {
        symbol,
        interval: period,
        start: startTime,
        end: endTime,
      },
    });
    // console.log("test res -",response)
    const data = response.data;

    if (!data) throw new Error('Invalid API responses');

    return data.map((entry) => ({
      id: entry.id,
      userId: entry.userId,
      title: entry.title,
      completed: entry.completed,
    }));
  } catch (error) {
    console.error('Error fetching data from API--:', error.message);
    throw new Error('Failed to fetch data from external API----');
  }
};

module.exports = { fetchDataFromAPI };

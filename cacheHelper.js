const NodeCache = require('node-cache');
// Cache duration in seconds
const cache = new NodeCache({ stdTTL: process.env.CACHE_TTL || 6000 });

const determineCacheIntervals = (symbol, period, start, end) => {
  return [{ key: `${symbol}-${period}-${start}-${end}`, start, end }];
};

module.exports = { cache, determineCacheIntervals };

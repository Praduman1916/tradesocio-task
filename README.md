# tradesocio-task
Implementing a Cache Mechanism with Partial Data Handling in Node.js

## Overview
This Node.js application demonstrates an implementation of a **Cache Mechanism with Partial Data Handling** for an external API. It is designed to handle timeseries data requests efficiently by caching responses and minimizing external API calls.

## Features
- Handles API requests with parameters: `symbol`, `period`, `start`, and `end`.
- Implements **in-memory caching** using `node-cache`.
- Supports **partial cache hits** to fetch only missing intervals from the external API.
- Integrates with external APIs (e.g., [JSONPlaceholder](https://jsonplaceholder.typicode.com/)).

## Technologies Used
- **Node.js**: Backend runtime.
- **Express.js**: Web framework for handling HTTP requests.
- **Axios**: HTTP client for API calls.
- **Node-Cache**: In-memory caching library.

### start project 
- **install package**: npm i 
- **start**: npm start

## API Endpoint
### Request
- **URL**: `/timeseries`
- **Method**: `GET`
- **Query Parameters**:
  - `symbol`: The stock or data symbol (e.g., `AAPL`).
  - `period`: The interval for the data (e.g., `1min`, `5min`).
  - `start`: The start time in ISO format (e.g., `2024-05-14T10:00:00Z`).
  - `end`: The end time in ISO format (e.g., `2024-05-14T10:05:00Z`).

### Example Request
```bash
GET http://localhost:3000/timeseries?symbol=AAPL&period=1min&start=2024-05-14T10:00:00Z&end=2024-05-14T10:05:00Z

const express = require('express')
const cors = require('cors')

const app = express()

const corsOptions = {
  origin: 'http://localhost:5173', // Only allow React frontend
  credentials: true,              // Allow cookies if needed
}


app.use(express.json());
app.use(cors(corsOptions))

module.exports = app;
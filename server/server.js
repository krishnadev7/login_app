const express = require('express');
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv');

const mongoConnection = require('./connection');
const router = require('./routes/route');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json())
app.use(cors())
dotenv.config();
app.use(morgan('tiny'));
app.disable('x-powered-by');

app.get('/', (req,res) => {
    res.status(201).json('home get request');
})

// router
app.use('/api', router)

app.listen(PORT,() => {
    mongoConnection();
    console.log(`server connected to http://localhost:${PORT}`);
})
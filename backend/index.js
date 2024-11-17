const express = require('express');
const cors = require('cors');
const app = express();

const bodyParser = require('body-parser');
const predictroutes = require('./routes/predict');


app.use(cors({
    origin: 'https://heart-disease-prediction-73fg.vercel.app', 
    //origin : 'http://localhost:3000'
    credentials: true, 
}));

const port = 8000;
app.use(express.json());


app.post('/predict', predictroutes);


app.options('/predict', cors({
    origin: 'https://heart-disease-prediction-73fg.vercel.app',
    credentials: true
}));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

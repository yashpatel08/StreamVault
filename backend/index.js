const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const PORT = 5000;
const userRoutes = require('./routes/userRoutes');
const videoRoutes = require('./routes/videoRoutes');

app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST","PUT","DELETE"],
    credentials: true
}));
app.use(express.json());

app.use('/users', userRoutes);

app.use('/videos', videoRoutes);

app.get('/', (req, res) => {
  res.send('API is running');
});

mongoose.connect('mongodb://localhost/strmly')
    .then('Conneted to mongodb')
    .catch(error => console.log(error));
console.log('Connected to mongodb');

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

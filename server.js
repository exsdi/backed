require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts.js');
const cors = require('cors');

const whiteList = ['frontend-tau-mocha.vercel.app', 'https://wger-app.netlify.app'];
const corsOptions = {
    origin: function (origin, callback) {
        if (whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}

// express app
const app = express();


app.use(express.json());
app.use(cors(corsOptions));


app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

// port from env
const PORT = process.env.PORT || 3000;

// routes is valid without routes, we only fire routes when 
// /api/workouts is hit or any extension in the routes file.
app.use('/api/workouts', workoutRoutes);

// this was used to test the api
// app.get('/', (req, res) => {
//     // res.send('Hello World!');
//     res.json({ message: 'Hello World!' });
// });

// connect to db
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    //listen for requests
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
}).catch((err) => {
    console.log(err);
})

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv= require('dotenv').config({ path: '.env' });
const port = 3000;
const loginRouter = require('./controllers/login');
const articleRouter = require('./controllers/article');
const userRouter = require('./controllers/user');
const Middleware = require('./utils/middleware');
// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(Middleware.tokenExtractor);
app.use('/api/login', loginRouter);
app.use('/api/articles', articleRouter);
app.use('/api/users', userRouter);


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB: ', error.message)
  });



  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port: ${port}`);
  });
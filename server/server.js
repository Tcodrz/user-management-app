const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');
const postsRoutes = require('./routes/posts.routes');
const todoRoutes = require('./routes/todo.routes');

const app = express();

// RUN MONGO
require('./config/mongo.config');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.use(morgan('dev'));

// ROUTES
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', postsRoutes);
app.use('/api', todoRoutes);

app.listen(process.env.PORT, () => {
	console.log(`server running on port ${process.env.PORT}`);
});

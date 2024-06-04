const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
 const {notFoundMiddleware}=require("../server/middleware/notfoundmiddleware")
const connectDB = require('./Utils/db');
const path = require('path');
const passport = require('passport');
require('./config/googleconfig')(passport);
require('./config/facebookconfig')(passport);
const session = require('express-session'); // Import express-session module

// const corsOptions = {
//   origin: ['http://13.43.174.21:3000','http://13.43.174.21:3001', '*'],
//   credentials: true,
// };

const server = express();

// cors config
server.use(cors());

// Session middleware
server.use(session({
  secret: 'mySecretKey123', // Replace 'mySecretKey123' with your actual secret key
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
}

  
}));

  // Passport middleware
server.use(passport.initialize())
server.use(passport.session())

/

server.use(express.json({ limit: '50mb' }));
server.use(express.urlencoded({ limit: '500kb', extended: true }));
server.use(bodyParser.urlencoded({ extended: true }));
// server.use(cors(corsOptions));

connectDB();

// Showing Api is Running or not //

server.get('/', (req, res) => {
  res.send('API is Running');
});



// Express routes here
server.use('/api/auth', require('./Route/AuthRouter'));
server.use('/api/chef', require('./Route/ChefRouter'));
server.use('/api/menu', require('./Route/MenuRouter'));
server.use('/api/cuisines', require('./Route/CategoryRouter'));
server.use('/api/dietary', require('./Route/dietaryRouter'));
server.use('/api/DishType', require('./Route/DishTypeRouter'));
server.use('/api/SpiceLevel', require('./Route/SpiceRouter'));
server.use('/api/Orders', require('./Route/cartRoutes'));
server.use('/api/order', require('./Route/OrderRouter'));
server.use('/Google_OAuth', require('./Route/googleRouter'));
server.use('/facebook_OAuth', require('./Route/facebookRouter'));
server.use('/api/Nutritional', require('./Route/nutritionalRouter'));
server.use('/api/Coupon', require('./Route/couponRouter'));
server.use('/api/chefProfile', require('./Route/chefjoinRouter'));
server.use('/api/Testimonial', require('./Route/TestimonalRouter'));

// Serve static assets in productionm
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  server.use(express.static(path.join(__dirname, 'client', 'build')));

  // Define route to serve React app
  server.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
} else {
  server.get('/', (req, res) => {
    res.send('API is running..');
  });
}

// // Not found Middleware
// server.use(notFoundMiddleware);

const PORT = process.env.PORT || 4001;
server.listen(PORT, '0.0.0.0', (err) => {
  if (err) throw err;
  console.log(`Server is running on http://localhost:${PORT}`);
});
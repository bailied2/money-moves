const express = require('express');
const app = express();
const port = 3000; // Or another port number

// Import routes
const userRoute = require('./routes/users');
const classroomRoute = require('./routes/admin/classrooms');
const accountRoute = require('./routes/accounts');
const feesBonusesRoute = require('./routes/fees-bonuses');
const investmentAccountRoute = require('./routes/investment-accounts');
const jobRoute = require('./routes/jobs');
const propertyRoute = require('./routes/properties');
const transactionRoute = require('./routes/transactions');
const yearEndRoute = require('./routes/year-ends');
const studentRoute = require('./routes/students');

// Middleware
app.use(express.json()); // To parse JSON request bodies

// Routes with their respective API prefixes
app.use('/api/users', userRoute);  // User routes
app.use('/api/classrooms', classroomRoute);  // Classroom routes
app.use('/api/accounts', accountRoute);  // Account routes
app.use('/api/fees-bonuses', feesBonusesRoute);  // Fees and Bonuses routes
app.use('/api/investment-accounts', investmentAccountRoute);  // Investment Accounts routes
app.use('/api/jobs', jobRoute);  // Jobs routes
app.use('/api/properties', propertyRoute);  // Properties routes
app.use('/api/transactions', transactionRoute);  // Transactions routes
app.use('/api/year-ends', yearEndRoute);  // Year Ends routes
app.use('/api/students', studentRoute);  // Student routes

// Example route 
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

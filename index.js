const dotenv = require('dotenv');
dotenv.config({
  path: `${__dirname}/config.env`
})
const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const userRoutes = require('./routes/userRoutes');

const app = express()

const cors = require('cors')

const DB = process.env.DB_URL.replace('<PASSWORD>', process.env.DB_PASS)


app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.json())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

//ROUTES
app.use('/api/users', userRoutes);




// SERVER
 


(
  async () => {
    
    try {
      
      await mongoose.connect(DB);
      console.log('DB connected!!!');
    } catch (error) {
      console.error(error);
      process.exit(1)
      
    }
  }
)()


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})

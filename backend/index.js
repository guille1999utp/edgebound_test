const express = require('express');
const cors = require('cors');
const app = express()
require('dotenv').config();
const port = 3000

app.use(cors());

app.use(require('./src/routes/index'))

app.listen(port, () => {
  console.log(`aplicacion corriendo en el puerto: ${process.env.PORT}`)
})
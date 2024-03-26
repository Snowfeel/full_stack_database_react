const express = require('express');
const app = express();
const db = require('./models');
const cors = require('cors');

app.use(express.json());
app.use(cors());

const server_port = 3001;

//  Routers
const postRouter = require('./routes/Posts');
app.use('/posts', postRouter);

db.sequelize.sync().then(() => {
  app.listen(server_port, () => {
    console.log('Server is running on port ' + server_port + '...');
  });
});

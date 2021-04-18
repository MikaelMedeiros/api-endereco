const mongoose = require('mongoose');
require('dotenv/config');

mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true},
    () => console.log('MongoDB: Estou conectado!')
);
mongoose.Promise = global.Promise;

module.exports = mongoose;
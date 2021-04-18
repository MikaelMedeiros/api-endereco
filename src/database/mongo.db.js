const mongoose = require('mongoose');
require('dotenv/config');

mongoose.connect(
        process.env.DB_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }
    )
    .then(() => {
        console.log("MongoDB: Estou conectado!");
    })
    .catch(err => {
        console.log("MongoDB: Não consegui me conectar :/", err);
        process.exit();
    });

mongoose.Promise = global.Promise;

module.exports = mongoose;
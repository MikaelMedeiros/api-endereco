const mongoose = require('../database/mongo.db');

const EstadoSchema = new mongoose.Schema({
    nome: {
        type: String,
        require: true
    },
    sigla: {
        type: String,
        unique: true,
        required: true,
        upercase: true
    },
    dataDeCriacao: {
        type: Date,
        default: Date.now
    },
    dataDaUltimaAlteracao: {
        type: Date,
        default: Date.now
    }
})

const Estado = mongoose.model('Estado', EstadoSchema);

module.exports = Estado;
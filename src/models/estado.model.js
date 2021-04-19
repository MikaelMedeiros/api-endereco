const mongoose = require('../database/mongo.db');

const EstadoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, 'Não foi informado o nome do estado.']
    },
    abreviacao: {
        type: String,
        unique: true,
        uppercase: true,
        required: [true, 'Não foi informada a abreviação do estado.'],
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
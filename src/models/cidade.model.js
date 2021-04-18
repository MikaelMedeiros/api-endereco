const mongoose = require('../database/mongo.db');

const CidadeSchema = new mongoose.Schema({
    nome: {
        type: String,
        require: true
    },    
    estadoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Estado'
    },
    dataDeCriacao: {
        type: Date,
        default: Date.now
    },
    dataDaUltimaAlteracao: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Cidade', CidadeSchema);


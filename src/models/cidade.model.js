const mongoose = require('../database/mongo.db');

const CidadeSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, 'Não foi informado o nome da cidade.']        
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
    },
    
});

CidadeSchema.virtual("adjustedTime").get(function() {
    return moment.tz(this.dataDeCriacao, 'GMT').format();
});

module.exports = mongoose.model('Cidade', CidadeSchema);


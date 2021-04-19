const Estado = require('../models/estado.model');
var mongoose = require('mongoose');

module.exports = async (req, res, next) => {
    try {
        const { id } = req.params;        

        if(!mongoose.Types.ObjectId.isValid(id))
            return res.status(400).send({ status: res.statusCode, erro: 'Id inválido.' });

        const estado = await Estado.findOne({ _id: id });        
    
        if(!estado) 
            return res.status(404).send({ status: res.statusCode, erro: 'Estado não encontrado.' });
            
    } catch (error) {
        return res.status(500).send({ status: res.statusCode, erro: 'Erro interno.' });
    }
    
    return next();
}
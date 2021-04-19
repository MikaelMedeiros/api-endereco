var mongoose = require('mongoose');
const Cidade = require('../models/cidade.model');
const Estado = require('../models/estado.model');

module.exports = async (req, res, next) => {
    try {
        const { estadoId } = req.body;   
        console.log('estado:', estadoId) ;  
        const { nome } = req.body;
        
        if(!mongoose.Types.ObjectId.isValid(estadoId))
            return res.status(400).send({ status: res.statusCode, erro: 'Id do estado inválido.' });
                    
        const estado = await Estado.findOne({ _id: estadoId });     

        if(nome && await Cidade.findOne({ nome }))
            return res.status(400).send({ status: res.statusCode, erro: 'Já existe uma cidade com esse nome.' });   

        if(!estado) 
            return res.status(404).send({ status: res.statusCode, erro: 'Estado informado não foi encontrado.' });   
    } catch (error) {
        return res.status(500).send({ status: res.statusCode, erro: 'Erro interno.' });
    }
    
    return next();
}
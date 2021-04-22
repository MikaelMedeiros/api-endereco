const express = require('express'); 
const router = express.Router();
const Cidade = require('../models/cidade.model');
const cidadeInexistenteMiddleware = require('../middlewares/cidade-inexistente');
const bodyCidadeMiddleware = require('../middlewares/body-cidade');

router.get('/', async (req, res) => {
    try {
        const cidades = await Cidade.find().sort({nome: 1}).populate('estadoId');        
        
        return res.send(cidades);   
    } catch (erro) {
        return res.status(400).send({status: res.statusCode, mensagem: 'Requisição inválida', erro: erro.message});
    }    
});

router.get('/:id', cidadeInexistenteMiddleware, async (req, res) => {
    try {
        const { id } = req.params;

        const cidade = await Cidade.findOne({ _id: id});
        
        return res.send(cidade);    
    } catch (erro) {
        return res.status(400).send({status: res.statusCode, mensagem: 'Requisição inválida', erro: erro.message});
    }    
});

router.post('/', bodyCidadeMiddleware, async (req, res) => { 
    try {
        const cidade = await Cidade.create(req.body);
        
        return res.status(201).send({ cidade });
    }  catch(erro) {
        return res.status(400).send({status: res.statusCode, mensagem: 'Requisição inválida', erro: erro.message});
    } 
});


router.put('/:id', cidadeInexistenteMiddleware, async (req, res) => {
    try {        
        const filtro = { _id: req.params.id};
        const cidadeAtualizado = { $set: req.body };

        await Cidade.updateOne(filtro, cidadeAtualizado);        

        return res.send({ status: res.statusCode, mensagem: 'Cidade atualizada.' });
    } catch (erro) {
        return res.status(400).send({status: res.statusCode, mensagem: 'Requisição inválida', erro: erro.message});
    }
});

router.delete('/:id', cidadeInexistenteMiddleware, async (req, res) => {
    try {    
        const filtro = { _id: req.params.id};              

        await Cidade.deleteOne(filtro);

        return res.send({ status: res.statusCode, mensagem: 'Cidade removida.' });
    } catch (erro) {
        return res.status(400).send({status: res.statusCode, mensagem: 'Requisição inválida', erro: erro.message});
    }
});

module.exports = app => app.use('/cidades', router);
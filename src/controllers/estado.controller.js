const express = require('express');
const router = express.Router();
const Estado = require('../models/estado.model');
const estadoInexistenteMiddleware = require('../middlewares/estado-inexistente');

router.get('/', async (req, res) => {
    try {
        const estados = await Estado.find().sort({nome: 1});        

        return res.send(estados);   
    } catch (erro) {
        return res.status(400).send({status: res.statusCode, mensagem: 'Requisição inválida', erro: erro.message});
    }    
});

router.post('/', async (req, res) => { 
    try {
        const { abreviacao } = req.body;
        const { nome } = req.body;

        if(nome && await Estado.findOne({ nome }))
            return res.status(400).send({ status: res.statusCode, erro: 'Já existe um estado com esse nome.' });   

        if(abreviacao && await Estado.findOne({ abreviacao }))
            return res.status(400).send({ status: res.statusCode, erro: 'Já existe um estado com essa abreviação.' });    

        const estado = await Estado.create(req.body);
        
        return res.status(201).send( estado );
    }  catch(erro) {
        return res.status(400).send({status: res.statusCode, mensagem: 'Requisição inválida', erro: erro});
    } 
});

router.get('/:id', estadoInexistenteMiddleware, async (req, res) => {
    try {
        const { id } = req.params;        
        const estado = await Estado.findById(id);

        if(!estado) 
            return res.status(404).send({ status: res.statusCode, erro: 'Esse estado não existe.' });    
        
        return res.send(estado);    
    } catch (erro) {
        return res.status(400).send({status: res.statusCode, mensagem: 'Requisição inválida', erro: erro.message});
    }    
});

router.put('/:id', estadoInexistenteMiddleware, async (req, res) => {
    try {
        const filtro = { _id: req.params.id};
        const estadoAtualizado = { $set: req.body };

        await Estado.updateOne(filtro, estadoAtualizado);  

        return res.send({ status: res.statusCode, mensagem: 'Estado atualizado.' });
    } catch (erro) {
        return res.status(400).send({status: res.statusCode, mensagem: 'Requisição inválida', erro: erro.message});
    }
});

router.delete('/:id', estadoInexistenteMiddleware, async (req, res) => {
    try {
        const filtro = { _id: req.params.id}; 

        await Estado.deleteOne(filtro);

        return res.send({ status: res.statusCode, mensagem: 'Estado removido.' });
    } catch (erro) {
        return res.status(400).send({status: res.statusCode, mensagem: 'Requisição inválida', erro: erro.message});
    }
});

module.exports = app => app.use('/estados', router);

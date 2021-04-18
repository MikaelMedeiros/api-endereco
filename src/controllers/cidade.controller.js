const express = require('express'); 
const router = express.Router();
const Cidade = require('../models/cidade.model');

router.get('/', async (req, res) => {
    try {
        const cidades = await Cidade.find( {} );        
        return res.send(cidades);   
    } catch (erro) {
        return res.status(400).send({status: res.statusCode, mensagem: 'Requisição inválida', erro: erro});
    }    
});

router.post('/', async (req, res) => { 
    try {
        const { nome } = req.body;

        if(await Cidade.findOne({ nome }))
            return res.status(400).send({ status: res.statusCode, erro: 'Já existe uma cidade com esse nome.' });    

        const cidade = await Cidade.create(req.body);
        
        return res.status(201).send({ cidade });
    }  catch(erro) {
        return res.status(400).send({status: res.statusCode, mensagem: 'Requisição inválida', erro: erro});
    } 
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;        
        const cidade = await Cidade.findById(id);

        if(!cidade) 
            return res.status(404).send({ status: res.statusCode, erro: 'Essa cidade não existe.' });    
        
        return res.send(cidade);    
    } catch (erro) {
        return res.status(400).send({status: res.statusCode, mensagem: 'Requisição inválida', erro: erro});
    }    
});

router.put('/:id', async (req, res) => {
    try {
        const filtro = { _id: req.params.id};
        const cidadeAtualizado = { $set: req.body };
        await Cidade.updateOne(filtro, cidadeAtualizado);        
        return res.send({ status: res.statusCode, mensagem: 'Cidade atualizada.' });
    } catch (erro) {
        return res.status(400).send({status: res.statusCode, mensagem: 'Requisição inválida', erro: erro});
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const filtro = { _id: req.params.id};              
        await Cidade.deleteOne(filtro);
        return res.send({ status: res.statusCode, mensagem: 'Cidade removida.' });
    } catch (erro) {
        return res.status(400).send({status: res.statusCode, mensagem: 'Requisição inválida', erro: erro});
    }
});

module.exports = app => app.use('/cidades', router);
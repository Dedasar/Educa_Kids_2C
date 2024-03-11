const express = require('express');
const mongoose = require('mongoose');
const cors = require ('cors');

const app = express();
port = 3001;
app.use(express.json());
app.use(cors());
mongoose.connect('mongodb+srv://devMarcell:Srh14123df@cadusers.h4qedzv.mongodb.net/?retryWrites=true&w=majority&appName=cadusers');
const User = mongoose.model('User', {
    name: String,
    email: String,
    senha: Number,
    confirmar: Number,
});
app.get('/', async (req, res) => {
    const users = await User.find();
    return res.status(200).json(users);
});
app.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        return res.status(200).json({ message: 'Usuário excluído com sucesso' });
    } catch (error) {
        return res.status(500).json({ message: 'Erro no servidor' });
    }
});
app.post('/login', async (req, res) => {
    const { email, senha } = req.body;
    try {
        const user = await User.findOne({ email, senha });
        if (!user) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }
        return res.status(200).json({ message: 'Login bem-sucedido' });
    } catch (error) {
        return res.status(500).json({ message: 'Erro no servidor' });
    }
});
app.post('/cadastro', async (req, res) => {
    const { name, email, senha, confirmar } = req.body;
    if (senha !== confirmar) {
        return res.status(400).json({ message: 'Senha e confirmar senha não conferem' });
    }
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'Email já cadastrado' });
        }
        const newUser = new User({ name, email, senha, confirmar });
        await newUser.save();
        return res.status(201).json({ message: 'Cadastro realizado com sucesso' });
    } catch (error) {
        return res.status(500).json({ message: 'Erro no servidor' });
    }
});
app.put('/:id', async (req, res) => {
    const id = req.params.id;
    const { name, email, senha, confirmar } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, { name, email, senha, confirmar }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        return res.status(200).json(updatedUser);
    } catch (error) {
        return res.status(500).json({ message: 'Erro no servidor' });
    }
});
const AlunoSchema = mongoose.Schema({
    nome: String,
    cpf: String,
    email: String,
    serie: Number,
    materia: String,
});
const Aluno = mongoose.model('Aluno', AlunoSchema);
module.exports = Aluno;
app.get('/alunos', async (req, res) => {
    try {
        const alunos = await Aluno.find();
        return res.status(200).json(alunos);
    } catch (error) {
        return res.status(500).json({ message: 'Erro no servidor' });
    }
});
app.post('/alunos', async (req, res) => {
    const { nome, cpf, email, serie, materia } = req.body;
    try {
        const novoAluno = new Aluno({ nome, cpf, email, serie, materia });
        await novoAluno.save();
        return res.status(201).json({ message: 'Aluno cadastrado com sucesso' });
    } catch (error) {
        return res.status(500).json({ message: 'Erro no servidor' });
    }
});
app.put('/alunos/:id', async (req, res) => {
    const id = req.params.id;
    const { nome, cpf, email, serie, materia } = req.body;
    try {
        const alunoAtualizado = await Aluno.findByIdAndUpdate(id, { nome, cpf, email, serie, materia }, { new: true });
        if (!alunoAtualizado) {
            return res.status(404).json({ message: 'Aluno não encontrado' });
        }
        return res.status(200).json(alunoAtualizado);
    } catch (error) {
        return res.status(500).json({ message: 'Erro no servidor' });
    }
});
app.delete('/alunos/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const alunoDeletado = await Aluno.findByIdAndDelete(id);
        if (!alunoDeletado) {
            return res.status(404).json({ message: 'Aluno não encontrado' });
        }
        return res.status(200).json({ message: 'Aluno deletado com sucesso' });
    } catch (error) {
        return res.status(500).json({ message: 'Erro no servidor' });
    }
});
app.listen(port, () => {
    console.log('Servidor rodando')
})
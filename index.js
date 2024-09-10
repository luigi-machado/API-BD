const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Array dos usuários
let users = [];

app.get('/users', (req, res) => {
    const { cpf } = req.query;

    if (cpf) {
        // Busca o usuário pelo CPF
        const user = users.find(user => user.cpf === parseInt(cpf));
        
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'Usuário não encontrado' });
        }
    } else {
        // Retorna todos os usuários se o CPF não for informado
        res.json(users);
    }
});

app.post('/users', (req, res) => {
    const { cpf, nome, dataNascimento } = req.body;

    // Checa os campos do usuário
    if (typeof cpf !== 'number' || typeof nome !== 'string' || !Date.parse(dataNascimento)) {
        return res.status(400).json({ error: 'Dados inválidos' });
    }

    // Adiciona o novo usuário
    const newUser = { cpf, nome, dataNascimento: (dataNascimento) };
    users.push(newUser);

    res.status(201).json(newUser);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


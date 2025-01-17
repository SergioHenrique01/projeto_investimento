const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Permite requisições de outros domínios
app.use(bodyParser.json()); // Lida com JSON no corpo das requisições

// Simulação de banco de dados
let users = [
    { id: 1, name: "João", saldo: 100 }
];

// Rota para consultar saldo
app.get('/api/saldo/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (user) {
        res.json({ saldo: user.saldo });
    } else {
        res.status(404).json({ error: "Usuário não encontrado" });
    }
});

// Rota para investir
app.post('/api/investir', (req, res) => {
    const { id, valor } = req.body;
    const user = users.find(u => u.id === id);
    if (user && user.saldo >= valor) {
        user.saldo -= valor;
        res.json({ mensagem: "Investimento realizado com sucesso!", saldo: user.saldo });
    } else {
        res.status(400).json({ error: "Saldo insuficiente ou usuário não encontrado." });
    }
});

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

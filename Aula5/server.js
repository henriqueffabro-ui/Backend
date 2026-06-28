// 1. Importar o Express ( igual ao require do readline - sync )
const express = require('express');

// 2. Criar a aplicacao
const app = express();

// 3. Configurar o app para entender JSON
app.use(express.json());

// 4. Criar a primeira rota (GET na raiz )
app.get('/', (req , res) => {
res.json({ mensagem: " Meu servidor esta no ar!" });
});

// Recurso / alunos com dados estaticos ( array em memoria )
app.get('/alunos', (req , res) => {
const alunos = [
{ id: 1, nome: "Ana", nota: 8.5 },
{ id: 2, nome: "Bruno", nota: 7.0 }
];
res.json(alunos);
});

// exercício 1: /sobre
app.get('/sobre', (req , res) => {
res.status(200).json({
        nome: "Henrique",
        disciplina: "Back-End",
        ano: "2ºM"
    });
});

// exercício 2: /produtos
const produtos = [

    { id: 1, nome: "iPhone Ultra Hyper Pro Max 99", valor: 20000},
    { id: 2, nome:"Hidratante", valor: 20},
    { id: 3, nome:"Sabonete Barra", valor: 5},
    { id: 4, nome:"Chocolate", valor: 11}

];
app.get('/produtos', (req , res) => {
res.json(produtos);
});

// exercício 3: /status
app.get('/status', (req , res) => {
 res.status(200).json({
        online: true,
        mensagem: "O usuário está online"
    });
});

// exercício 4: /produtos/caros
app.get('/produtos/caros', (req , res) => {
const filtro = produtos.filter(p => p.valor > 100);
res.json(filtro);
});

// 5. Ligar o servidor na porta 3000
app.listen(3000, () => {
console.log(" Servidor rodando em http :// localhost :3000 ");
});

// Ctrl + c para o terminal voltar ao normal após rodar node server.js
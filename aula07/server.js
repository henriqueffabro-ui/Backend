const express = require ('express');
const app = express();
app.use(express.json());

// 1 - array
let livros = [
{ id : 1, nomeLivro : "A Fundação", autor: "Isaac Asimov", valor: 89.00 } ,
{ id : 2, nomeLivro : "Fundação e Império", autor: "Isaac Asimov", valor: 79.00 }
];

let proximoId = 3;

// 2 - GET - retorna todos
app.get('/livros',( req , res ) => {
res.json(livros);
}) ;

// 3 - GET - retorna um id específico
// Exercício 3 - 404 caso o id não exista
app.get('/livros/:id', (req,res) => {
const id = Number(req.params.id);
const livro = livros.find( l => l.id === id );
// caso não encontrado
if (!livro) {
return res.status(404).json({erro:"Livro Inexistente"});
}
res.json(livro);
});

// 4 - POST - Cadastra um livro novo
app.post('/livros', (req, res) => {
const { nomeLivro , autor , valor } = req.body;

// Exercício 4 - const de erros
const erros = [];

// 1. O nome foi enviado ?
if (!nomeLivro) {
erros.push("O campo nomeLivro e obrigatorio ");
}
// 2. O autor foi enviado ?
if (!autor) {
erros.push("O campo autor e obrigatorio ");
}
// 3. Exercício 2 - O valor foi enviado e e um numero valido ?
if (valor === undefined || isNaN(valor)) {
erros.push("O campo valor deve ser um numero ");
}
// 4. Exercício 2 - O valor esta no intervalo permitido ?
if (valor < 0) {
erros.push("O valor deve ser um numero positivo");
}

if(erros.length > 0){
    return res.status (400).json({erros});
}

// Passou em tudo -> cria o livro
const novoLivro = { id: proximoId , nomeLivro , autor , valor };
livros.push(novoLivro);
proximoId++;
res.status(201).json(novoLivro); 
});

// 5 - PUT - Atualiza um livro existente
// Exercício 3 - 404 caso o id não exista
app.put('/livros/:id', (req, res) => {
const id = Number(req.params.id);
const livro = livros.find( l => l.id === id );

// Caso não encontrado
if (!livro) {
return res.status(404).json({erro: "Livro Inexistente"});
}

// Validando dados
const { nomeLivro , autor , valor } = req.body;
// Exercício 4 - const de erros
const erros = [];

// 1. O nome foi enviado ?
if (!nomeLivro) {
erros.push("O campo nomeLivro e obrigatorio ");
}
// 2. O autor foi enviado ?
if (!autor) {
erros.push("O campo autor e obrigatorio ");
}
// 3. Exercício 2 - O valor foi enviado e e um numero valido ?
if (valor === undefined || isNaN(valor)) {
erros.push("O campo valor deve ser um numero ");
}
// 4. Exercício 2 - O valor esta no intervalo permitido ?
if (valor < 0) {
erros.push("O valor deve ser um numero positivo");
}

if(erros.length > 0){
    return res.status (400).json({erros});
}

// Tudo certo
livro.nomeLivro = req.body.nomeLivro;
livro.autor = req.body.autor;
livro.valor = req.body.valor;
res.json(livro);
});

// 6- DELETE - remove um livro
app.delete('/livros/:id', (req, res) => {
const id = Number(req.params.id);
const livro = livros.find( l => l.id === id );
// Exercício 3 - 404 caso o id não exista
if (!livro) {
return res.status(404).json({erro: "Livro Inexistente"});
}

livros = livros.filter( a => a.id !== id);
res.json({mensagem: "Livro removido com sucesso"});
});

//Ligar o servidor
app.listen(3000, () => {
console.log("Servidor rodando em http://localhost:3000");
});
const express = require ('express');
const app = express();
app.use(express.json());

// 1 - array
let livros = [
{ id : 1, nomeLivro : "A Fundação", autor: "Isaac Asimov" } ,
{ id : 2, nomeLivro : "Fundação e Império", autor: "Isaac Asimov" }
];

let proximoId = 3;

// 2 - GET - retorna todos
app.get('/livros',( req , res ) => {
res.json(livros);
}) ;

// 3 - GET - retorna um id específico
app.get('/livros/:id', (req,res) => {
const id = Number(req.params.id);
const livro = livros.find( l => l.id === id );
if (!livro) {
return res.status(404).json({erro:"Livro Inexistente"});
}
res.json(livro);
});

// 4 - POST - Cadastra um livro novo
app.post('/livros', (req, res) => {
const novoLivro = {
id : proximoId ,
nomeLivro : req.body.nomeLivro,
autor : req.body.autor
};
livros.push(novoLivro);
proximoId++;
res.status(201).json(novoLivro); 
});

// 5 - PUT - Atualiza um livro existente
app.put('/livros/:id', (req, res) => {
const id = Number(req.params.id);
const livro = livros.find( l => l.id === id );
if (!livro) {
return res.status(404).json({erro: "Livro Inexistente"});
}
livro.nomeLivro = req.body.nomeLivro;
livro.autor = req.body.autor;
res.json(livro);
});

// 6- DELETE - remove um livro
app.delete('/livros/:id', (req, res) => {
const id = Number(req.params.id);
const livro = livros.find( l => l.id === id );
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
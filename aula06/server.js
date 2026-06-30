const express = require ('express');
const app = express();
app.use(express.json());

// Nosso " banco de dados " em memoria
let alunos = [
{ id : 1, nome : "Ana", nota : 8.5 } ,
{ id : 2, nome : "Bruno", nota : 7.0 }
];

// Controla o proximo id a ser usado
let proximoId = 3;

// GET / alunos -> retorna todos os alunos
app.get('/alunos',( req , res ) => {
res.json( alunos );
}) ;

// GET / alunos /: id -> retorna um aluno especifico
app.get('/alunos/:id', (req,res) => {
const id = Number(req.params.id);
const aluno = alunos.find( a => a.id === id );
if (!aluno ) {
return res.status(404).json({erro:"Aluno nao encontrado"});
}
res.json(aluno);
});

// POST / alunos -> cria um novo aluno
app.post('/alunos', (req, res) => {
const novoAluno = {
id : proximoId ,
nome : req.body.nome,
nota : req.body.nota
};
alunos.push(novoAluno);
proximoId++;
res.status(201).json(novoAluno); // 201 = Created
});

// PUT / alunos /: id -> atualiza um aluno existente
app.put('/alunos/:id', (req, res) => {
const id = Number(req.params.id);
const aluno = alunos.find( a => a.id === id );
if (!aluno) {
return res.status(404).json({erro: "Aluno nao encontrado"});
}
aluno.nome = req.body.nome;
aluno.nota = req.body.nota;
res.json(aluno);
});

// DELETE / alunos /: id -> remove um aluno
app.delete('/alunos/:id', (req, res) => {
const id = Number(req.params.id);
const aluno = alunos.find( a => a.id === id );
if (!aluno) {
return res.status(404).json({erro: "Aluno nao encontrado"});
}
// Mantem no array todos MENOS o do id informado
alunos = alunos.filter( a => a.id !== id) ;
res.json({mensagem: "Aluno removido com sucesso"});
});

//Ligar o servidor
app.listen(3000, () => {
console.log("Servidor rodando em http://localhost:3000");
});
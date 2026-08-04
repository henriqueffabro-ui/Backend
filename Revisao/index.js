const express = require('express');
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.json({mensagem: "API no ar, xablau"})
});

app.listen(3000, ()=>{
    console.log("Servidor rodando na porta 3000, top hein");
});

let livros = [
    {id: 1, nome: "A Fundação", valor: 89.00},
    {id: 2, nome: "O Fim da Infancia", valor: 109.00}
]

let proximoId = 3;


function validarTarefa(){
    const erros = [];
if (!nome) {
erros.push("O campo nome e obrigatorio ");
}

if (valor === undefined || isNaN(valor)) {
erros.push("O campo valor deve ser um numero ");
}

if (valor < 0) {
erros.push("O valor deve ser um numero positivo");
}

if(erros.length > 0){
    return res.status (400).json({erros});
}
}

app.get('/livros', (req, res)=>{
    res.json(livros);
});

app.get('/livros/:id', (req, res)=>{
    const id = Number(req.params.id);
    const livro = livros.find( l => l.id === id );

    if (!livro) {
        return res.status(404).json({erro:"Livro Inexistente"});
    }
    res.json(livro);
});

//post
app.post('/livros', (req, res) => {
const { nome , valor } = req.body;

validarTarefa(nome, valor);

const novoLivro = { id: proximoId , nome , valor };
livros.push(novoLivro);
proximoId++;
res.status(201).json(novoLivro); 
});

//put
app.put('/livros/:id', (req, res) => {
const id = Number(req.params.id);
const livro = livros.find( l => l.id === id );

if (!livro) {
return res.status(404).json({erro: "Livro Inexistente"});
}

const { nome , valor } = req.body;

validarTarefa(nome, valor);

livro.nome = req.body.nome;
livro.valor = req.body.valor;
res.json(livro);
});

//Delete
app.delete('/livros/:id', (req, res) => {
const id = Number(req.params.id);
const livro = livros.find( l => l.id === id );

if (!livro) {
return res.status(404).json({erro: "Livro Inexistente"});
}

livros = livros.filter( a => a.id !== id);
res.json({mensagem: "Livro removido com sucesso"});
});


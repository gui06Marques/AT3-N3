const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./db');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Listagem dos livros
app.get('/livros', (req, res) => {
    db.all('SELECT * FROM livros', (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Compra de um livro
app.post('/livros/compra', (req, res) => {
    const { id } = req.body;
    db.get('SELECT * FROM livros WHERE id = ?', [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (row && row.numeroExemplares > 0) {
            db.run('UPDATE livros SET numeroExemplares = ? WHERE id = ?', [row.numeroExemplares - 1, id], function (err) {
                if (err) {
                    res.status(500).json({ error: err.message });
                    return;
                }
                res.json({ message: 'Compra realizada com sucesso', livro: { ...row, numeroExemplares: row.numeroExemplares - 1 } });
            });
        } else {
            res.status(400).json({ message: 'Livro esgotado ou não encontrado' });
        }
    });
});

// Adição de exemplares de um livro
app.post('/livros/adicionar', (req, res) => {
    const { id, quantidade } = req.body;
    db.run('UPDATE livros SET numeroExemplares = numeroExemplares + ? WHERE id = ?', [quantidade, id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Exemplares adicionados com sucesso' });
    });
});

// Cadastro de novos livros
app.post('/livros', (req, res) => {
    const { titulo, autor, genero, imagem, numeroExemplares } = req.body;
    db.run('INSERT INTO livros (titulo, autor, genero, imagem, numeroExemplares) VALUES (?, ?, ?, ?, ?)', [titulo, autor, genero, imagem, numeroExemplares || 0], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json({ message: 'Livro cadastrado com sucesso', livro: { id: this.lastID, ...req.body } });
    });
});

// Busca de livro por nome
app.get('/livros/busca', (req, res) => {
    const { titulo } = req.query;
    db.all('SELECT * FROM livros WHERE titulo LIKE ?', [`%${titulo}%`], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Edição das informações de um livro do acervo
app.put('/livros/:id', (req, res) => {
    const { id } = req.params;
    const { titulo, autor, genero, imagem, numeroExemplares } = req.body;
    db.run('UPDATE livros SET titulo = ?, autor = ?, genero = ?, imagem = ?, numeroExemplares = ? WHERE id = ?', [titulo, autor, genero, imagem, numeroExemplares, id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Livro atualizado com sucesso' });
    });
});

// Remoção de um livro
app.delete('/livros/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM livros WHERE id = ?', [id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Livro removido com sucesso' });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

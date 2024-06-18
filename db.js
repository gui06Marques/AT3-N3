const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/livros.db');

// Dados iniciais do JSON
const initialData = [
    { titulo: "Meditações", autor: "Marco Aurélio", genero: "Filosofia", imagem: "https://m.media-amazon.com/images/I/41bQU67zLnL._SY445_SX342_.jpg" },
    { titulo: "Orgulho e Preconceito", autor: "Jane Austen", genero: "Romance", imagem: "https://m.media-amazon.com/images/I/51adYP1B4xL._SY445_SX342_.jpg" },
    { titulo: "Nada Pode Me Ferir", autor: "David Goggins", genero: "Autoajuda", imagem: "https://m.media-amazon.com/images/I/71wdbq8NbFL._SY385_.jpg" },
    { titulo: "O Homem Invisível", autor: "H.G. Wells", genero: "Ficção Científica", imagem: "https://m.media-amazon.com/images/I/513KteOV-vL._SY445_SX342_.jpg" },
    { titulo: "Utopia", autor: "Thomas More", genero: "Filosofia", imagem: "https://m.media-amazon.com/images/I/51Knq6OIwtL._SY445_SX342_.jpg" },
    { titulo: "A Revolução dos Bichos", autor: "George Orwell", genero: "Fábula Política", imagem: "https://m.media-amazon.com/images/I/61owA5ey3iL._SY445_SX342_.jpg" },
    { titulo: "As Crônicas de Nárnia", autor: "C.S. Lewis", genero: "Fantasia", imagem: "https://m.media-amazon.com/images/I/71yJLhQekBL._SY385_.jpg" },
    { titulo: "Cartas Chilenas", autor: "Tomás Antônio Gonzaga", genero: "Sátira", imagem: "https://m.media-amazon.com/images/I/81iehazLn7S._SY385_.jpg" },
    { titulo: "O Príncipe", autor: "Nicolau Maquiavel", genero: "Filosofia Política", imagem: "https://m.media-amazon.com/images/I/81E9scx1JBL._SY385_.jpg" },
    { titulo: "O Guia do Mochileiro das Galáxias", autor: "Douglas Adams", genero: "Ficção Científica", imagem: "https://m.media-amazon.com/images/I/41D2p1NDFkL._SY445_SX342_.jpg" }
];

db.serialize(() => {
    // Remover a tabela antiga, se existir
    db.run(`DROP TABLE IF EXISTS livros`, (err) => {
        if (err) {
            console.error(err.message);
        }
    });

    // Criar a tabela com a estrutura correta
    db.run(`
        CREATE TABLE livros (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT NOT NULL,
            autor TEXT NOT NULL,
            genero TEXT NOT NULL,
            imagem TEXT,
            numeroExemplares INTEGER DEFAULT 0
        )
    `, (err) => {
        if (err) {
            console.error(err.message);
        } else {
            // Verificar se a tabela está vazia
            db.get('SELECT COUNT(*) AS count FROM livros', (err, row) => {
                if (err) {
                    console.error(err.message);
                } else if (row.count === 0) {
                    // Inserir dados iniciais
                    const insert = db.prepare('INSERT INTO livros (titulo, autor, genero, imagem, numeroExemplares) VALUES (?, ?, ?, ?, ?)');
                    initialData.forEach(livro => {
                        insert.run(livro.titulo, livro.autor, livro.genero, livro.imagem, 0);
                    });
                    insert.finalize();
                }
            });
        }
    });
});

module.exports = db;

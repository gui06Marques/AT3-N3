document.addEventListener('DOMContentLoaded', () => {
    const livrosLista = document.getElementById('livros-lista');
    const formCadastrarLivro = document.getElementById('form-cadastrar-livro');
    const formBuscarLivro = document.getElementById('form-buscar-livro');
    const formCompraLivro = document.getElementById('form-compra-livro');
    const formAdicionarExemplares = document.getElementById('form-adicionar-exemplares');
    const formEditarLivro = document.getElementById('form-editar-livro');
    const formRemoverLivro = document.getElementById('form-remover-livro');

    const carregarLivros = () => {
        fetch('/livros')
            .then(response => response.json())
            .then(livros => {
                livrosLista.innerHTML = '';
                livros.forEach(livro => {
                    const livroDiv = document.createElement('div');
                    livroDiv.classList.add('livro');
                    livroDiv.innerHTML = `
                        <h2>${livro.titulo}</h2>
                        <p>Autor: ${livro.autor}</p>
                        <p>Gênero: ${livro.genero}</p>
                        <p>Exemplares disponíveis: ${livro.numeroExemplares}</p>
                        <p>ID: ${livro.id}</p>
                        <img src="${livro.imagem}" alt="Capa de ${livro.titulo}">
                        <button class="btn-comprar" data-id="${livro.id}">Comprar</button>
                        <button class="btn-editar" data-id="${livro.id}">Editar</button>
                        <button class="btn-remover" data-id="${livro.id}">Remover</button>
                    `;
                    livrosLista.appendChild(livroDiv);
                });

                // Adicionar listeners para os botões de comprar, editar e remover
                adicionarListenersBotoes();
            })
            .catch(error => console.error('Erro ao carregar livros:', error));
    };

    // Função para adicionar listeners aos botões de comprar, editar e remover
    const adicionarListenersBotoes = () => {
        const btnsComprar = document.querySelectorAll('.btn-comprar');
        btnsComprar.forEach(btn => {
            btn.addEventListener('click', comprarLivro);
        });

        const btnsEditar = document.querySelectorAll('.btn-editar');
        btnsEditar.forEach(btn => {
            btn.addEventListener('click', editarLivro);
        });

        const btnsRemover = document.querySelectorAll('.btn-remover');
        btnsRemover.forEach(btn => {
            btn.addEventListener('click', removerLivro);
        });
    };

    // Função para comprar um livro
    const comprarLivro = (e) => {
        const livroId = e.target.getAttribute('data-id');
        fetch('/livros/compra', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: livroId })
        })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                carregarLivros();
            })
            .catch(error => console.error('Erro ao comprar livro:', error));
    };

    // Função para editar um livro
    const editarLivro = (e) => {
        const livroId = e.target.getAttribute('data-id');
        const livro = livros.find(l => l.id === parseInt(livroId));
        if (livro) {
            document.getElementById('editarId').value = livro.id;
            document.getElementById('editarTitulo').value = livro.titulo;
            document.getElementById('editarAutor').value = livro.autor;
            document.getElementById('editarGenero').value = livro.genero;
            document.getElementById('editarImagem').value = livro.imagem || '';
            document.getElementById('editarNumeroExemplares').value = livro.numeroExemplares;
        }
    };

    // Função para remover um livro
    const removerLivro = (e) => {
        const livroId = e.target.getAttribute('data-id');
        if (confirm('Tem certeza que deseja remover este livro?')) {
            fetch(`/livros/${livroId}`, {
                method: 'DELETE'
            })
                .then(response => response.json())
                .then(data => {
                    alert(data.message);
                    carregarLivros();
                })
                .catch(error => console.error('Erro ao remover livro:', error));
        }
    };

    // Event listener para cadastrar um novo livro
    formCadastrarLivro.addEventListener('submit', (e) => {
        e.preventDefault();
        const titulo = document.getElementById('titulo').value;
        const autor = document.getElementById('autor').value;
        const genero = document.getElementById('genero').value;
        const imagem = document.getElementById('imagem').value;
        const numeroExemplares = document.getElementById('numeroExemplares').value;

        fetch('/livros', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ titulo, autor, genero, imagem, numeroExemplares })
        })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                carregarLivros();
            })
            .catch(error => console.error('Erro ao cadastrar livro:', error));
    });

    // Event listener para buscar livros por título
    formBuscarLivro.addEventListener('submit', (e) => {
        e.preventDefault();
        const buscarTitulo = document.getElementById('buscarTitulo').value;

        fetch(`/livros/busca?titulo=${buscarTitulo}`)
            .then(response => response.json())
            .then(livros => {
                livrosLista.innerHTML = '';
                livros.forEach(livro => {
                    const livroDiv = document.createElement('div');
                    livroDiv.classList.add('livro');
                    livroDiv.innerHTML = `
                        <h2>${livro.titulo}</h2>
                        <p>Autor: ${livro.autor}</p>
                        <p>Gênero: ${livro.genero}</p>
                        <p>Exemplares disponíveis: ${livro.numeroExemplares}</p>
                        <p>ID: ${livro.id}</p>
                        <img src="${livro.imagem}" alt="Capa de ${livro.titulo}">
                        <button class="btn-comprar" data-id="${livro.id}">Comprar</button>
                        <button class="btn-editar" data-id="${livro.id}">Editar</button>
                        <button class="btn-remover" data-id="${livro.id}">Remover</button>
                    `;
                    livrosLista.appendChild(livroDiv);
                });

                // Adicionar listeners para os botões de comprar, editar e remover
                adicionarListenersBotoes();
            })
            .catch(error => console.error('Erro ao buscar livros:', error));
    });

    // Event listener para comprar um livro
    formCompraLivro.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('compraId').value;

        fetch('/livros/compra', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                carregarLivros();
            })
            .catch(error => console.error('Erro ao comprar livro:', error));
    });

    // Event listener para adicionar exemplares de um livro
    formAdicionarExemplares.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('adicionarId').value;
        const quantidade = document.getElementById('quantidade').value;

        fetch('/livros/adicionar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, quantidade })
        })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                carregarLivros();
            })
            .catch(error => console.error('Erro ao adicionar exemplares:', error));
    });

    // Event listener para editar um livro
    formEditarLivro.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('editarId').value;
        const titulo = document.getElementById('editarTitulo').value;
        const autor = document.getElementById('editarAutor').value;
        const genero = document.getElementById('editarGenero').value;
        const imagem = document.getElementById('editarImagem').value;
        const numeroExemplares = document.getElementById('editarNumeroExemplares').value;

        fetch(`/livros/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ titulo, autor, genero, imagem, numeroExemplares })
        })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                carregarLivros();
            })
            .catch(error => console.error('Erro ao editar livro:', error));
    });
    // Event listener para remover um livro
    formRemoverLivro.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('removerId').value;

        if (confirm('Tem certeza que deseja remover este livro?')) {
            fetch(`/livros/${id}`, {
                method: 'DELETE'
            })
                .then(response => response.json())
                .then(data => {
                    alert(data.message);
                    carregarLivros();
                })
                .catch(error => console.error('Erro ao remover livro:', error));
        }
    });

    carregarLivros(); // Carregar os livros ao iniciar a página
});

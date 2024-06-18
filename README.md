Livraria UCB -
O projeto consiste em um sistema que possibilita o usuário gerenciar o acervo de uma livraria por meio de uma interface Web.
Funcionalidades:

Cadastro de Livros: Permite adicionar novos livros ao acervo da biblioteca, incluindo título, autor, gênero, imagem da capa e número de exemplares disponíveis.

Compra de Livro: Permite a compra de um exemplar de um livro existente no acervo. Reduz o número de exemplares disponíveis do livro após a compra.

Busca de Livro por Título: Permite buscar livros pelo título.

Edição de Informações do Livro: Permite editar informações de um livro existente no acervo, incluindo título, autor, gênero, imagem da capa e número de exemplares.

Remoção de Livro: Remove um livro da biblioteca.

Tecnologias Utilizadas:
Frontend: HTML, CSS, JavaScript
Backend: Node.js, Express.js
Banco de Dados: SQLite (utilizado via SQLite3)


Configuração do Ambiente:
Pré-requisitos:
-Node.js instalado
-NPM (Node Package Manager) ou Yarn 

 Instalação:
-Clone o repositório:
git clone https://github.com/gui06Marques/AT3-N3.git
cd livraria-ucb


Instale as dependências:
npm install ou yarn install

Configuração do Banco de Dados:
O banco de dados utilizado é o SQLite. Certifique-se de que o arquivo database.db está presente e configurado corretamente para a sua aplicação.

Executando a Aplicação
Inicie o servidor:
npm start ou yarn start

Acesse a aplicação no navegador:
Abra o navegador e navegue para http://localhost:3000 (ou a porta configurada).

Uso
Ao acessar a aplicação, você verá uma lista de livros disponíveis na biblioteca da UCB.
Utilize os campos e botões fornecidos para cadastrar novos livros, buscar livros por título, comprar exemplares, editar informações de livros existentes ou remover livros do acervo.

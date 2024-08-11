var form = document.getElementById('form');
form.addEventListener("submit", carregarFrase);

function carregarFrase(event) {
  event.preventDefault();

  let palavraChave = document.getElementById('palavraChave').value;
  let mesAtual = new Date().getMonth() + 1;
  let dataAtual = new Date().toISOString().split('T')[0];
  let mesCorrigido = mesAtual < 10 ? "0" + mesAtual : mesAtual;
  let lista = [];

  var url = `https://newsapi.org/v2/everything?q=${palavraChave}&from=2024-${mesCorrigido}-01&to=${dataAtual}&sortBy=popularity&apiKey=API-KEY`;

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      data.articles.forEach(function (article) {
        // Criando o elemento container
        let container = document.createElement('div');
        container.className = 'container';

        // Criando o elemento image
        let imageDiv = document.createElement('div');
        imageDiv.className = 'image';

        // Criando o elemento img
        let img = document.createElement('img');
        img.src = article.urlToImage

        // Adicionando a imagem à div image
        imageDiv.appendChild(img);

        // Criando o elemento conteudo
        let conteudoDiv = document.createElement('div');
        conteudoDiv.className = 'conteudo';

        // Criando o título
        let titulo = document.createElement('p');
        titulo.className = 'titulo';
        titulo.textContent = article.title

        // Criando a descrição
        let descricao = document.createElement('p');
        descricao.className = 'descricao';
        descricao.textContent = article.description

        // Criando o autor
        let autor = document.createElement('p');
        autor.className = 'autor';
        autor.textContent = `By ${article.author}`

        // Adicionando os parágrafos à div conteudo
        conteudoDiv.appendChild(titulo);
        conteudoDiv.appendChild(descricao);
        conteudoDiv.appendChild(autor);

        // Adicionando as divs image e conteudo ao container
        container.appendChild(imageDiv);
        container.appendChild(conteudoDiv);

        // Adicionando o container ao body do documento
        document.body.appendChild(container);
      });
    })
    .catch(function (error) {
      console.error('Erro:', error);
    });
}

const listaFilmesFavoritos = [];
const apiKey = '6f7e8d7f58bd5afdbc3c64b3dd3e2b6c';

alert('Seja bem vindo(a). Crie seu catálogo de filmes favoritos. Fonte de dados: API Themoviedb.org');

function adicionarFilme() {
  const filmeFavorito = document.getElementById('filme').value.toLowerCase();

  if (filmeFavorito.trim() !== '') {
    buscarInformacoesDoFilme(filmeFavorito);
  } else {
    document.getElementById('mensagemDeErro').innerHTML = 'Preencha o título do filme';
    limpaCampos();
  }
}

function buscarInformacoesDoFilme(titulo) {
  fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${titulo}&language=pt-BR`)
    .then(response => response.json())
    .then(data => {
      if (data.results && data.results.length > 0) {
        const filme = data.results[0];
        const capa = `https://image.tmdb.org/t/p/w500/${filme.poster_path}`;
        const nome = filme.title;
        const descricao = filme.overview;
        const duracao = filme.runtime;
        const avaliacao = filme.vote_average;
        const idiomaOriginal = filme.original_language;
        const trailer = `https://www.themoviedb.org/key=${filme.id}`;

        const descricaoCurta = idiomaOriginal === 'en' ? descricao : `${descricao.substr(0, 200)}...`;

        const filmeHTML = `
          <div class="filme">
            <img src="${capa}" alt="Capa do Filme">
            <h3>${nome}</h3>
            <p>${descricaoCurta}</p>
            <p>Duração: ${duracao ? `${duracao} minutos` : 'Não informada'} | Avaliação: ${avaliacao}/10</p>
            <a href="${trailer}" target="_blank">Assistir Trailer</a>
          </div>
          <button onclick="removerFilme(${listaFilmesFavoritos.length})">Remover</button>
        `;

        listaFilmesFavoritos.push(filmeHTML);

        document.getElementById('mensagemDeErro').innerHTML = '';
        limpaCampos();
        recarregarFilmes();
      } else {
        document.getElementById('mensagemDeErro').innerHTML = 'Nenhum filme encontrado com esse título ou título inválido.';
        limpaCampos();
      }
    })
    .catch(error => {
      document.getElementById('mensagemDeErro').innerHTML = 'Erro ao buscar informações do filme.';
      limpaCampos();
    });
}

function limpaCampos() {
  document.getElementById('filme').value = '';
}

function recarregarFilmes() {
  const elementoListaFilmes = document.getElementById('listaFilmes');
  elementoListaFilmes.innerHTML = '';

  for (let i = 0; i < listaFilmesFavoritos.length; i++) {
    const filmeHTML = listaFilmesFavoritos[i];
    elementoListaFilmes.innerHTML += filmeHTML;
  }
}

function removerFilme(index) {
  listaFilmesFavoritos.splice(index - 1, 1);
  recarregarFilmes();
}
function updateDateTime() 
{
  const now = new Date();
  const dateTimeString = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
  document.getElementById('current-date-time').innerText = dateTimeString;
}

setInterval(updateDateTime, 1000);

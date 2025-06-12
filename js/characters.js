const loggedUser = JSON.parse(localStorage.getItem('loggedUser'))

if(!loggedUser) {
  window.location.href = '../index.html'
}

let page = 1
let maxPage = 1

fetchData(page);

async function fetchData(page){

  try{

    loader.style.display = 'block';
    document.querySelector('.pages-buttons').style.display = 'none'

    const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`);
    if(!response.ok){
      throw new Error('La informacion no ha podido ser cargada');
    }

    const data = await response.json();
    const characterList = document.querySelector('.character-list');
    let charactersHTML = '';
    maxPage = data.info.pages

    data.results.forEach(character => {
      charactersHTML += `
        <div class="character-card">
          <img src="${character.image}" alt="${character.name}">
          <h3>${character.name}</h3>
          <p><strong>Estado:</strong> ${character.status}</p>
          <p><strong>Genero:</strong> ${character.gender}</p>
          <p><strong>Especie:</strong> ${character.species}</p>
          <button class="fav-btn">❤️ Añadir a favoritos</button>
        </div>
      `;
    });

    characterList.innerHTML = charactersHTML;
    
  }
  catch(error){
    console.error(error)
  }
  finally {
    loader.style.display = 'none';
    document.querySelector('.pages-buttons').style.display = 'flex'
  }
}

function updatePaginationButtons(page, maxPage) {
  document.querySelector('.previous-page-buttons').style.display = (page === 1) ? 'none' : 'block';
  document.querySelector('.next-page-buttons').style.display = (page === maxPage) ? 'none' : 'block';
}

document.querySelector('.pages-buttons').addEventListener('click', (e) => {
  if (e.target.closest('#next-page-button')) page++;
  else if (e.target.closest('#last-page-button')) page = 42;
  else if (e.target.closest('#previous-page-button')) page--;
  else if (e.target.closest('#first-page-button')) page = 1
  else return

  // Para validar que no salga del rango entre 1 y el maximo de paginas
  page = Math.min(Math.max(page, 1), maxPage);

  fetchData(page)
  updatePaginationButtons(page, maxPage)
})
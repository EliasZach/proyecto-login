const loggedUser = JSON.parse(localStorage.getItem('loggedUser'))

if(!loggedUser) {
  window.location.href = '../index.html'
}

fetchFavorites()
async function fetchFavorites() {
  const characterList = document.querySelector('.character-list');
  characterList.innerHTML = '';

  try{

    loader.style.display = 'block';
    document.querySelector('.loader-background').style.display = 'block';

    for (let id of loggedUser.favorites) {
      const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
      if(!response.ok){
      throw new Error('La informacion no ha podido ser cargada');
      }

      const character = await response.json();
    
      const favoriteCharacter = loggedUser.favorites.includes(String(character.id))
      characterList.innerHTML += `
        <div class="character-card">
          <img src="${character.image}" alt="${character.name}">
          <h3>${character.name}</h3>
          <p><strong>Estado:</strong> ${character.status}</p>
          <p><strong>Genero:</strong> ${character.gender}</p>
          <p><strong>Especie:</strong> ${character.species}</p>
          <button class="fav-btn" data-id="${character.id}">${favoriteCharacter ? '🌟 Favorito' : '❤️ Añadir a favoritos'}</button>
        </div>
      `;
    }
  }
  catch(error){
    console.error(error);
  }
  finally {
    loader.style.display = 'none';
    document.querySelector('.loader-background').style.display = 'none';
  }
}

document.querySelector('.character-list').addEventListener('click', (e)=>{
  if(e.target.classList.contains('fav-btn')){
    const characterId = e.target.dataset.id;

    const usersList = JSON.parse(localStorage.getItem('users'));

    if(!loggedUser.favorites.includes(characterId)){
      loggedUser.favorites.push(characterId);
      const userIndex = usersList.findIndex(user => user.email == loggedUser.email);
      usersList[userIndex] = loggedUser;
      
      localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
      localStorage.setItem('users', JSON.stringify(usersList));
  
      e.target.textContent = '🌟 Favorito'
    } else {
      loggedUser.favorites = loggedUser.favorites.filter(id => id !== String(characterId))
      const userIndex = usersList.findIndex(user => user.email == loggedUser.email);
      usersList[userIndex] = loggedUser;

      localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
      localStorage.setItem('users', JSON.stringify(usersList));
  
      e.target.textContent = '❤️ Añadir a favoritos'
    }

  }
})

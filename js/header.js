const user_options_ctn = document.querySelector('.profile-picture-ctn');
const user_options_menu = document.querySelector('.user-options');
const logoutBtn = document.getElementById('logoutBtn')

logoutBtn.addEventListener('click', (e) => {
  localStorage.removeItem('loggedUser')
  window.location.href = '../index.html'
})

user_options_ctn.addEventListener('click', () => {
  user_options_menu.classList.toggle('toggle');
})

document.addEventListener('click', (e) => {
  if (!user_options_ctn.contains(e.target) && !user_options_menu.contains(e.target)){
    user_options_menu.classList.remove('toggle');
  }
})

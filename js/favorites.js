const loggedUser = JSON.parse(localStorage.getItem('loggedUser'))

if(!loggedUser) {
  window.location.href = '../index.html'
}
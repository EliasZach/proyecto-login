const loggedUser = JSON.parse(localStorage.getItem('loggedUser'))
if(loggedUser) {
  window.location.href = './pages/characters.html'
}

const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');


if (loginForm){
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    clearErrors()

    const email = loginForm.email.value.trim();
    const password = loginForm.password.value.trim();

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email)

    if (!user) {
      showError('email-error', 'Correo no registrado');
      return;
    }

    if (user.password !== password) {
      showError('password-error', 'Contraseña incorrecta');
      return;
    }

    localStorage.setItem('loggedUser', JSON.stringify(user));
    window.location.href = './pages/characters.html'
  })
}

if(registerForm){
  const modalBackground = document.querySelector('.modal-background')
  const modal = document.querySelector('.modal')
  modalBackground.style.display = 'none'
  modal.style.display = 'none'
  
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault()

    clearErrors()

    const username = registerForm.username.value.trim();
    const email = registerForm.email.value.trim();
    const password = registerForm.password.value.trim();
    const confirmPassword = registerForm.confirmPassword.value.trim();
    validateInputs(username,email,password,confirmPassword);
  })
  function validateInputs(username, email, password, confirmPassword) {
    let isValid = true;
    if (!/^[a-zA-Z0-9_-]{4,16}$/.test(username)) {
      showError('username-error', 'Usuario inválido (4-16 caracteres, letras/números, sin espacios)');
      isValid = false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showError('email-error', 'Correo no válido');
      isValid = false;
    }
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,28}$/.test(password)) {
      showError('password-error', 'Debe tener al menos 8 caracteres y maximo 28, con letras y al menos un número');
      isValid = false;
    }
    if (password !== confirmPassword) {
      showError('confirm-password-error', 'Las contraseñas no coinciden');
      isValid = false;
    }
    if (isValid) {
      const users = JSON.parse(localStorage.getItem('users')) || [];

      const emailExists = users.some(user => user.email == email);
      if (emailExists){
        showError('email-error', 'El correo que has ingresado ya está registrado');
        return;
      }
      const usernameExists = users.some(user => user.username == username);
      if (usernameExists){
        showError('username-error', 'El usuario que has ingresado ya ha sido tomado.');
        return;
      }

      const userData = {username, email, password, favorites:[]};
      users.push(userData)
      localStorage.setItem('users', JSON.stringify(users))

      modalBackground.style.display = 'block';
      modal.style.display = 'flex';

      const modalCount = document.querySelector('.modal-count');
      let seconds = 5;
      modalCount.textContent = seconds;
      const interval = setInterval(() => {
        seconds--;
        modalCount.textContent = `${seconds} segundo${seconds !== 1 ? 's' : ''}`;
        if (seconds <= 0) {
          clearInterval(interval);
        }
      }, 1000);

      setTimeout(() => {
        window.location.href = '../index.html';
      }, 5000)
    }
  }
}

function showError(id, message){
  document.getElementById(id).textContent = message;
}
function clearErrors(){
  document.querySelectorAll('.error').forEach(error => error.textContent = '');
}
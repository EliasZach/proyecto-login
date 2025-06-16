const loggedUser = JSON.parse(localStorage.getItem('loggedUser'))
if (!loggedUser){
  window.location.href = '../index.html'
}

const allUsers = JSON.parse(localStorage.getItem('users'));
const profileForm = document.getElementById("profileForm");

profileForm.addEventListener('submit', (e)=> {
  e.preventDefault()

  clearErrors()

  const inputs = Object.fromEntries(new FormData(profileForm));
  const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
  const allUsers = JSON.parse(localStorage.getItem('users')) || [];

  let hasError = false;

  // 1. USERNAME
  if (inputs.username.trim() !== '') {
    if (!/^[a-zA-Z0-9_-]{4,16}$/.test(inputs.username)) {
      showError('username-error', 'Usuario inválido (4‑16 caracteres, letras/números, sin espacios)');
      hasError = true;
    } else {
      loggedUser.username = inputs.username.trim();
    }
  }

  // 2. EMAIL 
  if (inputs.email.trim() !== '') {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputs.email)) {
      showError('email-error', 'Correo no válido');
      hasError = true;
    } else {
      loggedUser.email = inputs.email.trim();
    }
  }

  // 3. PASSWORD
  if (inputs.password !== '') {
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,28}$/.test(inputs.password)) {
      showError('password-error', 'Debe tener 8‑28 caracteres, letras y al menos un número');
      hasError = true;
    } else {
      loggedUser.password = inputs.password;
    }
  }

  console.log(loggedUser);

  if (hasError) return;

  // 4. Sincronizar con el array de usuarios
  const userIndex = allUsers.findIndex(user => user.email === loggedUser.email);
  if (userIndex !== -1) {
    allUsers[userIndex] = loggedUser;
  }

  //5. Guardo todo actualizado
  localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
  localStorage.setItem('users', JSON.stringify(allUsers));

  alert('Datos actualizados con éxito');
});

function showError(id, message){
  document.getElementById(id).textContent = message;
}

function clearErrors(){
  document.querySelectorAll('.error').forEach(error => error.textContent = '');
}
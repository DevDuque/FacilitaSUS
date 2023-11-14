// Função para validar o formato do email
function isValidEmail(email) {
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return emailRegex.test(email);
  }
  
  function handleFormSubmit(event) {
    event.preventDefault();

    const emailInput = document.querySelector('input[type="text"]');
    const senhaInput = document.querySelector('input[type="password"]');
    const email = emailInput.value;
    const senha = senhaInput.value;

    // Verificar se o email é válido
    if (!isValidEmail(email)) {
        alert("O email inserido não possui um formato válido. Por favor, insira um email válido.");
        return;
    }

    // Criar um hash da senha inserida pelo usuário
    var senhaHash = CryptoJS.SHA256(senha).toString();

    // Obter usuários do localStorage
    const usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Verificar se o email e a senha correspondem a algum usuário registrado
    const usuarioEncontrado = usuariosRegistrados.find(usuario => usuario.email === email && usuario.senha === senhaHash);

    if (usuarioEncontrado) {

        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioEncontrado));
        
        // Redireciona para a página desejada
        window.location.href = './Home.html';
    } else {
        // Credenciais inválidas, exiba uma mensagem de erro
        alert("Credenciais inválidas. Por favor, verifique seu email e senha.");

    }
}
  
  // Adicionar um ouvinte de evento ao formulário
  const loginForm = document.getElementById('loginForm');
  loginForm.addEventListener('submit', handleFormSubmit);
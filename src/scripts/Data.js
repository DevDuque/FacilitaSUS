function getUsuarioLogado() {
    // Obter o email armazenado no localStorage
    const userEmail = localStorage.getItem('userEmail');
    // Obter o nome armazenado no localStorage
    const userName = localStorage.getItem('userName');

    // Retornar os dados do usuário como um objeto
    return { email: userEmail, nome: userName };
}

// Obtendo dados do usuário
const usuarioLogado = getUsuarioLogado();

// Atualizando o header_right com os dados do usuário
const headerRightElement = document.querySelector('.header_right');
headerRightElement.innerHTML = `
    <h2> Olá, <b style="color: #2864AE;">${usuarioLogado.nome}</b> </h2>
    <h2> Seja bem-vindo(a)</h2>
`;

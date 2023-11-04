function getUsuarioLogado() {
    const usuarioLogadoJSON = localStorage.getItem('usuarioLogado');
    return usuarioLogadoJSON ? JSON.parse(usuarioLogadoJSON) : {};
}

const usuarioLogado = getUsuarioLogado();

// Atualizando o header_right com os dados do usuário
const headerRightElement = document.querySelector('.header_right');
headerRightElement.innerHTML = `
    <h2> Olá, <b style="color: #2864AE;">${usuarioLogado.nome}</b> </h2>
    <h2> Seja bem-vindo(a)</h2>
`;

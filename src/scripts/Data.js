function getUsuarioLogado() {
    const usuarioLogadoJSON = localStorage.getItem('usuarioLogado');
    return usuarioLogadoJSON ? JSON.parse(usuarioLogadoJSON) : {};
}

const usuarioLogado = getUsuarioLogado();

// Atualizando o header_right com os dados do usuário
const headerRightElement = document.querySelector('.header_right');
if (usuarioLogado && usuarioLogado.nome) {
    headerRightElement.innerHTML = `
        <h2> Olá, <b style="color: #2864AE;">${usuarioLogado.nome}</b> </h2>
        <h2> Seja bem-vindo(a)</h2>
    `;
} else {
    headerRightElement.innerHTML = `
        <h2> Faça o Login clicando no X para voltar para tela</h2>
    `;
}

// Para pegar o botao de fechar e função para fechar
const closeApp = document.getElementById("closeApp");
closeApp.addEventListener("click", function() {
    // Definir usuarioLogado como null
    localStorage.setItem('usuarioLogado', JSON.stringify(null));

    // Redirecionar para a página LoginPage.html
    window.location.href = 'LoginPage.html';
});
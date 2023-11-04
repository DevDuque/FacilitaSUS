// Declare as variáveis editUsernameInput, editTelefoneInput e editCidadeInput no escopo global
let editUsernameInput, editTelefoneInput, editCidadeInput;

window.onload = function() {
    console.log(usuarioLogado);

    // Obtenha as referências dos elementos de input aqui, dentro do escopo de window.onload
    editUsernameInput = document.getElementById('editUsername');
    editTelefoneInput = document.getElementById('editTelefone');
    editCidadeInput = document.getElementById('editCidade');

    // Restante do seu código dentro de window.onload
    const overlay = document.getElementById("overlay");
    const settingsButton = document.getElementById("settingsButton");
    
    // Abre a overlay quando o botão de configurações é clicado
    settingsButton.addEventListener("click", () => {
        overlay.style.display = "flex";
    });
    
    // Fecha a overlay se o usuário clicar fora dela
    overlay.addEventListener("click", (event) => {
        if (event.target === overlay) {
            overlay.style.display = "none";
        }
    });
    
    function fecharEdicao() {
        overlay.style.display = "none";
    }
    
    const editForm = document.getElementById('editForm');
    
    editForm.addEventListener('submit', function(event) {
        event.preventDefault();
    
        // Obtendo os valores dos campos de input
        const novoUsername = editUsernameInput.value;
        const novoTelefone = editTelefoneInput.value;
        const novaCidade = editCidadeInput.value;
    
        // Atualizando os dados no localStorage
        usuarioLogado.nome = novoUsername;
        usuarioLogado.nTelefone = novoTelefone;
        usuarioLogado.cidade = novaCidade;
    
        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
    
        // Fechando a overlay
        fecharEdicao();
    });
    
    // Preenchendo os campos com os dados do usuário
    const usernameElement = document.querySelector('#username');
    const emailElement = document.querySelector('#email');
    const nTelefoneElement = document.querySelector('#nTelefoneDisplay');
    const cidadeElement = document.querySelector('#cidade');

    usernameElement.textContent = usuarioLogado.nome;
    emailElement.textContent = usuarioLogado.email;
    nTelefoneElement.textContent = usuarioLogado.nTelefone || 'N/A';
    cidadeElement.textContent = usuarioLogado.cidade || 'N/A';
};

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

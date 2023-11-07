// Pegando os dados do usuário que está logado
function getUsuarioLogado() {
    const usuarioLogadoJSON = localStorage.getItem('usuarioLogado');
    return usuarioLogadoJSON ? JSON.parse(usuarioLogadoJSON) : {
        nTelefone: null,
        cidade: null
    };
}

const usuarioLogado = getUsuarioLogado();

function atualizarDadosUsuario() {
    const usernameElement = document.querySelector('#username');
    const emailElement = document.querySelector('#email');
    const nTelefoneElement = document.querySelector('#nTelefoneDisplay');
    const cidadeElement = document.querySelector('#cidade');

    usernameElement.textContent = usuarioLogado.nome || 'Erro no Login, reporte esse erro no Atendimento';
    emailElement.textContent = usuarioLogado.email || 'Reporte esse erro no Atendimento';
    nTelefoneElement.textContent = usuarioLogado.nTelefone || 'N/A';
    cidadeElement.textContent = usuarioLogado.cidade || 'N/A';

    // Atualizando o header_right com os dados do usuário
    const headerRightElement = document.querySelector('.header_right');
    headerRightElement.innerHTML = `
    <h2> Olá, <b style="color: #2864AE;">${usuarioLogado.nome}</b> </h2>
    <h2> Seja bem-vindo(a)</h2>`;
}
 
atualizarDadosUsuario();

window.onload = function() {

    // Obtenha as referências dos elementos de input aqui, dentro do escopo de window.onload
    let editUsernameInput = document.getElementById('editUsername');
    let editTelefoneInput = document.getElementById('editTelefone');
    let editCidadeInput = document.getElementById('editCidade');

    // Para pegar o botao de fechar e função para fechar
    const closeButton = document.getElementById("closeButton");
    closeButton.addEventListener("click", function() {
        fecharEdicao();
    });

    // Para pegar o botão de configuração e abrir quando o botão de configurações é clicado
    const settingsButton = document.getElementById("settingsButton");
    settingsButton.addEventListener("click", () => {
        overlay.style.display = "flex";
    });

    // Para pegar o overlay
    const overlay = document.getElementById("overlay");
    
    // Fecha a overlay se o usuário clicar fora dela
    overlay.addEventListener("click", (event) => {
        if (event.target === overlay) {
            overlay.style.display = "none";
        }
    });
    
    function fecharEdicao() {
        overlay.style.display = "none";
    }
    
    // Pegando o form da edição e salvando os dados inseridos
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

        // Atualizando os dados na página
        atualizarDadosUsuario();
    
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



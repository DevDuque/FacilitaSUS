// Pegando os dados do usuário que está logado
function getUsuarioLogado() {
    const usuarioLogadoJSON = localStorage.getItem('usuarioLogado');
    return usuarioLogadoJSON ? JSON.parse(usuarioLogadoJSON) : {
        nTelefone: null,
        cidade: null
    };
}

const usuarioLogado = getUsuarioLogado();

function getUsuariosRegistrados() {
    return JSON.parse(localStorage.getItem("usuarios")) || [];
}

function atualizarDadosUsuario() {
    const usernameElement = document.querySelector('#username');
    const emailElement = document.querySelector('#email');
    const nTelefoneElement = document.querySelector('#nTelefoneDisplay');
    const cidadeElement = document.querySelector('#cidade');


    // Atualizando os campos de usuário
    usernameElement.textContent = usuarioLogado.nome;
    emailElement.textContent = usuarioLogado.email || 'Reporte no Atendimento';
    nTelefoneElement.textContent = usuarioLogado.nTelefone || 'N/A';
    cidadeElement.textContent = usuarioLogado.cidade || 'N/A';

    // Atualizando o header_right com os dados do usuário
    const headerRightElement = document.querySelector('.header_right');
    headerRightElement.innerHTML = `
    <h2> Olá, <b style="color: #2864AE;">${usuarioLogado.nome}</b> </h2>
    <h2> Seja bem-vindo(a)</h2>`;

        // Atualizando o usuário logado no bloco de usuários
        const usuariosRegistrados = getUsuariosRegistrados();
        const usuarioIndex = usuariosRegistrados.findIndex(user => user.id === usuarioLogado.id);
    
        if (usuarioIndex !== -1) {
            usuariosRegistrados[usuarioIndex] = usuarioLogado;
            localStorage.setItem("usuarios", JSON.stringify(usuariosRegistrados));
        }
}
 
atualizarDadosUsuario();

window.onload = function() {

    // Obtenha as referências dos elementos de input aqui, dentro do escopo de window.onload
    let editUsernameInput = document.getElementById('editUsername');
    let editTelefoneInput = document.getElementById('editTelefone');
    let nTelefoneElement = document.getElementById('nTelefoneDisplay');
    let editCidadeInput = document.getElementById('editCidade');

    // Adicione um listener para o evento de input no campo de edição
    editTelefoneInput.addEventListener('input', function(event) {
        // Obtém o valor do campo
        let value = event.target.value;

        // Remove caracteres não numéricos
        value = value.replace(/\D/g, '');

        // Aplica a máscara conforme o usuário digita
        if (value.length <= 2) {
            value = `(${value}`;
        } else if (value.length <= 7) {
            value = `(${value.substring(0, 2)}) ${value.substring(2)}`;
        } else if (value.length <= 12) {
            value = `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7)}`;
        } else {
            value = `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7, 11)}`;
        }

        // Atualiza o valor no campo de edição
        event.target.value = value;

        // Atualiza o número de telefone na tela
        nTelefoneElement.textContent = value !== '' ? value : 'N/A';
    });

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

    // Função para formatar o nome com a primeira letra de cada palavra em maiúsculo
    function formatarNome(titulo) {
        return titulo.replace(/\b\w/g, (match) => match.toUpperCase());
    }
    
    // Pegando o form da edição e salvando os dados inseridos
    const editForm = document.getElementById('editForm');
    editForm.addEventListener('submit', function(event) {
        event.preventDefault();
    
        // Obtendo os valores dos campos de input
        const novoUsername = formatarNome(editUsernameInput.value);
        const novoTelefone = editTelefoneInput.value;
        const novaCidade = formatarNome(editCidadeInput.value);
    
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
    
    atualizarDadosUsuario();
};



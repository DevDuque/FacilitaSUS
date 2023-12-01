// Função para formatar o título com a primeira letra de cada palavra em maiúscula
function formatarTitulo(titulo) {
    return titulo.replace(/\b\w/g, (match) => match.toUpperCase());
}

const messageForm = document.getElementById('messageForm');

messageForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const usuarioLogado = localStorage.getItem('usuarioLogado');

    if (usuarioLogado) {
        const titulo = document.querySelector('.titleType input').value;
        const tipo = document.querySelector('.dropInput input').value;
        const conteudo = document.querySelector('.conteudoMessage textarea').value;

        const mensagem = {
            titulo: formatarTitulo(titulo),
            tipo: tipo,
            conteudo: conteudo
        };

        salvarMensagemNoLocalStorage(usuarioLogado, mensagem);
        carregarMensagens(usuarioLogado);
        messageForm.reset();
    } else {
        alert('Nenhum usuário logado. Por favor, faça login para enviar mensagens.');
        window.location.href = "./LoginPage.html";
    }
});

function salvarMensagemNoLocalStorage(usuarioLogado, mensagem) {
    // Verifique se usuarioLogado é definido
    if (!usuarioLogado) {
        console.error('Erro: usuarioLogado é undefined.');
        return;
    }

    const usuarioInfo = JSON.parse(localStorage.getItem('usuarioLogado'));

    // Certifique-se de que usuarioInfo e usuarioInfo.id são definidos
    if (!usuarioInfo || !usuarioInfo.id) {
        console.error('Erro: usuário ou ID do usuário é undefined.');
        return;
    }

    const usuarioId = usuarioInfo.id;

    // Obter mensagens salvas ou criar um novo array vazio
    const mensagensSalvas = JSON.parse(localStorage.getItem(`mensagens_${usuarioId}`)) || [];
    console.log('Mensagens salvas:', mensagensSalvas);

    // Adicionar a mensagem ao array de mensagens
    mensagem.usuario = { id: usuarioId };
    mensagensSalvas.push(mensagem);

    // Salvar apenas as mensagens no localStorage, sem informações completas do usuário
    localStorage.setItem(`mensagens_${usuarioId}`, JSON.stringify(mensagensSalvas.map(m => ({ ...m, usuario: { id: m.usuario.id } }))));

    // Envie os dados para o Formsprее
    enviarFormularioParaFormspree(mensagem);
}

function enviarFormularioParaFormspree(mensagem) {
    const url = "https://formspree.io/f/xyyqaewq";  // Substitua pelo seu endereço de e-mail do Formsprее

    // Obtenha as informações do usuário do localStorage
    const usuarioInfo = JSON.parse(localStorage.getItem('usuarioLogado'));

    // Adicione nome e email do usuário à mensagem
    mensagem.usuario = {
        nome: usuarioInfo.nome,
        email: usuarioInfo.email
    };

    // Envie uma solicitação POST para o Formsprее
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(mensagem),
    })
        .then(response => response.json())
        .catch(error => console.error("Erro ao enviar formulário", error));
}

function carregarMensagens(usuarioLogado) {
    // Parse do JSON para obter as informações do usuário
    const usuarioInfo = JSON.parse(localStorage.getItem('usuarioLogado'));

    if (!usuarioInfo || !usuarioInfo.id) {
        console.error('Erro: usuário ou ID do usuário é undefined.');
        return;
    }

    const usuarioId = usuarioInfo.id;

    // Obter mensagens salvas ou criar um novo array vazio
    const mensagensSalvas = JSON.parse(localStorage.getItem(`mensagens_${usuarioId}`)) || [];
    const sidebarDiv = document.querySelector('.sidebar');
    sidebarDiv.innerHTML = '';

    mensagensSalvas
        .forEach(mensagem => {
            const newMessageDiv = document.createElement('div');
            newMessageDiv.classList.add('message');

            const subContentDiv = document.createElement('div');
            subContentDiv.classList.add('sub-content');

            const tituloElement = document.createElement('h2');
            tituloElement.textContent = formatarTitulo(mensagem.titulo);
            subContentDiv.appendChild(tituloElement);

            const tipoElement = document.createElement('h2');
            tipoElement.textContent = mensagem.tipo;
            subContentDiv.appendChild(tipoElement);

            const conteudoElement = document.createElement('p');
            conteudoElement.textContent = mensagem.conteudo;

            newMessageDiv.appendChild(subContentDiv);
            newMessageDiv.appendChild(conteudoElement);

            sidebarDiv.appendChild(newMessageDiv);
        });
}

document.addEventListener('DOMContentLoaded', function() {
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    if (usuarioLogado) {
        carregarMensagens(usuarioLogado);
    }
});
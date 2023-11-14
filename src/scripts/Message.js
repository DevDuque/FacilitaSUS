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
    const mensagensSalvas = JSON.parse(localStorage.getItem(`mensagens_${usuarioLogado}`)) || [];
    mensagem.usuario = usuarioLogado;
    mensagensSalvas.push(mensagem);
    localStorage.setItem(`mensagens_${usuarioLogado}`, JSON.stringify(mensagensSalvas));

    // Envie os dados para o Formsprее
    enviarFormularioParaFormspree(usuarioLogado, mensagem);
}

function enviarFormularioParaFormspree(usuarioLogado, mensagem) {
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
    const mensagensSalvas = JSON.parse(localStorage.getItem(`mensagens_${usuarioLogado}`)) || [];
    const sidebarDiv = document.querySelector('.sidebar');
    sidebarDiv.innerHTML = '';

    mensagensSalvas.forEach(mensagem => {
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

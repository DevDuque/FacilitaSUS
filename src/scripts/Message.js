// Captura o formulário
const messageForm = document.getElementById('messageForm');

// Adiciona um evento de submit ao formulário
messageForm.addEventListener('submit', function(event) {
    // Impede o comportamento padrão de submissão do formulário
    event.preventDefault();

    // Captura os valores dos campos de entrada
    const titulo = document.querySelector('.titleType input').value;
    const tipo = document.querySelector('.dropInput input').value;
    const conteudo = document.querySelector('.conteudoMessage textarea').value;

    // Verifica se o usuário está logado
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    if (usuarioLogado) {
        // Cria um objeto com os valores das mensagens
        const mensagem = {
            titulo: titulo,
            tipo: tipo,
            conteudo: conteudo
        };

        // Salva a mensagem no Local Storage
        salvarMensagemNoLocalStorage(mensagem);

        // Cria uma nova div com as classes de estilo
        const newMessageDiv = document.createElement('div');
        newMessageDiv.classList.add('message');

        // Cria a estrutura interna da div com as classes de estilo
        const subContentDiv = document.createElement('div');
        subContentDiv.classList.add('sub-content');

        const tituloElement = document.createElement('h2');
        tituloElement.textContent = `${titulo}`;
        subContentDiv.appendChild(tituloElement);

        const tipoElement = document.createElement('h2');
        tipoElement.textContent = `${tipo}`;
        subContentDiv.appendChild(tipoElement);

        const conteudoElement = document.createElement('p');
        conteudoElement.textContent = `${conteudo}`;

        // Adiciona os elementos à nova div
        newMessageDiv.appendChild(subContentDiv);
        newMessageDiv.appendChild(conteudoElement);

        // Obtém a div da sidebar onde deseja adicionar a nova div
        const sidebarDiv = document.querySelector('.sidebar');

        // Adiciona a nova div à estrutura da sidebar
        sidebarDiv.appendChild(newMessageDiv);
    } else {
        // Não há usuário logado, exibe uma mensagem de alerta
        alert('Nenhum usuário logado. Por favor, faça login para enviar mensagens.');

        // Redirecionar para a página de login
        window.location.href = "./LoginPage.html";
    }
});

// Função para salvar mensagens no Local Storage
function salvarMensagemNoLocalStorage(mensagem) {
    const usuarioLogado = localStorage.getItem('usuarioLogado');

    if (usuarioLogado) {
        // Obtém as mensagens existentes do Local Storage
        const mensagensSalvas = JSON.parse(localStorage.getItem(`mensagens_${usuarioLogado}`)) || [];

        // Adiciona o ID do usuário à mensagem
        mensagem.usuario = usuarioLogado;

        // Adiciona a nova mensagem ao array de mensagens
        mensagensSalvas.push(mensagem);

        // Salva o array atualizado no Local Storage
        localStorage.setItem(`mensagens_${usuarioLogado}`, JSON.stringify(mensagensSalvas));

        console.log(mensagensSalvas);
    }
}

// Função para gerar códigos randômicos a serem utilizados como código de usuário
function generateUUID() {
    var d = new Date().getTime();
    var d2 = (performance && performance.now && (performance.now() * 1000)) || 0;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;
        if (d > 0) {
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        } else {
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

// Função para validar o email
function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

document.getElementById("signInForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Obter os valores dos campos
    var nome = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var senha = document.getElementById("password").value;

    // Validar o email
    if (!isValidEmail(email)) {
        alert("Por favor, insira um email válido.");
        return;
    }

    // Verificar se já existem usuários registrados no localStorage
    var usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Verificar se o e-mail já está em uso por outro usuário
    var emailEmUso = usuariosRegistrados.some(function(usuario) {
        return usuario.email === email;
    });

    if (emailEmUso) {
        alert("Este e-mail já está em uso. Por favor, escolha outro e-mail.");
        return;
    }

    // Função para formatar o nome com a primeira letra de cada palavra em maiúsculo
    function capitalizeWords(str) {
        return str.replace(/\b\w/g, function(l) {
            return l.toUpperCase();
        });
    }

    // Formatar o nome com a primeira letra de cada palavra em maiúsculo
    var nomeFormatado = capitalizeWords(nome);

    // Gerar um ID único para o usuário usando UUID
    var userId = generateUUID();

    // Criar um objeto de usuário com os dados
    var usuario = {
        id: userId,
        nome: nomeFormatado,
        email: email,
        senha: senha,
        nTelefone: null,
        Cidade: null
    };

    // Adicionar o novo usuário ao array
    usuariosRegistrados.push(usuario);

    // Salvar o array atualizado de usuários de volta no localStorage
    localStorage.setItem("usuarios", JSON.stringify(usuariosRegistrados));

    // Mostrar uma mensagem de sucesso para o usuário
    alert("Registrado com sucesso!");

    // Redirecionar para a página de login
    window.location.href = "./LoginPage.html";
});

// Obtém o link, a div e a imagem
var link = document.getElementById("linkNotification");
var notificationDiv = document.getElementById("notificationDiv");
var imageChange = document.getElementById("imageChange");
var textChange = document.getElementById("textChange");

var imagens = ["./assets/icons/bell.svg", "./assets/icons/bellActive.svg"];
var indiceImagemAtual = 0;

// Adiciona um evento de clique ao link
link.addEventListener("click", function(event) {
  // Impede que o link execute sua ação padrão (navegar para outra página)
  event.preventDefault();

  // Verifica se a div está visível
  if (notificationDiv.style.display === "none" || notificationDiv.style.display === "") {
    // Se estiver oculta, mostra a div e altera a imagem
    notificationDiv.style.display = "block";

    // Altera para a segunda imagem
    indiceImagemAtual = 1; 

    textChange.style.color = "#5B5C60";

    // Adiciona uma classe ao body para impedir que o conteúdo role
    document.body.classList.add("notification-open");

  } else {
    // Se estiver visível, oculta a div e altera a imagem de volta para a primeira
    notificationDiv.style.display = "none";

    // Altera de volta para a primeira imagem
    indiceImagemAtual = 0; 

    textChange.style.color = "";

    // Remove a classe do body para permitir que o conteúdo role novamente
    document.body.classList.remove("notification-open");
  }

  // Atualiza a imagem
  imageChange.src = imagens[indiceImagemAtual];
});
  // Obter o email armazenado no localStorage
  const userEmail = localStorage.getItem('userEmail');

  // Obter o nome armazenado no localStorage
  const userName = localStorage.getItem('userName');
  
  // Usar o userEmail e userName conforme necessário
  console.log(`Email: ${userEmail}`);
  console.log(`Nome: ${userName}`);
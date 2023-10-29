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

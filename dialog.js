document.addEventListener('DOMContentLoaded', function() {
    const startGameButton = document.getElementById('startGame');
    const dialog = document.createElement('div');
    const overlay = document.createElement('div');
    
    // Create dialog structure
    overlay.classList.add('display-caixa');
    overlay.style.display = 'none';

    dialog.classList.add('caixa');

    const rulesText = document.createElement('p');
    rulesText.classList.add('caixa-regras');

    rulesText.innerText = 'Regras do jogo: \n- O objetivo do jogo é adivinhar a palavra secreta, letra por letra.\n- Você tem um número limitado de tentativas.\n- Se você errar, uma parte do boneco será desenhada.';

    const confirmButton = document.createElement('button');
    const cancelButton = document.createElement('button');

    confirmButton.classList.add('caixa-botao');

    confirmButton.innerText = 'Vamos Jogar!';
    cancelButton.classList.add('caixa-botao-nao');
    cancelButton.innerText = 'Agora Não...';
    
    cancelButton.addEventListener('click', function() {
        overlay.style.display = 'none'; // Hide the dialog
    });

    
    confirmButton.addEventListener('click', function() {
        overlay.style.display = 'none';
        window.location.href = 'game.html';
    });

    dialog.appendChild(rulesText);
    dialog.appendChild(confirmButton);
    dialog.appendChild(cancelButton);

    overlay.appendChild(dialog);
    document.body.appendChild(overlay);

    startGameButton.addEventListener('click', function() {
        overlay.style.display = 'block';
    });
});

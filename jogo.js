let palavraEscolhida;
let categoriaEscolhida;
let letrasTentadas = [];
let tentativasRestantes = 6;

const palavras = {
    Animais: {
        Fácil: ["gato", "cachorro", "peixe"],
        Normal: ["papagaio", "jacaré", "golfinho"],
        Difícil: ["tatu", "ornitorrinco", "axolote"]
    },
    Profissões: {
        Fácil: ["médico", "professor", "bombeiro"],
        Normal: ["arquiteto", "psicólogo", "advogado"],
        Difícil: ["quiropraxista", "oceanógrafo", "taquígrafo"]
    },
    Nomes: {
        Fácil: ["ana", "joão", "pedro"],
        Normal: ["camila", "rafael", "juliana"],
        Difícil: ["wolfgang", "archibald", "anastácia"]
    },
    Lugares: {
        Fácil: ["brasil", "paris", "roma"],
        Normal: ["londres", "canadá", "portugal"],
        Difícil: ["butão", "liechtenstein", "azerbaijão"]
    },
    Flores: {
        Fácil: ["rosa", "tulipa", "girassol"],
        Normal: ["orquídea", "lírio", "hortênsia"],
        Difícil: ["amarílis", "dália", "cravo-do-mato"]
    },
    Verbos: {
        Fácil: ["correr", "pular", "dormir"],
        Normal: ["escrever", "nadar", "pensar"],
        Difícil: ["degustar", "perseverar", "almejar"]
    },
    Games: {
        Fácil: ["minecraft", "gta", "mario"],
        Normal: ["fortnite", "league of legends", "the sims"],
        Difícil: ["bloodborne", "hollow knight", "baldur’s gate"]
    },
    "Apps ou Sites": {
        Fácil: ["youtube", "whatsapp", "google"],
        Normal: ["instagram", "tiktok", "twitter"],
        Difícil: ["reddit", "behance", "trello"]
    },
    Elogios: {
        Fácil: ["bonito", "alegre", "gentil"],
        Normal: ["talentoso", "carismático", "educado"],
        Difícil: ["perspicaz", "altruísta", "magnânimo"]
    },
    Objetos: {
        Fácil: ["mesa", "caneta", "celular"],
        Normal: ["relógio", "lâmpada", "espelho"],
        Difícil: ["gramofone", "caleidoscópio", "estetoscópio"]
    }
};

function selecionarPalavra(categoria, dificuldade) {
    if (categoria === "Aleatória") {
        categoria = escolherCategoriaAleatoria();
    }
    categoriaEscolhida = categoria;
    const palavrasCategoria = palavras[categoria][dificuldade];
    const indiceAleatorio = Math.floor(Math.random() * palavrasCategoria.length);
    return palavrasCategoria[indiceAleatorio];
}

function iniciarJogo(categoria, dificuldade) {
    palavraEscolhida = selecionarPalavra(categoria, dificuldade);
    letrasTentadas = [];
    tentativasRestantes = 6;
    atualizarSaida();
}

function atualizarSaida() {
    const output = document.getElementById("output");
    output.innerHTML = ''; // Clear previous output

    const categoriaElement = document.createElement('div');
    categoriaElement.className = 'category';
    categoriaElement.textContent = `Categoria: ${categoriaEscolhida}`;
    output.appendChild(categoriaElement);

    const palavraElement = document.createElement('div');
    palavraElement.className = 'word';
    const palavraAtual = palavraEscolhida.split('').map(letra => (letrasTentadas.includes(letra) ? letra : '_')).join(' ');
    palavraElement.textContent = `Palavra: ${palavraAtual}`;
    output.appendChild(palavraElement);

    const tentativasElement = document.createElement('div');
    tentativasElement.className = 'tentativas';
    tentativasElement.textContent = `Tentativas restantes: ${tentativasRestantes}`;
    output.appendChild(tentativasElement);

    const letrasTentadasElement = document.createElement('div');
    letrasTentadasElement.className = 'letras';
    letrasTentadasElement.textContent = `Letras tentadas: ${letrasTentadas.join(', ')}`;
    output.appendChild(letrasTentadasElement);

    
    if (tentativasRestantes <= 0) {
        palavraElement.textContent += `\nVocê perdeu! A palavra era: ${palavraEscolhida}`;
    } else if (!palavraAtual.includes('_')) {
        palavraElement.textContent += `\nParabéns! Você adivinhou a palavra: ${palavraEscolhida}`;
    }
}

document.getElementById("startGame").addEventListener("click", () => {
    let categoria = document.getElementById("categoria").value;
    const dificuldade = document.getElementById("dificuldade").value;

    if (categoria === "aleatória") {
        const categoriasDisponiveis = Object.keys(palavras);
        const indiceAleatorio = Math.floor(Math.random() * categoriasDisponiveis.length);
        categoria = categoriasDisponiveis[indiceAleatorio];
    }

    iniciarJogo(categoria, dificuldade);
});


document.addEventListener("keypress", (event) => {
    const letra = event.key.toLowerCase();
    if (letra >= 'a' && letra <= 'z') {
        tentarLetra(letra);
    }
});

function tentarLetra(letra) {
    if (letrasTentadas.includes(letra) || tentativasRestantes <= 0) return;

    letrasTentadas.push(letra);
    if (!palavraEscolhida.includes(letra)) tentativasRestantes--;

    atualizarSaida();
}

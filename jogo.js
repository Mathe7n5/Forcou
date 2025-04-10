let palavraEscolhida;
let categoriaEscolhida;
let letrasTentadas = [];
let tentativasRestantes = 7;

const palavras = {
    Animais: {
        Facil: ["gato", "cachorro", "peixe"],
        Normal: ["papagaio", "jacare", "golfinho"],
        Dificil: ["tatu", "ornitorrinco", "axolote"]
    },
    Profissoes: {
        Facil: ["medico", "professor", "bombeiro"],
        Normal: ["arquiteto", "psicologo", "advogado"],
        Dificil: ["quiropraxista", "oceanografo", "taquigrafo"]
    },
    Nomes: {
        Facil: ["ana", "joao", "pedro"],
        Normal: ["camila", "rafael", "juliana"],
        Dificil: ["wolfgang", "archibald", "anastacia"]
    },
    Lugares: {
        Facil: ["brasil", "paris", "roma"],
        Normal: ["londres", "canada", "portugal"],
        Dificil: ["butao", "liechtenstein", "azerbaijao"]
    },
    Flores: {
        Facil: ["rosa", "tulipa", "girassol"],
        Normal: ["orquidea", "lirio", "hortensia"],
        Dificil: ["amarilis", "dalia", "cravo-do-mato"]
    },
    Verbos: {
        Facil: ["correr", "pular", "dormir"],
        Normal: ["escrever", "nadar", "pensar"],
        Dificil: ["degustar", "perseverar", "almejar"]
    },
    Games: {
        Facil: ["minecraft", "gta", "mario"],
        Normal: ["fortnite", "league of legends", "the sims"],
        Dificil: ["bloodborne", "hollow knight", "baldurs gate"]
    },
    "Apps ou Sites": {
        Facil: ["youtube", "whatsapp", "google"],
        Normal: ["instagram", "tiktok", "twitter"],
        Dificil: ["reddit", "behance", "trello"]
    },
    Elogios: {
        Facil: ["bonito", "alegre", "gentil"],
        Normal: ["talentoso", "carismatico", "educado"],
        Dificil: ["perspicaz", "altruista", "magnanimo"]
    },
    Objetos: {
        Facil: ["mesa", "caneta", "celular"],
        Normal: ["relogio", "lampada", "espelho"],
        Dificil: ["gramofone", "caleidoscopio", "estetoscopio"]
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

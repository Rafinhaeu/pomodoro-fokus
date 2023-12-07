//Variáveis constantes do projeto

const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const startPauseBt = document.querySelector('#start-pause');
const musicaFocoInput = document.querySelector('#alternar-musica');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const iconeTroca = document.querySelector('.app__card-primary-butto-icon');
const tempoNaTela = document.querySelector('#timer');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
const somFim = new Audio('/sons/beep.mp3');
const somPause = new Audio('/sons/pause.mp3');
const somInicio = new Audio('/sons/play.wav');


//variável de tempo

let tempoEmSeg = 1500;
let intervaloId = null;

//Evento de ativação e desativação de música de fundo

musica.loop = true

musicaFocoInput.addEventListener('change', () =>{
    if(musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
})

//Eventos de mudança no "cenário geral" da página
//Em ordem: tempo na tela; muda cenário; "marca" opção selecionada

focoBt.addEventListener('click', () => {
    tempoEmSeg = 1500;
    alterarContexto('foco');
    focoBt.classList.add('active');
})

curtoBt.addEventListener('click', () => {
    tempoEmSeg = 300;
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
})

longoBt.addEventListener('click', () => {
    tempoEmSeg = 900;
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
})

//Altera "cenário geral" da página(textos, imagens, cores, etc)
//Em odrdem: Mostra tempo; desativa a "marcação" da opção selecionada;
//altera cor de fundo de acordo com o contexto; altera imagens de acordo com o contexto;
//altera textos de acordo com o contexto 

function alterarContexto(contexto) {
    mostrarTempo();
    botoes.forEach(function contexto(contexto) {
        contexto.classList.remove('active');
    });
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`;

            break;
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>`;

            break;
        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar à superfície. <strong class="app__title-strong">Faça uma pausa longa.</strong`;

        default:
            break;
    }
}

//Botão de Início e Pause

const temporizador = () => {
    if (tempoEmSeg <= 0) {
        somFim.play();
        zerar();
        const focoAtivo = html.getAttribute('data-contexto') === 'foco';
        if (focoAtivo) {            
            var event = new CustomEvent("TarefaFinalizada", {
                detail: {
                    message: "A tarefa foi concluída com sucesso!",
                    time: new Date(),
                },
                bubbles: true,
                cancelable: true
            });
            document.dispatchEvent(event);
            tempoEmSeg = 5;
            mostrarTempo();
        }

        return
    }

    tempoEmSeg -= 1
    mostrarTempo()
    }

startPauseBt.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
    if(intervaloId){
        somPause.play();
        zerar();
        return;
    }
    somInicio.play();
    intervaloId = setInterval(temporizador, 1000);
    iniciarOuPausarBt.textContent = "Pausar";
    iconeTroca.setAttribute('src', '/imagens/pause.png');
}

function zerar() {
    clearInterval(intervaloId);
        iniciarOuPausarBt.textContent = 'Começar';
        iconeTroca.setAttribute('src', '/imagens/play_arrow.png');
        intervaloId = null;
}

function mostrarTempo() {
    const tempo = new Date(tempoEmSeg * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'});
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();


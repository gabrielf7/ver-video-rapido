const NORMAL_VELOCIDADE = 1;

const estado = {
  ativar: null,
  velocidade: null,
  videos: null,
};

(function() {
  ativado();
})();

async function ativado() {
  estado.ativar = await getAtivar();
  if(!estado.ativar) return;

  estado.velocidade = await getVelocidade();
  getVideosESetsVelocidade();

  window.addEventListener("yt-navigate-finish", getVideosESetsVelocidade);
}

function getVideosESetsVelocidade() {
  estado.videos = getVideos();
  setTodosVideosVelocidade();
}

function getVideos() {
  return window.document.getElementsByTagName('video');
}

function setTodosVideosVelocidade({ restaurarVelocidadeNormal = false } = {}) {
  const velocidade = restaurarVelocidadeNormal ? NORMAL_VELOCIDADE : estado.velocidade;
  for (video of estado.videos) {
    setVideoVelocidade(video, velocidade);
  }
}

function setVideoVelocidade(video, velocidade) {
  video.playbackRate = velocidade;
}

onMensagem(mensagemAcoes);

function mensagemAcoes(mensagem) {
  switch (mensagem) {
    case "velocidadeChanged":
      if (estado.ativar) atualizarESetVelocidade();
    break;
    case "ativado":
      ativado();
    break;
    case "desativado":
      desativado();
    break;
  
    default: break;
  }
}

async function atualizarESetVelocidade() {
  estado.velocidade = await getVelocidade();
  setTodosVideosVelocidade();
}

async function desativado() {
  estado.ativar = await getAtivar();
  if(estado.ativar) return;

  if(estado.videos) setTodosVideosVelocidade({ restaurarVelocidadeNormal: true });
  window.removeEventListener("yt-navigate-finish", getVideosESetsVelocidade);
}

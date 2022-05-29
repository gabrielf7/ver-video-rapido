if (typeof contentJS === 'undefined') {
  const contentJS = function() {
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

    function mensagemAcoes(request, sender, sendResponse) {
      console.log(sender.tab ?
        "from a content script:" + sender.tab.url :
        "from the extension"
      );
      switch (request.message) {
        case "velocidadeChanged":
          if (estado.ativar) atualizarESetVelocidade();
        case "ativado":
          ativado();
        case "desativado":
          desativado();
      }
      sendResponse({ status: "Mensagem Recebida" });
      return true; 
    }

    // Manifest V2
    // function mensagemAcoes(mensagem) {
    //   switch (mensagem) {
    //     case "velocidadeChanged":
    //       if (estado.ativar) atualizarESetVelocidade();
    //     case "ativado":
    //       ativado();
    //     case "desativado":
    //       desativado();
    //   }
    // }
  
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
  
  }
  console.log("VVR - Running ContentJS");
  contentJS();
}

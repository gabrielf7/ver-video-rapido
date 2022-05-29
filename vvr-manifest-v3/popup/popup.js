function carregarPopup() {
  const ativarCheck = window.document.getElementById("ativar");
  const velocidadeTexto = window.document.getElementById("velocidadeTexto");
  const velocidadeRange = window.document.getElementById("velocidadeRange");
  const btnSalvar = window.document.getElementById("btnSalvar");

  // Processos
  let estadoInicial, 
    estado = {
      ativar: null,
      velocidade: null,
    };
  const TAXA_NORMAL = 10;
  
  (async function(){
    estado = await getEstadoInicial();
    estadoInicial = { ...estado };

    atualizarAtivarCheck();
    addListenerAtivarCheck();

    atualizarVelocidade();
    addListenerVelocidadeRange();

    addListenerBTNSalvar();
  })();

  async function getEstadoInicial() {
    return {
      ativar: await getAtivar(),
      velocidade: await getVelocidade(),
    };
  }

  function atualizarAtivarCheck() {
    ativarCheck.checked = estado.ativar;
  }
  
  function addListenerAtivarCheck() {
    ativarCheck.onclick = (evento) => {
      onAtivarCheckClicado(evento);
    };
  }

  function onAtivarCheckClicado(evento) {
    estado.ativar = evento.target.checked;
    atualizarAtivarCheck();
  }

  function atualizarVelocidade() {
    velocidadeRange.value = getNormalizarVelocidade(estado.velocidade);
    velocidadeTexto.textContent = `${estado.velocidade}`;
  }

  function getNormalizarVelocidade(velocidade) {
    return velocidade * TAXA_NORMAL;
  }

  function addListenerVelocidadeRange() {
    velocidadeRange.oninput = onRangeValueChange;
  }

  function onRangeValueChange() {
    estado.velocidade = getRealVelocidade(this.value);
    atualizarVelocidade();
  }

  function getRealVelocidade(velocidade) {
    return velocidade / TAXA_NORMAL;
  }

  function addListenerBTNSalvar() {
    btnSalvar.onclick = (evento) => {
      onBTNSalvarClicado(evento);
    };
  }

  async function onBTNSalvarClicado(evento) {
    setSalvandoTexto(evento.target);
    if(estado.ativar != estadoInicial.ativar) await salvarAtivar();
    if(estado.velocidade != estadoInicial.velocidade) await salvarVelocidade();
    estadoInicial = { ...estado };
  }

  function setSalvandoTexto(elemento) {
    elemento.textContent = "Salvando...";
    setTimeout(() => {
      elemento.textContent = "Salvar";
    }, 300);
  }

  async function salvarAtivar() {
    await setAtivar(estado.ativar);
    if (estado.ativar) await enviarMensagem("ativado");
    else await enviarMensagem("desativado");
  }

  async function salvarVelocidade() {
    await setVelocidade(estado.velocidade);
    await enviarMensagem("velocidadeChanged");
  }
}

window.addEventListener("load", carregarPopup);

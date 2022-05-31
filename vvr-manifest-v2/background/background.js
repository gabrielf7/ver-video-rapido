// --------------------------------------------------------------------------
// [Instalação | Atualizar | Desinstalar]
// --------------------------------------------------------------------------
// [Instalação] details.reason == "install" => Chamar uma função para lidar com uma primeira instalação 
// [Atualizar] details.reason == "update" => Chamar uma função para lidar com uma atualização
// [Desinstalar] chrome.runtime.setUninstallURL(url, callback)
// let URL_UNINSTALL = "link-externo";
// if (details.reason == chrome.runtime.OnInstalledReason.INSTALL) {
//   chrome.runtime.setUninstallURL(URL_UNINSTALL);
// }
// [Executar]
chrome.runtime.onInstalled.addListener((details=Object) => {
  const URL_INSTALL = chrome.runtime.getURL("options/index.html"); 
  const URL_UPDATE = chrome.runtime.getURL("update.html"); 
  if(details.reason == "install"){ 
    chrome.tabs.create({
      url: URL_INSTALL
    });
  } else if(details.reason == "update") {
    chrome.tabs.create({
      url: URL_UPDATE
    });
  }
});
// --------------------------------------------------------------------------

const NORMAL_VELOCIDADE = 1;

onExtensionInstalled(setInicializar);

function setInicializar() {
  setInicializarAtivar();
  setInicializarVelocidade();
}

async function setInicializarAtivar() {
  const ativar = await getAtivar();
  if(ativar == null) await setAtivar(true);
}

async function setInicializarVelocidade() {
  const velocidade = await getVelocidade();
  if(velocidade == null) await setVelocidade(NORMAL_VELOCIDADE);
}
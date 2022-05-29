// --------------------------------------------------------------------------
// [Instalação | Atualizar | Desinstalar]
// --------------------------------------------------------------------------
// [Instalação] details.reason == "install" => Chamar uma função para lidar com uma primeira instalação 
// [Atualizar] details.reason == "update" => Chamar uma função para lidar com uma atualização
// [Desinstalar] chrome.runtime.setUninstallURL(url, callback)
// const URL_UNINSTALL = "";
// if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
//   chrome.runtime.setUninstallURL(URL_UNINSTALL);
// }
// --------------------------------------------------------------------------

try {
  const NORMAL_VELOCIDADE = 1;
  const INSTALL = "install";  const UPDATE = "update";
  const URL_INSTALL = "./options/index.html"; const URL_UPDATE = "update.html"; 

  // [Executar]
  chrome.runtime.onInstalled.addListener((details=Object) => {
    if(details.reason == INSTALL){ 
      OnInstallLink(INSTALL);
      setInicializar();
    } else if(details.reason == UPDATE) {
      OnInstallLink(UPDATE);
    }
  });
  
  function OnInstallLink(runtime) {
    if(INSTALL == runtime) chrome.tabs.create({ url: URL_INSTALL });
    if(UPDATE == runtime) chrome.tabs.create({ url: URL_UPDATE });
  }

  function setInicializar() {
    setInicializarAtivar();
    setInicializarVelocidade();
    setNotifications(1, 5000, "notificationTitleInstall", "notificationContentInstall");
  }

  function setNotifications(setId, setTime, setTitle, setContent) {
    const id = `ID_Notifications_[${setId}]`;
    const tempo = setTime;
    const title = chrome.i18n.getMessage(setTitle);
    const content = chrome.i18n.getMessage(setContent); 
    const options = {
      type: 'basic',
      iconUrl: chrome.runtime.getURL("./src/favicon-32x32.png"),
      title: title,
      message: content,
      eventTime: Date.now(),
      isClickable: false,
      priority: 1
    };
    const createCallback = function(notificationId) { console.log(notificationId); };
    chrome.notifications.create(id, options, createCallback); // returns 'ID_Notifications';
    setTimeout(() => {
      const clearCallback = function(notificationCleared) { console.log(notificationCleared); };
      chrome.notifications.clear(id, clearCallback); // returns true;
    }, tempo);
  }

  async function setInicializarAtivar() {
    const ativar = await getAtivar();
    if(ativar == null) await setAtivar(true);
  }

  async function setInicializarVelocidade() {
    const velocidade = await getVelocidade();
    if(velocidade == null) await setVelocidade(NORMAL_VELOCIDADE);
  }

  function getAtivar() {
    return chromeStorageLocalGet("ativar");
  }
  function setAtivar(ativarValor) {
    return chromeStorageLocalSet({ ativar: ativarValor });
  }
  function getVelocidade() {
    return chromeStorageLocalGet("velocidade");
  }
  function setVelocidade(velocidadeValor) {
    return chromeStorageLocalSet({ velocidade: velocidadeValor });
  }

  /**
   * chrome.storage.local.get returning a Promise
   * @param {string} key
   */
  function chromeStorageLocalGet(key) {
    return new Promise((resolve) => 
      chrome.storage.local.get([key], (result) => {
        resolve(result[key]);
      })
    );
  }

  /**
   * chrome.storage.local.set returning a Promise
   * @param {object} {key: value} object
   */
  function chromeStorageLocalSet(object) {
    return new Promise((resolve) => chrome.storage.local.set(object, resolve));
  }

} catch(e) {
  console.log(`Erro: ${e}`);
}

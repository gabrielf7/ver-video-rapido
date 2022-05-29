function onExtensionInstalled(listener) {
  chromeRuntimeOnInstalledAddListener(listener);
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

function onMensagem(listener) {
  chromeRuntimeOnMessageAddListener(listener);
}

async function enviarMensagem(message) {
  const tabs = await chromeTabsQuery();
  for (settab of tabs) {
    chromeTabsSendMessage(settab.id, message);
  }
}

// Chrome API! WARNING: not handling exceptions

function chromeRuntimeOnMessageAddListener(listener) {
  chrome.runtime.onMessage.addListener(listener);
}

function chromeTabsSendMessage(tabId, message) {
  chrome.tabs.sendMessage(tabId, message);
}

function chromeRuntimeOnInstalledAddListener(listener) {
  chrome.runtime.onInstalled.addListener(listener);
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

/**
 * chrome.tabs.query returning a Promise
 * @param Tabs array
 */
function chromeTabsQuery() {
  return new Promise((resolve) => chrome.tabs.query({}, resolve));
}
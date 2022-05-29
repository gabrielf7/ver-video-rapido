console.log("VVR - Running UtilsJS | Protocol: " + window.location.protocol);

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

async function enviarMensagem(setMessage) {
  chromeTabsQuery({active: true, currentWindow: true}, function(tabs) {
    for (setTab of tabs) {
      chromeTabsSendMessage(setTab.id, setMessage , function (response) {
        console.log(response.status);
      });
    }
  });
}

// Manifest V2
// async function enviarMensagem(message) {
//   const tabs = await chromeTabsQuery();
//   for (setTab of tabs) {
//     chromeTabsSendMessage(setTab.id, message);
//   }
// }

// Chrome API! WARNING: not handling exceptions

function chromeRuntimeOnMessageAddListener(listener) {
  chrome.runtime.onMessage.addListener(listener);
}

function chromeTabsSendMessage(tabId, setMessage, listener) {
  chrome.tabs.sendMessage(tabId, { message: setMessage }, listener);
}

// Manifest V2
// function chromeTabsSendMessage(tabId, message) {
//   chrome.tabs.sendMessage(tabId, message);
// }

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

function chromeTabsQuery(object=Object, listener=Function) {
  return chrome.tabs.query(object, listener);
}

// Manifest V2
/**
 * chrome.tabs.query returning a Promise
 * @param {object, function} object function 
 */
// function chromeTabsQuery() {
//   return new Promise((resolve) => chrome.tabs.query({}, resolve));
// }

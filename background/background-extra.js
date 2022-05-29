// browser.management.getAll(function(items) {
//   for (let index = 0; index < items.length; index++) {
//     if(list[index2].name == nomeExtensao) {
//       id = list[index2].id;
//       console.log( "\n\n\nNOME: " + list[index2].name + " \nID: " + list[index2].id);
//     }
//     // console.log(typeof nomeExtensao);
//     // console.log( "NOME: " + list[index2].name + " \nID: " + list[index2].id);
//   }
// });

// content.js
//
// setTimeout(function() {
//   sendResponse({status: true});
// }, 1);

// Utils.js
//
// function chromeTabsSendMessage(tabId, message) {
//   chrome.tabs.sendMessage(tabId, message);
  // const err1 = new Error('Callstack before sendMessage:');
  // return new Promise((resolve, reject) => {
  //   chrome.runtime.sendMessage(message, res => {
  //     let err2 = chrome.runtime.lastError;
  //     if (!err2 || err2.message.startsWith('The message port closed before')) {
  //       resolve(res);
  //     } else {
  //       err2 = new Error(err2.message);
  //       err2.stack += err1.stack.replace(/^Error:\s*/, '');
  //       reject(err2);
  //     }
  //   });
  // });
// }

// popup.js
//
// function chromeRuntimeSendMessage(setMessage) {
//   document.addEventListener("DOMContentLoaded", async () => {
//     const tabs = await new Promise((resolve) => chrome.tabs.query({}, resolve));
//     let setTabRuntime;
//     for (setTab of tabs) {
//       setTabRuntime = setTab.id
//       chrome.runtime.sendMessage({ id: setTabRuntime, message: setMessage }, function (response) {
//         console.log(response.farewell);
//       });
//     }
//   });
// }
// chrome.action.onClicked.addListener(async (tab) => {
//   chrome.tabs.query({
//       active: true,
//       currentWindow: true
//   }, function (tabs) {
//     chrome.scripting.executeScript({
//       target: {tabId: tabs[0].id},
//       function: getEstadoInicial
//     }, function (selection) {
//       estado = selection[0].result,
//       console.log(estado = selection[0].result)
//     });
//   });
//   estadoInicial = { ...estado };
  
//   chrome.scripting.executeScript({
//     target: {tabId: tab.id},
//     func: addListenerBTNSalvar,
//   });
// })

// background.js
//
// browser.runtime.onMessage.addListener(async function(request, sender, sendResponse) {
//   if (request.message == MESSAGE) {
//     let id = browser.runtime.id;
//     browser.management.setEnabled(id, false); 
//   }
// });
// chrome.tabs.onActivated.addListener(function() {
//   chrome.notifications.create({
//     type: 'basic',
//     iconUrl: '../src/github-icon-32x32.png',
//     title: `Instalação`,
//     message: "Ver Vídeo Rápido foi Instalado",
//     eventTime: Date.now(),
//     isClickable: false,
//     priority: 1
//   })
// });
// const URL_CHROME = "chrome://"; const URL_EDGE = "edge://";
// if((!tab.url === URL_CHROME) || (!tab.url ===  URL_EDGE)) {
// }
// chrome.runtime.onInstalled.addListener(function listener(details) {
//   if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
//     chrome.tabs.query({
//       url: [
//         'https://localhost:3000/*',
//       ]
//     }, (tabs) => {
//       Array.from(tabs).forEach(tab => {
//         chrome.scripting.executeScript({
//           target: { tabId: tab.id },
//           func: setInicializar
//         });
//       });
//     });

//     chrome.runtime.onInstalled.removeListener(listener);
//   }
// });
// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
//   console.log("Mostrando URL com 'tabId'" + tabId);
//   console.log("Mostrando URL com 'tab'" + tab.url);
//   console.log("Mostrando URL com 'changeInfo'" + changeInfo[0]);
//   // console.log("Mostrando URL com 'window.location.toString': " + window.location.toString());
//   if(changeInfo.status === "complete"){
//     // if((!tab.url === URL_CHROME) || (!tab.url === URL_EDGE)) {
//       chrome.scripting.executeScript({
//         target: {tabId: tab.id},
//         files: ['./Utils.js']
//       });
//       chrome.scripting.executeScript({
//         target: {tabId: tab.id},
//         files: ['./content.js']
//       });
//     // }
//   }
// });
// chrome.runtime.onInstalled.addListener(() => {
// });
// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
//   if(changeInfo.status == "complete"){
//   }
// });

// setTimeout(() => {
// }, 700);

// function executeScriptOnExtensionInstalled(execute) {
//   onExtensionInstalled(execute);
// }

// Executar Função com Scripting
// chrome.action.onClicked.addListener((tab) => {
//   chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     func: executeScriptOnExtensionInstalled,
//     args: [setInicializar],
//   });
// });

// chrome.action.onClicked.addListener(() => {
//   chrome.windows.create({
//     focused: true,
//     width: 400,
//     height: 600,
//     type: 'popup',
//     url: 'popup/popup.html',
//     top: 0,
//     left: 0
//   },
//   () => {})
// })


// --------------------------------------------------------------------------
// [Instalação | Atualizar | Desinstalar]
// --------------------------------------------------------------------------
// [Instalação] details.reason == "install" => Chamar uma função para lidar com uma primeira instalação 
// [Atualizar] details.reason == "update" => Chamar uma função para lidar com uma atualização
// [Desinstalar] chrome.runtime.setUninstallURL(url, callback)
// let URL_UNINSTALL = "";
// if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
//   chrome.runtime.setUninstallURL(URL_UNINSTALL);
// }
// [Executar]
// chrome.runtime.onInstalled.addListener(() => {
//   chrome.action.onClicked.addListener((tab) => {
//     if((!tab.url === "chrome://") || (!tab.url ===  "edge://")) {
//       chrome.scripting.executeScript({
//         target: {tabId: tab.id},
//         files: ['../Utils.js']
//       });
//     }
//   });
  // details=Object
  // let URL_INSTALL = "install.html"; let URL_UPDATE = "update.html"; 
  // if(details.reason === "install"){ 
  //   chrome.tabs.create({
  //     url: URL_INSTALL
  //   });
  // } else if(details.reason === "update") {
  //   chrome.tabs.create({
  //     url: URL_UPDATE
  //   });
  // }
// });
// --------------------------------------------------------------------------

// Scripts de conteúdo podem ser injetados como arquivos...
// async function getCurrentTab() {
//   let queryOptions = { active: true, currentWindow: true };
//   let [tab] = await chrome.tabs.query(queryOptions);
//   return tab;
// }
// chrome.action.onClicked.addListener((tab) => {
//   if((!tab.url === "chrome://") || (!tab.url ===  "edge://")) {
//     chrome.scripting.executeScript({
//       target: {tabId: tab.id},
//       files: ['../Utils.js']
//     });
//   }
// });


// const NORMAL_VELOCIDADE = 1;

// chrome.action.onClicked.addListener((tab) => {
//   chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     func: onExtensionInstalled,
//     args: [setInicializar],
//   });
// });

// function setInicializar() {
//   setInicializarAtivar();
//   setInicializarVelocidade();
// }
// async function setInicializarAtivar() {
//   const ativar = await getAtivar();
//   if(ativar == null) await setAtivar(true);
// }

// async function setInicializarVelocidade() {
//   const velocidade = await getVelocidade();
//   if(velocidade == null) await setVelocidade(NORMAL_VELOCIDADE);
// }

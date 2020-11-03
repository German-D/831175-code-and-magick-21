'use strict';

(function () {

  var loadURL = `https://21.javascript.pages.academy/code-and-magick/data`;
  var saveURL = `https://21.javascript.pages.academy/code-and-magick`;

  var StatusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 10000;

  var loadWizards = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      if (xhr.status === StatusCode.OK) {
        var shuffleResponse = window.utils.shuffle(xhr.response);
        onSuccess(shuffleResponse);
      } else {
        onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
      }
    });

    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });

    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open(`GET`, loadURL);
    xhr.send();
  };

  var saveForm = function (data, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      onSuccess();
    });

    xhr.open(`POST`, saveURL);
    xhr.send(data);
  };

  window.backend = {
    loadWizards,
    saveForm,
  };
})();

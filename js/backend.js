'use strict';

(function () {

  var LOADURL = `https://21.javascript.pages.academy/code-and-magick/data`;
  var SAVEURL = `https://21.javascript.pages.academy/code-and-magick`;
  var TIMEOUT_IN_MS = 10000;

  var StatusCode = {
    OK: 200
  };

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

    xhr.open(`GET`, LOADURL);
    xhr.send();
  };

  var saveForm = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess();
      } else {
        onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
      }
    });

    xhr.open(`POST`, SAVEURL);
    xhr.send(data);
  };

  window.backend = {
    loadWizards,
    saveForm,
  };
})();

'use strict';
(function () {

  /* ++++++++++ ++++++++++ ++++++++++ ++++++++++ ++++++++++++++++++++ ++++++++++ */
  // Функция возвращет случайное число от 0 до длинны массива
  var getRandomElement = function (elements) {
    return Math.floor(Math.random() * elements.length);
  };

  window.utils = {
    getRandomElement,
  };
})();

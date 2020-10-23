'use strict';

(function () {

  var setupSimilar = document.querySelector(`.setup-similar`);
  var similarListElement = document.querySelector(`.setup-similar-list`);
  setupSimilar.classList.remove(`hidden`);

  /* ++++++++++ ++++++++++ ++++++++++ ++++++++++ ++++++++++++++++++++ ++++++++++ */
  // Вводные данные
  var names = [
    `Иван`,
    `Хуан Себастьян`,
    `Мария`,
    `Кристоф`,
    `Виктор`,
    `Юлия`,
    `Люпита`,
    `Вашингтон`,
  ];

  var secondName = [
    `да Марья`,
    `Верон`,
    `Мирабелла`,
    `Вальц`,
    `Онопко`,
    `Топольницкая`,
    `Нионго`,
    `Ирвинг`,
  ];

  var coatColors = [
    `rgb(101, 137, 164)`,
    `rgb(241, 43, 107)`,
    `rgb(146, 100, 161)`,
    `rgb(56, 159, 117)`,
    `rgb(215, 210, 55)`,
    `rgb(0, 0, 0)`,
  ];

  var eyesColors = [
    `black`,
    `red`,
    `blue`,
    `yellow`,
    `green`,
  ];

  /* ++++++++++ ++++++++++ ++++++++++ ++++++++++ ++++++++++++++++++++ ++++++++++ */
  // Функция возвращет массив с заданным количеством магов
  var createWizards = function (quantity) {
    var wizards = [];
    for (var i = 0; i < quantity; i++) {
      wizards.push({
        name: names[window.utils.getRandomElement(names)] + ` ` + secondName[window.utils.getRandomElement(secondName)],
        coatColor: coatColors[window.utils.getRandomElement(coatColors)],
        eyesColor: eyesColors[window.utils.getRandomElement(eyesColors)],
      });
    }
    return wizards;
  };

  /* ++++++++++ ++++++++++ ++++++++++ ++++++++++ ++++++++++++++++++++ ++++++++++ */
  // Отрисовка магов
  var renderWizard = function (wizard) {
    var similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
    .content
    .querySelector(`.setup-similar-item`);
    var wizardElement = similarWizardTemplate.cloneNode(true);
    var setupSimilarLabel = wizardElement.querySelector(`.setup-similar-label`);
    var wizardCoat = wizardElement.querySelector(`.wizard-coat`);
    var wizardEyes = wizardElement.querySelector(`.wizard-eyes`);

    setupSimilarLabel.textContent = wizard.name;
    wizardCoat.style.fill = wizard.coatColor;
    wizardEyes.style.fill = wizard.eyesColor;

    return wizardElement;
  };

  var renderAllWizards = function (wizards) {

    var fragment = document.createDocumentFragment();
    for (var k = 0; k < wizards.length; k++) {
      var newWizard = renderWizard(wizards[k]);
      fragment.appendChild(newWizard);
    }

    similarListElement.appendChild(fragment);
  };

  renderAllWizards(createWizards(4));

  /* ++++++++++ ++++++++++ ++++++++++ ++++++++++ ++++++++++++++++++++ ++++++++++ */
  // Открытие и закрытие окон

  var setupWindow = document.querySelector(`.setup`);
  var setupOpen = document.querySelector(`.setup-open`);
  var setupClose = document.querySelector(`.setup-close`);
  var setupOpenIcon = document.querySelector(`.setup-open-icon`);
  var setupUserName = document.querySelector(`.setup-user-name`);
  var setupWindowX;
  var setupWindowY;

  /* ++++++++++ ++++++++++ ++++++++++ ++++++++++ ++++++++++++++++++++ ++++++++++ */
  // Функции открытия и закрытия окна
  var popupOpen = function () {

    setupWindow.classList.remove(`hidden`);
    setupOpen.removeEventListener(`click`, setupWindowClickHandler);
    setupOpenIcon.removeEventListener(`keydown`, setupOpenIconKeydownHandler);

    document.addEventListener(`keydown`, documentKeydownHandler);
    setupClose.addEventListener(`click`, setupCloseClickHandler);
    setupClose.addEventListener(`keydown`, setupCloseKeydownkHandler);

    // Сохраняю позицию окна при закрытии
    setupWindowX = setupWindow.offsetLeft;
    setupWindowY = setupWindow.offsetTop;
  };

  var popupClose = function () {
    // Сохраняю позицию окна при закрытии
    setupWindow.style.left = setupWindowX + `px`;
    setupWindow.style.top = setupWindowY + `px`;

    setupWindow.classList.add(`hidden`);
    document.removeEventListener(`keydown`, documentKeydownHandler);
    setupClose.removeEventListener(`click`, setupCloseClickHandler);
    setupClose.removeEventListener(`keydown`, setupCloseKeydownkHandler);

    setupOpen.addEventListener(`click`, setupWindowClickHandler);
    setupOpenIcon.addEventListener(`keydown`, setupOpenIconKeydownHandler);
  };

  /* ++++++++++ ++++++++++ ++++++++++ ++++++++++ ++++++++++++++++++++ ++++++++++ */
  // Обработчики

  var setupWindowClickHandler = function () {
    popupOpen();
  };

  var setupCloseClickHandler = function () {
    popupClose();
  };

  var setupOpenIconKeydownHandler = function (evt) {
    if (evt.key === `Enter`) {
      popupOpen();
    }
  };

  var documentKeydownHandler = function (evt) {
    if (evt.key === `Escape`) {
      if (evt.target === setupUserName) {
        return;
      }
      popupClose();
    }
  };


  var setupCloseKeydownkHandler = function (evt) {
    if (evt.key === `Enter`) {
      popupClose();
    }
  };

  // Два дефолтных обработчика оставляем
  setupOpen.addEventListener(`click`, setupWindowClickHandler);
  setupOpenIcon.addEventListener(`keydown`, setupOpenIconKeydownHandler);

  window.setup = {
    coatColors,
    eyesColors,
  };
})();

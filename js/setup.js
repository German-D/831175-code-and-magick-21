'use strict';

var setupSimilar = document.querySelector(`.setup-similar`);
var similarListElement = document.querySelector(`.setup-similar-list`);

// Функция удаления класса у ноды
var deleteClass = function (tag, attr) {
  tag.classList.remove(attr);
};

deleteClass(setupSimilar, `hidden`);

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

var coatColor = [
  `rgb(101, 137, 164)`,
  `rgb(241, 43, 107)`,
  `rgb(146, 100, 161)`,
  `rgb(56, 159, 117)`,
  `rgb(215, 210, 55)`,
  `rgb(0, 0, 0)`,
];

var eyesColor = [
  `black`,
  `red`,
  `blue`,
  `yellow`,
  `green`,
];

/* ++++++++++ ++++++++++ ++++++++++ ++++++++++ ++++++++++++++++++++ ++++++++++ */
// Функция возвращет случайное число от 0 до длинны массива
var getRandomElement = function (elements) {
  return Math.floor(Math.random() * elements.length);
};

/* ++++++++++ ++++++++++ ++++++++++ ++++++++++ ++++++++++++++++++++ ++++++++++ */
// Функция возвращет массив с заданным количеством магов
var createWizards = function (quantity) {
  let wizards = [];
  for (let i = 0; i < quantity; i++) {
    wizards.push({
      name: names[getRandomElement(names)] + ` ` + secondName[getRandomElement(secondName)],
      coatColor: coatColor[getRandomElement(coatColor)],
      eyesColor: eyesColor[getRandomElement(eyesColor)],
    });
  }
  return wizards;
};

/* ++++++++++ ++++++++++ ++++++++++ ++++++++++ ++++++++++++++++++++ ++++++++++ */
// Отрисовка магов
var renderWizard = function (wizard) {
  let similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
    .content
    .querySelector(`.setup-similar-item`);
  let wizardElement = similarWizardTemplate.cloneNode(true);
  let setupSimilarLabel = wizardElement.querySelector(`.setup-similar-label`);
  let wizardCoat = wizardElement.querySelector(`.wizard-coat`);
  let wizardEyes = wizardElement.querySelector(`.wizard-eyes`);

  setupSimilarLabel.textContent = wizard.name;
  wizardCoat.style.fill = wizard.coatColor;
  wizardEyes.style.fill = wizard.eyesColor;

  return wizardElement;
};

var renderAllWizards = function (wizards) {

  let fragment = document.createDocumentFragment();
  for (let k = 0; k < wizards.length; k++) {
    let newWizard = renderWizard(wizards[k]);
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


/* ++++++++++ ++++++++++ ++++++++++ ++++++++++ ++++++++++++++++++++ ++++++++++ */
// Функции открытия и закрытия окна
var popupOpen = function () {
  setupWindow.classList.remove(`hidden`);
  setupOpen.removeEventListener(`click`, setupWindowClickHandler);
  setupOpenIcon.removeEventListener(`keydown`, setupOpenIconKeydownHandler);

  document.addEventListener(`keydown`, documentKeydownHandler);
  setupClose.addEventListener(`click`, setupCloseClickHandler);
  setupClose.addEventListener(`keydown`, setupCloseKeydownkHandler);
};

var popupClose = function () {
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
  setupWindow.classList.add(`hidden`);
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

'use strict';

var setup = document.querySelector(`.setup`);
var setupSimilar = document.querySelector(`.setup-similar`);
var similarListElement = document.querySelector(`.setup-similar-list`);

// Функция удаления класса у ноды
var deleteClass = function (tag, attr) {
  tag.classList.remove(attr);
};

deleteClass(setupSimilar, `hidden`);
deleteClass(setup, `hidden`);

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
  var wizards = [];
  for (var i = 0; i < quantity; i++) {
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

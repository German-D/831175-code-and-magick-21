'use strict';

var setup = document.querySelector('.setup');
var setupSimilar = document.querySelector('.setup-similar');
var similarListElement = document.querySelector('.setup-similar-list');

setupSimilar.classList.remove('hidden');
setup.classList.remove('hidden');

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

var getRandomNumberInRange = function (min, max) {
  return Math.floor(
    min + Math.random() * (max + 1 - min));
};

var wizards = [];

for (var i = 0; i < 4; i++) {
  var getRandomNamePosition = getRandomNumberInRange(0, names.length - 1);
  var getrandomSecondNamePosition = getRandomNumberInRange(0, secondName.length - 1);
  wizards.push({
    name: names[getRandomNamePosition] + ` ` + secondName[getrandomSecondNamePosition],
    coatColor: coatColor[getRandomNumberInRange(0, coatColor.length - 1)],
    eyesColor: eyesColor[getRandomNumberInRange(0, eyesColor.length - 1)],
  });
}

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var renderWizard = function (wizard, template) {
  var wizardElement = template.cloneNode(true);
  var setupSimilarLabel = wizardElement.querySelector('.setup-similar-label');
  var wizardCoat = wizardElement.querySelector('.wizard-coat');
  var wizardEyes = wizardElement.querySelector('.wizard-eyes');

  setupSimilarLabel.textContent = wizard.name;
  wizardCoat.style.fill = wizard.coatColor;
  wizardEyes.style.fill = wizard.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var k = 0; k < wizards.length; k++) {
  var newWizard = renderWizard(wizards[k], similarWizardTemplate);
  fragment.appendChild(newWizard);
}

similarListElement.appendChild(fragment);

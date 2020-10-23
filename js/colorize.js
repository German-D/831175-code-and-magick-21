'use strict';
(function () {
  /* ++++++++++ ++++++++++ ++++++++++ ++++++++++ ++++++++++++++++++++ ++++++++++ */
  // Смена цвета мантии, глаз и фаербола

  var fireColors = [
    `#ee4830`,
    `#30a8ee`,
    `#5ce6c0`,
    `#e848d5`,
    `#e6e848`,
  ];

  var setupWizardForm = document.querySelector(`.setup-wizard-form`);
  var wizardCoat = document.querySelector(`.setup-wizard .wizard-coat`);
  var wizardEyes = document.querySelector(`.setup-wizard .wizard-eyes`);
  var setupFireball = document.querySelector(`.setup-fireball-wrap`);

  var wizardCoatClickHandler = function (evt) {
    var newCoatColor = window.setup.coatColors[window.utils.getRandomElement(window.setup.coatColors)];
    evt.currentTarget.style.fill = newCoatColor;
    setupWizardForm.querySelector(`input[name=coat-color]`).value = newCoatColor;
  };

  var wizardEyesClickHandler = function (evt) {
    var newEyesColor = window.setup.eyesColors[window.utils.getRandomElement(window.setup.eyesColors)];
    evt.currentTarget.style.fill = newEyesColor;
    setupWizardForm.querySelector(`input[name=eyes-color]`).value = newEyesColor;
  };

  var setupFireballClickHandler = function (evt) {
    var newFireColor = fireColors[window.utils.getRandomElement(fireColors)];
    evt.currentTarget.style.backgroundColor = newFireColor;
    evt.currentTarget.querySelector(`input`).value = newFireColor;
  };

  wizardCoat.addEventListener(`click`, wizardCoatClickHandler);
  wizardEyes.addEventListener(`click`, wizardEyesClickHandler);
  setupFireball.addEventListener(`click`, setupFireballClickHandler);

})();

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

  var coatColor = `rgb(101, 137, 164)`;
  var eyesColor = `black`;
  var wizards = [];

  var updateWizards = function () {
    var sameCoatAndEyesWizards = wizards.filter(function (wizard) {
      return wizard.colorCoat === coatColor &&
        wizard.colorEyes === eyesColor;
    });

    var sameCoatWizards = wizards.filter(function (wizard) {
      return wizard.colorCoat === coatColor;
    });

    var sameEyesWizards = wizards.filter(function (wizard) {
      return wizard.colorEyes === eyesColor;
    });

    var filteredWizards = sameCoatAndEyesWizards;

    filteredWizards = filteredWizards.concat(sameCoatWizards);
    filteredWizards = filteredWizards.concat(sameEyesWizards);
    filteredWizards = filteredWizards.concat(wizards);

    var uniqueWizards = filteredWizards.filter(function (wizard, index) {
      return filteredWizards.indexOf(wizard) === index;
    });
    window.setup.renderAllWizards(uniqueWizards);
  };

  var successHandler = function (data) {
    wizards = data;
    updateWizards();
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  window.backend.loadWizards(successHandler, errorHandler);


  var setupWizardForm = document.querySelector(`.setup-wizard-form`);
  var wizardCoat = document.querySelector(`.setup-wizard .wizard-coat`);
  var wizardEyes = document.querySelector(`.setup-wizard .wizard-eyes`);
  var setupFireball = document.querySelector(`.setup-fireball-wrap`);

  var wizardCoatClickHandler = function (evt) {
    var newCoatColor = coatColors[window.utils.getRandomElement(coatColors)];
    evt.currentTarget.style.fill = newCoatColor;
    setupWizardForm.querySelector(`input[name=coat-color]`).value = newCoatColor;
    coatColor = newCoatColor;
    window.debounce(updateWizards);
  };

  var wizardEyesClickHandler = function (evt) {
    var newEyesColor = eyesColors[window.utils.getRandomElement(eyesColors)];
    evt.currentTarget.style.fill = newEyesColor;
    setupWizardForm.querySelector(`input[name=eyes-color]`).value = newEyesColor;
    eyesColor = newEyesColor;
    window.debounce(updateWizards);
  };

  var setupFireballClickHandler = function (evt) {
    var newFireColor = fireColors[window.utils.getRandomElement(fireColors)];
    evt.currentTarget.style.backgroundColor = newFireColor;
    evt.currentTarget.querySelector(`input`).value = newFireColor;
    window.debounce(updateWizards);
  };

  wizardCoat.addEventListener(`click`, wizardCoatClickHandler);
  wizardEyes.addEventListener(`click`, wizardEyesClickHandler);
  setupFireball.addEventListener(`click`, setupFireballClickHandler);

  window.colorize = {
    wizards,
    updateWizards,
    errorHandler,
  };

})();

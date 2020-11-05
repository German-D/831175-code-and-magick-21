'use strict';

(function () {
  var MAX_SIMILAR_WIZARD_COUNT = 4;
  var setupSimilar = document.querySelector(`.setup-similar`);
  var similarListElement = document.querySelector(`.setup-similar-list`);
  setupSimilar.classList.remove(`hidden`);
  var setupWizardForm = document.querySelector(`.setup-wizard-form`);
  var setupWindow = document.querySelector(`.setup`);

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
    wizardCoat.style.fill = wizard.colorCoat;
    wizardEyes.style.fill = wizard.colorEyes;

    return wizardElement;
  };

  var renderAllWizards = function (wizards) {
    var setupSimilarItemCollection = document.querySelectorAll(`.setup-similar-item`);
    setupSimilarItemCollection.forEach(function (item) {
      item.remove();
    });
    var fragment = document.createDocumentFragment();
    for (var k = 0; k < MAX_SIMILAR_WIZARD_COUNT; k++) {
      var newWizard = renderWizard(wizards[k]);
      fragment.appendChild(newWizard);
    }

    similarListElement.appendChild(fragment);
  };

  setupWizardForm.addEventListener(`submit`, function (evt) {
    window.backend.saveForm(new FormData(setupWizardForm), function () {
      setupWindow.classList.add(`hidden`);
    }, window.colorize.errorHandler);
    evt.preventDefault();
  });

  /* ++++++++++ ++++++++++ ++++++++++ ++++++++++ ++++++++++++++++++++ ++++++++++ */
  // Открытие и закрытие окон

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
    // Сохраняю позицию окна при закрытии
    setupWindow.style.left = ``;
    setupWindow.style.top = ``;

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
    renderAllWizards,
  };
})();

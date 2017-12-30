'use strict';

(function () {

  // Валидация полей с кол-вом комнат и гостей
  function checkCapacity(guests, rooms) {
    if ((+guests.value <= +rooms.value && +rooms.value !== 100 && +guests.value !== 0) || (+rooms.value === 100 && +guests.value === 0)) {
      guests.style.borderColor = '';
      rooms.style.borderColor = '';
      return false;
    } else {
      guests.style.borderColor = 'red';
      rooms.style.borderColor = 'red';
      return true;
    }
  }

  // возвращает массив значений select
  function getValues(element) {
    var values = [];
    var optionsElement = element.querySelectorAll('option');
    for (var i = 0; i < optionsElement.length; i++) {
      values[i] = optionsElement[i].value;
    }

    return values;
  }

  function syncValueWithMin(element, value) {
    element.min = value;
  }

  function syncValues(element, value) {
    element.value = value;
  }

  function onLoad(data) {
    data.reset();
    statusElement.textContent = 'Данные успешно отправлены';
    statusElement.setAttribute('style', 'border-color: #5cce5b; background-color: #a6f5a5');
    setTimeout(function () {
      statusElement.textContent = '';
      statusElement.setAttribute('style', 'border-color: transparent');
    }, 3000);
  }

  function onError(message) {
    statusElement.textContent = message;
    statusElement.setAttribute('style', 'border-color: #fa9; background-color: #ffdde5');
    setTimeout(function () {
      statusElement.textContent = '';
      statusElement.setAttribute('style', 'border-color: transparent');
    }, 5000);
  }

  var formElement = document.querySelector('.notice__form');
  var statusElement = document.querySelector('.status__upload');
  var timeInElement = formElement.querySelector('select[name = \'timein\']');
  var timeOutElement = formElement.querySelector('select[name = \'timeout\']');
  var typeElement = formElement.querySelector('select[name = \'type\']');
  var priceElement = formElement.querySelector('input[name = \'price\']');
  var capacityElement = formElement.querySelector('select[name = \'capacity\']');
  var roomElement = formElement.querySelector('select[name = \'rooms\']');

  typeElement.addEventListener('change', function () {
    window.synchronizeFields(typeElement, priceElement, getValues(typeElement), [1000, 0, 5000, 10000], syncValueWithMin);
  });

  timeInElement.addEventListener('change', function () {
    window.synchronizeFields(timeInElement, timeOutElement, getValues(timeInElement), getValues(timeOutElement), syncValues);
  });

  timeOutElement.addEventListener('change', function () {
    window.synchronizeFields(timeOutElement, timeInElement, getValues(timeOutElement), getValues(timeInElement), syncValues);
  });

  formElement.addEventListener('submit', function (event) {
    if (checkCapacity(capacityElement, roomElement)) {
      event.preventDefault();
    } else {
      event.preventDefault();
      window.request.upload(formElement, onLoad, onError);
    }
  });
})();

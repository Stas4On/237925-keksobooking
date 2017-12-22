'use strict';

(function () {
  var form = document.querySelector('.notice__form');
  var timeIn = form.querySelector('select[name = \'timein\']');
  var timeOut = form.querySelector('select[name = \'timeout\']');
  var type = form.querySelector('select[name = \'type\']');
  var price = form.querySelector('input[name = \'price\']');
  var capacity = form.querySelector('select[name = \'capacity\']');
  var room = form.querySelector('select[name = \'rooms\']');

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
    var options = element.querySelectorAll('option');
    for (var i = 0; i < options.length; i++) {
      values[i] = options[i].value;
    }

    return values;
  }

  function syncValueWithMin(element, value) {
    element.min = value;
  }

  function syncValues(element, value) {
    element.value = value;
  }

  type.addEventListener('change', function () {
    window.synchronizeFields(type, price, getValues(type), [1000, 0, 5000, 10000], syncValueWithMin);
  });

  timeIn.addEventListener('change', function () {
    window.synchronizeFields(timeIn, timeOut, getValues(timeIn), getValues(timeOut), syncValues);
  });

  timeOut.addEventListener('change', function () {
    window.synchronizeFields(timeOut, timeIn, getValues(timeOut), getValues(timeIn), syncValues);
  });

  form.addEventListener('submit', function (event) {
    if (checkCapacity(capacity, room)) {
      event.preventDefault();
    }
  });
})();

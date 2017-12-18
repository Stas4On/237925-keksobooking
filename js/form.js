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

  type.addEventListener('change', function () {
    if (type.value === 'bungalo') {
      price.setAttribute('min', '0');
    } else if (type.value === 'flat') {
      price.setAttribute('min', '1000');
    } else if (type.value === 'house') {
      price.setAttribute('min', '5000');
    } else {
      price.setAttribute('min', '10000');
    }
  });

  timeIn.addEventListener('change', function () {
    timeOut.value = timeIn.value;
  });

  timeOut.addEventListener('change', function () {
    timeIn.value = timeOut.value;
  });

  form.addEventListener('submit', function (event) {
    if (checkCapacity(capacity, room)) {
      event.preventDefault();
    }
  });
})();

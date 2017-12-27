'use strict';

(function () {
  var sortForm = document.querySelector('.map__filters');
  var typeHouse = sortForm.querySelector('select[name = \'housing-type\']');
  var priceHouse = sortForm.querySelector('select[name = \'housing-price\']');
  var roomsHouse = sortForm.querySelector('select[name = \'housing-rooms\']');
  var guestsHouse = sortForm.querySelector('select[name = \'housing-guests\']');

  // Фильтрует пины созласно значениям в полях формы
  window.updatePins = function (pins) {
    var features = [];
    var featuresHouse = sortForm.querySelectorAll('input:checked');
    for (var i = 0; i < featuresHouse.length; i++) {
      features.push(featuresHouse[i].value);
    }

    var sortPins = pins.filter(function (it) {
      switch (typeHouse.value) {
        case 'any':
          return it.offer.type;
      }

      return it.offer.type === typeHouse.value;
    }).filter(function (it) {
      switch (priceHouse.value) {
        case 'middle':
          return it.offer.price >= 10000 && it.offer.price <= 50000;
        case 'low':
          return it.offer.price <= 10000;
        case 'high':
          return it.offer.price >= 50000;
      }

      return it.offer.price;
    }).filter(function (it) {
      switch (roomsHouse.value) {
        case 'any':
          return it.offer.rooms;
      }

      return it.offer.rooms === +roomsHouse.value;
    }).filter(function (it) {
      switch (guestsHouse.value) {
        case 'any':
          return it.offer.guests;
      }

      return it.offer.guests === +guestsHouse.value;
    }).filter(function (it) {

      return features.every(function (value) {
        return it.offer.features.includes(value);
      });
    });

    window.renderPins(sortPins);
  };
})();

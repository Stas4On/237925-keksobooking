'use strict';

(function () {
  var sortFormElement = document.querySelector('.map__filters');
  var typeHouseElement = sortFormElement.querySelector('select[name = \'housing-type\']');
  var priceHouseElement = sortFormElement.querySelector('select[name = \'housing-price\']');
  var roomsHouseElement = sortFormElement.querySelector('select[name = \'housing-rooms\']');
  var guestsHouseElement = sortFormElement.querySelector('select[name = \'housing-guests\']');

  // Фильтрует пины созласно значениям в полях формы
  window.updatePins = function (pins) {
    var features = [];
    var featuresHouseElements = sortFormElement.querySelectorAll('input:checked');
    for (var i = 0; i < featuresHouseElements.length; i++) {
      features.push(featuresHouseElements[i].value);
    }

    var sortPins = pins.filter(function (it) {
      switch (typeHouseElement.value) {
        case 'any':
          return it.offer.type;
      }

      return it.offer.type === typeHouseElement.value;
    }).filter(function (it) {
      switch (priceHouseElement.value) {
        case 'middle':
          return it.offer.price >= 10000 && it.offer.price <= 50000;
        case 'low':
          return it.offer.price <= 10000;
        case 'high':
          return it.offer.price >= 50000;
      }

      return it.offer.price;
    }).filter(function (it) {
      switch (roomsHouseElement.value) {
        case 'any':
          return it.offer.rooms;
      }

      return it.offer.rooms === +roomsHouseElement.value;
    }).filter(function (it) {
      switch (guestsHouseElement.value) {
        case 'any':
          return it.offer.guests;
      }

      return it.offer.guests === +guestsHouseElement.value;
    }).filter(function (it) {

      return features.every(function (value) {
        return it.offer.features.includes(value);
      });
    });

    window.renderPins(sortPins);
  };
})();

'use strict';

(function () {
// объявление констант
  var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var TYPES = ['flat', 'house', 'bungalo'];
  var CHECKINS = ['12:00', '13:00', '14:00'];
  var CHECKOUTS = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var ADS_COUNT = 8;

  // объявление фукнций

  // Функция получения рандомного значения между min и max - 1
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  // Функция генерации ссылок на аватарки
  function getAvatar() {
    var sourceImg = [];
    var randomAvatar;
    for (var i = 1; i <= ADS_COUNT; i++) {
      sourceImg[i - 1] = 'img/avatars/user0' + i + '.png';
    }
    randomAvatar = sourceImg[getRandomInt(0, sourceImg.length)];

    return randomAvatar;
  }

  // Функция возвращает рандомное количество фич
  function getFeatures() {
    var features = [];
    var numberFeatures = getRandomInt(1, FEATURES.length);
    for (var i = 0; i < numberFeatures; i++) {
      features[i] = FEATURES[getRandomInt(0, FEATURES.length)];
    }
    return features;
  }

  // Функция возвращает заголовок объявления
  function getRandomTitle() {

    return TITLES[getRandomInt(0, TITLES.length)];
  }

  // Функция возвращает стоимости за ночь
  function getPrice() {

    return getRandomInt(1, 1000 + 1) * 1000;
  }

  // Функция возвращает тип жилища
  function getRandomType() {

    return TYPES[getRandomInt(0, TYPES.length)];
  }

  // Функция получения времени заеезда
  function getCheckin() {

    return CHECKINS[getRandomInt(0, CHECKINS.length)];
  }

  // Функция получения времени выезда
  function getCheckout() {

    return CHECKOUTS[getRandomInt(0, CHECKOUTS.length)];
  }

  // Функция возвращает объект
  window.createPin = function () {
    var loc = {
      x: getRandomInt(300, 900 + 1),
      y: getRandomInt(100, 500 + 1)
    };

    return {
      author: {
        avatar: getAvatar()
      },
      offer: {
        title: getRandomTitle(),
        address: loc.x + ', ' + loc.y,
        price: getPrice(),
        type: getRandomType(),
        rooms: getRandomInt(1, 6),
        guests: getRandomInt(1, 8),
        checkin: getCheckin(),
        checkout: getCheckout(),
        features: getFeatures(),
        description: '',
        photos: []
      },
      location: loc
    };
  };
})();

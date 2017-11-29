'use strict';

// объявление констант
var TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPE = ['flat', 'house', 'bungalo'];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

// объявление фукнций

// Функция получения рандомного значения между min и max - 1
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Функция генерации ссылок на аватарки
function getAvatar() {
  var sourceImg = [];
  var randomAvatar;
  for (var i = 1; i <= 8; i++) {
    sourceImg[i - 1] = 'img/avatars/user0' + i + '.png';
  }
  randomAvatar = sourceImg[getRandomInt(0, sourceImg.length)];

  return randomAvatar;
}

// Функция генерации рандомного количества фич
function getFeatures() {
  var features = [];
  var numberFeatures = getRandomInt(1, FEATURES.length);
  for (var i = 0; i < numberFeatures; i++) {
    features[i] = FEATURES[getRandomInt(0, FEATURES.length)];
  }
  return features;
}

// Функция получения заголовка объявления
function getRandomTitle() {

  return TITLE[getRandomInt(0, TITLE.length)];
}

// Функция получения стоимости за ночь
function getPrice() {

  return getRandomInt(1, 1000 + 1) * 1000;
}

// Функция получения типа жилища
function getRandomType() {

  return TYPE[getRandomInt(0, TYPE.length)];
}

// Функция вывода названия жилища в зависимоти от типа
function getType(type) {
  switch (type) {
    case 'flat':
      return 'Квартира';
    case 'bungalo':
      return 'Бунгало';
  }

  return 'Дом';
}

// Функция получения времени заеезда
function getCheckin() {

  return CHECKIN[getRandomInt(0, CHECKIN.length)];
}

// Функция получения времени выезда
function getCheckout() {

  return CHECKOUT[getRandomInt(0, CHECKOUT.length)];
}

// Функция отрисовки карточек объявлений
function renderAd() {
  var adsElement = similarAds.cloneNode(true);

  adsElement.querySelector('img').setAttribute('src', ad.author.avatar);
  adsElement.querySelector('h3').textContent = ad.offer.title;
  adsElement.querySelector('.popup__price').innerHTML = ad.offer.price + '&#x20bd;/ночь';
  adsElement.querySelector('h4').textContent = getType(ad.offer.type);
  adsElement.querySelector('.popup__rooms').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
  adsElement.querySelector('.popup__checkin').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
  adsElement.querySelector('.popup__description').textContent = ad.offer.description;
  // Удаление элементов списка
  var oldLi = adsElement.querySelectorAll('.feature');

  for (i = 0; i < oldLi.length; i++) {
    oldLi[i].remove();
  }

  // Добавление элемонтов списка
  var fragment = document.createDocumentFragment();

  for (i = 0; i < ad.offer.features.length; i++) {
    var li = document.createElement('li');
    li.classList.add('feature');
    li.classList.add('feature--' + ad.offer.features[i]);

    fragment.appendChild(li);
  }

  adsElement.querySelector('.popup__features').appendChild(fragment);
  adsElement.querySelector('.map__pin').remove();

  return adsElement;
}

// Функция получения объекта
function getAd() {
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
}

// Функция отрисовки указателей на карте
function renderPins() {
  var pinElement = document.querySelector('.map__pin').cloneNode();
  var pinElementImg = document.querySelector('.map__pin img').cloneNode();

  pinElement.setAttribute('style', 'left: ' + ad.location.x + 'px; top: ' + ad.location.y + 'px;');
  pinElement.setAttribute('class', 'map__pin');
  pinElementImg.setAttribute('src', ad.author.avatar);
  pinElementImg.setAttribute('width', '40');
  pinElementImg.setAttribute('height', '40');
  pinElementImg.setAttribute('draggable', 'false');
  pinElement.appendChild(pinElementImg);
  return pinElement;
}

// Работа с DOM
var totalNumberAds = 8;
var map = document.querySelector('.map');
var mapFilter = map.querySelector('.map__filters-container');

map.classList.remove('map--faded');

var similarAds = document.querySelector('template').content;
var fragment = document.createDocumentFragment();
var arrayAds = [];

for (var i = 0; i < totalNumberAds; i++) {
  var ad = getAd();
  fragment.appendChild(renderPins());
  arrayAds[i] = ad;
}

document.querySelector('.map__pins').appendChild(fragment);
document.querySelector('.map').insertBefore(renderAd(), mapFilter);

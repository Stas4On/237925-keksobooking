'use strict';

// объявление констант
var SRC_AVATAR = getAvatar(8);
var TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPE = ['flat', 'house', 'bungalo'];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

// объявление фукнций
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Функция генерации ссылок на аватарки
function getAvatar(number) {
  var sourceImg = [];
  for (var i = 1; i <= number; i++) {
    sourceImg[i - 1] = 'img/avatars/user0' + i + '.png';
  }
  return sourceImg;
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

// Функция отрисовки карточек объявлений
var renderAds = function (num) {
  var adsElement = similarAds.cloneNode(true);
  var list = adsElement.querySelector('.popup__features');
  var listItems = adsElement.querySelectorAll('features');

  adsElement.querySelector('h3').textContent = arrayAds[num].offer.title;
  adsElement.querySelector('.popup__price').textContent = arrayAds[num].offer.price + '&#x20bd;/ночь';
  if (arrayAds[num].offer.type === 'flat') {
    adsElement.querySelector('h4').textContent = 'Квартира';
  } if (arrayAds[num].offer.type === 'bungalo') {
    adsElement.querySelector('h4').textContent = 'Бунгало';
  } else {
    adsElement.querySelector('h4').textContent = 'Дом';
  }
  adsElement.querySelector('.popup__rooms').textContent = arrayAds[num].offer.rooms + ' комнаты для ' + arrayAds[num].offer.guests + ' гостей';
  adsElement.querySelector('.popup__checkin').textContent = 'Заезд после ' + arrayAds[num].offer.checkin + ', выезд до ' + arrayAds[num].offer.checkout;
  /*for (var i = 0; i < arrayAds[num].offer.features.length; i++) {
    listItems[i].setAttribute('class', 'feature feature--' + arrayAds[num].offer.features[i]);
    list.appendChild(listItems);
  }*/
  return adsElement;
};

// Функция отрисовки указателей на карте
var renderPins = function (num) {
  var pinElement = document.querySelector('.map__pin').cloneNode();
  var pinElementImg = document.querySelector('.map__pin img').cloneNode();

  pinElement.setAttribute('style', 'left: ' + arrayAds[num].location.x + 'px; top: ' + arrayAds[num].location.y + 'px;');
  pinElement.setAttribute('class', 'map__pin');
  pinElementImg.setAttribute('src', arrayAds[num].author.avatar);
  pinElementImg.setAttribute('width', '40');
  pinElementImg.setAttribute('height', '40');
  pinElementImg.setAttribute('draggable', 'false');
  pinElement.appendChild(pinElementImg);
  return pinElement;
};

// Объекты
var arrayAds = [];

for (var i = 0; i < 8; i++) {
  arrayAds[i] = {
    location: {
      x: getRandomInt(300, 900 + 1),
      y: getRandomInt(100, 500 + 1)
    },

    offer: {
      title: TITLE[getRandomInt(0, TITLE.length)],
      address: location.x + ', ' + location.y,        // Как подставить значения?
      price: getRandomInt(1, 1000 + 1) * 1000,
      type: TYPE[getRandomInt(0, TYPE.length)],
      rooms: getRandomInt(1, 6),
      guests: getRandomInt(1, 8),
      checkin: CHECKIN[getRandomInt(0, CHECKIN.length)],
      checkout: CHECKOUT[getRandomInt(0, CHECKOUT.length)],
      features: getFeatures(),
      description: '',
      photos: []
    },

    author: {
      avatar: SRC_AVATAR[getRandomInt(0, SRC_AVATAR.length)]
    }
  };
}
// Работа с DOM
var map = document.querySelector('.map');
var mapFilter = map.querySelector('.map__filters-container');

map.classList.remove('map--faded');

var similarAds = document.querySelector('template').content;
var fragment = document.createDocumentFragment();
for (i = 1; i < 8; i++) {
  fragment.appendChild(renderPins(i));
}

document.querySelector('.map__pins').appendChild(fragment);
document.querySelector('.map').insertBefore(renderAds(0), mapFilter);

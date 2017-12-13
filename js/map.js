'use strict';

// объявление констант
var TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPE = ['flat', 'house', 'bungalo'];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var ADS_COUNT = 8;
var ESC_KEYCODE = 27;
// var ENTER_KEYCODE = 13;

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

  return TITLE[getRandomInt(0, TITLE.length)];
}

// Функция возвращает стоимости за ночь
function getPrice() {

  return getRandomInt(1, 1000 + 1) * 1000;
}

// Функция возвращает тип жилища
function getRandomType() {

  return TYPE[getRandomInt(0, TYPE.length)];
}

// Функция возвращает названия жилища в зависимоти от типа
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

// Функция возвращает объект
function createPin() {
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

// Функция отрисовки указателей
function renderPin(ad) {
  var mapPin = document.querySelector('.map__pin');
  var pinElement = mapPin.cloneNode();
  var pinElementImg = document.querySelector('.map__pin img').cloneNode();

  pinElement.setAttribute('style', 'left: ' + (ad.location.x - mapPin.getAttribute('width') / 2) + 'px; top: ' + (ad.location.y - (+mapPin.getAttribute('height') + 18)) + 'px;');
  pinElement.setAttribute('class', 'map__pin');
  pinElementImg.setAttribute('src', ad.author.avatar);
  pinElementImg.setAttribute('width', '40');
  pinElementImg.setAttribute('height', '40');
  pinElementImg.setAttribute('draggable', 'false');
  pinElement.appendChild(pinElementImg);
  pinElement.addEventListener('click', function (evt) {
    var clickedElement = evt.currentTarget;
    removePinActive(evt);
    openPopup(ad);
    clickedElement.classList.add('map__pin--active');
  }, false);
  return pinElement;
}

// Функция отрисовки карточек объявлений
function renderAd(ad) {
  var similarAds = document.querySelector('template').content.cloneNode(true);
  var adsElement = similarAds.querySelector('.map__card');

  var ul = adsElement.querySelector('.popup__features');

  adsElement.querySelector('img').setAttribute('src', ad.author.avatar);
  adsElement.querySelector('h3').textContent = ad.offer.title;
  adsElement.querySelector('.popup__price').innerHTML = ad.offer.price + '&#x20bd;/ночь';
  adsElement.querySelector('h4').textContent = getType(ad.offer.type);
  adsElement.querySelector('.popup__rooms').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
  adsElement.querySelector('.popup__checkin').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
  adsElement.querySelector('.popup__description').textContent = ad.offer.description;
  // Удаление элементов списка
  ul.innerHTML = '';

  // Добавление элемонтов списка
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < ad.offer.features.length; i++) {
    var li = document.createElement('li');
    li.classList.add('feature');
    li.classList.add('feature--' + ad.offer.features[i]);

    fragment.appendChild(li);
  }

  ul.appendChild(fragment);

  return adsElement;
}

// Добавляет пины на карту
function addMapPins() {
  var fragment = document.createDocumentFragment();

  // рендерим их в ДОМ
  for (var i = 0; i < ADS_COUNT; i++) {
    var pin = createPin();
    fragment.appendChild(renderPin(pin, i));
  }

  document.querySelector('.map__pins').appendChild(fragment);
}

// отрисовывает попап и добавляет обработчик кнопке закрытия и document
function openPopup(obj) {
  var mapFilter = map.querySelector('.map__filters-container');
  var popup = map.querySelector('.popup');
  if (popup) {
    map.removeChild(popup);
  }

  popup = renderAd(obj);
  map.insertBefore(popup, mapFilter);

  var popupClose = map.querySelector('.popup__close');
  popupClose.addEventListener('click', closePopup);
  document.addEventListener('keydown', onPopupEscPress);
}

// Закрытие попапа по esc
function onPopupEscPress(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
}

// Закрыти попапа со снятием признака активности у пина и удаление обработчика у document
function closePopup() {
  var popup = map.querySelector('.popup');
  if (popup) {
    map.removeChild(popup);
  }
  removePinActive();
  document.removeEventListener('keydown', onPopupEscPress);
}

function removePinActive() {
  var clickedElement = map.querySelector('.map__pin--active');
  if (clickedElement) {
    clickedElement.classList.remove('map__pin--active');
  }
}

function checkCapacity(capacity, room) {
  if ((+capacity.value <= +room.value && +room.value !== 100 && +capacity.value !== 0) || (+room.value === 100 && +capacity.value === 0)) {
    capacity.style.borderColor = '';
    room.style.borderColor = '';
    return false;
  } else {
    capacity.style.borderColor = 'red';
    room.style.borderColor = 'red';
    return true;
  }
}

function startUsed(evt) {
  evt.currentTarget.removeEventListener('mouseup', startUsed);
  var form = document.querySelector('.notice__form');
  var timeIn = form.querySelector('select[name = \'timein\']');
  var timeOut = form.querySelector('select[name = \'timeout\']');
  var type = form.querySelector('select[name = \'type\']');
  var price = form.querySelector('input[name = \'price\']');
  var capacity = form.querySelector('select[name = \'capacity\']');
  var room = form.querySelector('select[name = \'rooms\']');
  map.classList.remove('map--faded');
  form.classList.remove('notice__form--disabled');
  addMapPins();

  // Убирает свойство disabled у fieldset формы
  var formElement = form.querySelectorAll('.form__element');
  for (var i = 0; i < formElement.length; i++) {
    formElement[i].removeAttribute('disabled');
  }
  // Добавляет обработчик события на главный пин
  // при клике переносит --active на него, закрывает попап
  evt.currentTarget.addEventListener('click', function (e) {
    var clickedElement = e.currentTarget;
    closePopup();
    removePinActive();
    clickedElement.classList.add('map__pin--active');
  }, false);

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
}

// Работа с DOM
var map = document.querySelector('.map');

// активирует карту и форму, запускает рендер пинов и добавление к ним обработчиков
map.querySelector('.map__pin--main').addEventListener('mouseup', startUsed);

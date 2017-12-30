'use strict';
window.cardUtil = (function () {
  var ESC_KEYCODE = 27;

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

  var map = document.querySelector('.map');

  return {
    // Закрыти попапа со снятием признака активности у пина и удаление обработчика у document
    closePopup: function () {
      var popup = map.querySelector('.popup');
      if (popup) {
        map.removeChild(popup);
      }
      window.pinUtil.removePinActive();
      document.removeEventListener('keydown', window.cardUtil.onPopupEscPress);
    },
    // Закрытие попапа по esc
    onPopupEscPress: function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        window.cardUtil.closePopup();
      }
    },
    // Функция отрисовки карточек объявлений
    renderAd: function (ad) {
      var similarAds = document.querySelector('template').content.cloneNode(true);
      var cardAds = similarAds.querySelector('.map__card');

      var featuresList = cardAds.querySelector('.popup__features');

      cardAds.querySelector('img').setAttribute('src', ad.author.avatar);
      cardAds.querySelector('h3').textContent = ad.offer.title;
      cardAds.querySelector('.popup__price').innerHTML = ad.offer.price + '&#x20bd;/ночь';
      cardAds.querySelector('h4').textContent = getType(ad.offer.type);
      cardAds.querySelector('.popup__rooms').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
      cardAds.querySelector('.popup__checkin').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
      cardAds.querySelector('.popup__description').textContent = ad.offer.description;
      // Удаление элементов списка
      featuresList.innerHTML = '';

      // Добавление элементов списка
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < ad.offer.features.length; i++) {
        var li = document.createElement('li');
        li.classList.add('feature');
        li.classList.add('feature--' + ad.offer.features[i]);

        fragment.appendChild(li);
      }

      featuresList.appendChild(fragment);

      return cardAds;
    }
  };
})();

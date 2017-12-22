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

      // Добавление элементов списка
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
  };
})();

'use strict';

// отрисовывает попап и добавляет обработчик кнопке закрытия и document
(function () {
  window.showCard = function (obj) {
    var map = document.querySelector('.map');
    var mapFilter = map.querySelector('.map__filters-container');
    var popup = map.querySelector('.popup');
    if (popup) {
      map.removeChild(popup);
    }

    popup = window.cardUtil.renderAd(obj);
    map.insertBefore(popup, mapFilter);

    var popupClose = map.querySelector('.popup__close');
    popupClose.addEventListener('click', function () {
      window.cardUtil.closePopup();
    });
    document.addEventListener('keydown', window.cardUtil.onPopupEscPress);
  };
})();

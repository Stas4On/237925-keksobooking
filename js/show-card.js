'use strict';

// отрисовывает попап и добавляет обработчик кнопке закрытия и document
(function () {
  window.showCard = function (obj) {
    var mapElement = document.querySelector('.map');
    var mapFilterElement = mapElement.querySelector('.map__filters-container');
    var popupElement = mapElement.querySelector('.popup');
    if (popupElement) {
      mapElement.removeChild(popupElement);
    }

    popupElement = window.cardUtil.renderAd(obj);
    mapElement.insertBefore(popupElement, mapFilterElement);

    var popupCloseElement = mapElement.querySelector('.popup__close');
    popupCloseElement.addEventListener('click', function () {
      window.cardUtil.closePopup();
    });
    document.addEventListener('keydown', window.cardUtil.onPopupEscPress);
  };
})();

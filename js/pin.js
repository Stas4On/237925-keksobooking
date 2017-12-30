'use strict';

window.pinUtil = (function () {
  var mapElement = document.querySelector('.map');
  return {
    // Функция отрисовки указателей
    renderPin: function (ad) {
      var mapPinElement = document.querySelector('.map__pin');
      var pinElement = mapPinElement.cloneNode();
      var pinElementImg = document.querySelector('.map__pin img').cloneNode();

      pinElement.setAttribute('style', 'left: ' + (ad.location.x - mapPinElement.getAttribute('width') / 2) + 'px; top: ' + (ad.location.y - (+mapPinElement.getAttribute('height') + 18)) + 'px;');
      pinElement.setAttribute('class', 'map__pin');
      pinElementImg.setAttribute('src', ad.author.avatar);
      pinElementImg.setAttribute('width', '40');
      pinElementImg.setAttribute('height', '40');
      pinElementImg.setAttribute('draggable', 'false');
      pinElement.appendChild(pinElementImg);
      pinElement.addEventListener('click', function (evt) {
        var clickedElement = evt.currentTarget;
        window.pinUtil.removePinActive(evt);
        window.showCard(ad);
        clickedElement.classList.add('map__pin--active');
      }, false);
      return pinElement;
    },

    removePinActive: function () {
      var clickedElement = mapElement.querySelector('.map__pin--active');
      if (clickedElement) {
        clickedElement.classList.remove('map__pin--active');
      }
    }
  };
})();

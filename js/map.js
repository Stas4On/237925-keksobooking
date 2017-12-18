'use strict';

(function () {

  var ADS_COUNT = 8;

  // Добавляет пины на карту
  function addMapPins() {
    var fragment = document.createDocumentFragment();

    // рендерим их в ДОМ
    for (var i = 0; i < ADS_COUNT; i++) {
      var pin = window.createPin();
      fragment.appendChild(window.pinUtil.renderPin(pin, i));
    }

    document.querySelector('.map__pins').appendChild(fragment);
  }

  function dragMainPin() {
    var mainPin = map.querySelector('.map__pin--main');
    mainPin.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var startCoordinates = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoordinates.x - moveEvt.clientX,
          y: startCoordinates.y - moveEvt.clientY
        };

        startCoordinates = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        if (mainPin.offsetTop - shift.y > 500) {
          mainPin.style.top = '500px';
        } else if (mainPin.offsetTop - shift.y < 100) {
          mainPin.style.top = '100px';
        } else {
          mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
        }
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        map.removeEventListener('mousemove', onMouseMove);
        map.removeEventListener('mouseup', onMouseUp);
      };

      map.addEventListener('mousemove', onMouseMove);
      map.addEventListener('mouseup', onMouseUp);
    });
  }

  function startUsed(evt) {
    evt.currentTarget.removeEventListener('mouseup', startUsed);
    var form = document.querySelector('.notice__form');
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
      window.cardUtil.closePopup();
      window.pinUtil.removePinActive();
      clickedElement.classList.add('map__pin--active');
    }, false);
    dragMainPin();
  }

  // Работа с DOM
  // активирует карту и форму, запускает рендер пинов и добавление к ним обработчиков
  var map = document.querySelector('.map');
  map.querySelector('.map__pin--main').addEventListener('mouseup', startUsed);

})();

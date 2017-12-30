'use strict';

(function () {
  var COUNT_PINS = 5;

  var pins = [];
  var mapPinsElement = document.querySelector('.map__pins');
  var sortFormElement = document.querySelector('.map__filters');

  // Записывает загруженные данные в переменную и передает данные в функцию отрисовки пинов на карте
  function onLoad(data) {
    pins = data;
    window.renderPins(pins);
  }

  // Добавляет пины на карту
  function addMapPins() {

    function onError(message) {
      status.textContent = message;
      status.setAttribute('style', 'border-color: #fa9; background-color: #ffdde5');
      setTimeout(function () {
        status.textContent = '';
        status.setAttribute('style', 'border-color: transparent');
      }, 5000);
    }

    // Убирает все пины, кроме главного с карты и отрисовывает пины из массива
    window.renderPins = function (data) {
      var fragment = document.createDocumentFragment();

      var takeNumber = data.length > COUNT_PINS ? COUNT_PINS : data.length;
      var mapPinElement = mapPinsElement.querySelector('.map__pin--main').cloneNode(true);
      mapPinsElement.innerHTML = '';
      mapPinsElement.appendChild(mapPinElement);
      dragMainPin();
      for (var i = 0; i < takeNumber; i++) {
        fragment.appendChild(window.pinUtil.renderPin(data[i]));
      }

      mapPinsElement.appendChild(fragment);
    };

    // Сортирует пины при изменении формы
    sortFormElement.addEventListener('change', function (e) {
      e.preventDefault();

      window.debounce(function () {
        window.updatePins(pins);
      });
    }, false);

    window.request.download('https://js.dump.academy/keksobooking/data', onLoad, onError);
  }

  // Перетаскивание основного пина
  function dragMainPin() {
    var mainPinElement = mapElement.querySelector('.map__pin--main');
    mainPinElement.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var startCoordinates = {
        x: evt.clientX,
        y: evt.clientY
      };

      function onMouseMove(moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoordinates.x - moveEvt.clientX,
          y: startCoordinates.y - moveEvt.clientY
        };

        startCoordinates = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        if (mainPinElement.offsetTop - shift.y > 500) {
          mainPinElement.style.top = '500px';
        } else if (mainPinElement.offsetTop - shift.y < 100) {
          mainPinElement.style.top = '100px';
        } else {
          mainPinElement.style.top = (mainPinElement.offsetTop - shift.y) + 'px';
        }
        mainPinElement.style.left = (mainPinElement.offsetLeft - shift.x) + 'px';

        document.querySelector('input[name = \'address\']').value = 'x: ' + mainPinElement.style.left.replace('px', '') + ', y: ' + mainPinElement.style.top.replace('px', '');
      }

      function onMouseUp(upEvt) {
        upEvt.preventDefault();

        mapElement.removeEventListener('mousemove', onMouseMove);
        mapElement.removeEventListener('mouseup', onMouseUp);
      }

      mapElement.addEventListener('mousemove', onMouseMove);
      mapElement.addEventListener('mouseup', onMouseUp);
    });
  }

  // активирует карту и форму, запускает рендер пинов и добавление к ним обработчиков
  function startUsed(evt) {
    evt.currentTarget.removeEventListener('mouseup', startUsed);
    var formElement = document.querySelector('.notice__form');
    mapElement.classList.remove('map--faded');
    formElement.classList.remove('notice__form--disabled');
    addMapPins();
    // Убирает свойство disabled у fieldset формы
    var formElements = formElement.querySelectorAll('.form__element');
    for (var i = 0; i < formElement.length; i++) {
      formElements[i].removeAttribute('disabled');
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
  var status = document.querySelector('.status__download');
  var mapElement = document.querySelector('.map');
  mapElement.querySelector('.map__pin--main').addEventListener('mouseup', startUsed);

})();

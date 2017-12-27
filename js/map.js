'use strict';

(function () {
  var mapPins = document.querySelector('.map__pins');
  var sortForm = document.querySelector('.map__filters');
  var typeHouse = sortForm.querySelector('select[name = \'housing-type\']');
  var priceHouse = sortForm.querySelector('select[name = \'housing-price\']');
  var roomsHouse = sortForm.querySelector('select[name = \'housing-rooms\']');
  var guestsHouse = sortForm.querySelector('select[name = \'housing-guests\']');
  var featuresHouse = sortForm.querySelectorAll('input');

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

      var takeNumber = data.length > 5 ? 5 : data.length;
      var mapPin = mapPins.querySelector('.map__pin--main').cloneNode(true);
      mapPins.innerHTML = '';
      mapPins.appendChild(mapPin);
      for (var i = 0; i < takeNumber; i++) {
        fragment.appendChild(window.pinUtil.renderPin(data[i]));
      }

      mapPins.appendChild(fragment);
    };

    window.request.download('https://js.dump.academy/keksobooking/data', window.onLoad, onError);
  }

  // Перетаскивание основного пина
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

        document.querySelector('input[name = \'address\']').value = 'x: ' + mainPin.style.left.replace('px', '') + ', y: ' + mainPin.style.top.replace('px', '');
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

  // активирует карту и форму, запускает рендер пинов и добавление к ним обработчиков
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
    typeHouse.addEventListener('change', function () {
      window.debounce(window.updatePins);
    });
    priceHouse.addEventListener('change', function () {
      window.debounce(window.updatePins);
    });
    roomsHouse.addEventListener('change', function () {
      window.debounce(window.updatePins);
    });
    guestsHouse.addEventListener('change', function () {
      window.debounce(window.updatePins);
    });
    for (i = 0; i < featuresHouse.length; i++) {
      featuresHouse[i].addEventListener('change', function () {
        window.debounce(window.updatePins);
      });
    }
  }

  // Работа с DOM
  var status = document.querySelector('.status__download');
  var map = document.querySelector('.map');
  map.querySelector('.map__pin--main').addEventListener('mouseup', startUsed);

})();

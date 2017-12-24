'use strict';

window.request = (function () {
  function getError(request) {
    var error;
    switch (request.status) {
      case 400:
        error = 'Неверный запрос';
        break;
      case 401:
        error = 'Пользователь не авторизован';
        break;
      case 404:
        error = 'Ничего не найдено';
        break;
      case 500:
        error = 'Ошибка сервера';
        break;
      case 502:
        error = 'Ошибочный шлюз';
        break;
      case 503:
        error = 'Сервис недоступен';
        break;

      default:
        error = 'Неизвестный статус: ' + request.status + ' ' + request.statusText;
    }
    return error;
  }

  return {
    download: function (url, onLoad, onError) {
      var xhr = new XMLHttpRequest();

      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError(getError(xhr));
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = 8000; // 8s

      xhr.open('GET', url);
      xhr.send();
    },
    upload: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      var formData = new FormData(data);

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(data);
        } else {
          onError(getError(xhr));
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = 8000; // 8s

      xhr.open('POST', 'https://js.dump.academy/keksobooking');
      xhr.send(formData);
    }};

})();

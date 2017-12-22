'use strict';

(function () {
  window.synchronizeFields = function (firstField, secondField, valueFirstField, valueSecondField, callback) {
    for (var i = 0; i < valueFirstField.length; i++) {
      var index;
      if (firstField.value === valueFirstField[i]) {
        index = i;
      }
    }
    callback(secondField, valueSecondField[index]);
  };
})();

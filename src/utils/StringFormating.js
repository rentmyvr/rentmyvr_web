// String.prototype.formatUnicorn = String.prototype.formatUnicorn ||

String.prototype.format = function () {
  var i = 0;
  args = arguments;
  return this.replace(/{\w+}/g, function () {
    return typeof args[i] != 'undefined' ? args[i++] : '';
  });
};

String.prototype.toTitleCase = function () {
  return this.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

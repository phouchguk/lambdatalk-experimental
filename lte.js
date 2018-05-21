(function() {
  "use strict";

  var evl, evlForm, re, test;

  test = "{{fn {fruit unknown} The colour of fruit is unknown.} apple green}";
  re = /\{([^\s{}]*)(?:[\s]*)([^{}]*)\}/g;

  evl = function(s) {
    do {
      console.log(s);
    } while (s !== (s = s.replace(re, "_evl_")));

    return s;
  };

  evl(test);
})();

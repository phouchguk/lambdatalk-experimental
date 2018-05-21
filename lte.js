/* globals console */

(function() {
  "use strict";

  var evl, evlForm, re, test;

  test =
    "{{fn {fruit unknown} The colour of {if true then fruit else veg} is unknown.} apple green}";

  re = /\{([^\s{}]*)(?:[\s]*)([^{}]*)\}/g;

  evlForm = function() {
    var f, r;

    f = arguments[1] || "";
    r = arguments[2] || "";

    console.log(" - " + f + " : " + r);

    return "_evl_";
  };

  evl = function(s) {
    do {
      console.log(s);
    } while (s !== (s = s.replace(re, evlForm)));

    return s;
  };

  evl(test);
})();

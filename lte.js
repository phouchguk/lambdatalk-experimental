/* globals console */

(function() {
  "use strict";

  var evl,
    expr,
    exprNr,
    extractExpr,
    lookup,
    phase1re,
    phase2re,
    test,
    readEvl,
    root;

  expr = {};
  exprNr = 0;
  root = { _parent_: null };

  test =
    "{def veg {+ 1 2}} {{fn {fruit unknown} The colour of {if true then fruit else {veg}} is unknown.} apple green}";

  phase1re = /\{([^\s{}]*)(?:[\s]*)([^{}]*)\}/g;
  phase2re = /(_EX\d+_)/g;

  lookup = function(env, key) {
    if (typeof env[key] !== "undefined") {
      return env[key];
    }

    if (env._parent_ === null) {
      return "[ERR: '" + key + "' is not defined]";
    }

    return lookup(env._parent_, key);
  };

  evl = function(env) {
    return function() {
      var e, form;

      e = arguments[1] || "";

      form = expr[e];

      if (form[1] === "") {
        // variable lookup
        return lookup(env, form[0]);
      }

      // handle special forms

      // handle lambda calls

      return "evld";
    };
  };

  readEvl = function(s) {
    // Phase 1
    // ---
    // Extract all the exprs, we don't care what they are.
    while (s !== (s = s.replace(phase1re, extractExpr)));

    console.log(s);

    // Phase 2
    // ---
    // Evaluate top-level exprs (now we can have lexical scoping???)
    s = s.replace(phase2re, evl(root));

    console.log(s);
  };

  extractExpr = function() {
    var f, name, r;

    f = arguments[1] || "";
    r = arguments[2] || "";

    name = "_EX" + exprNr + "_";
    exprNr += 1;

    expr[name] = [f, r];

    return name;
  };

  readEvl(test);

  for (var i = 0; i < exprNr; i++) {
    console.log("_EX" + i + "_", expr["_EX" + i + "_"]);
  }
})();

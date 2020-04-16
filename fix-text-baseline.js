(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined"
    ? (module.exports = factory())
    : typeof define === "function" && define.amd
    ? define(factory)
    : ((global = global || self), (global.fixTextBaseline = factory()));
})(this, function () {
  var canvas = document.createElement("canvas");
  canvas.style.position = "fixed";
  canvas.style.left = "-999px";
  canvas.style.top = "-999px";
  canvas.width = 100;
  canvas.height = 100;
  document.body.appendChild(canvas);
  var ctx = canvas.getContext("2d");
  ctx.textBaseline = "top";
  ctx.fillStyle = "rgb(0, 0, 0)";
  ctx.fillRect(0, 0, 100, 100);
  ctx.fillStyle = "rgb(255, 255, 255)";
  ctx.fillText("T", 0, 10);
  var result = {};
  for (var f = 1; f <= 100; f++) {
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillRect(0, 0, 100, 100);
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.font = f + "px Arial";
    ctx.fillText("T", 0, 10);
    var x = (5 * f) / 10;
    for (var y = 0; y < 20; y++) {
      var color = ctx.getImageData(x, y, 1, 1).data;
      if (color[0] !== 0 && color[1] !== 0 && color[2] !== 0) {
        result[f] = y - 10;
        break;
      }
    }
  }
  document.body.removeChild(canvas);
  return function (ctx) {
    if (typeof ctx !== "object") return ctx;
    var prototype = Object.getPrototypeOf(ctx);
    var originalFillText = prototype.fillText;
    if (typeof originalFillText !== "function") return ctx;
    ctx.fillText = function () {
      var y = arguments[2];
      if (typeof y === "number") {
        var fontSizeMatch = ctx.font.match(/(\d+)(?:\.\d?)?px/i);
        if (fontSizeMatch && fontSizeMatch[1]) {
          var diff = result[fontSizeMatch[1]];
          if (diff) {
            arguments[2] = y - diff;
          }
        }
      }
      return originalFillText.apply(this, arguments);
    };
    return ctx;
  };
});

(function () {
  if (typeof renderQ !== "function") return;
  var orig = renderQ;
  renderQ = function () {
    orig();
    var item = QUESTIONS[qi];
    if (item && item.img && window.IMAGES && IMAGES[item.img]) {
      document.getElementById("picto").innerHTML =
        '<img class="qimg" src="' + IMAGES[item.img] + '" alt="">';
    }
  };
})();

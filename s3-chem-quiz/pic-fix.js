(function () {
  if (typeof renderQ !== "function") return;
  var orig = renderQ;
  renderQ = function () {
    orig();
    var item = QUESTIONS[qi];
    if (item && item.img && window.IMAGES && IMAGES[item.img]) {
      document.getElementById("picto").innerHTML =
        '<img src="' + IMAGES[item.img] + '" alt="" style="max-width:240px;max-height:280px;object-fit:contain;border-radius:8px;background:#fff;">';
    }
  };
})();

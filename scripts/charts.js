import $, { easing as _easing } from "jquery";
_easing.easeOutBounce = function(x, t, b, c, d) {
  if ((t /= d) < 1 / 2.75) {
    return c * (7.5625 * t * t) + b;
  } else if (t < 2 / 2.75) {
    return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
  } else if (t < 2.5 / 2.75) {
    return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
  } else {
    return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;
  }
};

let f = box => {
  if (box.classList.contains("chart")) {
    var chart = $(box);

    let delay = Number((box.dataset.wowDelay || "0s").slice(0, -1)) * 1000;
    setTimeout(() => {
      chart
        .circleProgress({
          startAngle: -Math.PI / 2,
          animation: { duration: 3000, easing: "easeOutBounce" },
          fill: { gradient: ["#ff6600", "#CE534D"] },
          size: 150
        })
        .on("circle-animation-progress", function(event, progress, stepValue) {
          $(this)
            .find("strong")
            .html(Math.round(100 * stepValue) + "<em>%</em>");
        });
    }, delay);
  }
};

export default f;

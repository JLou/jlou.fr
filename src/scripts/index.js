import $, { easing as _easing } from "jquery";
import "jquery-circle-progress";
import WOW from "wow.js";
import chartHandler from "./charts";
window.jQuery = $;
require("waypoints/lib/jquery.waypoints");

$(function() {
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

  $("a").on("click", function(event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top
        },
        800,
        function() {
          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        }
      );
    } // End if
  });

  // let f = box => {
  //   if (box.classList.contains("chart")) {
  //     var chart = $(box);

  //     let delay = Number((box.dataset.wowDelay || "0s").slice(0, -1)) * 1000;
  //     setTimeout(() => {
  //       chart
  //         .circleProgress({
  //           startAngle: -Math.PI / 2,
  //           animation: { duration: 3000, easing: "easeOutBounce" },
  //           fill: { gradient: ["#ff6600", "#CE534D"] },
  //           size: 150
  //         })
  //         .on("circle-animation-progress", function(
  //           event,
  //           progress,
  //           stepValue
  //         ) {
  //           $(this)
  //             .find("strong")
  //             .html(Math.round(100 * stepValue) + "<em>%</em>");
  //         });
  //     }, delay);
  //   }
  // };

  new WOW({
    callback: chartHandler
  }).init();

  $("section, header, footer").waypoint(
    function(direction) {
      var activeSection = $(this.element);
      if (direction === "up") {
        activeSection = $(this.element).prev();
      }

      var sectionId = activeSection[0].id;
      $(".nav__link").removeClass("active");
      let el = $('.nav__link[href="#' + sectionId + '"]');
      el.addClass("active");
    },
    {
      offset: "25%"
    }
  );

  $("footer").waypoint(
    function(direction) {
      var activeSection = $(this.element);
      if (direction === "up") {
        activeSection = $(this.element).prev();
      }

      var sectionId = activeSection[0].id;
      $(".nav__link").removeClass("active");
      let el = $('.nav__link[href="#' + sectionId + '"]');
      el.addClass("active");
    },
    {
      offset: "75%"
    }
  );
});

import $, { easing as _easing } from "jquery";
import "jquery-circle-progress";
import WOW from "wow.js";
import chartHandler from "./charts";
window.jQuery = $;

$(function() {
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

  new WOW({
    callback: chartHandler
  }).init();

  //Handle navbar change on scroll
  window.onscroll = () => {
    let currentScrollPos = window.pageYOffset;
    if (currentScrollPos < 50) {
      document
        .querySelector(".nav__container")
        .classList.remove("nav__container--scrolled");
    } else {
      document
        .querySelector(".nav__container")
        .classList.add("nav__container--scrolled");
    }
  };

  const threshold = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];
  var options = {
    root: null,
    threshold
  };

  var callback = function(entries) {
    const h = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    );
    entries.forEach(e => {
      if (e.intersectionRect.height / h > 0.55) {
        document
          .querySelector(`a[href="#${e.target.id}"]`)
          .classList.add("active");
      } else {
        document
          .querySelector(`a[href="#${e.target.id}"]`)
          .classList.remove("active");
      }
    });
  };

  var observer = new IntersectionObserver(callback, options);

  let target = document.querySelectorAll("section, footer");

  target.forEach(e => {
    observer.observe(e);
  });
});

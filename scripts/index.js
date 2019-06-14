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

  const options = {
    root: null,
    threshold: 0
  };

  let callback = function(entries) {
    var h = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    );
    entries.forEach((e, i) => {
      if (e.intersectionRect.height / h > 0.55) {
        let a = document.querySelector(`a[href="#${e.target.id}"]`);
        a.classList.add("active");
      } else {
        let b = document.querySelector(`a[href="#${e.target.id}"]`);
        b.classList.remove("active");
      }
    });
  };

  var observer = new IntersectionObserver(callback, options);

  let target = document.querySelectorAll("section, footer");

  target.forEach(e => {
    observer.observe(e);
  });
});

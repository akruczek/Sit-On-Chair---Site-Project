document.addEventListener("DOMContentLoaded", function(event) {
  var unwrapMenuOpenButton = document.querySelector(".menu-open");
  var unwrapMenu = document.querySelector(".unwrap-menu");
  var logo = document.querySelector(".logo");
  // var moreButton = document.querySelector(".moreButton");

  unwrapMenuOpenButton.addEventListener("mouseover", function(event) {
    // unwrapMenu.style.animation = "showMenu 1s";
    unwrapMenu.style.display = "block";
  });

  unwrapMenuOpenButton.addEventListener("mouseout", function(event) {
    // unwrapMenu.style.animation = "showMenu 1s reverse";
    unwrapMenu.style.display = "none";
  });

  unwrapMenu.addEventListener("mouseover", function(event) {
    // unwrapMenu.style.animation = "showMenu 1s";
    this.style.display = "block";
  });

  unwrapMenu.addEventListener("mouseout", function(event) {
    // unwrapMenu.style.animation = "showMenu 1s reverse";
    unwrapMenu.style.display = "none";
  });

  logo.addEventListener("mouseover", function(event) {
    // logo.querySelector("a").classList.add("changeColor");
    // logo.querySelector("a:nth-of-type(2)").classList.add("changeColorReverse");
    // logo.querySelector("a:last-of-type").classList.add("changeColor");
  });

  logo.addEventListener("mouseout", function(event) {
    // logo.querySelector("a").classList.remove("changeColor");
    // logo.querySelector("a:nth-of-type(2)").classList.remove("changeColorReverse");
    // logo.querySelector("a:last-of-type").classList.remove("changeColor");
  });

});

document.addEventListener("DOMContentLoaded", function(event) {
  var unwrapMenuOpenButton = document.querySelector(".menu-open");
  var unwrapMenu = document.querySelector(".unwrap-menu");
  var logo = document.querySelector(".logo");
  var imageBox1 = document.querySelector(".image-box1");
  var imageBox2 = document.querySelector(".image-box2");
  var imageTitle1 = imageBox1.querySelector(".image-title");
  var imageTitle2 = imageBox2.querySelector(".image-title");
  var overOut = false; var slide = false;  //ZMIENNE POMOCNICZA
  var slider = document.querySelector(".image-header").querySelector(".content-container");
  var arrow_left = document.querySelector(".left_arrow");
  var arrow_right = document.querySelector(".right_arrow");
  var slideId = 3;  //ID AKTUALNIE WIDOCZENGO SLAJDU
  var checkbox = document.getElementById("checkbox1");

// KOLORY PO NAJECHANIU I ROZWIJANE MENU[?], CHECKBOX[?]

//----- \/ ANIMACJE ROZWIJANEGO MENU \/
  unwrapMenuOpenButton.addEventListener("mouseover", function(event) {
    unwrapMenu.style.display = "block";
    unwrapMenu.classList.add("runShowMenu");

    setTimeout(function() {
      unwrapMenu.classList.remove("runShowMenu");
    }, 500);
  });

  unwrapMenuOpenButton.addEventListener("mouseout", function(event) {
    unwrapMenu.style.display = "none";
  });

  unwrapMenu.addEventListener("mouseover", function(event) {
    this.style.display = "block";
  });

  unwrapMenu.addEventListener("mouseout", function(event) {
    this.style.display = "none";
  });

//----- \/ ANIMACJE ZNIKANIA TEKSTU NA ZDJĘCIACH \/
  //ZMIENNA POMOCNICZA ZOSTAŁA UŻYTA DO ZABEZPIECZENIA PRZED SYTUACJĄ, W KTÓREJ
  //USER ZABIERZE KURSOR ZE ZDJĘCIA ZANIM ZDĄŻY WYWOŁAĆ SIĘ display="none"

  //NIMACJA ZNIKANIA
  function runHideMenu(element) {
    overOut = false;
    //URUCHOMIENIE ANIMACJI ZANIKANIA POPRZEZ DODANIE KLASY ORAZ
    //PRZERWANIE ANIMACJI POJAWIANIA SIĘ (JEŚLI JEST AKTYWNA) POPRZEZ USUNIĘCIE KLASY
    element.classList.remove("runShowMenu");
    element.classList.add("runHideMenu");

    //PO ZAKOŃCZENIU ANIMACJI USUNIĘCIE KLASY ODPOWIADAJĄCEJ ZA NIĄ ORAZ USTAWIENIE display="none"
    setTimeout(function() {
      if (overOut == false) element.style.display = "none";
      element.classList.remove("runHideMenu");
    }, 500);
  }

  //ANIMACJA POJAWIANIA SIĘ (ANALOGICZNIE)
  function runShowMenu(element) {
    overOut = true;

    element.style.display = "block";
    element.classList.remove("runHideMenu");
    element.classList.add("runShowMenu");

    setTimeout(function() {
      element.classList.remove("runShowMenu");
    }, 500);
  }

  imageBox1.addEventListener("mouseover", function(event) {
    runHideMenu(imageTitle1); });

  imageBox1.addEventListener("mouseout", function(event) {
    runShowMenu(imageTitle1); });

  imageBox2.addEventListener("mouseover", function(event) {
    runHideMenu(imageTitle2); });

  imageBox2.addEventListener("mouseout", function(event) {
    runShowMenu(imageTitle2); });

//---- \/ ANIMACJE SLIDERA \/
  //PRZY SLIDERACH ZMIENNA POMOCNICZA ZABEZPIECZA PRZED PODWÓJNYM KLIKNIĘCIEM NA STRZAŁKĘ
  //I TYM SAMYM ZMIANĄ SLAJDU BEZ ANIMACJI

  function changeSlide(runSlideAnimation, runSlideFromAnimation) {
    if (!slide) {
      slide = true;
      if (slideId > 1)  slideId--;
      else slideId = 3;

      //DODANIE KLASY Z ANIMACJĄ SLIDERA (SLIDER ODPŁYWA) I USUNIĘCIE JEJ PO 1 SEKUNDZIE
      document.querySelector(".slider").classList.add(runSlideAnimation);
      setTimeout(function() {
        document.querySelector(".slider").classList.remove(runSlideAnimation);
      }, 500);

      //URUCHOMIENIE FUNKCJI SPRAWDZAJĄCEJ KTÓRY SLAJD JEST AKTYWNY I WYŚWIETLENIE ODPOWIEDNIEGO ZDJĘCIA / TEKSTU
      //Z OPÓŹNIENIEM, ABY SLIDER ZDĄŻYŁ ODPŁYNĄĆ POZA OKNO
      setTimeout(function() {
        CHECK_SLIDERS();
      }, 100);

      //DODANIE KLASY Z ANIMACJĄ SLIDERA (SLIDER PRZYPŁYWA) I USUNIĘCIE JEJ PO 1 SEKUNDZIE
      setTimeout(function() {
        document.querySelector(".slider").classList.add(runSlideFromAnimation);
        setTimeout(function() {
          document.querySelector(".slider").classList.remove(runSlideFromAnimation);
        }, 500);
      }, 100);

      setTimeout(function() { slide = false; }, 600);
    }
  }

  function CHECK_SLIDERS() {
    for (var i=1; i<4; i++) {
      console.log("fore");
      if (i == slideId) slider.querySelector(".slide:nth-of-type(" + i +")").style.display = "block";
      else slider.querySelector(".slide:nth-of-type(" + i + ")").style.display = "none";
    }
  }

  //LEWA STRZAŁKA
  arrow_left.addEventListener("click", function(event) {
    changeSlide("runSlideLeft", "runSlideFromRight");
    event.preventDefault();
  });

  //PRAWA STRZAŁKA
  arrow_right.addEventListener("click", function(event) {
    changeSlide("runSlideRight", "runSlideFromLeft");
    event.preventDefault();
  });
});

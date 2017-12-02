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
  var dropDownLists = document.querySelectorAll(".drop_down_list");
  var dropDownListOpen = [false, false ,false];
  var dropDownListElements = [[]];
  for (var i=0; i<3; i++)
    dropDownListElements[i] = dropDownLists[i].querySelectorAll("a");
  var panelLeft = document.querySelector(".panel_left");
  var panelRight = document.querySelector(".panel_right");
  var checkboxTransport = document.getElementById("transport");
  var prices = [[150, 200, 300], [0, 0, 0], [0, 100], [80]];
  var choosenPrices = [0, 0, 0, 0];
  var priceSum = document.querySelector(".sum");

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

//----- \/ KALKULATOR \/

  //ROZWINIĘCIE 1. LISTY
  dropDownLists[0].querySelector(".list_arrow").addEventListener("click", function(event) { SET_LISTS(0); });

  //ROZWINIĘCIE 2. LISTY
  dropDownLists[1].querySelector(".list_arrow").addEventListener("click", function(event) { SET_LISTS(1); });

  //ROZWINIĘCIE 3. LISTY
  dropDownLists[2].querySelector(".list_arrow").addEventListener("click", function(event) { SET_LISTS(2); });

  //FUNKCJA ODPOWIEDZIALNA ZA ROZWINIĘCIE LUB SCHOWANIE ODPOWIEDNICH LIST
  function SET_LISTS(i) {
    for (var j=0; j<3; j++) {
      //ZAMYKA WSZYSKIE LISTY OPRÓCZ TEJ KTÓRĄ CHCEMY OTWORZYĆ
      if (j === i) {
        if (!dropDownListOpen[j]) dropDownListOpen[j] = true;
        else dropDownListOpen[j] = false;
      }
      else
        dropDownListOpen[j] = false;

      //USTAWIENIE WIDOCZNOŚCI
      if (!dropDownListOpen[j])
        dropDownLists[j].querySelector(".list_panel").style.display = "none";
      else
        dropDownLists[j].querySelector(".list_panel").style.display = "block";
    }
  }

  //FUNKCJA ZMIENIAJĄCA ODPOWIEDNIE WARTOŚCI PO WYBRANIU OPCJI
  function SET_INNER_HTML(optionName, elementName, listId, elementId) {
    if (elementName === "title")  panelLeft.querySelector("." + elementName).innerHTML = "Chair " + optionName;
    else  panelLeft.querySelector("." + elementName).innerHTML = optionName;

    choosenPrices[listId] = prices[listId][elementId];
    panelRight.querySelector("." + elementName).innerHTML = prices[listId][elementId] + " zł";
    dropDownLists[listId].querySelector(".list_label").innerHTML = optionName;
    dropDownLists[listId].querySelector(".list_panel").style.display = "none";
  }

  //FUNKCJA SUMUJĄCA CENY WYBRANYCH OPCJI
  function SUM_UP() {
    var sum = 0;
    for (var i=0; i<choosenPrices.length; i++) {
      sum += choosenPrices[i];
    }
    priceSum.innerHTML = sum + " zł";
  }

  //WYBÓR OPCJI Z ROZWIJANEJ LISTY
  for (var k=0; k<4; k++) {
    switch(k) {
      //RODZAJ
      case 0:
        for (var l=0; l<3; l++) {
          dropDownListElements[k][l].addEventListener("click", function(event) {
            switch(this.textContent) {
              case "Clair":
                SET_INNER_HTML(this.textContent, "title", 0, 0); break;
              case "Margarita":
                SET_INNER_HTML(this.textContent, "title", 0, 1); break;
              case "Selena":
                SET_INNER_HTML(this.textContent, "title", 0, 2); break;
            }
            SUM_UP();
          });
        }
        break;
      //KOLOR
      case 1:
        for (var m=0; m<3; m++) {
          dropDownListElements[k][m].addEventListener("click", function(event) {
            switch(this.textContent) {
              case "Czerwony":
                SET_INNER_HTML(this.textContent, "color", 1, 0); break;
              case "Czarny":
                SET_INNER_HTML(this.textContent, "color", 1, 1); break;
              case "Pomarańczowy":
                SET_INNER_HTML(this.textContent, "color", 1, 2); break;
            }
            SUM_UP();
          });
        }
        break;
      //MATERIAŁ
      case 2:
        for (var n=0; n<2; n++) {
          dropDownListElements[k][n].addEventListener("click", function(event) {
            switch(this.textContent) {
              case "Tkanina":
                SET_INNER_HTML(this.textContent, "pattern", 2, 0); break;
              case "Skóra":
                SET_INNER_HTML(this.textContent, "pattern", 2, 1); break;
            }
            SUM_UP();
          });
        }
        break;
      //TRANSPORT
      case 3:
        checkboxTransport.addEventListener("click", function(event) {
          if (this.checked) {
            panelLeft.querySelector(".transport").innerHTML = "Transport";
            panelRight.querySelector(".transport").innerHTML = prices[3][0] + " zł";
            choosenPrices[3] = prices[3][0];
          }
          else {
            panelLeft.querySelector(".transport").innerHTML = "";
            panelRight.querySelector(".transport").innerHTML = "";
            choosenPrices[3] = 0;
          }
          SUM_UP();
        });
        break;
    }
  }

});

$(function() {
  var unwrapMenuOpenButton = $(".menu-open");
  var unwrapMenu = $(".unwrap-menu");
  var logo = $(".logo");
  var imageBox1 = $(".image-box1");
  var imageBox2 = $(".image-box2");
  var imageTitle1 = imageBox1.find(".image-title");
  var imageTitle2 = imageBox2.find(".image-title");
  var overOut = [false, false]; //ZMIENNE
  var slide = false;            //POMOCNICZE
  // var slider = $(".image-header").find(".content-container");
  var slider = $(".slider");
  var arrowLeft = $(".left_arrow");
  var arrowRight = $(".right_arrow");
  var slideId = 3;  //ID AKTUALNIE WIDOCZNEGO SLAJDU
  var wasSlided = false; //ZMIENNA POMOCNICZA (AUTOSLIDER)
  var checkbox = $(".checkbox1");
  var dropDownList = $(".drop_down_list");
  var dropDownListElements = dropDownList.find("a");
  var dropDownListOpen = [false, false, false];
  var panelLeft = $(".panel_left");
  var panelRight = $(".panel_right");
  var checkboxTransport = $("#transport");
  var prices = [[150, 200, 300], [0, 0, 0], [0, 100], [80]];
  var choosenPrices = [0, 0, 0];
  var priceSum = $(".sum");
  var choosenChairImage = $(".image_part").find("img");

//-----ROZWIJANE MENU \/
  unwrapMenuOpenButton.on("mouseenter", function() {
    unwrapMenu.show();
    unwrapMenu.addClass("runShowMenu");
    setTimeout(function() { unwrapMenu.removeClass("runShowMenu"); }, 500);
  });

  unwrapMenuOpenButton.on("mouseleave", function() { unwrapMenu.hide(); });
  unwrapMenu.on("mouseenter", function() { $(this).show(); });
  unwrapMenu.on("mouseleave", function() { $(this).hide(); });

//-----SLIDER \/
  function changeSlide(runSlideAnimation, runSlideFromAnimation) {
    if (!slide) {
      slide = true;
      if (slideId > 1)  slideId--;
      else slideId = 3;

      slider.addClass(runSlideAnimation);
      setTimeout(function() { slider.removeClass(runSlideAnimation); }, 500);

      setTimeout(function() { CHECK_SLIDERS(); }, 100);

      setTimeout(function() {
        slider.addClass(runSlideFromAnimation);
        setTimeout(function() {
          slider.removeClass(runSlideFromAnimation);
        }, 500);
      }, 100);

      setTimeout(function() { slide = false; }, 600);
    }
  }

  function CHECK_SLIDERS() {
    for (var i=1; i<4; i++) {
      if (i == slideId) slider.find(".slide").eq(i-1).show();
      else slider.find(".slide").eq(i-1).hide();
    }
  }

  arrowLeft.on("click", function() {
    wasSlided = true;
    changeSlide ("runSlideLeft", "runSlideFromRight");
    event.preventDefault();
  });

  arrowRight.on("click", function() {
    wasSlided = true;
    changeSlide ("runSlideRight", "runSlideFromLeft");
    event.preventDefault();
  });

  setInterval(function() {
    if (!wasSlided)   changeSlide("runSlideRight", "runSlideFromLeft");
  }, 4000);

//-----IMAGE-BOX SECTION \/
  function runMenu(el, id, hide) {
    overOut[id] = !hide ? true : false;
    if (!hide)  overOut[id] = true;
    else overOut[id] = false;

    if (!hide) el.show();
    if (!hide) {
      el.removeClass("runHideMenu");
      el.addClass("runShowMenu"); }
    else {
      el.removeClass("runShowMenu");
      el.addClass("runHideMenu"); }

    setTimeout(function() {
      if (!hide) el.removeClass("runShowMenu");
      else if(!overOut[id]) el.hide(); el.removeClass("runHideMenu");
    }, 500);
  }

  imageBox1.mouseenter(function() {runMenu(imageTitle1, 0, true); });
  imageBox1.mouseleave(function() {runMenu(imageTitle1, 0, false); });
  imageBox2.mouseenter(function() {runMenu(imageTitle2, 1, true); });
  imageBox2.mouseleave(function() {runMenu(imageTitle2, 1, false); });

//-----KALKULATOR \/
  dropDownList.find(".list_arrow").on("click", function() {
    var isVisible;
    if ($(this).next().css("display") == "none")  isVisible=true;
    $(".list_panel").hide();
    if (isVisible) $(this).next().show();
  });

  function SET_VALUES(optionName, elementName, listId, elementId) {
    SHOW_ELEMENT(panelLeft.find("." + elementName));
    SHOW_ELEMENT(panelRight.find("." + elementName));

    if (elementName === "title") panelLeft.find("." + elementName).html("Chair " + optionName);
    else panelLeft.find("." + elementName).html(optionName);

    choosenPrices[listId] = prices[listId][elementId];
    panelRight.find("." + elementName).html(prices[listId][elementId] + " zł");
    dropDownList.eq(listId).find(".list_label").html(optionName);
    dropDownList.eq(listId).find(".list_panel").hide();
  }

  function SUM_UP() {
    SHOW_ELEMENT(priceSum);
    var sum = 0;
    for (var i=0; i<choosenPrices.length; i++)
      sum += choosenPrices[i];
    priceSum.html(sum + " zł");
  }

  function ROTATE_ARROW(listId) {
    dropDownLists[listId].find("list_arrow").addClass("runRotate180");
    setTimeout(function() { dropDownLists[listId].find(".list_arrow").removeClass("runRotate180"); }, 500);
  }

  function SHOW_ELEMENT(el) {
    el.addClass("runShowMenu");
    setTimeout(function() { el.removeClass("runShowMenu");}, 300);
  }

  dropDownListElements.on("click", function() {
    switch(this.textContent) {
      case "Clair":
        SET_VALUES(this.textContent, "title", 0, 0); break;
      case "Margarita":
        SET_VALUES(this.textContent, "title", 0, 1); break;
      case "Selena":
        SET_VALUES(this.textContent, "title", 0, 2); break;
      case "Czerwony":
        SET_VALUES(this.textContent, "color", 1, 0); break;
      case "Czarny":
        SET_VALUES(this.textContent, "color", 1, 1); break;
      case "Pomarańczowy":
        SET_VALUES(this.textContent, "color", 1, 2); break;
      case "Tkanina":
        SET_VALUES(this.textContent, "pattern", 2, 0); break;
      case "Skóra":
        SET_VALUES(this.textContent, "pattern", 2, 1); break;
    }
    SUM_UP();
  });
  checkboxTransport.on("click", function(event) {
    if (this.checked) {
      panelLeft.find(".transport").html("Transport");
      panelRight.find(".transport").html(prices[3][0] + " zł");
      choosenPrices[3] = prices[3][0];
    }
    else {
      panelLeft.find(".transport").empty();
      panelRight.find(".transport").empty();
      choosenPrices[3] = 0;
    }
    SUM_UP();
  });
});

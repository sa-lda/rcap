function handleStorageChangeEvent(event) {
  if (event.key === "cart") {
    var cart = [];

    try {
      cart = JSON.parse(localStorage.getItem('cart'));
    } catch (error) {
      cart = [];
    }

    if(cart.length > 0) {
      $('.show-cart span').show().text(cart.length);
    } else {
      $('.show-cart span').hide().text('0');
    }
    
    loadCart();
  }
  if (event.key === "wishlist") {
    loadWishlist();
  }
}


$(document).on('click', '.delete-cart', function(e) {
  e.stopPropagation();
  const item = $(this).index('.delete-cart');
  
  var cart = JSON.parse(localStorage.getItem('cart'));

  for (var i = 0; i < cart.length; i++) {
    if(i == item) {
      cart.splice(i, 1); 
    }
  }

  setLocalStorage('cart', JSON.stringify(cart))
}).on('click', '.delete-wish', function(e) {
  e.stopPropagation();
  const item = $(this).index('.delete-wish');
  
  var wishlist = JSON.parse(localStorage.getItem('wishlist'));

  for (var i = 0; i < wishlist.length; i++) {
    if(i == item) {
      wishlist.splice(i, 1); 
    }
  }

  setLocalStorage('wishlist', JSON.stringify(wishlist))
})

// Attach the event listener to the custom "storageChange" event
window.addEventListener("storageChange", handleStorageChangeEvent);

// Custom function to set localStorage value and trigger the event
function setLocalStorage(key, value) {
  localStorage.setItem(key, value);
  // Trigger the custom "storageChange" event
  const storageChangeEvent = new Event("storageChange");
  storageChangeEvent.key = key;
  storageChangeEvent.newValue = value;
  window.dispatchEvent(storageChangeEvent);
}
/*========================
 Manifest js
 ==========================*/
$(window).on('load', function () {
  'use strict';
});


/*=====================
    Loader js 
==========================*/
$(window).on('load', function () {
  setTimeout(function () {
    $('.loader').fadeOut('slow');
  }, 500);
  $('.loader').remove('slow');
});

var searchdelay;
$('#shopsearch').on('input', function() {
  const valu = $(this).val().trim();
  $('.shop-products').empty();
  if(searchdelay){
    clearTimeout(searchdelay);
  }
  searchdelay = setTimeout(function() {
    loadProducts(valu, '.shop-products', window.apicursor);
  }, 1500)
})

/*=====================
    Header sidebar 
==========================*/

/*
$(".nav-bar").on('click', function () {
  $(".header-sidebar").addClass("show");
  $(".overlay-sidebar").addClass("show");
  $('body').css({
    'overflow': 'hidden'
  });
});
$(".overlay-sidebar").on('click', function () {
  $(".header-sidebar").removeClass("show");
  $(".overlay-sidebar").removeClass("show");
  $('body').css({
    'overflow': 'auto'
  });
});
*/

/*=====================
    Header scroll js
==========================*/
$(window).scroll(function () {
  var scroll = $(window).scrollTop();

  if (scroll >= 15) {
    $("header").addClass("darkHeader");
  } else {
    $("header").removeClass("darkHeader");
  }
});

/*=====================
    Filter select js
==========================*/
$('.filter-row li, .filter-color li, .size-select li').on('click', function (e) {
  $(this).addClass('active').siblings('.active').removeClass('active');
});


/*=====================
 Quantity js
==========================*/
var minVal = 1, maxVal = 20; // Set Max and Min values
// Increase product quantity on cart page
$(".qty-counter .quantity-right-plus").on('click', function () {
  var $parentElm = $(this).parents(".qty-counter");
  $(this).addClass("clicked");
  setTimeout(function () {
    $(".clicked").removeClass("clicked");
  }, 100);
  var value = $parentElm.find(".input-number").val();
  if (value < maxVal) {
    value++;
  }
  $parentElm.find(".input-number").val(value);
});
// Decrease product quantity on cart page
$(".qty-counter .quantity-left-minus").on('click', function () {
  var $parentElm = $(this).parents(".qty-counter");
  $(this).addClass("clicked");
  setTimeout(function () {
    $(".clicked").removeClass("clicked");
  }, 100);
  var value = $parentElm.find(".input-number").val();
  if (value > 1) {
    value--;
  }
  $parentElm.find(".input-number").val(value);
});


/*=====================
    wishlist added start
==========================*/
$(document).on('click', ".wishlist-btn", function (e) {
  e.stopPropagation()
  if ($(this).hasClass("deactivate")) {
    $(this).removeClass("deactivate")
  }
  if ($(this).hasClass("active")) {
    $(this).addClass("deactivate")
  }
  $(this).toggleClass("animate");
  $(this).toggleClass("active");
  $(this).toggleClass("inactive");
});

$('#addToCart').click(function() {
  const productId = localStorage.getItem('last-product');
  const details = JSON.parse(localStorage.getItem('lastproductdetails'));

  details.choice = $('#variant-select').val();
  details.choice2 = $('#variant-select option:contains("' + $('#variant-select').val() + '")').attr('data-variant');

  const fun = cart => {
    const qty = $('.qty-counter .input-number').val().trim() != "" ? parseInt($('.qty-counter .input-number').val()) : 1;

    for(var i = 0; i < qty; i++) {
      cart.push(details);
    }
    
    setLocalStorage('cart', JSON.stringify(cart));

    $(this).html('<i class="iconly-Buy icli"></i>ADDED')
    setTimeout(() => {
      $(this).html('<i class="iconly-Buy icli"></i>ADD TO CART')
    }, 1000)
  }

  try {
    var cart = [];

    cart = JSON.parse(localStorage.getItem('cart'));
  
    fun(cart);
  } catch (error) {
    var cart = [];

    fun(cart)
  }
})

$('#addToWishlist').click(function() {
  const productId = localStorage.getItem('last-product');
  const details = JSON.parse(localStorage.getItem('lastproductdetails'));

  const fun = wishlist => {
    wishlist.push(details);
    
    setLocalStorage('wishlist', JSON.stringify(wishlist));

    $(this).html('<i class="iconly-Heart icli"></i>ADDED')
    setTimeout(() => {
      $(this).html('<i class="iconly-Heart icli"></i>WISHLIST')
    }, 1000)
  }


  try {
    var wishlist = [];

    wishlist = JSON.parse(localStorage.getItem('wishlist'));
  
    fun(wishlist);
  } catch (error) {
    var wishlist = [];

    fun(wishlist)
  }
})

/*=====================
    Slick slider start
==========================*/


// APPLIED
/*
$('.category-slider').slick({
  infinite: true,
  slidesToShow: 5,
  slidesToScroll: 5,
  centerMode: true,
  centerPadding: '30px',
  dots: false,
  arrows: false,
});




$('.home-slider').slick({
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  centerMode: true,
  centerPadding: '30px',
  dots: true,
  arrows: false,
});

$('.brand-slider').slick({
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  centerMode: true,
  centerPadding: '30px',
  dots: false,
  arrows: false,
});



$('.product-slider').slick({
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  centerMode: true,
  centerPadding: '60px',
  dots: false,
  arrows: false,
  responsive: [
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 2,
      }
    },
    {
      breakpoint: 365,
      settings: {
        slidesToShow: 2,
        centerPadding: '20px',
      }
    }
  ]
});

*/




$('.payment-slider').slick({
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  centerMode: true,
  centerPadding: '40px',
  dots: false,
  arrows: false,
});

$('.onboarding-slider').slick({
  centerMode: true,
  centerPadding: '40px',
  slidesToShow: 1,
  infinite: false,
  arrows: false,
  dots: true
});



/*=====================
 Image to background js
 ==========================*/
$(".bg-top").parent().addClass('b-top');
$(".bg-bottom").parent().addClass('b-bottom');
$(".bg-center").parent().addClass('b-center');
$(".bg_size_content").parent().addClass('b_size_content');
$(".bg-img").parent().addClass('bg-size');
$(".bg-img.blur-up").parent().addClass('blur-up lazyload');

jQuery('.bg-img').each(function () {

  var el = $(this),
    src = el.attr('src'),
    parent = el.parent();

  parent.css({
    'background-image': 'url(' + src + ')',
    'background-size': 'cover',
    'background-position': 'center',
    'display': 'block'
  });

  el.hide();
});


/*========================
 Payment show more js
 ==========================*/
$('.show-more').on('click', function (e) {
  $('.offer-listing').toggleClass("maximized");
  $(this).text(function (i, text) {
    return text === "Show Less" ? "Show More" : "Show Less";
  })
});


/*========================
 Dark local storage setting js
 ==========================*/
$('#darkButton').change(function () {
  if ($(this).is(":checked")) {
    $('body').addClass('dark');
    $("#change-link").attr("href", "https://cdn.jsdelivr.net/gh/sa-lda/rcap/resources/dark.css");
    localStorage.setItem('body', 'dark');
    localStorage.setItem('layoutcss', 'https://cdn.jsdelivr.net/gh/sa-lda/rcap/resources/dark.css');
  } else {
    $('body').removeClass('dark');
    $("#change-link").attr("href", "https://cdn.jsdelivr.net/gh/sa-lda/rcap/resources/dark.css");
    localStorage.setItem('body', '');
    localStorage.setItem('layoutcss', 'https://cdn.jsdelivr.net/gh/sa-lda/rcap/resources/dark.css');
  }
});

//$("body").attr("class", localStorage.getItem('body'));
//$("#change-link").attr("href", localStorage.getItem('layoutcss') ? localStorage.getItem('layoutcss') : 'https://cdn.jsdelivr.net/gh/sa-lda/rcap/resources/style.css');
//localStorage.getItem('body') ? $('#darkButton').attr('checked', true) : '';


/*========================
 RTL local storage setting js
 ==========================*/
$('#rtlButton').change(function () {
  if ($(this).is(":checked")) {
    $("html").attr("dir", "rtl");
    $("#rtl-link").attr("href", "https://cdn.jsdelivr.net/gh/sa-lda/rcap/resources/bootstrap.rtl.css");
    localStorage.setItem('rtlcss', 'https://cdn.jsdelivr.net/gh/sa-lda/rcap/resources/bootstrap.rtl.css');
    localStorage.setItem('dir', 'rtl');
  } else {
    $("html").attr("dir", '');
    localStorage.setItem('dir', '');
    $("#rtl-link").attr("href", "https://cdn.jsdelivr.net/gh/sa-lda/rcap/resources/bootstrap.css");
    localStorage.setItem('rtlcss', 'https://cdn.jsdelivr.net/gh/sa-lda/rcap/resources/bootstrap.css');
  }
});
$("html").attr("dir", localStorage.getItem('dir'));
$("#rtl-link").attr("href", localStorage.getItem('rtlcss') ? localStorage.getItem('rtlcss') : 'https://cdn.jsdelivr.net/gh/sa-lda/rcap/resources/bootstrap.css');
localStorage.getItem('dir') ? $('#rtlButton').attr('checked', true) : '';





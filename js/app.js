global.jQuery = require('jquery');
var $ = require("jquery");

$(document).ready(function(){

  $('.home').click(function(){
    $("#home").show();
    $("#about").hide();
    $("#contact").hide();
  });

  $('.about').click(function(){
    $("#about").show();
    $("#home").hide();
    $("#contact").hide();
  });

  $('.contact').click(function(){
    $("#contact").show();
    $("#home").hide();
    $("#about").hide();
  });

  $('#home').removeClass('hidden');

});
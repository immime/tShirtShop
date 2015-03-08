//Function to change the tabs
var changeTab = function (tabId) {
    var newMargin = (-960)* $('#' + tabId).index();

    $('#tabs li').removeClass('selected-tab');
    $('#' + tabId).addClass('selected-tab');
    $('#slider').stop().animate({'margin-left':newMargin});

    if($('#' + tabId).index() === 0){
      $('#buy').hide(); 
      $('#add').show();
    }
    if(($('#cart').find('p').length > 0) && ($('#' + tabId).index() === 1)){
      $('#buy').show(); 
      $('#add').hide();
    }
    else if($('#' + tabId).index() === 1){
      $('#buy').hide(); 
      $('#add').hide();
      $('#checkout').css('margin-bottom', 16); //Due the add and buy buttom gets invisible, its important add the margin to keep the structure alike.
    }
  },

//Function to change the shirt's color
  changeColor = function (divId) {
    var src = 'img/shirt-' + divId + '.png';

    $('#selection-color div').removeClass('selected-color opacity');
    $('#' + divId).addClass('selected-color opacity');
    $('#shirt').attr('src', src);
  },

//Function to change the shirt's icon
  changeIcon = function (divId) {
    var src = 'img/' + divId + '.png';

    $('#icon-selected').attr('src', src);
    $('#icon-selected').attr('alt', divId); //It's important add the alt attribute to get the correct result at the cart div.
  },

  restart = function () {
    $('#shirt').attr('src', 'img/shirt-lightblue.png');
    $('#icon-selected').attr({src: 'img/tree.png', alt:'Tree'});
    $('#selection-color div').removeClass('selected-color');
    $('#lightblue').addClass('selected-color');
  },

//Form validation
  validateInputs = function () {
    var result = true;

    $('.error').removeClass('error');

    if (!$('#input-persona').val()) {  
      result = false;
      $('#input-persona').prev().addClass('error');
    }
  
    if (!$('#input-address').val()) {  
      result = false;
      $('#input-address').prev().addClass('error');
    }

    if (!/^\d{4}\-\d{4}\-\d{4}\-\d{4}$/.test($('#input-card').val())){ 
      result = false;
      $('#input-card').prev().addClass('error');
    }

    if (!/^\d{3}$/.test($('#input-cvv').val())){ 
      result = false;
      $('#input-cvv').prev().addClass('error');
    }

    return result;
};

//Document ready
$(function() {
  //Change the tab with a click...
  $('#tabs li').click(function() {
    changeTab(this.id);
  });

  //Change shirt's color
  $('#selection-color div').click(function() {
    changeColor(this.id);
  });

  //Change shirt's icon
  $('#selection-icon img').click(function() {
    changeIcon(this.id);
  });

   //Bottom Add functionality
  $('#add').click(function(e) {
    var icon = $('#icon-selected').attr('alt'),
        color = $('.selected-color').attr('id'),
        order = '<div><p>' + color + ' - ' + icon + '</p><div class="remove">x</div></div>';

    changeTab('checkout'); 
    $('#cart').append(order);
    $('#add').hide();
    $('#buy').show(); 
  });

  //Remove bottom "x" functionality
  $(document).on('click', '.remove' , function() {
     $(this).parent().remove();
     if(!$('#cart').find('p').length){ 
      $('#form-container input').add('#form-container textarea').val('');
      $('.error').removeClass('error');
      $('#buy').hide();
     }
  });
 
  //Bottom Add++ functionality
  $('#add-another').click(function() {
    changeTab('selection');
    restart();
  });

  //Bottom Buy functionality
  $('#buy').click(function(e){
      if (validateInputs()){
        $('#cart div').remove();
        $('#form-container input').add('#form-container textarea').val('');
        $('#checkout-content').slideUp(1000);
      };
  });

  ///Bottom "Continue shopping" functionality
  $('#continue').click(function(e){
      restart();
      changeTab('selection');
      $('#checkout-content').show();
  });

}); //Done
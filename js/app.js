$(function(){

  	var $window = $(window);
  	var cachedWidth = $window.width();

	$window.resize(function(){
		var newWidth = $window.width();
		if(newWidth !== cachedWidth){
			sizeStuff();
            cachedWidth = newWidth;
			$('#quick-app').removeClass('active').fadeOut('fast');
      		$('body').removeClass('no-scroll');
        }
	});

    function sizeStuff(){
		var question_width 	= $('#quick-app .quick-questions').width(); 
      	var question_width2 = $('.quick-app .quick-questions').width(); 
      	var question_count 	= $('.quick-questions li').length;

      	$('#quick-app .questions-wrap').width(question_width * question_count);
      	$('.quick-app .questions-wrap').width(question_width2 * question_count);
		
      	$('#quick-app .quick-questions li').each(function(){
        	$(this).width(question_width + 'px');
      	});
		
      	$('.quick-app .quick-questions li').each(function(){
        	$(this).width(question_width2 + 'px');
      	});
		
		//Offset
		/*
		if( $(this).parent().next().length > 0 ){
			console.log(question_width*index);
        	$(this).parent().parent().parent().css({ transform:'translateX('+ -question_width*index +'px)' });
          	$('#quick-app .quick-questions-nav span').removeClass('active').eq(index).addClass('active');
			
			$(this).parent().parent().parent().css({ transform:'translateX('+ -question_width2*index +'px)' });
          	$('.quick-app .quick-questions-nav span').removeClass('active').eq(index).addClass('active');
        }
		*/
    }
	
    sizeStuff();

    $('#quick-app .quick-questions li .question-btn').on('click', function(){
		var question_width  = $('#quick-app .quick-questions').width(); 
        var index           = $(this).parent().index()+1;
		
        $(this).addClass('checked').siblings().removeClass('checked');

        if( $(this).parent().next().length > 0 ){
        	$(this).parent().parent().parent().css({ transform:'translateX('+ -question_width*index +'px)' });
          	$('#quick-app .quick-questions-nav span').removeClass('active').eq(index).addClass('active');
        }

    });


    $('.quick-app .quick-questions li .question-btn').on('click', function(){

        var question_width  = $('.quick-app .quick-questions').width(); 
        var index           = $(this).parent().index()+1;

        $(this).addClass('checked').siblings().removeClass('checked');

        if( $(this).parent().next().length > 0 ){

          $(this).parent().parent().parent().css({ transform:'translateX('+ -question_width*index +'px)' });
          $('.quick-app .quick-questions-nav span').removeClass('active').eq(index).addClass('active');

        }

    });

    $('#quick-app .quick-questions-nav span').on('click', function(){

       var question_width  = $('#quick-app .quick-questions').width();
       var index           = $(this).index();

       $(this).addClass('active').siblings().removeClass('active');
       $(this).parent().parent().find('.questions-wrap').css({ transform:'translateX('+ -index*question_width +'px)' });

   	});
	
	$('.quick-app .quick-questions-nav span').on('click', function(){

       var question_width  = $('.quick-app .quick-questions').width();
       var index           = $(this).index();

       $(this).addClass('active').siblings().removeClass('active');
       $(this).parent().parent().find('.questions-wrap').css({ transform:'translateX('+ -index*question_width +'px)' });

   	});
	
	$('.close-overlay').on('click', function(){
		$('#quick-app').removeClass('active').fadeOut('fast');
      	$('body').removeClass('no-scroll');
    });

	
    $('div.apply-btn, .large-apply .apply-btn, .entry .apply-btn, #footer-nav-apply.apply-btn').on('click', function(e){
      	e.preventDefault();
      	$('#quick-app').addClass('active').fadeIn('fast', function(){
        	$('body').addClass('no-scroll');
			window.scrollTo(0, 0);
      	});
		
    	sizeStuff();
    });
	
    $('.btn_cancel').on('click', function(){

      $('#quick-app').removeClass('active').fadeOut('fast');
      $('body').removeClass('no-scroll');

    });
	
	
	// Validate Quick App
    $('.quick-app-form').submit(validateQuickApp);

    function validateQuickApp(e){

		var target      = $(this);
      	var errorCount  = 0;
		var answerCount = 0;

      	target.find('.required').each( function() {

			var tag  = $(this).get(0).tagName;
			var type = $(this).attr('type');

			if(tag == 'SELECT') {

			  	if($(this).children(':selected').val() == '') {
					$(this).addClass('error');
					$('.error-alert').html('These fields are required.');
					errorCount++; 
			  	} 
				else{
					$(this).removeClass('error');
			  	}

			}
			else if(type == 'text') {

			  	if( $(this).val() == '' ){
					$(this).addClass('error');
					$('.error-alert').html('These fields are required.');
					errorCount++; 
			  	} 
				else{
					$(this).removeClass('error');
			  	}
			}
			else if( type == 'email' ){

			  	if( $(this).val() == '' ){
					$(this).addClass('error');
					errorCount++; 
			  	} 
				else if( validateEmail($(this).val()) !== true ){
					$(this).addClass('error'); 
					$('.error-alert').html('Make sure email is valid.');
					errorCount++; 
			  	} 
				else{
					$(this).removeClass('error');
			  	}

			}
        
      	});

      	target.find('.quick-questions li').each(function(){

        	var answer = $(this).find('input[type="radio"]:checked');
        	if( answer.length == 0 ){
            	target.find('.quick-questions').addClass('error');
            	answerCount ++;
        	} 
			else{
            	target.find('.quick-questions').removeClass('error'); 
        	}
      	});
      
      	if( errorCount > 0 || answerCount > 0 ){
        	e.preventDefault();
        	target.find('.error-alert').css('display', 'block');
      	} 
		else{
        	target.find('.error-alert').css('display', 'none');
        	target[0].submit();
      	}

    }

    function validateEmail(email) {

        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);

    }

    function resetQuickApp(){

        $('#quick-app form').trigger('reset');
        $('#quick-app .quick-questions li .question-btn').removeClass('checked');
        $('#quick-app .quick-questions li .question-btn').find('input[type="radio"]').prop('checked', false);
        $('#quick-app .quick-questions-nav span').removeClass('active');
        $('#quick-app .quick-questions-nav span').first().addClass('active');
        $('#quick-app .quick-questions .questions-wrap').css({ transform:'translateX(0)'});

    }



    $('.hero-grid_item').on("click", function(){

      $('.content_modal').fadeIn('fast', function(){
        $('.content_modal-section').addClass('show');
      });
      
    });
	
});



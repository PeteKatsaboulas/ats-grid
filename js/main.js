$(function() {

	$('.required').blur( function() {
		handleRequired(this);
	});
	
	$('.required').click( function() {
		handleRequired(this);
	});
	
	$(document).on('submit', '#quickAppForm', function() {
		var error_count = 0;
		$('#formError').remove();
		$('.required').each( function() {
			//console.log($(this).attr('name') + ' - ' + $(this).val());
			if(handleRequired(this) == false) {
				error_count++;
			}
		});
		if(error_count > 0) {
			$('#quickAppForm').before('<div class="alert alert-error" id="formError">Please fill out all required fields</div>');
			return false;
		}
	});
	
	$(document).ready( function() {
		/**
		 * Form Validation
		 */
		 $('input[name="cdl_have"]').click( function() {
			 var val = $(this).val();
			 if(val == 'N') {
				$('.requirement_notice').css('display', 'block'); 
			 }
			 else {
				 $('.requirement_notice').css('display', 'none');
			 }
		 });


			$('input[name="df_Do_you_have_a_current_Class_A_CDL?[]"]').click( function() {
				console.log($(this).val());
				var val = $(this).val();
				if(val == 'No') {
					$(this).parent('label').parent('div.form-field').append("<div class='alert alert-danger' id='cdl_alert'>ATS doesn't provide training and a minimum of 6 mo OTR experience is required to be considered for a driving position.</div>");
				}
				else {
					$('#cdl_alert').remove();
				}
			});

		$('input[name="df_local"]').click( function() {
			 var val = $(this).val();
			// console.log($('input[name="df_otr/regional"]:checked').val());
			 if(val == 'Yes' && $('input[name="df_otr/regional"]:checked').val() != 'Yes' ) {
				$('.local_notice').css('display', 'block'); 
			 }
			 else {
				 $('.local_notice').css('display', 'none');
			 }
		 });

		 $('input[name="df_otr/regional"]').click( function() {
			 var val = $(this).val();
			 //console.log($('input[name="df_local"]:checked').val());
			 if(val == 'Yes') {
				$('.local_notice').css('display', 'none');
			 }
			 else if($('input[name="df_local"]:checked').val() == 'Yes') {
				 $('.local_notice').css('display', 'block');
			 }
		});
	});
	
	function scrollPos() {
		var imagePos = Math.max(-0, 0 + $(this).scrollTop() * 0.5);
		$('#image img').css('margin-top', imagePos);
	}

	$(window).scroll(scrollPos);


	$('.applyNowBtn').mouseenter(function() {
		$(this).find('.mouseOut').stop(true, true).fadeOut('fast');
	});
	$('.applyNowBtn').mouseleave(function() {
		$(this).find('.mouseOut').stop(true, true).fadeIn('fast');
	});
	$('.applyNowBtn').click(function(){
		var top = $('#content').offset().top;
	    $('html,body').animate({scrollTop:top},500,'easeInOutExpo');
	    return false;	
	});
	$('.submit').mouseenter(function() {
		$(this).find('#submit2').stop(true, true).fadeOut('fast');
	});
	$('.submit').mouseleave(function() {
		$(this).find('#submit2').stop(true, true).fadeIn('fast');
	});
	
	
	
	
	$.fn.extend({
		customStyle: function(options) {
		/*	if (!$.browser.msie || ($.browser.msie && $.browser.version > 6)) {
				return this.each(function() {
					var currentSelected = $(this).find(':selected');
					$(this).after('<span class="customStyleSelectBox"><span class="customStyleSelectBoxInner">' + currentSelected.text() + '</span></span>').css({
						position: 'absolute',
						opacity: 0,
						fontSize: $(this).next().css('font-size')
					});
					var selectBoxSpan = $(this).next();
					var selectBoxWidth = parseInt($(this).width()) - parseInt(selectBoxSpan.css('padding-left')) - parseInt(selectBoxSpan.css('padding-right'));
					var selectBoxSpanInner = selectBoxSpan.find(':first-child');
					selectBoxSpan.css({
						display: 'inline-block'
					});
					selectBoxSpanInner.css({
						display: 'inline-block'
					});
					var selectBoxHeight = parseInt(selectBoxSpan.height()) + parseInt(selectBoxSpan.css('padding-top')) + parseInt(selectBoxSpan.css('padding-bottom'));
					$(this).height(selectBoxHeight).change(function() {
						selectBoxSpanInner.text($(this).find(':selected').text()).parent().addClass('changed');
					});
				});
			}
			*/
		}
	});
	
	/*if (!$.browser.mozilla) {
	   $('select.styled').customStyle();
    }
	else{
		$('select').css('width','150px');
	}*/
	
	
	
	function handleRequired(elem) {
		//alert($(elem).val());
		//alert($(elem).attr('id'));
		//console.log($(elem).prop('tagName'));
		if($(elem).prop('tagName') == 'SELECT') {
			//console.log('TEXT: ' + $(elem).text() + ' -  VAL: ' + $(elem).val());
			if($(elem).val().trim() == '') {
				$(elem).addClass('error');
				return false;
			}
			else {
				$(elem).removeClass('error');
				return true;
			}
		}
		else if($(elem).attr('type') == 'text' || $(elem).prop('tagName') == 'TEXTAREA' || $(elem).attr('type') == 'date') {
			if($(elem).val().trim() == '') {
				$(elem).addClass('error');
				return false;
			}
			else {
				$(elem).removeClass('error');
				return true;
			}
		}
		
		else if($(elem).attr('type') == 'radio') {
			var name = $(elem).attr('name');
			if(!$('input[name="' + name + '"]').is(':checked')) {
				$('input[name="' + name + '"]').addClass('error');
				$('input[name="' + name + '"]').closest('.form-group').addClass('has-error');
				return false;
			}
			else {
				$('input[name="' + name + '"]').removeClass('error');
				$('input[name="' + name + '"]').closest('.form-group').removeClass('has-error');
				return true;
			}
		}
		return;
	}
	


});


$(document).ready(function() {
	var endDay = $('.time-entry.days span');
	var endHour = $('.time-entry.hours span');
	var endMinute = $('.time-entry.minutes span');
	var endSecond = $('.time-entry.seconds span');
	var endTime = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000);

	// ---------------------- CLOCK
	setInterval(function(){
		var distance = Date.parse(endTime) - Date.parse(new Date());

		var seconds = Math.floor((distance / 1000) % 60);
		var minutes = Math.floor((distance / 1000 / 60) % 60);
		var hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
		var days = Math.floor(distance / (1000 * 60 * 60 * 24));

		endDay.text(days);
		endHour.text(hours);
		endMinute.text(minutes);
		endSecond.text(seconds);
	}, 1000);
	// ---------------------- CLOCK

	// ---------------------- ISOTOPE
	$('.gallery-box ul').isotope({
		itemSelector:'li'
	});

	$('.category-wrapper li').click(function(event) {
		$('.category-wrapper li').each(function(){
			$(this).removeClass("active");
		});
		$(this).addClass('active');
		var category = $(this).data('category');

		if(category == 'all'){
			$('.gallery-box ul').isotope({filter:'*'});
		}
		else {
			console.log(category)
			$('.gallery-box ul').isotope({filter:category});
		}
	});;
	// ---------------------- ISOTOPE
	

	$('.light-box').fadeOut(0);
	// ------------------------- LIGHT BOX
	$('.show-light-box').each(function(){
			$(this).click(function () {
				var src = $(this).parent().parent().find("img").attr('src');
				$('#image-content').attr("src", src);
				$('.light-box').fadeIn(300);
			})
	});	
	$('#btn-close').click(function () {
		$('.light-box').fadeOut(300);
	})
	// ------------------------- LIGHT BOX

	// ------------------------- SCROLL PAGE
	var isScrolling = true;
	$(window).scroll(function() {
	  	if(window.pageYOffset > $('.wellcome-wrapper').offset().top - 300){
	  		$('.navbar-wrapper').addClass('scroll');
	  	}else if(window.pageYOffset < 300) {
	  		if (isScrolling) {
	  			$('.navbar-wrapper').removeClass('scroll');
	  		}else {
	  			isScrolling = true;
	  		}
	  	}
	});
	$('#btn-home').click(function() {
		isScrolling = false;
		$("html, body").animate({ scrollTop: 400 }, "slow");
		resetNavLink(this);
	});
	$('#btn-about').click(function() {
		isScrolling = false;
		$("html, body").animate({ scrollTop: $('.wellcome-wrapper').offset().top - 90 }, "slow");
		resetNavLink(this);
	});
	$('#btn-tour').click(function() {
		isScrolling = false;
		$("html, body").animate({ scrollTop: $('.slogan-wrapper').offset().top - 90 }, "slow");
		resetNavLink(this);
	});
	$('#btn-destination').click(function() {
		isScrolling = false;
		$("html, body").animate({ scrollTop: $('.services-wrapper').offset().top - 90 }, "slow");
		resetNavLink(this);
	});
	$('#btn-gallery').click(function() {
		isScrolling = false;
		$("html, body").animate({ scrollTop: $('.portfolio-wrapper').offset().top - 90 }, "slow");
		resetNavLink(this);
	});
	$('#btn-register').click(function() {
		isScrolling = false;
		$("html, body").animate({ scrollTop: $('.register-wrapper ').offset().top - 90 }, "slow");
		resetNavLink(this);
		
	});
	// ------------------------- SCROLL PAGE
});

function resetNavLink(item) {
	$('.nav-item').each(function () {
		$(this).removeClass('active');
	})
	item.classList.add('active')
}

// ------------------------ VALIDATION FORM
function validationForm () {
	check = true;
	if(!validateUsername()){
		check = false;
	}
	if(!validateEmail()){
		check = false;
	}
	if(!validatePassword()){
		check = false;
	}
	if(!validateConfirmPassword()){
		check = false;
	}
	return check;
}

function validateUsername () {
	if($('#username').val().length < 8 || $('#username').val().length > 15){
		$('.tooltip-username').css("visibility", "visible");
		return false;
	}else{
		$('.tooltip-username').css("visibility", "hidden");
		return true;
	}
}


function validateEmail () {
	var email = $('#email').val();
	var re = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

	if(!re.test(email)){
		$('.tooltip-email').css("visibility", "visible");
		return false;
	}else{
		$('.tooltip-email').css("visibility", "hidden");
		return true;
	}
}

function validatePassword () {
	if($('#password').val().search(/[A-Z]/) < 0 || $('#password').val().search(/[a-z]/) < 0 || $('#password').val().search(/[0-9]/) < 0){
		$('.tooltip-password').css("visibility", "visible");
		return false;
	}else{
		$('.tooltip-password').css("visibility", "hidden");
		return true;
	}
}

function validateConfirmPassword () {
	if($('#confirmPassword').val() != $('#password').val()){
		$('.tooltip-confirm-password').css("visibility", "visible");
		return false;
	}else{
		$('.tooltip-confirm-password').css("visibility", "hidden");
		return true;
	}
}
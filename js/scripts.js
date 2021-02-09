var $ = jQuery;

$(document).ready(function () {

	$('.lazy').Lazy({
		effect: 'fadeIn',
		visibleOnly: true
	});

	//FormStyler
	$('input, select').styler({
		selectSmartPositioning: false
	});

	$.datetimepicker.setLocale('ru');
	$('#datetimepicker').datetimepicker({
		step: 60,
		minDate: 0,
		minTime: 0,
		dayOfWeekStart: 1,
		closeOnDateSelect: false,
		validateOnBlur: true,
		inverseButton: true,
		allowTimes: [
			'12:00', '13:00', '14:00', '15:00', '16:00',
			'17:00', '18:00', '19:00', '20:00', '21:00', '22:40'
		],
		format: 'd.m.Y - H:i',
		onSelectDate: function (ct, $i) {
			var minTime, now = new Date;
			if (ct.getTime() > now) {
				minTime = false;
			} else {
				var d = $i.val().substr(0, 11) + (Number(now.getHours()) + 1).toString() + ':00';
				$i.val(d);
				minTime = 0;
			}
			this.setOptions({
				minTime: minTime
			})
		}
	});

	// for link:
	// 	data-effect="mfp-zoom-in"
	// for modal window:
	// class="mfp-with-anim"

	// $('.popup').magnificPopup({
	// 	removalDelay: 500,
	// 	midClick: true,
	// 	mainClass: 'mfp-zoom-in'
	// });

	// $('.image-popup').magnificPopup({
	// 	type: 'image',
	// 	closeOnContentClick: true,
	// 	mainClass: 'mfp-with-zoom mfp-img-mobile',
	// 	image: {
	// 		verticalFit: false
	// 	},
	// 	zoom: {
	// 		enabled: true,
	// 		duration: 300, // don't foget to change the duration also in CSS
	// 		opener: function(element) {
	// 			return element.find('img');
	// 		}
	// 	}
	// });

	// $('.gallery-popup').magnificPopup({
	// 	delegate: 'a',
	// 	type: 'image',
	// 	closeOnContentClick: false,
	// 	showCloseBtn: false,
	// 	mainClass: 'mfp-with-zoom mfp-img-mobile',
	// 	image: {
	// 		verticalFit: true
	// 	},
	// 	gallery: {
	// 		enabled: true
	// 	},
	// 	zoom: {
	// 		enabled: true,
	// 		duration: 300, // don't foget to change the duration also in CSS
	// 		opener: function(element) {
	// 			return element.find('img');
	// 		}
	// 	}

	// });

	//Маска ввода
	$(".phone-in").inputmask("+7 (999) 999-99-99", { showMaskOnHover: false });
	// $(".time-in").inputmask("99:99", { showMaskOnHover: false });
	$('.mail-in').inputmask({
		mask: "*{1,20}[.*{1,20}][.*{1,20}][.*{1,20}]@*{1,20}[.*{2,10}][.*{1,3}]",
		greedy: false,
		onBeforePaste: function (pastedValue, opts) {
			pastedValue = pastedValue.toLowerCase();
			return pastedValue.replace("mailto:", "");
		},
		definitions: {
			'*': {
				validator: "[0-9A-Za-z!#$%&'*+/=?^_`{|}~\-]",
				casing: "lower"
			}
		}
	});

	$('.validate-in input').on('keyup', function () {
		var th = $(this);
		var val = $(this).val();
		if (val.length >= 1) {
			th.parent().addClass('not-empty');
		} else {
			th.parent().removeClass('not-empty');
		}
	});

	$('.header-location__link').on('click', function () {
		$(this).toggleClass('active');
		$('.header-location-accept').stop().fadeToggle();
		return false;
	});
	$('body').click(function (e) {
		if ($(e.target).closest(".header-location__link, .header-location__link_mob, .header-location-accept").length) return;
		$('.header-location__link, .header-location__link_mob').removeClass('active');
		$('.header-location-accept').stop().fadeOut();
	});

	$('.header-location__outer').on('click', function () {
		$('.header-location-accept').stop().fadeOut();
		$('.header-location-replace').stop().fadeIn();
		return false;
	});
	$('body').click(function (e) {
		if ($(e.target).closest(".header-location-replace").length) return;
		$('.header-location-replace').stop().fadeOut();
	});

	$('.header-location__changecity').on('click', function () {
		$('.header-location__changecity').removeClass('active');
		$(this).addClass('active');
		return false;
	});
	$('.header-location__city').on('click', function () {
		var city = $('.header-location__changecity.active').text();
		var link = $('.header-location__link');
		link.text(city);
		$('.header-location-replace').stop().fadeOut();
		return false;
	});

	$('.login-modal__btn').on('click', function () {
		var th = $(this);
		var phoneIn = $('.field__phone');
		var codeIn = $('.field__code');

		$(this).addClass('active').text(th.is('.active') ? 'Подтвердить' : 'Войти');
		phoneIn.hide();
		codeIn.stop().fadeIn();

		return false;
	});

	$('.product-item__desc a').on('click', function () {
		var th = $(this);

		th.closest('.product-item').find('.product-item__desc a').removeClass('active');
		$(this).toggleClass('active');

	});

	//показать пустую корзину. Удалить потом
	$('.cart-remove').on('click', function () {
		$(this).closest('.cart, .cart-mob').toggleClass('cart-empty');
		return false;
	});

	$('.product-item__btn').on('click', function () {
		var th = $(this);
		th.toggle();
		th.closest('.product-item__bottom').find('.product-item__count').stop().fadeToggle().addClass('active');
		return false;
	});

	$('.cart-item__counter').click(function () {
		var th = $(this);
		var inValue = th.parent().find('input');
		var count = parseInt(inValue.val()) - 1;

		if (th.hasClass('cart-item__minus')) {
			count = count < 1 ? 1 : count;
			inValue.val(count);
			inValue.change();
		} else if (th.hasClass('cart-item__plus')) {
			inValue.val(parseInt(inValue.val()) + 1);
			inValue.change();
		}

		return false;
	});

	$('.count-counter').click(function () {
		var th = $(this);
		var inValue = th.parent().find('input');
		var count = parseInt(inValue.val()) - 1;

		if (th.hasClass('count-counter_minus')) {
			count = count < 1 ? 1 : count;
			inValue.val(count);
			inValue.change();
		} else if (th.hasClass('count-counter_plus')) {
			inValue.val(parseInt(inValue.val()) + 1);
			inValue.change();
		}

		return false;
	});

	$('.basket-delivery__label').click(function () {
		var th = $(this);
		var form = th.closest('.basket-delivery').find('input[type=checkbox]');
		var curier = $('.hide-field');
		var pay = $('.basket-pay');
		var payNotDel = $('.basket-pay_notdelivery');
		var payCash = $('.basket-pay__item_cash');

		payCash.find('input:radio').trigger('click')

		if (!form.is(':checked')) {
			curier.stop().fadeOut();
			pay.hide();
			payNotDel.stop().fadeIn('fast');
		} else {
			curier.stop().fadeIn();
			pay.stop().fadeIn('fast');
			payNotDel.hide();
		}

		return false;
	});

	let field = $('.basket-form__field_textarea');
	let fieldCash = $('.basket-form__field_cash');
	$(".basket-pay__item input:radio").change(function () {
		var th = $(this);
		var pay = th.closest('.basket-pay__item');

		if (pay.hasClass("basket-pay__item_cash")) {
			field.hide();
			fieldCash.stop().fadeIn();
		} else {
			field.stop().fadeIn();
			fieldCash.hide();
		}
		return false;
	});
	$(window).on('load', function () {
		$(".basket-pay__item input:radio").each(function () {
			var th = $(this);
			var pay = th.closest('.basket-pay__item');

			if (pay.hasClass("basket-pay__item_cash")) {
				field.hide();
				fieldCash.stop().fadeIn();
			} else {
				field.stop().fadeIn();
				fieldCash.hide();
			}
			return false;
		});
	});

	// fixed cart
	// $(function () {
	// 	var topPos = $('.cart').offset().top - 85;
	// 	$(window).scroll(function () {
	// 		var top = $(document).scrollTop(),
	// 			pip = $('.cart-stop').offset().top,
	// 			height = $('.cart').outerHeight();

	// 		if (top > topPos && top < pip - height) {
	// 			$('.cart').addClass('fixed').removeClass('fixed_bottom');
	// 		}
	// 		else if (top > topPos) {
	// 			$('.cart').removeClass('fixed').addClass('fixed_bottom');
	// 		}
	// 		else {
	// 			$('.cart').removeClass('fixed');
	// 			$('.cart').removeClass('fixed_bottom');
	// 		}
	// 	});
	// });

	$(window).on('load', function () {
		var nav = $('.floating');
		var headerHeight = $('.header').innerHeight();

		if (nav.length) {
			var topPos = $('.floating').offset().top - headerHeight;
			$(window).scroll(function () {
				var top = $(this).scrollTop();
				var pip = $('.floating-end').offset().top - headerHeight;
				var height = $('.floating').outerHeight();
				var main = $('.floating-sec').innerHeight();

				if (top > topPos && top < pip - height) {
					$('.floating').addClass('fixed').removeAttr('style');
				}
				else if (height > main && top > pip - height) {
					$('.floating').removeClass('fixed').removeAttr('style');
				}
				else if (top > pip - height) {
					$('.floating').removeClass('fixed').css({ 'position': 'absolute', 'bottom': '0' });
				}
				else {
					$('.floating').removeClass('fixed');
				}
			});
		}
	});

	//моб. меню
	$('#btn-mob').on('click', function () {
		$(this).toggleClass('active');
		$('body').toggleClass('modal-open');
		$('.header').toggleClass('active');
		$('.overlay').toggleClass('active');
		$('.mob-nav').toggleClass('open');
	});
	$('.overlay, .mob-nav__close').click(function (e) {
		$('body').removeClass('modal-open');
		$('.overlay').removeClass('active');
		$('.menu-mob').removeClass('active');
		$('.mob-nav').removeClass('open');
	});

	// Fixed menu
	var menu = $('.header');
	menu_top = $('.header').offset().top;
	$(window).scroll(function () {
		if ($(window).scrollTop() > menu_top) {
			menu.addClass('fixed');

		} else {
			menu.removeClass('fixed');
		}
	});

	//Слайдер
	$('.slider-main').slick({
		// autoplay: true,
		// autoplaySpeed: 3000,
		row: 1,
		fade: true,
		dots: true,
		arrows: false,
		infinite: true
	});

	//прокрутка по якорям
	$(window).on('load resize', function () {
		$('.menu-list__item').bind("click", function (e) {
			var anchor = $(this);
			windowWidth = $(window).width();
			$('html, body').stop().animate({
				scrollTop: $(anchor.data('scroll')).offset().top - 50
			}, 1000);
			e.preventDefault();
		});
	});

	//Карусель
	$('.basket-cl').slick({
		// autoplay: true,
		// autoplaySpeed: 3000,
		slidesToShow: 3,
		slideToScroll: 1,
		rows: 0,
		dots: false,
		arrows: true,
		infinite: false,
		responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1
				}
			}
		]
	});

	$('.basket-addres__remove').on('click', function (e) {
		var th = $(this);
		var content = $('.basket-addres__text, .basket-addres__edit, .basket-addres__remove');
		var link = $('.basket-addres__delete');
		var save = $('.basket-addres__save');
		var contentThis = th.closest('.basket-addres').find('.basket-addres__text, .basket-addres__edit, .basket-addres__remove');
		var linkThis = th.closest('.basket-addres').find('.basket-addres__delete');

		content.stop().fadeIn('fast');
		link.hide();
		save.hide();
		contentThis.hide();
		linkThis.stop().fadeIn('fast');

		return false;
	});

	$('.basket-addres__delete').on('click', function () {
		var currentSlide = $(this).closest('.slick-slide').index();

		$('.basket-cl').slick('slickRemove', currentSlide);

		return false;
	});

	$('.basket-save').on('click', function () {
		var th = $(this);
		var fieldName = $('.basket-form input.field-name').val();
		var fieldPhone = $('.basket-form input.field-phone').val();
		var fieldStreet = $('.basket-form input.field-street').val();
		var fieldHouse = $('.basket-form input.field-house').val();
		var fieldRoom = $('.basket-form input.field-room').val();
		var fieldDoor = $('.basket-form input.field-door').val();
		var fieldFloor = $('.basket-form input.field-floor').val();

		val = check_required_inputs();

		if (val == true) {

			$('.basket-order__valid').stop().fadeIn('fast');

		} else {

			$('.basket-cl').slick('slickAdd', '<div class="cl-item"><div class="basket-addres"><a href = "#" class= "basket-addres__remove" ></a><div class="basket-addres__text">' + fieldStreet + ' ' + fieldHouse + '</div><a href="#" class="basket-addres__edit">Редактировать</a><a href="#" class="btn btn_color3 basket-addres__delete">Удалить</a><a href="#" class="btn btn_color3 basket-addres__save">Сохранить</a><input type="hidden" class="hidden-name" value="' + fieldName + '"><input type="hidden" class="hidden-phone" value="' + fieldPhone + '"><input type="hidden" class="hidden-street" value="' + fieldStreet + '"><input type="hidden" class="hidden-house" value="' + fieldHouse + '"><input type="hidden" class="hidden-room" value="' + fieldRoom + '"><input type="hidden" class="hidden-door" value="' + fieldDoor + '"><input type="hidden" class="hidden-floor" value="' + fieldFloor + '"></div></div>');

			$('.basket-addres__remove').bind('click', function (e) {
				var th = $(this);
				var content = $('.basket-addres__text, .basket-addres__edit, .basket-addres__remove');
				var del = $('.basket-addres__delete');
				var save = $('.basket-addres__save');
				var contentThis = th.closest('.basket-addres').find('.basket-addres__text, .basket-addres__edit, .basket-addres__remove');
				var delThis = th.closest('.basket-addres').find('.basket-addres__delete');
				var saveThis = th.closest('.basket-addres').find('.basket-addres__save');

				content.stop().fadeIn('fast');
				del.hide();
				save.hide();
				contentThis.hide();
				delThis.stop().fadeIn('fast');
				saveThis.hide();

				return false;
			});

			$('.basket-addres__delete').bind('click', function () {
				var currentSlide = $(this).closest('.slick-slide').index();

				$('.basket-cl').slick('slickRemove', currentSlide);

				return false;
			});

			setTimeout(function () {
				$(".basket-order form").trigger('reset');
				$(".basket-form .basket-form__field").removeClass('not-empty');
			}, 300);

			$('.basket-order__valid').stop().fadeOut('fast');
		}

		return false;
	});

	$('.basket-addres__edit').on('click', function () {
		var th = $(this);
		var hiddenName = th.closest('.basket-addres').find('input.hidden-name').val();
		var hiddenPhone = th.closest('.basket-addres').find('input.hidden-phone').val();
		var hiddenStreet = th.closest('.basket-addres').find('input.hidden-street').val();
		var hiddenHouse = th.closest('.basket-addres').find('input.hidden-house').val();
		var hiddenRoom = th.closest('.basket-addres').find('input.hidden-room').val();
		var hiddenDoor = th.closest('.basket-addres').find('input.hidden-door').val();
		var hiddenFloor = th.closest('.basket-addres').find('input.hidden-floor').val();
		var fieldName = $('.basket-form input.field-name');
		var fieldPhone = $('.basket-form input.field-phone');
		var fieldStreet = $('.basket-form input.field-street');
		var fieldHouse = $('.basket-form input.field-house');
		var fieldRoom = $('.basket-form input.field-room');
		var fieldDoor = $('.basket-form input.field-door');
		var fieldFloor = $('.basket-form input.field-floor');

		var content = $('.basket-addres__text, .basket-addres__edit, .basket-addres__remove');
		var save = $('.basket-addres__save');
		var del = $('.basket-addres__delete');
		var contentThis = th.closest('.basket-addres').find('.basket-addres__text, .basket-addres__edit, .basket-addres__remove');
		var saveThis = th.closest('.basket-addres').find('.basket-addres__save');
		// var delThis = th.closest('.basket-addres').find('.basket-addres__delete');

		content.stop().fadeIn('fast');
		save.hide();
		del.hide();
		contentThis.hide();
		saveThis.stop().fadeIn('fast');
		// delThis.hide();

		fieldName.val(hiddenName);
		fieldPhone.val(hiddenPhone);
		fieldStreet.val(hiddenStreet);
		fieldHouse.val(hiddenHouse);
		fieldRoom.val(hiddenRoom);
		fieldDoor.val(hiddenDoor);
		fieldFloor.val(hiddenFloor);

		return false;
	});

	$('.basket-addres__save').on('click', function () {
		var th = $(this);
		var fieldName = $('.basket-form input.field-name').val();
		var fieldPhone = $('.basket-form input.field-phone').val();
		var fieldStreet = $('.basket-form input.field-street').val();
		var fieldHouse = $('.basket-form input.field-house').val();
		var fieldRoom = $('.basket-form input.field-room').val();
		var fieldDoor = $('.basket-form input.field-door').val();
		var fieldFloor = $('.basket-form input.field-floor').val();
		var hiddenName = th.closest('.basket-addres').find('input.hidden-name');
		var hiddenPhone = th.closest('.basket-addres').find('input.hidden-phone');
		var hiddenStreet = th.closest('.basket-addres').find('input.hidden-street');
		var hiddenHouse = th.closest('.basket-addres').find('input.hidden-house');
		var hiddenRoom = th.closest('.basket-addres').find('input.hidden-room');
		var hiddenDoor = th.closest('.basket-addres').find('input.hidden-door');
		var hiddenFloor = th.closest('.basket-addres').find('input.hidden-floor');
		var title = th.closest('.basket-addres').find('.basket-addres__text');
		var contentThis = th.closest('.basket-addres').find('.basket-addres__text, .basket-addres__edit, .basket-addres__remove');

		val = check_required_inputs();

		if (val == true) {

			$('.basket-order__valid').stop().fadeIn('fast');

		} else {

			th.hide();
			contentThis.stop().fadeIn();
			title.text(fieldStreet).append(' ' + fieldHouse);

			hiddenName.val(fieldName);
			hiddenPhone.val(fieldPhone);
			hiddenStreet.val(fieldStreet);
			hiddenHouse.val(fieldHouse);
			hiddenRoom.val(fieldRoom);
			hiddenDoor.val(fieldDoor);
			hiddenFloor.val(fieldFloor);

			setTimeout(function () {
				$(".basket-order form").trigger('reset');
				$(".basket-form .basket-form__field").removeClass('not-empty');
			}, 300);

			$('.basket-order__valid').stop().fadeOut('fast');

		}

		return false;
	});

	function check_required_inputs() {
		var fieldPhone = $('.basket-form input.field-phone').val();
		var fieldStreet = $('.basket-form input.field-street').val();
		var fieldHouse = $('.basket-form input.field-house').val();
		var fieldRoom = $('.basket-form input.field-room').val();

		if (fieldPhone == "" || fieldStreet == "" || fieldHouse == "" || fieldRoom == "") {
			return true
		} else {
			return false;
		}
	}

});

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
	$(".time-in").inputmask("99:99", { showMaskOnHover: false });
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
		val = $(this).val();
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
		link = $('.header-location__link');
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
		codeIn.fadeIn();

		return false;
	});

	$('.product-item__desc a').on('click', function () {
		var th = $(this);

		th.closest('.product-item').find('.product-item__desc a').removeClass('active');
		$(this).toggleClass('active');

	});

	const field = $('.basket-form__field_textarea');
	const fieldCash = $('.basket-form__field_cash');
	$(".basket-pay__item input:radio").change(function () {
		var th = $(this);
		var pay = th.closest('.basket-pay__item');

		if (pay.hasClass("basket-pay__item_cash")) {
			field.hide();
			fieldCash.fadeIn();
		} else {
			field.fadeIn();
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
				fieldCash.fadeIn();
			} else {
				field.fadeIn();
				fieldCash.hide();
			}
			return false;
		});
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
		inValue = th.parent().find('input');
		count = parseInt(inValue.val()) - 1;

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
		inValue = th.parent().find('input');
		count = parseInt(inValue.val()) - 1;

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

		if (!form.is(':checked')) {
			curier.stop().fadeOut();
		} else {
			curier.stop().fadeIn();
		}
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
	//Скрыть слайдер до инициализации
	$('.slider-main').on('init', function (slick) {
		$('.slider-main').show();
	});
	$('.slider-main').slick({
		// autoplay: true,
		// autoplaySpeed: 3000,
		fade: true,
		dots: true,
		arrows: false,
		infinite: true
	});


});
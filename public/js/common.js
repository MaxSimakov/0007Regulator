"use strict";

let div = document.createElement('div');
div.style.overflowY = 'scroll';
div.style.width = '50px';
div.style.height = '50px'; // мы должны вставить элемент в документ, иначе размеры будут равны 0

document.body.append(div);
let scrollWidth = div.offsetWidth - div.clientWidth;
let root = document.documentElement;
root.style.setProperty('--spacing-end', scrollWidth + 'px');
div.remove();
const JSCCommon = {
	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".menu-mobile--js"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),

	modalCall() {
		const link = ".link-modal-js";
		$(link).fancybox({
			arrows: false,
			infobar: false,
			touch: false,
			type: 'inline',
			autoFocus: false,
			i18n: {
				en: {
					CLOSE: "Закрыть",
					NEXT: "Вперед",
					PREV: "Назад" // PLAY_START: "Start slideshow",
					// PLAY_STOP: "Pause slideshow",
					// FULL_SCREEN: "Full screen",
					// THUMBS: "Thumbnails",
					// DOWNLOAD: "Download",
					// SHARE: "Share",
					// ZOOM: "Zoom"

				}
			} // beforeLoad: function () {
			// 	root.style.setProperty('--spacing-end', scrollWidth + 'px');
			// },
			// afterClose: function () {
			// 	root.style.setProperty('--spacing-end', null);
			// },

		});
		$(".modal-close-js").click(function () {
			$.fancybox.close();
		});
		$.fancybox.defaults.backFocus = false;
		const linkModal = document.querySelectorAll(link);

		function addData() {
			linkModal.forEach(element => {
				element.addEventListener('click', () => {
					let modal = document.querySelector(element.getAttribute("href"));
					const data = element.dataset;

					function setValue(val, elem) {
						if (elem && val) {
							const el = modal.querySelector(elem);
							el.tagName == "INPUT" ? el.value = val : el.innerHTML = val; // console.log(modal.querySelector(elem).tagName)
						}
					}

					setValue(data.title, '.form-wrap__title');
					setValue(data.text, '.after-headline');
					setValue(data.btn, '.btn');
					setValue(data.order, '.order');
				});
			});
		}

		if (linkModal) addData();
	},

	// /modalCall
	toggleMenu() {
		const toggle = this.btnToggleMenuMobile;
		const menu = this.menuMobile;
		document.addEventListener("click", function (event) {
			const toggleEv = event.target.closest(".toggle-menu-mobile--js");
			if (!toggleEv) return;
			toggle.forEach(el => el.classList.toggle("on"));
			menu.classList.toggle("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.toggle("fixed"));
		}, {
			passive: true
		});
	},

	closeMenu() {
		let menu = this.menuMobile;
		if (!menu) return;

		if (menu.classList.contains("active")) {
			this.btnToggleMenuMobile.forEach(element => element.classList.remove("on"));
			this.menuMobile.classList.remove("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.remove("fixed"));
		}
	},

	mobileMenu() {
		if (!this.menuMobileLink) return;
		this.toggleMenu();
		document.addEventListener('mouseup', event => {
			let container = event.target.closest(".menu-mobile--js.active"); // (1)

			let link = event.target.closest(".menu a"); // (1)

			if (link) this.closeMenu();
		}, {
			passive: true
		});
		window.addEventListener('resize', () => {
			if (window.matchMedia("(min-width: 992px)").matches) this.closeMenu();
		}, {
			passive: true
		});
	},

	// /mobileMenu
	// tabs  .
	tabscostume(tab) {
		$('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
			$(this).addClass('active').siblings().removeClass('active');
			let index = $(this).index();
			let content = this.closest('.' + tab).querySelectorAll('.' + tab + '__content'); //-console.log(content, content[index]);

			$(content).hide().removeClass('active');
			$(content[index]).fadeIn().addClass('active'); // $(this)
			// 	.addClass('active').siblings().removeClass('active')
			// 	.closest('.' + tab).find('.' + tab + '__content')
			// 	.eq($(this).index()).fadeIn().addClass('active')
			// 	.siblings().hide().removeClass('active');
		});
	},

	// /tabs
	inputMask() {
		// mask for input
		let InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(element => element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}"));
		Inputmask("+9(999)999-99-99").mask(InputTel);
	},

	// /inputMask
	heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01; // Then we set the value in the --vh custom property to the root of the document

		document.documentElement.style.setProperty('--vh', "".concat(vh, "px")); // We listen to the resize event

		window.addEventListener('resize', () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
		}, {
			passive: true
		});
	},

	animateScroll() {
		$(document).on('click', " .menu li a, .scroll-link", function () {
			const elementClick = $(this).attr("href");

			if (!document.querySelector(elementClick)) {
				$(this).attr("href", '/' + elementClick);
			} else {
				let destination = $(elementClick).offset().top;
				$('html, body').animate({
					scrollTop: destination - $(".header").height()
				}, 0);
				return false;
			}
		});
	},

	getCurrentYear(el) {
		let now = new Date();
		let currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear();
	},

	sendForm() {
		var gets = function () {
			var a = window.location.search;
			var b = new Object();
			var c;
			a = a.substring(1).split("&");

			for (var i = 0; i < a.length; i++) {
				c = a[i].split("=");
				b[c[0]] = c[1];
			}

			return b;
		}(); // form


		$(document).on('submit', "form", function (e) {
			e.preventDefault();
			const th = $(this);
			var data = th.serialize();
			th.find('.utm_source').val(decodeURIComponent(gets['utm_source'] || ''));
			th.find('.utm_term').val(decodeURIComponent(gets['utm_term'] || ''));
			th.find('.utm_medium').val(decodeURIComponent(gets['utm_medium'] || ''));
			th.find('.utm_campaign').val(decodeURIComponent(gets['utm_campaign'] || ''));
			$.ajax({
				url: 'action.php',
				type: 'POST',
				data: data
			}).done(function (data) {
				$.fancybox.close();
				$.fancybox.open({
					src: '#modal-thanks',
					type: 'inline'
				}); // window.location.replace("/thanks.html");

				setTimeout(function () {
					// Done Functions
					th.trigger("reset"); // $.magnificPopup.close();
					// ym(53383120, 'reachGoal', 'zakaz');
					// yaCounter55828534.reachGoal('zakaz');
				}, 4000);
			}).fail(function () {});
		});
	}

};
const $ = jQuery;

function eventHandler() {
	JSCCommon.modalCall();
	JSCCommon.tabscostume('tabs-main');
	JSCCommon.tabscostume('tabs-inner');
	JSCCommon.mobileMenu();
	JSCCommon.inputMask();
	JSCCommon.heightwindow();
	JSCCommon.animateScroll();
	JSCCommon.sendForm();
	JSCCommon.getCurrentYear('.year'); // JSCCommon.CustomInputFile(); 
	// var x = window.location.host;
	// let screenName;
	// screenName = document.body.dataset.bg;
	// if (screenName && x.includes("localhost:30")) {
	// 	document.body.insertAdjacentHTML("beforeend", `<div class="pixel-perfect" style="background-image: url(screen/${screenName});"></div>`);
	// }

	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true
		},
		watchOverflow: true,
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev'
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true // renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }

		}
	}; // const swiper4 = new Swiper('.sBanners__slider--js', {
	// 	// slidesPerView: 5,
	// 	...defaultSl,
	// 	slidesPerView: 'auto',
	// 	freeMode: true,
	// 	loopFillGroupWithBlank: true,
	// 	touchRatio: 0.2,
	// 	slideToClickedSlide: true,
	// 	freeModeMomentum: true,
	// });

	const headerSlider = new Swiper('.headerBlock__slider--js', {
		watchOverflow: true,
		spaceBetween: 0,
		loop: true,
		// navigation: {
		// 	nextEl: '.headerBlock .swiper-button-next',
		// 	prevEl: '.headerBlock .swiper-button-prev',
		// },
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true // renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }

		},
		slidesPerView: 1,
		// freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.7,
		slideToClickedSlide: true,
		autoplay: {
			delay: 3000
		}
	});
	$(".headerBlock__slider--js").mouseenter(function () {
		headerSlider.autoplay.stop();
	});
	$(".headerBlock__slider--js").mouseleave(function () {
		headerSlider.autoplay.start();
	});
	const sDocumetationSlider = new Swiper('.sDocumetation__slider--js', {
		// slidesPerView: 5,
		slidesPerView: 2,
		freeMode: true,
		loopFillGroupWithBlank: true,
		slideToClickedSlide: true,
		freeModeMomentum: true,
		spaceBetween: 12,
		breakpoints: {
			768: {
				slidesPerView: 3,
				spaceBetween: 24
			},
			992: {
				slidesPerView: 4,
				spaceBetween: 30
			}
		},
		pagination: {
			el: '.sDocumetation .swiper-pagination',
			type: 'bullets',
			clickable: true
		},
		navigation: {
			nextEl: '.sDocumetation .swiper-button-next',
			prevEl: '.sDocumetation .swiper-button-prev'
		}
	}); //luckyone js
	//.cTabs-js(=== .tabs)
	//.cTabs-btn-js(=== .tabs__btn)
	//.cTabs-content-group-js(=== .tabs__wrap)
	//.cTabs-content-js(=== .tabs__content)

	$('.cTabs-js').each(function () {
		let Btns = this.querySelectorAll('.cTabs-btn-js');
		let contentGroups = this.querySelectorAll('.cTabs-content-group-js');
		$(Btns).click(function () {
			$(Btns).removeClass('active');
			$(this).addClass('active'); //let index = $(this).index();

			let index = [...Btns].indexOf(this);
			$(contentGroups).each(function () {
				let contentItems = this.querySelectorAll('.cTabs-content-js');
				$(contentItems).removeClass('active');
				contentItems[index].classList.add('active');
			});
		});
	}); //

	function makeDDGroup() {
		let parents = document.querySelectorAll('.dd-group-js');

		for (let parent of parents) {
			if (parent) {
				// childHeads, kind of funny))
				let ChildHeads = parent.querySelectorAll('.dd-head-js:not(.disabled)');
				$(ChildHeads).click(function () {
					let clickedHead = this;
					$(ChildHeads).each(function () {
						if (this === clickedHead) {
							//parent element gain toggle class, style head change via parent
							$(this.parentElement).toggleClass('active');
							$(this.parentElement).find('.dd-content-js').slideToggle(function () {
								$(this).toggleClass('active');
							});
						} else {
							$(this.parentElement).removeClass('active');
							$(this.parentElement).find('.dd-content-js').slideUp(function () {
								$(this).removeClass('active');
							});
						}
					});
				});
			}
		}
	}

	makeDDGroup(); //
	// In this example, we must bind a 'change' event handler to
	// our checkboxes, then interact with the mixer via
	// its .filter() API methods.

	let mixItContainers = document.querySelectorAll('.mixit-cont-js');
	let mixItChbGroups = document.querySelectorAll('.mixit-chb-group-js'); //-

	for (let [index, container] of Object.entries(mixItContainers)) {
		let currentChbGroup = mixItChbGroups[index];
		let checkboxes = currentChbGroup.querySelectorAll('input[type="checkbox"]');
		let mixer = mixitup(container);
		currentChbGroup.addEventListener('change', function () {
			let selectors = []; // Iterate through all checkboxes, pushing the
			// values of those that are checked into an array

			for (let checkbox of checkboxes) {
				if (checkbox.checked) selectors.push(checkbox.value);
			} // If there are values in the array, join it into a string
			// using your desired logic, and send to the mixer's .filter()
			// method, otherwise filter by 'all'


			let selectorString = selectors.length > 0 ? selectors.join(',') : // or '.' for AND logic
			'all';
			mixer.filter(selectorString);
		});
	} //end luckyone js
	// var Sticky = new hcSticky('.header', {
	// 	stickTo: 'body'
	// });

}

;

if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
} // window.onload = function () {
// 	document.body.classList.add('loaded_hiding');
// 	window.setTimeout(function () {
// 		document.body.classList.add('loaded');
// 		document.body.classList.remove('loaded_hiding');
// 	}, 500);
// }
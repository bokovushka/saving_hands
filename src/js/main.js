import $ from 'jquery';

//webp
import * as functions from "./modules/functions.js";

functions.isWebp();

//height 

$(document).ready(function () {
	function setEqualHeight(columns) {
		var tallestcolumn = 0;
		columns.each(function () {
			var currentHeight = $(this).height();
			if (currentHeight > tallestcolumn) {
				tallestcolumn = currentHeight;
			}
		});
		columns.height(tallestcolumn);
	}
	$(document).ready(function () {
		setEqualHeight($(".how-work .heading"));
		setEqualHeight($(".courses-card-swiper .card-title"));
		setEqualHeight($(".latest-news-swiper .card-title"));
	});
});

// $(document).ready(function () {
// 	$.fn.equivalent = function () {
// 		var $blocks = $(this),
// 			maxH = $blocks.eq(0).height();

// 		$blocks.each(function () {
// 			maxH = ($(this).height() > maxH) ? $(this).height() : maxH;
// 		});
// 		$blocks.height(maxH);
// 	}
// 	$('.heading').equivalent();
// });


//pagination

// Returns an array of maxLength (or less) page numbers
// where a 0 in the returned array denotes a gap in the series.
// Parameters:
//   totalPages:     total number of pages
//   page:           current page
//   maxLength:      maximum size of returned array

function getPageList(totalPages, page, maxLength) {
	if (maxLength < 5) throw "maxLength must be at least 5";

	function range(start, end) {
		return Array.from(Array(end - start + 1), (_, i) => i + start);
	}

	var sideWidth = maxLength < 9 ? 1 : 2;
	var leftWidth = (maxLength - sideWidth * 2 - 3) >> 1;
	var rightWidth = (maxLength - sideWidth * 2 - 2) >> 1;
	if (totalPages <= maxLength) {
		// no breaks in list
		return range(1, totalPages);
	}
	if (page <= maxLength - sideWidth - 1 - rightWidth) {
		// no break on left of page
		return range(1, maxLength - sideWidth - 1)
			.concat([0])
			.concat(range(totalPages - sideWidth + 1, totalPages));
	}
	if (page >= totalPages - sideWidth - 1 - rightWidth) {
		// no break on right of page
		return range(1, sideWidth)
			.concat([0])
			.concat(
				range(totalPages - sideWidth - 1 - rightWidth - leftWidth, totalPages)
			);
	}
	// Breaks on both sides
	return range(1, sideWidth)
		.concat([0])
		.concat(range(page - leftWidth, page + rightWidth))
		.concat([0])
		.concat(range(totalPages - sideWidth + 1, totalPages));
}

$(function () {
	// Number of items and limits the number of items per page
	var numberOfItems = $("#jar .content").length;

	var w = screen.width;
	if (w < '768') {
		var limitPerPage = 3;
	} else
		if (w < '1200') {
			var limitPerPage = 4;
		}
		else {
			var limitPerPage = 6;
		}
	// Total pages rounded upwards
	var totalPages = Math.ceil(numberOfItems / limitPerPage);
	// Number of buttons at the top, not counting prev/next,
	// but including the dotted buttons.
	// Must be at least 5:
	var paginationSize = 7;
	var currentPage;

	function showPage(whichPage) {
		if (whichPage < 1 || whichPage > totalPages) return false;
		currentPage = whichPage;
		$("#jar .content")
			.hide()
			.slice((currentPage - 1) * limitPerPage, currentPage * limitPerPage)
			.show();
		// Replace the navigation items (not prev/next):
		$("#jar .pagination li").slice(1, -1).remove();
		getPageList(totalPages, currentPage, paginationSize).forEach(item => {
			$("<li>")
				.addClass(
					"page-item " +
					(item ? "current-page " : "") +
					(item === currentPage ? "active " : "")
				)
				.append(
					$("<a>")
						.addClass("page-link")
						.attr({
							href: "javascript:void(0)"
						})
						.text(item || "...")
				)
				.insertBefore("#next-page");
		});
		return true;
	}

	// Include the prev/next buttons:
	$("#jar .pagination").append(
		$("<li>").addClass("page-item").attr({ id: "previous-page" }).append(
			$("<a><svg><use xlink:href='img/icons/icons.svg#arrow-r'>")
				.addClass("page-link")
				.attr({
					href: "javascript:void(0)"
				})
			// .text("Prev")
		),
		$("<li>").addClass("page-item").attr({ id: "next-page" }).append(
			$("<a><svg><use xlink:href='img/icons/icons.svg#arrow-r'>")
				.addClass("page-link")
				.attr({
					href: "javascript:void(0)"
				})
			// .text("Next")
		)
	);
	// Show the page links
	$("#jar").show();
	showPage(1);

	// Use event delegation, as these items are recreated later
	$(
		document
	).on("click", "#jar .pagination li.current-page:not(.active)", function () {
		return showPage(+$(this).text());
	});
	$("#jar #next-page").on("click", function () {
		return showPage(currentPage + 1);
	});

	$("#jar #previous-page").on("click", function () {
		return showPage(currentPage - 1);
	});
	// $(".pagination").on("click", function () {
	// 	$("html,body").animate({ scrollTop: 0 }, 0);
	// });
});

//pagination blog

function getPageListBlog(totalPages, page, maxLength) {
	if (maxLength < 5) throw "maxLength must be at least 5";

	function range(start, end) {
		return Array.from(Array(end - start + 1), (_, i) => i + start);
	}

	var sideWidth = maxLength < 9 ? 1 : 2;
	var leftWidth = (maxLength - sideWidth * 2 - 3) >> 1;
	var rightWidth = (maxLength - sideWidth * 2 - 2) >> 1;
	if (totalPages <= maxLength) {
		// no breaks in list
		return range(1, totalPages);
	}
	if (page <= maxLength - sideWidth - 1 - rightWidth) {
		// no break on left of page
		return range(1, maxLength - sideWidth - 1)
			.concat([0])
			.concat(range(totalPages - sideWidth + 1, totalPages));
	}
	if (page >= totalPages - sideWidth - 1 - rightWidth) {
		// no break on right of page
		return range(1, sideWidth)
			.concat([0])
			.concat(
				range(totalPages - sideWidth - 1 - rightWidth - leftWidth, totalPages)
			);
	}
	// Breaks on both sides
	return range(1, sideWidth)
		.concat([0])
		.concat(range(page - leftWidth, page + rightWidth))
		.concat([0])
		.concat(range(totalPages - sideWidth + 1, totalPages));
}

$(function () {
	// Number of items and limits the number of items per page
	var numberOfItems = $("#jar-blog .content").length;

	var w = screen.width;
	if (w < '768') {
		var limitPerPage = 3;
	} else
		if (w < '1200') {
			var limitPerPage = 6;
		}
		else {
			var limitPerPage = 9;
		}
	// Total pages rounded upwards
	var totalPages = Math.ceil(numberOfItems / limitPerPage);
	// Number of buttons at the top, not counting prev/next,
	// but including the dotted buttons.
	// Must be at least 5:
	var paginationSize = 7;
	var currentPage;

	function showPage(whichPage) {
		if (whichPage < 1 || whichPage > totalPages) return false;
		currentPage = whichPage;
		$("#jar-blog .content")
			.hide()
			.slice((currentPage - 1) * limitPerPage, currentPage * limitPerPage)
			.show();
		// Replace the navigation items (not prev/next):
		$("#jar-blog .pagination li").slice(1, -1).remove();
		getPageListBlog(totalPages, currentPage, paginationSize).forEach(item => {
			$("<li>")
				.addClass(
					"page-item " +
					(item ? "current-page " : "") +
					(item === currentPage ? "active " : "")
				)
				.append(
					$("<a>")
						.addClass("page-link")
						.attr({
							href: "javascript:void(0)"
						})
						.text(item || "...")
				)
				.insertBefore("#next-page");
		});
		return true;
	}

	// Include the prev/next buttons:
	$("#jar-blog .pagination").append(
		$("<li>").addClass("page-item").attr({ id: "previous-page" }).append(
			$("<a><svg><use xlink:href='img/icons/icons.svg#arrow-r'>")
				.addClass("page-link")
				.attr({
					href: "javascript:void(0)"
				})
			// .text("Prev")
		),
		$("<li>").addClass("page-item").attr({ id: "next-page" }).append(
			$("<a><svg><use xlink:href='img/icons/icons.svg#arrow-r'>")
				.addClass("page-link")
				.attr({
					href: "javascript:void(0)"
				})
			// .text("Next")
		)
	);
	// Show the page links
	$("#jar-blog").show();
	showPage(1);

	// Use event delegation, as these items are recreated later
	$(
		document
	).on("click", "#jar-blog .pagination li.current-page:not(.active)", function () {
		return showPage(+$(this).text());
	});
	$("#jar-blog #next-page").on("click", function () {
		return showPage(currentPage + 1);
	});

	$("#jar-blog #previous-page").on("click", function () {
		return showPage(currentPage - 1);
	});
	// $(".pagination").on("click", function () {
	// 	$("html,body").animate({ scrollTop: 0 }, 0);
	// });
});

//input
document.querySelectorAll('.form-outline input').forEach(input => {
	const formlabeltop = input.closest('.form-outline');

	input.addEventListener('input', function () {
		if (input.value === '') {
			formlabeltop.classList.remove('form-outline-top');
		} else {
			formlabeltop.classList.add('form-outline-top');
		}
	});
});

//credit card mask
$('#cc').on('input propertychange paste', function () {
	var value = $('#cc').val();
	var formattedValue = formatCardNumber(value);
	$('#cc').val(formattedValue);
});

function formatCardNumber(value) {
	var value = value.replace(/\D/g, '');
	var formattedValue;
	var maxLength;
	// american express, 15 digits
	if ((/^3[47]\d{0,13}$/).test(value)) {
		formattedValue = value.replace(/(\d{4})/, '$1 ').replace(/(\d{4}) (\d{6})/, '$1 $2 ');
		maxLength = 17;
	} else if ((/^3(?:0[0-5]|[68]\d)\d{0,11}$/).test(value)) { // diner's club, 14 digits
		formattedValue = value.replace(/(\d{4})/, '$1 ').replace(/(\d{4}) (\d{6})/, '$1 $2 ');
		maxLength = 16;
	} else if ((/^\d{0,16}$/).test(value)) { // regular cc number, 16 digits
		formattedValue = value.replace(/(\d{4})/, '$1 ').replace(/(\d{4}) (\d{4})/, '$1 $2 ').replace(/(\d{4}) (\d{4}) (\d{4})/, '$1 $2 $3 ');
		maxLength = 19;
	}

	$('#cc').attr('maxlength', maxLength);
	return formattedValue;
}


//course lesson pages
//add class active to .card
const cardHeader = document.querySelectorAll('.accordion .card-header')
cardHeader.forEach(item => {
	item.addEventListener('click', (e) => {
		if (item.parentNode.classList.contains('active')) {
			item.parentNode.classList.remove('active');
		} else {
			cardHeader.forEach(el => { el.parentNode.classList.remove('active'); });
			item.parentNode.classList.add('active');
		}
	})
})

//add class active to .nav-item
const navlink = document.querySelectorAll('.accordion .nav-pills .nav-link')
navlink.forEach(item => {
	item.addEventListener('click', (e) => {
		navlink.forEach(el => { el.parentNode.classList.remove('active'); });
		item.parentNode.classList.add('active');

	})
})

//cookies modal
$(document).ready(function () {
	setTimeout(function () {
		$('#popup-cookies').click();
	}, 1000);
});

//second modal: example no-email ---> resend
$(".modal .btn-next-modal").click(function () {
	setTimeout(function () {
		$('body').addClass("modal-open");
	}, 350);

});

//timer save lesson
$(".btn-save-lesson").click(function () {
	var timeLeft = 10;
	function countdown() {
		timeLeft--;
		document.getElementById("seconds").innerHTML = String(timeLeft);
		if (timeLeft > 0) {
			setTimeout(countdown, 1000);
		}
		else {
			window.location.href = '../course.html';
		}
	};
	setTimeout(countdown, 0);
});

//redirect page click
$("#save-lesson .btn-primary").click(function () {
	window.location.href = '../course.html';
});

//test-not-passed
if ($(".complete-test__result").hasClass("test-not-passed")) {
	document.querySelector(".test-not-passed .score .h6").innerHTML = "Test not passed";
	document.querySelector(".test-not-passed .btn-primary").innerHTML = "Retake test";
}

//datepicker
$('.flatpickr-time').wrap('<div class="time-wrapper"/>');
$(".time-wrapper").append($('<p class="mb-0 mr-5">').text("Time"))

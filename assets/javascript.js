$("a").on('click', function(event) {
  $('html, body').animate({
    scrollTop: $( $.attr(this, 'href') ).offset().top
  }, 500);
  return false;
});
$(".tile img").on('click', function(event) {
	console.log("img clicked");
	$(this).siblings(".modal").addClass("is-active");
});
$("button.modal-close").on('click', function(event) {
	$(this).parent(".modal").removeClass("is-active");
});
$(".modal-background").on('click', function(event) {
	$(this).parent(".modal").removeClass("is-active");
});
$('body').keydown(function(e) {
    if (e.keyCode == 27) {
        $(".modal").removeClass("is-active");
    }
});
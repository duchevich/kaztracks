$(document).ready(function() {
	$(document).on("click",".anchor-link", function(event){
		event.preventDefault();
		var id = $(this).attr('href'),
			top = $(id).offset().top;
		$('body,html').animate({scrollTop: top}, 1000)
	});
})
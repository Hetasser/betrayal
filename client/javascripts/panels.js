$(".opener").click(function(){
  if(!$(this).closest(".drawer").hasClass("open")){
	  $(".drawer").removeClass("open");
  }
  $(this).closest(".drawer").toggleClass("open");
});
// init Masonry
$('.grid').masonry({
  // set itemSelector so .grid-sizer is not used in layout
  itemSelector: '.grid-item',
  // use element for option
  columnWidth: '.grid-sizer',
  percentPosition: true,
  gutter: '.gutter-sizer'
})

// navbar handling
$(".nav a").on("click", function(e){
  e.preventDefault();
  $('.main-content-item').each(function() {
    $(this).removeClass('show'); 
    $(this).addClass('hidden');
  });
  $($(e.target).attr('href')).removeClass('hidden').addClass('show');
  $(".nav").find(".active").removeClass("active");
  $(this).parent().addClass("active");
});
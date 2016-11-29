// init Masonry
$(".grid").masonry({
  // set itemSelector so .grid-sizer is not used in layout
  itemSelector: ".grid-item",
  // use element for option
  columnWidth: ".grid-sizer",
  percentPosition: true,
  gutter: ".gutter-sizer"
})

// navbar handling
$(".nav a").on("click", function(e){
  e.preventDefault();
  $(".main-content-item").each(function() {
    $(this).removeClass("show");
    $(this).addClass("hidden");
  });
  $($(e.target).attr("href")).removeClass("hidden").addClass("show");
  $(".nav").find(".active").removeClass("active");
  $(this).parent().addClass("active");
});

// build the publications
$(document).ready(function() {
  var $yearHeading = $("<div></div>", {
    "class": "panel-heading",
    "role": "tab",
    "id": "papers2015"
  }).append($("<h4></h4>", {
    "class": "my-caption panel-title"
  }).append($("<a></a>", {
    "role": "button",
    "data-toggle": "collapse",
    "data-parent": "#accordionLeft",
    "href": "#collapsePapers2015",
    "aria-expanded": "true",
    "aria-controls": "collapsePapers2015"
  }).text("2015")))
  var $aPaper = $("<div></div>", {
    "id": "collapsePapers2015",
    "class": "panel-collapse collapse in",
    "role": "tabpanel",
    "aria-labelledby": "Papers2015"
  }).append($("<div></div>", {
    "class": "panel-body"
  }).append($("<p></p>", {
    "class": "my-publication"
  }).text('Giuliani, M., Castelletti, A., Pianosi, F., Mason, E., and Reed, P. (2015). "Curses, Tradeoffs, and Scalable Management: Advancing Evolutionary Multiobjective Direct Policy Search to Improve Water Reservoir Operations."')
  .append(" <span>J. Water Resour. Plann. Manage.</span>, ")
  .append('<a href="http://ascelibrary.org/doi/abs/10.1061/%28ASCE%29WR.1943-5452.0000570" target="_blank">10.1061/(ASCE)WR.1943-5452.0000570</a>')
  ))

  $("#publ-journal").append($yearHeading)
  $("#publ-journal").append($aPaper)

})

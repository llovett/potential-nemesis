// setup canvas & container
$(document).ready(function(){
var canvas = $("<canvas></canvas>").attr({id:"demoCanvas"});
canvas.append("You need this: http://www.mozilla.org/en-US/firefox/all/");
$("div.canvas").append(canvas);
var contentSize = function (canvas, container) {
    // "fullscreen" the canvas element
    var cSize = { width: window.innerWidth, height: window.innerHeight };
    container.css({width: cSize.width+"px", height:cSize.height+"px"});
    canvas.attr(cSize); container.attr(cSize);
};
contentSize(canvas, $("div.container"));
// resize canvas & container when the window size changes
$(window).resize(function() {
    contentSize($("canvas"), $("div.canvas"));
});
});


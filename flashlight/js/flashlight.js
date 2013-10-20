$(document).ready(function() {
    // setup canvas & container
    var canvas = $("<canvas></canvas>").attr({id:"reveal"});
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

    // drawing contants
    var LIGHT_RADIUS_OUTER = 400;
    var LIGHT_RADIUS_INNER = 270;
    var SKEW_AMOUNT = 40;
    var ROTATE_AMOUNT = 90;
    var FLASHLIGHT_WIDTH = 505;
    var FLASHLIGHT_HEIGHT = 550;
    var easelInit = function() {
        // width and height of the canvas currently
        var cWidth = $("#reveal").width();
        var cHeight = $("#reveal").height();
        // position of the mouse, set in mouse handler
        var mouseX = 0; var mouseY = 0;
        
        // the stage where everything happens
        var stage = new createjs.Stage("reveal");
        // circle is the light that follows the mouse
        var circle = new createjs.Shape();
        circle
            .graphics
            .beginRadialGradientFill(["rgba(0,0,0,0)", "black"], [0, 1],
                                     0, 0, LIGHT_RADIUS_INNER,
                                     0, 0, LIGHT_RADIUS_OUTER)
            .arc(0, 0, LIGHT_RADIUS_OUTER, 0, Math.PI*2, false);
        stage.addChild(circle);
        // inverseCircle cancels out circle when the flashlight is off
        var inverseCircle = new createjs.Shape();
        inverseCircle
            .graphics
            .beginFill("black")
            .arc(0, 0, LIGHT_RADIUS_OUTER, 0, Math.PI*2, false);
        inverseCircle.visible = false;
        stage.addChild(inverseCircle);
        // background hides the page that is not within the circle
        var background = new createjs.Shape();
        background
            .graphics
            .beginFill("black")
            .drawRect(-10*cWidth, -10*cHeight, 20*cWidth, 20*cHeight)
            .arc(0, 0, LIGHT_RADIUS_OUTER - 1, 0, Math.PI*2, true);
        stage.addChild(background);
        // flashlight
        var flashlight = new createjs.Bitmap("img/flashlight.png");
        // put flashlight in the center initally
        flashlight
            .setTransform(cWidth/2, FLASHLIGHT_HEIGHT, 0.5, 0.5, 0, 0, 0, FLASHLIGHT_WIDTH/2);
        stage.addChild(flashlight);

        // register handler for mouse movement
        stage.addEventListener("stagemousemove", function(e) {
            mouseX = e.stageX;
            mouseY = e.stageY;
        });
        var toggleLight = function() {
            console.log( "toggle liehgt" );

            circle.visible = !circle.visible;
            inverseCircle.visible = !inverseCircle.visible;
            var img = document.createElement("img");
            if (circle.visible) {
                img.src = "img/flashlight.png";
            } else {
                img.src = "img/flashlight_off.png";
            }
            flashlight.image = img;
        };
        stage.addEventListener("click", toggleLight, true );
        
        // main update function
        var update = function() {
            // warp the "circle" to make it appear that it is projected onto the floor
            var centerDistanceX = (2*mouseX - cWidth)/cWidth; // -1 = left edge, 1 = right edge of screen
            // "mouseHeight" is either where the flashlight ends or where the mouse is, whichever is closer to the top
            var mouseHeight = Math.min(mouseY, cHeight-700);
            var bottomDistanceY = mouseHeight / cHeight-700;
            circle.setTransform(mouseX, mouseHeight, 1, 1, 0, centerDistanceX*SKEW_AMOUNT);
            inverseCircle.setTransform(mouseX, mouseHeight, 1, 1, 0, centerDistanceX*SKEW_AMOUNT);
            background.setTransform(mouseX, mouseHeight, 1, 1, 0, centerDistanceX*SKEW_AMOUNT);

            // rotate flashlight
            flashlight.setTransform(-centerDistanceX*FLASHLIGHT_HEIGHT + cWidth/2, FLASHLIGHT_HEIGHT, 0.5, 0.5,
                                    centerDistanceX*ROTATE_AMOUNT, 0, 0, FLASHLIGHT_WIDTH/2);
            stage.update();
        };

        // update at interval
        createjs.Ticker.addEventListener("tick", update);
    };

    // Start easel
    easelInit();
});

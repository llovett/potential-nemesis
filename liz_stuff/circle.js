/* Author: Liz Bennett
 * Date: 10 20 2013
 *
 * TODO:
 * -----
 *  -Cache fallen snow flakes to make program not lag
 *  -smaller snow flakes fall more slowly (make them look more distant)
 *  -snowflakes burst when you click on them
 *  -make inner circle more module, allow for any number of trailing circles
 */
(function() {
    var Circle = function(radius, color1, color2, speed, pulse, trailingCircles) {
	this.initialize(radius, color1, color2, speed, pulse, trailingCircles);
    };
    var c = Circle.prototype = new createjs.Container(); // inherit from Container

    c.count = 0; //for ticker handler
    c.radious = 30;
    c.innerRadius;
    c.color1 = "#0F0";
    c.color2 = "#F0F";
    c.speed = 3;
    c.pulse = 20;
    c.numTrailingCircles = 2;
    c.trailingCircles = new Array();

    c.Container_initialize = c.initialize;
    c.initialize = function(radius, color1, color2, speed, pulse, trailingCircles) {
	this.Container_initialize();

	if (radius != undefined) { 
	    this.radius = radius;
	}
	this.innerRadius = radius/2;

	if (color1 != undefined) { 
	    this.color1 = color1;
	}
	if (color2 != undefined) { 
	    this.color2 = color2;
	}
	if (speed != undefined) { 
	    this.speed = speed;
	}
	if (pulse != undefined) { 
	    this.pulse = pulse;
	}
	if (trailingCircles != undefined) { 
	    this.numTrailingCircles = trailingCircles;
	}

	this.outercircle = new createjs.Shape();
	this.outercircle
	    .graphics
	    .setStrokeStyle("5", "square")
	    .beginStroke(this.color1)
	    .beginFill(this.color2)
	    //.drawCircle(0,0,this.radius);
	    //.drawCircle(-90,0,this.radius);
	    .drawCircle(0,-90,this.radius);

	this.addChild(this.outercircle);

	var makeTrailingCircles = function() {
	    var curRadius = (3*this.radius)/4;
	    var curOffset = this.radius+curRadius+5; //5 pixels for buffer
	    var curStroke = 4;
	    for(var i = 0; i<this.numTrailingCircles; i++){
		this.circle = new createjs.Shape();
		this.circle
		    .graphics
		    .setStrokeStyle(curStroke, "square")
		    .beginStroke(this.color1)
		    .beginFill(this.color2)
		    .drawCircle(0,curOffset,curRadius);

		this.addChild(this.circle);
		this.trailingCircles.add(this.cirlc);

		oldRadius = curRadius;
		curRadius = (3*this.radius)/4;
		curOffset = oldRadius+curRadius+5;
		curStroke -= 1;
	    }
	};

	makeTrailingCircles();


	this.addEventListener("click", this.handleClick);  

    };

    c.pulseCircles = function(innerRadius) {
	var curCount = this.count;
        var curRadius = 1-Math.cos(this.count++*Math.PI/circle.pulse);
	for(var i = 0; i<this.numTrailingCircles; i++){
	    cirle = this.trailingCircles[i];
	    circle.scaleX = curRadius;
	    circle.scaleY = curRadius;
	    curCount+=5;
            curRadius = 1-Math.cos(circle.count++*Math.PI/circle.pulse);
	}
    };

    c.handleClick = function (event) {    
	var target = event.target;
	//alert("You clicked on a button: "+target.label);
	alert("Don't click on that!");
    };


    window.Circle = Circle;
}());

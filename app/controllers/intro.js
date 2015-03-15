/**
 * Movies
 * 
 * @copyright
 * Copyright (c) 2015 by Appcelerator, Inc. All Rights Reserved.
 *
 * @license
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 */

var _animateOutOnComplete = false;
var _animationComplete = false;
var _callback;

/**
 * Init, called on window open event
 */
function init() {
	
	$.window.removeEventListener('open', init);
	
	var animation1 = Ti.UI.createAnimation({
    	transform : Ti.UI.create2DMatrix({
        		rotate : -10
    	}),
    	curve : Ti.UI.ANIMATION_CURVE_EASE_IN,
    	duration : 1000
	});
	var animation2 = Ti.UI.createAnimation({
    	transform : Ti.UI.create2DMatrix({
        		rotate : 11.3
    	}),
    	duration : 200
	});

	animation.chainAnimate($.clapper_top_container, [animation1, animation2], function() {
    	_animationComplete = true;
    	(_animateOutOnComplete) ? animateOut() : $.activity_indicator.show();
	});
	
}

/**
 * Animate out content and callback
 */
function animateOut() {
	$.activity_indicator.hide();
	
	var animation = Ti.UI.createAnimation({
		transform: Ti.UI.create2DMatrix({scale: 0.7}),
		opacity: 0,
		duration: 1000
	});
	animation.addEventListener('complete', _callback);
	$.window.animate(animation);
}

/**
 * End intro once animation has completed
 * @param {Object} callback
 */
$.endIntro = function(callback) {
	_callback = callback;
	_animateOutOnComplete = true;
	if (_animationComplete) {
		animateOut();
	}
};


///////////////////////////////////////////////////////////////////////////////
//
// event handlers
//
///////////////////////////////////////////////////////////////////////////////

/**
 * window open
 */
$.window.addEventListener('open', init);

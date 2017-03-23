jQuery(document).ready(function($){
	//cache some jQuery objects
	var modalTrigger = $('.cd-modal-trigger'),
		transitionLayer = $('.cd-transition-layer'),
		transitionBackground = transitionLayer.children(),
		modalWindow = $('.cd-modal');

	var frameProportion = 1.78, //png frame aspect ratio
		frames = 25, //number of png frames
		resize = false;

	//set transitionBackground dimentions
	init();
	$(window).on('resize', function(){
		if( !resize ) {
			resize = true;
			(!window.requestAnimationFrame) ? setTimeout(init, 300) : window.requestAnimationFrame(init);
		}
	});

	//open modal window
	modalTrigger.on('click', function(event){	
		event.preventDefault();
		transitionLayer.addClass('visible opening');
		var delay = ( $('.no-cssanimations').length > 0 ) ? 0 : 600;
		setTimeout(function(){
			modalWindow.addClass('visible');
		}, delay);
	});

	//close modal window
	modalWindow.on('click', '.modal-close', function(event){
		event.preventDefault();
		transitionLayer.addClass('closing');
		modalWindow.removeClass('visible');
		transitionBackground.one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(){
			transitionLayer.removeClass('closing opening visible');
			transitionBackground.off('webkitAnimationEnd oanimationend msAnimationEnd animationend');
		});
	});

	function init() {
		var windowWidth = $(window).width(),
			windowHeight = $(window).height(),
			unitHeight, unitWidth;

		if( windowWidth/windowHeight > frameProportion ) {
			unitWidth = windowWidth;
			unitHeight = unitWidth/frameProportion;
		} else {
			unitHeight = windowHeight*1.2;
			unitWidth = unitHeight*frameProportion;
		}

		transitionBackground.css({
			'width': unitWidth*frames+'px',
			'height': unitHeight+'px',
		});

		resize = false;
	}
});
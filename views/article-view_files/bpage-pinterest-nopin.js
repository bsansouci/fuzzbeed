//mark all images not related to bpage as non-pinnable
window.pin_list = $$( '#buzz_sub_buzz img' );
window.nopin_run = function() {
	$$( 'img' ).filter(function( el ) {
		if ( el.style.display == 'none' || el.style.visibility == 'hidden' || el.getAttribute( 'nopin' ) != null || window.pin_list.indexOf( el ) != -1 ) return false;
		else return true;
	} ).each( function( el ){el.setAttribute('nopin','nopin')} );
	$$('meta[property="og:image"]').each(function(el){
		var src = el.getAttribute('content');
		if (window.pin_list && window.pin_list.filter( function(el){
			if (el.hasAttribute('rel:bf_image_src') && el.getAttribute('rel:bf_image_src').match(src) != null) return true; else return false;
		} ).length) {
			el.remove();
		}
	});
}
//run it as soon as we can
window.nopin_run();
//then again
document.observe( "dom:loaded", function() {
	window.nopin_run();
	//and again
	setTimeout( window.nopin_run, 2000 );
	//for new browsers
	initMutationObserver();

	function initMutationObserver() {
		var target = document.querySelector ? document.querySelector( '#responses' ) : $('responses');
		if (!target) return false;
		var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

		if(typeof MutationObserver != 'undefined'){ // CHECK FOR THE OBJECT, OLDER BROWSERS DON'T SUPPORT
			var observer = new MutationObserver( function( mutations ) {
				mutations.forEach( function( mutation ) {
					if ( mutation.addedNodes.length && mutation.addedNodes[0].select && mutation.addedNodes[0].select('img').length ) {
						mutation.addedNodes[0].select('img' ).each( function( el ){el.setAttribute('nopin','nopin')} )
					}
				} );
			} );

			var config = { childList: true, subtree: true };
			observer.observe( target, config );
		}
	}
} )
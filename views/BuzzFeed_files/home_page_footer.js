BuzzLoader.register( function() {

	var pageFeedPoller = new FeedPoller;
	pageFeedPoller.init();

	var user = new BF_User();
	var f_user_info = user.getUserInfo();
	if((f_user_info.p_admin && f_user_info.p_admin !== 'false') || ('acl' in window && acl.user_can('general_admin'))) {
		var inject = document.createElement( 'script' );
		inject.src = BF_STATIC.static_root + '/js/public/report/editor.js?version=' + BF_STATIC.version;
		console.log('loading editor js for admins %s', inject.src);
		document.getElementsByTagName( 'body' )[0].appendChild( inject );
	}

}, 1);

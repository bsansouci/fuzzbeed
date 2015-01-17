var BF_Front = (function(){

	var _sub_feeds = {}; 
	var page = 2;
	var current_tab = 'all';
	var feed_containers = [];
	var all_containers = [];
	
	var _init = function () {

		universal_dom.assign_handler({
			bucket: 'menu_tab',
			event: 'click',
			handler: handlers.tab_data
		})

		universal_dom.assign_handler({
			bucket: 'load_more',
			event: 'click',
			handler: handlers.load_more
		})

		// BF Metavertical Front Pages

		if ( $(BF_STATIC.hp_type + '_page_tabs') ) {
			if ( BF_STATIC.hp_type == 'life' ) {
				feed_containers = [$( BF_STATIC.hp_type + '-flow-container' )];
				all_containers = [$('all-container' )];
			}
			else if ( BF_STATIC.hp_type == 'videos' ) {
				feed_containers = [$( BF_STATIC.hp_type + '-flow-container' )];
				all_containers = [$('all-container' )];
			}            
			else {
				feed_containers = [$( BF_STATIC.hp_type + '-flow-container' )];
			}
			
			_sub_feeds['all'] = {};
			_sub_feeds['all'].containers = [];
			for ( var i = 0; i < feed_containers.length; i++ ) {
				_sub_feeds['all'].containers.push(feed_containers[i].innerHTML);
			};
		} 

		if(BF_STATIC.hp_type == 'videos'){
				if(window.innerWidth) handlers.embed_resize(window.innerWidth);

			Event.observe(window, 'resize', function(e){
				handlers.embed_resize(e.target.innerWidth);
			})
		}

	};

	var handlers = {

		tab_data : function(data){
			//clog('tab_data')

			// activate the right tab
			$$('#'+ BF_STATIC.hp_type +'_page_tabs a.tab-menu__tab--is-active').each(function(tab){ tab.removeClassName('tab-menu__tab--is-active'); });
			data.target.addClassName('tab-menu__tab--is-active');

			// Check if it's 'all' - this is a hack for keeping the ads on the all feed. 
			// Hide it instead of adding to sub_feeds - PC
			if(page != 2) page = 2;
			current_tab = data.tab;

			//re-enable the load_more button
			var button = universal_dom.get_bucket_elements('load_more')[0];
			if(button){
				button.removeClassName('disabled');
				button.removeClassName('hidden');
			}
			
			if(data.tab == 'all'){
				for ( var i = 0; i < feed_containers.length; i++ ) {
					feed_containers[i].addClassName('hidden');
					if (all_containers[i]) all_containers[i].removeClassName('hidden');
				};	
			}
			else if (data.tab != 'all'){
				for ( var i = 0; i < feed_containers.length; i++ ) {
					feed_containers[i].removeClassName('hidden');
					if (all_containers[i]) all_containers[i].addClassName('hidden');
				};

				// Check if we have a local copy of that tab's HTML
				if ( _sub_feeds[data.tab] ) {
						for ( var i = 0; i < feed_containers.length; i++ ) {
							feed_containers[i].update(_sub_feeds[data.tab].containers[i]);
						};
				}
				// else get it from the server
				else {
					var tab_url;
					if(BF_STATIC.hp_type == 'life') tab_url = BF_STATIC.web_root + '/life/' + data.tab + '?p=1&r=1&z=' + BF_STATIC.z;
					else if(BF_STATIC.hp_type == 'videos') tab_url = BF_STATIC.web_root + '/_video_playlist/' + data.tab;
					var onSuccess = function(c){
						// Save a version of that tab locally
						_sub_feeds[data.tab] = {};
						_sub_feeds[data.tab].containers = [];
						for ( var i = 0; i < feed_containers.length; i++ ) {
							_sub_feeds[data.tab].containers.push(feed_containers[i].innerHTML);
						};
						return;
					}
					// load new flow
					handlers.get_page({ url: tab_url, container: feed_containers[0], empty: true, onSuccess: onSuccess });
				}
			}
		},

		get_page: function (config) {
			var url = config.url,
				container = config.container,
				empty_container = config.empty,
				onSuccess = config.onSuccess,
				onFailure = config.onFailure,
				className = config.className;

			// in case you want to pass the class of the container instead of its id
			if ( config.containerClassName ) {
				container = $$('.'+ config.containerClassName).first();
			}
			//console.log(container);
			//console.log(config);
			new Ajax.Request( url, {
				method: 'get',
				onSuccess: function(transport) {
					try {
						// Append Elements
						var newPage = document.createElement('div');
						$(newPage).innerHTML = transport.responseText;

						if ( typeof empty_container != 'undefined' && empty_container == true ) {
							$(container).update('');
						}
						if (className) {
							$(container).addClassName(className);
						}

						$(newPage).childElements().each(function(el) {
							$(container).insert({bottom: el});
						});

						if (typeof onSuccess === "function") {
							onSuccess($(container));
						}

						if(page > 5){
							handlers.load_end();
						}

					} catch(e) {
						console.error(e);
					}
				},
				onFailure: function() {
					if (typeof onFailure === "function") {
						onFailure();
					}
				}
			});
		},

		load_more: function(e){
			//clog('load_more')
			var load_url;
			var container = $$('.flow-container ul').last();

			if (BF_STATIC.hp_type == 'life') {
				load_url = BF_STATIC.web_root + '/life/' + current_tab + '?p='+page+'&r=1&z=' + BF_STATIC.z;
				if ( current_tab == 'all' ) {
					container = $$('#all-container ul').last();
				};
			}
			else if (BF_STATIC.hp_type == 'videos' && current_tab == 'all'){
				load_url = BF_STATIC.web_root + '/'+ BF_STATIC.hp_type +'?p=' + page + '&z=' + BF_STATIC.z;
				if ( current_tab == 'all' ) {
					container = $$('#all-container ul').last();
				};
			}
			else if (BF_STATIC.hp_type == 'videos' && current_tab != 'all'){
				load_url = BF_STATIC.web_root + '/_video_playlist/' + current_tab + '/'+ page;
			}
			else if (BF_STATIC.hp_type == 'ukbuzz') {
				load_url = BF_STATIC.web_root + '/buzz' + '?country=uk' + '&p=' + page + '&z=' + BF_STATIC.z;
			}
			else if (BF_STATIC.hp_type == 'uknews') {
				load_url = BF_STATIC.web_root + '/news' + '?country=uk' + '&p=' + page + '&z=' + BF_STATIC.z;
			}
			else {
				load_url = BF_STATIC.web_root + '/'+ BF_STATIC.hp_type +'?p=' + page + '&z=' + BF_STATIC.z;
			}

			var onSuccess = function(){
				page = page + 1;
			}
			
			if (page <= 5) handlers.get_page({ url: load_url, container: container, empty: false, onSuccess: onSuccess, onFailure: handlers.load_end});
			else handlers.load_end();
		},

		load_end: function(){

			var button = universal_dom.get_bucket_elements('load_more')[0];

			if(button){
				//clog('disabled', page, button)
				button.addClassName('disabled');
				button.addClassName('hidden');
			}
		},

		embed_resize: function(width) {

			if(videopromo && typeof videopromo != undefined){
				var player = $('embed_' + videopromo.buzz_id);

				if(width >= 1125){
					player.width = 725;
					player.height = 442;
				}
				else if(width <= 1124){
					player.width = 652;
					player.height = 392;
				}

			}
		}
	};

	return {
		init: function () {
			try {
				_init();
			}
			catch (err) {
				console.error(err);
			}
		}
	};
}());


BuzzLoader.register(BF_Front.init,1);

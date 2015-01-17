var ClickStats = function() {

    /* filled in setup() below */
    var sample_size;
    var track_this_visit;

    /* tracked elements should have an attribute rel:[relName] and a class of [relName] */
    var relName = 'bf_cts';

    /*
	The rel:[relName] attribute should contain a ":"-delimited string with the following
	data points in these positions:
	
		class="[relName]" rel:[relName]="[groupid]:[slotpos]:[postcode]:[posttype]"
	
	For example
	
		class="post-item bf_cts" rel:bf_cts="1:2:132:buzz"

  */
    var pos = {
        groupid: 0,
        slotpos: 1,
        postcode: 2,
        posttype: 3
    };

    var tracked = [];
		
		var _click_handler = function(e) {
        try {
            if (!track_this_visit)
            {
                return false;
            }

            var el;

            if (typeof e['element'] == 'object')
            {
                el = e.element;
            }
            else if (typeof e['element'] == 'function')
            {
                el = e.element();
            } else if (e.target) {
                el = e.target;
            } else if (e.srcElement) {
                el = e.srcElement;
            }
            else if (e.currentTarget)
            {
                el = e.currentTarget;
            }

            // Only track links or images
            if (!el.tagName.toUpperCase().match(/^(A|IMG)$/))
            {
                return false;
            }

            var cts_el = el.up('.' + relName);
            if (cts_el && cts_el.getAttribute('rel:' + relName)) {
				
                var chunks = cts_el.getAttribute('rel:' + relName).split(':');
				
				// No need to console log when click occurs, simply look for: Resource interpreted as Image but transferred with MIME type text/javascript: "http://dev.buzzfeed.com/buzzfeed/_log_click?groupid=22&slotpos=1&postcode=1782778&posttype=buzz&_action=log_click&samplesize=1".
				// of pass ?debug=true
				// if (window.location.href.match(/dev.buzzfeed.com/) || window.location.href.match(/stage.buzzfeed.com/)) console.log('**************', chunks, relName, cts_el.getAttribute('rel:' + relName));

                if (chunks && chunks.length == 4)
                {
                    var params = {};

                    $H(pos).keys().each(function(pos_name) {
                        params[pos_name] = chunks[pos[pos_name]];
                    });

                    _send(params);
                }

            }


        } catch(e) {
            console.error(e);
        }
    };

    var _send = function(cts_data) {
        // This will send out the click.
        cts_data['_action'] = 'log_click';
        cts_data['samplesize'] = sample_size;
        var query = $H(cts_data).toQueryString();

        var img = new Image();
        img.src = '/buzzfeed/_log_click?' + query;

        tracked.push(img);
    };

    var show_lower_menu = function ( ) {

        document.body.insert( new Element( 'div', { id: 'cts_loading' } ) );
        var curentCountry = BF_STATIC.country;
        var switchCountryHtml = ''
        if(curentCountry && BF_STATIC.tt_page == 'Home') {
            var switchTo = curentCountry == 'uk' ? 'us' : 'uk';
            switchCountryHtml = '<div class="switch-country-wrap"><span class="country-indicator country-' + curentCountry + '"></span><span class="country-text">' + curentCountry.toUpperCase() + ' Homepage</span>';
            if ( curentCountry != 'uk' ) {
              switchCountryHtml = switchCountryHtml + '<a href="/?country=uk" class="switch-country">Switch to UK</a>';
            }
            if ( curentCountry != 'us' ) {
              switchCountryHtml = switchCountryHtml + '<a href="/?country=us" class="switch-country">Switch to US</a>';
            }
            if ( curentCountry != 'au' ) {
              switchCountryHtml = switchCountryHtml + '<a href="/?country=au" class="switch-country">Switch to Australia</a>';
            }
            switchCountryHtml = switchCountryHtml + '</div>';
        }
        var overlayHTML = switchCountryHtml + '\
            <img id="cts_loading_spinner" src="' + BF_STATIC.static_root + '/images/public/spinners/loading.gif?v=201501161526" />\
            <a href="javascript:document.body.addClassName(\'cts_hidden\');">&times; Hide Tools</a> \
            <a href="http://www.buzzfeed.com/dashboard/buzzfeed">Dashboard</a> \
            <a href="http://www.buzzfeed.com/buzzfeed/leaderboard">Leaderboard</a> \
        ';
        $('cts_loading').update( overlayHTML );

    }

    return {
        force_tracking: function() {
            track_this_visit = true;
        },
        tracking_pixels: function() {
            return tracked;
        },
		rel: function() {
			return relName;
		},
				click_handler_test : function(e){_click_handler(e);},//function for jasmine tracking_libraries.js test
        getRandomInt : function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        setup: function() {
            if (document.location.search.match(/debug/))
            {
                sample_size = 1;
                track_this_visit = true;
            }
            else
            {
                if (BF_STATIC.page && BF_STATIC.page == 'VerticalFront') {
                    sample_size = 5;
                } else if (BF_STATIC.front_page_click_sample) {
                    sample_size = BF_STATIC.front_page_click_sample;
                } else {
                    sample_size = 1
                }
                /* pick a number btw 1 and sample_size, and compare to 1 */
                var rand = ClickStats.getRandomInt(1,sample_size);
                track_this_visit = (rand == 1);
                // console.log(sample_size,rand,track_this_visit);
            }

            Event.observe(document.body, 'mousedown', _click_handler, this);

            var user = new BF_User();
            if ( acl.user_can('general_admin') ) // document.location.search.match(/clickstats/) &&
            {
                show_lower_menu();
				document.body.addClassName('cts_visible');
				BF_XSS.swift_injection( BF_STATIC.static_root + '/js/ext/clickstats_overlay.js?v=201501161526&z=' + Math.random() );
            }
        }

    };

} ();
BuzzLoader.register(ClickStats.setup, 9);

var HeaderBuzz = function(){
	this.header_buzz = $A();
	this.page_one_buzz = $A();
	this.page_quantity = 8;
	this.start_buzz = 0; //only for onearrow stripe
	this.current_page = 1;
	this.clicktrack = false;
	this.page_buzzid;
	this.is_video;
	this.in_progress = 0;

	this.attach_click_handlers = function(){
		universal_dom.assign_handler({bucket:'abtrack',event:'mousedown',handler:this.click_handler});
	}.bind(this);

	this.click_handler = function( event ){return;}.bind(this);

	this.draw_next = function( wide ) {
		if (this.start_buzz >= this.header_buzz.length - this.page_quantity) {
			$('hothead-scripted').hide();
			$('hothead-unscripted').show();
			this.start_buzz = 0;
			return;
		}
		else if ( this.start_buzz == 0 && $$('#hothead-unscripted .unit').length == 8 ) {
			this.start_buzz = 1;
		}
		this.start_buzz += wide;
		var buzzes = this.header_buzz.slice( this.start_buzz, this.start_buzz + this.page_quantity );
		this.make_page(buzzes);
		this.start_buzz += this.page_quantity - 2;
	}.bind(this);

	this.make_page = function(buzzes) {
		var html = $A('');

		var slot = 0;
		for( var i = 0; i < buzzes.length; i++ ){
			if ( typeof page_buzzid != 'undefined' && buzzes[i].campaignid == page_buzzid ) { continue; }
			if(!buzzes[i].badge_type) buzzes[i].no_badge = 'no-badge';

			if (buzzes[i].form == 'link' && buzzes[i].link_buzz != null) {
				buzzes[i].gt_label = 'external/' + buzzes[i].link_buzz.match(/:\/\/(www\.)?(.[^/:]+)/)[2];
			}
			else {
				if (buzzes[i].login_type == 'terminal') {buzzes[i].gt_label = 'editor/' + buzzes[i].username;}
				else {buzzes[i].gt_label = 'user/' + buzzes[i].username;}
			}

			slot++;
			var buzz_str = this.buzz_template.evaluate({ buzz: buzzes[i], slot: slot });
			html.push( buzz_str );
		}

		$('hothead-unscripted').hide();
		$('hothead-scripted').innerHTML = html.join('');
		$('hothead-scripted').show();
		universal_dom.update($('hothead-scripted'));
		/* $$('#new-header-hot-nav .unit').each(function(el){
			el.observe('mouseover', header.fix_length);
		}) */
	}

	this.init = function(){
		var nextone_link = this.nextone_link();
		if( nextone_link ) nextone_link.observe( 'click', this.nextone_handler );
 
		// Avoid showing current b-page buzz in header strip
		$$('meta').each(function(el,i){
			if ( el.readAttribute('property') == 'bf:buzzid' ) {
				page_buzzid = el.readAttribute('content');
				this.page_one_buzz.unshift(page_buzzid);
				var hidden = 9;
				$$('.HotHead .unit').each(function(unit,j){
					if ( unit.hasClassName('c'+page_buzzid) && !unit.hasClassName('thumb' + hidden) ) {
						$$('.HotHead div.unit.thumb' + hidden).each(function(eight,k){
							var marginLeft = (j >= 7) ? 0 : '10px';
							$(eight).setStyle({ 'display':'block', 'margin-left': marginLeft });
						});
						unit.parentNode.removeChild(unit);
						throw $break;
					}
				});
				throw $break;
			}
		}.bind( this ));
	};

	this.nextone_handler = function( event ){
		if ( event ) event.stop();

		if ( this.in_progress == 1 ) {
			return;
		}
		else if ( this.header_buzz.length == 0 ) {
			this.load_header_buzz();
		}
		else {
			var hothead = $$('#hothead .unit');
			var wide = ( BF_STATIC.tt_page == 'Home' && hothead[8] && hothead[8].getStyle('display') == 'block' ) ? 1 : 0;
			this.draw_next(wide);
		}
	}.bind( this );

	this.nextone_link = function(){
		return $('header_buzz_nextone');
	};

	this.load_header_buzz = function(){
		this.in_progress = 1;
		var ajax = new BF_Request();

		var country = 'us';
		if (typeof BFW_Util == 'object') {
			country = (BFW_Util.getCookie("country") != null && BFW_Util.getCookie("country") != 'us' ? BFW_Util.getCookie("country") : 'us');
		}

		var url =  BF_STATIC.web_root + '/_headerstrip/';
		if (this.is_video) { url += 'video/'; }
		else if ( country == 'uk' || country == 'au' ) { url += country + '/'; }
		url += this.page_one_buzz.join(',') + '.js';

		ajax.request(url, {
			method: 'get',
			onSuccess: function(e) {
				var res = e.responseText.evalJSON();
				if ( res.success ) {
					this.header_buzz = $A( res.buzzes );
					this.in_progress = 0;
					this.nextone_handler();
				}
			}.bind(this)
		});
	}.bind(this);

	this.set_page_one_buzz = function( json ){
		this.page_one_buzz = $A( json );
	};
};

load_header_buzz();
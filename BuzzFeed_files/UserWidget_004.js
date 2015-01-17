
var BF_S3_IMAGE_URL='http://s3.amazonaws.com/buzzfeed-media/bigstory/';var BF_W=function(){var buzz_count=((typeof(BF_BUZZ_COUNT)!='undefined')?BF_BUZZ_COUNT:1);var small_image=((typeof(BF_SMALL_IMAGE)!='undefined')?BF_SMALL_IMAGE:false);var image_width=((typeof(BF_SMALL_IMAGE)!='undefined'&&BF_SMALL_IMAGE)?90:125);var image_height=((typeof(BF_SMALL_IMAGE)!='undefined'&&BF_SMALL_IMAGE)?60:83);var head_foot_ids=['bf-powered1','bf-powered2','bf-footer','bf-header'];var apply_styles=function(element,key){if(typeof(bf_styles)!='undefined'){if(bf_styles[key]){for(var style_key in bf_styles[key]){var value=bf_styles[key][style_key];var eval_string="element.style."+style_key+"='"+value+"'";eval(eval_string);}}}};var randomize=function buzz(buzz_data){var bindexes=new Array();for(var i=0;i<buzz_data.length;i++){bindexes.push(i);}
function randOrd(){return(Math.round(Math.random())-0.5);}
bindexes.sort(randOrd);bindexes.sort(randOrd);var random_buzz=new Array();for(i=0;i<buzz_data.length;i++){if(!window.BF_NO_DUPES[buzz_data[bindexes[i]].bid]){random_buzz.push(buzz_data[bindexes[i]]);}}
if(random_buzz.length==0&&buzz_data[0]){random_buzz.push(buzz_data[0]);}
return random_buzz;};var element_handlers={'bf-url':function(el,buzz,wid,click_track_fn){var buzz_url=buzz['user_link']?buzz['user_link']:buzz['url'];el.href=buzz_url;el.setAttribute('href',buzz_url);if(typeof(el.addEventListener)=='undefined'){el.attachEvent('onmousedown',function(e){click_track_fn(el,buzz,wid);});}else{el.addEventListener('mousedown',function(e){click_track_fn(el,buzz,wid);},true);}
if(el.getAttribute('rel:gt_label')&&el.getAttribute('rel:gt_label')=='partner'&&(1==10||1==15)){el.setAttribute('rel:gt_label','partner/'+buzz.username);}},'bf-name':function(el,name){var truncate=el.getAttribute("rel:bf_truncate");if(truncate){if(!isNaN(truncate)){var truncate=parseInt(truncate);if(name.length>truncate){var terminator=el.getAttribute("rel:bf_truncate_terminator");term_length=terminator?terminator.length:3;terminator=terminator?terminator:'&hellip;';var name_length=truncate-term_length;name=name.substring(0,name_length);var words=name.split(/\s+/);if(words[words.length-1].match(/&/)&&!words[words.length-1].match(/;$/)){words.pop();}
name=words.join(' ');name+=terminator;}}}
el.innerHTML=name;},'bf-image':function(el,image){el.src=image;el.width=image_width;el.height=image_height;},'bf-image-big':function(el,buzz){if(/\-[12]\-\d+\-\d+\-\d+\.(png|gif|jpg)/.test(buzz.image))
{big_image=buzz.image;el.src=big_image.toString().replace(/\.(png|gif|jpg)/,'_big.$1');el.className+=' campaign-big-thumb';}else{el.src=buzz.image;}},'bf-image-dblbig':function(el,buzz){if(/\-2\-\d+\-\d+\-\d+\.(png|gif|jpg)/.test(buzz.image))
{big_image=buzz.image;el.src=big_image.toString().replace(/\.(png|gif|jpg)/,'_dblbig.$1');el.className+=' campaign-big-thumb';}else{el.src=buzz.image;}},'bf-mobile-image':function(el,buzz){if(buzz&&buzz.mobile_image){big_image=buzz.image;el.src=big_image.toString().replace(/\/([^\/]+)\.(png|gif|jpg)$/,'/m-$1_big.$2');el.className+=' campaign-big-thumb';}else if(/\-[12]\-\d+\-\d+\-\d+\.(png|gif|jpg)/.test(buzz.image)){big_image=buzz.image;el.src=big_image.toString().replace(/\.(png|gif|jpg)/,'_big.$1');el.className+=' campaign-big-thumb';}else{el.src=buzz.image;}},'bf-impressions-label':function(el,text){el.innerHTML=text},'bf-impressions':function(el,impressions){if(impressions<100){impressions='';}
el.innerHTML=impressions;},'bf-blurb':function(el,buzz){el.innerHTML=buzz.ad_blurb;},'bf-byline_prefix':function(el,byline_prefix,BF_DATA){if(typeof BF_DATA['network']!='undefined'&&BF_DATA['network']=='buzzfeed'){if(byline_prefix){el.innerHTML=byline_prefix;}}},'bf-user_image':function(el,name){el.src=name;},'bf-user_image_large':function(el,name){var extIndex=name.lastIndexOf('.');if(extIndex>=0){name=name.substr(0,extIndex)+"_large"+name.substr(extIndex,name.length);}
el.src=name;},'bf-user-url':function(el,href){el.href=href;el.setAttribute('href',href);},'bf-partner-label':function(el,buzz){if(typeof(political_ad)!='undefined'&&buzz.username=='obamaforamerica'){el.innerHTML='PAID POLITICAL ADVERTISER';}},'bf-display_name':function(el,text){el.innerHTML=text;},'bf-image-bigstory':function(el,buzz){el.src=buzz.image;if(/\-[12]\-\d+\-\d+\-\d+\.(png|gif|jpg)/.test(buzz.image))
{el.src=el.src.replace(/\.(png|gif|jpg)/,'_wide.$1');el.width=300;el.height=106;el.className+=' campaign-wide-thumb';}},'bf-image-dblwidestory':function(el,buzz){el.src=buzz.image;if(/\-2\-\d+\-\d+\-\d+\.(png|gif|jpg)/.test(buzz.image))
{el.src=el.src.replace(/\.(png|gif|jpg)/,'_dblwide.$1');el.width=625;el.height=220;el.className+=' campaign-wide-thumb';}},'bf-image-dblbigstory':function(el,buzz){el.src=buzz.image;{el.src=el.src.replace(/\.(png|gif|jpg)/,'_dblbig.$1');el.width=625;el.height=415;el.className+=' campaign-wide-thumb';}},'bf-image-widestory':function(el,buzz,BF_DATA){el.src=buzz.image;if(/\-[12]\-\d+\-\d+\-\d+\.(png|gif|jpg)/.test(buzz.image))
{el.src=el.src.replace(/\.(png|gif|jpg)/,'_wide.$1');el.width=338;el.height=119;el.className+=' campaign-wide-thumb';}},'bf-ad-frame':function(el,BF_DATA){var base_path=(typeof window['BF_FAKE_DFP']=='undefined')?'http://ad.doubleclick.net/N6556/adi':'http://dev.buzzfeed.com/bf2/_fake_dfp';var full_path=base_path+'/bfd.widget/'+BF_DATA.site+';site='+BF_DATA.site+';sz=3x3;ord='+(new Date()).getTime();if(typeof window['BF_WIDGET_PREVIEW']!='undefined'&&typeof window['BF_FAKE_DFP']!='undefined')
{full_path+='?load_preview=1';}
el.src=full_path;},'bf-byline-other':function(el,buzz){if(buzz.byline_description_visual&&buzz.byline_description_visual!='Brand Publisher'){el.innerHTML=buzz.byline_description_visual;}}};var parse_template=function(BF_DATA,click_track_fn){var data=BF_DATA.buzz;var wid=BF_DATA.wid;if(typeof(window.BF_NO_DUPES)=='undefined'){window.BF_NO_DUPES={}}
var optimize=false;if(optimize){var bfo=new BF_WIDGET_OPTIMIZE();if(optimize===1){data=bfo.optimize1(data);}else if(optimize===2){data=bfo.optimize2(data);}else if(optimize===3){data=bfo.optimize3(data);}else if(optimize===4){data=bfo.optimize4(data);}}else{data=randomize(data);}
window['BF_DISPLAYED_BUZZ']=[];try{for(var i=0;i<buzz_count;i++){var buzz=data[i];if(typeof buzz['promotions']!='undefined')
{pick_promotion(buzz);}
if(buzz_count==1&&buzz['ad_video_url']){var videoSrc=buzz['ad_video_url'];dfp_video.detect_type(videoSrc);dfpAdEL=$('bf-item-'+wid+'-1');if(window.special_video)dfpAdEL.up().addClassName('political-ad');dfpAdEL.addClassName('video-ad-unit');var dfpAncestors=dfpAdEL.ancestors();if(dfpAncestors[1]&&$(dfpAncestors[1]).hasClassName('std-posts')){dfpAdEL.addClassName('story-ad-unit');var dfp_vid_width,dfp_vid_height;if(!ie8){dfp_vid_width=(wid==13?'316':'560');dfp_vid_height=(wid==13?'209':'368');}
else if(ie8){dfp_vid_width=(wid==13?'316':'465');dfp_vid_height=(wid==13?'209':'309');}
videoDimensions={width:dfp_vid_width,height:dfp_vid_height}}else if(dfpAncestors[5]&&$(dfpAncestors[5]).hasClassName('BuzzPage')){dfpAdEL.addClassName('bpage-ad-unit');videoDimensions={width:(wid==13?'316':'560'),height:(wid==13?'209':'368')}}
if(!$('video-wid-'+wid)){if(wid==13){dfpAdEL.select('.big-meta')[0].insert({'before':BF_DATA.video_ad_markup});if(dfpAdEL.select('.bf-url')[0])dfpAdEL.select('.bf-url')[0].hide();if(dfpAdEL.select('.description')[0])dfpAdEL.select('.description')[0].hide();}
else{dfpAdEL.select('.bf-item-title')[0].insert({'after':BF_DATA.video_ad_markup});if(dfpAdEL.select('.thumb-unit')[0])dfpAdEL.select('.thumb-unit')[0].hide();dfpAdEL.addClassName('ad-template-story');dfpAdEL.up('li').addClassName('ad-video-post');}}
dfpAdVidReactions=dfpAdEL.select('.badge_list')[0];dfpAdPreviewEL=dfpAdEL.select('.video-preview')[0];if(ie7){if(dfpAdVidReactions)dfpAdVidReactions.hide();dfpAdPreviewEL.remove();var destination=dfpAdEL.select('.video-content')[0];$(dfpAdEL).fire("video:dfp",{src:dfp_video.src_link,wid:1,dfp:true});var so=BF_initSwfObject(dfp_video.src_link,{width:videoDimensions.width,height:videoDimensions.height,autoplay:1,hideYouTubeInfo:1});so.write(destination);if(vidTrackPixelIMG)vidTrackPixelIMG.src=vidTrackRedirect+vidTrackPixelSRC;}else{var vidThumbEL=dfpAdEL.select('.vid-preview-img')[0],thumbIMG=dfp_video.img0||dfp_video.thumbnail;vidThumbEL.setAttribute('src',thumbIMG);vidThumbEL.setAttribute('width','100%');if(dfp_video.thumbnail)dfpAdVidReactions.addClassName('dfp-bf-margin')
dfpAdVideoEL=$('video-wid-'+wid);if(!dfpAdVideoEL.addEventListener){dfpAdVideoEL.attachEvent("onclick",swapInDFPVideo);}else{dfpAdVideoEL.addEventListener('click',swapInDFPVideo);}}}
window.BF_NO_DUPES[buzz.bid]=true;window['BF_DISPLAYED_BUZZ'].push(buzz);item_id=wid?('bf-item-'+wid+'-'+(i+1)):('bf-item-'+(i+1));var item_element=document.getElementById(item_id);if(!item_element){item_element=document.getElementById('bf-item-'+(i+1));}
if(!item_element){break;}
if(item_element.nodeName==='A'&&(item_element.className.search(/bf-url/)>=0)){element_handlers['bf-url'](item_element,buzz,wid,click_track_fn);}
if(typeof buzz.user_type!='undefined'){item_element.className+=" "+buzz.user_type;}
else{item_element.className+=" f_ad";}
var elements=item_element.getElementsByTagName("*");var view_count=0;for(var j=0;j<elements.length;j++){var element=elements[j];var class_string=element.className;if(class_string){var classes=class_string.split(/\s+/);if(classes&&classes[0]){for(var k=0;k<classes.length;k++){var key=classes[k].replace(/^bf\-/,'');apply_styles(element,key);if(element_handlers[classes[k]]){if(key=='impressions-label'){if(buzz['impressions']<100){element_handlers[classes[k]](element,'New Buzz');}}else if(key=='user-url'){element_handlers[classes[k]](element,'http://www.buzzfeed.com/'+buzz['username']);}else if(key=='url'){element_handlers[classes[k]](element,buzz,wid,click_track_fn);}else if(key=='ad-frame'){element_handlers[classes[k]](element,BF_DATA);}else if(key=='image-bigstory'){element_handlers[classes[k]](element,buzz);}else if(key=='image-widestory'){element_handlers[classes[k]](element,buzz);}else if(key=='image-big'){element_handlers[classes[k]](element,buzz);}else if(key=='user_image_large'){element_handlers[classes[k]](element,buzz['user_image']);}else if(key=='byline_prefix'){if(buzz[key]&&buzz[key]!=""){element_handlers[classes[k]](element,buzz[key],BF_DATA);}}else if(key=='partner-label'){element_handlers[classes[k]](element,buzz);}else if(key=='mobile-image'){element_handlers[classes[k]](element,buzz);}else if(key=='byline-other'){element_handlers[classes[k]](element,buzz);}else if(key=='blurb'){element_handlers[classes[k]](element,buzz);}else{element_handlers[classes[k]](element,buzz[key],item_element,buzz);}}}}}}
var sibling=document.getElementById('BF_WIDGET_'+wid).previousElementSibling;if(sibling&&window['BF_STATIC']!='undefined'&&typeof BF_STATIC['tt_page']!='undefined'){if(wid==10||BF_STATIC.tt_page=='MobileHome'){document.getElementById('div-gpt-ad-'+wid).style.top=sibling.offsetTop+'px';document.getElementById('div-gpt-ad-'+wid).style.left=(sibling.offsetLeft+sibling.offsetWidth)+'px';}
else{document.getElementById('div-gpt-ad-'+wid).style.top=(sibling.offsetTop+sibling.offsetHeight)+'px';document.getElementById('div-gpt-ad-'+wid).style.left=sibling.offsetLeft+'px';}}}}catch(e){console.error(e);}};var pick_promotion=function(buzz){var sel_promo;if(buzz.promotions.length==1)
{sel_promo=buzz.promotions[0];}
else
{var promotions=buzz.promotions;var opts=[];for(var i=0;i<promotions.length;i++)
for(var j=0;j<(promotions[i].probability*100);j++)
opts.push(promotions[i]);sel_promo=opts[Math.floor(Math.random()*opts.length)];}
if(typeof sel_promo=='undefined'){sel_promo=buzz.promotions[0];}
buzz.image=sel_promo.image;buzz.name=sel_promo.title;buzz.blurb=sel_promo.description;buzz.flex_pro_id=sel_promo.id;return buzz;};var render_template=function(template,wid,show_ad){template=template.replace(/\n|\r/g,'NL');var items_regex=/<!\-\-\s+\.bf\-item\s+\-\->(.*)<!\-\-\s+\/\.bf\-item \-\->/;var item_markup_match=template.match(items_regex);var item_markup=item_markup_match[1];var items_markup='';var ad_slot=Math.floor(Math.random()*(buzz_count))+1;if(show_ad&&parent.window['BF_AD_FIXED_POS']){fixed_ad_pos=parent.window['BF_AD_FIXED_POS'];if(fixed_ad_pos>0&&parent.window['BF_AD_FIXED_POS']<=buzz_count){ad_slot=BF_AD_FIXED_POS}}
for(var i=1;i<=buzz_count;i++){var id_append=wid?(wid+'-'+i):i;var id_markup=item_markup;if(show_ad&&i==ad_slot)
{var matches=item_markup.match(/(.*<div (id="" )?class="bf-item[^>]+>)(.*)<\/div>/);id_markup=item_markup.replace(matches[3],'<iframe width="100%" frameborder="0" scrolling="no" class="bf-ad-frame"></iframe>');id_markup=id_markup.replace(/class="bf-item/,'class="bf-item bf-framed-item');}
id_markup=id_markup.replace(/<div (id="" )?class="bf-item/,'<div id="bf-item-'+id_append+'" class="bf-item')+"\n";if(i==1){var first_markup=id_markup;items_markup+=first_markup.replace(/class="bf-item"/,'class="bf-item bf-first"')+"\n";}else if(i==buzz_count){var last_markup=id_markup;items_markup+=last_markup.replace(/class="bf-item"/,'class="bf-item bf-last"')+"\n";}else{items_markup+=id_markup;}}
template=template.replace(items_regex,items_markup);template=template.replace(/NL/g,'\n');return template;};return{last_widget:false,record_pixel:function(track_url)
{if(window['BF_STATIC']!='undefined'&&typeof BF_STATIC['bf_env']!='undefined'&&BF_STATIC.bf_env.match(/^dev|^stage/)==null){if(typeof window['BF_PIXELS']=='undefined'){window['BF_PIXELS']=[];}
var timage=new Image();timage.src=track_url;window['BF_PIXELS'].push(timage);}
else{console.log('Tracked Url: '+track_url);}},show_widget:function(BF_DATA,click_track_fn){BF_W.last_widget=BF_DATA;if(typeof(BF_W.loaded_template)=='undefined')
BF_W.loaded_template=BF_DATA.template;if(typeof(BF_BUZZ_COUNTS)!='undefined'&&BF_BUZZ_COUNTS[BF_DATA.wid]){buzz_count=BF_BUZZ_COUNTS[BF_DATA.wid];}
if(BF_DATA.buzz.length<buzz_count){buzz_count=BF_DATA.buzz.length;if(buzz_count>9){buzz_count=9;}}
var main_id='BF_WIDGET_'+BF_DATA.wid;main_div=document.getElementById(main_id);if(main_div.getAttribute('rel:bf_ad_position'))
{BF_DATA.position_id=parseInt(main_div.getAttribute('rel:bf_ad_position'));}
var widget_markup='';if(BF_DATA.css){var ss1=document.createElement('style');var def=BF_DATA.css;ss1.setAttribute("type","text/css");if(ss1.styleSheet){ss1.styleSheet.cssText=def;}else{var tt1=document.createTextNode(def);ss1.appendChild(tt1);}
var hh1=document.getElementsByTagName('head')[0];hh1.appendChild(ss1);}
if(BF_DATA.template){wid=null;if(typeof(BF_BUZZ_COUNTS)!='undefined'&&BF_BUZZ_COUNTS[BF_DATA.wid]){wid=BF_DATA.wid;}
widget_markup+=render_template(BF_DATA.template,wid,(BF_DATA.show_ad==1&&!BF_DATA.no_shell));}
wid=null;if(typeof(BF_BUZZ_COUNTS)!='undefined'&&BF_BUZZ_COUNTS[BF_DATA.wid]){wid=BF_DATA.wid;}
if(widget_markup){main_div.innerHTML=widget_markup;}
parse_template(BF_DATA,click_track_fn);if(typeof(bf_styles)!='undefined'){for(var i=0;i<head_foot_ids.length;i++){var key=head_foot_ids[i].replace(/^bf\-/,'');if(bf_styles[key]){var el=document.getElementById(head_foot_ids[i]);if(!el){continue;}
for(var style_key in bf_styles[key]){var value=bf_styles[key][style_key];var eval_string="el.style."+style_key+"='"+value+"'";eval(eval_string);}}}}
if(main_div.className.indexOf('bf-inline-display-ad')!=-1){main_div.style.display='inline-block';}else{main_div.style.display='block';}}};}();(function(){try{var BF_DATA={
   "wid" : "1",
   "userbuzz_count" : 10,
   "network" : "buzzfeed",
   "loaded" : "true",
   "buzz" : [
      {
         "bid" : "7EWTJW7",
         "user_type" : "f_other",
         "form" : "super",
         "user" : "rachelzarrell",
         "url" : "http://www.buzzfeed.com/rachelzarrell/alpha-chi-omega-sorority-email-says-wear-spanx",
         "comments_count" : 22,
         "last_updated" : "2015-01-16 21:19:38",
         "images" : "",
         "uid" : "73WCJI7",
         "sub_buzz" : "",
         "name" : "Leaked USC Sorority Email Insists Members Wear Spanx, Bans Wavy Hair And Dark Roots",
         "uri" : "alpha-chi-omega-sorority-email-says-wear-spanx",
         "cloud_servers" : [
            "newbuzz-collection-1925855828.us-east-1.elb.amazonaws.com"
         ],
         "username" : "rachelzarrell",
         "published" : "2015-01-16 13:03:31",
         "published_unix" : "1421431411",
         "ad_blurb" : "<b>\"I know 'full' eyebrows are in style right now, but 'full' does not mean 'BUSHY' or 'WILD.'\"</b>",
         "nsfw" : "false",
         "status" : "live",
         "ct" : "http://75.101.183.223/small.gif?type=100,14&user=rachelzarrell&buzz=alpha-chi-omega-sorority-email-says-wear-spanx&c=7EWTJW7&u=73WCJI7&url=http%3A%2F%2Fbuzzfeed.com%2Frachelzarrell%2Falpha-chi-omega-sorority-email-says-wear-spanx%2F&rd=http%3A%2F%2Fbuzzfeed.com%2Frachelzarrell%2Falpha-chi-omega-sorority-email-says-wear-spanx%2F",
         "impressions" : "848943",
         "mobile_image" : "1",
         "user_image" : "http://s3-ak.buzzfed.com/static/2014-10/8/16/user_images/webdr07/rachelzarrell-22656-1412801193-17.jpg",
         "blurb" : "&quot;I know &#39;full&#39; eyebrows are in style right now, but &#39;full&#39; does not mean &#39;BUSHY&#39; or &#39;WILD.&#39;&quot;",
         "promotions" : [
            {
               "width" : "125",
               "extra_fields" : {
                  "small" : {
                     "width" : 615,
                     "left" : 163,
                     "top" : 269,
                     "height" : 408
                  },
                  "big" : {
                     "width" : 960,
                     "left" : 0,
                     "top" : 140,
                     "height" : 637
                  },
                  "wide" : {
                     "width" : 960,
                     "left" : 0,
                     "top" : 311,
                     "height" : 338
                  }
               },
               "image_dblwide" : "/static/2015-01/16/13/campaign_images/webdr03/alpha-chi-omega-sorority-email-says-wear-spanx-2-2656-1421431737-15_dblwide.jpg",
               "clicks" : "11331",
               "dud" : "0",
               "added" : "2015-01-16 13:08:58",
               "campaign_id" : "3577981",
               "rate" : 0.0114136232184786,
               "impressions" : "992761",
               "image_id" : "125150",
               "original_image_width" : "960",
               "promoter" : "935435",
               "updated" : "2015-01-16 21:12:38",
               "id" : "176111",
               "image_dblbig" : "/static/2015-01/16/13/campaign_images/webdr03/alpha-chi-omega-sorority-email-says-wear-spanx-2-2656-1421431737-15_dblbig.jpg",
               "is_default" : "0",
               "promotion_image_id" : "125150",
               "sub_buzz_id" : "4693738",
               "image_big" : "/static/2015-01/16/13/campaign_images/webdr03/alpha-chi-omega-sorority-email-says-wear-spanx-2-2656-1421431737-15_big.jpg",
               "probability" : 0.37218016500066,
               "active" : "1",
               "original_image_height" : "960",
               "height" : "83",
               "description" : "<b>\"I know 'full' eyebrows are in style right now, but 'full' does not mean 'BUSHY' or 'WILD.'\"</b>",
               "image" : "http://s3-ak.buzzfeed.com/static/2015-01/16/13/campaign_images/webdr03/alpha-chi-omega-sorority-email-says-wear-spanx-2-2656-1421431737-15.jpg",
               "old" : "0",
               "promotion_medium_id" : "1",
               "flexpro_recipients" : "",
               "title" : "Leaked Sorority Email Insists Members Wear Spanx, Bans Wavy Hair And Dark Roots",
               "image_wide" : "/static/2015-01/16/13/campaign_images/webdr03/alpha-chi-omega-sorority-email-says-wear-spanx-2-2656-1421431737-15_wide.jpg",
               "original_image" : ""
            },
            {
               "width" : "125",
               "extra_fields" : {
                  "small" : {
                     "width" : 615,
                     "left" : 163,
                     "top" : 269,
                     "height" : 408
                  },
                  "big" : {
                     "width" : 960,
                     "left" : 0,
                     "top" : 140,
                     "height" : 637
                  },
                  "wide" : {
                     "width" : 960,
                     "left" : 0,
                     "top" : 311,
                     "height" : 338
                  }
               },
               "image_dblwide" : "/static/2015-01/16/13/campaign_images/webdr03/alpha-chi-omega-sorority-email-says-wear-spanx-2-2656-1421431737-15_dblwide.jpg",
               "clicks" : "6383",
               "dud" : "0",
               "added" : "2015-01-16 13:08:58",
               "campaign_id" : "3577981",
               "rate" : 0.0109610259369161,
               "impressions" : "582336",
               "image_id" : "125150",
               "original_image_width" : "960",
               "promoter" : "935435",
               "updated" : "2015-01-16 21:08:39",
               "id" : "176102",
               "image_dblbig" : "/static/2015-01/16/13/campaign_images/webdr03/alpha-chi-omega-sorority-email-says-wear-spanx-2-2656-1421431737-15_dblbig.jpg",
               "is_default" : "0",
               "promotion_image_id" : "125150",
               "sub_buzz_id" : "4693738",
               "image_big" : "/static/2015-01/16/13/campaign_images/webdr03/alpha-chi-omega-sorority-email-says-wear-spanx-2-2656-1421431737-15_big.jpg",
               "probability" : 0.202846878821961,
               "active" : "1",
               "original_image_height" : "960",
               "height" : "83",
               "description" : "<b>\"I know 'full' eyebrows are in style right now, but 'full' does not mean 'BUSHY' or 'WILD.'\"</b>",
               "image" : "http://s3-ak.buzzfeed.com/static/2015-01/16/13/campaign_images/webdr03/alpha-chi-omega-sorority-email-says-wear-spanx-2-2656-1421431737-15.jpg",
               "old" : "0",
               "promotion_medium_id" : "1",
               "flexpro_recipients" : "",
               "title" : "USC Sorority Requires Members To Wear Spanx, Bans Wavy Hair And Dark Roots",
               "image_wide" : "/static/2015-01/16/13/campaign_images/webdr03/alpha-chi-omega-sorority-email-says-wear-spanx-2-2656-1421431737-15_wide.jpg",
               "original_image" : ""
            },
            {
               "width" : "125",
               "extra_fields" : {
                  "small" : {
                     "width" : 615,
                     "left" : 163,
                     "top" : 269,
                     "height" : 408
                  },
                  "big" : {
                     "width" : 960,
                     "left" : 0,
                     "top" : 140,
                     "height" : 637
                  },
                  "wide" : {
                     "width" : 960,
                     "left" : 0,
                     "top" : 311,
                     "height" : 338
                  }
               },
               "image_dblwide" : "/static/2015-01/16/13/campaign_images/webdr03/alpha-chi-omega-sorority-email-says-wear-spanx-2-2656-1421431737-15_dblwide.jpg",
               "clicks" : "7150",
               "dud" : "0",
               "added" : "2015-01-16 13:08:58",
               "campaign_id" : "3577981",
               "rate" : 0.0109742021831755,
               "impressions" : "651528",
               "image_id" : "125150",
               "original_image_width" : "960",
               "promoter" : "935435",
               "updated" : "2015-01-16 21:15:37",
               "id" : "176108",
               "image_dblbig" : "/static/2015-01/16/13/campaign_images/webdr03/alpha-chi-omega-sorority-email-says-wear-spanx-2-2656-1421431737-15_dblbig.jpg",
               "is_default" : "0",
               "promotion_image_id" : "125150",
               "sub_buzz_id" : "4693738",
               "image_big" : "/static/2015-01/16/13/campaign_images/webdr03/alpha-chi-omega-sorority-email-says-wear-spanx-2-2656-1421431737-15_big.jpg",
               "probability" : 0.206535450258455,
               "active" : "1",
               "original_image_height" : "960",
               "height" : "83",
               "description" : "<b>\"I know 'full' eyebrows are in style right now, but 'full' does not mean 'BUSHY' or 'WILD.'\"</b>",
               "image" : "http://s3-ak.buzzfeed.com/static/2015-01/16/13/campaign_images/webdr03/alpha-chi-omega-sorority-email-says-wear-spanx-2-2656-1421431737-15.jpg",
               "old" : "0",
               "promotion_medium_id" : "1",
               "flexpro_recipients" : "",
               "title" : "USC Sorority Bans Wavy Hair, Requires Members To Wear Spanx",
               "image_wide" : "/static/2015-01/16/13/campaign_images/webdr03/alpha-chi-omega-sorority-email-says-wear-spanx-2-2656-1421431737-15_wide.jpg",
               "original_image" : ""
            },
            {
               "width" : "125",
               "extra_fields" : {
                  "small" : {
                     "width" : 615,
                     "left" : 163,
                     "top" : 269,
                     "height" : 408
                  },
                  "big" : {
                     "width" : 960,
                     "left" : 0,
                     "top" : 140,
                     "height" : 637
                  },
                  "wide" : {
                     "width" : 960,
                     "left" : 0,
                     "top" : 311,
                     "height" : 338
                  }
               },
               "image_dblwide" : "/static/2015-01/16/13/campaign_images/webdr03/alpha-chi-omega-sorority-email-says-wear-spanx-2-2656-1421431737-15_dblwide.jpg",
               "clicks" : "7620",
               "dud" : "0",
               "added" : "2015-01-16 13:08:58",
               "campaign_id" : "3577981",
               "rate" : 0.0110152695922182,
               "impressions" : "691767",
               "image_id" : "125150",
               "original_image_width" : "960",
               "promoter" : "935435",
               "updated" : "2015-01-16 21:16:06",
               "id" : "176105",
               "image_dblbig" : "/static/2015-01/16/13/campaign_images/webdr03/alpha-chi-omega-sorority-email-says-wear-spanx-2-2656-1421431737-15_dblbig.jpg",
               "is_default" : "1",
               "promotion_image_id" : "125150",
               "sub_buzz_id" : "4693738",
               "image_big" : "/static/2015-01/16/13/campaign_images/webdr03/alpha-chi-omega-sorority-email-says-wear-spanx-2-2656-1421431737-15_big.jpg",
               "probability" : 0.218437505918923,
               "active" : "1",
               "original_image_height" : "960",
               "height" : "83",
               "description" : "<b>\"I know 'full' eyebrows are in style right now, but 'full' does not mean 'BUSHY' or 'WILD.'\"</b>",
               "image" : "http://s3-ak.buzzfeed.com/static/2015-01/16/13/campaign_images/webdr03/alpha-chi-omega-sorority-email-says-wear-spanx-2-2656-1421431737-15.jpg",
               "old" : "0",
               "promotion_medium_id" : "1",
               "flexpro_recipients" : "",
               "title" : "Leaked USC Sorority Email Insists Members Wear Spanx, Bans Wavy Hair And Dark Roots",
               "image_wide" : "/static/2015-01/16/13/campaign_images/webdr03/alpha-chi-omega-sorority-email-says-wear-spanx-2-2656-1421431737-15_wide.jpg",
               "original_image" : ""
            }
         ],
         "byline_description_visual" : "BuzzFeed News Reporter",
         "display_name" : "Rachel Zarrell",
         "image" : "http://s3-ak.buzzfed.com/static/2015-01/16/15/campaign_images/webdr11/leaked-usc-sorority-email-insists-members-wear-sp-2-18164-1421441780-0.jpg",
         "byline_description_id" : "2",
         "static_images" : {
            "small" : "http://s3-static-ak.buzzfed.com/static/2015-01/16/15/campaign_images/webdr11/leaked-usc-sorority-email-insists-members-wear-sp-2-18164-1421441780-0_small.jpg",
            "standard" : "http://s3-static-ak.buzzfed.com/static/2015-01/16/15/campaign_images/webdr11/leaked-usc-sorority-email-insists-members-wear-sp-2-18164-1421441780-0.jpg",
            "big" : "http://s3-static-ak.buzzfed.com/static/2015-01/16/15/campaign_images/webdr11/leaked-usc-sorority-email-insists-members-wear-sp-2-18164-1421441780-0_big.jpg",
            "wide" : "http://s3-static-ak.buzzfed.com/static/2015-01/16/15/campaign_images/webdr11/leaked-usc-sorority-email-insists-members-wear-sp-2-18164-1421441780-0_wide.jpg",
            "dblbig" : "http://s3-static-ak.buzzfed.com/static/2015-01/16/15/campaign_images/webdr11/leaked-usc-sorority-email-insists-members-wear-sp-2-18164-1421441780-0_dblbig.jpg",
            "dblwide" : "http://s3-static-ak.buzzfed.com/static/2015-01/16/15/campaign_images/webdr11/leaked-usc-sorority-email-insists-members-wear-sp-2-18164-1421441780-0_dblwide.jpg"
         },
         "image_small" : "http://s3-ak.buzzfed.com/static/2015-01/16/15/campaign_images/webdr11/leaked-usc-sorority-email-insists-members-wear-sp-2-18164-1421441780-0_small.jpg",
         "html_blurb" : "<b><big>Leaked USC Sorority Email Insists Members Wear Spanx, Bans Wavy Hair And Dark Roots</big></b><br/><b>\"I know 'full' eyebrows are in style right now, but 'full' does not mean 'BUSHY' or 'WILD.'\"</b><br/><table><tr><td width='30' padding='0 0'><img src='http://s3-ak.buzzfed.com/static/2014-10/8/16/user_images/webdr07/rachelzarrell-22656-1412801193-17.jpg' width='25' height='25'/></td><td padding='5' pspacing='0'><small><b><a href='/rachelzarrell'>Rachel Zarrell</a></b></small><br/><small><color value='#939393'>BuzzFeed News Reporter</color></small></td></tr></table>"
      },
      {
         "bid" : "7EWU1S7",
         "user_type" : "f_other",
         "status" : "live",
         "form" : "super-image",
         "ct" : "http://75.101.183.223/small.gif?type=100,14&user=mjs538&buzz=facts-about-the-woman-with-the-largest-augmented-breasts&c=7EWU1S7&u=72KY7&url=http%3A%2F%2Fbuzzfeed.com%2Fmjs538%2Ffacts-about-the-woman-with-the-largest-augmented-breasts%2F&rd=http%3A%2F%2Fbuzzfeed.com%2Fmjs538%2Ffacts-about-the-woman-with-the-largest-augmented-breasts%2F",
         "impressions" : "519429",
         "mobile_image" : "1",
         "user" : "mjs538",
         "url" : "http://www.buzzfeed.com/mjs538/facts-about-the-woman-with-the-largest-augmented-breasts",
         "comments_count" : 48,
         "user_image" : "http://s3-ak.buzzfed.com/static/user_images/webdr05/2013/7/12/10/mjs538-19190-1373639876-2.jpg",
         "blurb" : "Introducing Beshine. NSFW obviously.",
         "last_updated" : "2015-01-16 17:48:58",
         "images" : "",
         "uid" : "72KY7",
         "sub_buzz" : "",
         "byline_description_visual" : "BuzzFeed Staff",
         "name" : "26 Truly Interesting Facts About The Woman With The Largest Augmented Breasts",
         "display_name" : "Matt Stopera",
         "uri" : "facts-about-the-woman-with-the-largest-augmented-breasts",
         "byline_description_id" : "2",
         "cloud_servers" : [
            "newbuzz-collection-1925855828.us-east-1.elb.amazonaws.com"
         ],
         "image" : "http://s3-ak.buzzfed.com/static/2015-01/16/15/campaign_images/webdr05/26-truly-interesting-facts-about-the-woman-with-t-2-26393-1421441100-13.jpg",
         "username" : "mjs538",
         "static_images" : {
            "small" : "http://s3-static-ak.buzzfed.com/static/2015-01/16/15/campaign_images/webdr05/26-truly-interesting-facts-about-the-woman-with-t-2-26393-1421441100-13_small.jpg",
            "standard" : "http://s3-static-ak.buzzfed.com/static/2015-01/16/15/campaign_images/webdr05/26-truly-interesting-facts-about-the-woman-with-t-2-26393-1421441100-13.jpg",
            "big" : "http://s3-static-ak.buzzfed.com/static/2015-01/16/15/campaign_images/webdr05/26-truly-interesting-facts-about-the-woman-with-t-2-26393-1421441100-13_big.jpg",
            "wide" : "http://s3-static-ak.buzzfed.com/static/2015-01/16/15/campaign_images/webdr05/26-truly-interesting-facts-about-the-woman-with-t-2-26393-1421441100-13_wide.jpg",
            "dblbig" : "http://s3-static-ak.buzzfed.com/static/2015-01/16/15/campaign_images/webdr05/26-truly-interesting-facts-about-the-woman-with-t-2-26393-1421441100-13_dblbig.jpg",
            "dblwide" : "http://s3-static-ak.buzzfed.com/static/2015-01/16/15/campaign_images/webdr05/26-truly-interesting-facts-about-the-woman-with-t-2-26393-1421441100-13_dblwide.jpg"
         },
         "published" : "2015-01-16 14:06:24",
         "published_unix" : "1421435184",
         "ad_blurb" : "<b>Introducing Beshine.</b> NSFW obviously.",
         "image_small" : "http://s3-ak.buzzfed.com/static/2015-01/16/15/campaign_images/webdr05/26-truly-interesting-facts-about-the-woman-with-t-2-26393-1421441100-13_small.jpg",
         "nsfw" : "true",
         "html_blurb" : "<b><big>26 Truly Interesting Facts About The Woman With The Largest Augmented Breasts</big></b><br/><b>Introducing Beshine.</b> NSFW obviously.<br/><table><tr><td width='30' padding='0 0'><img src='http://s3-ak.buzzfed.com/static/user_images/webdr05/2013/7/12/10/mjs538-19190-1373639876-2.jpg' width='25' height='25'/></td><td padding='5' pspacing='0'><small><b><a href='/mjs538'>Matt Stopera</a></b></small><br/><small><color value='#939393'>BuzzFeed Staff</color></small></td></tr></table>"
      },
      {
         "bid" : "7EWRB07",
         "user_type" : "f_other",
         "form" : "super",
         "user" : "alanwhite",
         "url" : "http://www.buzzfeed.com/alanwhite/this-woman-is-posting-vintage-magazine-clippings-that-show-j",
         "comments_count" : 3,
         "last_updated" : "2015-01-16 21:16:24",
         "images" : "",
         "uid" : "74A1ZD7",
         "sub_buzz" : "",
         "name" : "This Woman Is Posting Vintage Magazine Clippings That Show Just How Sexist The World Used To Be",
         "uri" : "this-woman-is-posting-vintage-magazine-clippings-that-show-j",
         "cloud_servers" : [
            "newbuzz-collection-1925855828.us-east-1.elb.amazonaws.com"
         ],
         "username" : "alanwhite",
         "published" : "2015-01-16 07:49:14",
         "published_unix" : "1421412554",
         "ad_blurb" : "<b>The past is a strange, strange place.</b>",
         "nsfw" : "false",
         "status" : "live",
         "ct" : "http://75.101.183.223/small.gif?type=100,14&user=alanwhite&buzz=this-woman-is-posting-vintage-magazine-clippings-that-show-j&c=7EWRB07&u=74A1ZD7&url=http%3A%2F%2Fbuzzfeed.com%2Falanwhite%2Fthis-woman-is-posting-vintage-magazine-clippings-that-show-j%2F&rd=http%3A%2F%2Fbuzzfeed.com%2Falanwhite%2Fthis-woman-is-posting-vintage-magazine-clippings-that-show-j%2F",
         "impressions" : "236555",
         "mobile_image" : "1",
         "user_image" : "http://s3-ak.buzzfed.com/static/2013-11/user_images/webdr02/18/5/alanwhite-21476-1384769332-13.jpg",
         "blurb" : "The past is a strange, strange place.",
         "promotions" : [
            {
               "width" : "125",
               "extra_fields" : {
                  "small" : {
                     "width" : 1024,
                     "left" : 0,
                     "top" : 0,
                     "height" : 679
                  },
                  "big" : {
                     "width" : 1024,
                     "left" : 0,
                     "top" : 0,
                     "height" : 679
                  },
                  "wide" : {
                     "width" : 1024,
                     "left" : 0,
                     "top" : 5,
                     "height" : 360
                  }
               },
               "image_dblwide" : "/static/2015-01/16/7/campaign_images/webdr09/this-woman-is-posting-vintage-magazine-clippings--2-3218-1421412650-5_dblwide.jpg",
               "clicks" : "4622",
               "dud" : "0",
               "added" : "2015-01-16 07:50:51",
               "campaign_id" : "3577565",
               "rate" : 0.00634770654423549,
               "impressions" : "728137",
               "image_id" : "125012",
               "original_image_width" : "1024",
               "promoter" : "1026792",
               "updated" : "2015-01-16 21:16:24",
               "id" : "175895",
               "image_dblbig" : "/static/2015-01/16/7/campaign_images/webdr09/this-woman-is-posting-vintage-magazine-clippings--2-3218-1421412650-5_dblbig.jpg",
               "is_default" : "0",
               "promotion_image_id" : "125012",
               "sub_buzz_id" : "4691233",
               "image_big" : "/static/2015-01/16/7/campaign_images/webdr09/this-woman-is-posting-vintage-magazine-clippings--2-3218-1421412650-5_big.jpg",
               "probability" : 0.371555346210543,
               "active" : "1",
               "original_image_height" : "1525",
               "height" : "83",
               "description" : "<b>The past is a strange, strange place.</b>",
               "image" : "http://s3-ak.buzzfeed.com/static/2015-01/16/7/campaign_images/webdr09/this-woman-is-posting-vintage-magazine-clippings--2-3218-1421412650-5.jpg",
               "old" : "0",
               "promotion_medium_id" : "1",
               "flexpro_recipients" : "",
               "title" : "This Woman Is Posting Old Magazine Clippings That Show How Sexist The World Used To Be",
               "image_wide" : "/static/2015-01/16/7/campaign_images/webdr09/this-woman-is-posting-vintage-magazine-clippings--2-3218-1421412650-5_wide.jpg",
               "original_image" : ""
            },
            {
               "width" : "125",
               "extra_fields" : {
                  "small" : {
                     "width" : 1024,
                     "left" : 0,
                     "top" : 0,
                     "height" : 679
                  },
                  "big" : {
                     "width" : 1024,
                     "left" : 0,
                     "top" : 0,
                     "height" : 679
                  },
                  "wide" : {
                     "width" : 1024,
                     "left" : 0,
                     "top" : 5,
                     "height" : 360
                  }
               },
               "image_dblwide" : "/static/2015-01/16/7/campaign_images/webdr09/this-woman-is-posting-vintage-magazine-clippings--2-3218-1421412653-8_dblwide.jpg",
               "clicks" : "7632",
               "dud" : "0",
               "added" : "2015-01-16 07:50:54",
               "campaign_id" : "3577565",
               "rate" : 0.00657405110394443,
               "impressions" : "1160928",
               "image_id" : "125013",
               "original_image_width" : "1024",
               "promoter" : "1026792",
               "updated" : "2015-01-16 21:20:52",
               "id" : "175896",
               "image_dblbig" : "/static/2015-01/16/7/campaign_images/webdr09/this-woman-is-posting-vintage-magazine-clippings--2-3218-1421412653-8_dblbig.jpg",
               "is_default" : "0",
               "promotion_image_id" : "125013",
               "sub_buzz_id" : "4691233",
               "image_big" : "/static/2015-01/16/7/campaign_images/webdr09/this-woman-is-posting-vintage-magazine-clippings--2-3218-1421412653-8_big.jpg",
               "probability" : 0.628444653789457,
               "active" : "1",
               "original_image_height" : "1525",
               "height" : "83",
               "description" : "<b>The past is a strange, strange place.</b>",
               "image" : "http://s3-ak.buzzfeed.com/static/2015-01/16/7/campaign_images/webdr09/this-woman-is-posting-vintage-magazine-clippings--2-3218-1421412653-8.jpg",
               "old" : "0",
               "promotion_medium_id" : "1",
               "flexpro_recipients" : "",
               "title" : "This Woman Is Posting Vintage Magazine Clippings That Show Just How Sexist The World Used To Be",
               "image_wide" : "/static/2015-01/16/7/campaign_images/webdr09/this-woman-is-posting-vintage-magazine-clippings--2-3218-1421412653-8_wide.jpg",
               "original_image" : ""
            }
         ],
         "byline_description_visual" : "BuzzFeed News Reporter",
         "display_name" : "Alan White",
         "image" : "http://s3-ak.buzzfed.com/static/2015-01/16/8/campaign_images/webdr01/this-woman-is-posting-vintage-magazine-clippings--2-17890-1421416749-11.jpg",
         "byline_description_id" : "2",
         "static_images" : {
            "small" : "http://s3-static-ak.buzzfed.com/static/2015-01/16/8/campaign_images/webdr01/this-woman-is-posting-vintage-magazine-clippings--2-17890-1421416749-11_small.jpg",
            "standard" : "http://s3-static-ak.buzzfed.com/static/2015-01/16/8/campaign_images/webdr01/this-woman-is-posting-vintage-magazine-clippings--2-17890-1421416749-11.jpg",
            "big" : "http://s3-static-ak.buzzfed.com/static/2015-01/16/8/campaign_images/webdr01/this-woman-is-posting-vintage-magazine-clippings--2-17890-1421416749-11_big.jpg",
            "wide" : "http://s3-static-ak.buzzfed.com/static/2015-01/16/8/campaign_images/webdr01/this-woman-is-posting-vintage-magazine-clippings--2-17890-1421416749-11_wide.jpg",
            "dblbig" : "http://s3-static-ak.buzzfed.com/static/2015-01/16/8/campaign_images/webdr01/this-woman-is-posting-vintage-magazine-clippings--2-17890-1421416749-11_dblbig.jpg",
            "dblwide" : "http://s3-static-ak.buzzfed.com/static/2015-01/16/8/campaign_images/webdr01/this-woman-is-posting-vintage-magazine-clippings--2-17890-1421416749-11_dblwide.jpg"
         },
         "image_small" : "http://s3-ak.buzzfed.com/static/2015-01/16/8/campaign_images/webdr01/this-woman-is-posting-vintage-magazine-clippings--2-17890-1421416749-11_small.jpg",
         "html_blurb" : "<b><big>This Woman Is Posting Vintage Magazine Clippings That Show Just How Sexist The World Used To Be</big></b><br/><b>The past is a strange, strange place.</b><br/><table><tr><td width='30' padding='0 0'><img src='http://s3-ak.buzzfed.com/static/2013-11/user_images/webdr02/18/5/alanwhite-21476-1384769332-13.jpg' width='25' height='25'/></td><td padding='5' pspacing='0'><small><b><a href='/alanwhite'>Alan White</a></b></small><br/><small><color value='#939393'>BuzzFeed News Reporter</color></small></td></tr></table>"
      },
      {
         "bid" : "7EWHFD7",
         "user_type" : "f_other",
         "form" : "super",
         "user" : "samstryker",
         "url" : "http://www.buzzfeed.com/samstryker/these-twins-came-out-to-their-dad-on-the-phone",
         "comments_count" : 106,
         "last_updated" : "2015-01-16 21:18:32",
         "images" : "",
         "uid" : "728GZ97",
         "sub_buzz" : "",
         "name" : "These Twins Came Out To Their Dad And His Response Will Melt Your Heart",
         "uri" : "these-twins-came-out-to-their-dad-on-the-phone",
         "cloud_servers" : [
            "newbuzz-collection-1925855828.us-east-1.elb.amazonaws.com"
         ],
         "username" : "samstryker",
         "published" : "2015-01-14 18:31:30",
         "published_unix" : "1421278290",
         "ad_blurb" : "<b>ALL THE TEARS.</b>",
         "nsfw" : "false",
         "status" : "live",
         "ct" : "http://75.101.183.223/small.gif?type=100,14&user=samstryker&buzz=these-twins-came-out-to-their-dad-on-the-phone&c=7EWHFD7&u=728GZ97&url=http%3A%2F%2Fbuzzfeed.com%2Fsamstryker%2Fthese-twins-came-out-to-their-dad-on-the-phone%2F&rd=http%3A%2F%2Fbuzzfeed.com%2Fsamstryker%2Fthese-twins-came-out-to-their-dad-on-the-phone%2F",
         "impressions" : "2507840",
         "mobile_image" : "1",
         "user_image" : "http://s3-ak.buzzfed.com/static/2014-09/20/11/user_images/webdr07/samstryker-8105-1411227303-0.jpg",
         "blurb" : "ALL THE TEARS.",
         "promotions" : [
            {
               "width" : "125",
               "extra_fields" : {
                  "small" : {
                     "width" : 640,
                     "left" : 0,
                     "top" : 24,
                     "height" : 424
                  },
                  "big" : {
                     "width" : 640,
                     "left" : 0,
                     "top" : 28,
                     "height" : 424
                  },
                  "wide" : {
                     "width" : 640,
                     "left" : 0,
                     "top" : 167,
                     "height" : 225
                  }
               },
               "image_dblwide" : "/static/2015-01/14/18/campaign_images/webdr03/these-twins-came-out-to-their-dad-on-the-phone-2-15779-1421278431-27_dblwide.jpg",
               "clicks" : "66260",
               "dud" : "0",
               "added" : "2015-01-14 18:33:58",
               "campaign_id" : "3575736",
               "rate" : 0.00898654771041725,
               "impressions" : "7373243",
               "image_id" : "124503",
               "original_image_width" : "640",
               "promoter" : "536348",
               "updated" : "2015-01-16 21:15:42",
               "id" : "175026",
               "image_dblbig" : "/static/2015-01/14/18/campaign_images/webdr03/these-twins-came-out-to-their-dad-on-the-phone-2-15779-1421278431-27_dblbig.jpg",
               "is_default" : "1",
               "promotion_image_id" : "124503",
               "sub_buzz_id" : "0",
               "image_big" : "/static/2015-01/14/18/campaign_images/webdr03/these-twins-came-out-to-their-dad-on-the-phone-2-15779-1421278431-27_big.jpg",
               "probability" : 1,
               "active" : "1",
               "original_image_height" : "638",
               "height" : "83",
               "description" : "<b>ALL THE TEARS.</b>",
               "image" : "http://s3-ak.buzzfeed.com/static/2015-01/14/18/campaign_images/webdr03/these-twins-came-out-to-their-dad-on-the-phone-2-15779-1421278431-27.jpg",
               "old" : "0",
               "promotion_medium_id" : "1",
               "flexpro_recipients" : "",
               "title" : "These Twins Came Out To Their Dad And His Response Will Melt Your Heart",
               "image_wide" : "/static/2015-01/14/18/campaign_images/webdr03/these-twins-came-out-to-their-dad-on-the-phone-2-15779-1421278431-27_wide.jpg",
               "original_image" : "/static/2015-01/14/18/enhanced/webdr08/original-9234-1421278303-4.jpg"
            }
         ],
         "byline_description_visual" : "BuzzFeed Staff",
         "display_name" : "Sam Stryker",
         "image" : "http://s3-ak.buzzfed.com/static/2015-01/15/10/campaign_images/webdr09/these-twins-came-out-to-their-dad-and-his-respons-2-2434-1421335932-15.jpg",
         "byline_description_id" : "2",
         "static_images" : {
            "small" : "http://s3-static-ak.buzzfed.com/static/2015-01/15/10/campaign_images/webdr09/these-twins-came-out-to-their-dad-and-his-respons-2-2434-1421335932-15_small.jpg",
            "standard" : "http://s3-static-ak.buzzfed.com/static/2015-01/15/10/campaign_images/webdr09/these-twins-came-out-to-their-dad-and-his-respons-2-2434-1421335932-15.jpg",
            "big" : "http://s3-static-ak.buzzfed.com/static/2015-01/15/10/campaign_images/webdr09/these-twins-came-out-to-their-dad-and-his-respons-2-2434-1421335932-15_big.jpg",
            "wide" : "http://s3-static-ak.buzzfed.com/static/2015-01/15/10/campaign_images/webdr09/these-twins-came-out-to-their-dad-and-his-respons-2-2434-1421335932-15_wide.jpg",
            "dblbig" : "http://s3-static-ak.buzzfed.com/static/2015-01/15/10/campaign_images/webdr09/these-twins-came-out-to-their-dad-and-his-respons-2-2434-1421335932-15_dblbig.jpg",
            "dblwide" : "http://s3-static-ak.buzzfed.com/static/2015-01/15/10/campaign_images/webdr09/these-twins-came-out-to-their-dad-and-his-respons-2-2434-1421335932-15_dblwide.jpg"
         },
         "image_small" : "http://s3-ak.buzzfed.com/static/2015-01/15/10/campaign_images/webdr09/these-twins-came-out-to-their-dad-and-his-respons-2-2434-1421335932-15_small.jpg",
         "html_blurb" : "<b><big>These Twins Came Out To Their Dad And His Response Will Melt Your Heart</big></b><br/><b>ALL THE TEARS.</b><br/><table><tr><td width='30' padding='0 0'><img src='http://s3-ak.buzzfed.com/static/2014-09/20/11/user_images/webdr07/samstryker-8105-1411227303-0.jpg' width='25' height='25'/></td><td padding='5' pspacing='0'><small><b><a href='/samstryker'>Sam Stryker</a></b></small><br/><small><color value='#939393'>BuzzFeed Staff</color></small></td></tr></table>"
      },
      {
         "bid" : "7EWE7V7",
         "user_type" : "f_other",
         "form" : "super",
         "user" : "katienotopoulos",
         "url" : "http://www.buzzfeed.com/katienotopoulos/how-disgusting-are-you-compared-to-everyone-else",
         "comments_count" : 46,
         "last_updated" : "2015-01-16 21:18:45",
         "images" : "",
         "uid" : "711OL27",
         "sub_buzz" : "",
         "name" : "How Disgusting Are You Compared To Everyone Else?",
         "uri" : "how-disgusting-are-you-compared-to-everyone-else",
         "cloud_servers" : [
            "newbuzz-collection-1925855828.us-east-1.elb.amazonaws.com"
         ],
         "username" : "katienotopoulos",
         "published" : "2015-01-15 13:38:56",
         "published_unix" : "1421347136",
         "ad_blurb" : "<b>Fess up, booger eaters.</b>",
         "nsfw" : "false",
         "status" : "live",
         "ct" : "http://75.101.183.223/small.gif?type=100,14&user=katienotopoulos&buzz=how-disgusting-are-you-compared-to-everyone-else&c=7EWE7V7&u=711OL27&url=http%3A%2F%2Fbuzzfeed.com%2Fkatienotopoulos%2Fhow-disgusting-are-you-compared-to-everyone-else%2F&rd=http%3A%2F%2Fbuzzfeed.com%2Fkatienotopoulos%2Fhow-disgusting-are-you-compared-to-everyone-else%2F",
         "impressions" : "828276",
         "mobile_image" : "1",
         "user_image" : "http://s3-ak.buzzfed.com/static/user_images/webdr01/2013/3/21/12/katienotopoulos-10480-1363883979-8.jpg",
         "blurb" : "Fess up, booger eaters.",
         "promotions" : [
            {
               "width" : "125",
               "extra_fields" : {
                  "small" : {
                     "width" : 640,
                     "left" : 0,
                     "top" : 28,
                     "height" : 425
                  },
                  "big" : {
                     "width" : 640,
                     "left" : 0,
                     "top" : 28,
                     "height" : 425
                  },
                  "wide" : {
                     "width" : 640,
                     "left" : 0,
                     "top" : 128,
                     "height" : 225
                  }
               },
               "image_dblwide" : "/static/2015-01/15/13/campaign_images/webdr01/how-disgusting-are-you-compared-to-everyone-else-2-30881-1421347224-18_dblwide.jpg",
               "clicks" : "9798",
               "dud" : "0",
               "added" : "2015-01-15 13:40:25",
               "campaign_id" : "3575142",
               "rate" : 0.00874108093930489,
               "impressions" : "1120914",
               "image_id" : "124789",
               "original_image_width" : "640",
               "promoter" : "251155",
               "updated" : "2015-01-16 21:11:17",
               "id" : "175450",
               "image_dblbig" : "/static/2015-01/15/13/campaign_images/webdr01/how-disgusting-are-you-compared-to-everyone-else-2-30881-1421347224-18_dblbig.jpg",
               "is_default" : "0",
               "promotion_image_id" : "124789",
               "sub_buzz_id" : "0",
               "image_big" : "/static/2015-01/15/13/campaign_images/webdr01/how-disgusting-are-you-compared-to-everyone-else-2-30881-1421347224-18_big.jpg",
               "probability" : 0.120593236711007,
               "active" : "1",
               "original_image_height" : "480",
               "height" : "83",
               "description" : "<b>Fess up, booger eaters.</b>",
               "image" : "http://s3-ak.buzzfeed.com/static/2015-01/15/13/campaign_images/webdr01/how-disgusting-are-you-compared-to-everyone-else-2-30881-1421347224-18.jpg",
               "old" : "0",
               "promotion_medium_id" : "1",
               "flexpro_recipients" : "",
               "title" : "How Gross Are You?",
               "image_wide" : "/static/2015-01/15/13/campaign_images/webdr01/how-disgusting-are-you-compared-to-everyone-else-2-30881-1421347224-18_wide.jpg",
               "original_image" : "/static/2015-01/15/13/enhanced/webdr10/original-25042-1421347206-2.jpg"
            },
            {
               "width" : "125",
               "extra_fields" : {
                  "small" : {
                     "width" : 813,
                     "left" : 0,
                     "top" : 0,
                     "height" : "540"
                  },
                  "big" : {
                     "width" : 813,
                     "left" : 113,
                     "top" : 0,
                     "height" : 540
                  },
                  "wide" : {
                     "width" : 813,
                     "left" : 113,
                     "top" : 180,
                     "height" : 286
                  }
               },
               "image_dblwide" : "/static/2015-01/15/13/campaign_images/webdr01/how-disgusting-are-you-compared-to-everyone-else-2-30881-1421347218-12_dblwide.jpg",
               "clicks" : "2427",
               "dud" : "0",
               "added" : "2015-01-15 13:40:25",
               "campaign_id" : "3575142",
               "rate" : 0.00783476933109083,
               "impressions" : "309773",
               "image_id" : "124787",
               "original_image_width" : "960",
               "promoter" : "251155",
               "updated" : "2015-01-16 21:08:17",
               "id" : "175451",
               "image_dblbig" : "/static/2015-01/15/13/campaign_images/webdr01/how-disgusting-are-you-compared-to-everyone-else-2-30881-1421347218-12_dblbig.jpg",
               "is_default" : "0",
               "promotion_image_id" : "124787",
               "sub_buzz_id" : "0",
               "image_big" : "/static/2015-01/15/13/campaign_images/webdr01/how-disgusting-are-you-compared-to-everyone-else-2-30881-1421347218-12_big.jpg",
               "probability" : 0.0233474280721922,
               "active" : "1",
               "original_image_height" : "540",
               "height" : "83",
               "description" : "<b>Fess up, booger eaters.</b>",
               "image" : "http://s3-ak.buzzfeed.com/static/2015-01/15/13/campaign_images/webdr01/how-disgusting-are-you-compared-to-everyone-else-2-30881-1421347218-12.jpg",
               "old" : "0",
               "promotion_medium_id" : "1",
               "flexpro_recipients" : "",
               "title" : "What Level Of Garbage Human Are You?",
               "image_wide" : "/static/2015-01/15/13/campaign_images/webdr01/how-disgusting-are-you-compared-to-everyone-else-2-30881-1421347218-12_wide.jpg",
               "original_image" : "/static/2015-01/15/12/enhanced/webdr07/original-25025-1421344268-3.png"
            },
            {
               "width" : "125",
               "extra_fields" : {
                  "small" : {
                     "width" : 640,
                     "left" : 0,
                     "top" : 34,
                     "height" : 424
                  },
                  "big" : {
                     "width" : 640,
                     "left" : 0,
                     "top" : 17,
                     "height" : 425
                  },
                  "wide" : {
                     "width" : 640,
                     "left" : 0,
                     "top" : 117,
                     "height" : 225
                  }
               },
               "image_dblwide" : "/static/2015-01/15/13/campaign_images/webdr01/how-disgusting-are-you-compared-to-everyone-else-2-30881-1421347221-15_dblwide.jpg",
               "clicks" : "1672",
               "dud" : "0",
               "added" : "2015-01-15 13:40:29",
               "campaign_id" : "3575142",
               "rate" : 0.00734535006831351,
               "impressions" : "227627",
               "image_id" : "124788",
               "original_image_width" : "640",
               "promoter" : "251155",
               "updated" : "2015-01-16 21:18:45",
               "id" : "175455",
               "image_dblbig" : "/static/2015-01/15/13/campaign_images/webdr01/how-disgusting-are-you-compared-to-everyone-else-2-30881-1421347221-15_dblbig.jpg",
               "is_default" : "0",
               "promotion_image_id" : "124788",
               "sub_buzz_id" : "0",
               "image_big" : "/static/2015-01/15/13/campaign_images/webdr01/how-disgusting-are-you-compared-to-everyone-else-2-30881-1421347221-15_big.jpg",
               "probability" : 0.00887224045093656,
               "active" : "1",
               "original_image_height" : "458",
               "height" : "83",
               "description" : "<b>Fess up, booger eaters.</b>",
               "image" : "http://s3-ak.buzzfeed.com/static/2015-01/15/13/campaign_images/webdr01/how-disgusting-are-you-compared-to-everyone-else-2-30881-1421347221-15.jpg",
               "old" : "0",
               "promotion_medium_id" : "1",
               "flexpro_recipients" : "",
               "title" : "How Disgusting Are You Compared To Everyone Else?",
               "image_wide" : "/static/2015-01/15/13/campaign_images/webdr01/how-disgusting-are-you-compared-to-everyone-else-2-30881-1421347221-15_wide.jpg",
               "original_image" : "/static/2015-01/15/13/enhanced/webdr06/original-8384-1421347191-2.jpg"
            },
            {
               "width" : "125",
               "extra_fields" : {
                  "small" : {
                     "width" : 640,
                     "left" : 0,
                     "top" : 34,
                     "height" : 424
                  },
                  "big" : {
                     "width" : 640,
                     "left" : 0,
                     "top" : 17,
                     "height" : 425
                  },
                  "wide" : {
                     "width" : 640,
                     "left" : 0,
                     "top" : 117,
                     "height" : 225
                  }
               },
               "image_dblwide" : "/static/2015-01/15/13/campaign_images/webdr01/how-disgusting-are-you-compared-to-everyone-else-2-30881-1421347221-15_dblwide.jpg",
               "clicks" : "958",
               "dud" : "0",
               "added" : "2015-01-15 13:40:23",
               "campaign_id" : "3575142",
               "rate" : 0.00655719751675234,
               "impressions" : "146099",
               "image_id" : "124788",
               "original_image_width" : "640",
               "promoter" : "251155",
               "updated" : "2015-01-16 21:20:42",
               "id" : "175449",
               "image_dblbig" : "/static/2015-01/15/13/campaign_images/webdr01/how-disgusting-are-you-compared-to-everyone-else-2-30881-1421347221-15_dblbig.jpg",
               "is_default" : "0",
               "promotion_image_id" : "124788",
               "sub_buzz_id" : "0",
               "image_big" : "/static/2015-01/15/13/campaign_images/webdr01/how-disgusting-are-you-compared-to-everyone-else-2-30881-1421347221-15_big.jpg",
               "probability" : 0.00161666416855908,
               "active" : "1",
               "original_image_height" : "458",
               "height" : "83",
               "description" : "<b>Fess up, booger eaters.</b>",
               "image" : "http://s3-ak.buzzfeed.com/static/2015-01/15/13/campaign_images/webdr01/how-disgusting-are-you-compared-to-everyone-else-2-30881-1421347221-15.jpg",
               "old" : "0",
               "promotion_medium_id" : "1",
               "flexpro_recipients" : "",
               "title" : "How Gross Are You?",
               "image_wide" : "/static/2015-01/15/13/campaign_images/webdr01/how-disgusting-are-you-compared-to-everyone-else-2-30881-1421347221-15_wide.jpg",
               "original_image" : "/static/2015-01/15/13/enhanced/webdr06/original-8384-1421347191-2.jpg"
            },
            {
               "width" : "125",
               "extra_fields" : {
                  "small" : {
                     "width" : 813,
                     "left" : 0,
                     "top" : 0,
                     "height" : "540"
                  },
                  "big" : {
                     "width" : 813,
                     "left" : 113,
                     "top" : 0,
                     "height" : 540
                  },
                  "wide" : {
                     "width" : 813,
                     "left" : 113,
                     "top" : 180,
                     "height" : 286
                  }
               },
               "image_dblwide" : "/static/2015-01/15/13/campaign_images/webdr01/how-disgusting-are-you-compared-to-everyone-else-2-30881-1421347218-12_dblwide.jpg",
               "clicks" : "2831",
               "dud" : "0",
               "added" : "2015-01-15 13:40:19",
               "campaign_id" : "3575142",
               "rate" : 0.00782601964936336,
               "impressions" : "361742",
               "image_id" : "124787",
               "original_image_width" : "960",
               "promoter" : "251155",
               "updated" : "2015-01-16 21:12:37",
               "id" : "175448",
               "image_dblbig" : "/static/2015-01/15/13/campaign_images/webdr01/how-disgusting-are-you-compared-to-everyone-else-2-30881-1421347218-12_dblbig.jpg",
               "is_default" : "0",
               "promotion_image_id" : "124787",
               "sub_buzz_id" : "0",
               "image_big" : "/static/2015-01/15/13/campaign_images/webdr01/how-disgusting-are-you-compared-to-everyone-else-2-30881-1421347218-12_big.jpg",
               "probability" : 0.0229593631010239,
               "active" : "1",
               "original_image_height" : "540",
               "height" : "83",
               "description" : "<b>Fess up, booger eaters.</b>",
               "image" : "http://s3-ak.buzzfeed.com/static/2015-01/15/13/campaign_images/webdr01/how-disgusting-are-you-compared-to-everyone-else-2-30881-1421347218-12.jpg",
               "old" : "0",
               "promotion_medium_id" : "1",
               "flexpro_recipients" : "",
               "title" : "How Gross Are You?",
               "image_wide" : "/static/2015-01/15/13/campaign_images/webdr01/how-disgusting-are-you-compared-to-everyone-else-2-30881-1421347218-12_wide.jpg",
               "original_image" : "/static/2015-01/15/12/enhanced/webdr07/original-25025-1421344268-3.png"
            },
            {
               "width" : "125",
               "extra_fields" : {
                  "small" : {
                     "width" : 640,
                     "left" : 0,
                     "top" : 28,
                     "height" : 425
                  },
                  "big" : {
                     "width" : 640,
                     "left" : 0,
                     "top" : 28,
                     "height" : 425
                  },
                  "wide" : {
                     "width" : 640,
                     "left" : 0,
                     "top" : 128,
                     "height" : 225
                  }
               },
               "image_dblwide" : "/static/2015-01/15/13/campaign_images/webdr01/how-disgusting-are-you-compared-to-everyone-else-2-30881-1421347228-21_dblwide.jpg",
               "clicks" : "1910",
               "dud" : "0",
               "added" : "2015-01-15 13:40:29",
               "campaign_id" : "3575142",
               "rate" : 0.00755723318218867,
               "impressions" : "252738",
               "image_id" : "124790",
               "original_image_width" : "640",
               "promoter" : "251155",
               "updated" : "2015-01-16 21:11:43",
               "id" : "175453",
               "image_dblbig" : "/static/2015-01/15/13/campaign_images/webdr01/how-disgusting-are-you-compared-to-everyone-else-2-30881-1421347228-21_dblbig.jpg",
               "is_default" : "0",
               "promotion_image_id" : "124790",
               "sub_buzz_id" : "0",
               "image_big" : "/static/2015-01/15/13/campaign_images/webdr01/how-disgusting-are-you-compared-to-everyone-else-2-30881-1421347228-21_big.jpg",
               "probability" : 0.0135921503134049,
               "active" : "1",
               "original_image_height" : "480",
               "height" : "83",
               "description" : "<b>Fess up, booger eaters.</b>",
               "image" : "http://s3-ak.buzzfeed.com/static/2015-01/15/13/campaign_images/webdr01/how-disgusting-are-you-compared-to-everyone-else-2-30881-1421347228-21.jpg",
               "old" : "0",
               "promotion_medium_id" : "1",
               "flexpro_recipients" : "",
               "title" : "What Level Of Garbage Human Are You?",
               "image_wide" : "/static/2015-01/15/13/campaign_images/webdr01/how-disgusting-are-you-compared-to-everyone-else-2-30881-1421347228-21_wide.jpg",
               "original_image" : "/static/2015-01/15/13/enhanced/webdr10/original-25042-1421347206-2.jpg"
            },
            {
               "width" : "125",
               "extra_fields" : {
                  "small" : {
                     "width" : 640,
                     "left" : 0,
                     "top" : 28,
                     "height" : 425
                  },
                  "big" : {
                     "width" : 640,
                     "left" : 0,
                     "top" : 28,
                     "height" : 425
                  },
                  "wide" : {
                     "width" : 640,
                     "left" : 0,
                     "top" : 128,
                     "height" : 225
                  }
               },
               "image_dblwide" : "/static/2015-01/15/13/campaign_images/webdr01/how-disgusting-are-you-compared-to-everyone-else-2-30881-1421347224-18_dblwide.jpg",
               "clicks" : "47213",
               "dud" : "0",
               "added" : "2015-01-15 13:40:29",
               "campaign_id" : "3575142",
               "rate" : 0.00985785422285436,
               "impressions" : "4789379",
               "image_id" : "124789",
               "original_image_width" : "640",
               "promoter" : "251155",
               "updated" : "2015-01-16 21:13:02",
               "id" : "175456",
               "image_dblbig" : "/static/2015-01/15/13/campaign_images/webdr01/how-disgusting-are-you-compared-to-everyone-else-2-30881-1421347224-18_dblbig.jpg",
               "is_default" : "0",
               "promotion_image_id" : "124789",
               "sub_buzz_id" : "0",
               "image_big" : "/static/2015-01/15/13/campaign_images/webdr01/how-disgusting-are-you-compared-to-everyone-else-2-30881-1421347224-18_big.jpg",
               "probability" : 0.732119037443898,
               "active" : "1",
               "original_image_height" : "480",
               "height" : "83",
               "description" : "<b>Fess up, booger eaters.</b>",
               "image" : "http://s3-ak.buzzfeed.com/static/2015-01/15/13/campaign_images/webdr01/how-disgusting-are-you-compared-to-everyone-else-2-30881-1421347224-18.jpg",
               "old" : "0",
               "promotion_medium_id" : "1",
               "flexpro_recipients" : "",
               "title" : "How Disgusting Are You Compared To Everyone Else?",
               "image_wide" : "/static/2015-01/15/13/campaign_images/webdr01/how-disgusting-are-you-compared-to-everyone-else-2-30881-1421347224-18_wide.jpg",
               "original_image" : "/static/2015-01/15/13/enhanced/webdr10/original-25042-1421347206-2.jpg"
            },
            {
               "width" : "125",
               "extra_fields" : {
                  "small" : {
                     "width" : 640,
                     "left" : 0,
                     "top" : 34,
                     "height" : 424
                  },
                  "big" : {
                     "width" : 640,
                     "left" : 0,
                     "top" : 17,
                     "height" : 425
                  },
                  "wide" : {
                     "width" : 640,
                     "left" : 0,
                     "top" : 117,
                     "height" : 225
                  }
               },
               "image_dblwide" : "/static/2015-01/15/13/campaign_images/webdr01/how-disgusting-are-you-compared-to-everyone-else-2-30881-1421347221-15_dblwide.jpg",
               "clicks" : "1607",
               "dud" : "0",
               "added" : "2015-01-15 13:40:26",
               "campaign_id" : "3575142",
               "rate" : 0.00766307276342707,
               "impressions" : "209707",
               "image_id" : "124788",
               "original_image_width" : "640",
               "promoter" : "251155",
               "updated" : "2015-01-16 21:12:49",
               "id" : "175452",
               "image_dblbig" : "/static/2015-01/15/13/campaign_images/webdr01/how-disgusting-are-you-compared-to-everyone-else-2-30881-1421347221-15_dblbig.jpg",
               "is_default" : "0",
               "promotion_image_id" : "124788",
               "sub_buzz_id" : "0",
               "image_big" : "/static/2015-01/15/13/campaign_images/webdr01/how-disgusting-are-you-compared-to-everyone-else-2-30881-1421347221-15_big.jpg",
               "probability" : 0.0167451895098929,
               "active" : "1",
               "original_image_height" : "458",
               "height" : "83",
               "description" : "<b>Fess up, booger eaters.</b>",
               "image" : "http://s3-ak.buzzfeed.com/static/2015-01/15/13/campaign_images/webdr01/how-disgusting-are-you-compared-to-everyone-else-2-30881-1421347221-15.jpg",
               "old" : "0",
               "promotion_medium_id" : "1",
               "flexpro_recipients" : "",
               "title" : "What Level Of Garbage Human Are You?",
               "image_wide" : "/static/2015-01/15/13/campaign_images/webdr01/how-disgusting-are-you-compared-to-everyone-else-2-30881-1421347221-15_wide.jpg",
               "original_image" : "/static/2015-01/15/13/enhanced/webdr06/original-8384-1421347191-2.jpg"
            },
            {
               "width" : "125",
               "extra_fields" : {
                  "small" : {
                     "width" : 813,
                     "left" : 0,
                     "top" : 0,
                     "height" : "540"
                  },
                  "big" : {
                     "width" : 813,
                     "left" : 113,
                     "top" : 0,
                     "height" : 540
                  },
                  "wide" : {
                     "width" : 813,
                     "left" : 113,
                     "top" : 180,
                     "height" : 286
                  }
               },
               "image_dblwide" : "/static/2015-01/15/13/campaign_images/webdr01/how-disgusting-are-you-compared-to-everyone-else-2-30881-1421347218-12_dblwide.jpg",
               "clicks" : "5235",
               "dud" : "0",
               "added" : "2015-01-15 13:40:29",
               "campaign_id" : "3575142",
               "rate" : 0.00834503657628734,
               "impressions" : "627319",
               "image_id" : "124787",
               "original_image_width" : "960",
               "promoter" : "251155",
               "updated" : "2015-01-16 21:14:15",
               "id" : "175454",
               "image_dblbig" : "/static/2015-01/15/13/campaign_images/webdr01/how-disgusting-are-you-compared-to-everyone-else-2-30881-1421347218-12_dblbig.jpg",
               "is_default" : "0",
               "promotion_image_id" : "124787",
               "sub_buzz_id" : "0",
               "image_big" : "/static/2015-01/15/13/campaign_images/webdr01/how-disgusting-are-you-compared-to-everyone-else-2-30881-1421347218-12_big.jpg",
               "probability" : 0.0601546902290851,
               "active" : "1",
               "original_image_height" : "540",
               "height" : "83",
               "description" : "<b>Fess up, booger eaters.</b>",
               "image" : "http://s3-ak.buzzfeed.com/static/2015-01/15/13/campaign_images/webdr01/how-disgusting-are-you-compared-to-everyone-else-2-30881-1421347218-12.jpg",
               "old" : "0",
               "promotion_medium_id" : "1",
               "flexpro_recipients" : "",
               "title" : "How Disgusting Are You Compared To Everyone Else?",
               "image_wide" : "/static/2015-01/15/13/campaign_images/webdr01/how-disgusting-are-you-compared-to-everyone-else-2-30881-1421347218-12_wide.jpg",
               "original_image" : "/static/2015-01/15/12/enhanced/webdr07/original-25025-1421344268-3.png"
            }
         ],
         "byline_description_visual" : "BuzzFeed News Reporter",
         "display_name" : "Katie Notopoulos",
         "image" : "http://s3-ak.buzzfed.com/static/2015-01/15/19/campaign_images/webdr06/how-disgusting-are-you-compared-to-everyone-else-2-22564-1421368520-6.jpg",
         "byline_description_id" : "2",
         "static_images" : {
            "small" : "http://s3-static-ak.buzzfed.com/static/2015-01/15/19/campaign_images/webdr06/how-disgusting-are-you-compared-to-everyone-else-2-22564-1421368520-6_small.jpg",
            "standard" : "http://s3-static-ak.buzzfed.com/static/2015-01/15/19/campaign_images/webdr06/how-disgusting-are-you-compared-to-everyone-else-2-22564-1421368520-6.jpg",
            "big" : "http://s3-static-ak.buzzfed.com/static/2015-01/15/19/campaign_images/webdr06/how-disgusting-are-you-compared-to-everyone-else-2-22564-1421368520-6_big.jpg",
            "wide" : "http://s3-static-ak.buzzfed.com/static/2015-01/15/19/campaign_images/webdr06/how-disgusting-are-you-compared-to-everyone-else-2-22564-1421368520-6_wide.jpg",
            "dblbig" : "http://s3-static-ak.buzzfed.com/static/2015-01/15/19/campaign_images/webdr06/how-disgusting-are-you-compared-to-everyone-else-2-22564-1421368520-6_dblbig.jpg",
            "dblwide" : "http://s3-static-ak.buzzfed.com/static/2015-01/15/19/campaign_images/webdr06/how-disgusting-are-you-compared-to-everyone-else-2-22564-1421368520-6_dblwide.jpg"
         },
         "image_small" : "http://s3-ak.buzzfed.com/static/2015-01/15/19/campaign_images/webdr06/how-disgusting-are-you-compared-to-everyone-else-2-22564-1421368520-6_small.jpg",
         "html_blurb" : "<b><big>How Disgusting Are You Compared To Everyone Else?</big></b><br/><b>Fess up, booger eaters.</b><br/><table><tr><td width='30' padding='0 0'><img src='http://s3-ak.buzzfed.com/static/user_images/webdr01/2013/3/21/12/katienotopoulos-10480-1363883979-8.jpg' width='25' height='25'/></td><td padding='5' pspacing='0'><small><b><a href='/katienotopoulos'>Katie Notopoulos</a></b></small><br/><small><color value='#939393'>BuzzFeed News Reporter</color></small></td></tr></table>"
      },
      {
         "bid" : "7EW5577",
         "user_type" : "f_other",
         "form" : "super",
         "user" : "augustafalletta",
         "url" : "http://www.buzzfeed.com/augustafalletta/which-best-selling-beauty-products-are-actually-worth-the-hy",
         "comments_count" : 129,
         "last_updated" : "2015-01-16 21:19:51",
         "images" : "",
         "uid" : "79BIAM7",
         "sub_buzz" : "",
         "name" : "Which Of These 27 Best-Selling Beauty Products Do You Actually Need?",
         "uri" : "which-best-selling-beauty-products-are-actually-worth-the-hy",
         "cloud_servers" : [
            "newbuzz-collection-1925855828.us-east-1.elb.amazonaws.com"
         ],
         "username" : "augustafalletta",
         "published" : "2015-01-15 15:43:55",
         "published_unix" : "1421354635",
         "ad_blurb" : "<b>These 27 products are best-sellers at major makeup retailers, plus the most reviewed products on MakeupAlley. But do you think they're worth your time and money?</b> Tell us.",
         "nsfw" : "false",
         "status" : "live",
         "ct" : "http://75.101.183.223/small.gif?type=100,14&user=augustafalletta&buzz=which-best-selling-beauty-products-are-actually-worth-the-hy&c=7EW5577&u=79BIAM7&url=http%3A%2F%2Fbuzzfeed.com%2Faugustafalletta%2Fwhich-best-selling-beauty-products-are-actually-worth-the-hy%2F&rd=http%3A%2F%2Fbuzzfeed.com%2Faugustafalletta%2Fwhich-best-selling-beauty-products-are-actually-worth-the-hy%2F",
         "impressions" : "614074",
         "mobile_image" : "1",
         "user_image" : "http://s3-ak.buzzfed.com/static/2014-11/11/16/user_images/webdr06/augustafalletta-1786-1415742329-8.jpg",
         "blurb" : "These 27 products are best-sellers at major makeup retailers, plus the most reviewed products on MakeupAlley. But do you think they&#39;re worth your time and money? Tell us.",
         "promotions" : [
            {
               "width" : "125",
               "extra_fields" : {
                  "small" : {
                     "width" : 700,
                     "left" : 0,
                     "top" : 0,
                     "height" : 464
                  },
                  "big" : {
                     "width" : 700,
                     "left" : 0,
                     "top" : 122,
                     "height" : 464
                  },
                  "wide" : {
                     "width" : 700,
                     "left" : 0,
                     "top" : 248,
                     "height" : 246
                  }
               },
               "image_dblwide" : "/static/2015-01/15/15/campaign_images/webdr03/which-best-selling-beauty-products-are-actually-w-2-23306-1421354759-19_dblwide.jpg",
               "clicks" : "23728",
               "dud" : "0",
               "added" : "2015-01-15 15:46:01",
               "campaign_id" : "3573462",
               "rate" : 0.0117848295153161,
               "impressions" : "2013436",
               "image_id" : "124843",
               "original_image_width" : "700",
               "promoter" : "2236203",
               "updated" : "2015-01-16 21:14:48",
               "id" : "175547",
               "image_dblbig" : "/static/2015-01/15/15/campaign_images/webdr03/which-best-selling-beauty-products-are-actually-w-2-23306-1421354759-19_dblbig.jpg",
               "is_default" : "1",
               "promotion_image_id" : "124843",
               "sub_buzz_id" : "4670037",
               "image_big" : "/static/2015-01/15/15/campaign_images/webdr03/which-best-selling-beauty-products-are-actually-w-2-23306-1421354759-19_big.jpg",
               "probability" : 1,
               "active" : "1",
               "original_image_height" : "700",
               "height" : "83",
               "description" : "<b>These 27 products are best-sellers at major makeup retailers, plus the most reviewed products on MakeupAlley. But do you think they're worth your time and money?</b> Tell us.",
               "image" : "http://s3-ak.buzzfeed.com/static/2015-01/15/15/campaign_images/webdr03/which-best-selling-beauty-products-are-actually-w-2-23306-1421354759-19.jpg",
               "old" : "0",
               "promotion_medium_id" : "1",
               "flexpro_recipients" : "",
               "title" : "Which Of These 27 Best-Selling Beauty Products Do You Actually Need?",
               "image_wide" : "/static/2015-01/15/15/campaign_images/webdr03/which-best-selling-beauty-products-are-actually-w-2-23306-1421354759-19_wide.jpg",
               "original_image" : ""
            }
         ],
         "byline_description_visual" : "Hair and Beauty Editor",
         "display_name" : "Augusta Falletta",
         "image" : "http://s3-ak.buzzfed.com/static/2015-01/15/15/campaign_images/webdr03/which-best-selling-beauty-products-are-actually-w-2-23306-1421354759-19.jpg",
         "byline_description_id" : "2",
         "static_images" : {
            "small" : "http://s3-static-ak.buzzfed.com/static/2015-01/15/15/campaign_images/webdr03/which-best-selling-beauty-products-are-actually-w-2-23306-1421354759-19_small.jpg",
            "standard" : "http://s3-static-ak.buzzfed.com/static/2015-01/15/15/campaign_images/webdr03/which-best-selling-beauty-products-are-actually-w-2-23306-1421354759-19.jpg",
            "big" : "http://s3-static-ak.buzzfed.com/static/2015-01/15/15/campaign_images/webdr03/which-best-selling-beauty-products-are-actually-w-2-23306-1421354759-19_big.jpg",
            "wide" : "http://s3-static-ak.buzzfed.com/static/2015-01/15/15/campaign_images/webdr03/which-best-selling-beauty-products-are-actually-w-2-23306-1421354759-19_wide.jpg",
            "dblbig" : "http://s3-static-ak.buzzfed.com/static/2015-01/15/15/campaign_images/webdr03/which-best-selling-beauty-products-are-actually-w-2-23306-1421354759-19_dblbig.jpg",
            "dblwide" : "http://s3-static-ak.buzzfed.com/static/2015-01/15/15/campaign_images/webdr03/which-best-selling-beauty-products-are-actually-w-2-23306-1421354759-19_dblwide.jpg"
         },
         "image_small" : "http://s3-ak.buzzfed.com/static/2015-01/15/15/campaign_images/webdr03/which-best-selling-beauty-products-are-actually-w-2-23306-1421354759-19_small.jpg",
         "html_blurb" : "<b><big>Which Of These 27 Best-Selling Beauty Products Do You Actually Need?</big></b><br/><b>These 27 products are best-sellers at major makeup retailers, plus the most reviewed products on MakeupAlley. But do you think they're worth your time and money?</b> Tell us.<br/><table><tr><td width='30' padding='0 0'><img src='http://s3-ak.buzzfed.com/static/2014-11/11/16/user_images/webdr06/augustafalletta-1786-1415742329-8.jpg' width='25' height='25'/></td><td padding='5' pspacing='0'><small><b><a href='/augustafalletta'>Augusta Falletta</a></b></small><br/><small><color value='#939393'>Hair and Beauty Editor</color></small></td></tr></table>"
      },
      {
         "bid" : "7EWDXD7",
         "user_type" : "f_other",
         "form" : "super",
         "user" : "rachelzarrell",
         "url" : "http://www.buzzfeed.com/rachelzarrell/ellen-degeneres-shut-down-an-anti-gay-pastor",
         "comments_count" : 83,
         "last_updated" : "2015-01-16 21:18:44",
         "images" : "",
         "uid" : "73WCJI7",
         "sub_buzz" : "",
         "name" : "Ellen DeGeneres Shut Down An Anti-Gay Pastor In The Most Amazing Way",
         "uri" : "ellen-degeneres-shut-down-an-anti-gay-pastor",
         "cloud_servers" : [
            "newbuzz-collection-1925855828.us-east-1.elb.amazonaws.com"
         ],
         "username" : "rachelzarrell",
         "published" : "2015-01-14 10:06:50",
         "published_unix" : "1421248010",
         "ad_blurb" : "<b>The pastor and author had written that she helps to promote a \"gay agenda.\"</b> And she responded in classic Ellen fashion.",
         "nsfw" : "false",
         "status" : "live",
         "ct" : "http://75.101.183.223/small.gif?type=100,14&user=rachelzarrell&buzz=ellen-degeneres-shut-down-an-anti-gay-pastor&c=7EWDXD7&u=73WCJI7&url=http%3A%2F%2Fbuzzfeed.com%2Frachelzarrell%2Fellen-degeneres-shut-down-an-anti-gay-pastor%2F&rd=http%3A%2F%2Fbuzzfeed.com%2Frachelzarrell%2Fellen-degeneres-shut-down-an-anti-gay-pastor%2F",
         "impressions" : "2459363",
         "mobile_image" : "1",
         "user_image" : "http://s3-ak.buzzfed.com/static/2014-10/8/16/user_images/webdr07/rachelzarrell-22656-1412801193-17.jpg",
         "blurb" : "The pastor and author had written that she helps to promote a &quot;gay agenda.&quot; And she responded in classic Ellen fashion.",
         "promotions" : [
            {
               "width" : "125",
               "extra_fields" : {
                  "small" : {
                     "width" : 418,
                     "left" : 174,
                     "top" : 14,
                     "height" : 277
                  },
                  "big" : {
                     "width" : 763,
                     "left" : 0,
                     "top" : -46,
                     "height" : 507
                  },
                  "wide" : {
                     "width" : 763,
                     "left" : 0,
                     "top" : 22,
                     "height" : 268
                  }
               },
               "image_dblwide" : "/static/2015-01/14/10/campaign_images/webdr11/ellen-degeneres-shut-down-an-anti-gay-pastor-2-13730-1421248175-19_dblwide.jpg",
               "clicks" : "7125",
               "dud" : "0",
               "added" : "2015-01-14 10:09:36",
               "campaign_id" : "3575088",
               "rate" : 0.00606822989946753,
               "impressions" : "1174148",
               "image_id" : "124301",
               "original_image_width" : "418",
               "promoter" : "935435",
               "updated" : "2015-01-16 21:14:48",
               "id" : "174625",
               "image_dblbig" : "/static/2015-01/14/10/campaign_images/webdr11/ellen-degeneres-shut-down-an-anti-gay-pastor-2-13730-1421248175-19_dblbig.jpg",
               "is_default" : "0",
               "promotion_image_id" : "124301",
               "sub_buzz_id" : "0",
               "image_big" : "/static/2015-01/14/10/campaign_images/webdr11/ellen-degeneres-shut-down-an-anti-gay-pastor-2-13730-1421248175-19_big.jpg",
               "probability" : 0.0566042395952069,
               "active" : "1",
               "original_image_height" : "415",
               "height" : "83",
               "description" : "<b>The pastor and author had written that she helps to promote a \"gay agenda.\"</b> And she responded in classic Ellen fashion.",
               "image" : "http://s3-ak.buzzfeed.com/static/2015-01/14/10/campaign_images/webdr11/ellen-degeneres-shut-down-an-anti-gay-pastor-2-13730-1421248175-19.jpg",
               "old" : "0",
               "promotion_medium_id" : "1",
               "flexpro_recipients" : "",
               "title" : "Ellen Shut Down An Anti-Gay Pastor For Saying She Promotes A \"Gay Agenda\"",
               "image_wide" : "/static/2015-01/14/10/campaign_images/webdr11/ellen-degeneres-shut-down-an-anti-gay-pastor-2-13730-1421248175-19_wide.jpg",
               "original_image" : "/static/2015-01/14/10/enhanced/webdr08/original-20901-1421248141-10.png"
            },
            {
               "width" : "125",
               "extra_fields" : {
                  "small" : {
                     "width" : 507,
                     "left" : 146,
                     "top" : 16,
                     "height" : 336
                  },
                  "big" : {
                     "width" : 368,
                     "left" : 188,
                     "top" : 26,
                     "height" : 244
                  },
                  "wide" : {
                     "width" : 625,
                     "left" : 72,
                     "top" : 29,
                     "height" : 220
                  }
               },
               "image_dblwide" : "/static/2015-01/14/10/campaign_images/webdr11/ellen-degeneres-shut-down-an-anti-gay-pastor-2-13730-1421248172-16_dblwide.jpg",
               "clicks" : "6308",
               "dud" : "0",
               "added" : "2015-01-14 10:09:36",
               "campaign_id" : "3575088",
               "rate" : 0.00602314729497858,
               "impressions" : "1047293",
               "image_id" : "124300",
               "original_image_width" : "760",
               "promoter" : "935435",
               "updated" : "2015-01-16 21:13:53",
               "id" : "174624",
               "image_dblbig" : "/static/2015-01/14/10/campaign_images/webdr11/ellen-degeneres-shut-down-an-anti-gay-pastor-2-13730-1421248172-16_dblbig.jpg",
               "is_default" : "1",
               "promotion_image_id" : "124300",
               "sub_buzz_id" : "0",
               "image_big" : "/static/2015-01/14/10/campaign_images/webdr11/ellen-degeneres-shut-down-an-anti-gay-pastor-2-13730-1421248172-16_big.jpg",
               "probability" : 0.0506140196063152,
               "active" : "1",
               "original_image_height" : "415",
               "height" : "83",
               "description" : "<b>The pastor and author had written that she helps to promote a \"gay agenda.\"</b> And she responded in classic Ellen fashion.",
               "image" : "http://s3-ak.buzzfeed.com/static/2015-01/14/10/campaign_images/webdr11/ellen-degeneres-shut-down-an-anti-gay-pastor-2-13730-1421248172-16.jpg",
               "old" : "0",
               "promotion_medium_id" : "1",
               "flexpro_recipients" : "",
               "title" : "Ellen Shut Down An Anti-Gay Pastor For Saying She Promotes A \"Gay Agenda\"",
               "image_wide" : "/static/2015-01/14/10/campaign_images/webdr11/ellen-degeneres-shut-down-an-anti-gay-pastor-2-13730-1421248172-16_wide.jpg",
               "original_image" : "/static/2015-01/14/9/enhanced/webdr07/original-17726-1421247150-10.png"
            },
            {
               "width" : "125",
               "extra_fields" : {
                  "small" : {
                     "width" : 418,
                     "left" : 174,
                     "top" : 14,
                     "height" : 277
                  },
                  "big" : {
                     "width" : 763,
                     "left" : 0,
                     "top" : -46,
                     "height" : 507
                  },
                  "wide" : {
                     "width" : 763,
                     "left" : 0,
                     "top" : 22,
                     "height" : 268
                  }
               },
               "image_dblwide" : "/static/2015-01/14/10/campaign_images/webdr11/ellen-degeneres-shut-down-an-anti-gay-pastor-2-13730-1421248175-19_dblwide.jpg",
               "clicks" : "2626",
               "dud" : "0",
               "added" : "2015-01-14 10:09:36",
               "campaign_id" : "3575088",
               "rate" : 0.00585123687036814,
               "impressions" : "448794",
               "image_id" : "124301",
               "original_image_width" : "418",
               "promoter" : "935435",
               "updated" : "2015-01-16 21:18:22",
               "id" : "174623",
               "image_dblbig" : "/static/2015-01/14/10/campaign_images/webdr11/ellen-degeneres-shut-down-an-anti-gay-pastor-2-13730-1421248175-19_dblbig.jpg",
               "is_default" : "0",
               "promotion_image_id" : "124301",
               "sub_buzz_id" : "0",
               "image_big" : "/static/2015-01/14/10/campaign_images/webdr11/ellen-degeneres-shut-down-an-anti-gay-pastor-2-13730-1421248175-19_big.jpg",
               "probability" : 0.0327818731071576,
               "active" : "1",
               "original_image_height" : "415",
               "height" : "83",
               "description" : "<b>The pastor and author had written that she helps to promote a \"gay agenda.\"</b> And she responded in classic Ellen fashion.",
               "image" : "http://s3-ak.buzzfeed.com/static/2015-01/14/10/campaign_images/webdr11/ellen-degeneres-shut-down-an-anti-gay-pastor-2-13730-1421248175-19.jpg",
               "old" : "0",
               "promotion_medium_id" : "1",
               "flexpro_recipients" : "",
               "title" : "Ellen DeGeneres Took Down An Anti-Gay Pastor In The Best Way Today",
               "image_wide" : "/static/2015-01/14/10/campaign_images/webdr11/ellen-degeneres-shut-down-an-anti-gay-pastor-2-13730-1421248175-19_wide.jpg",
               "original_image" : "/static/2015-01/14/10/enhanced/webdr08/original-20901-1421248141-10.png"
            },
            {
               "width" : "125",
               "extra_fields" : {
                  "small" : {
                     "width" : 507,
                     "left" : 146,
                     "top" : 16,
                     "height" : 336
                  },
                  "big" : {
                     "width" : 368,
                     "left" : 188,
                     "top" : 26,
                     "height" : 244
                  },
                  "wide" : {
                     "width" : 625,
                     "left" : 72,
                     "top" : 29,
                     "height" : 220
                  }
               },
               "image_dblwide" : "/static/2015-01/14/10/campaign_images/webdr11/ellen-degeneres-shut-down-an-anti-gay-pastor-2-13730-1421248172-16_dblwide.jpg",
               "clicks" : "4382",
               "dud" : "0",
               "added" : "2015-01-14 10:09:36",
               "campaign_id" : "3575088",
               "rate" : 0.00608452237471327,
               "impressions" : "720188",
               "image_id" : "124300",
               "original_image_width" : "760",
               "promoter" : "935435",
               "updated" : "2015-01-16 21:10:05",
               "id" : "174626",
               "image_dblbig" : "/static/2015-01/14/10/campaign_images/webdr11/ellen-degeneres-shut-down-an-anti-gay-pastor-2-13730-1421248172-16_dblbig.jpg",
               "is_default" : "0",
               "promotion_image_id" : "124300",
               "sub_buzz_id" : "0",
               "image_big" : "/static/2015-01/14/10/campaign_images/webdr11/ellen-degeneres-shut-down-an-anti-gay-pastor-2-13730-1421248172-16_big.jpg",
               "probability" : 0.0589272206588677,
               "active" : "1",
               "original_image_height" : "415",
               "height" : "83",
               "description" : "<b>The pastor and author had written that she helps to promote a \"gay agenda.\"</b> And she responded in classic Ellen fashion.",
               "image" : "http://s3-ak.buzzfeed.com/static/2015-01/14/10/campaign_images/webdr11/ellen-degeneres-shut-down-an-anti-gay-pastor-2-13730-1421248172-16.jpg",
               "old" : "0",
               "promotion_medium_id" : "1",
               "flexpro_recipients" : "",
               "title" : "Ellen DeGeneres Shut Down An Anti-Gay Pastor In The Most Amazing Way",
               "image_wide" : "/static/2015-01/14/10/campaign_images/webdr11/ellen-degeneres-shut-down-an-anti-gay-pastor-2-13730-1421248172-16_wide.jpg",
               "original_image" : "/static/2015-01/14/9/enhanced/webdr07/original-17726-1421247150-10.png"
            },
            {
               "width" : "125",
               "extra_fields" : {
                  "small" : {
                     "width" : 507,
                     "left" : 146,
                     "top" : 16,
                     "height" : 336
                  },
                  "big" : {
                     "width" : 368,
                     "left" : 188,
                     "top" : 26,
                     "height" : 244
                  },
                  "wide" : {
                     "width" : 625,
                     "left" : 72,
                     "top" : 29,
                     "height" : 220
                  }
               },
               "image_dblwide" : "/static/2015-01/14/10/campaign_images/webdr11/ellen-degeneres-shut-down-an-anti-gay-pastor-2-13730-1421248172-16_dblwide.jpg",
               "clicks" : "17248",
               "dud" : "0",
               "added" : "2015-01-14 13:57:14",
               "campaign_id" : "3575088",
               "rate" : 0.00720424803363876,
               "impressions" : "2394143",
               "image_id" : "124300",
               "original_image_width" : "760",
               "promoter" : "935435",
               "updated" : "2015-01-16 21:08:32",
               "id" : "174800",
               "image_dblbig" : "/static/2015-01/14/10/campaign_images/webdr11/ellen-degeneres-shut-down-an-anti-gay-pastor-2-13730-1421248172-16_dblbig.jpg",
               "is_default" : "0",
               "promotion_image_id" : "124300",
               "sub_buzz_id" : "0",
               "image_big" : "/static/2015-01/14/10/campaign_images/webdr11/ellen-degeneres-shut-down-an-anti-gay-pastor-2-13730-1421248172-16_big.jpg",
               "probability" : 0.74258884358859,
               "active" : "1",
               "original_image_height" : "415",
               "height" : "83",
               "description" : "<b>The pastor and author had written that she helps to promote a \"gay agenda.\"</b> And she responded in classic Ellen fashion.",
               "image" : "http://s3-ak.buzzfeed.com/static/2015-01/14/10/campaign_images/webdr11/ellen-degeneres-shut-down-an-anti-gay-pastor-2-13730-1421248172-16.jpg",
               "old" : "0",
               "promotion_medium_id" : "1",
               "flexpro_recipients" : "",
               "title" : "Ellen DeGeneres Shut Down A Homophobic Hater In The Most Awesome Way",
               "image_wide" : "/static/2015-01/14/10/campaign_images/webdr11/ellen-degeneres-shut-down-an-anti-gay-pastor-2-13730-1421248172-16_wide.jpg",
               "original_image" : ""
            },
            {
               "width" : "125",
               "extra_fields" : {
                  "small" : {
                     "width" : 418,
                     "left" : 174,
                     "top" : 14,
                     "height" : 277
                  },
                  "big" : {
                     "width" : 763,
                     "left" : 0,
                     "top" : -46,
                     "height" : 507
                  },
                  "wide" : {
                     "width" : 763,
                     "left" : 0,
                     "top" : 22,
                     "height" : 268
                  }
               },
               "image_dblwide" : "/static/2015-01/14/10/campaign_images/webdr11/ellen-degeneres-shut-down-an-anti-gay-pastor-2-13730-1421248175-19_dblwide.jpg",
               "clicks" : "5237",
               "dud" : "0",
               "added" : "2015-01-14 10:09:36",
               "campaign_id" : "3575088",
               "rate" : 0.00608145927152549,
               "impressions" : "861142",
               "image_id" : "124301",
               "original_image_width" : "418",
               "promoter" : "935435",
               "updated" : "2015-01-16 21:11:23",
               "id" : "174627",
               "image_dblbig" : "/static/2015-01/14/10/campaign_images/webdr11/ellen-degeneres-shut-down-an-anti-gay-pastor-2-13730-1421248175-19_dblbig.jpg",
               "is_default" : "0",
               "promotion_image_id" : "124301",
               "sub_buzz_id" : "0",
               "image_big" : "/static/2015-01/14/10/campaign_images/webdr11/ellen-degeneres-shut-down-an-anti-gay-pastor-2-13730-1421248175-19_big.jpg",
               "probability" : 0.0584838034438628,
               "active" : "1",
               "original_image_height" : "415",
               "height" : "83",
               "description" : "<b>The pastor and author had written that she helps to promote a \"gay agenda.\"</b> And she responded in classic Ellen fashion.",
               "image" : "http://s3-ak.buzzfeed.com/static/2015-01/14/10/campaign_images/webdr11/ellen-degeneres-shut-down-an-anti-gay-pastor-2-13730-1421248175-19.jpg",
               "old" : "0",
               "promotion_medium_id" : "1",
               "flexpro_recipients" : "",
               "title" : "Ellen DeGeneres Shut Down An Anti-Gay Pastor In The Most Amazing Way",
               "image_wide" : "/static/2015-01/14/10/campaign_images/webdr11/ellen-degeneres-shut-down-an-anti-gay-pastor-2-13730-1421248175-19_wide.jpg",
               "original_image" : "/static/2015-01/14/10/enhanced/webdr08/original-20901-1421248141-10.png"
            }
         ],
         "byline_description_visual" : "BuzzFeed News Reporter",
         "display_name" : "Rachel Zarrell",
         "image" : "http://s3-ak.buzzfed.com/static/2015-01/14/13/campaign_images/webdr05/ellen-degeneres-shut-down-an-anti-gay-pastor-in-t-2-8980-1421260188-9.jpg",
         "byline_description_id" : "2",
         "static_images" : {
            "small" : "http://s3-static-ak.buzzfed.com/static/2015-01/14/13/campaign_images/webdr05/ellen-degeneres-shut-down-an-anti-gay-pastor-in-t-2-8980-1421260188-9_small.jpg",
            "standard" : "http://s3-static-ak.buzzfed.com/static/2015-01/14/13/campaign_images/webdr05/ellen-degeneres-shut-down-an-anti-gay-pastor-in-t-2-8980-1421260188-9.jpg",
            "big" : "http://s3-static-ak.buzzfed.com/static/2015-01/14/13/campaign_images/webdr05/ellen-degeneres-shut-down-an-anti-gay-pastor-in-t-2-8980-1421260188-9_big.jpg",
            "wide" : "http://s3-static-ak.buzzfed.com/static/2015-01/14/13/campaign_images/webdr05/ellen-degeneres-shut-down-an-anti-gay-pastor-in-t-2-8980-1421260188-9_wide.jpg",
            "dblbig" : "http://s3-static-ak.buzzfed.com/static/2015-01/14/13/campaign_images/webdr05/ellen-degeneres-shut-down-an-anti-gay-pastor-in-t-2-8980-1421260188-9_dblbig.jpg",
            "dblwide" : "http://s3-static-ak.buzzfed.com/static/2015-01/14/13/campaign_images/webdr05/ellen-degeneres-shut-down-an-anti-gay-pastor-in-t-2-8980-1421260188-9_dblwide.jpg"
         },
         "image_small" : "http://s3-ak.buzzfed.com/static/2015-01/14/13/campaign_images/webdr05/ellen-degeneres-shut-down-an-anti-gay-pastor-in-t-2-8980-1421260188-9_small.jpg",
         "html_blurb" : "<b><big>Ellen DeGeneres Shut Down An Anti-Gay Pastor In The Most Amazing Way</big></b><br/><b>The pastor and author had written that she helps to promote a \"gay agenda.\"</b> And she responded in classic Ellen fashion.<br/><table><tr><td width='30' padding='0 0'><img src='http://s3-ak.buzzfed.com/static/2014-10/8/16/user_images/webdr07/rachelzarrell-22656-1412801193-17.jpg' width='25' height='25'/></td><td padding='5' pspacing='0'><small><b><a href='/rachelzarrell'>Rachel Zarrell</a></b></small><br/><small><color value='#939393'>BuzzFeed News Reporter</color></small></td></tr></table>"
      },
      {
         "bid" : "7EW42I7",
         "user_type" : "f_other",
         "form" : "super",
         "user" : "danieldalton",
         "url" : "http://www.buzzfeed.com/danieldalton/boss-witch",
         "comments_count" : 29,
         "last_updated" : "2015-01-16 21:19:47",
         "images" : "",
         "uid" : "75UBNM7",
         "sub_buzz" : "",
         "name" : "If Hermione Were The Main Character In \"Harry Potter\"",
         "uri" : "boss-witch",
         "cloud_servers" : [
            "newbuzz-collection-1925855828.us-east-1.elb.amazonaws.com"
         ],
         "username" : "danieldalton",
         "published" : "2015-01-16 09:00:08",
         "published_unix" : "1421416808",
         "ad_blurb" : "<b><i>Hermione Granger and the Goddamn Patriarchy</i>.</b>",
         "nsfw" : "false",
         "status" : "live",
         "ct" : "http://75.101.183.223/small.gif?type=100,14&user=danieldalton&buzz=boss-witch&c=7EW42I7&u=75UBNM7&url=http%3A%2F%2Fbuzzfeed.com%2Fdanieldalton%2Fboss-witch%2F&rd=http%3A%2F%2Fbuzzfeed.com%2Fdanieldalton%2Fboss-witch%2F",
         "impressions" : "973866",
         "mobile_image" : "1",
         "user_image" : "http://s3-ak.buzzfed.com/static/2014-04/user_images/webdr03/7/10/danieldalton-5871-1396881655-0.jpg",
         "blurb" : "Hermione Granger and the Goddamn Patriarchy.",
         "promotions" : [
            {
               "width" : "125",
               "extra_fields" : {
                  "small" : {
                     "width" : 953,
                     "left" : 381,
                     "top" : 26,
                     "height" : 632
                  },
                  "big" : {
                     "width" : 878,
                     "left" : 399,
                     "top" : 41,
                     "height" : 582
                  },
                  "wide" : {
                     "width" : 1728,
                     "left" : 0,
                     "top" : 36,
                     "height" : 608
                  }
               },
               "image_dblwide" : "/static/2015-01/16/9/campaign_images/webdr08/boss-witch-2-27708-1421416912-4_dblwide.jpg",
               "clicks" : "9912",
               "dud" : "0",
               "added" : "2015-01-16 09:01:53",
               "campaign_id" : "3573263",
               "rate" : 0.00618418540577166,
               "impressions" : "1602798",
               "image_id" : "125035",
               "original_image_width" : "1920",
               "promoter" : "1401831",
               "updated" : "2015-01-16 21:19:47",
               "id" : "175917",
               "image_dblbig" : "/static/2015-01/16/9/campaign_images/webdr08/boss-witch-2-27708-1421416912-4_dblbig.jpg",
               "is_default" : "0",
               "promotion_image_id" : "125035",
               "sub_buzz_id" : "0",
               "image_big" : "/static/2015-01/16/9/campaign_images/webdr08/boss-witch-2-27708-1421416912-4_big.jpg",
               "probability" : 0.689599519568745,
               "active" : "1",
               "original_image_height" : "800",
               "height" : "83",
               "description" : "<b><i>Hermione Granger and the Goddamn Patriarchy</i>.</b>",
               "image" : "http://s3-ak.buzzfeed.com/static/2015-01/16/9/campaign_images/webdr08/boss-witch-2-27708-1421416912-4.jpg",
               "old" : "0",
               "promotion_medium_id" : "1",
               "flexpro_recipients" : "",
               "title" : "If JK Rowling Had Written \"Harry Potter\" From Hermione's Perspective",
               "image_wide" : "/static/2015-01/16/9/campaign_images/webdr08/boss-witch-2-27708-1421416912-4_wide.jpg",
               "original_image" : "/static/2015-01/15/17/enhanced/webdr05/original-9434-1421361655-8.jpg"
            },
            {
               "width" : "125",
               "extra_fields" : {
                  "small" : {
                     "width" : 953,
                     "left" : 381,
                     "top" : 26,
                     "height" : 632
                  },
                  "big" : {
                     "width" : 878,
                     "left" : 399,
                     "top" : 41,
                     "height" : 582
                  },
                  "wide" : {
                     "width" : 1728,
                     "left" : 0,
                     "top" : 36,
                     "height" : 608
                  }
               },
               "image_dblwide" : "/static/2015-01/16/9/campaign_images/webdr08/boss-witch-2-27708-1421416912-4_dblwide.jpg",
               "clicks" : "7841",
               "dud" : "0",
               "added" : "2015-01-16 09:01:56",
               "campaign_id" : "3573263",
               "rate" : 0.00586368813345368,
               "impressions" : "1337213",
               "image_id" : "125035",
               "original_image_width" : "1920",
               "promoter" : "1401831",
               "updated" : "2015-01-16 21:16:41",
               "id" : "175919",
               "image_dblbig" : "/static/2015-01/16/9/campaign_images/webdr08/boss-witch-2-27708-1421416912-4_dblbig.jpg",
               "is_default" : "0",
               "promotion_image_id" : "125035",
               "sub_buzz_id" : "0",
               "image_big" : "/static/2015-01/16/9/campaign_images/webdr08/boss-witch-2-27708-1421416912-4_big.jpg",
               "probability" : 0.310400480431255,
               "active" : "1",
               "original_image_height" : "800",
               "height" : "83",
               "description" : "<b><i>Hermione Granger and the Goddamn Patriarchy</i>.</b>",
               "image" : "http://s3-ak.buzzfeed.com/static/2015-01/16/9/campaign_images/webdr08/boss-witch-2-27708-1421416912-4.jpg",
               "old" : "0",
               "promotion_medium_id" : "1",
               "flexpro_recipients" : "",
               "title" : "If Hermione Were The Main Character In \"Harry Potter\"",
               "image_wide" : "/static/2015-01/16/9/campaign_images/webdr08/boss-witch-2-27708-1421416912-4_wide.jpg",
               "original_image" : "/static/2015-01/15/17/enhanced/webdr05/original-9434-1421361655-8.jpg"
            }
         ],
         "byline_description_visual" : "BuzzFeed Staff",
         "display_name" : "Daniel Dalton",
         "image" : "http://s3-ak.buzzfed.com/static/2015-01/16/10/campaign_images/webdr01/if-hermione-were-the-main-character-in-harry-pott-2-17873-1421420684-26.jpg",
         "byline_description_id" : "2",
         "static_images" : {
            "small" : "http://s3-static-ak.buzzfed.com/static/2015-01/16/10/campaign_images/webdr01/if-hermione-were-the-main-character-in-harry-pott-2-17873-1421420684-26_small.jpg",
            "standard" : "http://s3-static-ak.buzzfed.com/static/2015-01/16/10/campaign_images/webdr01/if-hermione-were-the-main-character-in-harry-pott-2-17873-1421420684-26.jpg",
            "big" : "http://s3-static-ak.buzzfed.com/static/2015-01/16/10/campaign_images/webdr01/if-hermione-were-the-main-character-in-harry-pott-2-17873-1421420684-26_big.jpg",
            "wide" : "http://s3-static-ak.buzzfed.com/static/2015-01/16/10/campaign_images/webdr01/if-hermione-were-the-main-character-in-harry-pott-2-17873-1421420684-26_wide.jpg",
            "dblbig" : "http://s3-static-ak.buzzfed.com/static/2015-01/16/10/campaign_images/webdr01/if-hermione-were-the-main-character-in-harry-pott-2-17873-1421420684-26_dblbig.jpg",
            "dblwide" : "http://s3-static-ak.buzzfed.com/static/2015-01/16/10/campaign_images/webdr01/if-hermione-were-the-main-character-in-harry-pott-2-17873-1421420684-26_dblwide.jpg"
         },
         "image_small" : "http://s3-ak.buzzfed.com/static/2015-01/16/10/campaign_images/webdr01/if-hermione-were-the-main-character-in-harry-pott-2-17873-1421420684-26_small.jpg",
         "html_blurb" : "<b><big>If Hermione Were The Main Character In \"Harry Potter\"</big></b><br/><b><i>Hermione Granger and the Goddamn Patriarchy</i>.</b><br/><table><tr><td width='30' padding='0 0'><img src='http://s3-ak.buzzfed.com/static/2014-04/user_images/webdr03/7/10/danieldalton-5871-1396881655-0.jpg' width='25' height='25'/></td><td padding='5' pspacing='0'><small><b><a href='/danieldalton'>Daniel Dalton</a></b></small><br/><small><color value='#939393'>BuzzFeed Staff</color></small></td></tr></table>"
      },
      {
         "bid" : "7EVOOX7",
         "user_type" : "f_other",
         "form" : "super-image",
         "user" : "jessicamisener",
         "url" : "http://www.buzzfeed.com/jessicamisener/things-youve-gone-too-long-without-knowing",
         "comments_count" : 17,
         "last_updated" : "2015-01-16 21:17:25",
         "images" : "",
         "uid" : "71F9CC7",
         "sub_buzz" : "",
         "name" : "13 Things You've Gone Too Long Without Knowing",
         "uri" : "things-youve-gone-too-long-without-knowing",
         "cloud_servers" : [
            "newbuzz-collection-1925855828.us-east-1.elb.amazonaws.com"
         ],
         "username" : "jessicamisener",
         "published" : "2015-01-15 13:10:16",
         "published_unix" : "1421345416",
         "ad_blurb" : "<b>But there's no day like today!</b>",
         "nsfw" : "false",
         "status" : "live",
         "ct" : "http://75.101.183.223/small.gif?type=100,14&user=jessicamisener&buzz=things-youve-gone-too-long-without-knowing&c=7EVOOX7&u=71F9CC7&url=http%3A%2F%2Fbuzzfeed.com%2Fjessicamisener%2Fthings-youve-gone-too-long-without-knowing%2F&rd=http%3A%2F%2Fbuzzfeed.com%2Fjessicamisener%2Fthings-youve-gone-too-long-without-knowing%2F",
         "impressions" : "554732",
         "mobile_image" : "1",
         "user_image" : "http://s3-ak.buzzfed.com/static/user_images/webdr06/2013/6/24/14/jessicamisener-15155-1372097637-27.jpg",
         "blurb" : "But there&#39;s no day like today!",
         "promotions" : [
            {
               "width" : "125",
               "extra_fields" : {
                  "small" : {
                     "width" : "662",
                     "left" : 0,
                     "top" : 0,
                     "height" : 439
                  },
                  "big" : {
                     "width" : "662",
                     "left" : 0,
                     "top" : 0,
                     "height" : 439
                  },
                  "wide" : {
                     "width" : "662",
                     "left" : 0,
                     "top" : 148,
                     "height" : 233
                  }
               },
               "image_dblwide" : "/static/2015-01/15/13/campaign_images/webdr09/things-youve-gone-too-long-without-knowing-2-12400-1421345469-7_dblwide.jpg",
               "clicks" : "3353",
               "dud" : "0",
               "added" : "2015-01-15 13:11:10",
               "campaign_id" : "3570416",
               "rate" : 0.013084214264252,
               "impressions" : "256263",
               "image_id" : "124763",
               "original_image_width" : "662",
               "promoter" : "341645",
               "updated" : "2015-01-16 21:13:38",
               "id" : "175418",
               "image_dblbig" : "/static/2015-01/15/13/campaign_images/webdr09/things-youve-gone-too-long-without-knowing-2-12400-1421345469-7_dblbig.jpg",
               "is_default" : "0",
               "promotion_image_id" : "124763",
               "sub_buzz_id" : "4679933",
               "image_big" : "/static/2015-01/15/13/campaign_images/webdr09/things-youve-gone-too-long-without-knowing-2-12400-1421345469-7_big.jpg",
               "probability" : 0.058389461804443,
               "active" : "1",
               "original_image_height" : "530",
               "height" : "83",
               "description" : "<b>But there's no day like today!</b>",
               "image" : "http://s3-ak.buzzfeed.com/static/2015-01/15/13/campaign_images/webdr09/things-youve-gone-too-long-without-knowing-2-12400-1421345469-7.jpg",
               "old" : "0",
               "promotion_medium_id" : "1",
               "flexpro_recipients" : "",
               "title" : "13 Things You've Gone Too Long Without Knowing",
               "image_wide" : "/static/2015-01/15/13/campaign_images/webdr09/things-youve-gone-too-long-without-knowing-2-12400-1421345469-7_wide.jpg",
               "original_image" : ""
            },
            {
               "width" : "125",
               "extra_fields" : {
                  "small" : {
                     "width" : 674,
                     "left" : 117,
                     "top" : 0,
                     "height" : 448
                  },
                  "big" : {
                     "width" : 990,
                     "left" : 0,
                     "top" : -105,
                     "height" : 658
                  },
                  "wide" : {
                     "width" : 990,
                     "left" : 0,
                     "top" : 50,
                     "height" : 349
                  }
               },
               "image_dblwide" : "/static/2015-01/15/14/campaign_images/webdr07/things-youve-gone-too-long-without-knowing-2-26237-1421348997-25_dblwide.jpg",
               "clicks" : "25689",
               "dud" : "0",
               "added" : "2015-01-15 14:09:58",
               "campaign_id" : "3570416",
               "rate" : 0.0157488955726041,
               "impressions" : "1631162",
               "image_id" : "124804",
               "original_image_width" : "674",
               "promoter" : "341645",
               "updated" : "2015-01-16 21:17:25",
               "id" : "175477",
               "image_dblbig" : "/static/2015-01/15/14/campaign_images/webdr07/things-youve-gone-too-long-without-knowing-2-26237-1421348997-25_dblbig.jpg",
               "is_default" : "1",
               "promotion_image_id" : "124804",
               "sub_buzz_id" : "0",
               "image_big" : "/static/2015-01/15/14/campaign_images/webdr07/things-youve-gone-too-long-without-knowing-2-26237-1421348997-25_big.jpg",
               "probability" : 0.941610538195557,
               "active" : "1",
               "original_image_height" : "453",
               "height" : "83",
               "description" : "<b>But there's no day like today!</b>",
               "image" : "http://s3-ak.buzzfeed.com/static/2015-01/15/14/campaign_images/webdr07/things-youve-gone-too-long-without-knowing-2-26237-1421348997-25.jpg",
               "old" : "0",
               "promotion_medium_id" : "1",
               "flexpro_recipients" : "",
               "title" : "13 Things You've Gone Too Long Without Knowing",
               "image_wide" : "/static/2015-01/15/14/campaign_images/webdr07/things-youve-gone-too-long-without-knowing-2-26237-1421348997-25_wide.jpg",
               "original_image" : "/static/2015-01/15/14/enhanced/webdr01/original-29618-1421348977-20.png"
            }
         ],
         "byline_description_visual" : "BuzzFeed Staff",
         "display_name" : "Jessica Misener",
         "image" : "http://s3-ak.buzzfed.com/static/2015-01/16/14/campaign_images/webdr12/13-things-youve-gone-too-long-without-knowing-2-21366-1421437719-7.jpg",
         "byline_description_id" : "2",
         "static_images" : {
            "small" : "http://s3-static-ak.buzzfed.com/static/2015-01/16/14/campaign_images/webdr12/13-things-youve-gone-too-long-without-knowing-2-21366-1421437719-7_small.jpg",
            "standard" : "http://s3-static-ak.buzzfed.com/static/2015-01/16/14/campaign_images/webdr12/13-things-youve-gone-too-long-without-knowing-2-21366-1421437719-7.jpg",
            "big" : "http://s3-static-ak.buzzfed.com/static/2015-01/16/14/campaign_images/webdr12/13-things-youve-gone-too-long-without-knowing-2-21366-1421437719-7_big.jpg",
            "wide" : "http://s3-static-ak.buzzfed.com/static/2015-01/16/14/campaign_images/webdr12/13-things-youve-gone-too-long-without-knowing-2-21366-1421437719-7_wide.jpg",
            "dblbig" : "http://s3-static-ak.buzzfed.com/static/2015-01/16/14/campaign_images/webdr12/13-things-youve-gone-too-long-without-knowing-2-21366-1421437719-7_dblbig.jpg",
            "dblwide" : "http://s3-static-ak.buzzfed.com/static/2015-01/16/14/campaign_images/webdr12/13-things-youve-gone-too-long-without-knowing-2-21366-1421437719-7_dblwide.jpg"
         },
         "image_small" : "http://s3-ak.buzzfed.com/static/2015-01/16/14/campaign_images/webdr12/13-things-youve-gone-too-long-without-knowing-2-21366-1421437719-7_small.jpg",
         "html_blurb" : "<b><big>13 Things You've Gone Too Long Without Knowing</big></b><br/><b>But there's no day like today!</b><br/><table><tr><td width='30' padding='0 0'><img src='http://s3-ak.buzzfed.com/static/user_images/webdr06/2013/6/24/14/jessicamisener-15155-1372097637-27.jpg' width='25' height='25'/></td><td padding='5' pspacing='0'><small><b><a href='/jessicamisener'>Jessica Misener</a></b></small><br/><small><color value='#939393'>BuzzFeed Staff</color></small></td></tr></table>"
      },
      {
         "bid" : "7EWMJB7",
         "user_type" : "f_other",
         "form" : "super",
         "user" : "maycie",
         "url" : "http://www.buzzfeed.com/maycie/watch-100-years-of-black-hairstyles-in-less-than-a-minute",
         "comments_count" : 40,
         "last_updated" : "2015-01-16 21:18:41",
         "images" : "",
         "uid" : "72Y6437",
         "sub_buzz" : "",
         "name" : "Watch 100 Years Of Black Hairstyles In Less Than A Minute",
         "uri" : "watch-100-years-of-black-hairstyles-in-less-than-a-minute",
         "cloud_servers" : [
            "newbuzz-collection-1925855828.us-east-1.elb.amazonaws.com"
         ],
         "username" : "maycie",
         "published" : "2015-01-15 17:10:25",
         "published_unix" : "1421359825",
         "ad_blurb" : "<b>Through the last century one thing has remained constant \u2014 women were always beautiful.</b>",
         "nsfw" : "false",
         "status" : "live",
         "ct" : "http://75.101.183.223/small.gif?type=100,14&user=maycie&buzz=watch-100-years-of-black-hairstyles-in-less-than-a-minute&c=7EWMJB7&u=72Y6437&url=http%3A%2F%2Fbuzzfeed.com%2Fmaycie%2Fwatch-100-years-of-black-hairstyles-in-less-than-a-minute%2F&rd=http%3A%2F%2Fbuzzfeed.com%2Fmaycie%2Fwatch-100-years-of-black-hairstyles-in-less-than-a-minute%2F",
         "impressions" : "516790",
         "mobile_image" : "1",
         "user_image" : "http://s3-ak.buzzfed.com/static/user_images/webdr06/2013/5/15/19/maycie-32615-1368659410-12.jpg",
         "blurb" : "Through the last century one thing has remained constant &mdash; women were always beautiful.",
         "promotions" : [
            {
               "width" : "125",
               "extra_fields" : {
                  "small" : {
                     "width" : 544,
                     "left" : 82,
                     "top" : 89,
                     "height" : 361
                  },
                  "big" : {
                     "width" : 625,
                     "left" : 132,
                     "top" : 35,
                     "height" : 415
                  },
                  "wide" : {
                     "width" : 814,
                     "left" : 0,
                     "top" : 79,
                     "height" : 286
                  }
               },
               "image_dblwide" : "/static/2015-01/15/17/campaign_images/webdr06/watch-100-years-of-black-hairstyles-in-less-than--2-10171-1421360038-21_dblwide.jpg",
               "clicks" : "19981",
               "dud" : "0",
               "added" : "2015-01-15 17:14:00",
               "campaign_id" : "3576682",
               "rate" : 0.00552015917596271,
               "impressions" : "3619642",
               "image_id" : "124878",
               "original_image_width" : "544",
               "promoter" : "707630",
               "updated" : "2015-01-16 21:14:16",
               "id" : "175645",
               "image_dblbig" : "/static/2015-01/15/17/campaign_images/webdr06/watch-100-years-of-black-hairstyles-in-less-than--2-10171-1421360038-21_dblbig.jpg",
               "is_default" : "1",
               "promotion_image_id" : "124878",
               "sub_buzz_id" : "0",
               "image_big" : "/static/2015-01/15/17/campaign_images/webdr06/watch-100-years-of-black-hairstyles-in-less-than--2-10171-1421360038-21_big.jpg",
               "probability" : 1,
               "active" : "1",
               "original_image_height" : "450",
               "height" : "83",
               "description" : "<b>Through the last century one thing has remained constant \u2014 women were always beautiful.</b>",
               "image" : "http://s3-ak.buzzfeed.com/static/2015-01/15/17/campaign_images/webdr06/watch-100-years-of-black-hairstyles-in-less-than--2-10171-1421360038-21.jpg",
               "old" : "0",
               "promotion_medium_id" : "1",
               "flexpro_recipients" : "",
               "title" : "Watch 100 Years Of Black Hairstyles In Less Than A Minute",
               "image_wide" : "/static/2015-01/15/17/campaign_images/webdr06/watch-100-years-of-black-hairstyles-in-less-than--2-10171-1421360038-21_wide.jpg",
               "original_image" : "/static/2015-01/15/17/enhanced/webdr09/original-13828-1421359922-14.png"
            }
         ],
         "byline_description_visual" : "BuzzFeed, Video Curator",
         "display_name" : "Maycie Thornton",
         "image" : "http://s3-ak.buzzfed.com/static/2015-01/15/17/campaign_images/webdr06/watch-100-years-of-black-hairstyles-in-less-than--2-10171-1421360038-21.jpg",
         "byline_description_id" : "2",
         "static_images" : {
            "small" : "http://s3-static-ak.buzzfed.com/static/2015-01/15/17/campaign_images/webdr06/watch-100-years-of-black-hairstyles-in-less-than--2-10171-1421360038-21_small.jpg",
            "standard" : "http://s3-static-ak.buzzfed.com/static/2015-01/15/17/campaign_images/webdr06/watch-100-years-of-black-hairstyles-in-less-than--2-10171-1421360038-21.jpg",
            "big" : "http://s3-static-ak.buzzfed.com/static/2015-01/15/17/campaign_images/webdr06/watch-100-years-of-black-hairstyles-in-less-than--2-10171-1421360038-21_big.jpg",
            "wide" : "http://s3-static-ak.buzzfed.com/static/2015-01/15/17/campaign_images/webdr06/watch-100-years-of-black-hairstyles-in-less-than--2-10171-1421360038-21_wide.jpg",
            "dblbig" : "http://s3-static-ak.buzzfed.com/static/2015-01/15/17/campaign_images/webdr06/watch-100-years-of-black-hairstyles-in-less-than--2-10171-1421360038-21_dblbig.jpg",
            "dblwide" : "http://s3-static-ak.buzzfed.com/static/2015-01/15/17/campaign_images/webdr06/watch-100-years-of-black-hairstyles-in-less-than--2-10171-1421360038-21_dblwide.jpg"
         },
         "image_small" : "http://s3-ak.buzzfed.com/static/2015-01/15/17/campaign_images/webdr06/watch-100-years-of-black-hairstyles-in-less-than--2-10171-1421360038-21_small.jpg",
         "html_blurb" : "<b><big>Watch 100 Years Of Black Hairstyles In Less Than A Minute</big></b><br/><b>Through the last century one thing has remained constant \u2014 women were always beautiful.</b><br/><table><tr><td width='30' padding='0 0'><img src='http://s3-ak.buzzfed.com/static/user_images/webdr06/2013/5/15/19/maycie-32615-1368659410-12.jpg' width='25' height='25'/></td><td padding='5' pspacing='0'><small><b><a href='/maycie'>Maycie Thornton</a></b></small><br/><small><color value='#939393'>BuzzFeed, Video Curator</color></small></td></tr></table>"
      }
   ],
   "no_shell" : null
}
;var uw_impression=function(){bf_widget.d={type:[],buzzid:[],user:[],buzz:[],userid:[],query:[]};var num_displayed=BF_DISPLAYED_BUZZ.length;var buzzes=BF_DISPLAYED_BUZZ;for(var i=0;i<num_displayed;i++)
{var buzz=buzzes[i];bf_widget.d.type.push((typeof buzz['b']!='undefined')?bf_widget.boost_impression_type:bf_widget.impression_type);bf_widget.d.buzzid.push(buzz.bid);bf_widget.d.userid.push(buzz.uid);bf_widget.d.buzz.push(buzz.uri);bf_widget.d.user.push(buzz.user);if(bf_widget.is_dfp_on_buzzfeed&&typeof BF_DATA['position_id']!='undefined')
{bf_widget.d.query.push(BF_DATA.position_id);}
if(typeof buzz['flex_pro_id']!='undefined')
{bf_widget.d.type.push(bf_widget.flex_pro_impression_type);bf_widget.d.buzzid.push(buzz.bid);bf_widget.d.userid.push(buzz.uid);bf_widget.d.buzz.push(buzz.uri);bf_widget.d.user.push(buzz.user);bf_widget.d.query.push(buzz['flex_pro_id']);}}
var track_url="http://"+(bf_widget.servers[Math.floor(Math.random()*bf_widget.servers.length)])+"/small.gif?";track_url+="type="+bf_widget.d.type.join(",");track_url+="&c="+bf_widget.d.buzzid.join(",");track_url+="&buzz="+bf_widget.d.buzz.join(",");track_url+="&u="+bf_widget.d.userid.join(",");track_url+="&user="+bf_widget.d.user.join(",");track_url+="&query="+bf_widget.d.query.join(",");if(!bf_widget.is_dfp)
{track_url+="&url="+escape(window.location.href);}
track_url+="&z="+Math.floor((Math.random()*10000));BF_W.record_pixel(track_url);if(typeof window['BF_DFP_IMP']!='undefined')
{BF_W.record_pixel(BF_DFP_IMP);}
if(BF_DATA.wid&&typeof window['BF_DFP_IMPS']!='undefined'&&BF_DFP_IMPS[BF_DATA.wid])
{BF_W.record_pixel(BF_DFP_IMPS[BF_DATA.wid]);}
if(typeof(parent.BF_NO_QS)=='undefined'){BF_W.record_pixel("http://pixel.quantserve.com/pixel/p-3aud4J6uA4Z6Y.gif?labels=Widget&busty="+Math.floor((Math.random()*10000)));}}
var uw_click=function(el,buzz,wid){try{if(typeof window['BF_DFP_CLICK']!='undefined')
{BF_W.record_pixel(BF_DFP_CLICK);}
if(wid&&typeof window['BF_DFP_CLICKS']!='undefined'&&BF_DFP_CLICKS[wid])
{BF_W.record_pixel(BF_DFP_CLICKS[wid]);}
var DFP_CLICK=null;if(typeof window['BF_DFP_REDIRECT']!='undefined'){DFP_CLICK=BF_DFP_REDIRECT;}
if(typeof window['BF_DFP_REDIRECTS']!='undefined'&&BF_DFP_REDIRECTS[wid]){DFP_CLICK=BF_DFP_REDIRECTS[wid];}
if(DFP_CLICK)
{el.href=DFP_CLICK+el.href;}
var buzz_url=buzz['user_link']?buzz['user_link']:buzz['url'];bf_widget.d={type:[],buzzid:[],user:[],buzz:[],userid:[],query:[]};bf_widget.d.type.push(((typeof buzz['b']!='undefined')?bf_widget.boost_click_type:bf_widget.click_type));bf_widget.d.buzzid.push(buzz.bid);bf_widget.d.userid.push(buzz.uid);bf_widget.d.buzz.push(buzz.uri);bf_widget.d.user.push(buzz.user);bf_widget.d.query.push((bf_widget.is_dfp_on_buzzfeed&&typeof BF_DATA['position_id']!='undefined')?BF_DATA.position_id:'');if(typeof buzz['flex_pro_id']!='undefined')
{bf_widget.d.type.push(bf_widget.flex_pro_click_type);bf_widget.d.buzzid.push(buzz.bid);bf_widget.d.userid.push(buzz.uid);bf_widget.d.buzz.push(buzz.uri);bf_widget.d.user.push(buzz.user);bf_widget.d.query.push(buzz['flex_pro_id']);}
if(buzz['user_link'])
{bf_widget.d.type.push(23);bf_widget.d.buzzid.push(buzz.bid);bf_widget.d.userid.push(buzz.uid);bf_widget.d.buzz.push(buzz.uri);bf_widget.d.user.push(buzz.user);bf_widget.d.query.push('');}
var track_url="http://"+(bf_widget.servers[Math.floor(Math.random()*bf_widget.servers.length)])+"/small.gif?";track_url+="type="+bf_widget.d.type.join(",");track_url+="&c="+bf_widget.d.buzzid.join(",");track_url+="&buzz="+bf_widget.d.buzz.join(",");track_url+="&u="+bf_widget.d.userid.join(",");track_url+="&user="+bf_widget.d.user.join(",");track_url+="&query="+bf_widget.d.query.join(",");if(!bf_widget.is_dfp)
{track_url+="&url="+escape(window.location.href);}
BF_W.record_pixel(track_url);}catch(e){console.error(e);}};var bf_widget={};bf_widget.servers=["newbuzz-collection-1925855828.us-east-1.elb.amazonaws.com"];bf_widget.is_dfp=(typeof BF_DATA['network']!='undefined');bf_widget.is_dfp_on_buzzfeed=(typeof BF_DATA['network']!='undefined'&&BF_DATA['network']=='buzzfeed');bf_widget.impression_type=(bf_widget.is_dfp_on_buzzfeed)?30:13;bf_widget.click_type=(bf_widget.is_dfp_on_buzzfeed)?35:14;bf_widget.boost_impression_type=32;bf_widget.boost_click_type=37;bf_widget.flex_pro_impression_type=33;bf_widget.flex_pro_click_type=38;if(BF_DATA&&BF_DATA.wid&&BF_DATA.buzz&&BF_DATA.buzz.length>0){BF_W.show_widget(BF_DATA,function(el,buzz,wid){uw_click.call(this,el,buzz,wid)});uw_impression();if(BF_DATA.track){BF_PARTNER.invisible=false;window['BF_SID']=BF_DATA.track;BF_PARTNER.track_page(BF_DATA.track);}}}catch(e){console.error(e);}})();

/* s 21:21:59 01/16/2015 */
/* g 21:31:18 01/16/2015 - sl=41 */ 

var BF_S3_IMAGE_URL='http://s3.amazonaws.com/buzzfeed-media/bigstory/';var BF_W=function(){var buzz_count=((typeof(BF_BUZZ_COUNT)!='undefined')?BF_BUZZ_COUNT:1);var small_image=((typeof(BF_SMALL_IMAGE)!='undefined')?BF_SMALL_IMAGE:false);var image_width=((typeof(BF_SMALL_IMAGE)!='undefined'&&BF_SMALL_IMAGE)?90:125);var image_height=((typeof(BF_SMALL_IMAGE)!='undefined'&&BF_SMALL_IMAGE)?60:83);var head_foot_ids=['bf-powered1','bf-powered2','bf-footer','bf-header'];var apply_styles=function(element,key){if(typeof(bf_styles)!='undefined'){if(bf_styles[key]){for(var style_key in bf_styles[key]){var value=bf_styles[key][style_key];var eval_string="element.style."+style_key+"='"+value+"'";eval(eval_string);}}}};var randomize=function buzz(buzz_data){var bindexes=new Array();for(var i=0;i<buzz_data.length;i++){bindexes.push(i);}
function randOrd(){return(Math.round(Math.random())-0.5);}
bindexes.sort(randOrd);bindexes.sort(randOrd);var random_buzz=new Array();for(i=0;i<buzz_data.length;i++){if(!window.BF_NO_DUPES[buzz_data[bindexes[i]].bid]){random_buzz.push(buzz_data[bindexes[i]]);}}
if(random_buzz.length==0&&buzz_data[0]){random_buzz.push(buzz_data[0]);}
return random_buzz;};var element_handlers={'bf-url':function(el,buzz,wid,click_track_fn){var buzz_url=buzz['user_link']?buzz['user_link']:buzz['url'];el.href=buzz_url;el.setAttribute('href',buzz_url);if(typeof(el.addEventListener)=='undefined'){el.attachEvent('onmousedown',function(e){click_track_fn(el,buzz,wid);});}else{el.addEventListener('mousedown',function(e){click_track_fn(el,buzz,wid);},true);}
if(el.getAttribute('rel:gt_label')&&el.getAttribute('rel:gt_label')=='partner'&&(13==10||13==15)){el.setAttribute('rel:gt_label','partner/'+buzz.username);}},'bf-name':function(el,name){var truncate=el.getAttribute("rel:bf_truncate");if(truncate){if(!isNaN(truncate)){var truncate=parseInt(truncate);if(name.length>truncate){var terminator=el.getAttribute("rel:bf_truncate_terminator");term_length=terminator?terminator.length:3;terminator=terminator?terminator:'&hellip;';var name_length=truncate-term_length;name=name.substring(0,name_length);var words=name.split(/\s+/);if(words[words.length-1].match(/&/)&&!words[words.length-1].match(/;$/)){words.pop();}
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
dfpAdVidReactions=dfpAdEL.select('.badge_list')[0];dfpAdPreviewEL=dfpAdEL.select('.video-preview')[0];if(ie7){if(dfpAdVidReactions)dfpAdVidReactions.hide();dfpAdPreviewEL.remove();var destination=dfpAdEL.select('.video-content')[0];$(dfpAdEL).fire("video:dfp",{src:dfp_video.src_link,wid:13,dfp:true});var so=BF_initSwfObject(dfp_video.src_link,{width:videoDimensions.width,height:videoDimensions.height,autoplay:1,hideYouTubeInfo:1});so.write(destination);if(vidTrackPixelIMG)vidTrackPixelIMG.src=vidTrackRedirect+vidTrackPixelSRC;}else{var vidThumbEL=dfpAdEL.select('.vid-preview-img')[0],thumbIMG=dfp_video.img0||dfp_video.thumbnail;vidThumbEL.setAttribute('src',thumbIMG);vidThumbEL.setAttribute('width','100%');if(dfp_video.thumbnail)dfpAdVidReactions.addClassName('dfp-bf-margin')
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
   "wid" : "13",
   "userbuzz_count" : 1,
   "network" : "buzzfeed",
   "loaded" : "true",
   "buzz" : [
      {
         "bid" : "7ET20P7",
         "user_type" : "f_ad",
         "form" : "super",
         "user" : "syfy",
         "url" : "http://www.buzzfeed.com/syfy/moments-from-our-personal-histories-wed-love-t-6wms",
         "comments_count" : 1,
         "last_updated" : "2015-01-16 21:38:12",
         "images" : "",
         "uid" : "71CCMU7",
         "sub_buzz" : "",
         "name" : "12 Moments From Your Personal History You'd Love To Unmake",
         "uri" : "moments-from-our-personal-histories-wed-love-t-6wms",
         "cloud_servers" : [
            "newbuzz-collection-1925855828.us-east-1.elb.amazonaws.com"
         ],
         "username" : "syfy",
         "published" : "2014-12-30 12:24:03",
         "published_unix" : "1419960243",
         "ad_blurb" : "<b>We've all had moments we'd love to travel back in time and erase.</b> For the characters in the new Syfy series <i>12 Monkeys</i>, those moments come with incredibly high stakes for humanity. <a href=\"http://www.syfy.com/12monkeys\"><i>12&hellip;",
         "nsfw" : "false",
         "status" : "live",
         "ct" : "http://75.101.183.223/small.gif?type=100,14&user=syfy&buzz=moments-from-our-personal-histories-wed-love-t-6wms&c=7ET20P7&u=71CCMU7&url=http%3A%2F%2Fbuzzfeed.com%2Fsyfy%2Fmoments-from-our-personal-histories-wed-love-t-6wms%2F&rd=http%3A%2F%2Fbuzzfeed.com%2Fsyfy%2Fmoments-from-our-personal-histories-wed-love-t-6wms%2F",
         "impressions" : "60319",
         "mobile_image" : "1",
         "user_image" : "http://s3-ak.buzzfed.com/static/2014-12/19/15/user_images/webdr05/syfy-2727-1419020674-0.jpg",
         "blurb" : "We&#39;ve all had moments we&#39;d love to travel back in time and erase. For the characters in the new Syfy series 12 Monkeys, those moments come with incredibly high stakes for humanity. 12 Monkeys premieres January 16 at 9/8c on Syfy.",
         "promotions" : [
            {
               "width" : "125",
               "extra_fields" : {
                  "small" : {
                     "width" : "625",
                     "left" : 0,
                     "top" : 0,
                     "height" : 415
                  },
                  "big" : {
                     "width" : 625,
                     "left" : 0,
                     "top" : 41,
                     "height" : 415
                  },
                  "wide" : {
                     "width" : 625,
                     "left" : 0,
                     "top" : 68,
                     "height" : 220
                  }
               },
               "image_dblwide" : "/static/2014-12/30/12/campaign_images/webdr10/moments-from-our-personal-histories-wed-love-t-6w-2-12544-1419960885-13_dblwide.jpg",
               "clicks" : "233",
               "dud" : "0",
               "added" : "2014-12-30 12:34:55",
               "campaign_id" : "3552888",
               "rate" : 0.00327910380544922,
               "impressions" : "71056",
               "image_id" : "120280",
               "original_image_width" : "625",
               "promoter" : "1390596",
               "updated" : "2015-01-16 21:27:33",
               "id" : "167917",
               "image_dblbig" : "/static/2014-12/30/12/campaign_images/webdr10/moments-from-our-personal-histories-wed-love-t-6w-2-12544-1419960885-13_dblbig.jpg",
               "is_default" : "0",
               "promotion_image_id" : "120280",
               "sub_buzz_id" : "0",
               "image_big" : "/static/2014-12/30/12/campaign_images/webdr10/moments-from-our-personal-histories-wed-love-t-6w-2-12544-1419960885-13_big.jpg",
               "probability" : 2.87681125318507e-05,
               "active" : "1",
               "original_image_height" : "624",
               "height" : "83",
               "description" : "<b>We've all had moments we'd love to travel back in time and erase.</b> For the characters in the new Syfy series <i>12 Monkeys</i>, those moments come with incredibly high stakes for humanity. <a href=\"http://www.syfy.com/12monkeys\"><i>12 Monkeys</i></a> premieres January 16 at 9/8c on Syfy.",
               "image" : "http://s3-ak.buzzfeed.com/static/2014-12/30/12/campaign_images/webdr10/moments-from-our-personal-histories-wed-love-t-6w-2-12544-1419960885-13.jpg",
               "old" : "0",
               "promotion_medium_id" : "1",
               "flexpro_recipients" : "",
               "title" : "12 Moments From Your Personal History You'd Love To Unmake",
               "image_wide" : "/static/2014-12/30/12/campaign_images/webdr10/moments-from-our-personal-histories-wed-love-t-6w-2-12544-1419960885-13_wide.jpg",
               "original_image" : "/static/2014-12/30/12/tmp/webdr12/a5641438dbbe94e30a0bed8fd21f7982-16.jpg"
            },
            {
               "width" : "125",
               "extra_fields" : {
                  "small" : {
                     "width" : 625,
                     "left" : 0,
                     "top" : 0,
                     "height" : 415
                  },
                  "big" : {
                     "width" : 625,
                     "left" : 0,
                     "top" : 0,
                     "height" : 415
                  },
                  "wide" : {
                     "width" : 625,
                     "left" : 0,
                     "top" : 46,
                     "height" : 220
                  }
               },
               "image_dblwide" : "/static/2014-12/30/12/campaign_images/webdr10/moments-from-our-personal-histories-wed-love-t-6w-2-12544-1419960890-19_dblwide.jpg",
               "clicks" : "6669",
               "dud" : "0",
               "added" : "2014-12-30 12:34:51",
               "campaign_id" : "3552888",
               "rate" : 0.00621851811100274,
               "impressions" : "1072442",
               "image_id" : "120282",
               "original_image_width" : "625",
               "promoter" : "1390596",
               "updated" : "2015-01-16 21:36:19",
               "id" : "167911",
               "image_dblbig" : "/static/2014-12/30/12/campaign_images/webdr10/moments-from-our-personal-histories-wed-love-t-6w-2-12544-1419960890-19_dblbig.jpg",
               "is_default" : "0",
               "promotion_image_id" : "120282",
               "sub_buzz_id" : "0",
               "image_big" : "/static/2014-12/30/12/campaign_images/webdr10/moments-from-our-personal-histories-wed-love-t-6w-2-12544-1419960890-19_big.jpg",
               "probability" : 0.424509529371767,
               "active" : "1",
               "original_image_height" : "723",
               "height" : "83",
               "description" : "<b>We've all had moments we'd love to travel back in time and erase.</b> For the characters in the new Syfy series <i>12 Monkeys</i>, those moments come with incredibly high stakes for humanity. <a href=\"http://www.syfy.com/12monkeys\"><i>12 Monkeys</i></a> premieres January 16 at 9/8c on Syfy.",
               "image" : "http://s3-ak.buzzfeed.com/static/2014-12/30/12/campaign_images/webdr10/moments-from-our-personal-histories-wed-love-t-6w-2-12544-1419960890-19.jpg",
               "old" : "0",
               "promotion_medium_id" : "1",
               "flexpro_recipients" : "",
               "title" : "12 Moments From Your Life You Would Totally Undo",
               "image_wide" : "/static/2014-12/30/12/campaign_images/webdr10/moments-from-our-personal-histories-wed-love-t-6w-2-12544-1419960890-19_wide.jpg",
               "original_image" : "/static/2014-12/30/12/tmp/webdr04/61a9f5dc62a7eec473475424f9e84c6b-16.jpg"
            },
            {
               "width" : "125",
               "extra_fields" : {
                  "small" : {
                     "width" : 625,
                     "left" : 0,
                     "top" : 0,
                     "height" : 415
                  },
                  "big" : {
                     "width" : 625,
                     "left" : 0,
                     "top" : 0,
                     "height" : 415
                  },
                  "wide" : {
                     "width" : 625,
                     "left" : 0,
                     "top" : 46,
                     "height" : 220
                  }
               },
               "image_dblwide" : "/static/2014-12/30/12/campaign_images/webdr10/moments-from-our-personal-histories-wed-love-t-6w-2-12544-1419960890-19_dblwide.jpg",
               "clicks" : "519",
               "dud" : "0",
               "added" : "2014-12-30 12:34:55",
               "campaign_id" : "3552888",
               "rate" : 0.00375344427328546,
               "impressions" : "138273",
               "image_id" : "120282",
               "original_image_width" : "625",
               "promoter" : "1390596",
               "updated" : "2015-01-16 21:31:14",
               "id" : "167919",
               "image_dblbig" : "/static/2014-12/30/12/campaign_images/webdr10/moments-from-our-personal-histories-wed-love-t-6w-2-12544-1419960890-19_dblbig.jpg",
               "is_default" : "0",
               "promotion_image_id" : "120282",
               "sub_buzz_id" : "0",
               "image_big" : "/static/2014-12/30/12/campaign_images/webdr10/moments-from-our-personal-histories-wed-love-t-6w-2-12544-1419960890-19_big.jpg",
               "probability" : 0.000218289816759395,
               "active" : "1",
               "original_image_height" : "723",
               "height" : "83",
               "description" : "<b>We've all had moments we'd love to travel back in time and erase.</b> For the characters in the new Syfy series <i>12 Monkeys</i>, those moments come with incredibly high stakes for humanity. <a href=\"http://www.syfy.com/12monkeys\"><i>12 Monkeys</i></a> premieres January 16 at 9/8c on Syfy.",
               "image" : "http://s3-ak.buzzfeed.com/static/2014-12/30/12/campaign_images/webdr10/moments-from-our-personal-histories-wed-love-t-6w-2-12544-1419960890-19.jpg",
               "old" : "0",
               "promotion_medium_id" : "1",
               "flexpro_recipients" : "",
               "title" : "12 Moments From Your Personal History You'd Love To Unmake",
               "image_wide" : "/static/2014-12/30/12/campaign_images/webdr10/moments-from-our-personal-histories-wed-love-t-6w-2-12544-1419960890-19_wide.jpg",
               "original_image" : "/static/2014-12/30/12/tmp/webdr04/61a9f5dc62a7eec473475424f9e84c6b-16.jpg"
            },
            {
               "width" : "125",
               "extra_fields" : {
                  "small" : {
                     "width" : 625,
                     "left" : 0,
                     "top" : 52,
                     "height" : 415
                  },
                  "big" : {
                     "width" : 625,
                     "left" : 0,
                     "top" : 60,
                     "height" : 415
                  },
                  "wide" : {
                     "width" : 625,
                     "left" : 0,
                     "top" : 34,
                     "height" : 220
                  }
               },
               "image_dblwide" : "/static/2014-12/30/12/campaign_images/webdr10/moments-from-our-personal-histories-wed-love-t-6w-2-12544-1419960893-22_dblwide.jpg",
               "clicks" : "272",
               "dud" : "0",
               "added" : "2014-12-30 12:34:55",
               "campaign_id" : "3552888",
               "rate" : 0.00383844655809884,
               "impressions" : "70862",
               "image_id" : "120283",
               "original_image_width" : "625",
               "promoter" : "1390596",
               "updated" : "2015-01-16 21:28:50",
               "id" : "167916",
               "image_dblbig" : "/static/2014-12/30/12/campaign_images/webdr10/moments-from-our-personal-histories-wed-love-t-6w-2-12544-1419960893-22_dblbig.jpg",
               "is_default" : "0",
               "promotion_image_id" : "120283",
               "sub_buzz_id" : "0",
               "image_big" : "/static/2014-12/30/12/campaign_images/webdr10/moments-from-our-personal-histories-wed-love-t-6w-2-12544-1419960893-22_big.jpg",
               "probability" : 0.000305433287601032,
               "active" : "1",
               "original_image_height" : "689",
               "height" : "83",
               "description" : "<b>We've all had moments we'd love to travel back in time and erase.</b> For the characters in the new Syfy series <i>12 Monkeys</i>, those moments come with incredibly high stakes for humanity. <a href=\"http://www.syfy.com/12monkeys\"><i>12 Monkeys</i></a> premieres January 16 at 9/8c on Syfy.",
               "image" : "http://s3-ak.buzzfeed.com/static/2014-12/30/12/campaign_images/webdr10/moments-from-our-personal-histories-wed-love-t-6w-2-12544-1419960893-22.jpg",
               "old" : "0",
               "promotion_medium_id" : "1",
               "flexpro_recipients" : "",
               "title" : "12 Times You Wish You Had A Do-Over",
               "image_wide" : "/static/2014-12/30/12/campaign_images/webdr10/moments-from-our-personal-histories-wed-love-t-6w-2-12544-1419960893-22_wide.jpg",
               "original_image" : "/static/2014-12/30/12/tmp/webdr01/d7899ac02e50f9b0cbd1b34fbc0c5361-19.jpg"
            },
            {
               "width" : "125",
               "extra_fields" : {
                  "small" : {
                     "width" : 640,
                     "left" : 0,
                     "top" : 124,
                     "height" : 424
                  },
                  "big" : {
                     "width" : 640,
                     "left" : 0,
                     "top" : 148,
                     "height" : 424
                  },
                  "wide" : {
                     "width" : 640,
                     "left" : 0,
                     "top" : 205,
                     "height" : 225
                  }
               },
               "image_dblwide" : "/static/2014-12/30/12/campaign_images/webdr10/moments-from-our-personal-histories-wed-love-t-6w-2-12544-1419960887-16_dblwide.jpg",
               "clicks" : "12005",
               "dud" : "0",
               "added" : "2014-12-30 12:34:54",
               "campaign_id" : "3552888",
               "rate" : 0.00563538826675079,
               "impressions" : "2130288",
               "image_id" : "120281",
               "original_image_width" : "640",
               "promoter" : "1390596",
               "updated" : "2015-01-16 21:38:06",
               "id" : "167914",
               "image_dblbig" : "/static/2014-12/30/12/campaign_images/webdr10/moments-from-our-personal-histories-wed-love-t-6w-2-12544-1419960887-16_dblbig.jpg",
               "is_default" : "0",
               "promotion_image_id" : "120281",
               "sub_buzz_id" : "4537853",
               "image_big" : "/static/2014-12/30/12/campaign_images/webdr10/moments-from-our-personal-histories-wed-love-t-6w-2-12544-1419960887-16_big.jpg",
               "probability" : 0.0969262793770404,
               "active" : "1",
               "original_image_height" : "960",
               "height" : "83",
               "description" : "<b>We've all had moments we'd love to travel back in time and erase.</b> For the characters in the new Syfy series <i>12 Monkeys</i>, those moments come with incredibly high stakes for humanity. <a href=\"http://www.syfy.com/12monkeys\"><i>12 Monkeys</i></a> premieres January 16 at 9/8c on Syfy.",
               "image" : "http://s3-ak.buzzfeed.com/static/2014-12/30/12/campaign_images/webdr10/moments-from-our-personal-histories-wed-love-t-6w-2-12544-1419960887-16.jpg",
               "old" : "0",
               "promotion_medium_id" : "1",
               "flexpro_recipients" : "",
               "title" : "12 Times You Wish You Had A Do-Over",
               "image_wide" : "/static/2014-12/30/12/campaign_images/webdr10/moments-from-our-personal-histories-wed-love-t-6w-2-12544-1419960887-16_wide.jpg",
               "original_image" : ""
            },
            {
               "width" : "125",
               "extra_fields" : {
                  "small" : {
                     "width" : 625,
                     "left" : 0,
                     "top" : 52,
                     "height" : 415
                  },
                  "big" : {
                     "width" : 625,
                     "left" : 0,
                     "top" : 60,
                     "height" : 415
                  },
                  "wide" : {
                     "width" : 625,
                     "left" : 0,
                     "top" : 34,
                     "height" : 220
                  }
               },
               "image_dblwide" : "/static/2014-12/30/12/campaign_images/webdr10/moments-from-our-personal-histories-wed-love-t-6w-2-12544-1419960893-22_dblwide.jpg",
               "clicks" : "319",
               "dud" : "0",
               "added" : "2014-12-30 12:34:54",
               "campaign_id" : "3552888",
               "rate" : 0.00450724125750618,
               "impressions" : "70775",
               "image_id" : "120283",
               "original_image_width" : "625",
               "promoter" : "1390596",
               "updated" : "2015-01-16 21:35:06",
               "id" : "167912",
               "image_dblbig" : "/static/2014-12/30/12/campaign_images/webdr10/moments-from-our-personal-histories-wed-love-t-6w-2-12544-1419960893-22_dblbig.jpg",
               "is_default" : "0",
               "promotion_image_id" : "120283",
               "sub_buzz_id" : "0",
               "image_big" : "/static/2014-12/30/12/campaign_images/webdr10/moments-from-our-personal-histories-wed-love-t-6w-2-12544-1419960893-22_big.jpg",
               "probability" : 0.00339817676623286,
               "active" : "1",
               "original_image_height" : "689",
               "height" : "83",
               "description" : "<b>We've all had moments we'd love to travel back in time and erase.</b> For the characters in the new Syfy series <i>12 Monkeys</i>, those moments come with incredibly high stakes for humanity. <a href=\"http://www.syfy.com/12monkeys\"><i>12 Monkeys</i></a> premieres January 16 at 9/8c on Syfy.",
               "image" : "http://s3-ak.buzzfeed.com/static/2014-12/30/12/campaign_images/webdr10/moments-from-our-personal-histories-wed-love-t-6w-2-12544-1419960893-22.jpg",
               "old" : "0",
               "promotion_medium_id" : "1",
               "flexpro_recipients" : "",
               "title" : "12 Moments From Your Life You Would Totally Undo",
               "image_wide" : "/static/2014-12/30/12/campaign_images/webdr10/moments-from-our-personal-histories-wed-love-t-6w-2-12544-1419960893-22_wide.jpg",
               "original_image" : "/static/2014-12/30/12/tmp/webdr01/d7899ac02e50f9b0cbd1b34fbc0c5361-19.jpg"
            },
            {
               "width" : "125",
               "extra_fields" : {
                  "small" : {
                     "width" : 625,
                     "left" : 0,
                     "top" : 0,
                     "height" : 415
                  },
                  "big" : {
                     "width" : 625,
                     "left" : 0,
                     "top" : 0,
                     "height" : 415
                  },
                  "wide" : {
                     "width" : 625,
                     "left" : 0,
                     "top" : 46,
                     "height" : 220
                  }
               },
               "image_dblwide" : "/static/2014-12/30/12/campaign_images/webdr10/moments-from-our-personal-histories-wed-love-t-6w-2-12544-1419960890-19_dblwide.jpg",
               "clicks" : "13273",
               "dud" : "0",
               "added" : "2014-12-30 12:34:55",
               "campaign_id" : "3552888",
               "rate" : 0.00625872050118804,
               "impressions" : "2120721",
               "image_id" : "120282",
               "original_image_width" : "625",
               "promoter" : "1390596",
               "updated" : "2015-01-16 21:37:02",
               "id" : "167915",
               "image_dblbig" : "/static/2014-12/30/12/campaign_images/webdr10/moments-from-our-personal-histories-wed-love-t-6w-2-12544-1419960890-19_dblbig.jpg",
               "is_default" : "0",
               "promotion_image_id" : "120282",
               "sub_buzz_id" : "0",
               "image_big" : "/static/2014-12/30/12/campaign_images/webdr10/moments-from-our-personal-histories-wed-love-t-6w-2-12544-1419960890-19_big.jpg",
               "probability" : 0.467592194772246,
               "active" : "1",
               "original_image_height" : "723",
               "height" : "83",
               "description" : "<b>We've all had moments we'd love to travel back in time and erase.</b> For the characters in the new Syfy series <i>12 Monkeys</i>, those moments come with incredibly high stakes for humanity. <a href=\"http://www.syfy.com/12monkeys\"><i>12 Monkeys</i></a> premieres January 16 at 9/8c on Syfy.",
               "image" : "http://s3-ak.buzzfeed.com/static/2014-12/30/12/campaign_images/webdr10/moments-from-our-personal-histories-wed-love-t-6w-2-12544-1419960890-19.jpg",
               "old" : "0",
               "promotion_medium_id" : "1",
               "flexpro_recipients" : "",
               "title" : "12 Times You Wish You Had A Do-Over",
               "image_wide" : "/static/2014-12/30/12/campaign_images/webdr10/moments-from-our-personal-histories-wed-love-t-6w-2-12544-1419960890-19_wide.jpg",
               "original_image" : "/static/2014-12/30/12/tmp/webdr04/61a9f5dc62a7eec473475424f9e84c6b-16.jpg"
            },
            {
               "width" : "125",
               "extra_fields" : {
                  "small" : {
                     "width" : 640,
                     "left" : 0,
                     "top" : 124,
                     "height" : 424
                  },
                  "big" : {
                     "width" : 640,
                     "left" : 0,
                     "top" : 148,
                     "height" : 424
                  },
                  "wide" : {
                     "width" : 640,
                     "left" : 0,
                     "top" : 205,
                     "height" : 225
                  }
               },
               "image_dblwide" : "/static/2014-12/30/12/campaign_images/webdr10/moments-from-our-personal-histories-wed-love-t-6w-2-12544-1419960887-16_dblwide.jpg",
               "clicks" : "470",
               "dud" : "0",
               "added" : "2014-12-30 12:34:55",
               "campaign_id" : "3552888",
               "rate" : 0.0041595865193996,
               "impressions" : "112992",
               "image_id" : "120281",
               "original_image_width" : "640",
               "promoter" : "1390596",
               "updated" : "2015-01-16 21:32:21",
               "id" : "167918",
               "image_dblbig" : "/static/2014-12/30/12/campaign_images/webdr10/moments-from-our-personal-histories-wed-love-t-6w-2-12544-1419960887-16_dblbig.jpg",
               "is_default" : "0",
               "promotion_image_id" : "120281",
               "sub_buzz_id" : "4537853",
               "image_big" : "/static/2014-12/30/12/campaign_images/webdr10/moments-from-our-personal-histories-wed-love-t-6w-2-12544-1419960887-16_big.jpg",
               "probability" : 0.00101938050029848,
               "active" : "1",
               "original_image_height" : "960",
               "height" : "83",
               "description" : "<b>We've all had moments we'd love to travel back in time and erase.</b> For the characters in the new Syfy series <i>12 Monkeys</i>, those moments come with incredibly high stakes for humanity. <a href=\"http://www.syfy.com/12monkeys\"><i>12 Monkeys</i></a> premieres January 16 at 9/8c on Syfy.",
               "image" : "http://s3-ak.buzzfeed.com/static/2014-12/30/12/campaign_images/webdr10/moments-from-our-personal-histories-wed-love-t-6w-2-12544-1419960887-16.jpg",
               "old" : "0",
               "promotion_medium_id" : "1",
               "flexpro_recipients" : "",
               "title" : "12 Moments From Your Personal History You'd Love To Unmake",
               "image_wide" : "/static/2014-12/30/12/campaign_images/webdr10/moments-from-our-personal-histories-wed-love-t-6w-2-12544-1419960887-16_wide.jpg",
               "original_image" : ""
            },
            {
               "width" : "125",
               "extra_fields" : {
                  "small" : {
                     "width" : "625",
                     "left" : 0,
                     "top" : 0,
                     "height" : 415
                  },
                  "big" : {
                     "width" : 625,
                     "left" : 0,
                     "top" : 41,
                     "height" : 415
                  },
                  "wide" : {
                     "width" : 625,
                     "left" : 0,
                     "top" : 68,
                     "height" : 220
                  }
               },
               "image_dblwide" : "/static/2014-12/30/12/campaign_images/webdr10/moments-from-our-personal-histories-wed-love-t-6w-2-12544-1419960885-13_dblwide.jpg",
               "clicks" : "257",
               "dud" : "0",
               "added" : "2014-12-30 12:34:46",
               "campaign_id" : "3552888",
               "rate" : 0.00360843559574289,
               "impressions" : "71222",
               "image_id" : "120280",
               "original_image_width" : "625",
               "promoter" : "1390596",
               "updated" : "2015-01-16 21:30:00",
               "id" : "167909",
               "image_dblbig" : "/static/2014-12/30/12/campaign_images/webdr10/moments-from-our-personal-histories-wed-love-t-6w-2-12544-1419960885-13_dblbig.jpg",
               "is_default" : "0",
               "promotion_image_id" : "120280",
               "sub_buzz_id" : "0",
               "image_big" : "/static/2014-12/30/12/campaign_images/webdr10/moments-from-our-personal-histories-wed-love-t-6w-2-12544-1419960885-13_big.jpg",
               "probability" : 0.000120883845058931,
               "active" : "1",
               "original_image_height" : "624",
               "height" : "83",
               "description" : "<b>We've all had moments we'd love to travel back in time and erase.</b> For the characters in the new Syfy series <i>12 Monkeys</i>, those moments come with incredibly high stakes for humanity. <a href=\"http://www.syfy.com/12monkeys\"><i>12 Monkeys</i></a> premieres January 16 at 9/8c on Syfy.",
               "image" : "http://s3-ak.buzzfeed.com/static/2014-12/30/12/campaign_images/webdr10/moments-from-our-personal-histories-wed-love-t-6w-2-12544-1419960885-13.jpg",
               "old" : "0",
               "promotion_medium_id" : "1",
               "flexpro_recipients" : "",
               "title" : "12 Moments From Your Life You Would Totally Undo",
               "image_wide" : "/static/2014-12/30/12/campaign_images/webdr10/moments-from-our-personal-histories-wed-love-t-6w-2-12544-1419960885-13_wide.jpg",
               "original_image" : "/static/2014-12/30/12/tmp/webdr12/a5641438dbbe94e30a0bed8fd21f7982-16.jpg"
            },
            {
               "width" : "125",
               "extra_fields" : {
                  "small" : {
                     "width" : 625,
                     "left" : 0,
                     "top" : 52,
                     "height" : 415
                  },
                  "big" : {
                     "width" : 625,
                     "left" : 0,
                     "top" : 60,
                     "height" : 415
                  },
                  "wide" : {
                     "width" : 625,
                     "left" : 0,
                     "top" : 34,
                     "height" : 220
                  }
               },
               "image_dblwide" : "/static/2014-12/30/12/campaign_images/webdr10/moments-from-our-personal-histories-wed-love-t-6w-2-12544-1419960893-22_dblwide.jpg",
               "clicks" : "269",
               "dud" : "0",
               "added" : "2014-12-30 12:34:55",
               "campaign_id" : "3552888",
               "rate" : 0.00363611786969451,
               "impressions" : "73980",
               "image_id" : "120283",
               "original_image_width" : "625",
               "promoter" : "1390596",
               "updated" : "2015-01-16 21:29:03",
               "id" : "167920",
               "image_dblbig" : "/static/2014-12/30/12/campaign_images/webdr10/moments-from-our-personal-histories-wed-love-t-6w-2-12544-1419960893-22_dblbig.jpg",
               "is_default" : "0",
               "promotion_image_id" : "120283",
               "sub_buzz_id" : "0",
               "image_big" : "/static/2014-12/30/12/campaign_images/webdr10/moments-from-our-personal-histories-wed-love-t-6w-2-12544-1419960893-22_big.jpg",
               "probability" : 0.00013556675050958,
               "active" : "1",
               "original_image_height" : "689",
               "height" : "83",
               "description" : "<b>We've all had moments we'd love to travel back in time and erase.</b> For the characters in the new Syfy series <i>12 Monkeys</i>, those moments come with incredibly high stakes for humanity. <a href=\"http://www.syfy.com/12monkeys\"><i>12 Monkeys</i></a> premieres January 16 at 9/8c on Syfy.",
               "image" : "http://s3-ak.buzzfeed.com/static/2014-12/30/12/campaign_images/webdr10/moments-from-our-personal-histories-wed-love-t-6w-2-12544-1419960893-22.jpg",
               "old" : "0",
               "promotion_medium_id" : "1",
               "flexpro_recipients" : "",
               "title" : "12 Moments From Your Personal History You'd Love To Unmake",
               "image_wide" : "/static/2014-12/30/12/campaign_images/webdr10/moments-from-our-personal-histories-wed-love-t-6w-2-12544-1419960893-22_wide.jpg",
               "original_image" : "/static/2014-12/30/12/tmp/webdr01/d7899ac02e50f9b0cbd1b34fbc0c5361-19.jpg"
            },
            {
               "width" : "125",
               "extra_fields" : {
                  "small" : {
                     "width" : 640,
                     "left" : 0,
                     "top" : 124,
                     "height" : 424
                  },
                  "big" : {
                     "width" : 640,
                     "left" : 0,
                     "top" : 148,
                     "height" : 424
                  },
                  "wide" : {
                     "width" : 640,
                     "left" : 0,
                     "top" : 205,
                     "height" : 225
                  }
               },
               "image_dblwide" : "/static/2014-12/30/12/campaign_images/webdr10/moments-from-our-personal-histories-wed-love-t-6w-2-12544-1419960887-16_dblwide.jpg",
               "clicks" : "1231",
               "dud" : "0",
               "added" : "2014-12-30 12:34:48",
               "campaign_id" : "3552888",
               "rate" : 0.00466314373922761,
               "impressions" : "263985",
               "image_id" : "120281",
               "original_image_width" : "640",
               "promoter" : "1390596",
               "updated" : "2015-01-16 21:38:12",
               "id" : "167910",
               "image_dblbig" : "/static/2014-12/30/12/campaign_images/webdr10/moments-from-our-personal-histories-wed-love-t-6w-2-12544-1419960887-16_dblbig.jpg",
               "is_default" : "0",
               "promotion_image_id" : "120281",
               "sub_buzz_id" : "4537853",
               "image_big" : "/static/2014-12/30/12/campaign_images/webdr10/moments-from-our-personal-histories-wed-love-t-6w-2-12544-1419960887-16_big.jpg",
               "probability" : 0.00565934187116426,
               "active" : "1",
               "original_image_height" : "960",
               "height" : "83",
               "description" : "<b>We've all had moments we'd love to travel back in time and erase.</b> For the characters in the new Syfy series <i>12 Monkeys</i>, those moments come with incredibly high stakes for humanity. <a href=\"http://www.syfy.com/12monkeys\"><i>12 Monkeys</i></a> premieres January 16 at 9/8c on Syfy.",
               "image" : "http://s3-ak.buzzfeed.com/static/2014-12/30/12/campaign_images/webdr10/moments-from-our-personal-histories-wed-love-t-6w-2-12544-1419960887-16.jpg",
               "old" : "0",
               "promotion_medium_id" : "1",
               "flexpro_recipients" : "",
               "title" : "12 Moments From Your Life You Would Totally Undo",
               "image_wide" : "/static/2014-12/30/12/campaign_images/webdr10/moments-from-our-personal-histories-wed-love-t-6w-2-12544-1419960887-16_wide.jpg",
               "original_image" : ""
            },
            {
               "width" : "125",
               "extra_fields" : {
                  "small" : {
                     "width" : "625",
                     "left" : 0,
                     "top" : 0,
                     "height" : 415
                  },
                  "big" : {
                     "width" : 625,
                     "left" : 0,
                     "top" : 41,
                     "height" : 415
                  },
                  "wide" : {
                     "width" : 625,
                     "left" : 0,
                     "top" : 68,
                     "height" : 220
                  }
               },
               "image_dblwide" : "/static/2014-12/30/12/campaign_images/webdr10/moments-from-our-personal-histories-wed-love-t-6w-2-12544-1419960885-13_dblwide.jpg",
               "clicks" : "254",
               "dud" : "0",
               "added" : "2014-12-30 12:34:54",
               "campaign_id" : "3552888",
               "rate" : 0.00352787577432706,
               "impressions" : "71998",
               "image_id" : "120280",
               "original_image_width" : "625",
               "promoter" : "1390596",
               "updated" : "2015-01-16 21:34:01",
               "id" : "167913",
               "image_dblbig" : "/static/2014-12/30/12/campaign_images/webdr10/moments-from-our-personal-histories-wed-love-t-6w-2-12544-1419960885-13_dblbig.jpg",
               "is_default" : "0",
               "promotion_image_id" : "120280",
               "sub_buzz_id" : "0",
               "image_big" : "/static/2014-12/30/12/campaign_images/webdr10/moments-from-our-personal-histories-wed-love-t-6w-2-12544-1419960885-13_big.jpg",
               "probability" : 8.6155528790038e-05,
               "active" : "1",
               "original_image_height" : "624",
               "height" : "83",
               "description" : "<b>We've all had moments we'd love to travel back in time and erase.</b> For the characters in the new Syfy series <i>12 Monkeys</i>, those moments come with incredibly high stakes for humanity. <a href=\"http://www.syfy.com/12monkeys\"><i>12 Monkeys</i></a> premieres January 16 at 9/8c on Syfy.",
               "image" : "http://s3-ak.buzzfeed.com/static/2014-12/30/12/campaign_images/webdr10/moments-from-our-personal-histories-wed-love-t-6w-2-12544-1419960885-13.jpg",
               "old" : "0",
               "promotion_medium_id" : "1",
               "flexpro_recipients" : "",
               "title" : "12 Times You Wish You Had A Do-Over",
               "image_wide" : "/static/2014-12/30/12/campaign_images/webdr10/moments-from-our-personal-histories-wed-love-t-6w-2-12544-1419960885-13_wide.jpg",
               "original_image" : "/static/2014-12/30/12/tmp/webdr12/a5641438dbbe94e30a0bed8fd21f7982-16.jpg"
            }
         ],
         "byline_description_visual" : "Brand Publisher",
         "display_name" : "Syfy",
         "image" : "http://s3-ak.buzzfed.com/static/2015-01/6/9/campaign_images/webdr10/12-moments-from-your-personal-history-youd-love-t-2-15267-1420555560-0.jpg",
         "byline_description_id" : "5",
         "static_images" : {
            "small" : "http://s3-static-ak.buzzfed.com/static/2015-01/6/9/campaign_images/webdr10/12-moments-from-your-personal-history-youd-love-t-2-15267-1420555560-0_small.jpg",
            "standard" : "http://s3-static-ak.buzzfed.com/static/2015-01/6/9/campaign_images/webdr10/12-moments-from-your-personal-history-youd-love-t-2-15267-1420555560-0.jpg",
            "big" : "http://s3-static-ak.buzzfed.com/static/2015-01/6/9/campaign_images/webdr10/12-moments-from-your-personal-history-youd-love-t-2-15267-1420555560-0_big.jpg",
            "wide" : "http://s3-static-ak.buzzfed.com/static/2015-01/6/9/campaign_images/webdr10/12-moments-from-your-personal-history-youd-love-t-2-15267-1420555560-0_wide.jpg",
            "dblbig" : "http://s3-static-ak.buzzfed.com/static/2015-01/6/9/campaign_images/webdr10/12-moments-from-your-personal-history-youd-love-t-2-15267-1420555560-0_dblbig.jpg",
            "dblwide" : "http://s3-static-ak.buzzfed.com/static/2015-01/6/9/campaign_images/webdr10/12-moments-from-your-personal-history-youd-love-t-2-15267-1420555560-0_dblwide.jpg"
         },
         "image_small" : "http://s3-ak.buzzfed.com/static/2015-01/6/9/campaign_images/webdr10/12-moments-from-your-personal-history-youd-love-t-2-15267-1420555560-0_small.jpg",
         "html_blurb" : "<b><big>12 Moments From Your Personal History You'd Love To Unmake</big></b><br/><b>We've all had moments we'd love to travel back in time and erase.</b> For the characters in the new Syfy series <i>12 Monkeys</i>, those moments come with incredibly high stakes for humanity. <a href=\"http://www.syfy.com/12monkeys\"><i>12\u2026<br/><table><tr><td width='30' padding='0 0'><img src='http://s3-ak.buzzfed.com/static/2014-12/19/15/user_images/webdr05/syfy-2727-1419020674-0.jpg' width='25' height='25'/></td><td padding='5' pspacing='0'><small><b><a href='/syfy'>Syfy</a></b></small><br/><small><color value='#939393'>Brand Publisher</color></small></td></tr></table>"
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

/* s 21:40:34 01/16/2015 */
/* g 21:48:29 01/16/2015 - sl=125 */ 
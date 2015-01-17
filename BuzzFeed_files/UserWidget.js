
var BF_S3_IMAGE_URL='http://s3.amazonaws.com/buzzfeed-media/bigstory/';var BF_W=function(){var buzz_count=((typeof(BF_BUZZ_COUNT)!='undefined')?BF_BUZZ_COUNT:1);var small_image=((typeof(BF_SMALL_IMAGE)!='undefined')?BF_SMALL_IMAGE:false);var image_width=((typeof(BF_SMALL_IMAGE)!='undefined'&&BF_SMALL_IMAGE)?90:125);var image_height=((typeof(BF_SMALL_IMAGE)!='undefined'&&BF_SMALL_IMAGE)?60:83);var head_foot_ids=['bf-powered1','bf-powered2','bf-footer','bf-header'];var apply_styles=function(element,key){if(typeof(bf_styles)!='undefined'){if(bf_styles[key]){for(var style_key in bf_styles[key]){var value=bf_styles[key][style_key];var eval_string="element.style."+style_key+"='"+value+"'";eval(eval_string);}}}};var randomize=function buzz(buzz_data){var bindexes=new Array();for(var i=0;i<buzz_data.length;i++){bindexes.push(i);}
function randOrd(){return(Math.round(Math.random())-0.5);}
bindexes.sort(randOrd);bindexes.sort(randOrd);var random_buzz=new Array();for(i=0;i<buzz_data.length;i++){if(!window.BF_NO_DUPES[buzz_data[bindexes[i]].bid]){random_buzz.push(buzz_data[bindexes[i]]);}}
if(random_buzz.length==0&&buzz_data[0]){random_buzz.push(buzz_data[0]);}
return random_buzz;};var element_handlers={'bf-url':function(el,buzz,wid,click_track_fn){var buzz_url=buzz['user_link']?buzz['user_link']:buzz['url'];el.href=buzz_url;el.setAttribute('href',buzz_url);if(typeof(el.addEventListener)=='undefined'){el.attachEvent('onmousedown',function(e){click_track_fn(el,buzz,wid);});}else{el.addEventListener('mousedown',function(e){click_track_fn(el,buzz,wid);},true);}
if(el.getAttribute('rel:gt_label')&&el.getAttribute('rel:gt_label')=='partner'&&(10==10||10==15)){el.setAttribute('rel:gt_label','partner/'+buzz.username);}},'bf-name':function(el,name){var truncate=el.getAttribute("rel:bf_truncate");if(truncate){if(!isNaN(truncate)){var truncate=parseInt(truncate);if(name.length>truncate){var terminator=el.getAttribute("rel:bf_truncate_terminator");term_length=terminator?terminator.length:3;terminator=terminator?terminator:'&hellip;';var name_length=truncate-term_length;name=name.substring(0,name_length);var words=name.split(/\s+/);if(words[words.length-1].match(/&/)&&!words[words.length-1].match(/;$/)){words.pop();}
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
dfpAdVidReactions=dfpAdEL.select('.badge_list')[0];dfpAdPreviewEL=dfpAdEL.select('.video-preview')[0];if(ie7){if(dfpAdVidReactions)dfpAdVidReactions.hide();dfpAdPreviewEL.remove();var destination=dfpAdEL.select('.video-content')[0];$(dfpAdEL).fire("video:dfp",{src:dfp_video.src_link,wid:10,dfp:true});var so=BF_initSwfObject(dfp_video.src_link,{width:videoDimensions.width,height:videoDimensions.height,autoplay:1,hideYouTubeInfo:1});so.write(destination);if(vidTrackPixelIMG)vidTrackPixelIMG.src=vidTrackRedirect+vidTrackPixelSRC;}else{var vidThumbEL=dfpAdEL.select('.vid-preview-img')[0],thumbIMG=dfp_video.img0||dfp_video.thumbnail;vidThumbEL.setAttribute('src',thumbIMG);vidThumbEL.setAttribute('width','100%');if(dfp_video.thumbnail)dfpAdVidReactions.addClassName('dfp-bf-margin')
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
   "wid" : "10",
   "userbuzz_count" : 10,
   "network" : "buzzfeed",
   "loaded" : "true",
   "buzz" : [
      {
         "bid" : "7EWOWV7",
         "user_type" : "f_other",
         "form" : "super-link",
         "user" : "littlethings",
         "url" : "http://www.buzzfeed.com/littlethings/25-test-answers-that-may-look-wrong-but-theyre-a-12gt5",
         "comments_count" : 0,
         "last_updated" : "2015-01-15 19:08:04",
         "images" : "",
         "uid" : "78Z9TO7",
         "sub_buzz" : [
            {
               "image_buzz_width" : null,
               "form_id" : "3",
               "link_buzz" : "http://www.littlethings.com/wrong-test-answers-genius/",
               "form" : "link",
               "campaign_id" : "3577122",
               "buzz_order" : "0",
               "source_type_visual" : "mixed",
               "id" : "4688021",
               "updated" : "2015-01-15 17:50:52",
               "quote_author" : null,
               "sub_buzz_id" : "4688021",
               "name" : "25 Test Answers You Should Use Next Time",
               "attribution" : "",
               "original_image_height" : null,
               "description" : "<b>It's not technically wrong.</b>",
               "content_order" : null,
               "uri" : "25-test-answers-that-may-look-wrong-but-theyre-a-ni8q52-1a6jr",
               "video_url" : null,
               "external_id" : "0",
               "userid" : "1353444",
               "added" : "2015-01-15 17:50:52",
               "image_buzz" : null,
               "mobile_safe" : "1",
               "commentary_raw_html" : null,
               "image_buzz_height" : null,
               "mobile_image" : null,
               "original_image_width" : null,
               "wide_image_width" : null,
               "wide_image_height" : null,
               "source_type" : "8",
               "number_item" : "1",
               "has_metadata" : "0",
               "wide_image" : null,
               "mobile_image_width" : null,
               "mobile_image_height" : null,
               "source_value" : "",
               "original_image" : null
            }
         ],
         "name" : "25 Test Answers You Should Use Next Time",
         "uri" : "25-test-answers-that-may-look-wrong-but-theyre-a-12gt5",
         "cloud_servers" : [
            "newbuzz-collection-1925855828.us-east-1.elb.amazonaws.com"
         ],
         "username" : "littlethings",
         "published" : "2015-01-15 17:50:52",
         "published_unix" : "1421362252",
         "user_link" : "http://www.littlethings.com/wrong-test-answers-genius/",
         "ad_blurb" : "<b>It's not technically wrong.</b>",
         "nsfw" : "false",
         "status" : "live",
         "ct" : "http://75.101.183.223/small.gif?type=100,14&user=littlethings&buzz=25-test-answers-that-may-look-wrong-but-theyre-a-12gt5&c=7EWOWV7&u=78Z9TO7&url=http%3A%2F%2Fbuzzfeed.com%2Flittlethings%2F25-test-answers-that-may-look-wrong-but-theyre-a-12gt5%2F&rd=http%3A%2F%2Fbuzzfeed.com%2Flittlethings%2F25-test-answers-that-may-look-wrong-but-theyre-a-12gt5%2F",
         "impressions" : "83",
         "mobile_image" : "1",
         "user_image" : "http://s3-ak.buzzfed.com/static/2014-10/23/15/user_images/webdr10/littlethings-19745-1414091214-0.jpg",
         "blurb" : "It&#39;s not technically wrong.",
         "byline_description_visual" : "Publishing Partner",
         "display_name" : "LittleThings",
         "image" : "http://s3-ak.buzzfed.com/static/2015-01/15/19/campaign_images/webdr05/25-test-answers-you-should-use-next-time-1-8927-1421366883-23.jpg",
         "byline_description_id" : "7",
         "static_images" : {
            "small" : "http://s3-static-ak.buzzfed.com/static/2015-01/15/19/campaign_images/webdr05/25-test-answers-you-should-use-next-time-1-8927-1421366883-23_small.jpg",
            "standard" : "http://s3-static-ak.buzzfed.com/static/2015-01/15/19/campaign_images/webdr05/25-test-answers-you-should-use-next-time-1-8927-1421366883-23.jpg",
            "big" : "http://s3-static-ak.buzzfed.com/static/2015-01/15/19/campaign_images/webdr05/25-test-answers-you-should-use-next-time-1-8927-1421366883-23_big.jpg",
            "wide" : "http://s3-static-ak.buzzfed.com/static/2015-01/15/19/campaign_images/webdr05/25-test-answers-you-should-use-next-time-1-8927-1421366883-23_wide.jpg",
            "dblbig" : "http://s3-static-ak.buzzfed.com/static/2015-01/15/19/campaign_images/webdr05/25-test-answers-you-should-use-next-time-1-8927-1421366883-23_big.jpg",
            "dblwide" : "http://s3-static-ak.buzzfed.com/static/2015-01/15/19/campaign_images/webdr05/25-test-answers-you-should-use-next-time-1-8927-1421366883-23_wide.jpg"
         },
         "p" : 1,
         "image_small" : "http://s3-ak.buzzfed.com/static/2015-01/15/19/campaign_images/webdr05/25-test-answers-you-should-use-next-time-1-8927-1421366883-23_small.jpg",
         "html_blurb" : "<b><big>25 Test Answers You Should Use Next Time</big></b><br/><b>It's not technically wrong.</b><br/><table><tr><td width='30' padding='0 0'><img src='http://s3-ak.buzzfed.com/static/2014-10/23/15/user_images/webdr10/littlethings-19745-1414091214-0.jpg' width='25' height='25'/></td><td padding='5' pspacing='0'><small><b><a href='/littlethings'>LittleThings</a></b></small><br/><small><color value='#939393'>Publishing Partner</color></small></td></tr></table>"
      },
      {
         "bid" : "7EWWYZ7",
         "user_type" : "f_other",
         "form" : "super",
         "user" : "dailymotion",
         "url" : "http://www.buzzfeed.com/dailymotion/9-struggles-all-hungry-girls-understand",
         "comments_count" : 0,
         "last_updated" : "2015-01-16 20:21:28",
         "images" : "",
         "uid" : "7NN467",
         "sub_buzz" : "",
         "name" : "9 Struggles All Hungry Girls Understand",
         "uri" : "9-struggles-all-hungry-girls-understand",
         "cloud_servers" : [
            "newbuzz-collection-1925855828.us-east-1.elb.amazonaws.com"
         ],
         "username" : "dailymotion",
         "published" : "2015-01-16 20:21:28",
         "published_unix" : "1421457688",
         "ad_blurb" : "<b>Damn you, doughnut day.</b>",
         "nsfw" : "false",
         "status" : "live",
         "ct" : "http://75.101.183.223/small.gif?type=100,14&user=dailymotion&buzz=9-struggles-all-hungry-girls-understand&c=7EWWYZ7&u=7NN467&url=http%3A%2F%2Fbuzzfeed.com%2Fdailymotion%2F9-struggles-all-hungry-girls-understand%2F&rd=http%3A%2F%2Fbuzzfeed.com%2Fdailymotion%2F9-struggles-all-hungry-girls-understand%2F",
         "impressions" : "154",
         "mobile_image" : "1",
         "user_image" : "http://s3-ak.buzzfed.com/static/2014-09/29/16/user_images/webdr10/dailymotion-30182-1412023320-6.jpg",
         "blurb" : "Damn you, doughnut day.",
         "byline_description_visual" : "Publishing Partner",
         "display_name" : "Dailymotion",
         "image" : "http://s3-ak.buzzfed.com/static/2015-01/16/20/campaign_images/webdr09/9-struggles-all-hungry-girls-understand-2-10281-1421457686-0.jpg",
         "byline_description_id" : "7",
         "static_images" : {
            "small" : "http://s3-static-ak.buzzfed.com/static/2015-01/16/20/campaign_images/webdr09/9-struggles-all-hungry-girls-understand-2-10281-1421457686-0_small.jpg",
            "standard" : "http://s3-static-ak.buzzfed.com/static/2015-01/16/20/campaign_images/webdr09/9-struggles-all-hungry-girls-understand-2-10281-1421457686-0.jpg",
            "big" : "http://s3-static-ak.buzzfed.com/static/2015-01/16/20/campaign_images/webdr09/9-struggles-all-hungry-girls-understand-2-10281-1421457686-0_big.jpg",
            "wide" : "http://s3-static-ak.buzzfed.com/static/2015-01/16/20/campaign_images/webdr09/9-struggles-all-hungry-girls-understand-2-10281-1421457686-0_wide.jpg",
            "dblbig" : "http://s3-static-ak.buzzfed.com/static/2015-01/16/20/campaign_images/webdr09/9-struggles-all-hungry-girls-understand-2-10281-1421457686-0_dblbig.jpg",
            "dblwide" : "http://s3-static-ak.buzzfed.com/static/2015-01/16/20/campaign_images/webdr09/9-struggles-all-hungry-girls-understand-2-10281-1421457686-0_dblwide.jpg"
         },
         "p" : 1,
         "image_small" : "http://s3-ak.buzzfed.com/static/2015-01/16/20/campaign_images/webdr09/9-struggles-all-hungry-girls-understand-2-10281-1421457686-0_small.jpg",
         "html_blurb" : "<b><big>9 Struggles All Hungry Girls Understand</big></b><br/><b>Damn you, doughnut day.</b><br/><table><tr><td width='30' padding='0 0'><img src='http://s3-ak.buzzfed.com/static/2014-09/29/16/user_images/webdr10/dailymotion-30182-1412023320-6.jpg' width='25' height='25'/></td><td padding='5' pspacing='0'><small><b><a href='/dailymotion'>Dailymotion</a></b></small><br/><small><color value='#939393'>Publishing Partner</color></small></td></tr></table>"
      },
      {
         "bid" : "7EWTCI7",
         "user_type" : "f_other",
         "form" : "super-link",
         "user" : "bustle",
         "url" : "http://www.buzzfeed.com/bustle/this-video-of-fibonacci-sculptures-that-look-like-16alw",
         "comments_count" : 0,
         "last_updated" : "2015-01-16 18:36:46",
         "images" : "",
         "uid" : "79UBD07",
         "sub_buzz" : [
            {
               "image_buzz_width" : null,
               "form_id" : "3",
               "link_buzz" : "http://www.bustle.com/articles/59042-this-video-of-fibonacci-sculptures-that-look-like-theyre-moving-will-be-the-only-thing-you?utm_campaign=referral&utm_medium=link&utm_source=buzzfeed",
               "form" : "link",
               "campaign_id" : "3577943",
               "buzz_order" : "0",
               "source_type_visual" : "mixed",
               "id" : "4693049",
               "updated" : "2015-01-16 11:51:29",
               "quote_author" : null,
               "sub_buzz_id" : "4693049",
               "name" : "This Video Of Fibonacci Sculptures That Look Like They're Moving Is Mesmerizing",
               "attribution" : "",
               "original_image_height" : null,
               "description" : "<b>Prepare to be hypnotized by these stunning Fibonacci sculptures.</b>",
               "content_order" : null,
               "uri" : "this-video-of-fibonacci-sculptures-that-look-like-nia463-1em73",
               "video_url" : null,
               "external_id" : "0",
               "userid" : "1353444",
               "added" : "2015-01-16 11:51:29",
               "image_buzz" : null,
               "mobile_safe" : "1",
               "commentary_raw_html" : null,
               "image_buzz_height" : null,
               "mobile_image" : null,
               "original_image_width" : null,
               "wide_image_width" : null,
               "wide_image_height" : null,
               "source_type" : "8",
               "number_item" : "1",
               "has_metadata" : "0",
               "wide_image" : null,
               "mobile_image_width" : null,
               "mobile_image_height" : null,
               "source_value" : "",
               "original_image" : null
            }
         ],
         "name" : "This Video Of Fibonacci Sculptures That Look Like They're Moving Is Mesmerizing",
         "uri" : "this-video-of-fibonacci-sculptures-that-look-like-16alw",
         "cloud_servers" : [
            "newbuzz-collection-1925855828.us-east-1.elb.amazonaws.com"
         ],
         "username" : "bustle",
         "published" : "2015-01-16 11:51:29",
         "published_unix" : "1421427089",
         "user_link" : "http://www.bustle.com/articles/59042-this-video-of-fibonacci-sculptures-that-look-like-theyre-moving-will-be-the-only-thing-you?utm_campaign=referral&utm_medium=link&utm_source=buzzfeed",
         "ad_blurb" : "<b>Prepare to be hypnotized by these stunning Fibonacci sculptures.</b>",
         "nsfw" : "false",
         "status" : "live",
         "ct" : "http://75.101.183.223/small.gif?type=100,14&user=bustle&buzz=this-video-of-fibonacci-sculptures-that-look-like-16alw&c=7EWTCI7&u=79UBD07&url=http%3A%2F%2Fbuzzfeed.com%2Fbustle%2Fthis-video-of-fibonacci-sculptures-that-look-like-16alw%2F&rd=http%3A%2F%2Fbuzzfeed.com%2Fbustle%2Fthis-video-of-fibonacci-sculptures-that-look-like-16alw%2F",
         "impressions" : 0,
         "mobile_image" : "1",
         "user_image" : "http://s3-ak.buzzfed.com/static/2014-12/9/19/user_images/webdr07/bustle-30352-1418171635-16.jpg",
         "blurb" : "Prepare to be hypnotized by these stunning Fibonacci sculptures.",
         "byline_description_visual" : "Publishing Partner",
         "display_name" : "Bustle",
         "image" : "http://s3-ak.buzzfed.com/static/2015-01/16/18/campaign_images/webdr09/this-video-of-fibonacci-sculptures-that-look-like-2-24747-1421451405-7.jpg",
         "byline_description_id" : "7",
         "static_images" : {
            "small" : "http://s3-static-ak.buzzfed.com/static/2015-01/16/18/campaign_images/webdr09/this-video-of-fibonacci-sculptures-that-look-like-2-24747-1421451405-7_small.jpg",
            "standard" : "http://s3-static-ak.buzzfed.com/static/2015-01/16/18/campaign_images/webdr09/this-video-of-fibonacci-sculptures-that-look-like-2-24747-1421451405-7.jpg",
            "big" : "http://s3-static-ak.buzzfed.com/static/2015-01/16/18/campaign_images/webdr09/this-video-of-fibonacci-sculptures-that-look-like-2-24747-1421451405-7_big.jpg",
            "wide" : "http://s3-static-ak.buzzfed.com/static/2015-01/16/18/campaign_images/webdr09/this-video-of-fibonacci-sculptures-that-look-like-2-24747-1421451405-7_wide.jpg",
            "dblbig" : "http://s3-static-ak.buzzfed.com/static/2015-01/16/18/campaign_images/webdr09/this-video-of-fibonacci-sculptures-that-look-like-2-24747-1421451405-7_dblbig.jpg",
            "dblwide" : "http://s3-static-ak.buzzfed.com/static/2015-01/16/18/campaign_images/webdr09/this-video-of-fibonacci-sculptures-that-look-like-2-24747-1421451405-7_dblwide.jpg"
         },
         "p" : 1,
         "image_small" : "http://s3-ak.buzzfed.com/static/2015-01/16/18/campaign_images/webdr09/this-video-of-fibonacci-sculptures-that-look-like-2-24747-1421451405-7_small.jpg",
         "html_blurb" : "<b><big>This Video Of Fibonacci Sculptures That Look Like They're Moving Is Mesmerizing</big></b><br/><b>Prepare to be hypnotized by these stunning Fibonacci sculptures.</b><br/><table><tr><td width='30' padding='0 0'><img src='http://s3-ak.buzzfed.com/static/2014-12/9/19/user_images/webdr07/bustle-30352-1418171635-16.jpg' width='25' height='25'/></td><td padding='5' pspacing='0'><small><b><a href='/bustle'>Bustle</a></b></small><br/><small><color value='#939393'>Publishing Partner</color></small></td></tr></table>"
      },
      {
         "bid" : "7EWN0M7",
         "user_type" : "f_other",
         "form" : "super-link",
         "user" : "bustle",
         "url" : "http://www.buzzfeed.com/bustle/the-friends-opening-credits-without-music-is-tot-16alw",
         "comments_count" : 0,
         "last_updated" : "2015-01-15 17:57:55",
         "images" : "",
         "uid" : "79UBD07",
         "sub_buzz" : [
            {
               "image_buzz_width" : null,
               "form_id" : "3",
               "link_buzz" : "http://www.bustle.com/articles/58834-the-friends-opening-credits-without-music-is-totally-creepy-but-kind-of-awesome-video?utm_campaign=referral&utm_medium=link&utm_source=buzzfeed",
               "form" : "link",
               "campaign_id" : "3576771",
               "buzz_order" : "0",
               "source_type_visual" : "mixed",
               "id" : "4685707",
               "updated" : "2015-01-15 13:51:58",
               "quote_author" : null,
               "sub_buzz_id" : "4685707",
               "name" : "'Friends' Opening Credits Without Music Is Totally Creepy But Kind Of Awesome",
               "attribution" : "",
               "original_image_height" : null,
               "description" : "<b>This is what happens when you release a show to the interwebs.</b>",
               "content_order" : null,
               "uri" : "the-friends-opening-credits-without-music-is-tot-ni8f2w-1em73",
               "video_url" : null,
               "external_id" : "0",
               "userid" : "1353444",
               "added" : "2015-01-15 13:51:58",
               "image_buzz" : null,
               "mobile_safe" : "1",
               "commentary_raw_html" : null,
               "image_buzz_height" : null,
               "mobile_image" : null,
               "original_image_width" : null,
               "wide_image_width" : null,
               "wide_image_height" : null,
               "source_type" : "8",
               "number_item" : "1",
               "has_metadata" : "0",
               "wide_image" : null,
               "mobile_image_width" : null,
               "mobile_image_height" : null,
               "source_value" : "",
               "original_image" : null
            }
         ],
         "name" : "'Friends' Opening Credits Without Music Is Totally Creepy But Kind Of Awesome",
         "uri" : "the-friends-opening-credits-without-music-is-tot-16alw",
         "cloud_servers" : [
            "newbuzz-collection-1925855828.us-east-1.elb.amazonaws.com"
         ],
         "username" : "bustle",
         "published" : "2015-01-15 13:51:58",
         "published_unix" : "1421347918",
         "user_link" : "http://www.bustle.com/articles/58834-the-friends-opening-credits-without-music-is-totally-creepy-but-kind-of-awesome-video?utm_campaign=referral&utm_medium=link&utm_source=buzzfeed",
         "ad_blurb" : "<b>This is what happens when you release a show to the interwebs.</b>",
         "nsfw" : "false",
         "status" : "live",
         "ct" : "http://75.101.183.223/small.gif?type=100,14&user=bustle&buzz=the-friends-opening-credits-without-music-is-tot-16alw&c=7EWN0M7&u=79UBD07&url=http%3A%2F%2Fbuzzfeed.com%2Fbustle%2Fthe-friends-opening-credits-without-music-is-tot-16alw%2F&rd=http%3A%2F%2Fbuzzfeed.com%2Fbustle%2Fthe-friends-opening-credits-without-music-is-tot-16alw%2F",
         "impressions" : "70",
         "mobile_image" : "1",
         "user_image" : "http://s3-ak.buzzfed.com/static/2014-12/9/19/user_images/webdr07/bustle-30352-1418171635-16.jpg",
         "blurb" : "This is what happens when you release a show to the interwebs.",
         "byline_description_visual" : "Publishing Partner",
         "display_name" : "Bustle",
         "image" : "http://s3-ak.buzzfed.com/static/2015-01/15/17/campaign_images/webdr09/friends-opening-credits-without-music-is-totally--2-25295-1421362674-0.jpg",
         "byline_description_id" : "7",
         "static_images" : {
            "small" : "http://s3-static-ak.buzzfed.com/static/2015-01/15/17/campaign_images/webdr09/friends-opening-credits-without-music-is-totally--2-25295-1421362674-0_small.jpg",
            "standard" : "http://s3-static-ak.buzzfed.com/static/2015-01/15/17/campaign_images/webdr09/friends-opening-credits-without-music-is-totally--2-25295-1421362674-0.jpg",
            "big" : "http://s3-static-ak.buzzfed.com/static/2015-01/15/17/campaign_images/webdr09/friends-opening-credits-without-music-is-totally--2-25295-1421362674-0_big.jpg",
            "wide" : "http://s3-static-ak.buzzfed.com/static/2015-01/15/17/campaign_images/webdr09/friends-opening-credits-without-music-is-totally--2-25295-1421362674-0_wide.jpg",
            "dblbig" : "http://s3-static-ak.buzzfed.com/static/2015-01/15/17/campaign_images/webdr09/friends-opening-credits-without-music-is-totally--2-25295-1421362674-0_dblbig.jpg",
            "dblwide" : "http://s3-static-ak.buzzfed.com/static/2015-01/15/17/campaign_images/webdr09/friends-opening-credits-without-music-is-totally--2-25295-1421362674-0_dblwide.jpg"
         },
         "p" : 1,
         "image_small" : "http://s3-ak.buzzfed.com/static/2015-01/15/17/campaign_images/webdr09/friends-opening-credits-without-music-is-totally--2-25295-1421362674-0_small.jpg",
         "html_blurb" : "<b><big>'Friends' Opening Credits Without Music Is Totally Creepy But Kind Of Awesome</big></b><br/><b>This is what happens when you release a show to the interwebs.</b><br/><table><tr><td width='30' padding='0 0'><img src='http://s3-ak.buzzfed.com/static/2014-12/9/19/user_images/webdr07/bustle-30352-1418171635-16.jpg' width='25' height='25'/></td><td padding='5' pspacing='0'><small><b><a href='/bustle'>Bustle</a></b></small><br/><small><color value='#939393'>Publishing Partner</color></small></td></tr></table>"
      },
      {
         "bid" : "7EWS7A7",
         "user_type" : "f_other",
         "form" : "super-link",
         "user" : "ebaumsworld.com",
         "url" : "http://www.buzzfeed.com/ebaumsworld.com/31-amazing-moments-in-time-4ev5",
         "comments_count" : 0,
         "last_updated" : "2015-01-16 13:58:50",
         "images" : "",
         "uid" : "7UWCO7",
         "sub_buzz" : [
            {
               "image_buzz_width" : null,
               "form_id" : "3",
               "link_buzz" : "http://www.ebaumsworld.com/pictures/view/84420549/",
               "form" : "link",
               "campaign_id" : "3577731",
               "buzz_order" : "0",
               "source_type_visual" : "mixed",
               "id" : "4691823",
               "updated" : "2015-01-16 13:32:45",
               "quote_author" : null,
               "sub_buzz_id" : "4691823",
               "name" : "31 Amazing Moments In Time",
               "attribution" : "",
               "original_image_height" : null,
               "description" : "<b>When people look back, they should remember the amazing things.</b>",
               "content_order" : null,
               "uri" : "31-amazing-moments-in-time-ni9yjz-4ewr",
               "video_url" : null,
               "external_id" : "0",
               "userid" : "2493459",
               "added" : "2015-01-16 09:50:13",
               "image_buzz" : null,
               "mobile_safe" : "1",
               "commentary_raw_html" : null,
               "image_buzz_height" : null,
               "mobile_image" : null,
               "original_image_width" : null,
               "wide_image_width" : null,
               "wide_image_height" : null,
               "source_type" : "8",
               "number_item" : "1",
               "has_metadata" : "0",
               "wide_image" : null,
               "mobile_image_width" : null,
               "mobile_image_height" : null,
               "source_value" : "",
               "original_image" : null
            }
         ],
         "name" : "31 Amazing Moments In Time",
         "uri" : "31-amazing-moments-in-time-4ev5",
         "cloud_servers" : [
            "newbuzz-collection-1925855828.us-east-1.elb.amazonaws.com"
         ],
         "username" : "ebaumsworld.com",
         "published" : "2015-01-16 09:50:13",
         "published_unix" : "1421419813",
         "user_link" : "http://www.ebaumsworld.com/pictures/view/84420549/",
         "ad_blurb" : "<b>When people look back, they should remember the amazing things.</b>",
         "nsfw" : "false",
         "status" : "live",
         "ct" : "http://75.101.183.223/small.gif?type=100,14&user=ebaumsworld.com&buzz=31-amazing-moments-in-time-4ev5&c=7EWS7A7&u=7UWCO7&url=http%3A%2F%2Fbuzzfeed.com%2Febaumsworld.com%2F31-amazing-moments-in-time-4ev5%2F&rd=http%3A%2F%2Fbuzzfeed.com%2Febaumsworld.com%2F31-amazing-moments-in-time-4ev5%2F",
         "impressions" : "44",
         "mobile_image" : "1",
         "user_image" : "http://s3-ak.buzzfed.com/static/user_images/webdr02/2013/1/11/0/ebaumsworldcom-16947-1357882477-2.jpg",
         "blurb" : "When people look back, they should remember the amazing things.",
         "byline_description_visual" : "Publishing Partner",
         "display_name" : "eBaum&#39;s World",
         "image" : "http://s3-ak.buzzfed.com/static/2015-01/16/13/campaign_images/webdr08/31-amazing-moments-in-time-0-9459-1421434729-15.jpg",
         "byline_description_id" : "7",
         "static_images" : {
            "small" : "http://s3-static-ak.buzzfed.com/static/2015-01/16/13/campaign_images/webdr08/31-amazing-moments-in-time-0-9459-1421434729-15_small.jpg",
            "standard" : "http://s3-static-ak.buzzfed.com/static/2015-01/16/13/campaign_images/webdr08/31-amazing-moments-in-time-0-9459-1421434729-15.jpg",
            "big" : "http://s3-static-ak.buzzfed.com/static/2015-01/16/13/campaign_images/webdr08/31-amazing-moments-in-time-0-9459-1421434729-15.jpg",
            "wide" : "http://s3-static-ak.buzzfed.com/static/2015-01/16/13/campaign_images/webdr08/31-amazing-moments-in-time-0-9459-1421434729-15.jpg",
            "dblbig" : "http://s3-static-ak.buzzfed.com/static/2015-01/16/13/campaign_images/webdr08/31-amazing-moments-in-time-0-9459-1421434729-15.jpg",
            "dblwide" : "http://s3-static-ak.buzzfed.com/static/2015-01/16/13/campaign_images/webdr08/31-amazing-moments-in-time-0-9459-1421434729-15.jpg"
         },
         "p" : 1,
         "image_small" : "http://s3-ak.buzzfed.com/static/2015-01/16/13/campaign_images/webdr08/31-amazing-moments-in-time-0-9459-1421434729-15_small.jpg",
         "html_blurb" : "<b><big>31 Amazing Moments In Time</big></b><br/><b>When people look back, they should remember the amazing things.</b><br/><table><tr><td width='30' padding='0 0'><img src='http://s3-ak.buzzfed.com/static/user_images/webdr02/2013/1/11/0/ebaumsworldcom-16947-1357882477-2.jpg' width='25' height='25'/></td><td padding='5' pspacing='0'><small><b><a href='/ebaumsworld.com'>eBaum&#39;s World</a></b></small><br/><small><color value='#939393'>Publishing Partner</color></small></td></tr></table>"
      },
      {
         "bid" : "7EWSRI7",
         "user_type" : "f_other",
         "form" : "super-link",
         "user" : "opposingviews.com",
         "url" : "http://www.buzzfeed.com/opposingviews.com/obama-administration-loosens-restrictions-on-cuba-ab92",
         "comments_count" : 0,
         "last_updated" : "2015-01-16 15:38:25",
         "images" : "",
         "uid" : "72VC9U7",
         "sub_buzz" : [
            {
               "image_buzz_width" : null,
               "form_id" : "3",
               "link_buzz" : "http://www.opposingviews.com/i/politics/obama-administration-loosens-restrictions-cuba-allowing-travel-and-investment",
               "form" : "link",
               "campaign_id" : "3577835",
               "buzz_order" : "0",
               "source_type_visual" : "mixed",
               "id" : "4692410",
               "updated" : "2015-01-16 10:51:06",
               "quote_author" : null,
               "sub_buzz_id" : "4692410",
               "name" : "Obama Makes Cuban Cigars Legal",
               "attribution" : "",
               "original_image_height" : null,
               "description" : "<b>President Obama is loosening restrictions on American trade, investments, and travel to Cuba.</b>",
               "content_order" : null,
               "uri" : "obama-administration-loosens-restrictions-on-cuba-nia1dg-ergx",
               "video_url" : null,
               "external_id" : "0",
               "userid" : "2493459",
               "added" : "2015-01-16 10:51:06",
               "image_buzz" : null,
               "mobile_safe" : "1",
               "commentary_raw_html" : null,
               "image_buzz_height" : null,
               "mobile_image" : null,
               "original_image_width" : null,
               "wide_image_width" : null,
               "wide_image_height" : null,
               "source_type" : "8",
               "number_item" : "1",
               "has_metadata" : "0",
               "wide_image" : null,
               "mobile_image_width" : null,
               "mobile_image_height" : null,
               "source_value" : "",
               "original_image" : null
            }
         ],
         "name" : "Obama Makes Cuban Cigars Legal",
         "uri" : "obama-administration-loosens-restrictions-on-cuba-ab92",
         "cloud_servers" : [
            "newbuzz-collection-1925855828.us-east-1.elb.amazonaws.com"
         ],
         "username" : "opposingviews.com",
         "published" : "2015-01-16 10:51:06",
         "published_unix" : "1421423466",
         "user_link" : "http://www.opposingviews.com/i/politics/obama-administration-loosens-restrictions-cuba-allowing-travel-and-investment",
         "ad_blurb" : "<b>President Obama is loosening restrictions on American trade, investments, and travel to Cuba.</b>",
         "nsfw" : "false",
         "status" : "live",
         "ct" : "http://75.101.183.223/small.gif?type=100,14&user=opposingviews.com&buzz=obama-administration-loosens-restrictions-on-cuba-ab92&c=7EWSRI7&u=72VC9U7&url=http%3A%2F%2Fbuzzfeed.com%2Fopposingviews.com%2Fobama-administration-loosens-restrictions-on-cuba-ab92%2F&rd=http%3A%2F%2Fbuzzfeed.com%2Fopposingviews.com%2Fobama-administration-loosens-restrictions-on-cuba-ab92%2F",
         "impressions" : "3",
         "mobile_image" : "1",
         "user_image" : "http://s3-ak.buzzfed.com/static/user_images/webdr06/2013/5/7/16/opposingviewscom-11793-1367958254-6.jpg",
         "blurb" : "President Obama is loosening restrictions on American trade, investments, and travel to Cuba.",
         "byline_description_visual" : "Publishing Partner",
         "display_name" : "opposingviews.com",
         "image" : "http://s3-ak.buzzfed.com/static/2015-01/16/15/campaign_images/webdr06/obama-makes-cuban-cigars-legal-1-24530-1421440705-7.jpg",
         "byline_description_id" : "7",
         "static_images" : {
            "small" : "http://s3-static-ak.buzzfed.com/static/2015-01/16/15/campaign_images/webdr06/obama-makes-cuban-cigars-legal-1-24530-1421440705-7_small.jpg",
            "standard" : "http://s3-static-ak.buzzfed.com/static/2015-01/16/15/campaign_images/webdr06/obama-makes-cuban-cigars-legal-1-24530-1421440705-7.jpg",
            "big" : "http://s3-static-ak.buzzfed.com/static/2015-01/16/15/campaign_images/webdr06/obama-makes-cuban-cigars-legal-1-24530-1421440705-7_big.jpg",
            "wide" : "http://s3-static-ak.buzzfed.com/static/2015-01/16/15/campaign_images/webdr06/obama-makes-cuban-cigars-legal-1-24530-1421440705-7_wide.jpg",
            "dblbig" : "http://s3-static-ak.buzzfed.com/static/2015-01/16/15/campaign_images/webdr06/obama-makes-cuban-cigars-legal-1-24530-1421440705-7_big.jpg",
            "dblwide" : "http://s3-static-ak.buzzfed.com/static/2015-01/16/15/campaign_images/webdr06/obama-makes-cuban-cigars-legal-1-24530-1421440705-7_wide.jpg"
         },
         "p" : 1,
         "image_small" : "http://s3-ak.buzzfed.com/static/2015-01/16/15/campaign_images/webdr06/obama-makes-cuban-cigars-legal-1-24530-1421440705-7_small.jpg",
         "html_blurb" : "<b><big>Obama Makes Cuban Cigars Legal</big></b><br/><b>President Obama is loosening restrictions on American trade, investments, and travel to Cuba.</b><br/><table><tr><td width='30' padding='0 0'><img src='http://s3-ak.buzzfed.com/static/user_images/webdr06/2013/5/7/16/opposingviewscom-11793-1367958254-6.jpg' width='25' height='25'/></td><td padding='5' pspacing='0'><small><b><a href='/opposingviews.com'>opposingviews.com</a></b></small><br/><small><color value='#939393'>Publishing Partner</color></small></td></tr></table>"
      },
      {
         "bid" : "7EWPWN7",
         "user_type" : "f_other",
         "form" : "super-link",
         "user" : "wimp",
         "url" : "http://www.buzzfeed.com/wimp/golden-retriever-duped-by-his-own-squeaky-toy-vid-zynv",
         "comments_count" : 0,
         "last_updated" : "2015-01-16 15:03:35",
         "images" : "",
         "uid" : "78FDSD7",
         "sub_buzz" : [
            {
               "image_buzz_width" : null,
               "form_id" : "3",
               "link_buzz" : "http://www.wimp.com/dupedsqueaky/",
               "form" : "link",
               "campaign_id" : "3577306",
               "buzz_order" : "0",
               "source_type_visual" : "mixed",
               "id" : "4689340",
               "updated" : "2015-01-15 20:50:33",
               "quote_author" : null,
               "sub_buzz_id" : "4689340",
               "name" : "Golden Retriever Duped By His Own Squeaky Toy",
               "attribution" : "",
               "original_image_height" : null,
               "description" : "<b>This Golden Retriever, Walter, proves that even the most intelligent beings have their moments of confusion.</b>",
               "content_order" : null,
               "uri" : "golden-retriever-duped-by-his-own-squeaky-toy-vid-ni8ygj-17c9a",
               "video_url" : null,
               "external_id" : "0",
               "userid" : "2493459",
               "added" : "2015-01-15 20:50:33",
               "image_buzz" : null,
               "mobile_safe" : "1",
               "commentary_raw_html" : null,
               "image_buzz_height" : null,
               "mobile_image" : null,
               "original_image_width" : null,
               "wide_image_width" : null,
               "wide_image_height" : null,
               "source_type" : "8",
               "number_item" : "1",
               "has_metadata" : "0",
               "wide_image" : null,
               "mobile_image_width" : null,
               "mobile_image_height" : null,
               "source_value" : "",
               "original_image" : null
            }
         ],
         "name" : "Golden Retriever Duped By His Own Squeaky Toy",
         "uri" : "golden-retriever-duped-by-his-own-squeaky-toy-vid-zynv",
         "cloud_servers" : [
            "newbuzz-collection-1925855828.us-east-1.elb.amazonaws.com"
         ],
         "username" : "wimp",
         "published" : "2015-01-15 20:50:33",
         "published_unix" : "1421373033",
         "user_link" : "http://www.wimp.com/dupedsqueaky/",
         "ad_blurb" : "<b>This Golden Retriever, Walter, proves that even the most intelligent beings have their moments of confusion.</b>",
         "nsfw" : "false",
         "status" : "live",
         "ct" : "http://75.101.183.223/small.gif?type=100,14&user=wimp&buzz=golden-retriever-duped-by-his-own-squeaky-toy-vid-zynv&c=7EWPWN7&u=78FDSD7&url=http%3A%2F%2Fbuzzfeed.com%2Fwimp%2Fgolden-retriever-duped-by-his-own-squeaky-toy-vid-zynv%2F&rd=http%3A%2F%2Fbuzzfeed.com%2Fwimp%2Fgolden-retriever-duped-by-his-own-squeaky-toy-vid-zynv%2F",
         "impressions" : "2",
         "mobile_image" : "1",
         "user_image" : "http://s3-ak.buzzfed.com/static/2014-09/24/16/user_images/webdr01/wimp-25632-1411590271-0.jpg",
         "blurb" : "This Golden Retriever, Walter, proves that even the most intelligent beings have their moments of confusion.",
         "byline_description_visual" : "Publishing Partner",
         "display_name" : "Wimp",
         "image" : "http://s3-ak.buzzfed.com/static/2015-01/16/15/campaign_images/webdr11/golden-retriever-duped-by-his-own-squeaky-toy-0-307-1421438614-13.jpg",
         "byline_description_id" : "7",
         "static_images" : {
            "small" : "http://s3-static-ak.buzzfed.com/static/2015-01/16/15/campaign_images/webdr11/golden-retriever-duped-by-his-own-squeaky-toy-0-307-1421438614-13_small.jpg",
            "standard" : "http://s3-static-ak.buzzfed.com/static/2015-01/16/15/campaign_images/webdr11/golden-retriever-duped-by-his-own-squeaky-toy-0-307-1421438614-13.jpg",
            "big" : "http://s3-static-ak.buzzfed.com/static/2015-01/16/15/campaign_images/webdr11/golden-retriever-duped-by-his-own-squeaky-toy-0-307-1421438614-13.jpg",
            "wide" : "http://s3-static-ak.buzzfed.com/static/2015-01/16/15/campaign_images/webdr11/golden-retriever-duped-by-his-own-squeaky-toy-0-307-1421438614-13.jpg",
            "dblbig" : "http://s3-static-ak.buzzfed.com/static/2015-01/16/15/campaign_images/webdr11/golden-retriever-duped-by-his-own-squeaky-toy-0-307-1421438614-13.jpg",
            "dblwide" : "http://s3-static-ak.buzzfed.com/static/2015-01/16/15/campaign_images/webdr11/golden-retriever-duped-by-his-own-squeaky-toy-0-307-1421438614-13.jpg"
         },
         "p" : 1,
         "image_small" : "http://s3-ak.buzzfed.com/static/2015-01/16/15/campaign_images/webdr11/golden-retriever-duped-by-his-own-squeaky-toy-0-307-1421438614-13_small.jpg",
         "html_blurb" : "<b><big>Golden Retriever Duped By His Own Squeaky Toy</big></b><br/><b>This Golden Retriever, Walter, proves that even the most intelligent beings have their moments of confusion.</b><br/><table><tr><td width='30' padding='0 0'><img src='http://s3-ak.buzzfed.com/static/2014-09/24/16/user_images/webdr01/wimp-25632-1411590271-0.jpg' width='25' height='25'/></td><td padding='5' pspacing='0'><small><b><a href='/wimp'>Wimp</a></b></small><br/><small><color value='#939393'>Publishing Partner</color></small></td></tr></table>"
      },
      {
         "bid" : "7EWPW27",
         "user_type" : "f_other",
         "form" : "super-link",
         "user" : "wimp",
         "url" : "http://www.buzzfeed.com/wimp/kickstart-fitness-goals-with-the-treadmill-dance-zynv",
         "comments_count" : 0,
         "last_updated" : "2015-01-16 14:56:26",
         "images" : "",
         "uid" : "78FDSD7",
         "sub_buzz" : [
            {
               "image_buzz_width" : null,
               "form_id" : "3",
               "link_buzz" : "http://www.wimp.com/dancetreadmill/",
               "form" : "link",
               "campaign_id" : "3577303",
               "buzz_order" : "0",
               "source_type_visual" : "mixed",
               "id" : "4689337",
               "updated" : "2015-01-16 14:56:26",
               "quote_author" : null,
               "sub_buzz_id" : "4689337",
               "name" : "Kickstart Fitness Goals With The Treadmill Dance",
               "attribution" : "",
               "original_image_height" : null,
               "description" : "<b>Check out the World's largest treadmill dance featuring 12 YouTube stars.</b>",
               "content_order" : null,
               "uri" : "kickstart-fitness-goals-with-the-treadmill-dance-ni8ygh-17c9a",
               "video_url" : null,
               "external_id" : "0",
               "userid" : "2493459",
               "added" : "2015-01-15 20:50:31",
               "image_buzz" : null,
               "mobile_safe" : "1",
               "commentary_raw_html" : null,
               "image_buzz_height" : null,
               "mobile_image" : null,
               "original_image_width" : null,
               "wide_image_width" : null,
               "wide_image_height" : null,
               "source_type" : "8",
               "number_item" : "1",
               "has_metadata" : "0",
               "wide_image" : null,
               "mobile_image_width" : null,
               "mobile_image_height" : null,
               "source_value" : "",
               "original_image" : null
            }
         ],
         "name" : "Kickstart Fitness Goals With The Treadmill Dance",
         "uri" : "kickstart-fitness-goals-with-the-treadmill-dance-zynv",
         "cloud_servers" : [
            "newbuzz-collection-1925855828.us-east-1.elb.amazonaws.com"
         ],
         "username" : "wimp",
         "published" : "2015-01-15 20:50:31",
         "published_unix" : "1421373031",
         "user_link" : "http://www.wimp.com/dancetreadmill/",
         "ad_blurb" : "<b>Check out the World's largest treadmill dance featuring 12 YouTube stars.</b>",
         "nsfw" : "false",
         "status" : "live",
         "ct" : "http://75.101.183.223/small.gif?type=100,14&user=wimp&buzz=kickstart-fitness-goals-with-the-treadmill-dance-zynv&c=7EWPW27&u=78FDSD7&url=http%3A%2F%2Fbuzzfeed.com%2Fwimp%2Fkickstart-fitness-goals-with-the-treadmill-dance-zynv%2F&rd=http%3A%2F%2Fbuzzfeed.com%2Fwimp%2Fkickstart-fitness-goals-with-the-treadmill-dance-zynv%2F",
         "impressions" : "6",
         "mobile_image" : "1",
         "user_image" : "http://s3-ak.buzzfed.com/static/2014-09/24/16/user_images/webdr01/wimp-25632-1411590271-0.jpg",
         "blurb" : "Check out the World&#39;s largest treadmill dance featuring 12 YouTube stars.",
         "byline_description_visual" : "Publishing Partner",
         "display_name" : "Wimp",
         "image" : "http://s3-ak.buzzfed.com/static/2015-01/16/14/campaign_images/webdr01/kickstart-fitness-goals-with-the-treadmill-dance-0-15632-1421438185-1.jpg",
         "byline_description_id" : "7",
         "static_images" : {
            "small" : "http://s3-static-ak.buzzfed.com/static/2015-01/16/14/campaign_images/webdr01/kickstart-fitness-goals-with-the-treadmill-dance-0-15632-1421438185-1_small.jpg",
            "standard" : "http://s3-static-ak.buzzfed.com/static/2015-01/16/14/campaign_images/webdr01/kickstart-fitness-goals-with-the-treadmill-dance-0-15632-1421438185-1.jpg",
            "big" : "http://s3-static-ak.buzzfed.com/static/2015-01/16/14/campaign_images/webdr01/kickstart-fitness-goals-with-the-treadmill-dance-0-15632-1421438185-1.jpg",
            "wide" : "http://s3-static-ak.buzzfed.com/static/2015-01/16/14/campaign_images/webdr01/kickstart-fitness-goals-with-the-treadmill-dance-0-15632-1421438185-1.jpg",
            "dblbig" : "http://s3-static-ak.buzzfed.com/static/2015-01/16/14/campaign_images/webdr01/kickstart-fitness-goals-with-the-treadmill-dance-0-15632-1421438185-1.jpg",
            "dblwide" : "http://s3-static-ak.buzzfed.com/static/2015-01/16/14/campaign_images/webdr01/kickstart-fitness-goals-with-the-treadmill-dance-0-15632-1421438185-1.jpg"
         },
         "p" : 1,
         "image_small" : "http://s3-ak.buzzfed.com/static/2015-01/16/14/campaign_images/webdr01/kickstart-fitness-goals-with-the-treadmill-dance-0-15632-1421438185-1_small.jpg",
         "html_blurb" : "<b><big>Kickstart Fitness Goals With The Treadmill Dance</big></b><br/><b>Check out the World's largest treadmill dance featuring 12 YouTube stars.</b><br/><table><tr><td width='30' padding='0 0'><img src='http://s3-ak.buzzfed.com/static/2014-09/24/16/user_images/webdr01/wimp-25632-1411590271-0.jpg' width='25' height='25'/></td><td padding='5' pspacing='0'><small><b><a href='/wimp'>Wimp</a></b></small><br/><small><color value='#939393'>Publishing Partner</color></small></td></tr></table>"
      },
      {
         "bid" : "7EWNXV7",
         "user_type" : "f_other",
         "form" : "super-link",
         "user" : "ebaumsworld.com",
         "url" : "http://www.buzzfeed.com/ebaumsworld.com/10-reasons-elijah-wood-takes-the-best-fan-photos-4ev5",
         "comments_count" : 0,
         "last_updated" : "2015-01-16 14:05:20",
         "images" : "",
         "uid" : "7UWCO7",
         "sub_buzz" : [
            {
               "image_buzz_width" : null,
               "form_id" : "3",
               "link_buzz" : "http://www.ebaumsworld.com/pictures/view/84421082/",
               "form" : "link",
               "campaign_id" : "3576942",
               "buzz_order" : "0",
               "source_type_visual" : "mixed",
               "id" : "4687007",
               "updated" : "2015-01-15 15:50:14",
               "quote_author" : null,
               "sub_buzz_id" : "4687007",
               "name" : "10 Reasons Elijah Wood Takes The Best Fan Photos",
               "attribution" : "",
               "original_image_height" : null,
               "description" : "<b>He's just a good guy!</b>",
               "content_order" : null,
               "uri" : "10-reasons-elijah-wood-takes-the-best-fan-photos-ni8kk0-4ewr",
               "video_url" : null,
               "external_id" : "0",
               "userid" : "2493459",
               "added" : "2015-01-15 15:50:14",
               "image_buzz" : null,
               "mobile_safe" : "1",
               "commentary_raw_html" : null,
               "image_buzz_height" : null,
               "mobile_image" : null,
               "original_image_width" : null,
               "wide_image_width" : null,
               "wide_image_height" : null,
               "source_type" : "8",
               "number_item" : "1",
               "has_metadata" : "0",
               "wide_image" : null,
               "mobile_image_width" : null,
               "mobile_image_height" : null,
               "source_value" : "",
               "original_image" : null
            }
         ],
         "name" : "10 Reasons Elijah Wood Takes The Best Fan Photos",
         "uri" : "10-reasons-elijah-wood-takes-the-best-fan-photos-4ev5",
         "cloud_servers" : [
            "newbuzz-collection-1925855828.us-east-1.elb.amazonaws.com"
         ],
         "username" : "ebaumsworld.com",
         "published" : "2015-01-15 15:50:15",
         "published_unix" : "1421355015",
         "user_link" : "http://www.ebaumsworld.com/pictures/view/84421082/",
         "ad_blurb" : "<b>He's just a good guy!</b>",
         "nsfw" : "false",
         "status" : "live",
         "ct" : "http://75.101.183.223/small.gif?type=100,14&user=ebaumsworld.com&buzz=10-reasons-elijah-wood-takes-the-best-fan-photos-4ev5&c=7EWNXV7&u=7UWCO7&url=http%3A%2F%2Fbuzzfeed.com%2Febaumsworld.com%2F10-reasons-elijah-wood-takes-the-best-fan-photos-4ev5%2F&rd=http%3A%2F%2Fbuzzfeed.com%2Febaumsworld.com%2F10-reasons-elijah-wood-takes-the-best-fan-photos-4ev5%2F",
         "impressions" : "173",
         "mobile_image" : "1",
         "user_image" : "http://s3-ak.buzzfed.com/static/user_images/webdr02/2013/1/11/0/ebaumsworldcom-16947-1357882477-2.jpg",
         "blurb" : "He&#39;s just a good guy!",
         "byline_description_visual" : "Publishing Partner",
         "display_name" : "eBaum&#39;s World",
         "image" : "http://s3-ak.buzzfed.com/static/2015-01/16/14/campaign_images/webdr08/10-reasons-elijah-wood-takes-the-best-fan-photos-0-6160-1421435119-14.jpg",
         "byline_description_id" : "7",
         "static_images" : {
            "small" : "http://s3-static-ak.buzzfed.com/static/2015-01/16/14/campaign_images/webdr08/10-reasons-elijah-wood-takes-the-best-fan-photos-0-6160-1421435119-14_small.jpg",
            "standard" : "http://s3-static-ak.buzzfed.com/static/2015-01/16/14/campaign_images/webdr08/10-reasons-elijah-wood-takes-the-best-fan-photos-0-6160-1421435119-14.jpg",
            "big" : "http://s3-static-ak.buzzfed.com/static/2015-01/16/14/campaign_images/webdr08/10-reasons-elijah-wood-takes-the-best-fan-photos-0-6160-1421435119-14.jpg",
            "wide" : "http://s3-static-ak.buzzfed.com/static/2015-01/16/14/campaign_images/webdr08/10-reasons-elijah-wood-takes-the-best-fan-photos-0-6160-1421435119-14.jpg",
            "dblbig" : "http://s3-static-ak.buzzfed.com/static/2015-01/16/14/campaign_images/webdr08/10-reasons-elijah-wood-takes-the-best-fan-photos-0-6160-1421435119-14.jpg",
            "dblwide" : "http://s3-static-ak.buzzfed.com/static/2015-01/16/14/campaign_images/webdr08/10-reasons-elijah-wood-takes-the-best-fan-photos-0-6160-1421435119-14.jpg"
         },
         "p" : 1,
         "image_small" : "http://s3-ak.buzzfed.com/static/2015-01/16/14/campaign_images/webdr08/10-reasons-elijah-wood-takes-the-best-fan-photos-0-6160-1421435119-14_small.jpg",
         "html_blurb" : "<b><big>10 Reasons Elijah Wood Takes The Best Fan Photos</big></b><br/><b>He's just a good guy!</b><br/><table><tr><td width='30' padding='0 0'><img src='http://s3-ak.buzzfed.com/static/user_images/webdr02/2013/1/11/0/ebaumsworldcom-16947-1357882477-2.jpg' width='25' height='25'/></td><td padding='5' pspacing='0'><small><b><a href='/ebaumsworld.com'>eBaum&#39;s World</a></b></small><br/><small><color value='#939393'>Publishing Partner</color></small></td></tr></table>"
      },
      {
         "bid" : "7EWPNP7",
         "user_type" : "f_other",
         "form" : "super-link",
         "user" : "opposingviews.com",
         "url" : "http://www.buzzfeed.com/opposingviews.com/heroic-cat-saves-baby-boy-from-freezing-to-death-ab92",
         "comments_count" : 0,
         "last_updated" : "2015-01-15 20:49:06",
         "images" : "",
         "uid" : "72VC9U7",
         "sub_buzz" : [
            {
               "image_buzz_width" : null,
               "form_id" : "3",
               "link_buzz" : "http://www.opposingviews.com/i/society/animal-rights/heroic-cat-saves-baby-boy-freezing-death",
               "form" : "link",
               "campaign_id" : "3577260",
               "buzz_order" : "0",
               "source_type_visual" : "mixed",
               "id" : "4689038",
               "updated" : "2015-01-15 19:50:51",
               "quote_author" : null,
               "sub_buzz_id" : "4689038",
               "name" : "Heroic Cat Saves Baby Boy From Freezing To Death",
               "attribution" : "",
               "original_image_height" : null,
               "description" : "<b>This awesome cat saved a 3-month-old baby boy from freezing to death in sub-zero temperatures.</b>",
               "content_order" : null,
               "uri" : "heroic-cat-saves-baby-boy-from-freezing-to-death-ni8vp1-ergx",
               "video_url" : null,
               "external_id" : "0",
               "userid" : "2493459",
               "added" : "2015-01-15 19:50:51",
               "image_buzz" : null,
               "mobile_safe" : "1",
               "commentary_raw_html" : null,
               "image_buzz_height" : null,
               "mobile_image" : null,
               "original_image_width" : null,
               "wide_image_width" : null,
               "wide_image_height" : null,
               "source_type" : "8",
               "number_item" : "1",
               "has_metadata" : "0",
               "wide_image" : null,
               "mobile_image_width" : null,
               "mobile_image_height" : null,
               "source_value" : "",
               "original_image" : null
            }
         ],
         "name" : "Heroic Cat Saves Baby Boy From Freezing To Death",
         "uri" : "heroic-cat-saves-baby-boy-from-freezing-to-death-ab92",
         "cloud_servers" : [
            "newbuzz-collection-1925855828.us-east-1.elb.amazonaws.com"
         ],
         "username" : "opposingviews.com",
         "published" : "2015-01-15 19:50:51",
         "published_unix" : "1421369451",
         "user_link" : "http://www.opposingviews.com/i/society/animal-rights/heroic-cat-saves-baby-boy-freezing-death",
         "ad_blurb" : "<b>This awesome cat saved a 3-month-old baby boy from freezing to death in sub-zero temperatures.</b>",
         "nsfw" : "false",
         "status" : "live",
         "ct" : "http://75.101.183.223/small.gif?type=100,14&user=opposingviews.com&buzz=heroic-cat-saves-baby-boy-from-freezing-to-death-ab92&c=7EWPNP7&u=72VC9U7&url=http%3A%2F%2Fbuzzfeed.com%2Fopposingviews.com%2Fheroic-cat-saves-baby-boy-from-freezing-to-death-ab92%2F&rd=http%3A%2F%2Fbuzzfeed.com%2Fopposingviews.com%2Fheroic-cat-saves-baby-boy-from-freezing-to-death-ab92%2F",
         "impressions" : "23",
         "mobile_image" : "1",
         "user_image" : "http://s3-ak.buzzfed.com/static/user_images/webdr06/2013/5/7/16/opposingviewscom-11793-1367958254-6.jpg",
         "blurb" : "This awesome cat saved a 3-month-old baby boy from freezing to death in sub-zero temperatures.",
         "byline_description_visual" : "Publishing Partner",
         "display_name" : "opposingviews.com",
         "image" : "http://s3-ak.buzzfed.com/static/2015-01/15/20/campaign_images/webdr02/heroic-cat-saves-baby-boy-from-freezing-to-death-1-20264-1421372945-19.jpg",
         "byline_description_id" : "7",
         "static_images" : {
            "small" : "http://s3-static-ak.buzzfed.com/static/2015-01/15/20/campaign_images/webdr02/heroic-cat-saves-baby-boy-from-freezing-to-death-1-20264-1421372945-19_small.jpg",
            "standard" : "http://s3-static-ak.buzzfed.com/static/2015-01/15/20/campaign_images/webdr02/heroic-cat-saves-baby-boy-from-freezing-to-death-1-20264-1421372945-19.jpg",
            "big" : "http://s3-static-ak.buzzfed.com/static/2015-01/15/20/campaign_images/webdr02/heroic-cat-saves-baby-boy-from-freezing-to-death-1-20264-1421372945-19_big.jpg",
            "wide" : "http://s3-static-ak.buzzfed.com/static/2015-01/15/20/campaign_images/webdr02/heroic-cat-saves-baby-boy-from-freezing-to-death-1-20264-1421372945-19_wide.jpg",
            "dblbig" : "http://s3-static-ak.buzzfed.com/static/2015-01/15/20/campaign_images/webdr02/heroic-cat-saves-baby-boy-from-freezing-to-death-1-20264-1421372945-19_big.jpg",
            "dblwide" : "http://s3-static-ak.buzzfed.com/static/2015-01/15/20/campaign_images/webdr02/heroic-cat-saves-baby-boy-from-freezing-to-death-1-20264-1421372945-19_wide.jpg"
         },
         "p" : 1,
         "image_small" : "http://s3-ak.buzzfed.com/static/2015-01/15/20/campaign_images/webdr02/heroic-cat-saves-baby-boy-from-freezing-to-death-1-20264-1421372945-19_small.jpg",
         "html_blurb" : "<b><big>Heroic Cat Saves Baby Boy From Freezing To Death</big></b><br/><b>This awesome cat saved a 3-month-old baby boy from freezing to death in sub-zero temperatures.</b><br/><table><tr><td width='30' padding='0 0'><img src='http://s3-ak.buzzfed.com/static/user_images/webdr06/2013/5/7/16/opposingviewscom-11793-1367958254-6.jpg' width='25' height='25'/></td><td padding='5' pspacing='0'><small><b><a href='/opposingviews.com'>opposingviews.com</a></b></small><br/><small><color value='#939393'>Publishing Partner</color></small></td></tr></table>"
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

/* s 21:53:39 01/16/2015 */
/* g 21:55:43 01/16/2015 - sl=476 */ 